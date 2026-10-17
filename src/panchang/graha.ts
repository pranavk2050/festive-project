// Planetary (graha) events: sidereal sign ingress (gochar), retrograde (vakri) periods,
// combustion (asta) and eclipses with local visibility.
import {
  A, type Ms, type Graha, astroTime, grahaSidereal, grahaSpeed, grahaEcliptic, makeObserver, norm360,
} from '../astro/ephemeris.ts';
import { type YearData, localDate, fmtTime, localMidnight, DAY } from './engine.ts';
import type { Occurrence } from './festivals.ts';
import { GRAHA_NAMES, RASHIS, GRAHA_MR, RASHIS_MR } from './constants.ts';

const ECLIPSE_KIND_MR: Record<string, string> = { total: 'खग्रास', partial: 'खंडग्रास', penumbral: 'छायाकल्प', annular: 'कंकणाकृती' };

/** Bisect a boolean/int-valued function between lo (value a) and hi (value ≠ a). */
function bisect(f: (ms: Ms) => number, lo: Ms, hi: Ms): Ms {
  const a = f(lo);
  while (hi - lo > 60000) {
    const m = (lo + hi) / 2;
    if (f(m) === a) lo = m;
    else hi = m;
  }
  return hi;
}

/** Scan [start,end] daily for changes of an integer-valued function. */
function changes(f: (ms: Ms) => number, start: Ms, end: Ms, step = DAY): { ms: Ms; from: number; to: number }[] {
  const out: { ms: Ms; from: number; to: number }[] = [];
  let pv = f(start);
  for (let t = start + step; t <= end; t += step) {
    const v = f(t);
    if (v !== pv) {
      const ms = bisect(f, t - step, t);
      out.push({ ms, from: pv, to: v });
      pv = v;
    }
  }
  return out;
}

// Classical combustion orbs (degrees from the Sun); retrograde orbs where they differ.
const ASTA_ORB: Record<string, [number, number]> = {
  Mercury: [14, 12], Venus: [10, 8], Mars: [17, 17], Jupiter: [11, 11], Saturn: [15, 15],
};

function sunDistance(g: Graha, ms: Ms): number {
  const d = Math.abs(norm360(grahaEcliptic(g, ms).lon - grahaEcliptic('Sun', ms).lon));
  return d > 180 ? 360 - d : d;
}

export function grahaEvents(y: YearData): Occurrence[] {
  const tz = y.place.tz;
  const start = localMidnight(`${y.year}-01-01`, tz);
  const end = localMidnight(`${y.year + 1}-01-01`, tz);
  const out: Occurrence[] = [];
  const ev = (o: Omit<Occurrence, 'key' | 'region' | 'notes'> & { notes?: string[] }) =>
    out.push({ region: 'all', notes: [], ...o, key: `${o.defId}@${o.date}` });

  // Gochar: sign changes. Slow grahas matter most astrologically; Mars/Venus/Mercury included too.
  const ingressGrahas: Graha[] = ['Jupiter', 'Saturn', 'Rahu', 'Mars', 'Venus', 'Mercury'];
  for (const g of ingressGrahas) {
    const sign = (ms: Ms) => Math.floor(grahaSidereal(g, ms) / 30);
    for (const c of changes(sign, start, end, g === 'Mercury' || g === 'Venus' ? DAY / 2 : DAY)) {
      const retro = grahaSpeed(g, c.ms) < 0;
      const date = localDate(c.ms, tz);
      const extra = g === 'Rahu' ? ` (Ketu enters ${RASHIS[(c.to + 6) % 12]})` : '';
      const extraMr = g === 'Rahu' ? ` (केतू ${RASHIS_MR[(c.to + 6) % 12]} राशीत)` : '';
      ev({
        defId: `gochar-${g.toLowerCase()}`, name: `${GRAHA_NAMES[g]} enters ${RASHIS[c.to]}${extra}`, mr: `${GRAHA_MR[g]} ${RASHIS_MR[c.to]} राशीत${extraMr}`, category: 'graha',
        aboutMr: g === 'Jupiter'
          ? 'गुरूचे वार्षिक राशीपरिवर्तन. कुंभमेळे गुरूच्या राशीवरून ठरतात (उदा. गुरू सिंहेत असताना नाशिकचा सिंहस्थ).'
          : g === 'Saturn'
            ? 'शनी सुमारे अडीच वर्षांनी रास बदलतो; तीन राशींची साडेसाती सुरू किंवा संपते.'
            : `${GRAHA_MR[g]} निरयन ${RASHIS_MR[c.to]} राशीत प्रवेश करतो${retro ? ' (वक्री असताना)' : ''}.`,
        date, moment: c.ms,
        about: g === 'Jupiter'
          ? 'Guru gochar — Jupiter’s yearly sign change. Kumbh Melas are timed by Jupiter’s sign (e.g. Simhastha at Nashik when Guru is in Simha).'
          : g === 'Saturn'
            ? 'Shani gochar — Saturn changes sign every ~2.5 years, starting or ending Sade Sati for three rashis.'
            : `${GRAHA_NAMES[g]} (${g}) crosses into sidereal ${RASHIS[c.to]}${retro ? ' while retrograde' : ''}.`,
        notes: [`${fmtTime(c.ms, tz)} IST, from ${RASHIS[c.from]}${retro ? ' — vakri (retrograde)' : ''}`],
      });
    }
  }

  // Vakri (retrograde) periods.
  for (const g of ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'] as Graha[]) {
    const retro = (ms: Ms) => (grahaSpeed(g, ms) < 0 ? 1 : 0);
    const cs = changes(retro, start - 200 * DAY, end + 200 * DAY);
    for (let i = 0; i < cs.length; i++) {
      if (cs[i].to !== 1) continue;
      const s = cs[i].ms;
      const e = cs[i + 1]?.ms ?? end;
      if (e < start || s > end) continue;
      ev({
        defId: `vakri-${g.toLowerCase()}`, name: `${GRAHA_NAMES[g]} Vakri (${g} retrograde)`, mr: `${GRAHA_MR[g]} वक्री`, category: 'graha',
        aboutMr: `पृथ्वीवरून पाहता ${GRAHA_MR[g]} राशिचक्रात उलटा फिरताना दिसतो, कारण ${g === 'Mercury' || g === 'Venus' ? 'तो आतल्या कक्षेतून पृथ्वीला मागे टाकतो' : 'पृथ्वी त्याला मागे टाकते'}.`,
        date: localDate(s, tz), endDate: localDate(e, tz), moment: (s + e) / 2,
        about: `Seen from Earth, ${g} appears to move backwards through the zodiac as ${g === 'Mercury' || g === 'Venus' ? 'it overtakes Earth on the inside track' : 'Earth overtakes it'}.`,
        notes: [`Stations retrograde in ${RASHIS[Math.floor(grahaSidereal(g, s) / 30)]}, direct in ${RASHIS[Math.floor(grahaSidereal(g, e) / 30)]}`],
      });
    }
  }

  // Asta (combustion) — especially Guru and Shukra asta, which close the wedding season.
  for (const g of ['Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'] as Graha[]) {
    const [orb, orbR] = ASTA_ORB[g];
    const combust = (ms: Ms) => (sunDistance(g, ms) < (grahaSpeed(g, ms) < 0 ? orbR : orb) ? 1 : 0);
    const cs = changes(combust, start - 120 * DAY, end + 120 * DAY);
    for (let i = 0; i < cs.length; i++) {
      if (cs[i].to !== 1) continue;
      const s = cs[i].ms;
      const e = cs[i + 1]?.ms ?? end;
      if (e < start || s > end) continue;
      const important = g === 'Jupiter' || g === 'Venus';
      ev({
        defId: `asta-${g.toLowerCase()}`, name: `${GRAHA_NAMES[g]} Asta (${g} combust)`, mr: `${GRAHA_MR[g]} अस्त`, category: 'graha',
        aboutMr: `${GRAHA_MR[g]} सूर्यापासून ${orb}° च्या आत असल्याने सूर्यतेजात लुप्त.${important ? ' गुरू किंवा शुक्र अस्त असताना विवाह व गृहप्रवेश करत नाहीत.' : ''}`,
        date: localDate(s, tz), endDate: localDate(e, tz), moment: (s + e) / 2,
        about: `${g} is within ${orb}° of the Sun and lost in its glare.${important ? ' Marriages and griha-pravesh are not performed while Guru or Shukra is asta.' : ''}`,
      });
    }
  }

  // Eclipses.
  const obs = makeObserver(y.place.lat, y.place.lon, y.place.height);
  const moonAlt = (ms: Ms) => {
    const t = astroTime(ms);
    const eq = A.Equator(A.Body.Moon, t, obs, true, true);
    return A.Horizon(t, obs, eq.ra, eq.dec, 'normal').altitude;
  };
  for (let le = A.SearchLunarEclipse(astroTime(start)); le.peak.date.getTime() < end; le = A.NextLunarEclipse(le.peak)) {
    const peak = le.peak.date.getTime();
    const half = (le.sd_partial || le.sd_penum) * 60000;
    const visible = [peak - half, peak, peak + half].some((t) => moonAlt(t) > 0);
    ev({
      defId: 'chandra-grahan', name: `Chandra Grahan — ${le.kind} lunar eclipse`, mr: `चंद्रग्रहण — ${ECLIPSE_KIND_MR[le.kind] ?? le.kind}`, category: 'grahan',
      aboutMr: 'राहू किंवा केतूजवळ पूर्ण चंद्र पृथ्वीच्या छायेतून जातो. दिसणाऱ्या चंद्रग्रहणाचे वेध 9 तास आधी सुरू होतात.',
      date: localDate(peak, tz), moment: peak,
      about: 'Full Moon passing through Earth’s shadow near Rahu or Ketu. Sutak begins 9 hours before a visible lunar eclipse.',
      notes: [
        `Peak ${fmtTime(peak, tz)} IST`,
        le.sd_partial ? `Umbral phase ${fmtTime(peak - le.sd_partial * 60000, tz)} – ${fmtTime(peak + le.sd_partial * 60000, tz)}` : 'Penumbral only',
        visible ? `Visible from ${y.place.name}` : `Not visible from ${y.place.name} (Moon below horizon)`,
      ],
    });
  }
  for (let se = A.SearchGlobalSolarEclipse(astroTime(start)); se.peak.date.getTime() < end; se = A.NextGlobalSolarEclipse(se.peak)) {
    const peak = se.peak.date.getTime();
    const local = A.SearchLocalSolarEclipse(astroTime(peak - 2 * DAY), obs);
    const lp = local.peak.time.date.getTime();
    const visible = Math.abs(lp - peak) < DAY && local.peak.altitude > 0;
    const where = se.latitude !== undefined ? ` (greatest at ${se.latitude.toFixed(0)}°, ${se.longitude!.toFixed(0)}°)` : '';
    ev({
      defId: 'surya-grahan', name: `Surya Grahan — ${se.kind} solar eclipse`, mr: `सूर्यग्रहण — ${ECLIPSE_KIND_MR[se.kind] ?? se.kind}`, category: 'grahan',
      aboutMr: 'राहू किंवा केतूजवळ अमावस्येचा चंद्र सूर्यासमोरून जातो. दिसणाऱ्या सूर्यग्रहणाचे वेध 12 तास आधी सुरू होतात.',
      date: localDate(peak, tz), moment: peak,
      about: 'New Moon passing in front of the Sun near Rahu or Ketu. Sutak begins 12 hours before a visible solar eclipse.',
      notes: [`Global peak ${fmtTime(peak, tz)} IST${where}`, visible ? `Visible from ${y.place.name} (${(local.obscuration * 100).toFixed(0)}% obscured)` : `Not visible from ${y.place.name}`],
    });
  }
  return out;
}
