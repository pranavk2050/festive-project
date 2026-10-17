// Avakahada Chakra — the classical table of attributes derived from the Moon's nakshatra,
// pada and rashi at a given moment (used in kundali and guna-milan), plus lagna-based paya
// and the Vimshottari dasha balance.
import { A, type Ms, DEG, astroTime, julianCenturies, moonSidereal, norm360, toSidereal, ayanamsa } from '../astro/ephemeris.ts';
import type { Place } from '../data/locations.ts';

const NAK = 360 / 27;

/** Naamakshar: name syllables for each nakshatra pada [mr, en]. The chakra is named after अ-व-क-ह-ड. */
export const NAAMAKSHAR: [string, string][][] = [
  [['चू', 'Chu'], ['चे', 'Che'], ['चो', 'Cho'], ['ला', 'La']],
  [['ली', 'Li'], ['लू', 'Lu'], ['ले', 'Le'], ['लो', 'Lo']],
  [['अ', 'A'], ['ई', 'I'], ['उ', 'U'], ['ए', 'E']],
  [['ओ', 'O'], ['वा', 'Va'], ['वी', 'Vi'], ['वू', 'Vu']],
  [['वे', 'Ve'], ['वो', 'Vo'], ['का', 'Ka'], ['की', 'Ki']],
  [['कू', 'Ku'], ['घ', 'Gha'], ['ङ', 'Nga'], ['छ', 'Chha']],
  [['के', 'Ke'], ['को', 'Ko'], ['हा', 'Ha'], ['ही', 'Hi']],
  [['हू', 'Hu'], ['हे', 'He'], ['हो', 'Ho'], ['डा', 'Da']],
  [['डी', 'Di'], ['डू', 'Du'], ['डे', 'De'], ['डो', 'Do']],
  [['मा', 'Ma'], ['मी', 'Mi'], ['मू', 'Mu'], ['मे', 'Me']],
  [['मो', 'Mo'], ['टा', 'Ta'], ['टी', 'Ti'], ['टू', 'Tu']],
  [['टे', 'Te'], ['टो', 'To'], ['पा', 'Pa'], ['पी', 'Pi']],
  [['पू', 'Pu'], ['ष', 'Sha'], ['ण', 'Na'], ['ठ', 'Tha']],
  [['पे', 'Pe'], ['पो', 'Po'], ['रा', 'Ra'], ['री', 'Ri']],
  [['रू', 'Ru'], ['रे', 'Re'], ['रो', 'Ro'], ['ता', 'Ta']],
  [['ती', 'Ti'], ['तू', 'Tu'], ['ते', 'Te'], ['तो', 'To']],
  [['ना', 'Na'], ['नी', 'Ni'], ['नू', 'Nu'], ['ने', 'Ne']],
  [['नो', 'No'], ['या', 'Ya'], ['यी', 'Yi'], ['यू', 'Yu']],
  [['ये', 'Ye'], ['यो', 'Yo'], ['भा', 'Bha'], ['भी', 'Bhi']],
  [['भू', 'Bhu'], ['धा', 'Dha'], ['फा', 'Pha'], ['ढा', 'Dha']],
  [['भे', 'Bhe'], ['भो', 'Bho'], ['जा', 'Ja'], ['जी', 'Ji']],
  [['खी', 'Khi'], ['खू', 'Khu'], ['खे', 'Khe'], ['खो', 'Kho']],
  [['गा', 'Ga'], ['गी', 'Gi'], ['गू', 'Gu'], ['गे', 'Ge']],
  [['गो', 'Go'], ['सा', 'Sa'], ['सी', 'Si'], ['सू', 'Su']],
  [['से', 'Se'], ['सो', 'So'], ['दा', 'Da'], ['दी', 'Di']],
  [['दू', 'Du'], ['थ', 'Tha'], ['झ', 'Jha'], ['ञ', 'Nya']],
  [['दे', 'De'], ['दो', 'Do'], ['चा', 'Cha'], ['ची', 'Chi']],
];

// Attribute tables. Each entry: [english, marathi].
export const VARNA: [string, string][] = [['Brahmin', 'ब्राह्मण'], ['Kshatriya', 'क्षत्रिय'], ['Vaishya', 'वैश्य'], ['Shudra', 'शूद्र']];
/** Varna by rashi: water signs Brahmin, fire Kshatriya, earth Vaishya, air Shudra. */
const RASHI_VARNA = [1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0];

export const VASHYA: [string, string][] = [
  ['Chatushpada (quadruped)', 'चतुष्पद'], ['Manava (human)', 'मानव'], ['Jalachara (aquatic)', 'जलचर'],
  ['Vanachara (wild)', 'वनचर'], ['Keeta (insect)', 'कीटक'],
];
function vashyaOf(moonSid: number): number {
  const r = Math.floor(moonSid / 30);
  const firstHalf = moonSid % 30 < 15;
  switch (r) {
    case 0: case 1: return 0;
    case 2: case 5: case 6: case 10: return 1;
    case 3: case 11: return 2;
    case 4: return 3;
    case 7: return 4;
    case 8: return firstHalf ? 1 : 0;
    case 9: return firstHalf ? 0 : 2;
  }
  return 1;
}

export const YONI: [string, string][] = [
  ['Ashwa (horse)', 'अश्व'], ['Gaja (elephant)', 'गज'], ['Mesha (ram)', 'मेष'], ['Sarpa (serpent)', 'सर्प'],
  ['Shwan (dog)', 'श्वान'], ['Marjar (cat)', 'मार्जार'], ['Mushak (rat)', 'मूषक'], ['Gau (cow)', 'गौ'],
  ['Mahisha (buffalo)', 'महिष'], ['Vyaghra (tiger)', 'व्याघ्र'], ['Mriga (deer)', 'मृग'], ['Vanar (monkey)', 'वानर'],
  ['Nakul (mongoose)', 'नकुल'], ['Simha (lion)', 'सिंह'],
];
const NAK_YONI = [0, 1, 2, 3, 3, 4, 5, 2, 5, 6, 6, 7, 8, 9, 8, 9, 10, 10, 4, 11, 12, 11, 13, 0, 13, 7, 1];

export const GANA: [string, string][] = [['Deva', 'देव'], ['Manushya', 'मनुष्य'], ['Rakshasa', 'राक्षस']];
const NAK_GANA = [0, 1, 2, 1, 0, 1, 0, 0, 2, 2, 1, 1, 0, 2, 0, 2, 0, 2, 2, 1, 1, 0, 2, 2, 1, 1, 0];

export const NADI: [string, string][] = [['Adi (Vata)', 'आद्य'], ['Madhya (Pitta)', 'मध्य'], ['Antya (Kapha)', 'अंत्य']];
const nadiOf = (nak: number) => [0, 1, 2, 2, 1, 0][nak % 6];

export const TATVA: [string, string][] = [['Agni (fire)', 'अग्नी'], ['Prithvi (earth)', 'पृथ्वी'], ['Vayu (air)', 'वायू'], ['Jala (water)', 'जल']];

export const PAYA: [string, string][] = [['Swarna (gold)', 'सुवर्ण'], ['Rajat (silver)', 'रौप्य'], ['Tamra (copper)', 'ताम्र'], ['Loha (iron)', 'लोह']];
/** Paya from the Moon's house counted from the lagna: 1,6,11 gold · 2,5,9 silver · 3,7,10 copper · 4,8,12 iron. */
const HOUSE_PAYA = [0, 1, 2, 3, 1, 0, 2, 3, 1, 2, 0, 3];

export const RASHI_LORD = ['Mars', 'Venus', 'Mercury', 'Moon', 'Sun', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter'];
/** Vimshottari order of nakshatra lords and their dasha lengths in years. */
export const DASHA_LORDS = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
const DASHA_YEARS = [7, 20, 6, 10, 7, 18, 16, 19, 17];

/** Sidereal ascendant (lagna) for a moment and place. */
export function lagna(ms: Ms, place: Place): number {
  const t = astroTime(ms);
  const T = julianCenturies(ms);
  const ramc = norm360(A.SiderealTime(t) * 15 + place.lon) * DEG;
  const eps = (23.4392911 - 0.0130042 * T) * DEG;
  const phi = place.lat * DEG;
  const asc = Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps))) / DEG;
  return toSidereal(norm360(asc), ms);
}

export interface Avakahada {
  moonSid: number;
  rashi: number;
  nakshatra: number;
  pada: number;
  varna: number;
  vashya: number;
  yoni: number;
  gana: number;
  nadi: number;
  tatva: number;
  paya: number;
  lagna: number;
  lagnaRashi: number;
  moonHouse: number;
  rashiLord: string;
  nakshatraLord: string;
  naamakshar: [string, string];
  dasha: { lord: string; balanceYears: number; totalYears: number };
  ayanamsa: number;
}

export function avakahada(ms: Ms, place: Place): Avakahada {
  const moon = moonSidereal(ms);
  const rashi = Math.floor(moon / 30);
  const nakshatra = Math.floor(moon / NAK);
  const within = (moon % NAK) / NAK;
  const pada = Math.floor(within * 4) + 1;
  const lg = lagna(ms, place);
  const lagnaRashi = Math.floor(lg / 30);
  const moonHouse = ((rashi - lagnaRashi + 12) % 12) + 1;
  const lordIdx = nakshatra % 9;
  return {
    moonSid: moon,
    rashi,
    nakshatra,
    pada,
    varna: RASHI_VARNA[rashi],
    vashya: vashyaOf(moon),
    yoni: NAK_YONI[nakshatra],
    gana: NAK_GANA[nakshatra],
    nadi: nadiOf(nakshatra),
    tatva: rashi % 4,
    paya: HOUSE_PAYA[moonHouse - 1],
    lagna: lg,
    lagnaRashi,
    moonHouse,
    rashiLord: RASHI_LORD[rashi],
    nakshatraLord: DASHA_LORDS[lordIdx],
    naamakshar: NAAMAKSHAR[nakshatra][pada - 1],
    dasha: { lord: DASHA_LORDS[lordIdx], balanceYears: DASHA_YEARS[lordIdx] * (1 - within), totalYears: DASHA_YEARS[lordIdx] },
    ayanamsa: ayanamsa(ms),
  };
}
