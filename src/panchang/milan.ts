// Ashtakoot Guna Milan (36-point kundali matching) plus Nadi / Bhakoot / Gana dosha checks with
// their common cancellations, and Mangal (Kuja) dosha for each person.
// All matrices are [boy][girl] (rows = groom, columns = bride). Tables follow the mainstream
// North Indian / Drik Panchang convention; see README for the sources and known variants.
import { type Ms, grahaSidereal } from '../astro/ephemeris.ts';
import type { Place } from '../data/locations.ts';
import { avakahada, type Avakahada } from './avakahada.ts';

const LORDS = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

/** Vashya order: Chatushpada, Manava, Jalachara, Vanachara, Keeta. */
const VASHYA_M = [
  [2, 1, 1, 0, 1],
  [1, 2, 0.5, 0, 1],
  [1, 0.5, 2, 1, 1],
  [0, 0, 1, 2, 0],
  [1, 1, 1, 0, 2],
];
/** Yoni order: Ashwa, Gaja, Mesha, Sarpa, Shwan, Marjar, Mushak, Gau, Mahisha, Vyaghra, Mriga, Vanar, Nakul, Simha. */
const YONI_M = [
  [4, 2, 2, 3, 2, 2, 2, 1, 0, 1, 1, 3, 2, 1],
  [2, 4, 3, 3, 2, 2, 2, 2, 3, 1, 2, 3, 2, 0],
  [2, 3, 4, 2, 1, 2, 1, 3, 3, 1, 2, 0, 3, 1],
  [3, 3, 2, 4, 2, 1, 1, 1, 1, 2, 2, 2, 0, 2],
  [2, 2, 1, 2, 4, 2, 1, 2, 2, 1, 0, 2, 1, 1],
  [2, 2, 2, 1, 2, 4, 0, 2, 2, 1, 3, 3, 2, 1],
  [2, 2, 1, 1, 1, 0, 4, 2, 2, 2, 2, 2, 1, 2],
  [1, 2, 3, 1, 2, 2, 2, 4, 3, 0, 3, 2, 2, 1],
  [0, 3, 3, 1, 2, 2, 2, 3, 4, 1, 2, 2, 2, 2],
  [1, 1, 1, 2, 1, 1, 2, 0, 1, 4, 1, 1, 2, 1],
  [3, 2, 2, 2, 0, 3, 2, 3, 2, 1, 4, 2, 2, 1],
  [3, 3, 0, 2, 2, 3, 2, 2, 2, 1, 2, 4, 3, 2],
  [2, 2, 3, 0, 1, 2, 1, 2, 2, 2, 2, 3, 4, 2],
  [1, 0, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 4],
];
/** Graha Maitri by Moon-sign lords, order Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn. */
const MAITRI_M = [
  [5, 5, 5, 4, 5, 0, 0],
  [5, 5, 4, 1, 4, 0.5, 0.5],
  [5, 4, 5, 0.5, 5, 3, 0.5],
  [4, 1, 0.5, 5, 0.5, 5, 4],
  [5, 4, 5, 0.5, 5, 0.5, 3],
  [0, 0.5, 3, 5, 0.5, 5, 5],
  [0, 0.5, 0.5, 4, 3, 5, 5],
];
/** Gana order: Deva, Manushya, Rakshasa. */
const GANA_M = [
  [6, 6, 1],
  [5, 6, 0],
  [1, 0, 6],
];

export type KootaId = 'varna' | 'vashya' | 'tara' | 'yoni' | 'maitri' | 'gana' | 'bhakoot' | 'nadi';
export interface Koota {
  id: KootaId;
  max: number;
  points: number;
}
export interface Dosha {
  id: 'nadi' | 'bhakoot' | 'gana';
  present: boolean;
  /** keys of the cancellation rules that apply */
  cancelledBy: string[];
}
export interface Mangal {
  fromLagna: number;
  fromMoon: number;
  manglikLagna: boolean;
  manglikMoon: boolean;
  /** Mars in its own sign (Mesha, Vrishchika) or exalted (Makara) */
  ownOrExalted: boolean;
}
export interface MilanResult {
  bride: Avakahada;
  groom: Avakahada;
  kootas: Koota[];
  total: number;
  band: 0 | 1 | 2 | 3;
  doshas: Dosha[];
  mangal: { bride: Mangal; groom: Mangal; mutual: boolean };
  /** Tara remainders each way (for display) */
  tara: { girlToBoy: number; boyToGirl: number };
}

const MANGLIK_HOUSES = [1, 4, 7, 8, 12];

function mangal(ms: Ms, a: Avakahada): Mangal {
  const marsRashi = Math.floor(grahaSidereal('Mars', ms) / 30);
  const fromLagna = ((marsRashi - a.lagnaRashi + 12) % 12) + 1;
  const fromMoon = ((marsRashi - a.rashi + 12) % 12) + 1;
  return {
    fromLagna,
    fromMoon,
    manglikLagna: MANGLIK_HOUSES.includes(fromLagna),
    manglikMoon: MANGLIK_HOUSES.includes(fromMoon),
    ownOrExalted: marsRashi === 0 || marsRashi === 7 || marsRashi === 9,
  };
}

const taraRem = (from: number, to: number) => (((to - from + 27) % 27) + 1) % 9;
const taraGood = (r: number) => r !== 3 && r !== 5 && r !== 7;

export function gunaMilan(bride: { ms: Ms; place: Place }, groom: { ms: Ms; place: Place }): MilanResult {
  const g = avakahada(bride.ms, bride.place);
  const b = avakahada(groom.ms, groom.place);
  const lb = LORDS.indexOf(b.rashiLord);
  const lg = LORDS.indexOf(g.rashiLord);
  const girlToBoy = taraRem(g.nakshatra, b.nakshatra);
  const boyToGirl = taraRem(b.nakshatra, g.nakshatra);
  const d = ((b.rashi - g.rashi + 12) % 12) + 1;
  const bhakootBad = [2, 12, 5, 9, 6, 8].includes(d);
  const maitri = MAITRI_M[lb][lg];

  const kootas: Koota[] = [
    { id: 'varna', max: 1, points: b.varna <= g.varna ? 1 : 0 },
    { id: 'vashya', max: 2, points: VASHYA_M[b.vashya][g.vashya] },
    { id: 'tara', max: 3, points: (taraGood(girlToBoy) ? 1.5 : 0) + (taraGood(boyToGirl) ? 1.5 : 0) },
    { id: 'yoni', max: 4, points: YONI_M[b.yoni][g.yoni] },
    { id: 'maitri', max: 5, points: maitri },
    { id: 'gana', max: 6, points: GANA_M[b.gana][g.gana] },
    { id: 'bhakoot', max: 7, points: bhakootBad ? 0 : 7 },
    { id: 'nadi', max: 8, points: b.nadi === g.nadi ? 0 : 8 },
  ];
  const total = kootas.reduce((s, k) => s + k.points, 0);
  const band = total < 18 ? 0 : total < 25 ? 1 : total < 33 ? 2 : 3;

  const sameLord = lb === lg;
  const friendlyLords = maitri >= 5;
  const nadiCancel: string[] = [];
  if (b.nadi === g.nadi) {
    if (b.rashi === g.rashi && b.nakshatra !== g.nakshatra) nadiCancel.push('sameRashiDiffNak');
    if (b.nakshatra === g.nakshatra && b.rashi !== g.rashi) nadiCancel.push('sameNakDiffRashi');
    if (b.nakshatra === g.nakshatra && b.rashi === g.rashi && b.pada !== g.pada) nadiCancel.push('sameNakDiffPada');
    if (sameLord || friendlyLords) nadiCancel.push('friendlyLords');
    // same nakshatra and same pada is the severe form: no parihara applies
    if (b.nakshatra === g.nakshatra && b.pada === g.pada) nadiCancel.length = 0;
  }
  const bhakootCancel: string[] = [];
  if (bhakootBad) {
    if (sameLord) bhakootCancel.push('sameLord');
    else if (friendlyLords) bhakootCancel.push('friendlyLords');
  }
  const ganaBad = GANA_M[b.gana][g.gana] <= 1;
  const ganaCancel: string[] = [];
  if (ganaBad) {
    if (sameLord || friendlyLords) ganaCancel.push('friendlyLords');
    if (!bhakootBad) ganaCancel.push('bhakootGood');
    // Rakshasa dosha lapses when the bride's nakshatra is beyond the 14th from the groom's.
    if (((g.nakshatra - b.nakshatra + 27) % 27) + 1 > 14) ganaCancel.push('nakDistance');
  }
  const mb = mangal(bride.ms, g);
  const mg = mangal(groom.ms, b);
  const isManglik = (m: Mangal) => (m.manglikLagna || m.manglikMoon) && !m.ownOrExalted;
  return {
    bride: g,
    groom: b,
    kootas,
    total,
    band,
    doshas: [
      { id: 'nadi', present: b.nadi === g.nadi, cancelledBy: nadiCancel },
      { id: 'bhakoot', present: bhakootBad, cancelledBy: bhakootCancel },
      { id: 'gana', present: ganaBad, cancelledBy: ganaCancel },
    ],
    mangal: { bride: mb, groom: mg, mutual: isManglik(mb) && isManglik(mg) },
    tara: { girlToBoy, boyToGirl },
  };
}
