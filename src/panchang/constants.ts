// Names used throughout the panchang. Index conventions:
//   tithi 1..30 (1-15 Shukla, 16-30 Krishna; 15 = Purnima, 30 = Amavasya)
//   month 0..11 starting Chaitra; rashi 0..11 starting Mesha; nakshatra 0..26 starting Ashwini.

export const TITHI_NAMES = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami',
  'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima',
];
export const TITHI_NAMES_MR = [
  'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी', 'षष्ठी', 'सप्तमी', 'अष्टमी',
  'नवमी', 'दशमी', 'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पौर्णिमा',
];

export function tithiName(t: number): string {
  if (t === 30) return 'Amavasya';
  return TITHI_NAMES[(t - 1) % 15];
}
export function tithiNameMr(t: number): string {
  if (t === 30) return 'अमावस्या';
  return TITHI_NAMES_MR[(t - 1) % 15];
}
export const paksha = (t: number) => (t <= 15 ? 'Shukla' : 'Krishna');
export const pakshaMr = (t: number) => (t <= 15 ? 'शुद्ध' : 'वद्य');

export const MONTHS = [
  'Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada',
  'Ashwin', 'Kartik', 'Margashirsha', 'Pausha', 'Magha', 'Phalguna',
];
export const MONTHS_MR = [
  'चैत्र', 'वैशाख', 'ज्येष्ठ', 'आषाढ', 'श्रावण', 'भाद्रपद',
  'आश्विन', 'कार्तिक', 'मार्गशीर्ष', 'पौष', 'माघ', 'फाल्गुन',
];

export const RASHIS = [
  'Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya',
  'Tula', 'Vrishchika', 'Dhanu', 'Makara', 'Kumbha', 'Meena',
];
export const RASHI_EN = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];
export const RASHI_SYMBOLS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

export const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha',
  'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
  'Uttara Bhadrapada', 'Revati',
];
export const NAK = Object.fromEntries(NAKSHATRAS.map((n, i) => [n, i])) as Record<string, number>;

export const YOGAS = [
  'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarma', 'Dhriti', 'Shula',
  'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyana',
  'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti',
];

const MOVABLE_KARANAS = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti'];
/** Karana from half-tithi index 0..59. Vishti is also called Bhadra. */
export function karanaName(k: number): string {
  if (k === 0) return 'Kimstughna';
  if (k === 57) return 'Shakuni';
  if (k === 58) return 'Chatushpada';
  if (k === 59) return 'Naga';
  return MOVABLE_KARANAS[(k - 1) % 7];
}

export const VARAS = ['Ravivar', 'Somvar', 'Mangalvar', 'Budhvar', 'Guruvar', 'Shukravar', 'Shanivar'];
export const VARAS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** Ekadashi names by amanta month: [shukla, krishna]. Adhik maas has its own pair. */
export const EKADASHI_NAMES: [string, string][] = [
  ['Kamada', 'Varuthini'],
  ['Mohini', 'Apara'],
  ['Nirjala', 'Yogini'],
  ['Devshayani', 'Kamika'],
  ['Shravana Putrada', 'Aja'],
  ['Parivartini', 'Indira'],
  ['Papankusha', 'Rama'],
  ['Prabodhini', 'Utpanna'],
  ['Mokshada', 'Saphala'],
  ['Pausha Putrada', 'Shattila'],
  ['Jaya', 'Vijaya'],
  ['Amalaki', 'Papmochani'],
];
export const ADHIK_EKADASHI_NAMES: [string, string] = ['Padmini', 'Parama'];

export const GRAHA_NAMES: Record<string, string> = {
  Sun: 'Surya', Moon: 'Chandra', Mercury: 'Budha', Venus: 'Shukra', Mars: 'Mangal',
  Jupiter: 'Guru', Saturn: 'Shani', Rahu: 'Rahu', Ketu: 'Ketu',
};

// ── Marathi names ─────────────────────────────────────────────
export const NAKSHATRAS_MR = [
  'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशीर्ष', 'आर्द्रा', 'पुनर्वसू', 'पुष्य', 'आश्लेषा',
  'मघा', 'पूर्वा फाल्गुनी', 'उत्तरा फाल्गुनी', 'हस्त', 'चित्रा', 'स्वाती', 'विशाखा', 'अनुराधा', 'ज्येष्ठा',
  'मूळ', 'पूर्वाषाढा', 'उत्तराषाढा', 'श्रवण', 'धनिष्ठा', 'शततारका', 'पूर्वा भाद्रपदा', 'उत्तरा भाद्रपदा', 'रेवती',
];
export const RASHIS_MR = ['मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या', 'तूळ', 'वृश्चिक', 'धनु', 'मकर', 'कुंभ', 'मीन'];
export const YOGAS_MR = [
  'विष्कंभ', 'प्रीती', 'आयुष्मान', 'सौभाग्य', 'शोभन', 'अतिगंड', 'सुकर्मा', 'धृती', 'शूल',
  'गंड', 'वृद्धी', 'ध्रुव', 'व्याघात', 'हर्षण', 'वज्र', 'सिद्धी', 'व्यतिपात', 'वरीयान',
  'परिघ', 'शिव', 'सिद्ध', 'साध्य', 'शुभ', 'शुक्ल', 'ब्रह्म', 'इंद्र', 'वैधृती',
];
const MOVABLE_KARANAS_MR = ['बव', 'बालव', 'कौलव', 'तैतिल', 'गर', 'वणिज', 'विष्टी'];
export function karanaNameMr(k: number): string {
  if (k === 0) return 'किंस्तुघ्न';
  if (k === 57) return 'शकुनी';
  if (k === 58) return 'चतुष्पाद';
  if (k === 59) return 'नाग';
  return MOVABLE_KARANAS_MR[(k - 1) % 7];
}
export const VARAS_MR = ['रविवार', 'सोमवार', 'मंगळवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
export const GRAHA_MR: Record<string, string> = {
  Sun: 'सूर्य', Moon: 'चंद्र', Mercury: 'बुध', Venus: 'शुक्र', Mars: 'मंगळ',
  Jupiter: 'गुरू', Saturn: 'शनी', Rahu: 'राहू', Ketu: 'केतू',
};
export const EKADASHI_NAMES_MR: [string, string][] = [
  ['कामदा', 'वरूथिनी'],
  ['मोहिनी', 'अपरा'],
  ['निर्जला', 'योगिनी'],
  ['देवशयनी', 'कामिका'],
  ['श्रावण पुत्रदा', 'अजा'],
  ['परिवर्तिनी', 'इंदिरा'],
  ['पाशांकुशा', 'रमा'],
  ['प्रबोधिनी', 'उत्पत्ती'],
  ['मोक्षदा', 'सफला'],
  ['पौष पुत्रदा', 'षट्तिला'],
  ['जया', 'विजया'],
  ['आमलकी', 'पापमोचनी'],
];
export const ADHIK_EKADASHI_NAMES_MR: [string, string] = ['पद्मिनी', 'परमा'];

/** Presiding deity (devata) of each nakshatra: [english, marathi]. */
export const NAKSHATRA_DEVATA: [string, string][] = [
  ['Ashwini Kumaras', 'अश्विनीकुमार'],
  ['Yama', 'यम'],
  ['Agni', 'अग्नी'],
  ['Brahma (Prajapati)', 'ब्रह्मा (प्रजापती)'],
  ['Soma (Chandra)', 'सोम (चंद्र)'],
  ['Rudra', 'रुद्र'],
  ['Aditi', 'अदिती'],
  ['Brihaspati', 'बृहस्पती'],
  ['Sarpa (Nagas)', 'सर्प (नाग)'],
  ['Pitrs (ancestors)', 'पितर'],
  ['Bhaga', 'भग'],
  ['Aryaman', 'अर्यमा'],
  ['Savitr (Surya)', 'सविता (सूर्य)'],
  ['Tvashtr (Vishwakarma)', 'त्वष्टा (विश्वकर्मा)'],
  ['Vayu', 'वायू'],
  ['Indra-Agni', 'इंद्राग्नी'],
  ['Mitra', 'मित्र'],
  ['Indra', 'इंद्र'],
  ['Nirriti', 'निऋती'],
  ['Apas (waters)', 'आप (जलदेवता)'],
  ['Vishvedevas', 'विश्वेदेव'],
  ['Vishnu', 'विष्णू'],
  ['Ashta Vasus', 'अष्टवसू'],
  ['Varuna', 'वरुण'],
  ['Aja Ekapada', 'अजैकपाद'],
  ['Ahirbudhnya', 'अहिर्बुध्न्य'],
  ['Pushan', 'पूषा'],
];

/**
 * Aradhya vriksha (worship tree) of each nakshatra, as used for nakshatra-van plantings:
 * [english, marathi, botanical]. A few nakshatras have regional variants, noted in the english name.
 */
export const NAKSHATRA_VRIKSHA: [string, string, string][] = [
  ['Kuchala (Kupilu)', 'कुचला', 'Strychnos nux-vomica'],
  ['Amla (Amalaki)', 'आवळा', 'Phyllanthus emblica'],
  ['Umbar (Audumbar)', 'उंबर', 'Ficus racemosa'],
  ['Jamun (Jambu)', 'जांभूळ', 'Syzygium cumini'],
  ['Khair (Khadira)', 'खैर', 'Senegalia catechu'],
  ['Krishna Agaru', 'कृष्णागरू', 'Aquilaria malaccensis'],
  ['Bamboo (Vamsha)', 'वेळू (बांबू)', 'Bambusa spp.'],
  ['Pipal (Ashvattha)', 'पिंपळ', 'Ficus religiosa'],
  ['Nagchampa (Naga)', 'नागचाफा', 'Mesua ferrea'],
  ['Banyan (Vata)', 'वड', 'Ficus benghalensis'],
  ['Palash', 'पळस', 'Butea monosperma'],
  ['Payar (Plaksha)', 'पायर (प्लक्ष)', 'Ficus arnottiana'],
  ['Jasmine (Jati) / Ritha', 'जाई', 'Jasminum grandiflorum'],
  ['Bel (Bilva)', 'बेल', 'Aegle marmelos'],
  ['Arjun', 'अर्जुन', 'Terminalia arjuna'],
  ['Vikankata / Nagkeshar', 'विकंकत (नागकेशर)', 'Flacourtia indica'],
  ['Bakul', 'बकुळ', 'Mimusops elengi'],
  ['Savar (Shalmali)', 'सावर (शाल्मली)', 'Bombax ceiba'],
  ['Sal / Ral', 'साल (राळ)', 'Shorea robusta'],
  ['Vet (Vanjula)', 'वेत', 'Salix tetrasperma'],
  ['Jackfruit (Panasa)', 'फणस', 'Artocarpus heterophyllus'],
  ['Rui (Arka)', 'रुई', 'Calotropis gigantea'],
  ['Shami', 'शमी', 'Prosopis cineraria'],
  ['Kadamba', 'कदंब', 'Neolamarckia cadamba'],
  ['Mango (Amra)', 'आंबा', 'Mangifera indica'],
  ['Neem (Nimba)', 'कडुनिंब', 'Azadirachta indica'],
  ['Mahua (Madhuka)', 'मोह', 'Madhuca longifolia'],
];
