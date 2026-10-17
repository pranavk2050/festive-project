# Panchang Sky · पंचांग आकाश

**Created by Pranav Dnyaneshwar Kulkarni** (प्रणव ज्ञानेश्वर कुलकर्णी)

A browser-based 3D visualization of the sky behind every Hindu festival, vrat and ekadashi of a year.
Pick a festival on the left; the viewport jumps to the exact moment (sunrise, pradosh, midnight, moonrise…)
and shows where the Sun, Moon and planets are — and *why* that configuration makes it that festival.

```bash
npm install
npm run dev        # http://localhost:5173
```

## What it shows

- **Left list:** festivals, vrats, all Ekadashis (with Smarta/Vaishnava dates and parana), Sankashti/Angarki,
  Pradosh, Purnima/Amavasya, sankrantis, periods (Chaturmas, Pitru Paksha, Navratri, Adhik maas, Kharmas),
  graha events (gochar, vakri, asta) and eclipses. Grouped by lunar month; filter by category and region.
  Maharashtrian festivals are tagged **MH** (Gudi Padwa, Vat Purnima, Narali Purnima, Pola, Jyeshtha Gauri,
  Kojagiri, Vasubaras, Bhaubeej, Tulsi Vivah, Champa Shashthi, Datta Jayanti, Mangala Gaur…).
- **Three views:**
  - **Solar System:** heliocentric, with sight-lines from Earth through the Sun and Moon to the sidereal zodiac.
  - **Zodiac Wheel (Bhachakra):** Earth-centred rings of 12 rashis and 27 nakshatras, all nine grahas, the
    ayanamsa offset from the vernal equinox, and a tithi dial showing the Sun–Moon angle.
  - **Sky from <place>:** the real horizon view, with a correctly lit lunar phase, the ecliptic, yogatara stars,
    Dhruva and the Saptarishi.
- **Details panel:** the rule, the Sun–Moon angle, dignity (uccha/neecha), notes such as Bhadra or Vaishnava
  dates, and a live panchang (tithi, nakshatra, yoga, karana, vara) with a sidereal graha table.
- **Avakahada Chakra (अवकहडा चक्र):** a second tab in the details panel for the selected moment and place. Set a birth
  date and time to use it for a kundali. It shows:
  - the Moon's rashi, nakshatra and pada, and their lords
  - naamakshar, varna, vashya, yoni, gana, nadi and tatva
  - lagna (ascendant), and paya counted from the lagna
  - the Vimshottari dasha balance
  - the full 108-syllable naamakshar grid, with the current pada highlighted
  The logic is in [src/panchang/avakahada.ts](src/panchang/avakahada.ts).
- **Guna Milan (गुणमिलन):** enter the bride's and groom's birth date, time and place to get:
  - the 36-point Ashtakoot score, koota by koota
  - Nadi, Bhakoot and Gana doshas, with their common cancellations (parihara)
  - Mangal dosha from the lagna and from the Moon

  Tables are in [src/panchang/milan.ts](src/panchang/milan.ts). Two people with the same nakshatra correctly
  score 28/36. Birth details stay in memory on the device.
- **Muhurat finder (मुहूर्त):** windows for vivah, griha pravesh, vehicle and property purchase for the selected
  year and place. Each window lists the nakshatra and tithi; tap it to see that sky.
  - Removed: Bhadra, Vyatipata/Vaidhriti yoga and Rahu kaal.
  - Excluded days: Chaturmas, Adhik maas, Guru/Shukra asta (with vriddha/bala margins) and visible eclipses.

  Checked against Drik Panchang's 2026 listings: the marriage and griha pravesh windows match its season
  boundaries. The rules are in [src/panchang/muhurat.ts](src/panchang/muhurat.ts).
- **Kumbh Mela / Simhastha:** set by Guru's rashi plus Surya's rashi for Haridwar, Prayagraj, Nashik–Trimbakeshwar
  and Ujjain. It reproduces every mela from 2010 to 2028, with Nashik Simhastha opening on Nov 1, 2026.
- **Printable calendar (🗓):** Kalnirnay-style A4 month sheets showing each day's tithi, nakshatra and festivals,
  in English or Marathi. Print it, or choose "Save as PDF" in the print dialog.
- **Why? / का? tab:** 20 questions about the reasons behind the rules, told as stories in English and Marathi. Examples:
  why Pitru Paksha needs the Sun in Kanya, why Diwali needs the Sun in Tula, and why Adhik maas comes in summer.
  - Every claim is labelled `Shastra`, `Sky`, `Ritu/Ayurveda` or `Interpretation`, with sources.
  - Each citation is marked verified or not; popular myths are checked, and each answer gives a confidence level.
  - Each answer has a "Show in sky" button. A festival's card links to its related questions.
  - Sky facts come from this engine over 2000–2050 (`scripts/why-evidence.ts`). The stories are in [src/data/why/](src/data/why/).
- **Timeline:** lunar month bands (Adhik hatched), period bars and event ticks. Drag to scrub, or press play.
- **Controls:** year (2000–2050), place (Pune by default, plus 12 other cities), the Amanta/Purnimanta toggle, and an
  **EN / मराठी** language toggle. Marathi mode translates the interface, every panchang term, festival names and
  descriptions, the "why this day" explanations and the 3D labels. Computed technical notes stay in English.

Keyboard: `Space` play/pause · `↑/↓` previous/next item · `←/→` ±1 hour (`Shift` ±1 day).

## How dates are computed

Everything is calculated in the browser, in a web worker; there are no lookup tables.

| Element | Definition |
|---|---|
| Tithi | Moon–Sun elongation ÷ 12° |
| Nakshatra / Yoga | sidereal Moon ÷ 13°20′ / (Sun + Moon) ÷ 13°20′ |
| Karana | half-tithi; Vishti = Bhadra |
| Lunar month | amanta new moon → new moon, named by the sankranti inside it; none → **Adhik** |
| Sidereal | Lahiri (Chitrapaksha) ayanamsa + nutation |
| Kaal | day or night split into fifths (pratah, madhyahna, aparahna, pradosh…), nishita = 8th night muhurta |

A festival rule is `{month, tithi, kaal}` ([src/panchang/rules.ts](src/panchang/rules.ts)). The resolver
([src/panchang/festivals.ts](src/panchang/festivals.ts)) picks the civil day whose kaal window the tithi covers
best. Special cases on top of that:

- Bhadra avoidance for Holika Dahan and Raksha Bandhan.
- Ekadashi rules: vriddhi, kshaya, Dwadashi parana and Vaishnava arunodaya.
- Nakshatra rules for the Jyeshtha Gauri days and Onam.

Astronomy comes from [astronomy-engine](https://github.com/cosinekitty/astronomy), which is accurate to about 1 arc-minute.

**Tradition matters:** the Amanta setting also applies Maharashtrian (Dharmasindhu) practice where it differs.
For example, Holika Dahan 2026 falls on Mar 2 in Bhadra Puchha under Amanta, and on Mar 3 under Purnimanta.

## Validation

```bash
npm run validate     # 2026 Pune vs 134 published dates (drikpanchang + cross-checks)
npm run regression   # well-known dates in 2023 / 2025
npm run list -- 2026 pune utsav,vrat,ekadashi
```

Current result: **133 / 134 exact**. The one difference is Govardhan Puja, where sources disagree
(Drikpanchang Pune says Nov 9; Drikpanchang Delhi and Prokerala Pune say Nov 10).
The reference data lives in [src/data/reference-2026.json](src/data/reference-2026.json).

## Layout

```
src/astro/ephemeris.ts   longitudes, ayanamsa, rise/set, boundary finder
src/panchang/            engine (year), rules, festival resolver, graha events, constants
src/scene/               sky state + three.js views
src/main.ts              UI: list, details, HUD, timeline, playback
src/worker.ts            year computation off the main thread
```

## Creator

Panchang Sky was created by **Pranav Dnyaneshwar Kulkarni** (प्रणव ज्ञानेश्वर कुलकर्णी).
