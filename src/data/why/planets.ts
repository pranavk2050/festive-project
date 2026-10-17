import type { WhyEntry } from '../why.ts';

const WL = 'https://www.wisdomlib.org/hinduism/book/brihat-samhita/d/';

export const PLANETS_WHY: WhyEntry[] = [
  {
    id: 'makar-sankranti-solstice',
    q: 6,
    theme: 'planets',
    festivals: ['makar-sankranti', 'bhogi', 'rath-saptami'],
    title: ['Why is Makar Sankranti on 14 January when the winter solstice is on 21 December?', 'हिवाळी अयनांत 21 डिसेंबरला असताना मकर संक्रांत 14 जानेवारीलाच का?'],
    short: ['Because Sankranti follows the stars, the solstice follows the seasons — and the two have been sliding apart for 1,700 years. Varahamihira noticed it first.', 'कारण संक्रांत ताऱ्यांप्रमाणे चालते आणि अयनांत ऋतूंप्रमाणे — आणि गेली 1,700 वर्षे दोघे एकमेकांपासून दूर सरकत आहेत. हे वराहमिहिरानेच प्रथम नोंदवले.'],
    story: [
      `Grandfather would say: "Til-gul ghya, god god bola — from today the Sun turns north." But if you stand on your terrace in Pune and watch where the Sun rises each morning, you will see it stop moving south and begin returning north around 21 December, three weeks before Sankranti. So who is right?

Both — they are measuring different things. Makar Sankranti is the moment the Sun crosses into the star-field of Makara (Capricorn). The solstice is a seasonal event: the day the Sun reaches its southernmost point. About 1,700 years ago, in 285 CE, these two happened on the same day. But the Earth wobbles slowly like a spinning top, so the seasons slide against the stars by about one degree every 72 years. Today the gap is 24 degrees — 24 days.

Here is the beautiful part. Varahamihira, writing in the 6th century, already noticed this. In his Brihat Samhita he says that "once" the Sun turned north in Dhanishtha — exactly where the ancient Vedanga Jyotisha placed it — but "at present" it turns at the start of Makara. And he tells his readers not to trust books blindly: check it yourself by watching the sunrise point or the shadow of a stick. Our tradition kept the star marker; the sky kept moving.`,
      `आजोबा म्हणायचे, "तिळगूळ घ्या, गोड गोड बोला — आजपासून सूर्य उत्तरेकडे वळतो." पण पुण्यात गच्चीवर उभे राहून रोज सूर्य कुठे उगवतो ते पाहिले, तर तो 21 डिसेंबरच्या सुमारासच दक्षिणेकडे सरकणे थांबवून उत्तरेकडे परततो — संक्रांतीच्या तीन आठवडे आधी. मग खरे कोण?

दोघेही — कारण दोघे वेगवेगळी गोष्ट मोजतात. मकर संक्रांत म्हणजे सूर्याचा मकर राशीच्या ताऱ्यांमध्ये प्रवेश. अयनांत ही ऋतूची घटना — सूर्य सर्वात दक्षिणेला पोहोचण्याचा दिवस. सुमारे 1,700 वर्षांपूर्वी, इ.स. 285 मध्ये, या दोन्ही घटना एकाच दिवशी झाल्या. पण पृथ्वी भोवऱ्यासारखी हळूहळू डुलते, त्यामुळे ऋतू ताऱ्यांच्या तुलनेत दर सुमारे 72 वर्षांत एक अंश मागे सरकतात. आज हे अंतर 24 अंश — म्हणजे 24 दिवस झाले आहे.

सर्वात सुंदर गोष्ट अशी — सहाव्या शतकात वराहमिहिराने हे आधीच पाहिले होते. बृहत्संहितेत तो म्हणतो: "एके काळी" सूर्य धनिष्ठेत उत्तरायण करत असे — वेदांग ज्योतिषात सांगितलेल्या जागी — पण "सध्या" मकराच्या आरंभी करतो. आणि वाचकांना सांगतो, ग्रंथावर अंधविश्वास ठेवू नका; उगवत्या सूर्याची जागा किंवा काठीची सावली पाहून स्वतः तपासा. आपल्या परंपरेने ताऱ्यांची खूण जपली; आकाश मात्र सरकत राहिले.`,
    ],
    eureka: [
      'Our own texts contain a 3,000-year precession record: the northward turn was at Dhanishtha (Vedanga Jyotisha), at Makara 0° (Varahamihira, ~500 CE), and is in Mula today. In this app the gap is computed: equal in 285 CE, 24 days in 2026, and 37 days by 3000 CE — about one day every 71 years.',
      'आपल्या ग्रंथांतच 3,000 वर्षांचा संपात-चलनाचा पुरावा आहे: उत्तरायण धनिष्ठेत (वेदांग ज्योतिष), मकर 0° वर (वराहमिहिर, इ.स. ~500), आणि आज मूळ नक्षत्रात. या ॲपने गणित केले आहे: इ.स. 285 मध्ये अंतर शून्य, 2026 मध्ये 24 दिवस, आणि इ.स. 3000 पर्यंत 37 दिवस — दर सुमारे 71 वर्षांत एक दिवस.',
    ],
    evidence: [
      { type: 'shastra', en: 'Varahamihira: once the northward course began at Dhanishtha; "at present" it begins at the start of Makara. Check it by the sunrise point or a gnomon.', mr: 'वराहमिहिर: एके काळी उत्तरायण धनिष्ठेत सुरू होत असे; "सध्या" मकराच्या आरंभी. उगवत्या सूर्याच्या जागेवरून किंवा शंकूच्या सावलीवरून तपासा.', source: 'Brihat Samhita 3.1–4 (tr. Chidambaram Iyer)', url: `${WL}doc226719.html`, verified: true },
      { type: 'shastra', en: 'The Vedanga Jyotisha places the winter solstice at the start of Shravishtha (Dhanishtha), where its five-year yuga begins on Magha Shukla Pratipada.', mr: 'वेदांग ज्योतिष हिवाळी अयनांत श्रविष्ठा (धनिष्ठा) च्या आरंभी मानते; त्याचे पंचवार्षिक युग माघ शुद्ध प्रतिपदेला सुरू होते.', source: 'Vedanga Jyotisha (Yajus vv. 6–8), via secondary summaries', url: 'https://en.wikipedia.org/wiki/Vedanga_Jyotisha', verified: false },
      { type: 'shastra', en: 'Uttarayana is the day of the gods and Dakshinayana their night: one human year is one divine day-and-night.', mr: 'उत्तरायण हा देवांचा दिवस आणि दक्षिणायन त्यांची रात्र: मनुष्याचे एक वर्ष म्हणजे देवांचा एक अहोरात्र.', source: 'Manusmriti 1.67', url: 'https://www.wisdomlib.org/hinduism/book/manusmriti-with-the-commentary-of-medhatithi/d/doc145496.html', verified: true },
      { type: 'shastra', en: 'The Surya Siddhanta knows the drift (ayana-chalana) and applies an ayanamsha correction to find the true solstices from sidereal longitudes.', mr: 'सूर्यसिद्धांताला अयनचलन माहीत आहे; निरयन रेखांशावरून खरे अयनांत शोधण्यासाठी तो अयनांश दुरुस्ती वापरतो.', source: 'Surya Siddhanta 3.9–10 (tr. Burgess / Sastri)', url: 'https://en.wikisource.org/wiki/Page:English_translation_of_the_Surya_Siddhanta_and_the_Siddhanta_Siromani_by_Sastri,_1861.djvu/39', verified: true },
      { type: 'sky', en: 'Computed in this app: Sankranti coincided with the solstice in 285 CE; it is 23.8 days after it in 2026, 30 days by 2500 and 37 days by 3000. The Lahiri ayanamsa in 2026 is 24.2°.', mr: 'या ॲपमधील गणित: इ.स. 285 मध्ये संक्रांत अयनांताच्याच दिवशी होती; 2026 मध्ये 23.8 दिवस नंतर, 2500 पर्यंत 30 दिवस आणि 3000 पर्यंत 37 दिवस. 2026 मधील लाहिरी अयनांश 24.2°.' },
      { type: 'sky', en: 'Precession: the equinoxes slide about 50.3″ a year against the stars — one degree in ~72 years, a full circle in ~25,800 years.', mr: 'संपात-चलन: संपातबिंदू ताऱ्यांच्या तुलनेत दरवर्षी सुमारे 50.3″ सरकतात — ~72 वर्षांत एक अंश, ~25,800 वर्षांत पूर्ण फेरा.', source: 'IAU precession constant', url: 'https://en.wikipedia.org/wiki/Axial_precession' },
      { type: 'interpretation', en: 'Dating the Vedanga Jyotisha by its solstice position gives roughly 1400–1150 BCE, though the surviving text itself may be later.', mr: 'वेदांग ज्योतिषातील अयनांताच्या स्थानावरून त्याचा काळ सुमारे इ.स.पू. 1400–1150 येतो; मात्र उपलब्ध ग्रंथ नंतरचा असू शकतो.', source: 'Dikshit; Sastry & Kochhar; Pingree (summarised)', url: 'https://en.wikipedia.org/wiki/Vedanga_Jyotisha', verified: true },
    ],
    myths: [
      { myth: ['"Makar Sankranti is the day the Sun starts moving north."', '"मकर संक्रांतीला सूर्य उत्तरेकडे वळू लागतो."'], verdict: 'partly', why: ['True in Varahamihira’s time; today the Sun turns north on the December solstice, about 24 days earlier.', 'वराहमिहिराच्या काळी खरे; आज सूर्य सुमारे 24 दिवस आधी, डिसेंबरच्या अयनांताला उत्तरेकडे वळतो.'] },
      { myth: ['"The Indian zodiac is wrong because of precession."', '"संपात-चलनामुळे भारतीय राशिचक्र चुकीचे आहे."'], verdict: 'does not hold', why: ['It is a different frame — measured against the stars instead of the seasons. Both are correct measurements.', 'ही वेगळी मोजपट्टी आहे — ऋतूंऐवजी ताऱ्यांच्या संदर्भात. दोन्ही मोजमापे बरोबरच आहेत.'] },
    ],
    confidence: 'high',
    sky: [
      { label: ['The winter solstice — 21 Dec 2025', 'हिवाळी अयनांत — 21 डिसें. 2025'], iso: '2025-12-21T15:03:04Z', view: 'geo' },
      { label: ['Makar Sankranti this year', 'या वर्षीची मकर संक्रांत'], defId: 'makar-sankranti', view: 'geo' },
    ],
    sources: [
      { title: 'Brihat Samhita ch. 3 (Adityachara), tr. N. Chidambaram Iyer — wisdomlib', url: `${WL}doc226719.html` },
      { title: 'Manusmriti 1.67 with Medhatithi — wisdomlib', url: 'https://www.wisdomlib.org/hinduism/book/manusmriti-with-the-commentary-of-medhatithi/d/doc145496.html' },
      { title: 'Surya Siddhanta, tr. Bapu Deva Sastri (1861) — Wikisource', url: 'https://en.wikisource.org/wiki/Page:English_translation_of_the_Surya_Siddhanta_and_the_Siddhanta_Siromani_by_Sastri,_1861.djvu/39' },
      { title: 'Vedanga Jyotisha — overview and dating', url: 'https://en.wikipedia.org/wiki/Vedanga_Jyotisha' },
      { title: 'Drik Panchang — Makar Sankranti', url: 'https://www.drikpanchang.com/sankranti/info/makar-sankranti.html' },
    ],
  },
  {
    id: 'kumbh-jupiter',
    q: 10,
    theme: 'planets',
    festivals: ['kumbh-haridwar', 'kumbh-prayag', 'kumbh-nashik', 'kumbh-ujjain', 'simhastha'],
    title: ['Why do Kumbh Melas follow Jupiter — and why did Haridwar’s come after only 11 years?', 'कुंभमेळे गुरूप्रमाणे का भरतात — आणि हरिद्वारचा कुंभ 11 वर्षांतच का आला?'],
    short: ['Jupiter is the sky’s twelve-year clock — but it actually runs a little fast: 11.86 years. Every 85 years or so, the clock gains a whole year.', 'गुरू हे आकाशातील बारा वर्षांचे घड्याळ — पण ते थोडे पुढे पळते: 11.86 वर्षे. दर सुमारे 85 वर्षांनी हे घड्याळ पूर्ण एक वर्ष पुढे जाते.'],
    story: [
      `In 2021 the sadhus of Haridwar did something that surprised many people: they held the Kumbh in its 11th year instead of its 12th. Was it a mistake? No — they were simply reading the sky correctly.

The rule for Haridwar is: Guru must be in Kumbha rashi when the Sun enters Mesha in April. Guru takes not 12 years but 11.86 years to go round the zodiac, so each time it reaches Kumbha about two weeks earlier than the last. In 2009 it reached Kumbha only in May — too late for that April. In 2021 it entered on 5 April, just before Mesha Sankranti. By April 2022 it had already moved on into Meena. So the Kumbh had to be in 2021.

Our ancestors knew this clock very well. Varahamihira names each "Jupiter year" after the nakshatra in which Guru reappears from the Sun's glare — Kartika, Margashirsha and so on, the same names as our months. And the old sixty-year samvatsara calendar quietly drops one year name about every 85 years for exactly the same reason. The 11-year Kumbh is that "dropped year" made visible.`,
      `2021 मध्ये हरिद्वारच्या साधूंनी अनेकांना आश्चर्य वाटेल असे केले: कुंभ बाराव्या नव्हे तर अकराव्या वर्षी भरवला. ही चूक होती का? नाही — त्यांनी आकाश अचूक वाचले होते.

हरिद्वारचा नियम असा: एप्रिलमध्ये सूर्य मेषेत प्रवेश करतो तेव्हा गुरू कुंभ राशीत असला पाहिजे. गुरूला राशिचक्राचा फेरा पूर्ण करायला 12 नव्हे तर 11.86 वर्षे लागतात, त्यामुळे तो दर वेळी सुमारे दोन आठवडे आधी कुंभेत पोहोचतो. 2009 मध्ये तो मे महिन्यातच कुंभेत आला — त्या एप्रिलसाठी उशीर झाला. 2021 मध्ये तो 5 एप्रिलला, मेष संक्रांतीच्या अगदी आधी आला. एप्रिल 2022 पर्यंत तो मीनेत पुढे गेला होता. म्हणून कुंभ 2021 मध्येच भरणे भाग होते.

आपल्या पूर्वजांना हे घड्याळ नीट माहीत होते. वराहमिहिर प्रत्येक "गुरू-वर्षाला" त्या नक्षत्राचे नाव देतो ज्यात गुरू सूर्यतेजातून पुन्हा दिसू लागतो — कार्तिक, मार्गशीर्ष इत्यादी, आपल्या महिन्यांचीच नावे. आणि जुने साठ संवत्सरांचे चक्र याच कारणाने दर सुमारे 85 वर्षांनी एका संवत्सराचे नाव गाळते. अकरा वर्षांचा कुंभ म्हणजे तोच "गाळलेला संवत्सर" — डोळ्यांना दिसणारा.`,
    ],
    eureka: [
      'The 11-year Haridwar Kumbh and the "skipped samvatsara" of the north-Indian 60-year Jupiter calendar are the same event. In this app: Jupiter entered Kumbha every 11.9 years (1962, 1974, 1986, 1998…), but once the gap was 11.3 years (1998→2009) — the slip that eventually forced 2021. The very name "Kumbh" first belonged to Haridwar, whose rule is Guru in Kumbha.',
      'अकरा वर्षांचा हरिद्वार कुंभ आणि उत्तर भारतीय 60 वर्षांच्या गुरू-चक्रातील "गाळलेला संवत्सर" ही एकच घटना आहे. या ॲपनुसार: गुरू दर 11.9 वर्षांनी कुंभेत येतो (1962, 1974, 1986, 1998…), पण एकदा अंतर 11.3 वर्षे झाले (1998→2009) — याच सरकण्यामुळे 2021 भाग पडले. "कुंभ" हे नाव मूळचे हरिद्वारचे — जिथे नियमच गुरू कुंभ राशीत असा आहे.',
    ],
    evidence: [
      { type: 'sky', en: 'Jupiter’s sidereal period is 11.86 years, so it spends about 361 days in each rashi — four days less than a solar year.', mr: 'गुरूचा नाक्षत्र परिभ्रमण काळ 11.86 वर्षे; म्हणजे तो प्रत्येक राशीत सुमारे 361 दिवस राहतो — सौरवर्षापेक्षा चार दिवस कमी.', source: 'Standard orbital data', url: 'https://en.wikipedia.org/wiki/Samvatsara' },
      { type: 'sky', en: 'Computed in this app: at Mesha Sankranti 2021 Jupiter was in Kumbha; at Mesha Sankranti 2022 it was already in Meena.', mr: 'या ॲपमधील गणित: 2021 च्या मेष संक्रांतीला गुरू कुंभेत होता; 2022 च्या मेष संक्रांतीला तो मीनेत गेला होता.' },
      { type: 'shastra', en: 'Varahamihira names Jupiter’s years after the nakshatra where Jupiter rises again after conjunction with the Sun — the same names as the lunar months.', mr: 'वराहमिहिर गुरू-वर्षांना त्या नक्षत्राचे नाव देतो ज्यात सूर्ययुतीनंतर गुरू पुन्हा उगवतो — चांद्र महिन्यांचीच नावे.', source: 'Brihat Samhita 8.1–2', url: `${WL}doc226724.html`, verified: true },
      { type: 'shastra', en: 'In the 60-year Barhaspatya cycle one samvatsara name is expunged about every 85 years to stay in step with the solar year.', mr: '60 संवत्सरांच्या बार्हस्पत्य चक्रात सौरवर्षाशी जुळण्यासाठी दर सुमारे 85 वर्षांनी एका संवत्सराचे नाव गाळले जाते.', source: 'Surya Siddhanta and epigraphic studies (summarised)', url: 'https://en.wikipedia.org/wiki/Samvatsara', verified: true },
      { type: 'shastra', en: 'The churning of the ocean and the amrita appear in the Mahabharata and Puranas, but no Purana describes amrita falling at four places or names a Kumbh Mela; that link is a later devotional tradition.', mr: 'समुद्रमंथन व अमृताची कथा महाभारत-पुराणांत आहे, पण अमृत चार ठिकाणी सांडल्याचा किंवा कुंभमेळ्याचा उल्लेख कोणत्याही पुराणात नाही; हा संबंध नंतरच्या भक्तिपरंपरेतील आहे.', source: 'Kumbh Mela historiography (Maclean; Bonazzoli)', url: 'https://en.wikipedia.org/wiki/Kumbh_Mela', verified: true },
      { type: 'shastra', en: 'The earliest texts using the name "Kumbh Mela" (1695, 1789) apply it only to Haridwar.', mr: '"कुंभमेळा" हे नाव वापरणारे सर्वात जुने ग्रंथ (1695, 1789) ते फक्त हरिद्वारसाठी वापरतात.', source: 'Khulasat-ut-Tawarikh; Chahar Gulshan (via historians)', url: 'https://en.wikipedia.org/wiki/Kumbh_Mela', verified: true },
      { type: 'shastra', en: 'Reports said 2021 was the first 11th-year Haridwar Kumbh in about 83 years (the previous in 1938).', mr: '2021 हा सुमारे 83 वर्षांतील (मागील 1938) पहिला अकराव्या वर्षीचा हरिद्वार कुंभ होता, असे वृत्त होते.', source: 'News reports citing the Akhara Parishad', url: 'https://www.thedailyjagran.com/lifestyle/kumbh-mela-2021-for-the-first-time-in-a-century-haridwar-kumbh-to-take-place-on-11th-year-and-not-12th-know-why-10021961', verified: false },
    ],
    myths: [
      { myth: ['"Kumbh comes exactly every 12 years."', '"कुंभ बरोबर दर 12 वर्षांनी येतो."'], verdict: 'partly', why: ['It follows Jupiter’s 11.86-year orbit, so roughly every 7th–8th cycle the gap is 11 years.', 'तो गुरूच्या 11.86 वर्षांच्या कक्षेप्रमाणे चालतो, म्हणून साधारण दर 7–8 फेऱ्यांनी अंतर 11 वर्षांचे होते.'] },
      { myth: ['"The Puranas say amrita fell at Haridwar, Prayag, Nashik and Ujjain."', '"पुराणांत अमृत हरिद्वार, प्रयाग, नाशिक, उज्जैनला सांडल्याचे सांगितले आहे."'], verdict: 'does not hold', why: ['The churning is Puranic; the four-drop localisation is not found in those narratives.', 'मंथनाची कथा पुराणांत आहे; चार थेंबांचे स्थाननिर्देशन त्या कथांत आढळत नाही.'] },
    ],
    confidence: 'high',
    confidenceNote: ['high for the astronomy; the four-site legend is later tradition', 'खगोलशास्त्रासाठी उच्च; चार ठिकाणांची आख्यायिका नंतरची परंपरा'],
    sky: [
      { label: ['Mesha Sankranti 2021 — Guru in Kumbha', 'मेष संक्रांत 2021 — गुरू कुंभेत'], iso: '2021-04-13T21:02:25Z', view: 'geo' },
      { label: ['Mesha Sankranti 2022 — Guru already in Meena', 'मेष संक्रांत 2022 — गुरू मीनेत'], iso: '2022-04-14T03:11:28Z', view: 'geo' },
    ],
    sources: [
      { title: 'Brihat Samhita ch. 8 (Brihaspati-chara) — wisdomlib', url: `${WL}doc226724.html` },
      { title: 'Samvatsara — the 60-year Jupiter cycle', url: 'https://en.wikipedia.org/wiki/Samvatsara' },
      { title: 'Kumbh Mela — history and sources', url: 'https://en.wikipedia.org/wiki/Kumbh_Mela' },
      { title: 'Kama Maclean, Pilgrimage and Power (OUP 2008)', url: 'https://www.researchgate.net/publication/248654794_Making_the_Colonial_State_Work_for_You_The_Modern_Beginnings_of_the_Ancient_Kumbh_Mela_in_Allahabad' },
    ],
  },
  {
    id: 'rahu-ketu-eclipse',
    q: 13,
    theme: 'planets',
    festivals: ['chandra-grahan', 'surya-grahan'],
    title: ['Why are Rahu and Ketu blamed for eclipses — and why do we keep sutak?', 'ग्रहणांसाठी राहू-केतूंनाच का जबाबदार धरतात — आणि वेध का पाळतात?'],
    short: ['Rahu and Ketu are two real points in the sky — where the Moon’s path crosses the Sun’s. An eclipse can happen only there. The story hid the geometry.', 'राहू-केतू हे आकाशातील दोन खरे बिंदू — जिथे चंद्राचा मार्ग सूर्याच्या मार्गाला छेदतो. ग्रहण फक्त तिथेच होऊ शकते. कथेत भूमितीच दडलेली आहे.'],
    story: [
      `Every child hears the story: when the gods shared the amrita, the asura Rahu sneaked into their line. The Sun and Moon caught him, and Vishnu's discus cut off his head — but he had already tasted amrita, so the head lived on, and to this day it swallows the Sun and Moon in revenge.

Now look at the sky. The Moon's path is tilted about five degrees from the Sun's path, and the two paths cross at just two points. An eclipse can happen only when a new or full Moon falls near one of those crossing points. Name those two points, and you have Rahu and Ketu — head and tail, always exactly opposite each other, always moving backwards. The demon can only "bite" when the Sun or Moon comes close to him — and that is precisely the rule of eclipses.

Our astronomers knew this clearly. Varahamihira tells the Rahu story, then asks sharp questions: how can Rahu cause an eclipse from 180 degrees away? If he is a serpent, why does he not cover half the sky? And then he writes, "the truth is": the Moon enters the Earth's shadow, and in a solar eclipse the Moon covers the Sun like a cloud. Sutak, the fasting and purity period before a visible eclipse, is best seen as a discipline of the mind — which is why it applies only where the eclipse can be seen, and is relaxed for children, the elderly and the sick.`,
      `प्रत्येक मुलाने ही कथा ऐकलेली असते: देवांना अमृत वाटताना राहू नावाचा असुर त्यांच्या रांगेत घुसला. सूर्य-चंद्रांनी त्याला ओळखले आणि विष्णूच्या सुदर्शनाने त्याचे मस्तक उडवले — पण त्याने अमृत चाखले होते, म्हणून ते मस्तक जिवंत राहिले, आणि आजही सूड म्हणून सूर्य-चंद्रांना गिळते.

आता आकाशाकडे पाहा. चंद्राचा मार्ग सूर्याच्या मार्गाशी सुमारे पाच अंश कललेला आहे, आणि हे दोन मार्ग फक्त दोन बिंदूंवर एकमेकांना छेदतात. अमावस्या किंवा पौर्णिमा यांपैकी एका बिंदूजवळ आली तरच ग्रहण होऊ शकते. या दोन बिंदूंना नावे द्या — तेच राहू आणि केतू: डोके आणि शेपूट, नेहमी एकमेकांसमोर, नेहमी उलट दिशेने सरकणारे. राक्षस फक्त सूर्य-चंद्र त्याच्याजवळ आले तरच "चावा" घेऊ शकतो — आणि ग्रहणाचा नियमही नेमका हाच आहे.

आपल्या खगोलशास्त्रज्ञांना हे स्पष्ट माहीत होते. वराहमिहिर राहूची कथा सांगतो, मग धारदार प्रश्न विचारतो: 180 अंशांवरून राहू ग्रहण कसे करणार? तो साप असेल तर अर्धे आकाश का झाकत नाही? आणि मग लिहितो, "खरे असे आहे": चंद्र पृथ्वीच्या सावलीत शिरतो, आणि सूर्यग्रहणात चंद्र ढगाप्रमाणे सूर्याला झाकतो. दिसणाऱ्या ग्रहणापूर्वीचा वेध — उपवास व शुचितेचा काळ — हा मनाची साधना म्हणून पाहणे योग्य; म्हणूनच तो फक्त ग्रहण दिसते तिथे लागू होतो आणि मुले, वृद्ध, आजारी यांना सवलत असते.`,
    ],
    eureka: [
      'The myth already encodes the eclipse condition: Rahu can bite only when the Sun or Moon is near him — a new or full Moon within a few degrees of a node. Varahamihira’s objection ("how can Rahu eclipse something 180° away?") is answered by the later pair Rahu + Ketu. In this app, the 3 March 2026 lunar eclipse shows the full Moon just 4° from Ketu.',
      'कथेतच ग्रहणाची अट दडलेली आहे: सूर्य-चंद्र राहूजवळ आले तरच तो चावतो — म्हणजे अमावस्या/पौर्णिमा पातबिंदूपासून काही अंशांच्या आत. वराहमिहिराच्या आक्षेपाचे ("180° दूरच्याला राहू कसा ग्रासेल?") उत्तर नंतर राहू + केतू या जोडीने मिळाले. या ॲपमध्ये 3 मार्च 2026 च्या चंद्रग्रहणात पूर्ण चंद्र केतूपासून फक्त 4° वर दिसतो.',
    ],
    evidence: [
      { type: 'sky', en: 'Rahu and Ketu are the Moon’s ascending and descending nodes. The Moon’s orbit is tilted ~5.1°, so eclipses happen only near them.', mr: 'राहू-केतू हे चंद्राचे आरोही व अवरोही पातबिंदू. चंद्रकक्षा ~5.1° कललेली असल्याने ग्रहण फक्त त्यांच्याजवळच होते.', source: 'Standard celestial mechanics' },
      { type: 'sky', en: 'Computed in this app for 3 March 2026: the full Moon (tropical 162.9°) is 4° from Ketu (158.9°), with latitude only −0.36°.', mr: 'या ॲपमधील 3 मार्च 2026 चे गणित: पूर्ण चंद्र (सायन 162.9°) केतूपासून (158.9°) 4° वर, आणि शर फक्त −0.36°.' },
      { type: 'sky', en: 'The nodes move backwards around the zodiac once in about 18.6 years — which is why Rahu and Ketu are always shown "retrograde".', mr: 'पातबिंदू सुमारे 18.6 वर्षांत राशिचक्रात उलट फेरा पूर्ण करतात — म्हणूनच राहू-केतू नेहमी "वक्री" दाखवले जातात.', source: 'Standard lunar theory', url: 'https://en.wikipedia.org/wiki/Lunar_node', verified: false },
      { type: 'shastra', en: 'The Mahabharata tells how Rahu tasted amrita, was beheaded by Vishnu, and still "swalloweth the Sun and the Moon".', mr: 'महाभारत सांगते की राहूने अमृत चाखले, विष्णूने त्याचे मस्तक उडवले, आणि तो आजही "सूर्य-चंद्रांना गिळतो".', source: 'Mahabharata, Adi Parva 19 (tr. Ganguli)', url: 'https://en.wikisource.org/wiki/The_Mahabharata/Book_1:_Adi_Parva/Section_XIX', verified: true },
      { type: 'shastra', en: 'Varahamihira raises logical objections to the swallowing story, then states "the truth": the Moon enters Earth’s shadow; in a solar eclipse the Moon covers the Sun like a cloud.', mr: 'वराहमिहिर गिळण्याच्या कथेवर तार्किक आक्षेप घेतो आणि "सत्य" सांगतो: चंद्र पृथ्वीच्या छायेत शिरतो; सूर्यग्रहणात चंद्र ढगाप्रमाणे सूर्याला झाकतो.', source: 'Brihat Samhita 5.1–12', url: `${WL}doc226721.html`, verified: true },
      { type: 'shastra', en: '"The Moon, like a cloud in a lower sphere, covers the Sun; in a lunar eclipse the Moon enters the Earth’s shadow."', mr: '"खालच्या कक्षेतील चंद्र ढगाप्रमाणे सूर्याला झाकतो; चंद्रग्रहणात चंद्र पृथ्वीच्या छायेत शिरतो."', source: 'Surya Siddhanta 4.9 (tr. Sastri)', url: 'https://en.wikisource.org/wiki/Page:English_translation_of_the_Surya_Siddhanta_and_the_Siddhanta_Siromani_by_Sastri,_1861.djvu/52', verified: true },
      { type: 'shastra', en: 'Sutak: about 4 prahars before a solar and 3 before a lunar eclipse, only where the eclipse is visible; reduced to ~1 prahar for children, the sick and the elderly.', mr: 'वेध: सूर्यग्रहणापूर्वी सुमारे 4 प्रहर व चंद्रग्रहणापूर्वी 3 प्रहर, फक्त ग्रहण दिसते तिथे; मुले, आजारी व वृद्धांसाठी ~1 प्रहर.', source: 'Drik Panchang, based on Dharmasindhu-type digests', url: 'https://www.drikpanchang.com/eclipse/sutak-grahan.html', verified: true },
      { type: 'interpretation', en: 'Sutak works like a ritual purity period (the same word is used for birth and death impurity), not a physical hazard warning; studies of eclipse effects on food microbes are thin and mixed.', mr: 'वेध हा शारीरिक धोक्याचा इशारा नसून सुतकासारखा शुचितेचा काळ आहे (जन्म-मृत्यूच्या अशौचासाठीही हाच शब्द); ग्रहणाचा अन्नातील जंतूंवरील परिणामाचे अभ्यास कमी व परस्परविरोधी आहेत.', source: 'J Pharm Bioallied Sci 2011 (PMC3053514) and reasoning', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3053514/', verified: false },
    ],
    myths: [
      { myth: ['"Indian astronomers believed a demon really swallows the Sun."', '"भारतीय खगोलशास्त्रज्ञ राक्षस खरोखर सूर्य गिळतो असे मानत."'], verdict: 'does not hold', why: ['By the 5th–6th century the Surya Siddhanta and Brihat Samhita gave the shadow explanation and computed eclipses.', 'इ.स. 5व्या–6व्या शतकापर्यंत सूर्यसिद्धांत व बृहत्संहितेने छायेचे स्पष्टीकरण दिले होते आणि ग्रहणांचे गणित केले होते.'] },
      { myth: ['"Food cooked before an eclipse becomes poisonous."', '"ग्रहणापूर्वी शिजवलेले अन्न विषारी होते."'], verdict: 'does not hold', why: ['No known mechanism; the rule makes sense as vrata and purity discipline.', 'असे होण्याची कोणतीही ज्ञात यंत्रणा नाही; हा नियम व्रत व शुचितेची शिस्त म्हणून अर्थपूर्ण आहे.'] },
    ],
    confidence: 'high',
    sky: [
      { label: ['Lunar eclipse, 3 Mar 2026 — Moon beside Ketu', 'चंद्रग्रहण, 3 मार्च 2026 — चंद्र केतूजवळ'], defId: 'chandra-grahan', view: 'geo' },
    ],
    sources: [
      { title: 'Brihat Samhita ch. 5 (Rahuchara) — wisdomlib', url: `${WL}doc226721.html` },
      { title: 'Surya Siddhanta ch. 4 — Wikisource', url: 'https://en.wikisource.org/wiki/Page:English_translation_of_the_Surya_Siddhanta_and_the_Siddhanta_Siromani_by_Sastri,_1861.djvu/52' },
      { title: 'Mahabharata, Adi Parva Section XIX (Ganguli) — Wikisource', url: 'https://en.wikisource.org/wiki/The_Mahabharata/Book_1:_Adi_Parva/Section_XIX' },
      { title: 'Drik Panchang — Sutak during Grahan', url: 'https://www.drikpanchang.com/eclipse/sutak-grahan.html' },
    ],
  },
  {
    id: 'guru-shukra-asta',
    q: 15,
    theme: 'planets',
    festivals: ['asta-jupiter', 'asta-venus'],
    title: ['Why are weddings avoided when Guru or Shukra is asta?', 'गुरू किंवा शुक्र अस्त असताना विवाह का टाळतात?'],
    short: ['"Asta" simply means "set" — the planet is lost in the Sun’s glare. A wedding is a rite of witnesses in the sky; when Guru or Shukra cannot be seen, the witness is absent.', '"अस्त" म्हणजे मावळलेला — ग्रह सूर्यतेजात दिसेनासा होतो. विवाह हा आकाशातील साक्षीदारांसमोरचा संस्कार; गुरू किंवा शुक्र दिसत नसेल तर साक्षीदारच गैरहजर.'],
    story: [
      `Have you noticed that the wedding halls go quiet for a few weeks some summers? In 2026, for a month from mid-July to mid-August, almanacs show no vivah muhurat at all. The reason is up in the sky: Guru (Jupiter) is passing behind the Sun, and for about a month it cannot be seen at dawn or dusk. Our panchangs call this "Guru-tara asta" — the star of Guru has set.

Why should a wedding care? In jyotisha, Guru stands for dharma, wisdom and children, and Shukra (Venus) for love, beauty and married life. And the Vedic wedding itself is a sky ceremony: on the wedding night the groom shows the bride Dhruva, the pole star, and the faithful Arundhati beside Vasishtha. A rite that asks the sky to bear witness naturally waits until its chief witnesses are visible.

The rule is surprisingly faithful to what the eye can see. The siddhantas say Venus disappears within 10 degrees of the Sun — but only 8 degrees when it is retrograde. That is exactly right: retrograde Venus is near the Earth, six times closer and far brighter, so it can be seen nearer the Sun. That is why Shukra's asta in October 2026 is short, while its asta at the far side of the Sun lasts months.`,
      `काही उन्हाळ्यांत काही आठवडे लग्नाची कार्यालये शांत असतात, हे लक्षात आले आहे का? 2026 मध्ये जुलैच्या मध्यापासून ऑगस्टच्या मध्यापर्यंत महिनाभर पंचांगात एकही विवाह मुहूर्त नाही. कारण आकाशात आहे: गुरू सूर्याच्या मागून जात आहे, आणि सुमारे महिनाभर तो पहाटे किंवा सायंकाळी दिसत नाही. पंचांग याला "गुरुतारा अस्त" म्हणते — गुरूचा तारा मावळला.

विवाहाला याचे काय? ज्योतिषात गुरू म्हणजे धर्म, ज्ञान व संतती; शुक्र म्हणजे प्रेम, सौंदर्य व वैवाहिक सुख. आणि वैदिक विवाह स्वतःच आकाशाचा सोहळा आहे: विवाहाच्या रात्री वर वधूला ध्रुवतारा आणि वसिष्ठांजवळची पतिव्रता अरुंधती दाखवतो. जो संस्कार आकाशाला साक्षी ठेवतो, तो मुख्य साक्षीदार दिसेपर्यंत थांबणे स्वाभाविकच.

हा नियम डोळ्यांना जे दिसते त्याच्याशी आश्चर्यकारकरीत्या प्रामाणिक आहे. सिद्धांतग्रंथ सांगतात, शुक्र सूर्यापासून 10 अंशांच्या आत दिसेनासा होतो — पण वक्री असताना फक्त 8 अंशांच्या आत. हे अगदी बरोबर आहे: वक्री शुक्र पृथ्वीजवळ, सहापट जवळ आणि खूप तेजस्वी असतो, म्हणून तो सूर्याच्या अधिक जवळही दिसू शकतो. म्हणूनच ऑक्टोबर 2026 मधील शुक्राचा अस्त थोडा काळ टिकतो, तर सूर्याच्या पलीकडील अस्त महिनोन्‌महिने.`,
    ],
    eureka: [
      'The textbook rule tracks real naked-eye visibility: retrograde Venus gets a smaller orb (8° instead of 10°) because it is near Earth and bright. In this app, Shukra’s 2026 asta around its 24 October inferior conjunction lasts only about 10 days, while Guru’s lasts a month around its 29 July conjunction.',
      'ग्रंथातील नियम प्रत्यक्ष डोळ्यांनी दिसण्याशी जुळतो: वक्री शुक्राचा अस्तांश कमी (10° ऐवजी 8°), कारण तो पृथ्वीजवळ व तेजस्वी असतो. या ॲपमध्ये 24 ऑक्टोबरच्या सूर्य-शुक्र युतीभोवतीचा 2026 चा शुक्रास्त फक्त सुमारे 10 दिवस टिकतो, तर 29 जुलैच्या युतीभोवतीचा गुरूचा अस्त महिनाभर.',
    ],
    evidence: [
      { type: 'shastra', en: 'Visibility limits (kalamsha): Venus 10° (8° when retrograde), Mercury 14° (12°), Jupiter 11°, Saturn 15°, Mars 17°.', mr: 'दृश्यतेच्या मर्यादा (कालांश): शुक्र 10° (वक्री 8°), बुध 14° (12°), गुरू 11°, शनी 15°, मंगळ 17°.', source: 'Siddhanta Shiromani 1.8.6; Lalla (via Subbarayappa & Sarma)', url: 'https://www.wisdomlib.org/hinduism/book/indian-astronomy-a-source-book/d/doc1621558.html', verified: true },
      { type: 'shastra', en: 'Muhurta texts forbid marriage while Guru or Shukra is set, and during their balya (just risen) and vriddha (about to set) days.', mr: 'मुहूर्तग्रंथ गुरू किंवा शुक्र अस्त असताना, तसेच त्यांच्या बाल्य (नुकताच उगवलेला) व वृद्ध (मावळण्याच्या बेतातील) दिवसांत विवाह निषिद्ध मानतात.', source: 'Muhurta Chintamani, Vivaha Prakarana (as cited by Drik Panchang)', url: 'https://www.drikpanchang.com/shubh-dates/info/choosing-auspicious-marriage-date.html', verified: false },
      { type: 'shastra', en: 'The Vedic wedding includes Dhruva and Arundhati darshana on the wedding night.', mr: 'वैदिक विवाहात विवाहरात्री ध्रुव व अरुंधती दर्शनाचा विधी आहे.', source: 'Ashvalayana GS 1.7.22; Gobhila GS 2.3.8–12; Paraskara GS 1.8', url: 'https://www.wisdomlib.org/definition/dhruvadarshana', verified: true },
      { type: 'shastra', en: 'Jupiter’s reappearance (heliacal rising) itself marked the start of a Jupiter year in Varahamihira’s calendar.', mr: 'वराहमिहिराच्या कालगणनेत गुरूचा पुनरुदय हाच गुरू-वर्षाचा आरंभ मानला जाई.', source: 'Brihat Samhita 8.1', url: `${WL}doc226724.html`, verified: true },
      { type: 'sky', en: 'Computed in this app for 2026: Guru asta 14 Jul – 13 Aug around conjunction on 29 Jul; Venus greatest evening elongation 46° on 15 Aug, inferior conjunction 24 Oct, Shukra asta 19–29 Oct.', mr: 'या ॲपमधील 2026 चे गणित: गुरू अस्त 14 जुलै – 13 ऑगस्ट (युती 29 जुलै); शुक्राची सर्वाधिक सायं-इनांतर 46° (15 ऑगस्ट), युती 24 ऑक्टोबर, शुक्रास्त 19–29 ऑक्टोबर.' },
      { type: 'interpretation', en: 'The rule is about visibility, not just longitude — panchangs say "Guru-tara asta", the star’s setting — and fits a liturgy that requires seeing stars.', mr: 'हा नियम फक्त रेखांशाचा नसून दृश्यतेचा आहे — पंचांग "गुरुतारा अस्त" म्हणजे ताऱ्याचे मावळणे म्हणते — आणि तारे पाहण्याचा विधी असलेल्या विवाहाशी तो जुळतो.' },
    ],
    myths: [
      { myth: ['"A combust planet is burnt and weakened by the Sun."', '"अस्त ग्रह सूर्याने जळतो व दुर्बल होतो."'], verdict: 'does not hold', why: ['Nothing happens to the planet; it is simply hidden in the Sun’s glare as seen from Earth. "Asta" means setting.', 'ग्रहाला काहीच होत नाही; पृथ्वीवरून पाहता तो फक्त सूर्यतेजात लपतो. "अस्त" म्हणजे मावळणे.'] },
    ],
    confidence: 'medium',
    confidenceNote: ['high for the visibility astronomy; the witness link is an interpretation', 'दृश्यतेच्या खगोलशास्त्रासाठी उच्च; साक्षीदाराचा अर्थ हे अनुमान'],
    sky: [
      { label: ['Guru asta 2026 — Jupiter behind the Sun', 'गुरू अस्त 2026 — गुरू सूर्यामागे'], defId: 'asta-jupiter', view: 'helio' },
      { label: ['Venus, the evening star — 15 Aug 2026', 'सायंतारा शुक्र — 15 ऑगस्ट 2026'], iso: '2026-08-15T14:00:00Z', view: 'sky' },
    ],
    sources: [
      { title: 'Indian Astronomy: A Source Book — visibility of planets', url: 'https://www.wisdomlib.org/hinduism/book/indian-astronomy-a-source-book/d/doc1621558.html' },
      { title: 'Dhruva-darshana in the Grihya Sutras — wisdomlib', url: 'https://www.wisdomlib.org/definition/dhruvadarshana' },
      { title: 'Drik Panchang — choosing a marriage date', url: 'https://www.drikpanchang.com/shubh-dates/info/choosing-auspicious-marriage-date.html' },
    ],
  },
  {
    id: 'nadi-gana',
    q: 17,
    theme: 'planets',
    festivals: [],
    title: ['Why do Nadi dosha and Gana matching exist in Guna Milan?', 'गुणमिलनात नाडी दोष व गण का पाहतात?'],
    short: ['Nadi gives the most points — 8 of 36 — and it punishes sameness. That matches Ayurveda’s oldest rule, "like increases like". It is not a genetics test.', 'नाडीला सर्वाधिक गुण — 36 पैकी 8 — आणि ती समानतेला दंड देते. हे आयुर्वेदाच्या सर्वात जुन्या नियमाशी — "समान वाढवते" — जुळते. ही जनुकीय चाचणी नव्हे.'],
    story: [
      `When elders match kundalis, the one word that makes everyone hold their breath is "Nadi". If the bride and groom have the same Nadi, eight of the 36 points vanish and people speak of Nadi dosha. Why should sameness be a problem?

Ayurveda gives a clue in its very first chapter. Charaka says: similarity always increases, difference always decreases — samanya and vishesha. Too much vata grows with more vata. If two people carry the same dominant nature, the logic goes, their household tilts further the same way. Later jyotisha linked the three Nadis — Adi, Madhya, Antya — to vata, pitta and kapha, and the matching rule follows that logic.

But we must be honest about what Nadi is. It comes only from the Moon's nakshatra at the moment of birth, and the Moon changes nakshatra about every day — so two siblings born a day apart often have different Nadis. It cannot be a test of genes or blood groups; in fact the one blood-group risk in pregnancy (Rh disease) comes from difference, not sameness. Nadi and Gana are a traditional language for temperament, to be weighed with wisdom and the many cancellations the texts themselves give — not a verdict on a marriage.`,
      `कुंडली जुळवताना सगळ्यांचा श्वास रोखून धरणारा एक शब्द म्हणजे "नाडी". वधू-वरांची नाडी एक असेल तर 36 पैकी आठ गुण जातात आणि नाडी दोषाची चर्चा सुरू होते. समानता ही अडचण का?

आयुर्वेद त्याच्या अगदी पहिल्या अध्यायात याचा सुगावा देतो. चरक म्हणतात: समानता नेहमी वाढवते, भिन्नता नेहमी कमी करते — सामान्य आणि विशेष. वात वाताने वाढतो. दोघांची प्रकृती एकाच दिशेची असेल तर घराचा तोल त्याच दिशेने अधिक झुकतो, असा विचार. नंतरच्या ज्योतिषाने तीन नाड्या — आद्य, मध्य, अंत्य — वात, पित्त, कफाशी जोडल्या, आणि मिलनाचा नियम याच तर्काने चालतो.

पण नाडी म्हणजे काय, याबद्दल प्रामाणिक असले पाहिजे. ती फक्त जन्मक्षणीच्या चंद्राच्या नक्षत्रावरून ठरते, आणि चंद्र साधारण रोज नक्षत्र बदलतो — म्हणून एका दिवसाच्या अंतराने जन्मलेल्या भावंडांची नाडी अनेकदा वेगळी असते. ती जनुकांची किंवा रक्तगटाची चाचणी असू शकत नाही; उलट गर्भारपणातील रक्तगटाचा एकमेव धोका (Rh) भिन्नतेमुळे येतो, समानतेमुळे नाही. नाडी व गण ही स्वभाव वर्णन करणारी पारंपरिक भाषा आहे — शहाणपणाने आणि ग्रंथांनीच दिलेल्या अनेक परिहारांसह तोलायची — विवाहावरचा निकाल नव्हे.`,
    ],
    eureka: [
      'Nadi dosha is internally consistent with Charaka’s samanya rule ("like increases like", Sutrasthana 1.44) — and the same fact shows why the "genetic test" reading fails. In this app you can watch it: the Moon changes nakshatra about once a day, and the Nadi label walks Adi → Madhya → Antya → Antya → Madhya → Adi around the wheel.',
      'नाडी दोष चरकांच्या सामान्य नियमाशी ("समान वाढवते", सूत्रस्थान 1.44) सुसंगत आहे — आणि याच गोष्टीमुळे "जनुकीय चाचणी" हा अर्थ टिकत नाही. ॲपमध्ये हे पाहता येते: चंद्र साधारण रोज नक्षत्र बदलतो, आणि नाडी आद्य → मध्य → अंत्य → अंत्य → मध्य → आद्य अशी चक्रावर फिरते.',
    ],
    evidence: [
      { type: 'ritu', en: '"Similarity is always the cause of increase, and dissimilarity the cause of decrease, of all things."', mr: '"सर्व भावांच्या वृद्धीचे कारण नेहमी सामान्य, आणि ऱ्हासाचे कारण विशेष."', source: 'Charaka Samhita, Sutrasthana 1.44', url: 'https://www.carakasamhitaonline.com/index.php/Deerghanjiviteeya_Adhyaya', verified: true },
      { type: 'sky', en: 'Nadi depends only on the Moon’s birth nakshatra; each Nadi covers 9 of 27 nakshatras, so two random people share a Nadi about one time in three.', mr: 'नाडी फक्त जन्मनक्षत्रावर अवलंबून; प्रत्येक नाडीत 27 पैकी 9 नक्षत्रे, म्हणून कोणत्याही दोघांची नाडी साधारण तीनपैकी एकदा जुळते.' },
      { type: 'shastra', en: 'Muhurta texts give cancellations: same Nadi but different rashi; same rashi but different nakshatra; same nakshatra but different pada.', mr: 'मुहूर्तग्रंथ परिहार देतात: नाडी एक पण रास भिन्न; रास एक पण नक्षत्र भिन्न; नक्षत्र एक पण चरण भिन्न.', source: 'Muhurta Chintamani; Narada Samhita (as reported)', url: 'https://horasarvam.blogspot.com/2017/12/exceptions-to-nadi-dosha.html', verified: false },
      { type: 'ritu', en: 'The mapping Adi = vata, Madhya = pitta, Antya = kapha is a later jyotisha convention, not found in Charaka.', mr: 'आद्य = वात, मध्य = पित्त, अंत्य = कफ ही जोड नंतरच्या ज्योतिषातील; चरकसंहितेत नाही.', verified: false },
      { type: 'shastra', en: 'Pulse diagnosis (nadi pariksha) is not in Charaka or Sushruta; it appears first in the Sharngadhara Samhita (~13th–14th c.).', mr: 'नाडीपरीक्षा चरक-सुश्रुतांत नाही; ती प्रथम शार्ङ्गधर संहितेत (~13वे–14वे शतक) दिसते.', source: 'Review literature on nadi pariksha', url: 'https://jaims.in/jaims/article/view/766', verified: false },
      { type: 'interpretation', en: 'Gana is a three-way temperament typology attached to the Moon’s nakshatra — a heuristic for “similar natures”, not a measured trait.', mr: 'गण हे चंद्रनक्षत्राशी जोडलेले स्वभावाचे त्रिविध वर्गीकरण — "समान स्वभाव" ओळखण्याचे अनुमानसाधन, मोजलेला गुणधर्म नव्हे.' },
    ],
    myths: [
      { myth: ['"Nadi dosha is an ancient genetic incompatibility test."', '"नाडी दोष ही प्राचीन जनुकीय विसंगतीची चाचणी आहे."'], verdict: 'does not hold', why: ['Nadi comes from the Moon’s position on the birth day, which changes daily and has nothing to do with inherited DNA.', 'नाडी जन्मदिवशीच्या चंद्रस्थानावरून ठरते, जी रोज बदलते; तिचा अनुवंशिक DNA शी संबंध नाही.'] },
      { myth: ['"Same Nadi means the same blood group, which harms children."', '"नाडी एक म्हणजे रक्तगट एक, आणि त्याने संततीला धोका."'], verdict: 'does not hold', why: ['Three Nadis cannot map to eight blood types, and the real pregnancy risk (Rh disease) arises from difference.', 'तीन नाड्या आठ रक्तगटांशी जुळू शकत नाहीत, आणि गर्भारपणातील खरा धोका (Rh) भिन्नतेमुळे येतो.'] },
      { myth: ['"Nadi represents vata, pitta, kapha exactly as in Charaka."', '"नाडी म्हणजे चरकातील वात, पित्त, कफच."'], verdict: 'partly', why: ['The like-increases-like logic is Ayurvedic, but linking prakriti to the birth nakshatra is a later jyotisha idea.', '"समान वाढवते" हा तर्क आयुर्वेदिक आहे, पण प्रकृतीचा जन्मनक्षत्राशी संबंध ही नंतरची ज्योतिष कल्पना.'] },
    ],
    confidence: 'medium',
    confidenceNote: ['the Ayurvedic parallel is an interpretation; the myth checks are high confidence', 'आयुर्वेदाशी साम्य हे अनुमान; समजुतींची पडताळणी उच्च विश्वासार्ह'],
    sky: [
      { label: ['Watch the Moon change nakshatra (and Nadi)', 'चंद्राचे नक्षत्र (व नाडी) बदलताना पाहा'], iso: '2026-10-01T00:30:00Z', view: 'geo' },
    ],
    sources: [
      { title: 'Charaka Samhita, Sutrasthana 1 (Deerghanjiviteeya) — carakasamhitaonline', url: 'https://www.carakasamhitaonline.com/index.php/Deerghanjiviteeya_Adhyaya' },
      { title: 'Exceptions to Nadi dosha (traditional rules, reported)', url: 'https://horasarvam.blogspot.com/2017/12/exceptions-to-nadi-dosha.html' },
      { title: 'History of Nadi Pariksha — JAIMS', url: 'https://jaims.in/jaims/article/view/766' },
    ],
  },
];
