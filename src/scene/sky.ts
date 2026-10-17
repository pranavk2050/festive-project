// Everything the 3D views need about the sky at one instant.
import {
  A, type Ms, type Graha, astroTime, grahaEcliptic, grahaSpeed, toSidereal, ayanamsa, elongation, makeObserver, DEG,
} from '../astro/ephemeris.ts';
import type { Place } from '../data/locations.ts';

export const GRAHAS: Graha[] = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Rahu', 'Ketu'];

export interface GrahaState {
  g: Graha;
  lon: number; // tropical ecliptic of date
  lat: number;
  sid: number; // sidereal longitude
  speed: number;
  alt: number;
  az: number;
}

export interface SkyState {
  ms: Ms;
  ayanamsa: number;
  elongation: number;
  grahas: Record<Graha, GrahaState>;
  /** heliocentric J2000-ecliptic positions in AU */
  helio: Record<'Mercury' | 'Venus' | 'Earth' | 'Mars' | 'Jupiter' | 'Saturn', [number, number, number]>;
  /** geocentric Moon, J2000 ecliptic, AU */
  moonGeo: [number, number, number];
}

const EQJ_ECL = A.Rotation_EQJ_ECL();
function eclVec(v: A.Vector): [number, number, number] {
  const r = A.RotateVector(EQJ_ECL, v);
  return [r.x, r.y, r.z];
}

/** Horizontal coordinates (deg) of a point given by tropical ecliptic-of-date lon/lat. */
export function eclipticToHorizon(ms: Ms, obs: A.Observer, lon: number, lat: number): { alt: number; az: number } {
  const t = astroTime(ms);
  const v = new A.Vector(Math.cos(lat * DEG) * Math.cos(lon * DEG), Math.cos(lat * DEG) * Math.sin(lon * DEG), Math.sin(lat * DEG), t);
  const rot = A.CombineRotation(A.Rotation_ECT_EQD(t), A.Rotation_EQD_HOR(t, obs));
  const h = A.HorizonFromVector(A.RotateVector(rot, v), 'normal');
  return { alt: h.lat, az: h.lon };
}

/**
 * Precomputed converters to horizontal coordinates for one instant — much faster than
 * the one-off helpers when projecting hundreds of ecliptic points or stars per frame.
 */
export function horizonProjector(ms: Ms, obs: A.Observer) {
  const t = astroTime(ms);
  const ect = A.CombineRotation(A.Rotation_ECT_EQD(t), A.Rotation_EQD_HOR(t, obs));
  const eqj = A.Rotation_EQJ_HOR(t, obs);
  const toHor = (rot: A.RotationMatrix, x: number, y: number, z: number) => {
    const h = A.HorizonFromVector(A.RotateVector(rot, new A.Vector(x, y, z, t)), 'normal');
    return { alt: h.lat, az: h.lon };
  };
  return {
    ecliptic: (lon: number, lat = 0) =>
      toHor(ect, Math.cos(lat * DEG) * Math.cos(lon * DEG), Math.cos(lat * DEG) * Math.sin(lon * DEG), Math.sin(lat * DEG)),
    equatorialJ2000: (raHours: number, dec: number) => {
      const ra = raHours * 15 * DEG;
      return toHor(eqj, Math.cos(dec * DEG) * Math.cos(ra), Math.cos(dec * DEG) * Math.sin(ra), Math.sin(dec * DEG));
    },
  };
}

export function equatorialToHorizon(ms: Ms, obs: A.Observer, raHours: number, dec: number) {
  const h = A.Horizon(astroTime(ms), obs, raHours, dec, 'normal');
  return { alt: h.altitude, az: h.azimuth };
}

export function skyState(ms: Ms, place: Place): SkyState {
  const obs = makeObserver(place.lat, place.lon, place.height);
  const t = astroTime(ms);
  const grahas = {} as Record<Graha, GrahaState>;
  for (const g of GRAHAS) {
    const { lon, lat } = grahaEcliptic(g, ms);
    let alt: number;
    let az: number;
    if (g === 'Rahu' || g === 'Ketu') {
      ({ alt, az } = eclipticToHorizon(ms, obs, lon, 0));
    } else {
      const eq = A.Equator(g as A.Body, t, obs, true, true);
      const h = A.Horizon(t, obs, eq.ra, eq.dec, 'normal');
      alt = h.altitude;
      az = h.azimuth;
    }
    grahas[g] = { g, lon, lat, sid: toSidereal(lon, ms), speed: g === 'Rahu' || g === 'Ketu' ? -0.053 : grahaSpeed(g, ms), alt, az };
  }
  const helio = {} as SkyState['helio'];
  for (const b of ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn'] as const) {
    helio[b] = eclVec(A.HelioVector(b as A.Body, t));
  }
  return {
    ms,
    ayanamsa: ayanamsa(ms),
    elongation: elongation(ms),
    grahas,
    helio,
    moonGeo: eclVec(A.GeoMoon(t)),
  };
}

/** Sample one full heliocentric orbit (J2000 ecliptic, AU). */
export function orbitPath(body: 'Mercury' | 'Venus' | 'Earth' | 'Mars' | 'Jupiter' | 'Saturn', ms: Ms, n = 256): [number, number, number][] {
  const period: Record<string, number> = { Mercury: 87.97, Venus: 224.7, Earth: 365.26, Mars: 686.98, Jupiter: 4332.6, Saturn: 10759 };
  const out: [number, number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const tt = ms + (i / n) * period[body] * 86400000;
    out.push(eclVec(A.HelioVector(body as A.Body, astroTime(tt))));
  }
  return out;
}
