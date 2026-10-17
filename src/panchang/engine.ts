// Core panchang computation for one Gregorian year at one place.
// Produces continuous tithi / nakshatra / yoga spans, lunar months (with adhik maas),
// sankrantis, and a per-day record anchored on local sunrise (udaya tithi convention).
import {
  type Ms, elongation, moonSidereal, sunSidereal, findBoundaries, riseSet, makeObserver, norm360, ayanamsa,
} from '../astro/ephemeris.ts';
import type { Place } from '../data/locations.ts';

export const HOUR = 3600000;
export const DAY = 86400000;

export interface Span {
  /** tithi 1..30, nakshatra/yoga 0..26 */
  n: number;
  start: Ms;
  end: Ms;
}
export interface TithiSpan extends Span {
  /** amanta lunar month 0..11 (Chaitra..Phalguna) */
  month: number;
  adhik: boolean;
}
export interface LunarMonth {
  month: number;
  adhik: boolean;
  /** true when this month "absorbs" a skipped (kshaya) month */
  kshayaNext: boolean;
  start: Ms;
  end: Ms;
}
export interface Sankranti {
  rashi: number;
  ms: Ms;
}
export interface Day {
  date: string;
  midnight: Ms;
  weekday: number;
  sunrise: Ms;
  sunset: Ms;
  nextSunrise: Ms;
  /** first moonrise after this day's sunrise and before the next sunrise */
  moonrise: Ms | null;
  tithi: number;
  nakshatra: number;
  yoga: number;
  /** half-tithi index 0..59 */
  karana: number;
  month: number;
  adhik: boolean;
  sunRashi: number;
  moonRashi: number;
}
export interface YearData {
  year: number;
  place: Place;
  tithis: TithiSpan[];
  nakshatras: Span[];
  yogas: Span[];
  months: LunarMonth[];
  sankrantis: Sankranti[];
  days: Day[];
}

export function localMidnight(date: string, tz: number): Ms {
  const [y, m, d] = date.split('-').map(Number);
  return Date.UTC(y, m - 1, d) - tz * HOUR;
}
export function localDate(ms: Ms, tz: number): string {
  return new Date(ms + tz * HOUR).toISOString().slice(0, 10);
}
export function addDays(date: string, n: number): string {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}
export function fmtTime(ms: Ms, tz: number): string {
  return new Date(ms + tz * HOUR).toISOString().slice(11, 16);
}

/** Binary search: the span containing ms (spans sorted & contiguous), or undefined. */
export function spanAt<T extends Span>(spans: T[], ms: Ms): T | undefined {
  let lo = 0;
  let hi = spans.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const s = spans[mid];
    if (ms < s.start) hi = mid - 1;
    else if (ms >= s.end) lo = mid + 1;
    else return s;
  }
  return undefined;
}

function spansFromBoundaries(b: { ms: Ms; idx: number }[], toN: (idx: number) => number): Span[] {
  const out: Span[] = [];
  for (let i = 0; i + 1 < b.length; i++) out.push({ n: toN(b[i].idx), start: b[i].ms, end: b[i + 1].ms });
  return out;
}

export function computeYear(year: number, place: Place): YearData {
  const tz = place.tz;
  // Work over a padded range so months/spans that straddle New Year resolve correctly.
  const rangeStart = localMidnight(`${year - 1}-11-01`, tz);
  const rangeEnd = localMidnight(`${year + 1}-02-28`, tz);
  const step = 6 * HOUR;

  const tb = findBoundaries(elongation, 12, rangeStart, rangeEnd, step);
  const nb = findBoundaries(moonSidereal, 360 / 27, rangeStart, rangeEnd, step);
  const yb = findBoundaries((ms) => sunSidereal(ms) + moonSidereal(ms), 360 / 27, rangeStart, rangeEnd, step);
  const sb = findBoundaries(sunSidereal, 30, rangeStart, rangeEnd, 2 * DAY);

  const sankrantis: Sankranti[] = sb.map((b) => ({ rashi: b.idx, ms: b.ms }));

  // Lunar months (amanta): new moon to new moon, named after the sankranti that falls inside.
  const newMoons = tb.filter((b) => b.idx === 0).map((b) => b.ms);
  const months: LunarMonth[] = [];
  for (let i = 0; i + 1 < newMoons.length; i++) {
    const r0 = Math.floor(sunSidereal(newMoons[i] + 1000) / 30);
    const r1 = Math.floor(sunSidereal(newMoons[i + 1] - 1000) / 30);
    const crossings = (r1 - r0 + 12) % 12;
    months.push({
      month: (r0 + 1) % 12,
      adhik: crossings === 0,
      kshayaNext: crossings >= 2,
      start: newMoons[i],
      end: newMoons[i + 1],
    });
  }
  const monthSpans = months.map((m) => ({ ...m, n: m.month }));
  const monthAt = (ms: Ms) => spanAt(monthSpans, ms);

  const tithis: TithiSpan[] = [];
  for (const s of spansFromBoundaries(tb, (i) => i + 1)) {
    const m = monthAt(s.start + 60000);
    if (!m) continue;
    tithis.push({ ...s, month: m.month, adhik: m.adhik });
  }
  const nakshatras = spansFromBoundaries(nb, (i) => i);
  const yogas = spansFromBoundaries(yb, (i) => i);

  const obs = makeObserver(place.lat, place.lon, place.height);
  const days: Day[] = [];
  const first = `${year - 1}-12-01`;
  const last = `${year + 1}-01-31`;
  const sunrises: Ms[] = [];
  const dates: string[] = [];
  for (let d = first; d <= addDays(last, 1); d = addDays(d, 1)) {
    dates.push(d);
    sunrises.push(riseSet('Sun', obs, 1, localMidnight(d, tz))!);
  }
  for (let i = 0; i + 1 < dates.length; i++) {
    const date = dates[i];
    const midnight = localMidnight(date, tz);
    const sunrise = sunrises[i];
    const nextSunrise = sunrises[i + 1];
    const sunset = riseSet('Sun', obs, -1, sunrise)!;
    const mr = riseSet('Moon', obs, 1, sunrise, 1.1);
    const t = spanAt(tithis, sunrise);
    if (!t) continue;
    const el = elongation(sunrise);
    days.push({
      date,
      midnight,
      weekday: new Date(midnight + tz * HOUR).getUTCDay(),
      sunrise,
      sunset,
      nextSunrise,
      moonrise: mr !== null && mr < nextSunrise ? mr : null,
      tithi: t.n,
      nakshatra: spanAt(nakshatras, sunrise)?.n ?? Math.floor(moonSidereal(sunrise) / (360 / 27)),
      yoga: spanAt(yogas, sunrise)?.n ?? 0,
      karana: Math.floor(norm360(el) / 6),
      month: t.month,
      adhik: t.adhik,
      sunRashi: Math.floor(sunSidereal(sunrise) / 30),
      moonRashi: Math.floor(moonSidereal(sunrise) / 30),
    });
  }

  return { year, place, tithis, nakshatras, yogas, months, sankrantis, days };
}

export { ayanamsa };
