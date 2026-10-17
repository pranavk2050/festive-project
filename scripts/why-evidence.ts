// Computes the astronomical evidence used by the "Why?" tab: patterns that hold across
// 2000–2050 (or across centuries) and therefore explain a rule rather than one year's accident.
// Usage: node scripts/why-evidence.ts > why-evidence.json
import { computeYear, localDate } from '../src/panchang/engine.ts';
import { resolveFestivals } from '../src/panchang/festivals.ts';
import { PLACES } from '../src/data/locations.ts';
import { A, astroTime, sunSidereal, sunTropical, moonSidereal, grahaSidereal, findBoundaries, ayanamsa, elongation } from '../src/astro/ephemeris.ts';

const pune = PLACES[0];
const DAY = 86400000;
const RASHI = ['Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya', 'Tula', 'Vrishchika', 'Dhanu', 'Makara', 'Kumbha', 'Meena'];
const out: Record<string, unknown> = {};

// ── Per-festival patterns over 2000–2050 ───────────────────────────
const years = Array.from({ length: 51 }, (_, i) => 2000 + i);
const want = ['sarvapitri-amavasya', 'diwali', 'ghatasthapana', 'gudi-padwa', 'rath-saptami', 'akshaya-tritiya', 'holika-dahan',
  'ganesh-chaturthi', 'ekadashi-devshayani', 'ekadashi-prabodhini', 'makar-sankranti', 'vat-purnima'];
const rows: Record<string, { y: number; date: string; sunSid: number; sunTrop: number; moonSid: number; el: number }[]> = {};
let adhik: { y: number; month: number; start: string }[] = [];
let tithiStats = { total: 0, kshaya: 0, vriddhi: 0 };
for (const yr of years) {
  const y = computeYear(yr, pune);
  const occ = resolveFestivals(y, 'amanta');
  for (const id of want) {
    for (const o of occ.filter((o) => o.defId === id)) {
      (rows[id] ??= []).push({ y: yr, date: o.date, sunSid: sunSidereal(o.moment), sunTrop: sunTropical(o.moment), moonSid: moonSidereal(o.moment), el: elongation(o.moment) });
    }
  }
  for (const m of y.months.filter((m) => m.adhik && localDate(m.start, 5.5).startsWith(String(yr)))) adhik.push({ y: yr, month: m.month, start: localDate(m.start, 5.5) });
  // kshaya / vriddhi tithis: count sunrises inside each tithi of this year
  const days = y.days.filter((d) => d.date.startsWith(String(yr)));
  for (const t of y.tithis.filter((t) => localDate(t.start, 5.5).startsWith(String(yr)))) {
    const n = days.filter((d) => d.sunrise >= t.start && d.sunrise < t.end).length;
    tithiStats.total++;
    if (n === 0) tithiStats.kshaya++;
    if (n === 2) tithiStats.vriddhi++;
  }
}
const summarize = (id: string) => {
  const r = rows[id] ?? [];
  const signCount: Record<string, number> = {};
  for (const x of r) signCount[RASHI[Math.floor(x.sunSid / 30)]] = (signCount[RASHI[Math.floor(x.sunSid / 30)]] ?? 0) + 1;
  const moonSign: Record<string, number> = {};
  for (const x of r) moonSign[RASHI[Math.floor(x.moonSid / 30)]] = (moonSign[RASHI[Math.floor(x.moonSid / 30)]] ?? 0) + 1;
  const range = (k: 'sunSid' | 'sunTrop') => [Math.min(...r.map((x) => x[k])), Math.max(...r.map((x) => x[k]))].map((v) => +v.toFixed(1));
  const dates = r.map((x) => x.date.slice(5)).sort();
  return { n: r.length, sunSign: signCount, moonSign, sunSidRange: range('sunSid'), sunTropRange: range('sunTrop'), earliest: dates[0], latest: dates[dates.length - 1] };
};
out.festivals = Object.fromEntries(want.map((id) => [id, summarize(id)]));

// Akshaya Tritiya: how often are BOTH Sun in Mesha and Moon in Vrishabha (both exaltation signs)?
const at = rows['akshaya-tritiya'] ?? [];
out.akshayaBothExalted = { both: at.filter((x) => Math.floor(x.sunSid / 30) === 0 && Math.floor(x.moonSid / 30) === 1).length, of: at.length };

// Rath Saptami: Sun's sidereal longitude vs Dhanishta's start (293°20') — the Vedanga Jyotisha winter solstice point.
const rs = rows['rath-saptami'] ?? [];
const meanRs = rs.reduce((s, x) => s + x.sunSid, 0) / rs.length;
out.rathSaptami = { meanSunSidereal: +meanRs.toFixed(2), dhanishtaStart: 293.33, diff: +(meanRs - 293.33).toFixed(2) };

// Adhik maas spacing
adhik = adhik.sort((a, b) => a.start.localeCompare(b.start));
const gaps = adhik.slice(1).map((a, i) => Math.round((Date.parse(a.start) - Date.parse(adhik[i].start)) / (DAY * 30.4368)));
out.adhik = { list: adhik.map((a) => `${a.start} Adhik ${['Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada', 'Ashwin', 'Kartik', 'Margashirsha', 'Pausha', 'Magha', 'Phalguna'][a.month]}`),
  gapsMonths: gaps, meanGapMonths: +(gaps.reduce((s, g) => s + g, 0) / gaps.length).toFixed(2) };
out.tithiStats = { ...tithiStats, perYear: +(tithiStats.total / years.length).toFixed(1) };

// ── Makar Sankranti drift across centuries vs the December solstice ──
const sankrantiVsSolstice = [];
for (const yr of [-1200, 0, 285, 500, 1000, 1500, 1900, 2026, 2500, 3000]) {
  const from = Date.UTC(2000, 0, 1) + (yr - 2000) * 365.2425 * DAY - 40 * DAY;
  const b = findBoundaries(sunSidereal, 30, from, from + 80 * DAY, DAY).find((x) => x.idx === 9);
  const sol = A.Seasons(yr - 1).dec_solstice.date.getTime();
  sankrantiVsSolstice.push({ year: yr, ayanamsa: +ayanamsa(b ? b.ms : from).toFixed(2), daysAfterSolstice: b ? +((b.ms - sol) / DAY).toFixed(1) : null });
}
out.makarDrift = sankrantiVsSolstice;

// ── Jupiter: sidereal period and Kumbha-entry intervals ──────────────
const jEntries: string[] = [];
const jFrom = Date.UTC(1960, 0, 1);
const jb = findBoundaries((ms) => grahaSidereal('Jupiter', ms), 30, jFrom, Date.UTC(2060, 0, 1), 3 * DAY);
let lastK = -1;
for (const b of jb) {
  if (b.idx !== 10) continue;
  if (lastK > 0 && b.ms - lastK < 2 * 365 * DAY) continue; // ignore retrograde re-entries
  jEntries.push(new Date(b.ms).toISOString().slice(0, 10));
  lastK = b.ms;
}
const jGaps = jEntries.slice(1).map((d, i) => +((Date.parse(d) - Date.parse(jEntries[i])) / (365.25 * DAY)).toFixed(2));
out.jupiterKumbha = { entries: jEntries, gapsYears: jGaps };

// ── Eclipse geometry 2026-03-03: Moon's ecliptic latitude and node distance ──
{
  const le = A.SearchLunarEclipse(astroTime(Date.UTC(2026, 2, 1)));
  const t = le.peak.date.getTime();
  const m = A.EclipticGeoMoon(le.peak);
  const T = (t - Date.UTC(2000, 0, 1, 12)) / DAY / 36525;
  const rahu = ((125.0445479 - 1934.1362891 * T) % 360 + 360) % 360;
  out.eclipse20260303 = { peakUTC: new Date(t).toISOString(), moonLat: +m.lat.toFixed(3), moonLonTrop: +m.lon.toFixed(2), rahuTrop: +rahu.toFixed(2), ketuTrop: +((rahu + 180) % 360).toFixed(2) };
}

// ── Ganesh Chaturthi 2026: crescent after sunset ──
{
  const obs = new A.Observer(pune.lat, pune.lon, pune.height);
  const day = Date.UTC(2026, 8, 14) - 5.5 * 3600000;
  const set = A.SearchRiseSet(A.Body.Sun, obs, -1, astroTime(day), 1)!.date.getTime();
  const mset = A.SearchRiseSet(A.Body.Moon, obs, -1, astroTime(set - 3600000), 1)!.date.getTime();
  const illum = A.Illumination(A.Body.Moon, astroTime(set));
  out.ganeshMoon = { sunsetIST: new Date(set + 19800e3).toISOString().slice(11, 16), moonsetIST: new Date(mset + 19800e3).toISOString().slice(11, 16), hoursVisible: +((mset - set) / 3600000).toFixed(2), phaseFraction: +illum.phase_fraction.toFixed(3), elongation: +elongation(set).toFixed(1) };
}

// ── Sarvapitri Amavasya: Moon–Sun separation and the "far side noon" ──
const sp = rows['sarvapitri-amavasya'] ?? [];
out.sarvapitri = { meanElongationAtAparahna: +(sp.reduce((s, x) => s + (x.el > 180 ? x.el - 360 : x.el), 0) / sp.length).toFixed(1) };

// ── Navratris vs equinoxes: tropical Sun at Ghatasthapana / Gudi Padwa ──
out.navratri = { sharadTropicalSun: (out.festivals as Record<string, { sunTropRange: number[] }>)['ghatasthapana'].sunTropRange, chaitraTropicalSun: (out.festivals as Record<string, { sunTropRange: number[] }>)['gudi-padwa'].sunTropRange };

console.log(JSON.stringify(out, null, 1));
