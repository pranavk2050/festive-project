// Bright stars for the "sky from the observer" view (J2000 RA in hours, Dec in degrees, visual magnitude).
// Yogataras (junction stars) are tagged with their nakshatra; a few famous stars are
// included for orientation — Dhruva (Polaris) and the Saptarishi (Big Dipper).
export interface Star {
  name: string;
  ra: number;
  dec: number;
  mag: number;
  nakshatra?: string;
  group?: 'saptarishi';
  /** Marathi name, where the star has a traditional Indian one */
  mr?: string;
}

export const STARS: Star[] = [
  { name: 'β Arietis', ra: 1.911, dec: 20.81, mag: 2.6, nakshatra: 'Ashwini' },
  { name: '35 Arietis', ra: 2.725, dec: 27.71, mag: 4.7, nakshatra: 'Bharani' },
  { name: 'Alcyone (Pleiades)', mr: 'कृत्तिका पुंज', ra: 3.791, dec: 24.11, mag: 2.9, nakshatra: 'Krittika' },
  { name: 'Aldebaran', ra: 4.599, dec: 16.51, mag: 0.9, nakshatra: 'Rohini' },
  { name: 'λ Orionis', ra: 5.585, dec: 9.93, mag: 3.5, nakshatra: 'Mrigashira' },
  { name: 'Betelgeuse', ra: 5.919, dec: 7.41, mag: 0.5, nakshatra: 'Ardra' },
  { name: 'Pollux', ra: 7.755, dec: 28.03, mag: 1.1, nakshatra: 'Punarvasu' },
  { name: 'δ Cancri', ra: 8.745, dec: 18.15, mag: 3.9, nakshatra: 'Pushya' },
  { name: 'ε Hydrae', ra: 8.779, dec: 6.42, mag: 3.4, nakshatra: 'Ashlesha' },
  { name: 'Regulus', ra: 10.139, dec: 11.97, mag: 1.4, nakshatra: 'Magha' },
  { name: 'δ Leonis', ra: 11.235, dec: 20.52, mag: 2.6, nakshatra: 'Purva Phalguni' },
  { name: 'Denebola', ra: 11.818, dec: 14.57, mag: 2.1, nakshatra: 'Uttara Phalguni' },
  { name: 'δ Corvi', ra: 12.498, dec: -16.52, mag: 2.9, nakshatra: 'Hasta' },
  { name: 'Spica', ra: 13.42, dec: -11.16, mag: 1.0, nakshatra: 'Chitra' },
  { name: 'Arcturus', ra: 14.261, dec: 19.18, mag: -0.1, nakshatra: 'Swati' },
  { name: 'α Librae', ra: 14.848, dec: -16.04, mag: 2.8, nakshatra: 'Vishakha' },
  { name: 'δ Scorpii', ra: 16.006, dec: -22.62, mag: 2.3, nakshatra: 'Anuradha' },
  { name: 'Antares', ra: 16.49, dec: -26.43, mag: 1.0, nakshatra: 'Jyeshtha' },
  { name: 'λ Scorpii', ra: 17.56, dec: -37.1, mag: 1.6, nakshatra: 'Mula' },
  { name: 'δ Sagittarii', ra: 18.35, dec: -29.83, mag: 2.7, nakshatra: 'Purva Ashadha' },
  { name: 'σ Sagittarii', ra: 18.921, dec: -26.3, mag: 2.1, nakshatra: 'Uttara Ashadha' },
  { name: 'Altair', ra: 19.846, dec: 8.87, mag: 0.8, nakshatra: 'Shravana' },
  { name: 'β Delphini', ra: 20.626, dec: 14.6, mag: 3.6, nakshatra: 'Dhanishta' },
  { name: 'λ Aquarii', ra: 22.877, dec: -7.58, mag: 3.7, nakshatra: 'Shatabhisha' },
  { name: 'Markab', ra: 23.079, dec: 15.21, mag: 2.5, nakshatra: 'Purva Bhadrapada' },
  { name: 'Algenib', ra: 0.221, dec: 15.18, mag: 2.8, nakshatra: 'Uttara Bhadrapada' },
  { name: 'ζ Piscium', ra: 1.229, dec: 7.58, mag: 5.2, nakshatra: 'Revati' },

  { name: 'Dhruva (Polaris)', mr: 'ध्रुव', ra: 2.53, dec: 89.26, mag: 2.0 },
  { name: 'Kratu (Dubhe)', mr: 'क्रतू', ra: 11.062, dec: 61.75, mag: 1.8, group: 'saptarishi' },
  { name: 'Pulaha (Merak)', mr: 'पुलह', ra: 11.031, dec: 56.38, mag: 2.4, group: 'saptarishi' },
  { name: 'Pulastya (Phecda)', mr: 'पुलस्त्य', ra: 11.897, dec: 53.69, mag: 2.4, group: 'saptarishi' },
  { name: 'Atri (Megrez)', mr: 'अत्री', ra: 12.257, dec: 57.03, mag: 3.3, group: 'saptarishi' },
  { name: 'Angiras (Alioth)', mr: 'अंगिरस', ra: 12.9, dec: 55.96, mag: 1.8, group: 'saptarishi' },
  { name: 'Vasishtha (Mizar)', mr: 'वसिष्ठ', ra: 13.399, dec: 54.93, mag: 2.2, group: 'saptarishi' },
  { name: 'Marichi (Alkaid)', mr: 'मरीची', ra: 13.792, dec: 49.31, mag: 1.9, group: 'saptarishi' },
  { name: 'Agastya (Canopus)', mr: 'अगस्त्य', ra: 6.399, dec: -52.7, mag: -0.7 },
  { name: 'Lubdhaka (Sirius)', mr: 'लुब्धक', ra: 6.752, dec: -16.72, mag: -1.5 },
  { name: 'Abhijit (Vega)', mr: 'अभिजित', ra: 18.616, dec: 38.78, mag: 0.0 },
  { name: 'Brahmahridaya (Capella)', mr: 'ब्रह्महृदय', ra: 5.278, dec: 46.0, mag: 0.1 },
  { name: 'Rigel', ra: 5.242, dec: -8.2, mag: 0.1 },
  { name: 'Deneb', ra: 20.69, dec: 45.28, mag: 1.3 },
  { name: 'Procyon', ra: 7.655, dec: 5.22, mag: 0.4 },
  { name: 'Fomalhaut', ra: 22.961, dec: -29.62, mag: 1.2 },
];

export const SAPTARISHI_LINES: [string, string][] = [
  ['Kratu (Dubhe)', 'Pulaha (Merak)'], ['Pulaha (Merak)', 'Pulastya (Phecda)'], ['Pulastya (Phecda)', 'Atri (Megrez)'],
  ['Atri (Megrez)', 'Kratu (Dubhe)'], ['Atri (Megrez)', 'Angiras (Alioth)'], ['Angiras (Alioth)', 'Vasishtha (Mizar)'],
  ['Vasishtha (Mizar)', 'Marichi (Alkaid)'],
];
