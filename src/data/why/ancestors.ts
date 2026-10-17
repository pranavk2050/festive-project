import type { WhyEntry } from '../why.ts';

const NS = 'https://archive.org/details/xqwn_nirnaya-sindhu-by-shri-kamalakara-bhatta-mumbai-1901-nirnaya-sagara-press';
const DS = 'https://archive.org/details/dharmasindhubykashinathupadhyaya1888nirnaysagarpress_498_a';
const SS = 'https://archive.org/details/in.ernet.dli.2015.96668';

export const ANCESTORS_WHY: WhyEntry[] = [
  {
    id: 'pitru-paksha',
    q: 1,
    theme: 'ancestors',
    festivals: ['pitru-paksha', 'sarvapitri-amavasya'],
    title: ['Why does Pitru Paksha come only in the dark fortnight of Bhadrapada, when the Sun enters Kanya?', 'पितृपक्ष फक्त भाद्रपदाच्या वद्य पक्षातच, सूर्य कन्येत असतानाच का येतो?'],
    short: ['Because two clocks strike together: on the Moon, the dark fortnight is the ancestors’ daytime; and in the solar year, the last 16 days of Kanya were set aside for them.', 'कारण दोन घड्याळे एकाच वेळी वाजतात: चंद्रावर वद्य पक्ष हा पितरांचा दिवस; आणि सौरवर्षात कन्येचे शेवटचे 16 दिवस त्यांच्यासाठी राखून ठेवलेले.'],
    story: [
      `Where do the ancestors live? Our old astronomers gave a surprisingly precise answer: on the upper side of the Moon — the side that faces away from us. Bhaskaracharya writes it plainly in his Goladhyaya: "vidhūrdhvabhāge pitaro vasantaḥ" — the Pitris dwell on the Moon's upper half, with the Moon beneath their feet.

Now think like someone standing there. On Purnima, when we see the full Moon, their side is turned away from the Sun — it is their midnight. On Amavasya, when the Moon stands between us and the Sun, their side is in full sunlight — it is their noon. So one of our months is one day for them, and our dark fortnight is their daytime. Manu says exactly this: the dark half is the Pitris' day for activity, the bright half their night for sleep. And modern astronomy agrees on the geometry — the far side of the Moon really is lit at new moon.

But why Bhadrapada, and not every dark fortnight? Here the Sun's clock joins in. The Surya Siddhanta marks four arcs of 86 degrees from the start of Tula; they leave exactly 16 degrees at the end of Kanya — "the sixteen days of Virgo", when whatever is given to the Pitris becomes inexhaustible. The Puranas say that when the Sun enters Kanya, Yama lets the ancestors go to visit their families, and they wait, longing for water and pinda. So we offer shraddha in the afternoon of that dark fortnight — their own daytime — while the Sun walks through Kanya.`,
      `पितर राहतात कुठे? आपल्या जुन्या खगोलशास्त्रज्ञांनी आश्चर्यकारकरीत्या नेमके उत्तर दिले: चंद्राच्या वरच्या बाजूला — आपल्यापासून दूर असलेल्या बाजूला. भास्कराचार्य गोलाध्यायात स्पष्ट लिहितात: "विधूर्ध्वभागे पितरो वसन्तः" — पितर चंद्राच्या वरच्या भागावर राहतात, चंद्र त्यांच्या पायाखाली.

आता तिथे उभे राहून विचार करा. पौर्णिमेला, जेव्हा आपल्याला पूर्ण चंद्र दिसतो, तेव्हा त्यांची बाजू सूर्यापासून दूर असते — त्यांची मध्यरात्र. अमावस्येला, चंद्र आपल्या आणि सूर्याच्या मध्ये असताना, त्यांची बाजू पूर्ण उन्हात असते — त्यांचा मध्यान्ह. म्हणजे आपला एक महिना हा त्यांचा एक दिवस, आणि आपला वद्य पक्ष हा त्यांचा दिवस. मनूही हेच सांगतात: कृष्ण पक्ष हा पितरांचा कर्म करण्याचा दिवस, शुक्ल पक्ष झोपेची रात्र. आणि आधुनिक खगोलशास्त्रही ही भूमिती मान्य करते — अमावस्येला चंद्राची पलीकडची बाजू खरोखर प्रकाशित असते.

पण भाद्रपदच का, प्रत्येक वद्य पक्ष का नाही? इथे सूर्याचे घड्याळ सामील होते. सूर्यसिद्धांत तुळेच्या आरंभापासून 86 अंशांचे चार भाग मोजतो; ते कन्येच्या शेवटी नेमके 16 अंश उरवतात — "कन्येचे सोळा दिवस", जेव्हा पितरांना दिलेले अक्षय होते. पुराणे सांगतात, सूर्य कन्येत गेला की यम पितरांना कुटुंबाला भेटायला सोडतो, आणि ते पाणी व पिंडाची वाट पाहत थांबतात. म्हणून आपण त्या वद्य पक्षाच्या अपराह्णी — त्यांच्याच दिवसा — श्राद्ध करतो, सूर्य कन्येतून जात असताना.`,
    ],
    eureka: [
      'Pitru Paksha is fixed by two clocks, and the texts give the geometry for both. Lunar: Amavasya is the Pitris’ noon because the Moon’s far side really is sunlit at new moon (Surya Siddhanta 14.14, Bhaskara). Solar: four 86° arcs from Tula leave exactly 16° of Kanya — the 16-day Mahalaya. In this app, Sarvapitri Amavasya falls with the Sun in Kanya in 50 of 51 years (2000–2050), and the Moon sits right on the Sun’s line.',
      'पितृपक्ष दोन घड्याळांनी ठरतो, आणि ग्रंथ दोन्हींची भूमिती देतात. चांद्र: अमावस्या हा पितरांचा मध्यान्ह, कारण अमावस्येला चंद्राची पलीकडची बाजू खरोखर प्रकाशित असते (सूर्यसिद्धांत 14.14, भास्कराचार्य). सौर: तुळेपासून 86° चे चार भाग कन्येचे नेमके 16° उरवतात — सोळा दिवसांचा महालय. या ॲपनुसार 2000–2050 मधील 51 पैकी 50 वर्षांत सर्वपित्री अमावस्येला सूर्य कन्येत असतो, आणि चंद्र सूर्याच्या रेषेवरच असतो.',
    ],
    evidence: [
      { type: 'shastra', en: 'The Pitris dwell on the upper side of the Moon; at Amavasya they see the Sun overhead (their noon), at Purnima it is their midnight.', mr: 'पितर चंद्राच्या वरच्या भागावर राहतात; अमावस्येला त्यांना सूर्य डोक्यावर दिसतो (मध्यान्ह), पौर्णिमेला त्यांची मध्यरात्र.', source: 'Siddhanta Shiromani, Goladhyaya, Triprashna-vasana 13–14 ("vidhūrdhvabhāge pitaro vasantaḥ")', url: 'https://archive.org/details/siddhanta-siromani-goladhyaya-with-marichi-bhashya-bhaskaracharya-kedar-dutta-joshi', verified: true },
      { type: 'shastra', en: 'A human month is one day-and-night of the Pitris: the dark fortnight is their day for activity, the bright fortnight their night.', mr: 'मनुष्याचा एक महिना म्हणजे पितरांचा एक अहोरात्र: कृष्ण पक्ष त्यांचा कर्मदिवस, शुक्ल पक्ष त्यांची रात्र.', source: 'Manusmriti 1.66', url: 'https://gretil.sub.uni-goettingen.de/gretil/1_sanskr/6_sastra/4_dharma/smrti/manu2p_u.htm', verified: true },
      { type: 'shastra', en: 'The lunar month is a day-night of the Pitris, with Amavasya at their midday.', mr: 'चांद्रमास हा पितरांचा अहोरात्र; अमावस्या त्यांचा मध्यान्ह.', source: 'Surya Siddhanta 14.14 (tr. Burgess)', url: SS, verified: true },
      { type: 'shastra', en: 'Four 86° arcs counted from Tula leave the last 16° of Kanya; gifts to the Pitris in those "16 days of Virgo" are inexhaustible.', mr: 'तुळेपासून मोजलेले 86° चे चार भाग कन्येचे शेवटचे 16° उरवतात; त्या "कन्येच्या सोळा दिवसांत" पितरांना दिलेले अक्षय होते.', source: 'Surya Siddhanta 14.3–6 (tr. Burgess)', url: SS, verified: true },
      { type: 'shastra', en: 'Nirnaya Sindhu opens Mahalaya with Vriddha Manu: from Ashadhi Purnima the Pitris wait for the fifth fortnight, longing daily for water and food; when the Sun goes to Kanya, they come.', mr: 'निर्णयसिंधू महालयाची सुरुवात वृद्ध मनूच्या वचनाने करतो: आषाढी पौर्णिमेपासून पितर पाचव्या पक्षाची वाट पाहतात, रोज अन्न-जलाची आस धरून; सूर्य कन्येत गेला की ते येतात.', source: 'Nirnaya Sindhu, pariccheda 2, Mahalaya section', url: NS, verified: true },
      { type: 'shastra', en: 'The Pitriyana runs through smoke, night, the dark fortnight and the six months of the southern course to the world of the Pitris and the Moon.', mr: 'पितृयान धूम, रात्र, कृष्ण पक्ष आणि दक्षिणायनाचे सहा महिने यांतून पितृलोक व चंद्राकडे जाते.', source: 'Chandogya Upanishad 5.10.3–4; Bhagavad Gita 8.25', url: 'https://www.wisdomlib.org/hinduism/book/chandogya-upanishad-english/d/doc239193.html', verified: true },
      { type: 'shastra', en: 'Shraddha is best in the dark fortnight from the tenth onward, and the afternoon is better than the forenoon.', mr: 'श्राद्ध वद्य दशमीपासून पुढे उत्तम, आणि सकाळपेक्षा अपराह्ण श्रेष्ठ.', source: 'Manusmriti 3.276, 3.278', url: 'https://www.wisdomlib.org/hinduism/book/manusmriti-with-the-commentary-of-medhatithi/d/doc200080.html', verified: true },
      { type: 'shastra', en: 'When the Sun is in Kanya, by Yama’s order the city of the dead stands empty until the Sun reaches Vrishchika.', mr: 'सूर्य कन्येत असताना यमाच्या आज्ञेने प्रेतपुरी सूर्य वृश्चिकेत येईपर्यंत रिकामी असते.', source: 'Bhavishya Purana (as quoted)', url: 'https://kameswari.org/mahalaya-pakshamu-english/', verified: false },
      { type: 'sky', en: 'Computed in this app over 2000–2050: on Sarvapitri Amavasya the Sun is in Kanya in 50 of 51 years (once at the end of Simha).', mr: 'या ॲपमधील 2000–2050 चे गणित: सर्वपित्री अमावस्येला 51 पैकी 50 वर्षांत सूर्य कन्येत (एकदा सिंहाच्या शेवटी).' },
      { type: 'sky', en: 'At new moon the hemisphere of the Moon facing away from Earth is fully sunlit; at full moon it is dark. Each point on the Moon has one day-night per synodic month.', mr: 'अमावस्येला चंद्राचा पृथ्वीपासून दूरचा अर्धगोल पूर्ण प्रकाशित, पौर्णिमेला अंधारात. चंद्रावरील प्रत्येक बिंदूला दर चांद्रमासात एकच दिवस-रात्र.' },
    ],
    myths: [
      { myth: ['"Science has proved the ancestors live on the far side of the Moon."', '"पितर चंद्राच्या पलीकडे राहतात हे विज्ञानाने सिद्ध केले आहे."'], verdict: 'partly', why: ['The geometry is correct — that side is lit at new moon. Where the Pitris dwell remains a matter of faith.', 'भूमिती बरोबर आहे — ती बाजू अमावस्येला प्रकाशित असते. पितरांचा निवास हा मात्र श्रद्धेचा विषय.'] },
      { myth: ['"Pitru Paksha comes because the Moon is closest to Earth then."', '"त्या वेळी चंद्र पृथ्वीच्या सर्वात जवळ असतो म्हणून पितृपक्ष."'], verdict: 'does not hold', why: ['Perigee drifts through the calendar every month; it is unrelated to Bhadrapada.', 'चंद्राचे उपभू-बिंदू दर महिन्याला सरकतात; त्यांचा भाद्रपदाशी संबंध नाही.'] },
      { myth: ['"Kanya is ruled by Yama."', '"कन्या राशीचा स्वामी यम आहे."'], verdict: 'does not hold', why: ['Kanya’s lord in jyotisha is Budha; the Yama link comes from the Puranic verse about Yama releasing the Pitris.', 'ज्योतिषात कन्येचा स्वामी बुध; यमाचा संबंध पितरांना सोडण्याच्या पुराणवचनातून येतो.'] },
    ],
    confidence: 'medium',
    confidenceNote: ['every text is verified and the geometry is right; that the 16° arithmetic caused the 16-day Mahalaya is an inference', 'प्रत्येक ग्रंथ पडताळलेला व भूमिती बरोबर; 16° च्या गणितामुळेच सोळा दिवसांचा महालय आला हे अनुमान'],
    sky: [
      { label: ['Sarvapitri Amavasya — the ancestors’ noon', 'सर्वपित्री अमावस्या — पितरांचा मध्यान्ह'], defId: 'sarvapitri-amavasya', view: 'geo' },
      { label: ['The Sun at Kanya 14° — the "16 days of Virgo" begin (2026)', 'सूर्य कन्या 14° वर — "कन्येचे सोळा दिवस" सुरू (2026)'], iso: '2026-10-01T09:36:00Z', view: 'geo' },
    ],
    sources: [
      { title: 'Siddhanta Shiromani, Goladhyaya (Kedar Datta Joshi ed.) — archive.org', url: 'https://archive.org/details/siddhanta-siromani-goladhyaya-with-marichi-bhashya-bhaskaracharya-kedar-dutta-joshi' },
      { title: 'Surya Siddhanta, tr. Burgess — archive.org', url: SS },
      { title: 'Manusmriti — GRETIL', url: 'https://gretil.sub.uni-goettingen.de/gretil/1_sanskr/6_sastra/4_dharma/smrti/manu2p_u.htm' },
      { title: 'Nirnaya Sindhu (Nirnaya Sagara Press, 1901) — archive.org', url: NS },
      { title: 'Chandogya Upanishad 5.10 — wisdomlib', url: 'https://www.wisdomlib.org/hinduism/book/chandogya-upanishad-english/d/doc239193.html' },
    ],
  },
  {
    id: 'diwali-tula',
    q: 2,
    theme: 'ancestors',
    festivals: ['diwali', 'dhanteras', 'narak-chaturdashi', 'balipratipada', 'bhaubeej', 'vasubaras'],
    title: ['Why is Diwali on the Amavasya when the Sun is in Tula, its sign of debilitation?', 'सूर्य नीच तूळ राशीत असतानाच्या अमावस्येला दिवाळी का?'],
    short: ['Because the ancestors who came at Mahalaya must go home — and Diwali is the first moonless night after the Sun leaves Kanya. The lamps show them the way.', 'कारण महालयात आलेल्या पितरांना परत जायचे असते — आणि सूर्य कन्या सोडल्यानंतरची पहिली चंद्रहीन रात्र म्हणजे दिवाळी. पणत्या त्यांना वाट दाखवतात.'],
    story: [
      `We usually say Diwali is for Lakshmi, or for Rama's return. Both are beloved traditions. But open the Dharmasindhu — the very book that tells Maharashtrian families how to keep the festival — and you find something older hiding in its Diwali verse: "When the thousand-rayed Sun stands in Tula, on Chaturdashi and Amavasya at dusk, men should hold up lamps to show the way to the Pitris." And the mantra says: you who left Yama's world and came at Mahalaya — see your road by this light.

So Diwali is the closing bracket of Pitru Paksha. A month earlier, with the Sun in Kanya, the ancestors came to visit. Now the Sun has crossed into Tula, they must return — and they return on the darkest possible night. In this app you can check it: Diwali's Amavasya is always the first new moon after the Sun leaves Kanya, and on 8 November 2026 the Moon is already below the horizon at sunset — not a sliver of moonlight all night, and the night is longer than the day.

The season joins in too. Charaka puts Ashwin and Kartik in Sharad, when the heat of pitta built up in the rains flares, and the regimen of the coming winter begins with abhyanga — oil massage — and warm baths. That is exactly the dawn oil bath of Narak Chaturdashi. Lamps for the departing ancestors, an oil bath for the turning season, and Lakshmi welcomed into a clean, bright house on the darkest night: the festival weaves them all together.`,
      `आपण सहसा म्हणतो, दिवाळी लक्ष्मीसाठी, किंवा रामाच्या आगमनासाठी. दोन्ही प्रिय परंपरा. पण धर्मसिंधू उघडा — महाराष्ट्रीय घरांना सण कसा पाळायचा हे सांगणारा ग्रंथ — आणि त्याच्या दिवाळीच्या श्लोकात काहीतरी जुने दडलेले सापडते: "सहस्ररश्मी सूर्य तुळेत असताना, चतुर्दशी व अमावस्येला प्रदोषकाळी, हाती दिवे घेऊन पितरांना मार्ग दाखवावा." आणि मंत्र म्हणतो: यमलोक सोडून महालयात आलेल्या पितरांनो, या प्रकाशात तुमचा मार्ग पाहा.

म्हणजे दिवाळी हा पितृपक्षाचा समारोप. महिनाभरापूर्वी, सूर्य कन्येत असताना, पितर भेटायला आले. आता सूर्य तुळेत गेला, त्यांना परतायचे आहे — आणि ते सर्वात अंधाऱ्या रात्री परततात. ॲपमध्ये तपासा: दिवाळीची अमावस्या ही नेहमी सूर्य कन्या सोडल्यानंतरची पहिली अमावस्या असते, आणि 8 नोव्हेंबर 2026 ला सूर्यास्ताच्या वेळीच चंद्र क्षितिजाखाली गेलेला असतो — रात्रभर चांदण्याचा कणही नाही, आणि रात्र दिवसापेक्षा मोठी.

ऋतूही यात सामील होतो. चरक आश्विन-कार्तिक शरद ऋतूत ठेवतात, जेव्हा पावसाळ्यात साचलेले पित्त उफाळते, आणि येणाऱ्या हिवाळ्याची दिनचर्या अभ्यंग — तेल मालिश — व उष्ण स्नानाने सुरू होते. नरक चतुर्दशीचे पहाटेचे अभ्यंगस्नान नेमके हेच. जाणाऱ्या पितरांसाठी दिवे, बदलत्या ऋतूसाठी तेल-स्नान, आणि सर्वात अंधाऱ्या रात्री स्वच्छ, उजळलेल्या घरात लक्ष्मीचे स्वागत: हा सण सगळे एकत्र गुंफतो.`,
    ],
    eureka: [
      'Diwali is the closing bracket of Mahalaya, in the Dharmasindhu’s own words: lamps "to show the way to the Pitris" who "came at Mahalaya", prescribed "when the Sun stands in Tula". In this app the Sun is in Tula on Diwali in 51 of 51 years (2000–2050), and Diwali is always the first new moon after the Sun leaves Kanya — the darkest available night for the ancestors’ way home.',
      'दिवाळी हा महालयाचा समारोप — धर्मसिंधूच्याच शब्दांत: "सूर्य तुळेत असताना" "महालयात आलेल्या" "पितरांना मार्ग दाखवण्यासाठी" दिवे. या ॲपनुसार 2000–2050 मधील 51 पैकी 51 वर्षांत दिवाळीला सूर्य तुळेत असतो, आणि दिवाळी ही नेहमी सूर्य कन्या सोडल्यानंतरची पहिली अमावस्या — पितरांच्या परतीच्या वाटेसाठी सर्वात अंधारी रात्र.',
    ],
    evidence: [
      { type: 'shastra', en: '"When the thousand-rayed Sun stands in Tula, at pradosha on Chaturdashi and Amavasya, men holding firebrands should show the way to the Pitris." The mantra addresses those who left Yama’s world and came at Mahalaya.', mr: '"सहस्ररश्मी तुळेत असताना, चतुर्दशी व अमावस्येच्या प्रदोषकाळी, हाती उल्का घेऊन पितरांना मार्ग दाखवावा." मंत्र यमलोकातून महालयात आलेल्या पितरांना उद्देशून आहे.', source: 'Dharmasindhu, pariccheda 2, Ashvina — Naraka Chaturdashi ("tulāsaṃsthe sahasrāṃśau…")', url: DS, verified: true },
      { type: 'shastra', en: 'The same section prescribes abhyanga snana before dawn, Yama-tarpana, lamps at dusk in temples, gardens and cowsheds, and Lakshmi puja at pradosha on Amavasya.', mr: 'याच प्रकरणात पहाटे अभ्यंगस्नान, यमतर्पण, सायंकाळी देवळे, बागा, गोठ्यांत दिवे, आणि अमावस्येच्या प्रदोषकाळी लक्ष्मीपूजन सांगितले आहे.', source: 'Dharmasindhu, Ashvina Chaturdashi and Amavasya', url: DS, verified: true },
      { type: 'shastra', en: 'On Kartik Shukla Pratipada, Bali is drawn in five colours and worshipped as the future Indra.', mr: 'कार्तिक शुद्ध प्रतिपदेला बळीची पंचरंगी प्रतिमा काढून भावी इंद्र म्हणून पूजा केली जाते.', source: 'Dharmasindhu; Nirnaya Sindhu (quoting Padma)', url: NS, verified: true },
      { type: 'shastra', en: 'The Sun’s exaltation is Mesha 10°, so its deepest debilitation is Tula 10°.', mr: 'सूर्याचा उच्चबिंदू मेष 10°, म्हणून परमनीच तूळ 10°.', source: 'Brihat Jataka 1.13', url: 'https://www.wisdomlib.org/hinduism/book/brihat-jataka-by-varahamihira-sanskrit-english/d/doc1501536.html', verified: true },
      { type: 'sky', en: 'Computed in this app: the Sun is in Tula on Diwali in 51 of 51 years (2000–2050). In 2026 the Moon is below the horizon at sunset on 8 Nov — no moonlight all night.', mr: 'या ॲपमधील गणित: 2000–2050 मधील 51 पैकी 51 वर्षांत दिवाळीला सूर्य तुळेत. 2026 मध्ये 8 नोव्हेंबरच्या सूर्यास्ताला चंद्र क्षितिजाखाली — रात्रभर चांदणे नाही.' },
      { type: 'ritu', en: 'Ashvina and Kartika are Sharad, when pitta accumulated in the rains flares; the Hemanta regimen begins with abhyanga, oil on the head and warm baths.', mr: 'आश्विन व कार्तिक हे शरद ऋतू, जेव्हा पावसाळ्यात साचलेले पित्त उफाळते; हेमंताची दिनचर्या अभ्यंग, डोक्याला तेल व उष्ण स्नानाने सुरू होते.', source: 'Charaka Samhita, Sutrasthana 6', url: 'https://www.carakasamhitaonline.com/index.php/Tasyashiteeya_Adhyaya', verified: true },
      { type: 'shastra', en: 'The Vedic names of the Sharad months are Isha and Urja — "vigour", "nourishment": Kartik is the month of the kharif harvest.', mr: 'शरदाच्या महिन्यांची वैदिक नावे इष व ऊर्ज — "बल", "अन्न": कार्तिक हा खरिपाच्या सुगीचा महिना.', source: 'Taittiriya Samhita 4.4.11', url: 'https://titus.uni-frankfurt.de/texte/etcs/ind/aind/ved/yvs/ts/ts023.htm', verified: true },
    ],
    myths: [
      { myth: ['"Diwali lamps are lit to guide the ancestors home."', '"दिवाळीचे दिवे पितरांना घरी परतण्याची वाट दाखवण्यासाठी."'], verdict: 'holds', why: ['The Dharmasindhu prescribes exactly that, with a mantra for those who came at Mahalaya.', 'धर्मसिंधू नेमके हेच सांगतो, महालयात आलेल्या पितरांसाठी मंत्रासह.'] },
      { myth: ['"Diwali is because the Sun is weak, and Lakshmi puja makes up for it."', '"सूर्य दुर्बल असतो म्हणून दिवाळी, आणि लक्ष्मीपूजन त्याची भरपाई."'], verdict: 'does not hold', why: ['The texts use Tula as a time-marker, not as an astrological weakness to be cured.', 'ग्रंथ तूळ राशीचा उल्लेख काळ ठरवण्यासाठी करतात, दुर्बलतेवर उपाय म्हणून नाही.'] },
      { myth: ['"The Ramayana says Rama returned on Kartik Amavasya."', '"रामायणात राम कार्तिक अमावस्येला परतले असे सांगितले आहे."'], verdict: 'partly', why: ['A strong, beloved later tradition; a Valmiki passage giving this date was not found.', 'ही नंतरची लोकप्रिय, प्रिय परंपरा; ही तारीख देणारा वाल्मीकी रामायणातील उतारा सापडला नाही.'] },
    ],
    confidence: 'high',
    confidenceNote: ['high for the ancestor-lamp link; the harvest and Ayurveda strands are supporting context', 'पितृदीपाच्या संबंधासाठी उच्च; सुगी व आयुर्वेद हे पूरक संदर्भ'],
    sky: [
      { label: ['Diwali pradosh — no Moon in the sky', 'दिवाळीचा प्रदोष — आकाशात चंद्र नाही'], defId: 'diwali', view: 'sky' },
      { label: ['Sun in Tula with the new Moon', 'तुळेतील सूर्य व अमावस्येचा चंद्र'], defId: 'diwali', view: 'geo' },
    ],
    sources: [
      { title: 'Dharmasindhu (Nirnaya Sagar Press, 1888) — archive.org', url: DS },
      { title: 'Nirnaya Sindhu (1901) — archive.org', url: NS },
      { title: 'Brihat Jataka 1.13 — wisdomlib', url: 'https://www.wisdomlib.org/hinduism/book/brihat-jataka-by-varahamihira-sanskrit-english/d/doc1501536.html' },
      { title: 'Charaka Samhita, Sutrasthana 6 — carakasamhitaonline', url: 'https://www.carakasamhitaonline.com/index.php/Tasyashiteeya_Adhyaya' },
    ],
  },
  {
    id: 'ganesh-moon',
    q: 9,
    theme: 'ancestors',
    festivals: ['ganesh-chaturthi', 'ganeshotsav'],
    title: ['Why must we not look at the Moon on Ganesh Chaturthi night?', 'गणेश चतुर्थीच्या रात्री चंद्र का पाहू नये?'],
    short: ['The rule aims at a very real Moon — a thin crescent low in the west for about two hours after sunset, just when we are out for aarti. And the cure is older than the curse.', 'हा नियम एका अगदी खऱ्या चंद्राकडे बोट दाखवतो — सूर्यास्तानंतर सुमारे दोन तास पश्चिमेला खाली असलेली बारीक कोर, नेमकी आपण आरतीला बाहेर असतो तेव्हा. आणि उपाय शापापेक्षा जुना आहे.'],
    story: [
      `Every Maharashtrian child is told: don't look at the Moon tonight, or you will be falsely blamed — like Krishna was. The story goes that Ganesha, with his round belly, slipped while riding his mouse, the Moon laughed, and Ganesha cursed that whoever saw the Moon on this night would face false accusations.

The older story is in the Vishnu Purana. Prasena wore the shining Syamantaka jewel, a lion killed him, and the Yadavas whispered that Krishna had murdered him for the gem. Krishna went into the forest, found the truth, and cleared his name. The Purana promises that whoever remembers this story is freed from false blame — but it says nothing about the Moon or Ganesha. So the remedy came first, and the prohibition was added later. Even the remedy verse hides a lovely echo: "simhaḥ prasenam avadhīt" — "a lion killed Prasena" — recited in the month when the Sun is in Simha, the lion.

Now look at the actual sky. On Chaturthi the Moon is a thin crescent, about 40 degrees from the Sun. It rose in the morning and is lost in daylight; it becomes noticeable only after sunset, low in the west, and sets about two hours later. In 2026 that is 18:37 to 20:37 — exactly the hours of evening aarti and pandal visits. The rule names the one Moon you are most likely to see by accident. Nirnaya Sindhu even reasons that a Moon seen after Panchami has begun is no longer forbidden, and in Mithila women do the opposite on this night — they offer arghya to that same western crescent.`,
      `प्रत्येक मराठी मुलाला सांगितले जाते: आज रात्री चंद्र पाहू नकोस, नाहीतर कृष्णासारखा खोटा आळ येईल. कथा अशी — मोठ्या पोटाचे गणपती उंदरावरून घसरले, चंद्र हसला, आणि गणपतींनी शाप दिला की या रात्री जो चंद्र पाहील त्याच्यावर खोटा आरोप येईल.

जुनी कथा विष्णुपुराणात आहे. प्रसेनाने तेजस्वी स्यमंतक मणी धारण केला, सिंहाने त्याला मारले, आणि यादव कुजबुजू लागले की मण्यासाठी कृष्णानेच त्याला मारले. कृष्ण वनात गेले, सत्य शोधले आणि आपले नाव निर्दोष केले. पुराण सांगते, जो ही कथा स्मरतो तो खोट्या आळातून मुक्त होतो — पण चंद्राचा किंवा गणपतींचा उल्लेखच नाही. म्हणजे उपाय आधी आला, निषेध नंतर जोडला गेला. उपायाच्या श्लोकातही एक सुंदर प्रतिध्वनी आहे: "सिंहः प्रसेनमवधीत्" — "सिंहाने प्रसेनाला मारले" — आणि हा श्लोक सूर्य सिंह राशीत असलेल्या महिन्यात म्हणतात.

आता प्रत्यक्ष आकाश पाहा. चतुर्थीला चंद्र सूर्यापासून सुमारे 40 अंशांवर, बारीक कोर असतो. तो सकाळी उगवतो, पण दिवसाच्या प्रकाशात हरवतो; सूर्यास्तानंतरच पश्चिमेला खाली दिसू लागतो, आणि सुमारे दोन तासांत मावळतो. 2026 मध्ये संध्याकाळी 6:37 ते 8:37 — नेमके सायंआरती व मंडप-दर्शनाचे तास. हा नियम असा चंद्र दाखवतो जो आपल्याला सहज चुकून दिसेल. निर्णयसिंधू तर असेही सांगतो की पंचमी सुरू झाल्यावर दिसलेला चंद्र निषिद्ध नाही, आणि मिथिलेत स्त्रिया या रात्री उलटे करतात — त्याच पश्चिमेच्या कोरीला अर्घ्य देतात.`,
    ],
    eureka: [
      'The rule is written around a real, specific Moon: a 13%-lit crescent that is only noticeable for about two hours after dusk, low in the WSW — in 2026, 18:37 to 20:37, the very hour of evening aarti. And the textual layers run backwards: the Vishnu Purana and Bhagavata give only the remedy (remembering Syamantaka removes false blame); the prohibition and the Ganesha curse come later.',
      'हा नियम एका खऱ्या, विशिष्ट चंद्राभोवती लिहिलेला आहे: 13% प्रकाशित कोर, जी फक्त सायंकाळनंतर सुमारे दोन तास पश्चिम-नैऋत्येला खाली दिसते — 2026 मध्ये 6:37 ते 8:37, नेमकी सायंआरतीची वेळ. आणि ग्रंथांचे थर उलटे आहेत: विष्णुपुराण व भागवत फक्त उपाय देतात (स्यमंतक कथेच्या स्मरणाने खोटा आळ जातो); निषेध व गणेश-शाप नंतरचे.',
    ],
    evidence: [
      { type: 'shastra', en: 'Seeing the Moon on Shukla Chaturthi with the Sun in Simha brings false accusation, so one should never look at it.', mr: 'सूर्य सिंहेत असताना शुद्ध चतुर्थीला चंद्रदर्शन केल्याने मिथ्या आरोप येतो, म्हणून तो कधीही पाहू नये.', source: 'Nirnaya Sindhu, Bhadrapada (quoting Markandeya: "siṃhāditye śuklapakṣe caturthyāṃ candradarśanam…")', url: NS, verified: true },
      { type: 'shastra', en: 'A Moon that rose during Chaturthi but is seen after Panchami has begun is not prohibited.', mr: 'चतुर्थीत उगवलेला पण पंचमी सुरू झाल्यावर दिसलेला चंद्र निषिद्ध नाही.', source: 'Nirnaya Sindhu, same passage', url: NS, verified: true },
      { type: 'shastra', en: 'If the Moon is seen, recite "siṃhaḥ prasenam avadhīt…" or hear the Syamantaka story.', mr: 'चंद्र दिसल्यास "सिंहः प्रसेनमवधीत्…" हा श्लोक म्हणावा किंवा स्यमंतक कथा ऐकावी.', source: 'Dharmasindhu, Bhadrapada Shukla Chaturthi', url: DS, verified: true },
      { type: 'shastra', en: 'The Syamantaka story: Prasena killed by a lion, Krishna suspected and then vindicated.', mr: 'स्यमंतक कथा: सिंहाने प्रसेनाला मारले, कृष्णावर संशय व नंतर निर्दोषत्व.', source: 'Vishnu Purana 4.13 (tr. Wilson)', url: 'https://www.wisdomlib.org/hinduism/book/vishnu-purana-wilson/d/doc116010.html', verified: true },
      { type: 'shastra', en: 'Whoever hears or remembers this narration drives away infamy.', mr: 'जो ही कथा ऐकतो किंवा स्मरतो त्याची अपकीर्ती दूर होते.', source: 'Bhagavata Purana 10.57.42', url: 'https://vedabase.io/en/library/sb/10/57/42/', verified: true },
      { type: 'shastra', en: 'The Ganesha-curses-the-Moon story is attributed to the Brahmavaivarta or Skanda Purana and vrata-kathas.', mr: 'गणपतींनी चंद्राला शाप दिल्याची कथा ब्रह्मवैवर्त किंवा स्कंद पुराण व व्रतकथांची मानली जाते.', source: 'Popular attributions', verified: false },
      { type: 'sky', en: 'Computed in this app for 14 Sept 2026: at sunset (18:37) the Moon is a 13%-lit crescent 42° from the Sun, low in the WSW; it sets at 20:37.', mr: 'या ॲपमधील 14 सप्टें. 2026 चे गणित: सूर्यास्ताला (6:37) चंद्र 13% प्रकाशित कोर, सूर्यापासून 42°, पश्चिम-नैऋत्येला खाली; 8:37 ला मावळतो.' },
      { type: 'shastra', en: 'In Mithila, Chaurchan on the same day does the opposite: women offer arghya to the evening Moon for protection from false blame.', mr: 'मिथिलेत त्याच दिवशी चौरचन उलटे करते: खोट्या आळापासून रक्षणासाठी स्त्रिया सायंकाळच्या चंद्राला अर्घ्य देतात.', source: 'Chaurchan', url: 'https://en.wikipedia.org/wiki/Chaurchan', verified: true },
    ],
    myths: [
      { myth: ['"The Vishnu Purana tells of Ganesha cursing the Moon."', '"विष्णुपुराणात गणपतींच्या चंद्रशापाची कथा आहे."'], verdict: 'does not hold', why: ['It tells the Syamantaka story and its protective promise; Ganesha and the Moon are not in it.', 'त्यात स्यमंतक कथा व तिचे फल आहे; गणपती व चंद्र नाहीत.'] },
      { myth: ['"Never look at the Moon on any Chaturthi."', '"कोणत्याही चतुर्थीला चंद्र पाहू नये."'], verdict: 'does not hold', why: ['Only Shukla Chaturthi with the Sun in Simha; on Sankashti we wait for moonrise to break the fast.', 'फक्त सूर्य सिंहेत असतानाची शुद्ध चतुर्थी; संकष्टीला तर चंद्रोदयाची वाट पाहून उपवास सोडतो.'] },
      { myth: ['"The Chaturthi Moon sends out harmful rays."', '"चतुर्थीचा चंद्र हानिकारक किरण सोडतो."'], verdict: 'does not hold', why: ['A thin crescent reflects less light than most phases; nothing physical is special about this night.', 'बारीक कोर इतर कलांपेक्षा कमी प्रकाश परावर्तित करते; या रात्रीत भौतिकदृष्ट्या विशेष काही नाही.'] },
    ],
    confidence: 'medium',
    confidenceNote: ['sky timing and textual layers verified; that the rule was aimed at evening visibility is inference', 'आकाशातील वेळ व ग्रंथांचे थर पडताळलेले; नियम सायंकाळच्या दृश्यतेसाठीच होता हे अनुमान'],
    sky: [
      { label: ['The forbidden crescent — 14 Sept 2026, 18:50', 'निषिद्ध कोर — 14 सप्टें. 2026, सायं. 6:50'], iso: '2026-09-14T13:20:00Z', view: 'sky' },
    ],
    sources: [
      { title: 'Nirnaya Sindhu, Bhadrapada — archive.org', url: NS },
      { title: 'Dharmasindhu — archive.org', url: DS },
      { title: 'Vishnu Purana 4.13 (Wilson) — wisdomlib', url: 'https://www.wisdomlib.org/hinduism/book/vishnu-purana-wilson/d/doc116010.html' },
      { title: 'Bhagavata Purana 10.57.42 — vedabase', url: 'https://vedabase.io/en/library/sb/10/57/42/' },
    ],
  },
  {
    id: 'nakshatra-devata-vriksha',
    q: 11,
    theme: 'ancestors',
    festivals: [],
    title: ['Why does each nakshatra have a devata and an aradhya vriksha?', 'प्रत्येक नक्षत्राला देवता आणि आराध्य वृक्ष का?'],
    short: ['The devatas are truly Vedic — they turn each star into a ritual "address" the panchang still uses. The trees are a beautiful but much later tradition.', 'देवता खऱ्या अर्थाने वैदिक — त्या प्रत्येक नक्षत्राला एक धार्मिक "पत्ता" देतात, जो पंचांग आजही वापरते. वृक्ष ही सुंदर, पण खूप नंतरची परंपरा.'],
    story: [
      `In the Taittiriya Samhita of the Yajurveda there is a long, rhythmic list: "Krittika nakshatram, Agnir devata… Rohini nakshatram, Prajapatir devata…" — twenty-seven stars, each with its god. Magha belongs to the Pitaras, the ancestors; Hasta to Savitr, the Sun-god; Ardra to Rudra; Pushya to Brihaspati. Notice that the list begins with Krittika, the Pleiades — not Ashwini as today. Many scholars read this as a fossil of an older sky, when the spring equinox lay near the Pleiades.

These gods are not decoration; they are addresses. Because Magha belongs to the ancestors, the dharmashastras make the day when the Moon is in Magha during Pitru Paksha a special shraddha. And if at the same time the Sun is in Hasta — Savitr's star — the moment is called gajacchaya and said to equal a shraddha at Gaya. You can see it in this app: in 2026 the Moon crosses Magha on 6–7 October while the Sun is in Hasta.

And the trees? Here we must be honest. No verse in the Vedas gives a tree for each nakshatra; the lists we use are late, attributed to the Narada Purana or to plant lexicons, and they disagree with each other. The nakshatra-van gardens planted at temples and forest offices are a recent and lovely practice. Yet many of those trees — banyan, udumbara, peepal, jamun, palash, kadamba — are pillars of Ayurveda, and Ayurveda does link nakshatras to plants in one way: when to gather and give a medicine. So plant your star's tree with joy — as ecology and devotion, not as a dosha remedy.`,
      `यजुर्वेदाच्या तैत्तिरीय संहितेत एक दीर्घ, लयबद्ध यादी आहे: "कृत्तिका नक्षत्रम्, अग्निर्देवता… रोहिणी नक्षत्रम्, प्रजापतिर्देवता…" — सत्तावीस नक्षत्रे, प्रत्येकाची देवता. मघा पितरांचे; हस्त सवितृ म्हणजे सूर्यदेवाचे; आर्द्रा रुद्राचे; पुष्य बृहस्पतीचे. लक्षात घ्या, यादी आजच्यासारखी अश्विनीपासून नव्हे तर कृत्तिका — म्हणजे कृत्तिका पुंजापासून — सुरू होते. अनेक विद्वान याला जुन्या आकाशाचा जीवाश्म मानतात, जेव्हा वसंत संपात कृत्तिकेजवळ होता.

या देवता केवळ शोभेसाठी नाहीत; त्या पत्ते आहेत. मघा पितरांचे असल्याने, धर्मशास्त्र पितृपक्षात चंद्र मघेत असलेला दिवस विशेष श्राद्धाचा मानते. आणि त्याच वेळी सूर्य हस्तात — सवित्याच्या नक्षत्रात — असेल तर त्या क्षणाला गजच्छाया म्हणतात, आणि ते गयाश्राद्धासमान मानले जाते. ॲपमध्ये पाहा: 2026 मध्ये 6–7 ऑक्टोबरला चंद्र मघेतून जातो, आणि सूर्य हस्तात असतो.

आणि वृक्ष? इथे प्रामाणिक असले पाहिजे. वेदांत प्रत्येक नक्षत्राला वृक्ष देणारा श्लोक नाही; आपल्या याद्या उशिराच्या — नारद पुराण किंवा वनस्पतीकोशांच्या मानल्या जाणाऱ्या — आणि एकमेकांशी जुळतही नाहीत. देवळांत व वनविभागात लावली जाणारी नक्षत्रवने ही अलीकडची, सुंदर प्रथा आहे. तरीही त्यांपैकी अनेक वृक्ष — वड, उंबर, पिंपळ, जांभूळ, पळस, कदंब — आयुर्वेदाचे आधारस्तंभ आहेत, आणि आयुर्वेद नक्षत्रांचा वनस्पतींशी एकाच प्रकारे संबंध जोडतो: औषध कधी गोळा करावे व कधी द्यावे. म्हणून आपल्या नक्षत्राचा वृक्ष आनंदाने लावा — पर्यावरण व भक्ती म्हणून, दोषनिवारणाचा उपाय म्हणून नव्हे.`,
    ],
    eureka: [
      'The devatas turn nakshatras into ritual addresses that the panchang still uses: Magha belongs to the Pitaras (Taittiriya Samhita 4.4.10), so "Magha inside Pitru Paksha" becomes a special shraddha — and with the Sun in Savitr’s Hasta it is gajacchaya, "equal to Gaya". In this app, 2026 shows the Moon in Magha on 6–7 Oct while the Sun is in Hasta (the Trayodashi misses by about 1.5 hours this year).',
      'देवता नक्षत्रांना धार्मिक पत्ते देतात, जे पंचांग आजही वापरते: मघा पितरांचे (तैत्तिरीय संहिता 4.4.10), म्हणून "पितृपक्षातील मघा" हे विशेष श्राद्ध — आणि सूर्य सवित्याच्या हस्तात असेल तर गजच्छाया, "गयासमान". या ॲपमध्ये 2026 मध्ये 6–7 ऑक्टोबरला चंद्र मघेत आणि सूर्य हस्तात दिसतो (या वर्षी त्रयोदशी सुमारे दीड तासाने चुकते).',
    ],
    evidence: [
      { type: 'shastra', en: 'Twenty-seven nakshatras with their devatas: "Krittika nakshatram, Agnir devata…", Magha to the Pitaras, Hasta to Savitr — the list starts with Krittika.', mr: 'देवतांसह सत्तावीस नक्षत्रे: "कृत्तिका नक्षत्रम्, अग्निर्देवता…", मघा पितरांचे, हस्त सवित्याचे — यादी कृत्तिकेपासून सुरू.', source: 'Taittiriya Samhita 4.4.10.1–3', url: 'https://titus.uni-frankfurt.de/texte/etcs/ind/aind/ved/yvs/ts/ts023.htm', verified: true },
      { type: 'shastra', en: 'Magha-trayodashi shraddha in the ancestors’ fortnight; with the Sun in Hasta the moment is gajacchaya, said to equal Gaya.', mr: 'पितृपक्षातील मघा-त्रयोदशी श्राद्ध; सूर्य हस्तात असेल तर गजच्छाया — गयासमान.', source: 'Nirnaya Sindhu, Ashvina (quoting Shankha and Vayu)', url: NS, verified: true },
      { type: 'sky', en: 'The Krittika-first order is widely read as a trace of the time when the vernal equinox lay near the Pleiades (roughly the 3rd millennium BCE) — a debated interpretation.', mr: 'कृत्तिकेपासूनची सुरुवात वसंत संपात कृत्तिकेजवळ असतानाच्या काळाची (साधारण इ.स.पू. 3रे सहस्रक) खूण मानली जाते — हा विवादित अर्थ आहे.', source: 'History-of-astronomy literature', url: 'https://arxiv.org/pdf/physics/0101063' },
      { type: 'shastra', en: 'The 27-tree list (Karaskara for Ashwini … Madhuka for Revati) is attributed to the Narada Purana or plant lexicons; the lists disagree.', mr: '27 वृक्षांची यादी (अश्विनीसाठी कारस्कर … रेवतीसाठी मधूक) नारद पुराण किंवा वनस्पतीकोशांची मानली जाते; याद्यांत मतभेद.', source: 'Secondary compilations', verified: false },
      { type: 'interpretation', en: 'Planting all 27 trees as a nakshatra-vana is a modern practice of recent decades.', mr: 'सर्व 27 वृक्षांचे नक्षत्रवन लावणे ही गेल्या काही दशकांतील आधुनिक प्रथा.', source: 'Nakshatravana', url: 'https://en.wikipedia.org/wiki/Nakshatravana', verified: true },
      { type: 'ritu', en: 'Ayurveda links nakshatras to plants through timing: Charaka’s pumsavana uses banyan buds gathered under Pushya.', mr: 'आयुर्वेद नक्षत्रे व वनस्पती यांचा संबंध वेळेद्वारे जोडतो: चरकांच्या पुंसवनात पुष्य नक्षत्रात गोळा केलेल्या वडाच्या कोवळ्या कळ्या वापरतात.', source: 'Charaka Samhita, Sharirasthana 8.19', url: 'https://www.carakasamhitaonline.com/index.php/Jatisutriya_Sharira', verified: true },
      { type: 'ritu', en: 'Banyan, udumbara, peepal, plaksha, madhuka, jamun, palash and kadamba belong to Sushruta’s Nyagrodhadi group, used for wounds, fractures and uterine disorders.', mr: 'वड, उंबर, पिंपळ, प्लक्ष, मधूक, जांभूळ, पळस व कदंब सुश्रुतांच्या न्यग्रोधादी गणात — जखमा, अस्थिभंग व गर्भाशयविकारांसाठी.', source: 'Sushruta Samhita, Sutrasthana 38', url: 'https://www.wisdomlib.org/definition/nyagrodhadi', verified: true },
    ],
    myths: [
      { myth: ['"The nakshatra-tree list is Vedic."', '"नक्षत्र-वृक्षांची यादी वैदिक आहे."'], verdict: 'does not hold', why: ['The Vedic lists give deities, not trees; the tree lists are late and inconsistent.', 'वैदिक याद्या देवता देतात, वृक्ष नव्हे; वृक्षांच्या याद्या उशिराच्या व विसंगत.'] },
      { myth: ['"Planting your birth-star tree removes doshas."', '"जन्मनक्षत्राचा वृक्ष लावल्याने दोष जातात."'], verdict: 'does not hold', why: ['No verified verse and no evidence; planting native medicinal trees is good in its own right.', 'पडताळलेला श्लोक नाही व पुरावा नाही; देशी औषधी वृक्ष लावणे स्वतःच चांगले.'] },
      { myth: ['"The peepal gives out oxygen at night."', '"पिंपळ रात्रीही प्राणवायू देतो."'], verdict: 'does not hold', why: ['Like other trees it photosynthesises by day and respires at night.', 'इतर वृक्षांप्रमाणे तो दिवसा प्रकाशसंश्लेषण करतो आणि रात्री श्वसन.'] },
    ],
    confidence: 'high',
    confidenceNote: ['high for the deity chain; the trees have no verified ancient basis', 'देवतांच्या साखळीसाठी उच्च; वृक्षांना पडताळलेला प्राचीन आधार नाही'],
    sky: [
      { label: ['Moon in Magha, Sun in Hasta — 7 Oct 2026', 'चंद्र मघेत, सूर्य हस्तात — 7 ऑक्टो. 2026'], iso: '2026-10-07T04:30:00Z', view: 'geo' },
    ],
    sources: [
      { title: 'Taittiriya Samhita 4.4.10 — TITUS', url: 'https://titus.uni-frankfurt.de/texte/etcs/ind/aind/ved/yvs/ts/ts023.htm' },
      { title: 'Nirnaya Sindhu — archive.org', url: NS },
      { title: 'Charaka Samhita, Sharirasthana 8 — carakasamhitaonline', url: 'https://www.carakasamhitaonline.com/index.php/Jatisutriya_Sharira' },
      { title: 'Nyagrodhadi gana (Sushruta) — wisdomlib', url: 'https://www.wisdomlib.org/definition/nyagrodhadi' },
      { title: 'Nakshatravana', url: 'https://en.wikipedia.org/wiki/Nakshatravana' },
    ],
  },
  {
    id: 'vat-purnima',
    q: 18,
    theme: 'ancestors',
    festivals: ['vat-purnima', 'vat-savitri-amavasya'],
    title: ['Why do women worship the banyan tree on Vat Purnima?', 'वटपौर्णिमेला स्त्रिया वडाची पूजा का करतात?'],
    short: ['The banyan never dies — its roots become new trunks — and in Ayurveda it is a women’s medicine. Surprise: the Mahabharata’s Savitri story never mentions a banyan.', 'वड कधीच मरत नाही — त्याच्या पारंब्या नवे खोड होतात — आणि आयुर्वेदात तो स्त्रियांचे औषध आहे. आश्चर्य: महाभारतातील सावित्रीच्या कथेत वडाचा उल्लेखच नाही.'],
    story: [
      `On Jyeshtha Purnima, in every lane of Pune you see women in their best saris circling a banyan with cotton thread, remembering Savitri, who followed Yama himself and won back Satyavan's life. It is one of the most moving stories in the Mahabharata.

But here is a surprise: in the Mahabharata's own telling, there is no banyan. Satyavan is cutting wood in the forest, feels a headache, and lays his head in Savitri's lap; Yama comes; Savitri follows him with wisdom and wins three boons. The banyan enters later, through the vrata texts that Nirnaya Sindhu quotes — "worship at the root of the banyan". Why the banyan? Because no tree lives longer: its hanging roots grow down into new trunks, and one tree can stand for centuries — an unbroken lineage, exactly what the vrata asks for. In the Puranas, Markandeya sees a lone banyan floating on the waters of pralaya, the one thing that survives.

And the epic does leave us a sky clue. Savitri and Satyavan walk home long after dark "by the light of the moon between the trees", on a day of forest fires. Forest fires belong to the dry heat of Jyeshtha before the monsoon — and a moonlit night means the full Moon, rising at sunset. That suits the Deccan tradition of Purnima beautifully: in 2026 the full Moon rises at 18:58, just before sunset. Ayurveda adds the final touch: the banyan is a classical women's medicine — Charaka and Sushruta use its tender buds in rites for a healthy pregnancy — and in the fierce summer heat Charaka advises resting in cool, shady groves.`,
      `ज्येष्ठ पौर्णिमेला पुण्याच्या प्रत्येक गल्लीत उत्तम साड्या नेसलेल्या स्त्रिया वडाला सुताचे फेरे घालताना दिसतात — साक्षात यमामागे जाऊन सत्यवानाचे प्राण परत मिळवणाऱ्या सावित्रीचे स्मरण करत. महाभारतातील ही सर्वात हृदयस्पर्शी कथांपैकी एक.

पण एक आश्चर्य: महाभारताच्या मूळ कथेत वडच नाही. सत्यवान वनात लाकडे तोडत असतो, त्याचे डोके दुखते, आणि तो सावित्रीच्या मांडीवर डोके ठेवतो; यम येतो; सावित्री शहाणपणाने त्याच्यामागे जाते आणि तीन वर मिळवते. वड नंतर येतो — निर्णयसिंधूने उद्धृत केलेल्या व्रतग्रंथांतून: "वडाच्या मुळाशी पूजा करावी". वडच का? कारण इतका दीर्घायुषी वृक्ष नाही: त्याच्या पारंब्या खाली वाढून नवी खोडे होतात, आणि एक वड शतकानुशतके उभा राहतो — अखंड वंश, नेमके हेच व्रत मागते. पुराणांत मार्कंडेय ऋषींना प्रलयजलात एकटा तरंगणारा वड दिसतो — जो टिकून राहतो तो एकच.

आणि महाकाव्य आकाशाचा एक सुगावा ठेवते. सावित्री व सत्यवान रात्र झाल्यावर "झाडांमधून येणाऱ्या चांदण्यात" घरी परततात — आणि त्या दिवशी वणवा पेटलेला असतो. वणवे पावसाळ्यापूर्वीच्या ज्येष्ठातील कोरड्या उष्म्याचे; आणि चांदणी रात्र म्हणजे पौर्णिमा — सूर्यास्ताला उगवणारा पूर्ण चंद्र. दक्षिणेच्या पौर्णिमेच्या परंपरेशी हे सुंदर जुळते: 2026 मध्ये पूर्ण चंद्र सायं. 6:58 ला, सूर्यास्ताच्या अगदी आधी उगवतो. आयुर्वेद शेवटचा रंग भरतो: वड हे स्त्रियांचे पारंपरिक औषध — चरक व सुश्रुत निरोगी गर्भारपणाच्या विधीत त्याच्या कोवळ्या कळ्या वापरतात — आणि कडक उन्हाळ्यात चरक थंड, सावलीच्या उपवनांत विश्रांती घ्यायला सांगतात.`,
    ],
    eureka: [
      'The banyan is absent from the Mahabharata — but the epic’s own sky clue fits the Deccan date: Savitri brings Satyavan home "by the light of the moon between the trees" on a day of forest fires. A Purnima Moon rises at sunset (2026: 18:58, sunset 19:14); an Amavasya night would be moonless. Forest fires belong to Jyeshtha’s pre-monsoon heat.',
      'महाभारतात वड नाही — पण महाकाव्याचा स्वतःचा आकाशसुगावा दक्षिणेच्या तारखेशी जुळतो: सावित्री वणव्याच्या दिवशी "झाडांमधून येणाऱ्या चांदण्यात" सत्यवानाला घरी आणते. पौर्णिमेचा चंद्र सूर्यास्ताला उगवतो (2026: सायं. 6:58, सूर्यास्त 7:14); अमावस्येची रात्र चंद्रहीन असती. वणवे ज्येष्ठातील पावसाळ्यापूर्वीच्या उष्म्याचे.',
    ],
    evidence: [
      { type: 'shastra', en: 'In the Mahabharata, Satyavan cutting wood gets a headache and lies in Savitri’s lap; Yama comes; no banyan is named.', mr: 'महाभारतात लाकडे तोडणाऱ्या सत्यवानाचे डोके दुखते व तो सावित्रीच्या मांडीवर निजतो; यम येतो; वडाचा उल्लेख नाही.', source: 'Mahabharata, Vana Parva, Savitri-upakhyana (tr. Ganguli)', url: 'https://www.gutenberg.org/ebooks/12333', verified: true },
      { type: 'shastra', en: 'They walk home after dark "by the light of the moon between the trees", and a forest fire is burning that day.', mr: 'रात्री ते "झाडांमधून येणाऱ्या चांदण्यात" घरी परततात, आणि त्या दिवशी वणवा पेटलेला असतो.', source: 'Mahabharata, Vana Parva, Savitri-upakhyana (Ganguli)', url: 'https://www.gutenberg.org/ebooks/12333', verified: true },
      { type: 'shastra', en: 'Savitri-vrata on Jyeshtha Purnima, "followed by the Dakshinatyas"; Nirnaya Sindhu also records Amavasya and Chaturdashi dates as regional variants.', mr: 'ज्येष्ठ पौर्णिमेला सावित्रीव्रत, "दाक्षिणात्य हे पाळतात"; निर्णयसिंधू अमावस्या व चतुर्दशीच्या तारखाही प्रादेशिक भेद म्हणून नोंदवतो.', source: 'Nirnaya Sindhu, Jyeshtha, Savitri-vrata-nirnaya', url: NS, verified: true },
      { type: 'shastra', en: 'Markandeya sees a lone young banyan on an island in the waters of pralaya, with the divine infant on a leaf.', mr: 'मार्कंडेय ऋषींना प्रलयजलातील बेटावर एकटा कोवळा वड, आणि पानावर दिव्य बालक दिसते.', source: 'Bhagavata Purana 12.9.20–21', url: 'https://vedabase.io/en/library/sb/12/9/20/', verified: true },
      { type: 'ritu', en: 'Charaka’s pumsavana uses banyan buds gathered under Pushya; Sushruta uses banyan juice in the nostril. Sushruta’s banyan-led group treats disorders of the uterus.', mr: 'चरकांच्या पुंसवनात पुष्य नक्षत्रात गोळा केलेल्या वडाच्या कळ्या; सुश्रुत नाकात वडाचा रस वापरतात. सुश्रुतांचा न्यग्रोधादी गण गर्भाशयविकारांवर.', source: 'Charaka Sharira 8.19, 8.24; Sushruta Sharira 2.32; Sutra 38', url: 'https://www.carakasamhitaonline.com/index.php/Jatisutriya_Sharira', verified: true },
      { type: 'ritu', en: 'Jyeshtha and Ashadha are Grishma; Charaka advises day rest in cool shelters and enjoying cool gardens.', mr: 'ज्येष्ठ व आषाढ हा ग्रीष्म; चरक दिवसा थंड आश्रयात विश्रांती व शीतल उपवनांचा आनंद घ्यायला सांगतात.', source: 'Charaka Samhita, Sutrasthana 6.27–32', url: 'https://www.carakasamhitaonline.com/index.php/Tasyashiteeya_Adhyaya', verified: true },
      { type: 'sky', en: 'Computed in this app for Vat Purnima 2026: the Moon (99.7% lit) rises at 18:58 in the ESE; the Sun sets at 19:14.', mr: 'या ॲपमधील वटपौर्णिमा 2026 चे गणित: चंद्र (99.7% प्रकाशित) सायं. 6:58 ला पूर्व-आग्नेयेला उगवतो; सूर्यास्त 7:14.' },
      { type: 'interpretation', en: 'The banyan’s aerial roots become new trunks, letting one tree live for centuries — a natural emblem of an unbroken lineage.', mr: 'वडाच्या पारंब्या नवी खोडे होतात, त्यामुळे एक वड शतकानुशतके जगतो — अखंड वंशाचे नैसर्गिक प्रतीक.' },
    ],
    myths: [
      { myth: ['"In the Mahabharata, Savitri sat under a banyan when Yama came."', '"महाभारतात यम आला तेव्हा सावित्री वडाखाली बसली होती."'], verdict: 'does not hold', why: ['The epic names no banyan; it enters through later vrata texts.', 'महाकाव्यात वडाचा उल्लेख नाही; तो नंतरच्या व्रतग्रंथांतून येतो.'] },
      { myth: ['"The banyan gives oxygen 24 hours a day."', '"वड चोवीस तास प्राणवायू देतो."'], verdict: 'does not hold', why: ['It photosynthesises by day and respires at night — though its canopy gives wonderful shade.', 'तो दिवसा प्रकाशसंश्लेषण व रात्री श्वसन करतो — मात्र त्याची छाया अप्रतिम.'] },
      { myth: ['"Vat Savitri falls on the same day across India."', '"वटसावित्री सर्व भारतात एकाच दिवशी."'], verdict: 'does not hold', why: ['Nirnaya Sindhu itself records Purnima (Deccan), Amavasya (north) and Chaturdashi variants.', 'निर्णयसिंधूच पौर्णिमा (दक्षिण), अमावस्या (उत्तर) व चतुर्दशी असे भेद नोंदवतो.'] },
    ],
    confidence: 'medium',
    confidenceNote: ['the epic text, dates and Ayurvedic uses are verified; that the moonlit return favours Purnima is an inference', 'महाकाव्य, तारखा व आयुर्वेदिक उपयोग पडताळलेले; चांदण्यातील परतीवरून पौर्णिमा हे अनुमान'],
    sky: [
      { label: ['Full Moon rising at sunset — Vat Purnima 2026', 'सूर्यास्ताला उगवणारा पूर्ण चंद्र — वटपौर्णिमा 2026'], iso: '2026-06-29T14:00:00Z', view: 'sky' },
    ],
    sources: [
      { title: 'Mahabharata, Vana Parva (Ganguli) — Project Gutenberg', url: 'https://www.gutenberg.org/ebooks/12333' },
      { title: 'Nirnaya Sindhu — archive.org', url: NS },
      { title: 'Bhagavata Purana 12.9 — vedabase', url: 'https://vedabase.io/en/library/sb/12/9/20/' },
      { title: 'Charaka Samhita, Sharirasthana 8 — carakasamhitaonline', url: 'https://www.carakasamhitaonline.com/index.php/Jatisutriya_Sharira' },
    ],
  },
];
