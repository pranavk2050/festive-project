// Kumbh Mela timing from the classical planetary conditions: Guru (Jupiter) in a given sidereal
// rashi together with Surya (Sun) in a given rashi. Simhastha — Guru in Simha — is the long
// period (about 13 months) within which the Nashik and Ujjain melas fall.
import { type Ms, grahaSidereal, sunSidereal } from '../astro/ephemeris.ts';
import { type YearData, localDate, localMidnight, DAY } from './engine.ts';
import type { Occurrence } from './festivals.ts';
import { RASHIS, RASHIS_MR } from './constants.ts';

export interface KumbhSite {
  id: string;
  name: string;
  mr: string;
  river: string;
  riverMr: string;
  jupiter: number;
  sun: number;
}

export const KUMBH_SITES: KumbhSite[] = [
  { id: 'haridwar', name: 'Haridwar Kumbh', mr: 'हरिद्वार कुंभ', river: 'Ganga', riverMr: 'गंगा', jupiter: 10, sun: 0 },
  { id: 'prayag', name: 'Prayagraj Kumbh', mr: 'प्रयागराज कुंभ', river: 'Triveni Sangam', riverMr: 'त्रिवेणी संगम', jupiter: 1, sun: 9 },
  { id: 'nashik', name: 'Nashik–Trimbakeshwar Simhastha Kumbh', mr: 'नाशिक–त्र्यंबकेश्वर सिंहस्थ कुंभ', river: 'Godavari', riverMr: 'गोदावरी', jupiter: 4, sun: 4 },
  { id: 'ujjain', name: 'Ujjain Simhastha Kumbh', mr: 'उज्जैन सिंहस्थ कुंभ', river: 'Kshipra', riverMr: 'क्षिप्रा', jupiter: 4, sun: 0 },
];

export interface KumbhWindow {
  site: KumbhSite;
  start: Ms;
  end: Ms;
}

interface Span {
  start: Ms;
  end: Ms;
}

/** Daily sidereal rashis of Guru and Surya over a range, sampled once so every rule can reuse them. */
class RashiSeries {
  readonly jup: Int8Array;
  readonly sun: Int8Array;
  readonly from: Ms;
  constructor(from: Ms, days: number) {
    this.from = from;
    this.jup = new Int8Array(days);
    this.sun = new Int8Array(days);
    for (let i = 0; i < days; i++) {
      const t = from + i * DAY;
      this.jup[i] = Math.floor(grahaSidereal('Jupiter', t) / 30);
      this.sun[i] = Math.floor(sunSidereal(t) / 30);
    }
  }
  at = (i: number) => this.from + i * DAY;

  /** Index spans where test(i) holds; spans closer than `mergeGapDays` are joined. */
  spans(test: (i: number) => boolean, mergeGapDays = 0): { a: number; b: number }[] {
    const out: { a: number; b: number }[] = [];
    for (let i = 0; i < this.jup.length; i++) {
      if (!test(i)) continue;
      const last = out[out.length - 1];
      if (last && i - last.b <= mergeGapDays + 1) last.b = i;
      else out.push({ a: i, b: i });
    }
    return out;
  }

  /** Days Guru stays unbroken in the rashi it occupies on day i. */
  jupiterStay(i: number): number {
    const k = this.jup[i];
    let a = i;
    let b = i;
    while (a > 0 && this.jup[a - 1] === k) a--;
    while (b < this.jup.length - 1 && this.jup[b + 1] === k) b++;
    return b - a;
  }
}

function windowsFrom(r: RashiSeries): KumbhWindow[] {
  const out: KumbhWindow[] = [];
  for (const site of KUMBH_SITES) {
    for (const s of r.spans((i) => r.jup[i] === site.jupiter && r.sun[i] === site.sun)) {
      // Skip brief dips where Guru touches the rashi and turns back (e.g. May 2009): every real
      // Kumbh transit keeps Guru in the rashi for at least ~4 months.
      if (r.jupiterStay(s.a) < 120) continue;
      out.push({ site, start: r.at(s.a), end: r.at(s.b) });
    }
  }
  return out.sort((a, b) => a.start - b.start);
}

/** Kumbh yoga windows (Guru + Surya condition) for every site between two instants. */
export function kumbhWindows(from: Ms, to: Ms): KumbhWindow[] {
  return windowsFrom(new RashiSeries(from, Math.ceil((to - from) / DAY) + 1));
}

/** Simhastha periods — Guru in Simha, joining short retrograde dips back into Karka. */
export function simhasthaPeriods(from: Ms, to: Ms): Span[] {
  const r = new RashiSeries(from, Math.ceil((to - from) / DAY) + 1);
  return r.spans((i) => r.jup[i] === 4, 200).map((s) => ({ start: r.at(s.a), end: r.at(s.b) }));
}

export function kumbhEvents(y: YearData): Occurrence[] {
  const tz = y.place.tz;
  const yStart = localMidnight(`${y.year}-01-01`, tz);
  const yEnd = localMidnight(`${y.year + 1}-01-01`, tz);
  // Sample from two years back (to see a Simhastha that began earlier) to 13 years ahead
  // (so every site's next occurrence can be named).
  const from = yStart - 800 * DAY;
  const r = new RashiSeries(from, Math.ceil((localMidnight(`${y.year + 13}-06-01`, tz) - from) / DAY));
  const windows = windowsFrom(r);
  const out: Occurrence[] = [];
  for (const w of windows.filter((w) => w.end >= yStart && w.start < yEnd)) {
    const next = windows.find((x) => x.site === w.site && x.start > w.end + 400 * DAY);
    const date = localDate(w.start, tz);
    out.push({
      key: `kumbh-${w.site.id}@${date}`,
      defId: `kumbh-${w.site.id}`,
      name: w.site.name,
      mr: w.site.mr,
      category: 'period',
      region: w.site.id === 'nashik' ? 'mh' : 'all',
      date,
      endDate: localDate(w.end, tz),
      moment: w.start + DAY / 2,
      about: `Kumbh yoga on the ${w.site.river}: Guru (Jupiter) in ${RASHIS[w.site.jupiter]} while the Sun is in ${RASHIS[w.site.sun]}. The main snans fall on the amavasya, purnima and sankranti days of this window.`,
      aboutMr: `${w.site.riverMr} तीरावर कुंभयोग: गुरू ${RASHIS_MR[w.site.jupiter]} राशीत आणि सूर्य ${RASHIS_MR[w.site.sun]} राशीत. मुख्य स्नाने या काळातील अमावस्या, पौर्णिमा व संक्रांतीला.`,
      notes: next ? [`Next ${w.site.name}: ${localDate(next.start, tz)} → ${localDate(next.end, tz)}`] : [],
    });
  }
  const simhastha = r.spans((i) => r.jup[i] === 4, 200).map((s) => ({ start: r.at(s.a), end: r.at(s.b) }));
  for (const s of simhastha.filter((s) => s.end >= yStart && s.start < yEnd)) {
    const date = localDate(s.start, tz);
    out.push({
      key: `simhastha@${date}`,
      defId: 'simhastha',
      name: 'Simhastha (Guru in Simha)',
      mr: 'सिंहस्थ पर्वकाल (गुरू सिंह राशीत)',
      category: 'period',
      region: 'mh',
      date,
      endDate: localDate(s.end, tz),
      moment: s.start + DAY / 2,
      about: 'Guru stays in Simha for about 13 months every 12 years. The Nashik–Trimbakeshwar and Ujjain Simhastha melas fall within this period; it opens with dhwajarohan (flag hoisting) when Guru enters Simha.',
      aboutMr: 'दर बारा वर्षांनी गुरू सुमारे 13 महिने सिंह राशीत असतो. नाशिक–त्र्यंबकेश्वर व उज्जैनचे सिंहस्थ कुंभमेळे याच काळात भरतात; गुरू सिंहेत प्रवेश करताच ध्वजारोहण होते.',
      notes: [],
    });
  }
  return out;
}
