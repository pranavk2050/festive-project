// Resolves festival rules against a computed YearData into dated occurrences.
import { type Ms, elongation, norm360 } from '../astro/ephemeris.ts';
import { type YearData, type Day, type TithiSpan, type Span, localDate, addDays, HOUR, fmtTime } from './engine.ts';
import { FESTIVALS, type FestivalDef, type Kaal, type Category, type Region } from './rules.ts';
import {
  EKADASHI_NAMES, ADHIK_EKADASHI_NAMES, MONTHS, NAKSHATRAS, RASHIS, tithiName,
  EKADASHI_NAMES_MR, ADHIK_EKADASHI_NAMES_MR, MONTHS_MR, RASHIS_MR,
} from './constants.ts';
import { NAME_MR, ABOUT_MR } from './rules.mr.ts';

export type MonthSystem = 'amanta' | 'purnimanta';

export interface Occurrence {
  key: string;
  defId: string;
  name: string;
  mr?: string;
  category: Category;
  region: Region;
  date: string;
  endDate?: string;
  /** the instant the 3D view jumps to */
  moment: Ms;
  window?: [Ms, Ms];
  kaal?: Kaal;
  tithi?: { n: number; month: number; adhik: boolean; start: Ms; end: Ms };
  nakshatra?: { n: number; start: Ms; end: Ms };
  about: string;
  aboutMr?: string;
  notes: string[];
}

/** Marathi descriptions for generated (non-rule) observances, keyed by defId. */
const GEN_ABOUT_MR: Record<string, string> = {
  sankashti: 'गणेशासाठी वद्य चतुर्थीचा उपवास; चंद्रोदयानंतर सोडतात.',
  'angarki-sankashti': 'मंगळवारी येणारी संकष्टी — गणेशासाठी विशेष शुभ.',
  'vinayaka-chaturthi': 'शुद्ध चतुर्थीला मध्याह्नी गणेश पूजा.',
  pradosh: 'सायंकाळी त्रयोदशी — प्रदोषकाळी शिवपूजा.',
  'masik-shivaratri': 'दर चांद्र महिन्याची मध्यरात्रीची वद्य चतुर्दशी.',
  purnima: 'पौर्णिमा — चंद्र सूर्यापासून 168°–180°.',
  amavasya: 'अमावस्या — चंद्र सूर्याच्या 12° आत. पितरांसाठी तर्पण.',
  'somvati-amavasya': 'सोमवारी येणारी अमावस्या — स्नान-दान आणि पितृतर्पणासाठी विशेष.',
  'shani-amavasya': 'शनिवारी येणारी अमावस्या — स्नान-दान आणि पितृतर्पणासाठी विशेष.',
  'shravani-somvar': 'श्रावणातील सोमवार — शिवव्रत.',
  'mangala-gaur': 'अमान्त श्रावणातील मंगळवारी नवविवाहिता गौरीची पूजा करतात.',
  'guru-pushya': 'गुरुवारी सूर्योदयी चंद्र पुष्य नक्षत्रात — सोनेखरेदी आणि नव्या कामासाठी उत्तम.',
  'ravi-pushya': 'रविवारी सूर्योदयी चंद्र पुष्य नक्षत्रात — सोनेखरेदी आणि नव्या कामासाठी उत्तम.',
  'adhik-maas': 'पुरुषोत्तम मास — ज्या चांद्र महिन्यात सूर्य रास बदलत नाही. चांद्र महिने ऋतूंशी जुळवण्यासाठी सुमारे दर 32.5 महिन्यांनी येतो. यात वार्षिक सण होत नाहीत.',
  chaturmas: 'देवशयनी ते प्रबोधिनी एकादशी — विष्णू निद्रेत असतानाचे चार पवित्र महिने; पावसाळ्यात सूर्य मिथुनेतून तुळेपर्यंत जातो. विवाह टाळतात.',
};

export const KAAL_LABEL: Record<Kaal, string> = {
  sunrise: 'at sunrise (udaya tithi)',
  arunodaya: 'at arunodaya (96 min before sunrise)',
  pratah: 'in pratah kaal (first fifth of the day)',
  purvahna: 'in purvahna (forenoon)',
  madhyahna: 'in madhyahna (middle fifth of the day)',
  aparahna: 'in aparahna (fourth fifth of the day)',
  sayahna: 'in sayahna (last fifth of the day)',
  pradosh: 'in pradosh kaal (first fifth of the night)',
  nishita: 'at nishita kaal (midnight muhurta)',
  moonrise: 'at moonrise',
  day: 'during the day',
};

export function kaalWindow(d: Day, kaal: Kaal): [Ms, Ms] {
  const L = d.sunset - d.sunrise;
  const N = d.nextSunrise - d.sunset;
  const sr = d.sunrise;
  switch (kaal) {
    case 'sunrise': return [sr, sr];
    case 'arunodaya': return [sr - 96 * 60000, sr];
    case 'pratah': return [sr, sr + L / 5];
    case 'purvahna': return [sr, sr + L / 2];
    case 'madhyahna': return [sr + (2 * L) / 5, sr + (3 * L) / 5];
    case 'aparahna': return [sr + (3 * L) / 5, sr + (4 * L) / 5];
    case 'sayahna': return [sr + (4 * L) / 5, d.sunset];
    case 'pradosh': return [d.sunset, d.sunset + N / 5];
    case 'nishita': return [d.sunset + (7 * N) / 15, d.sunset + (8 * N) / 15];
    case 'moonrise': return d.moonrise ? [d.moonrise, d.moonrise] : [d.sunset + N / 5, d.sunset + N / 5];
    case 'day': return [sr, d.sunset];
  }
}

function overlapScore(w: [Ms, Ms], s: Span): number {
  const [a, b] = w;
  if (a === b) return a >= s.start && a < s.end ? 1 : 0;
  return Math.max(0, Math.min(b, s.end) - Math.max(a, s.start)) / (b - a);
}

/** Candidate civil days (sunrise-to-sunrise) that a span touches. */
function daysTouching(y: YearData, s: Span): Day[] {
  return y.days.filter((d) => d.sunrise < s.end && d.nextSunrise > s.start);
}

/** Pick the day where the span covers the kaal window best; fall back to udaya, then start day. */
export function resolveDay(y: YearData, s: Span, kaal: Kaal): { day: Day; window: [Ms, Ms] } | null {
  const cands = daysTouching(y, s);
  if (!cands.length) return null;
  let best: Day | null = null;
  let bestScore = 0;
  for (const d of cands) {
    const sc = overlapScore(kaalWindow(d, kaal), s);
    if (sc > bestScore + 1e-9) {
      best = d;
      bestScore = sc;
    }
  }
  if (!best) best = cands.find((d) => d.sunrise >= s.start && d.sunrise < s.end) ?? cands[0];
  return { day: best, window: kaalWindow(best, kaal) };
}

const mid = (w: [Ms, Ms]) => (w[0] + w[1]) / 2;
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const dayByDate = (y: YearData, date: string) => y.days.find((d) => d.date === date);

/** Instant the Moon–Sun elongation reaches the middle of tithi `t` (karana boundary). */
function halfTithi(t: Span): Ms {
  const base = 12 * (t.n - 1);
  let lo = t.start;
  let hi = t.end;
  while (hi - lo > 1000) {
    const m = (lo + hi) / 2;
    if (norm360(elongation(m) - base) < 6) lo = m;
    else hi = m;
  }
  return hi;
}

/** Bhadra (Vishti karana) inside a tithi, if any. Vishti = half-tithi k with k ≡ 0 (mod 7). */
export function bhadraIn(t: Span): [Ms, Ms] | null {
  const k0 = 2 * (t.n - 1);
  if (k0 > 0 && k0 % 7 === 0 && k0 < 57) return [t.start, halfTithi(t)];
  if ((k0 + 1) % 7 === 0 && k0 + 1 < 57) return [halfTithi(t), t.end];
  return null;
}

function tithiOcc(y: YearData, def: FestivalDef, t: TithiSpan, kaal: Kaal, system: MonthSystem): Occurrence | null {
  let r = resolveDay(y, t, kaal);
  if (!r) return null;
  const notes: string[] = [];
  const tz = y.place.tz;
  const bh = def.avoidBhadra ? bhadraIn(t) : null;
  if (bh) {
    const [a, b] = r.window;
    const lo = Math.max(a, t.start);
    const hi = Math.min(b, t.end);
    const free = Math.max(0, Math.min(hi, bh[0]) - lo) + Math.max(0, hi - Math.max(lo, bh[1]));
    if (free <= 0) {
      notes.push(`Bhadra ${fmtTime(bh[0], tz)} → ${fmtTime(bh[1], tz)} (${localDate(bh[1], tz)}) covers the ${kaal} window on ${r.day.date}`);
      const d1 = r.day;
      const d2 = y.days[y.days.indexOf(d1) + 1];
      const night = d1.nextSunrise - d1.sunset;
      const limit = def.avoidBhadra === 'midnight' ? d1.sunset + night / 2 : d1.sunset + night / 5;
      if (bh[1] < limit && bh[1] < t.end) {
        r = { day: d1, window: [bh[1], Math.min(t.end, limit, bh[1] + HOUR)] };
        notes.push(`Bhadra ends before ${def.avoidBhadra === 'midnight' ? 'midnight' : 'pradosh is over'}, so it is observed right after ${fmtTime(bh[1], tz)}`);
      } else if (def.avoidBhadra === 'midnight' && system === 'amanta') {
        // Maharashtrian (Dharmasindhu) practice: stay on Purnima night and light the fire in
        // Bhadra Puchha, the tail of Bhadra, rather than moving to Pratipada.
        const dur = bh[1] - bh[0];
        const puchha: [Ms, Ms] = [bh[0] + dur * 0.7, bh[0] + dur * 0.7 + 72 * 60000];
        r = { day: d1, window: puchha };
        notes.push(`Bhadra lasts past midnight — Maharashtrian practice lights Holika in Bhadra Puchha (≈ ${fmtTime(puchha[0], tz)}–${fmtTime(puchha[1], tz)}); North Indian practice moves it to the next evening`);
      } else if (d2 && t.end - d2.sunrise >= 144 * 60000) {
        r = { day: d2, window: kaalWindow(d2, kaal) };
        notes.push(`Purnima lasts ≥ 3 muhurtas after sunrise on ${d2.date}, so it is observed then`);
      } else {
        r = { day: r.day, window: [bh[1], bh[1] + HOUR] };
        notes.push('Observed after Bhadra ends');
      }
    }
  }
  const touching = daysTouching(y, t);
  if (def.id === 'janmashtami') {
    const udaya = touching.find((d) => d.sunrise >= t.start && d.sunrise < t.end);
    const rohini = y.nakshatras.find((n) => n.n === 3 && n.start < r!.window[1] && n.end > r!.window[0]);
    notes.push(rohini ? 'Rohini nakshatra is present at midnight — the ideal Jayanti yoga' : 'Rohini nakshatra is not present at midnight this year');
    if (udaya && udaya.date !== r.day.date) notes.push(`Smarta date (Ashtami at midnight). Vaishnava/ISKCON observance on ${udaya.date} (Ashtami at sunrise)`);
  }
  if (touching.length > 1) {
    notes.push(`${tithiName(t.n)} runs ${localDate(t.start, y.place.tz)} ${fmtTime(t.start, y.place.tz)} → ${localDate(t.end, y.place.tz)} ${fmtTime(t.end, y.place.tz)}`);
  }
  return {
    key: `${def.id}@${r.day.date}`,
    defId: def.id,
    name: def.name,
    mr: def.mr ?? NAME_MR[def.id],
    category: def.category,
    region: def.region,
    date: r.day.date,
    moment: mid(r.window),
    window: r.window,
    kaal,
    tithi: { n: t.n, month: t.month, adhik: t.adhik, start: t.start, end: t.end },
    about: def.about, aboutMr: ABOUT_MR[def.id],
    notes,
  };
}

function nakshatraDay(y: YearData, n: number, from: string, to: string): { day: Day; span: Span } | null {
  let best: { day: Day; span: Span } | null = null;
  let bestScore = 0;
  for (const s of y.nakshatras) {
    if (s.n !== n) continue;
    for (const d of daysTouching(y, s)) {
      if (d.date < from || d.date > to) continue;
      const sc = overlapScore([d.sunrise, d.sunset], s);
      if (sc > bestScore) {
        bestScore = sc;
        best = { day: d, span: s };
      }
    }
  }
  return best;
}

function resolveDef(y: YearData, def: FestivalDef, done: Map<string, Occurrence[]>, system: MonthSystem): Occurrence[] | null {
  const rule = def.rule;
  const tz = y.place.tz;
  switch (rule.kind) {
    case 'tithi':
      return y.tithis
        .filter((t) => t.month === rule.month && t.n === rule.tithi && !t.adhik)
        .map((t) => tithiOcc(y, def, t, rule.kaal, system))
        .filter((o): o is Occurrence => !!o);
    case 'sankranti':
      return y.sankrantis.filter((s) => s.rashi === rule.rashi).flatMap((s) => {
        let date = localDate(s.ms, tz);
        const d = dayByDate(y, date);
        const notes = [`Sun enters ${RASHIS[s.rashi]} at ${fmtTime(s.ms, tz)} on ${date}`];
        if (d && s.ms > d.sunset) {
          date = addDays(date, 1);
          notes.push('Sankranti after sunset — punya kaal and festival move to the next day');
        }
        return [{
          key: `${def.id}@${date}`, defId: def.id, name: def.name, mr: def.mr ?? NAME_MR[def.id], category: def.category, region: def.region,
          date, moment: s.ms, about: def.about, aboutMr: ABOUT_MR[def.id], notes,
        }];
      });
    case 'offset': {
      const base = done.get(rule.of);
      if (!base) return null;
      return base.map((b) => {
        const date = addDays(b.date, rule.days);
        const d = dayByDate(y, date);
        return {
          key: `${def.id}@${date}`, defId: def.id, name: def.name, mr: def.mr ?? NAME_MR[def.id], category: def.category, region: def.region,
          date, moment: d ? (d.sunrise + d.sunset) / 2 : b.moment + rule.days * 24 * HOUR, about: def.about, aboutMr: ABOUT_MR[def.id],
          notes: [`${rule.days > 0 ? 'Day after' : 'Day before'} ${b.name}`],
        };
      });
    }
    case 'nakshatra': {
      const base = done.get(rule.after);
      if (!base) return null;
      return base.flatMap((b) => {
        const r = nakshatraDay(y, rule.nakshatra, addDays(b.date, 1), addDays(b.date, rule.within));
        if (!r) return [];
        const w: [Ms, Ms] = [Math.max(r.day.sunrise, r.span.start), Math.min(r.day.sunset, r.span.end)];
        return [{
          key: `${def.id}@${r.day.date}`, defId: def.id, name: def.name, mr: def.mr ?? NAME_MR[def.id], category: def.category, region: def.region,
          date: r.day.date, moment: mid(w), window: w, kaal: 'day' as Kaal,
          nakshatra: { n: r.span.n, start: r.span.start, end: r.span.end }, about: def.about, aboutMr: ABOUT_MR[def.id],
          notes: [`Moon in ${NAKSHATRAS[rule.nakshatra]} ${fmtTime(r.span.start, tz)} (${localDate(r.span.start, tz)}) → ${fmtTime(r.span.end, tz)} (${localDate(r.span.end, tz)})`],
        }];
      });
    }
    case 'solarNakshatra': {
      const out: Occurrence[] = [];
      for (const s of y.sankrantis.filter((s) => s.rashi === rule.rashi)) {
        const next = y.sankrantis.find((x) => x.ms > s.ms);
        if (!next) continue;
        const r = nakshatraDay(y, rule.nakshatra, localDate(s.ms, tz), localDate(next.ms, tz));
        if (!r) continue;
        const w: [Ms, Ms] = [Math.max(r.day.sunrise, r.span.start), Math.min(r.day.sunset, r.span.end)];
        out.push({
          key: `${def.id}@${r.day.date}`, defId: def.id, name: def.name, mr: def.mr ?? NAME_MR[def.id], category: def.category, region: def.region,
          date: r.day.date, moment: mid(w), window: w, kaal: 'day',
          nakshatra: { n: r.span.n, start: r.span.start, end: r.span.end }, about: def.about, aboutMr: ABOUT_MR[def.id],
          notes: [`Sun in ${RASHIS[rule.rashi]}, Moon in ${NAKSHATRAS[rule.nakshatra]}`],
        });
      }
      return out;
    }
  }
}

// ── Recurring observances ─────────────────────────────────────────────

const EKADASHI_MR: Record<string, string> = {
  Devshayani: 'आषाढी एकादशी', Prabodhini: 'कार्तिकी एकादशी', Nirjala: 'निर्जला एकादशी', Mokshada: 'मोक्षदा एकादशी',
};
const EKADASHI_DISPLAY: Record<string, string> = {
  Devshayani: 'Ashadhi (Devshayani) Ekadashi', Prabodhini: 'Kartiki (Prabodhini) Ekadashi',
};

function ekadashis(y: YearData): Occurrence[] {
  const tz = y.place.tz;
  const out: Occurrence[] = [];
  for (let i = 0; i < y.tithis.length; i++) {
    const t = y.tithis[i];
    if (t.n !== 11 && t.n !== 26) continue;
    const shukla = t.n === 11 ? 0 : 1;
    const base = t.adhik ? ADHIK_EKADASHI_NAMES[shukla] : EKADASHI_NAMES[t.month][shukla];
    const baseMr = t.adhik ? ADHIK_EKADASHI_NAMES_MR[shukla] : EKADASHI_NAMES_MR[t.month][shukla];
    const cands = daysTouching(y, t);
    if (!cands.length) continue;
    const udaya = cands.filter((d) => d.sunrise >= t.start && d.sunrise < t.end);
    const notes: string[] = [];
    let smarta: Day;
    let vaishnava: Day;
    const dw = y.tithis[i + 1];
    if (udaya.length >= 1) {
      smarta = udaya[0];
      vaishnava = udaya.length === 2 ? udaya[1] : smarta;
      // Ekadashi and Dwadashi both in vriddhi (each touches two sunrises): everyone fasts on the second day.
      const after = udaya.length === 2 ? y.days[y.days.indexOf(udaya[1]) + 1] : undefined;
      if (after && dw && dw.end > after.sunrise) {
        smarta = udaya[1];
        notes.push('Ekadashi and Dwadashi both span two sunrises — the fast moves to the second day for all');
      }
      // Parana must fall within Dwadashi: if Dwadashi is gone by the next sunrise, fast a day earlier.
      const pday = y.days[y.days.indexOf(smarta) + 1];
      if (udaya.length === 1 && pday && dw && dw.end <= pday.sunrise && cands[0] !== smarta) {
        smarta = cands[0];
        notes.push('Dwadashi ends before the next sunrise, so the fast is kept on the day Ekadashi begins to allow parana in Dwadashi');
      }
    } else {
      // kshaya ekadashi: never sees a sunrise. Smartas fast that day, Vaishnavas on dwadashi.
      smarta = cands[0];
      vaishnava = y.days[y.days.indexOf(smarta) + 1] ?? smarta;
      notes.push(`Kshaya Ekadashi — the tithi begins and ends between two sunrises; Vaishnavas fast on ${vaishnava.date}`);
    }
    if (udaya.length === 2 && smarta === udaya[0]) notes.push(`Ekadashi prevails at two sunrises — Smarta on ${udaya[0].date}, Vaishnava/Gauna on ${udaya[1].date}`);
    // Vaishnava rule: Dashami must not touch arunodaya (96 min before sunrise).
    if (udaya.length === 1 && t.start > smarta.sunrise - 96 * 60000) {
      const nxt = y.days[y.days.indexOf(smarta) + 1];
      if (nxt) vaishnava = nxt;
    }
    if (vaishnava !== smarta && udaya.length === 1) notes.push(`Vaishnava (ISKCON) observance on ${vaishnava.date} — Dashami touches arunodaya`);
    // Parana: next morning after Hari Vasara (first quarter of Dwadashi) ends.
    const pd = y.days[y.days.indexOf(smarta) + 1];
    if (dw && pd) {
      const hv = t.end + (dw.end - dw.start) / 4;
      const start = Math.max(pd.sunrise, hv);
      const dwEnd = `${fmtTime(dw.end, tz)}${localDate(dw.end, tz) !== pd.date ? ` on ${localDate(dw.end, tz)}` : ''}`;
      if (start < dw.end) notes.push(`Parana on ${pd.date} from ${fmtTime(start, tz)} (Dwadashi ends ${dwEnd})`);
      else notes.push(`Parana on ${pd.date} after sunrise ${fmtTime(pd.sunrise, tz)}`);
    }
    const name = EKADASHI_DISPLAY[base] ?? `${base} Ekadashi`;
    out.push({
      key: `ekadashi-${slug(base)}@${smarta.date}`,
      defId: `ekadashi-${slug(base)}`,
      name,
      mr: EKADASHI_MR[base] ?? `${baseMr} एकादशी`,
      aboutMr: t.adhik
        ? 'अधिक (पुरुषोत्तम) मासातील एकादशी — फक्त अधिक मासातच येते.'
        : base === 'Devshayani'
          ? 'विष्णू योगनिद्रेत जातात — चातुर्मास सुरू होतो. पंढरपूरची वारी या दिवशी विठ्ठलाच्या दर्शनाला पोहोचते.'
          : base === 'Prabodhini'
            ? 'विष्णू जागे होतात — चातुर्मास संपतो आणि लग्नसराई सुरू होते.'
            : 'अकराव्या तिथीचा उपवास — चंद्र सूर्यापासून 120°–132° (शुद्ध) किंवा 300°–312° (वद्य) असताना.',
      category: 'ekadashi',
      region: base === 'Devshayani' || base === 'Prabodhini' ? 'mh' : 'all',
      date: smarta.date,
      moment: smarta.sunrise,
      window: [smarta.sunrise, smarta.sunrise],
      kaal: 'sunrise',
      tithi: { n: t.n, month: t.month, adhik: t.adhik, start: t.start, end: t.end },
      about: t.adhik
        ? 'Ekadashi of the Adhik (Purushottam) maas — occurs only in leap months.'
        : base === 'Devshayani'
          ? 'Vishnu goes to yogic sleep — Chaturmas begins. The Pandharpur Wari reaches Vitthal on this day.'
          : base === 'Prabodhini'
            ? 'Vishnu awakens — Chaturmas ends and the wedding season opens.'
            : 'Fast on the 11th tithi, when the Moon is 120°–132° (Shukla) or 300°–312° (Krishna) from the Sun.',
      notes,
    });
  }
  return out;
}

function masik(y: YearData): Occurrence[] {
  const out: Occurrence[] = [];
  const skip = new Set(['4-5', '4-10', '29-10']); // month-specific festivals already cover these
  for (const t of y.tithis) {
    const push = (id: string, name: string, kaal: Kaal, about: string, region: Region = 'all', mr?: string, category: Category = 'masik') => {
      const r = resolveDay(y, t, kaal);
      if (!r) return;
      out.push({
        key: `${id}@${r.day.date}`, defId: id, name, mr, category, region, date: r.day.date,
        moment: mid(r.window), window: r.window, kaal,
        tithi: { n: t.n, month: t.month, adhik: t.adhik, start: t.start, end: t.end }, about, aboutMr: GEN_ABOUT_MR[id], notes: [],
      });
      return r.day;
    };
    if (skip.has(`${t.n}-${t.month}`) && !t.adhik) continue;
    switch (t.n) {
      case 19: {
        const r = resolveDay(y, t, 'moonrise');
        const angarki = r?.day.weekday === 2;
        push(angarki ? 'angarki-sankashti' : 'sankashti', angarki ? 'Angarki Sankashti Chaturthi' : 'Sankashti Chaturthi', 'moonrise',
          angarki ? 'Sankashti falling on a Tuesday (Mangalvar) — especially auspicious for Ganesha.' : 'Krishna Chaturthi fast for Ganesha, broken after moonrise.',
          'mh', angarki ? 'अंगारकी संकष्टी चतुर्थी' : 'संकष्टी चतुर्थी', angarki ? 'vrat' : 'masik');
        break;
      }
      case 4:
        push('vinayaka-chaturthi', 'Vinayaka Chaturthi', 'madhyahna', 'Shukla Chaturthi puja for Ganesha at madhyahna.', 'mh', 'विनायकी चतुर्थी');
        break;
      case 13:
      case 28: {
        const r = resolveDay(y, t, 'pradosh');
        const wd = r?.day.weekday;
        const prefix = wd === 1 ? 'Som ' : wd === 2 ? 'Bhauma ' : wd === 6 ? 'Shani ' : '';
        const prefixMr = wd === 1 ? 'सोम ' : wd === 2 ? 'भौम ' : wd === 6 ? 'शनी ' : '';
        push('pradosh', `${prefix}Pradosh Vrat`, 'pradosh', 'Trayodashi prevailing at dusk — Shiva puja in pradosh kaal.', 'all', `${prefixMr}प्रदोष`);
        break;
      }
      case 29:
        push('masik-shivaratri', 'Masik Shivaratri', 'nishita', 'Krishna Chaturdashi at midnight, every lunar month.', 'all', 'मासिक शिवरात्री');
        break;
      case 15:
        push('purnima', `${t.adhik ? 'Adhik ' : ''}${MONTHS[t.month]} Purnima`, 'sunrise', 'Full Moon — Moon 168°–180° from the Sun.', 'all', `${t.adhik ? 'अधिक ' : ''}${MONTHS_MR[t.month]} पौर्णिमा`);
        break;
      case 30: {
        const r = resolveDay(y, t, 'sunrise');
        const wd = r?.day.weekday;
        const special = wd === 1 ? 'Somvati Amavasya' : wd === 6 ? 'Shani Amavasya' : null;
        push(special ? slug(special) : 'amavasya', special ?? `${t.adhik ? 'Adhik ' : ''}${MONTHS[t.month]} Amavasya`, 'sunrise',
          special ? `New Moon on a ${wd === 1 ? 'Monday' : 'Saturday'} — especially potent for snan-daan and pitru tarpan.` : 'New Moon — Moon within 12° behind the Sun. Tarpan for ancestors.',
          'all', special ? (wd === 1 ? 'सोमवती अमावस्या' : 'शनी अमावस्या') : `${t.adhik ? 'अधिक ' : ''}${MONTHS_MR[t.month]} अमावस्या`, special ? 'vrat' : 'masik');
        break;
      }
    }
  }
  return out;
}

function dayCombos(y: YearData, system: MonthSystem): Occurrence[] {
  const out: Occurrence[] = [];
  for (const d of y.days) {
    const monthOf = system === 'amanta' || d.tithi <= 15 ? d.month : (d.month + 1) % 12;
    const o = (id: string, name: string, mr: string, about: string, region: Region, category: Category = 'vrat') =>
      out.push({ key: `${id}@${d.date}`, defId: id, name, mr, category, region, date: d.date, moment: d.sunrise, window: [d.sunrise, d.sunset], kaal: 'day', about, aboutMr: GEN_ABOUT_MR[id], notes: [] });
    if (!d.adhik && monthOf === 4 && d.weekday === 1)
      o('shravani-somvar', 'Shravani Somvar', 'श्रावणी सोमवार', `Monday in Shravana (${system}) — Shiva vrat.`, 'all');
    if (!d.adhik && d.month === 4 && d.weekday === 2)
      o('mangala-gaur', 'Mangala Gaur', 'मंगळागौर', 'Tuesdays of (amanta) Shravana — newly-wed women worship Gauri.', 'mh');
    if (d.nakshatra === 7 && (d.weekday === 4 || d.weekday === 0))
      o(d.weekday === 4 ? 'guru-pushya' : 'ravi-pushya', d.weekday === 4 ? 'Guru Pushya Yoga' : 'Ravi Pushya Yoga', d.weekday === 4 ? 'गुरुपुष्यामृत' : 'रविपुष्य',
        `Moon in Pushya nakshatra at sunrise on a ${d.weekday === 4 ? 'Thursday' : 'Sunday'} — prized for buying gold and starting ventures.`, 'all', 'graha');
  }
  return out;
}

function sankrantis(y: YearData): Occurrence[] {
  const tz = y.place.tz;
  return y.sankrantis
    .filter((s) => s.rashi !== 9 && s.rashi !== 0)
    .map((s) => ({
      key: `sankranti-${s.rashi}@${localDate(s.ms, tz)}`, defId: `sankranti-${s.rashi}`, name: `${RASHIS[s.rashi]} Sankranti`, mr: `${RASHIS_MR[s.rashi]} संक्रांत`,
      category: 'sankranti' as Category, region: 'all' as Region, date: localDate(s.ms, tz), moment: s.ms,
      about: `The Sun crosses into sidereal ${RASHIS[s.rashi]}. Each sankranti starts a solar month.`,
      aboutMr: `सूर्य निरयन ${RASHIS_MR[s.rashi]} राशीत प्रवेश करतो. प्रत्येक संक्रांतीला सौर महिना सुरू होतो.`,
      notes: [`Ingress at ${fmtTime(s.ms, tz)}`],
    }));
}

function periods(y: YearData, all: Occurrence[]): Occurrence[] {
  const tz = y.place.tz;
  const out: Occurrence[] = [];
  for (const m of y.months.filter((m) => m.adhik)) {
    const inMonth = y.days.filter((d) => d.sunrise >= m.start && d.sunrise < m.end);
    if (!inMonth.length) continue;
    out.push({
      key: `adhik-maas@${localDate(m.start, tz)}`, defId: 'adhik-maas', name: `Adhik ${MONTHS[m.month]} Maas`, mr: `अधिक ${MONTHS_MR[m.month]} मास`, aboutMr: GEN_ABOUT_MR['adhik-maas'],
      category: 'period', region: 'all', date: inMonth[0].date, endDate: inMonth[inMonth.length - 1].date, moment: m.start,
      about: 'Purushottam maas — a lunar month in which the Sun changes no sign, inserted about every 32.5 months to keep lunar months aligned with the seasons. Annual festivals are not held in it.',
      notes: [`New Moon ${localDate(m.start, tz)} ${fmtTime(m.start, tz)} → New Moon ${localDate(m.end, tz)} ${fmtTime(m.end, tz)}; no sankranti in between`],
    });
  }
  const first = (id: string, after: string) => all.filter((o) => o.defId === id && o.date >= after).sort((a, b) => a.date.localeCompare(b.date))[0];
  for (const s of all.filter((o) => o.defId === 'ekadashi-devshayani')) {
    const e = first('ekadashi-prabodhini', s.date);
    if (e) out.push({
      key: `chaturmas@${s.date}`, defId: 'chaturmas', name: 'Chaturmas', mr: 'चातुर्मास', aboutMr: GEN_ABOUT_MR.chaturmas, category: 'period', region: 'all',
      date: s.date, endDate: e.date, moment: s.moment,
      about: 'Four holy months from Devshayani to Prabodhini Ekadashi while Vishnu sleeps — the Sun moves from Mithuna to Tula through the monsoon. Weddings are avoided.',
      notes: [],
    });
  }
  // Kharmas / Dhanurmas and Meena kharmas: Sun in Dhanu or Meena.
  for (const s of y.sankrantis.filter((s) => s.rashi === 8 || s.rashi === 11)) {
    const e = y.sankrantis.find((x) => x.ms > s.ms);
    if (!e) continue;
    out.push({
      key: `kharmas@${localDate(s.ms, tz)}`, defId: 'kharmas', name: s.rashi === 8 ? 'Kharmas (Dhanurmas)' : 'Kharmas (Meena)', mr: s.rashi === 8 ? 'खरमास (धनुर्मास)' : 'खरमास (मीन)', category: 'period', region: 'north',
      date: localDate(s.ms, tz), endDate: localDate(e.ms, tz), moment: s.ms,
      about: `The Sun transits ${RASHIS[s.rashi]}, a sign of Guru (Jupiter). Auspicious ceremonies such as weddings are avoided.`,
      aboutMr: `सूर्य ${RASHIS_MR[s.rashi]} राशीत (गुरूची रास). विवाहासारखी शुभकार्ये टाळतात.`, notes: [],
    });
  }
  return out;
}

export function resolveFestivals(y: YearData, system: MonthSystem = 'amanta'): Occurrence[] {
  const done = new Map<string, Occurrence[]>();
  let pending = FESTIVALS.slice();
  for (let pass = 0; pass < 4 && pending.length; pass++) {
    const next: FestivalDef[] = [];
    for (const def of pending) {
      const r = resolveDef(y, def, done, system);
      if (r) done.set(def.id, r);
      else next.push(def);
    }
    pending = next;
  }
  let all = [...done.values()].flat();
  all.push(...ekadashis(y), ...masik(y), ...dayCombos(y, system), ...sankrantis(y));

  // Multi-day periods from start/end def pairs.
  for (const def of FESTIVALS.filter((f) => f.endsWith)) {
    for (const s of done.get(def.id) ?? []) {
      const e = (done.get(def.endsWith!) ?? []).filter((o) => o.date >= s.date).sort((a, b) => a.date.localeCompare(b.date))[0];
      if (e) s.endDate = e.date;
    }
  }
  all.push(...periods(y, all));

  const yr = String(y.year);
  all = all.filter((o) => o.date.startsWith(yr) || (o.endDate && o.endDate.startsWith(yr) && o.date < yr));
  all.sort((a, b) => a.date.localeCompare(b.date) || a.moment - b.moment);
  return all;
}
