// Thin wrapper over astronomy-engine giving the quantities a panchang needs:
// tropical/sidereal longitudes, Lahiri ayanamsa, rise/set times and a generic
// "segment boundary" finder used for tithi, nakshatra, yoga and sankranti.
import * as A from 'astronomy-engine';

export type Ms = number;

export const DEG = Math.PI / 180;
const J2000_MS = Date.UTC(2000, 0, 1, 12, 0, 0);
const DAY = 86400000;

export const norm360 = (x: number) => ((x % 360) + 360) % 360;
export const astroTime = (ms: Ms) => A.MakeTime(new Date(ms));
export const julianCenturies = (ms: Ms) => (ms - J2000_MS) / DAY / 36525;

/** Nutation in longitude (degrees), IAU 1980 leading terms. */
export function nutationLon(ms: Ms): number {
  const T = julianCenturies(ms);
  const om = (125.04452 - 1934.136261 * T) * DEG;
  const L = (280.4665 + 36000.7698 * T) * DEG;
  const Lp = (218.3165 + 481267.8813 * T) * DEG;
  return (-17.2 * Math.sin(om) - 1.32 * Math.sin(2 * L) - 0.23 * Math.sin(2 * Lp) + 0.21 * Math.sin(2 * om)) / 3600;
}

/**
 * Lahiri (Chitrapaksha) ayanamsa in degrees, relative to the true equinox of date
 * (mean ayanamsa + nutation, the Swiss Ephemeris convention used by most panchangs).
 */
export function ayanamsa(ms: Ms): number {
  const T = julianCenturies(ms);
  return 23.857092 + (5028.796195 * T + 1.1054348 * T * T) / 3600 + nutationLon(ms);
}

export const sunTropical = (ms: Ms) => A.SunPosition(astroTime(ms)).elon;
export const moonTropical = (ms: Ms) => A.EclipticGeoMoon(astroTime(ms)).lon;
export const moonLatitude = (ms: Ms) => A.EclipticGeoMoon(astroTime(ms)).lat;

export const toSidereal = (tropical: number, ms: Ms) => norm360(tropical - ayanamsa(ms));
export const sunSidereal = (ms: Ms) => toSidereal(sunTropical(ms), ms);
export const moonSidereal = (ms: Ms) => toSidereal(moonTropical(ms), ms);

/** Moon–Sun elongation, 0..360. Tithi = floor(elongation / 12) + 1. */
export const elongation = (ms: Ms) => norm360(moonTropical(ms) - sunTropical(ms));

export type Graha = 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Rahu' | 'Ketu';
export const PLANETS: Graha[] = ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];

/** Mean lunar node (Rahu), tropical. */
export function rahuTropical(ms: Ms): number {
  const T = julianCenturies(ms);
  return norm360(125.0445479 - 1934.1362891 * T + 0.0020754 * T * T);
}

/** Geocentric apparent tropical ecliptic longitude/latitude of any graha. */
export function grahaEcliptic(g: Graha, ms: Ms): { lon: number; lat: number } {
  if (g === 'Sun') return { lon: sunTropical(ms), lat: 0 };
  if (g === 'Moon') {
    const m = A.EclipticGeoMoon(astroTime(ms));
    return { lon: m.lon, lat: m.lat };
  }
  if (g === 'Rahu') return { lon: rahuTropical(ms), lat: 0 };
  if (g === 'Ketu') return { lon: norm360(rahuTropical(ms) + 180), lat: 0 };
  const e = A.Ecliptic(A.GeoVector(g as A.Body, astroTime(ms), true));
  return { lon: e.elon, lat: e.elat };
}

export const grahaSidereal = (g: Graha, ms: Ms) => toSidereal(grahaEcliptic(g, ms).lon, ms);

/** Daily motion in longitude (deg/day); negative means vakri (retrograde). */
export function grahaSpeed(g: Graha, ms: Ms): number {
  const a = grahaEcliptic(g, ms - DAY / 2).lon;
  const b = grahaEcliptic(g, ms + DAY / 2).lon;
  let d = b - a;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}

export function makeObserver(lat: number, lon: number, height = 0) {
  return new A.Observer(lat, lon, height);
}

/** Next rise (dir=+1) or set (dir=-1) after startMs, or null if none within limitDays. */
export function riseSet(body: 'Sun' | 'Moon', obs: A.Observer, dir: 1 | -1, startMs: Ms, limitDays = 1.2): Ms | null {
  const r = A.SearchRiseSet(body as A.Body, obs, dir, astroTime(startMs), limitDays);
  return r ? r.date.getTime() : null;
}

export interface Boundary {
  ms: Ms;
  /** index of the segment that begins at `ms` */
  idx: number;
}

/**
 * Finds every instant in [start, end] where floor(f(t)/segment) changes, for an
 * angle f that increases monotonically (with wrap at 360). `step` must be shorter
 * than the shortest segment duration. Precision is ~1 second.
 */
export function findBoundaries(f: (ms: Ms) => number, segment: number, start: Ms, end: Ms, step: Ms): Boundary[] {
  const n = Math.round(360 / segment);
  const idx = (ms: Ms) => Math.floor(norm360(f(ms)) / segment) % n;
  const out: Boundary[] = [];
  let prevT = start;
  let prevI = idx(start);
  for (let t = start + step; ; t += step) {
    if (t > end) t = end;
    let curI = idx(t);
    while (curI !== prevI) {
      let lo = prevT;
      let hi = t;
      while (hi - lo > 1000) {
        const mid = (lo + hi) / 2;
        if (idx(mid) === prevI) lo = mid;
        else hi = mid;
      }
      const ni = idx(hi);
      out.push({ ms: Math.round(hi), idx: ni });
      prevT = hi;
      prevI = ni;
      curI = idx(t);
    }
    prevT = t;
    if (t >= end) break;
  }
  return out;
}

export { A };
