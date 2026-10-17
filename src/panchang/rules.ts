// Declarative festival rules. Month indices are AMANTA (Chaitra = 0 … Phalguna = 11);
// tithi 1..15 Shukla, 16..30 Krishna. Purnimanta naming is derived for display only —
// the day a festival falls on is the same in both systems.
//
// `kaal` is the part of the day in which the tithi must prevail; the resolver picks the
// civil day whose kaal window overlaps the tithi the most (see festivals.ts).

export type Kaal =
  | 'sunrise' | 'arunodaya' | 'pratah' | 'purvahna' | 'madhyahna' | 'aparahna' | 'sayahna'
  | 'pradosh' | 'nishita' | 'moonrise' | 'day';

export type Category = 'utsav' | 'vrat' | 'ekadashi' | 'sankranti' | 'period' | 'graha' | 'grahan' | 'masik';
export type Region = 'all' | 'mh' | 'north' | 'east' | 'south' | 'west';

export type Rule =
  | { kind: 'tithi'; month: number; tithi: number; kaal: Kaal }
  | { kind: 'sankranti'; rashi: number }
  | { kind: 'offset'; of: string; days: number }
  /** first day after `after` (within `within` days) whose daytime is dominated by the nakshatra */
  | { kind: 'nakshatra'; nakshatra: number; after: string; within: number }
  /** nakshatra during a solar month (Sun in `rashi`), e.g. Onam */
  | { kind: 'solarNakshatra'; rashi: number; nakshatra: number };

export interface FestivalDef {
  id: string;
  name: string;
  mr?: string;
  category: Category;
  region: Region;
  rule: Rule;
  /** makes this a multi-day period ending on the date of another def id */
  endsWith?: string;
  /**
   * Shift away from Bhadra (Vishti karana). 'midnight' (Holika Dahan): if Bhadra ends before
   * midnight, observe right after it; 'pradosh' (Raksha Bandhan): fall back to pradosh if Bhadra
   * is over by then. Otherwise both move to the next day when Purnima lasts ≥ 3 muhurtas after sunrise.
   */
  avoidBhadra?: 'midnight' | 'pradosh';
  about: string;
  /** some items are only helpers for other rules and are not listed on their own */
  hidden?: boolean;
}

const T = (month: number, tithi: number, kaal: Kaal): Rule => ({ kind: 'tithi', month, tithi, kaal });
const OFF = (of: string, days: number): Rule => ({ kind: 'offset', of, days });

export const MONTH = {
  Chaitra: 0, Vaishakha: 1, Jyeshtha: 2, Ashadha: 3, Shravana: 4, Bhadrapada: 5,
  Ashwin: 6, Kartik: 7, Margashirsha: 8, Pausha: 9, Magha: 10, Phalguna: 11,
} as const;
const M = MONTH;

export const FESTIVALS: FestivalDef[] = [
  // ── Chaitra ───────────────────────────────────────────────
  { id: 'gudi-padwa', name: 'Gudi Padwa / Ugadi', mr: 'गुढीपाडवा', category: 'utsav', region: 'mh', rule: T(M.Chaitra, 1, 'sunrise'),
    about: 'Hindu lunar new year (Shalivahan Shaka). The first sunrise after the new moon that follows the Sun reaching the end of Meena.' },
  { id: 'chaitra-navratri', name: 'Chaitra Navratri', mr: 'चैत्र नवरात्र', category: 'period', region: 'north', rule: T(M.Chaitra, 1, 'sunrise'), endsWith: 'ram-navami',
    about: 'Nine nights of Devi worship in the bright fortnight of Chaitra, ending on Ram Navami.' },
  { id: 'ram-navami', name: 'Ram Navami', mr: 'रामनवमी', category: 'utsav', region: 'all', rule: T(M.Chaitra, 9, 'madhyahna'),
    about: 'Birth of Shri Rama at madhyahna (midday) on Chaitra Shukla Navami.' },
  { id: 'hanuman-jayanti', name: 'Hanuman Jayanti', mr: 'हनुमान जयंती', category: 'utsav', region: 'all', rule: T(M.Chaitra, 15, 'sunrise'),
    about: 'Birth of Hanuman at sunrise on Chaitra Purnima.' },

  // ── Vaishakha ─────────────────────────────────────────────
  { id: 'akshaya-tritiya', name: 'Akshaya Tritiya', mr: 'अक्षय्य तृतीया', category: 'utsav', region: 'all', rule: T(M.Vaishakha, 3, 'purvahna'),
    about: 'One of the three-and-a-half sade-teen muhurtas. Sun is exalted in Mesha and Moon in Vrishabha — both luminaries at their brightest sign.' },
  { id: 'narasimha-jayanti', name: 'Narasimha Jayanti', mr: 'नृसिंह जयंती', category: 'utsav', region: 'all', rule: T(M.Vaishakha, 14, 'sayahna'),
    about: 'Appearance of Narasimha at dusk (sayankal) on Vaishakha Shukla Chaturdashi.' },
  { id: 'buddha-purnima', name: 'Buddha Purnima', mr: 'बुद्ध पौर्णिमा', category: 'utsav', region: 'all', rule: T(M.Vaishakha, 15, 'sunrise'),
    about: 'Full moon of Vaishakha: Sun in Mesha/Vrishabha, full Moon opposite in Tula/Vrishchika (Vishakha nakshatra).' },
  { id: 'vat-savitri-amavasya', name: 'Vat Savitri (Amavasya)', category: 'vrat', region: 'north', rule: T(M.Vaishakha, 30, 'sunrise'),
    about: 'North Indian Vat Savitri vrat on Jyeshtha Amavasya (purnimanta) = Vaishakha Amavasya (amanta).' },
  { id: 'shani-jayanti', name: 'Shani Jayanti', mr: 'शनि जयंती', category: 'utsav', region: 'all', rule: T(M.Vaishakha, 30, 'sunrise'),
    about: 'Birth of Shani on Jyeshtha Amavasya (purnimanta).' },

  // ── Jyeshtha ──────────────────────────────────────────────
  { id: 'ganga-dussehra', name: 'Ganga Dussehra', category: 'utsav', region: 'north', rule: T(M.Jyeshtha, 10, 'sunrise'),
    about: 'Descent of Ganga, Jyeshtha Shukla Dashami (ideally with Hasta nakshatra).' },
  { id: 'vat-purnima', name: 'Vat Purnima', mr: 'वटपौर्णिमा', category: 'vrat', region: 'mh', rule: T(M.Jyeshtha, 15, 'sunrise'),
    about: 'Maharashtrian Vat Savitri vrat — women worship the banyan tree on Jyeshtha Purnima.' },

  // ── Ashadha ───────────────────────────────────────────────
  { id: 'rath-yatra', name: 'Jagannath Rath Yatra', category: 'utsav', region: 'east', rule: T(M.Ashadha, 2, 'sunrise'),
    about: 'Chariot festival of Puri on Ashadha Shukla Dwitiya.' },
  { id: 'guru-purnima', name: 'Guru Purnima', mr: 'गुरुपौर्णिमा', category: 'utsav', region: 'all', rule: T(M.Ashadha, 15, 'sunrise'),
    about: 'Vyasa Purnima — full Moon of Ashadha, typically in Purva/Uttara Ashadha nakshatra.' },

  // ── Shravana ──────────────────────────────────────────────
  { id: 'nag-panchami', name: 'Nag Panchami', mr: 'नागपंचमी', category: 'utsav', region: 'all', rule: T(M.Shravana, 5, 'pratah'),
    about: 'Worship of the serpent deities on Shravana Shukla Panchami (morning).' },
  { id: 'narali-purnima', name: 'Narali Purnima', mr: 'नारळी पौर्णिमा', category: 'utsav', region: 'mh', rule: T(M.Shravana, 15, 'sunrise'),
    about: 'Koli fishing communities offer coconuts to the sea marking the end of monsoon storms.' },
  { id: 'raksha-bandhan', name: 'Raksha Bandhan', mr: 'रक्षाबंधन', category: 'utsav', region: 'all', rule: T(M.Shravana, 15, 'aparahna'), avoidBhadra: 'pradosh',
    about: 'Shravana Purnima, rakhi tied in aparahna avoiding Bhadra (Vishti karana).' },
  { id: 'janmashtami', name: 'Krishna Janmashtami', mr: 'श्रीकृष्ण जन्माष्टमी', category: 'utsav', region: 'all', rule: T(M.Shravana, 23, 'nishita'),
    about: 'Birth of Krishna at nishita (midnight) on Krishna Ashtami — Shravana amanta / Bhadrapada purnimanta. Rohini nakshatra is preferred.' },
  { id: 'dahi-handi', name: 'Dahi Handi / Gopalkala', mr: 'दहीहंडी / गोपाळकाला', category: 'utsav', region: 'mh', rule: OFF('janmashtami', 1),
    about: 'Day after Janmashtami — human pyramids break the curd pot.' },
  { id: 'pola', name: 'Bail Pola', mr: 'बैलपोळा', category: 'utsav', region: 'mh', rule: T(M.Shravana, 30, 'sunrise'),
    about: 'Farmers honour their bullocks on Shravana (Pithori) Amavasya.' },

  // ── Bhadrapada ────────────────────────────────────────────
  { id: 'hartalika', name: 'Hartalika Teej', mr: 'हरतालिका', category: 'vrat', region: 'all', rule: T(M.Bhadrapada, 3, 'sunrise'),
    about: 'Women’s fast for Parvati on Bhadrapada Shukla Tritiya.' },
  { id: 'ganesh-chaturthi', name: 'Ganesh Chaturthi', mr: 'गणेश चतुर्थी', category: 'utsav', region: 'all', rule: T(M.Bhadrapada, 4, 'madhyahna'),
    about: 'Ganesha was born at madhyahna on Bhadrapada Shukla Chaturthi; the idol is installed in that window. Moon-sighting is avoided this night.' },
  { id: 'ganeshotsav', name: 'Ganeshotsav', mr: 'गणेशोत्सव', category: 'period', region: 'mh', rule: T(M.Bhadrapada, 4, 'madhyahna'), endsWith: 'anant-chaturdashi',
    about: 'Ten-day public festival popularised by Lokmanya Tilak in Pune, ending with visarjan.' },
  { id: 'rishi-panchami', name: 'Rishi Panchami', mr: 'ऋषिपंचमी', category: 'vrat', region: 'mh', rule: T(M.Bhadrapada, 5, 'madhyahna'),
    about: 'Worship of the Saptarishi on Bhadrapada Shukla Panchami.' },
  { id: 'gauri-avahan', name: 'Jyeshtha Gauri Avahan', mr: 'ज्येष्ठा गौरी आवाहन', category: 'utsav', region: 'mh',
    rule: { kind: 'nakshatra', nakshatra: 16, after: 'ganesh-chaturthi', within: 8 },
    about: 'Gauri is welcomed home when the Moon is in Anuradha nakshatra during Ganeshotsav.' },
  { id: 'gauri-pujan', name: 'Jyeshtha Gauri Pujan', mr: 'ज्येष्ठा गौरी पूजन', category: 'utsav', region: 'mh',
    rule: { kind: 'nakshatra', nakshatra: 17, after: 'gauri-avahan', within: 3 },
    about: 'Main Gauri puja when the Moon is in Jyeshtha nakshatra.' },
  { id: 'gauri-visarjan', name: 'Jyeshtha Gauri Visarjan', mr: 'ज्येष्ठा गौरी विसर्जन', category: 'utsav', region: 'mh',
    rule: { kind: 'nakshatra', nakshatra: 18, after: 'gauri-pujan', within: 3 },
    about: 'Gauri departs when the Moon reaches Mula nakshatra.' },
  { id: 'anant-chaturdashi', name: 'Anant Chaturdashi', mr: 'अनंत चतुर्दशी', category: 'utsav', region: 'all', rule: T(M.Bhadrapada, 14, 'sunrise'),
    about: 'Ganesh visarjan and Anant vrat on Bhadrapada Shukla Chaturdashi.' },
  { id: 'pitru-paksha', name: 'Pitru Paksha', mr: 'पितृपक्ष', category: 'period', region: 'all', rule: T(M.Bhadrapada, 16, 'aparahna'), endsWith: 'sarvapitri-amavasya',
    about: 'Fortnight of ancestor rites (shraddha, done at aparahna), from Pratipada to Amavasya; Purnima Shraddha falls the day before. The Sun enters Kanya — hence also “Kanyagat”. Amanta Bhadrapada Krishna = purnimanta Ashwin Krishna.' },
  { id: 'sarvapitri-amavasya', name: 'Sarvapitri Amavasya', mr: 'सर्वपित्री अमावस्या', category: 'vrat', region: 'all', rule: T(M.Bhadrapada, 30, 'aparahna'),
    about: 'Mahalaya Amavasya — shraddha for all ancestors, new Moon with the Sun in Kanya.' },
  { id: 'onam', name: 'Onam (Thiruvonam)', category: 'utsav', region: 'south', rule: { kind: 'solarNakshatra', rashi: 4, nakshatra: 21 },
    about: 'Kerala harvest festival: Moon in Shravana (Thiruvonam) nakshatra while the Sun is in Simha (solar month Chingam).' },

  // ── Ashwin ────────────────────────────────────────────────
  { id: 'ghatasthapana', name: 'Ghatasthapana (Sharad Navratri)', mr: 'घटस्थापना', category: 'utsav', region: 'all', rule: T(M.Ashwin, 1, 'pratah'),
    about: 'Kalash installed in the morning of Ashwin Shukla Pratipada — the new Moon after the Sun enters Kanya.' },
  { id: 'sharad-navratri', name: 'Sharad Navratri', mr: 'शारदीय नवरात्रोत्सव', category: 'period', region: 'all', rule: T(M.Ashwin, 1, 'pratah'), endsWith: 'maha-navami',
    about: 'Nine nights of Durga worship in the bright fortnight of Ashwin.' },
  { id: 'durga-ashtami', name: 'Durga Ashtami', category: 'utsav', region: 'east', rule: T(M.Ashwin, 8, 'sunrise'),
    about: 'Maha Ashtami of Sharad Navratri.' },
  { id: 'maha-navami', name: 'Maha Navami', category: 'utsav', region: 'all', rule: T(M.Ashwin, 9, 'sunrise'),
    about: 'Ninth day of Navratri.' },
  { id: 'dussehra', name: 'Vijayadashami (Dussehra)', mr: 'विजयादशमी (दसरा)', category: 'utsav', region: 'all', rule: T(M.Ashwin, 10, 'aparahna'),
    about: 'Seemollanghan and exchange of apta leaves (“sone”). Observed on Dashami at aparahna; Shravana nakshatra is auspicious.' },
  { id: 'kojagiri', name: 'Kojagiri / Sharad Purnima', mr: 'कोजागरी पौर्णिमा', category: 'utsav', region: 'mh', rule: T(M.Ashwin, 15, 'nishita'),
    about: '“Ko jagarti?” — Lakshmi asks who is awake. Milk is cooled in the light of the full Moon at midnight.' },
  { id: 'karva-chauth', name: 'Karva Chauth', category: 'vrat', region: 'north', rule: T(M.Ashwin, 19, 'moonrise'),
    about: 'Fast broken at moonrise on Krishna Chaturthi (Kartik purnimanta / Ashwin amanta).' },
  { id: 'vasubaras', name: 'Vasubaras', mr: 'वसुबारस', category: 'utsav', region: 'mh', rule: T(M.Ashwin, 27, 'pradosh'),
    about: 'Govatsa Dwadashi — worship of cow and calf at dusk; the first day of Maharashtrian Diwali.' },
  { id: 'dhanteras', name: 'Dhanteras', mr: 'धनत्रयोदशी', category: 'utsav', region: 'all', rule: T(M.Ashwin, 28, 'pradosh'),
    about: 'Dhanvantari and Lakshmi-Kubera puja in pradosh kaal on Krishna Trayodashi.' },
  { id: 'narak-chaturdashi', name: 'Narak Chaturdashi', mr: 'नरक चतुर्दशी', category: 'utsav', region: 'all', rule: T(M.Ashwin, 29, 'arunodaya'),
    about: 'Abhyanga snan before sunrise while Chaturdashi prevails and the thin crescent Moon rises.' },
  { id: 'diwali', name: 'Diwali — Lakshmi Puja', mr: 'लक्ष्मीपूजन', category: 'utsav', region: 'all', rule: T(M.Ashwin, 30, 'pradosh'),
    about: 'Amavasya prevailing in pradosh kaal, Sun in Tula (debilitated) and Moon conjunct it — the darkest night lit by lamps.' },

  // ── Kartik ────────────────────────────────────────────────
  { id: 'balipratipada', name: 'Balipratipada / Govardhan Puja', mr: 'दिवाळी पाडवा / बलिप्रतिपदा', category: 'utsav', region: 'all', rule: T(M.Kartik, 1, 'pratah'),
    about: 'Kartik Shukla Pratipada — Vikram Samvat new year, Diwali Padwa.' },
  { id: 'bhaubeej', name: 'Bhaubeej / Bhai Dooj', mr: 'भाऊबीज', category: 'utsav', region: 'all', rule: T(M.Kartik, 2, 'aparahna'),
    about: 'Yama Dwitiya — sisters perform aukshan (aarti) for brothers.' },
  { id: 'chhath', name: 'Chhath Puja', category: 'utsav', region: 'east', rule: T(M.Kartik, 6, 'sayahna'),
    about: 'Arghya to the setting Sun on Kartik Shukla Shashthi.' },
  { id: 'tulsi-vivah', name: 'Tulsi Vivah', mr: 'तुळशी विवाह', category: 'utsav', region: 'mh', rule: T(M.Kartik, 12, 'pradosh'),
    about: 'Marriage of Tulsi with Vishnu after he awakens (Kartik Shukla Dwadashi, evening). Opens the wedding season.' },
  { id: 'kartik-purnima', name: 'Kartik / Tripuri Purnima', mr: 'त्रिपुरारी पौर्णिमा', category: 'utsav', region: 'all', rule: T(M.Kartik, 15, 'pradosh'),
    about: 'Dev Deepawali — lamps at dusk on the full Moon of Kartik (Moon in Krittika).' },

  // ── Margashirsha ──────────────────────────────────────────
  { id: 'champa-shashthi', name: 'Champa Shashthi', mr: 'चंपाषष्ठी', category: 'utsav', region: 'mh', rule: T(M.Margashirsha, 6, 'sunrise'),
    about: 'End of Khandoba Navratri (Jejuri) on Margashirsha Shukla Shashthi.' },
  { id: 'gita-jayanti', name: 'Gita Jayanti', mr: 'गीता जयंती', category: 'utsav', region: 'all', rule: T(M.Margashirsha, 11, 'sunrise'),
    about: 'Day the Bhagavad Gita was spoken — Mokshada Ekadashi.' },
  { id: 'datta-jayanti', name: 'Datta Jayanti', mr: 'दत्त जयंती', category: 'utsav', region: 'mh', rule: T(M.Margashirsha, 15, 'pradosh'),
    about: 'Birth of Dattatreya at dusk on Margashirsha Purnima (Moon in Mrigashira).' },

  // ── Pausha / Magha / Phalguna ─────────────────────────────
  { id: 'bhogi', name: 'Bhogi / Lohri', mr: 'भोगी', category: 'utsav', region: 'mh', rule: OFF('makar-sankranti', -1),
    about: 'Eve of Makar Sankranti.' },
  { id: 'makar-sankranti', name: 'Makar Sankranti / Pongal', mr: 'मकर संक्रांत', category: 'sankranti', region: 'all', rule: { kind: 'sankranti', rashi: 9 },
    about: 'The Sun enters sidereal Makara — start of Uttarayan in the panchang tradition. “Tilgul ghya, goad goad bola.”' },
  { id: 'vasant-panchami', name: 'Vasant Panchami', mr: 'वसंत पंचमी', category: 'utsav', region: 'all', rule: T(M.Magha, 5, 'purvahna'),
    about: 'Saraswati puja in the forenoon of Magha Shukla Panchami.' },
  { id: 'maghi-ganesh-jayanti', name: 'Maghi Ganesh Jayanti', mr: 'माघी गणेश जयंती', category: 'utsav', region: 'mh', rule: T(M.Magha, 4, 'madhyahna'),
    about: 'Ganesha’s birth as per Ganesh Purana, Magha Shukla Chaturthi at madhyahna.' },
  { id: 'rath-saptami', name: 'Rath Saptami', mr: 'रथसप्तमी', category: 'utsav', region: 'all', rule: T(M.Magha, 7, 'sunrise'),
    about: 'Surya Jayanti — the Sun’s chariot turns north; sunrise bath on Magha Shukla Saptami.' },
  { id: 'maha-shivaratri', name: 'Maha Shivaratri', mr: 'महाशिवरात्री', category: 'utsav', region: 'all', rule: T(M.Magha, 29, 'nishita'),
    about: 'Night of Shiva — Krishna Chaturdashi prevailing at nishita, Magha amanta / Phalguna purnimanta. The Moon is a thin crescent just before new moon.' },
  { id: 'shiv-jayanti-tithi', name: 'Shivaji Maharaj Jayanti (tithi)', mr: 'शिवजयंती (तिथीनुसार)', category: 'utsav', region: 'mh', rule: T(M.Phalguna, 18, 'sunrise'),
    about: 'Chhatrapati Shivaji Maharaj’s birth anniversary by tithi — Phalguna Vadya Tritiya.' },
  { id: 'holashtak', name: 'Holashtak', category: 'period', region: 'north', rule: T(M.Phalguna, 8, 'sunrise'), endsWith: 'holika-dahan',
    about: 'Eight inauspicious days before Holika Dahan.' },
  { id: 'holika-dahan', name: 'Holika Dahan', mr: 'होळी', category: 'utsav', region: 'all', rule: T(M.Phalguna, 15, 'pradosh'), avoidBhadra: 'midnight',
    about: 'Bonfire at pradosh on Phalguna Purnima (outside Bhadra). The Sun is in Kumbha/Meena and the full Moon in Purva/Uttara Phalguni.' },
  { id: 'holi', name: 'Holi / Dhulivandan', mr: 'धुलिवंदन', category: 'utsav', region: 'all', rule: OFF('holika-dahan', 1),
    about: 'Festival of colours the day after Holika Dahan.' },
  { id: 'rang-panchami', name: 'Rang Panchami', mr: 'रंगपंचमी', category: 'utsav', region: 'mh', rule: T(M.Phalguna, 20, 'sunrise'),
    about: 'Colours on Phalguna Krishna Panchami — the Maharashtrian day of rang.' },

  // ── Solar ─────────────────────────────────────────────────
  { id: 'mesha-sankranti', name: 'Mesha Sankranti / Baisakhi', category: 'sankranti', region: 'north', rule: { kind: 'sankranti', rashi: 0 },
    about: 'The Sun enters sidereal Mesha — solar new year (Baisakhi, Vishu, Puthandu, Pohela Boishakh).' },
];
