// Muhurat finder: auspicious time windows for vivah (marriage), griha pravesh, vahan (vehicle)
// and property purchase. Each rule set intersects allowed nakshatra / tithi / solar-month spans
// with the day, then removes Bhadra, inauspicious yogas and Rahu kaal where the rule asks for it.
// Rules follow the Drik Panchang / common Marathi panchang conventions (see README).
import type { Ms } from '../astro/ephemeris.ts';
import type { YearData, Span } from './engine.ts';
import { bhadraIn, type MonthSystem, type Occurrence } from './festivals.ts';

export type MuhuratType = 'vivah' | 'griha' | 'vahan' | 'property';
export const MUHURAT_TYPES: MuhuratType[] = ['vivah', 'griha', 'vahan', 'property'];

export interface MuhuratWindow {
  date: string;
  start: Ms;
  end: Ms;
  /** nakshatras and tithis the window passes through, in order */
  nakshatras: number[];
  tithis: number[];
}

interface Rule {
  nakshatras: number[];
  tithiOk: (n: number) => boolean;
  varas: number[];
  sunOk: (rashi: number) => boolean;
  /** allowed amanta lunar months (omit for no month rule) */
  months?: number[];
  chaturmas?: boolean;
  adhik?: boolean;
  asta?: boolean;
  bhadra?: boolean;
  /** exclude Vyatipata (16) and Vaidhriti (26) yoga */
  yogas?: boolean;
  rahuKaal?: boolean;
  eclipse?: boolean;
  holashtak?: boolean;
}

const ALL_VARAS = [0, 1, 2, 3, 4, 5, 6];
const RIKTA = [4, 9, 14, 19, 24, 29];

export const MUHURAT_RULES: Record<MuhuratType, Rule> = {
  vivah: {
    // Rohini, Mrigashira, Magha, U.Phalguni, Hasta, Swati, Anuradha, Mula, U.Ashadha, U.Bhadrapada, Revati
    nakshatras: [3, 4, 9, 11, 12, 14, 16, 18, 20, 25, 26],
    tithiOk: (n) => n !== 30,
    varas: ALL_VARAS,
    // Sun in Mesha, Vrishabha, Mithuna, Vrishchika, Makara, Kumbha
    sunOk: (r) => [0, 1, 2, 7, 9, 10].includes(r),
    chaturmas: true, adhik: true, asta: true, bhadra: true, yogas: true, eclipse: true, holashtak: true,
  },
  griha: {
    // Rohini, Mrigashira, U.Phalguni, Chitra, Anuradha, U.Ashadha, U.Bhadrapada, Revati
    nakshatras: [3, 4, 11, 13, 16, 20, 25, 26],
    // Shukla 1,2,3,5,7,10,11,13 and Krishna 2,3,5,7,10,11,13
    tithiOk: (n) => [1, 2, 3, 5, 7, 10, 11, 13, 17, 18, 20, 22, 25, 26, 28].includes(n),
    varas: [1, 3, 4, 5, 6],
    // Magha, Phalguna, Vaishakha, Jyeshtha, Kartik, Margashirsha — the months Drik's listing uses
    months: [10, 11, 1, 2, 7, 8],
    sunOk: (r) => r !== 11,
    adhik: true, asta: true, bhadra: true, eclipse: true,
  },
  vahan: {
    // Chara (best) + Mridu/Kshipra nakshatras
    nakshatras: [0, 3, 4, 6, 7, 12, 13, 14, 16, 21, 22, 23, 26],
    tithiOk: (n) => n !== 30 && !RIKTA.includes(n),
    varas: [0, 1, 3, 4, 5],
    sunOk: () => true,
    bhadra: true, rahuKaal: true,
  },
  property: {
    nakshatras: [4, 6, 8, 9, 10, 15, 16, 17, 18, 19, 24, 26],
    tithiOk: (n) => n !== 30,
    varas: [4, 5],
    sunOk: () => true,
    adhik: true, rahuKaal: true,
  },
};

type Iv = [Ms, Ms][];

function intersect(a: Iv, b: Iv): Iv {
  const out: Iv = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    const s = Math.max(a[i][0], b[j][0]);
    const e = Math.min(a[i][1], b[j][1]);
    if (s < e) out.push([s, e]);
    if (a[i][1] < b[j][1]) i++;
    else j++;
  }
  return out;
}

function subtract(a: Iv, cut: Iv): Iv {
  let out = a;
  for (const [cs, ce] of cut) {
    const next: Iv = [];
    for (const [s, e] of out) {
      if (ce <= s || cs >= e) next.push([s, e]);
      else {
        if (cs > s) next.push([s, cs]);
        if (ce < e) next.push([ce, e]);
      }
    }
    out = next;
  }
  return out;
}

const clip = (spans: Span[], lo: Ms, hi: Ms): Iv =>
  spans.filter((s) => s.end > lo && s.start < hi).map((s) => [Math.max(lo, s.start), Math.min(hi, s.end)] as [Ms, Ms]);

/** Rahu kaal: one eighth of daytime; which eighth depends on the weekday. */
const RAHU_PART = [7, 1, 6, 4, 5, 3, 2];

export function findMuhurats(y: YearData, occ: Occurrence[], system: MonthSystem): Record<MuhuratType, MuhuratWindow[]> {
  const year = String(y.year);
  // Day-level blocks from already-resolved periods.
  const ranges = (pred: (o: Occurrence) => boolean) => occ.filter(pred).map((o) => [o.date, o.endDate ?? o.date] as [string, string]);
  const chaturmas = ranges((o) => o.defId === 'chaturmas');
  // Guru/Shukra asta, widened by the vriddha (days before setting) and bala (days after rising) margins.
  const shift = (d: string, n: number) => new Date(Date.parse(`${d}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);
  const asta = ranges((o) => o.defId === 'asta-jupiter' || o.defId === 'asta-venus').map(([a, b]) => [shift(a, -5), shift(b, 3)] as [string, string]);
  const holashtak = ranges((o) => o.defId === 'holashtak');
  const eclipses = new Set(occ.filter((o) => o.category === 'grahan' && o.notes.some((n) => n.startsWith('Visible'))).map((o) => o.date));
  const inRanges = (d: string, rs: [string, string][]) => rs.some(([a, b]) => d >= a && d <= b);

  // Sun-sign spans from sankrantis.
  const sunSpans: Span[] = [];
  for (let i = 0; i + 1 < y.sankrantis.length; i++) sunSpans.push({ n: y.sankrantis[i].rashi, start: y.sankrantis[i].ms, end: y.sankrantis[i + 1].ms });
  const bhadra: Iv = y.tithis.map((t) => bhadraIn(t)).filter((b): b is [Ms, Ms] => !!b);
  const badYoga: Iv = y.yogas.filter((s) => s.n === 16 || s.n === 26).map((s) => [s.start, s.end]);

  const out = {} as Record<MuhuratType, MuhuratWindow[]>;
  for (const type of MUHURAT_TYPES) {
    const r = MUHURAT_RULES[type];
    const list: MuhuratWindow[] = [];
    for (const d of y.days) {
      if (!d.date.startsWith(year) || !r.varas.includes(d.weekday)) continue;
      if (r.chaturmas && inRanges(d.date, chaturmas)) continue;
      if (r.asta && inRanges(d.date, asta)) continue;
      if (r.holashtak && system === 'purnimanta' && inRanges(d.date, holashtak)) continue;
      if (r.eclipse && eclipses.has(d.date)) continue;
      const lo = d.sunrise;
      const hi = d.nextSunrise;
      let iv: Iv = [[lo, hi]];
      iv = intersect(iv, clip(y.nakshatras.filter((s) => r.nakshatras.includes(s.n)), lo, hi));
      iv = intersect(iv, clip(y.tithis.filter((t) => r.tithiOk(t.n) && !(r.adhik && t.adhik) && (!r.months || r.months.includes(t.month))), lo, hi));
      iv = intersect(iv, clip(sunSpans.filter((s) => r.sunOk(s.n)), lo, hi));
      if (r.bhadra) iv = subtract(iv, bhadra);
      if (r.yogas) iv = subtract(iv, badYoga);
      if (r.rahuKaal) {
        const part = (d.sunset - d.sunrise) / 8;
        const s = d.sunrise + RAHU_PART[d.weekday] * part;
        iv = subtract(iv, [[s, s + part]]);
      }
      // Pieces touch wherever a nakshatra or tithi changes; join them into one window.
      const merged: Iv = [];
      for (const p of iv) {
        const last = merged[merged.length - 1];
        if (last && p[0] - last[1] < 1000) last[1] = p[1];
        else merged.push([p[0], p[1]]);
      }
      const within = (spans: Span[], s: Ms, e: Ms) => spans.filter((x) => x.end > s && x.start < e).map((x) => x.n);
      for (const [s, e] of merged) {
        if (e - s < 30 * 60000) continue;
        list.push({ date: d.date, start: s, end: e, nakshatras: within(y.nakshatras, s, e), tithis: within(y.tithis, s, e) });
      }
    }
    out[type] = list;
  }
  return out;
}
