import type { WhyEntry } from '../why.ts';

const CS6 = 'https://www.carakasamhitaonline.com/index.php/Tasyashiteeya_Adhyaya';
const GB = 'https://www.wisdomlib.org/hinduism/essay/sacrifices-ritualistic-study/d/doc1211278.html';
const AH3 = 'https://www.easyayurveda.com/ritucharya-ayurvedic-seasonal-regimen-3rd-chapter-ashtang-hriday/';

export const SEASON_WHY: WhyEntry[] = [
  {
    id: 'chaturmas',
    q: 4,
    theme: 'season',
    festivals: ['chaturmas', 'ekadashi-devshayani', 'ekadashi-prabodhini', 'tulsi-vivah'],
    title: ['Why does Chaturmas — Vishnu’s sleep — coincide with the monsoon, and why its food restrictions?', 'चातुर्मास — विष्णूंची निद्रा — पावसाळ्याशीच का जुळतो, आणि त्यातील आहार-नियम का?'],
    short: ['Long before Vishnu’s sleep, the Vedas held "Chaturmasya" healing sacrifices at the junctions of seasons, "because disease is born there". The monsoon is when Ayurveda says our digestive fire is weakest.', 'विष्णूंच्या निद्रेपूर्वीच वेदांत ऋतुसंधीला "चातुर्मास्य" औषधी यज्ञ होत — "कारण रोग तिथेच जन्मतो". आणि आयुर्वेद म्हणतो, पावसाळ्यात आपला जठराग्नी सर्वात मंद असतो.'],
    story: [
      `On Ashadhi Ekadashi the Varkaris reach Pandharpur, and from that day, says the tradition, Vishnu lies down on Shesha for four months of yoga-nidra. Weddings pause; vows begin; grandmother gives up leafy vegetables in Shravan, curd in Bhadrapada, milk in Ashwin and pulses in Kartik. The old verse runs: "Śrāvaṇe varjayet śākaṃ, dadhi bhādrapade tathā, dugdham āśvayuje māsi, kārtike dvidalaṃ tyajet."

Why these four months? Look out of the window: from Devshayani to Prabodhini is almost exactly the monsoon, from its arrival in June to its withdrawal in October. Manu calls dakshinayana the night of the gods — so a god asleep through the rains fits perfectly. And there is something even older. In Vedic times "Chaturmasya" meant three great seasonal sacrifices held every four months, and the Gopatha Brahmana explains them bluntly: these are healing sacrifices, performed at the junctions of seasons, "because at the junctions of seasons disease is born".

Ayurveda tells the same story in its own language. Charaka says that in the rains our agni, the digestive fire, already weakened by summer, is dimmed further by damp vapour from the earth and the souring of water — so food should be light. Two of grandmother's rules fit beautifully: curd is dropped just before Sharad, the season in which Charaka and Vagbhata forbid it; and new pulses are dropped just as they are harvested, because Vagbhata says freshly harvested grain clogs the channels. The leafy-greens rule fits partly — and the milk rule does not fit Ayurveda at all, which happily recommends cooling milk in Sharad. Even Maharashtra drinks spiced milk under the Kojagiri Moon in Ashwin!`,
      `आषाढी एकादशीला वारकरी पंढरपूरला पोहोचतात, आणि परंपरा सांगते, त्या दिवसापासून विष्णू चार महिने शेषशय्येवर योगनिद्रा घेतात. लग्नकार्ये थांबतात; व्रते सुरू होतात; आजी श्रावणात पालेभाज्या, भाद्रपदात दही, आश्विनात दूध आणि कार्तिकात कडधान्ये सोडते. जुना श्लोक असा: "श्रावणे वर्जयेत् शाकं, दधि भाद्रपदे तथा, दुग्धमाश्वयुजे मासि, कार्तिके द्विदलं त्यजेत्."

हेच चार महिने का? खिडकीबाहेर पाहा: देवशयनी ते प्रबोधिनी म्हणजे जवळजवळ नेमका पावसाळा — जूनमधील आगमनापासून ऑक्टोबरमधील परतीपर्यंत. मनू दक्षिणायनाला देवांची रात्र म्हणतात — म्हणून पावसाळ्यात झोपलेले देव अगदी चपखल. आणि याहूनही जुनी गोष्ट आहे. वैदिक काळात "चातुर्मास्य" म्हणजे दर चार महिन्यांनी होणारे तीन मोठे ऋतुयज्ञ, आणि गोपथ ब्राह्मण त्यांचे कारण थेट सांगते: हे औषधी यज्ञ, ऋतुसंधीला केले जातात, "कारण ऋतुसंधीला रोग जन्मतो".

आयुर्वेद हीच कथा आपल्या भाषेत सांगतो. चरक म्हणतात, पावसाळ्यात उन्हाळ्याने आधीच दुबळा झालेला अग्नी जमिनीतून उठणाऱ्या दमट वाफेने व पाण्याच्या आंबटपणाने आणखी मंदावतो — म्हणून आहार हलका हवा. आजीचे दोन नियम सुंदर जुळतात: शरदापूर्वी दही सोडले जाते — त्याच ऋतूत चरक व वाग्भट दही निषिद्ध मानतात; आणि नवी कडधान्ये नेमकी कापणीच्या वेळी सोडली जातात, कारण वाग्भट म्हणतात नवे धान्य स्रोतसांना अवरोध करते. पालेभाज्यांचा नियम अंशतः जुळतो — आणि दुधाचा नियम आयुर्वेदाशी मुळीच जुळत नाही; उलट आयुर्वेद शरदात थंड दूध सांगतो. महाराष्ट्र तर आश्विनात कोजागरीच्या चांदण्यात मसाला दूधच पितो!`,
    ],
    eureka: [
      'The Vedic name already carried a medical reason: Gopatha Brahmana 2.1.19 calls the Chaturmasya rites "healing sacrifices" held at season-junctions "because disease is born at the junctions of the seasons" — the same idea as Charaka’s warning about sudden seasonal change. In this app, Devshayani always falls 1–5 weeks after the June solstice (Sun in Mithuna or Karka), right as the monsoon covers India.',
      'वैदिक नावातच वैद्यकीय कारण दडले आहे: गोपथ ब्राह्मण 2.1.19 चातुर्मास्य विधींना "औषधी यज्ञ" म्हणते, जे "ऋतुसंधीला रोग जन्मतो" म्हणून ऋतुसंधीला केले जातात — अचानक ऋतुबदलाविषयीच्या चरकांच्या इशाऱ्यासारखेच. या ॲपनुसार देवशयनी नेहमी जूनच्या अयनांतानंतर 1–5 आठवड्यांनी (सूर्य मिथुन/कर्केत) येते — नेमका भारतभर पाऊस पसरतो तेव्हा.',
    ],
    evidence: [
      { type: 'shastra', en: '"In Shravana give up vegetables, in Bhadrapada curd, in Ashvina milk, in Kartika pulses."', mr: '"श्रावणात भाजी, भाद्रपदात दही, आश्विनात दूध, कार्तिकात द्विदल वर्ज्य करावे."', source: 'Dharmasindhu, Chaturmasya (via kamakoti.org); attribution to Skanda Purana unconfirmed', url: 'https://www.kamakoti.org/kamakoti/dharmasindhu/bookview.php?chapnum=6', verified: true },
      { type: 'shastra', en: '"The Chaturmasyas are healing sacrifices; therefore they are performed at the junctions of seasons, for at the junctions of seasons disease is born."', mr: '"चातुर्मास्ये हे औषधी यज्ञ; म्हणून ते ऋतुसंधीला केले जातात, कारण ऋतुसंधीला व्याधी जन्मतो."', source: 'Gopatha Brahmana 2.1.19 (quoted in a scholarly study)', url: GB, verified: true },
      { type: 'shastra', en: 'Uttarayana is the gods’ day and dakshinayana their night.', mr: 'उत्तरायण देवांचा दिवस आणि दक्षिणायन त्यांची रात्र.', source: 'Manusmriti 1.67', url: 'https://www.wisdomlib.org/hinduism/book/manusmriti-with-the-commentary-of-medhatithi/d/doc145496.html', verified: true },
      { type: 'ritu', en: 'In the rains agni, already weak after summer, is weakened further by rising vapour, rain and the souring of water; food should be light.', mr: 'पावसाळ्यात उन्हाळ्याने आधीच मंद झालेला अग्नी वाफ, पाऊस व पाण्याच्या आंबटपणाने आणखी मंदावतो; आहार हलका असावा.', source: 'Charaka Samhita, Sutrasthana 6.33–35', url: CS6, verified: true },
      { type: 'ritu', en: 'Curd is not to be eaten in Vasanta, Grishma and Sharad; Charaka lists curd among the things to avoid in Sharad.', mr: 'वसंत, ग्रीष्म व शरदात दही खाऊ नये; चरक शरदात वर्ज्य गोष्टींत दही सांगतात.', source: 'Ashtanga Hridaya, Sutrasthana 5.31; Charaka Sutrasthana 6.45', url: CS6, verified: true },
      { type: 'ritu', en: '"Navam dhanyam abhishyandi" — freshly harvested grain clogs the channels; grain a year old is light.', mr: '"नवं धान्यम् अभिष्यन्दि" — नवे धान्य स्रोतसांना अवरोध करते; वर्षभर ठेवलेले हलके.', source: 'Ashtanga Hridaya, Sutrasthana 6.25', url: 'https://easyayurveda.com/2013/02/12/quality-of-foods-astanga-hridaya-sutrasthana-6-annaswaroopa', verified: true },
      { type: 'ritu', en: 'The milk-in-Ashvina rule does not fit Ayurveda: milk is cooling and calms the pitta that flares in Sharad.', mr: 'आश्विनातील दुधाचा नियम आयुर्वेदाशी जुळत नाही: दूध शीतल असून शरदात उफाळणाऱ्या पित्ताला शांत करते.', source: 'Ashtanga Hridaya, Sutrasthana 5.20–21; Charaka 6.42–44', url: CS6, verified: true },
      { type: 'shastra', en: 'The Buddhist rains retreat began because monks wandering in the rains crushed crops and "many small creatures".', mr: 'पावसाळ्यात फिरणारे भिक्षू पिके व "अनेक लहान जीव" तुडवत, म्हणून बौद्ध वर्षावास सुरू झाला.', source: 'Vinaya, Mahavagga III.1.2', url: 'https://www.dhammatalks.org/vinaya/Mv/MvIII.html', verified: true },
      { type: 'sky', en: 'Computed in this app (2000–2050): Devshayani falls with the Sun in sidereal Mithuna or Karka, 1–5 weeks after the June solstice; Prabodhini with the Sun in Tula or Vrishchika.', mr: 'या ॲपमधील गणित (2000–2050): देवशयनीला सूर्य मिथुन/कर्केत, जूनच्या अयनांतानंतर 1–5 आठवड्यांनी; प्रबोधिनीला सूर्य तूळ/वृश्चिकेत.' },
    ],
    myths: [
      { myth: ['"The Chaturmas food rules are pure Ayurveda, planned month by month."', '"चातुर्मासाचे आहारनियम महिनावार ठरवलेला शुद्ध आयुर्वेद."'], verdict: 'partly', why: ['The curd and new-pulse rules match Ayurvedic cautions, but no Ayurvedic text gives this monthly scheme, and the milk rule contradicts it.', 'दही व नव्या कडधान्याचे नियम आयुर्वेदाशी जुळतात, पण ही महिनावार योजना कोणत्याही आयुर्वेदग्रंथात नाही, आणि दुधाचा नियम विरोधी.'] },
      { myth: ['"Since Vishnu sleeps, nothing auspicious can happen."', '"विष्णू झोपलेले असल्याने काहीच शुभ होऊ शकत नाही."'], verdict: 'partly', why: ['Samskaras like weddings wait, but Shravan, Ganeshotsav and Navratri all fall inside Chaturmas.', 'विवाहासारखे संस्कार थांबतात, पण श्रावण, गणेशोत्सव, नवरात्र सगळे चातुर्मासातच.'] },
    ],
    confidence: 'medium',
    confidenceNote: ['the Vedic and Ayurvedic texts are verified; matching each food rule to Ayurveda is mixed — two fit well, one partly, one not', 'वैदिक व आयुर्वेद ग्रंथ पडताळलेले; आहारनियमांची आयुर्वेदाशी जुळणी संमिश्र — दोन चांगली, एक अंशतः, एक नाही'],
    sky: [
      { label: ['Chaturmas this year — Devshayani to Prabodhini', 'या वर्षीचा चातुर्मास — देवशयनी ते प्रबोधिनी'], defId: 'ekadashi-devshayani', view: 'geo' },
    ],
    sources: [
      { title: 'Charaka Samhita, Sutrasthana 6 — carakasamhitaonline', url: CS6 },
      { title: 'Caturmasya sacrifices — a ritualistic study (wisdomlib)', url: GB },
      { title: 'Essence of Dharmasindhu, Chaturmasya — kamakoti.org', url: 'https://www.kamakoti.org/kamakoti/dharmasindhu/bookview.php?chapnum=6' },
      { title: 'Vinaya, Mahavagga III — dhammatalks', url: 'https://www.dhammatalks.org/vinaya/Mv/MvIII.html' },
    ],
  },
  {
    id: 'two-navratris',
    q: 7,
    theme: 'season',
    festivals: ['sharad-navratri', 'ghatasthapana', 'chaitra-navratri', 'gudi-padwa', 'dussehra', 'ram-navami'],
    title: ['Why are there two Navratris — Chaitra and Sharad — near the two equinoxes?', 'चैत्र व शारदीय — दोन नवरात्रे, दोन संपातांजवळच का?'],
    short: ['The Devi Bhagavata gives the reason outright: spring and autumn are "Yama’s teeth" — the seasons of disease. Ayurveda names exactly these two seasons for purification.', 'देवीभागवत कारण थेट सांगते: वसंत व शरद या "यमदंष्ट्रा" — रोगांचे ऋतू. आयुर्वेदही नेमके हेच दोन ऋतू शुद्धीसाठी सांगतो.'],
    story: [
      `Twice a year the ghata is installed and the akhand diya burns for nine nights — once in Chaitra, at Gudi Padwa, and once in Ashwin, for Sharad Navratri. Why twice, and why then?

The Devi Bhagavata answers in plain words. Vyasa tells King Janamejaya that the two seasons, autumn and spring, "are famous as the teeth of Yama" — hard for people to cross, when terrible diseases afflict them and many die. So in those two seasons, he says, worship the Mother with devotion. The Navratris are not placed by chance: they guard the two most dangerous doors of the year.

Ayurveda says the same in its own language. Sushruta and Charaka single out Vasanta and Sharad as the two great flare-up seasons. In spring the kapha stored all winter is melted by the Sun and dims our digestion, so emesis (vamana) is advised; in autumn the pitta built up in the rains flares, so purgation (virechana) is advised. And the sky? Both Navratris sit near the equinoxes, when the length of the day changes fastest — the kind of sudden turn that Charaka warns brings disease. Nine nights of fasting, light food, discipline and devotion at precisely those doors — the Mother as the guardian of the season-gates.`,
      `वर्षातून दोनदा घटस्थापना होते आणि नऊ रात्री अखंड दीप तेवतो — एकदा चैत्रात, गुढीपाडव्याला, आणि एकदा आश्विनात, शारदीय नवरात्रासाठी. दोनदाच का, आणि तेव्हाच का?

देवीभागवत साध्या शब्दांत उत्तर देते. व्यास जनमेजय राजाला सांगतात, शरद व वसंत हे दोन ऋतू "यमदंष्ट्रा म्हणून प्रसिद्ध" — लोकांना पार करायला कठीण, जेव्हा भयंकर रोग पीडा देतात आणि अनेक मरण पावतात. म्हणून त्या दोन ऋतूंत भक्तीने देवीची उपासना करावी. नवरात्रे योगायोगाने ठरलेली नाहीत: ती वर्षातील दोन सर्वात धोकादायक दारांचे रक्षण करतात.

आयुर्वेद हेच आपल्या भाषेत सांगतो. सुश्रुत व चरक वसंत व शरद हे दोषप्रकोपाचे दोन मोठे ऋतू म्हणून वेगळे सांगतात. वसंतात हिवाळ्यात साचलेला कफ सूर्याने वितळून पचन मंदावतो, म्हणून वमन सांगितले आहे; शरदात पावसाळ्यात साचलेले पित्त उफाळते, म्हणून विरेचन. आणि आकाश? दोन्ही नवरात्रे संपातांजवळ असतात, जेव्हा दिवसाची लांबी सर्वात वेगाने बदलते — चरक ज्या अचानक बदलाने रोग येतो असे सांगतात तसाच बदल. नेमक्या त्या दारांवर नऊ रात्री उपवास, हलका आहार, संयम व भक्ती — ऋतुद्वारांची रक्षणकर्ती आदिमाता.`,
    ],
    eureka: [
      'The two Navratris are the devotional form of an old medical calendar: their months open the two prakopa seasons Ayurveda singles out for purification — Vasanta (kapha, vamana) and Sharad (pitta, virechana) — and the Devi Bhagavata itself calls them "Yama’s teeth". In this app, Ghatasthapana falls with the tropical Sun at 176°–205° and Gudi Padwa at about −5° to +24° — both within weeks of an equinox, where day length changes fastest.',
      'दोन नवरात्रे ही जुन्या वैद्यकीय कालगणनेची भक्तिरूप आवृत्ती: त्यांचे महिने आयुर्वेदाने शुद्धीसाठी सांगितलेल्या दोन प्रकोप-ऋतूंची सुरुवात — वसंत (कफ, वमन) व शरद (पित्त, विरेचन) — आणि देवीभागवत स्वतः त्यांना "यमदंष्ट्रा" म्हणते. या ॲपनुसार घटस्थापनेला सायन सूर्य 176°–205° वर आणि गुढीपाडव्याला सुमारे −5° ते +24° वर — दोन्ही संपातापासून काही आठवड्यांच्या आत, जेव्हा दिनमान सर्वात वेगाने बदलते.',
    ],
    evidence: [
      { type: 'shastra', en: 'Autumn and spring "are famous as the teeth of Yama", very hard to cross; terrible diseases afflict people then, so the Mother should be worshipped in these two seasons.', mr: 'शरद व वसंत "यमदंष्ट्रा म्हणून प्रसिद्ध", पार करायला अत्यंत कठीण; तेव्हा भयंकर रोग पीडा देतात, म्हणून या दोन ऋतूंत देवीची उपासना करावी.', source: 'Devi Bhagavata Purana 3.26.3–8 (tr. Vijnanananda)', url: 'https://www.wisdomlib.org/hinduism/book/devi-bhagavata-purana/d/doc57159.html', verified: true },
      { type: 'shastra', en: 'The Goddess promises deliverance to whoever hears her glory "at the great annual worship performed in autumn".', mr: '"शरद ऋतूतील महापूजेत" जो देवीमाहात्म्य ऐकतो त्याला सर्व संकटांतून मुक्तीचे देवीचे वचन.', source: 'Markandeya Purana XCII (Devi Mahatmya ch. 12)', url: 'https://www.wisdomlib.org/hinduism/book/the-markandeya-purana/d/doc117173.html', verified: true },
      { type: 'ritu', en: 'In Vasanta, kapha stored in winter is melted by the Sun and weakens agni — vamana is advised; in Sharad, pitta flares — virechana is advised.', mr: 'वसंतात हिवाळ्यात साचलेला कफ सूर्याने वितळून अग्नी मंद करतो — वमन; शरदात पित्त उफाळते — विरेचन.', source: 'Charaka Samhita, Sutrasthana 6.22–23, 6.41–44', url: CS6, verified: true },
      { type: 'ritu', en: 'The doshas aggravated in autumn and spring should be checked at once — these are the two great flare-up seasons.', mr: 'शरद व वसंतात प्रकुपित होणारे दोष लगेच नियंत्रित करावे — हे दोन मोठे प्रकोप-ऋतू.', source: 'Sushruta Samhita, Sutrasthana 6', url: 'https://en.wikisource.org/wiki/Sushruta_Samhita,_Volume_1/Chapter_6', verified: true },
      { type: 'ritu', en: 'Ritu-sandhi: the last seven days of one season and the first seven of the next; change the regimen gradually, for sudden change brings disease.', mr: 'ऋतुसंधी: एका ऋतूचे शेवटचे सात व पुढच्याचे पहिले सात दिवस; दिनचर्या हळूहळू बदलावी, कारण अचानक बदलाने रोग होतात.', source: 'Ashtanga Hridaya, Sutrasthana 3.58; Charaka Sutrasthana 7.36–38', url: AH3, verified: true },
      { type: 'shastra', en: 'The Vedic seasonal offerings are "healing sacrifices" at the ritu-sandhis, the first of them at the Phalguna or Chaitra full moon.', mr: 'वैदिक ऋतुयज्ञ हे ऋतुसंधीचे "औषधी यज्ञ", पहिला फाल्गुन किंवा चैत्र पौर्णिमेला.', source: 'Gopatha Brahmana 2.1.19', url: GB, verified: true },
      { type: 'shastra', en: 'Sharngadhara uses "Yama-damshtra" for a narrower 16-day window at the end of Kartika — a different sense from the Devi Bhagavata.', mr: 'शार्ङ्गधर "यमदंष्ट्रा" हा शब्द कार्तिकाच्या शेवटच्या 16 दिवसांसाठी वापरतात — देवीभागवताहून वेगळा अर्थ.', source: 'Sharngadhara Samhita, Purva 2/30 (as cited)', url: 'https://www.carakasamhitaonline.com/index.php/Yamadamshtra', verified: false },
      { type: 'sky', en: 'Computed in this app (2000–2050): Ghatasthapana with the tropical Sun at 176°–205° (around the September equinox), Gudi Padwa within about a month of the March equinox.', mr: 'या ॲपमधील गणित (2000–2050): घटस्थापनेला सायन सूर्य 176°–205° (सप्टेंबर संपाताजवळ), गुढीपाडवा मार्च संपातापासून सुमारे महिनाभराच्या आत.' },
      { type: 'interpretation', en: 'Sowing grain beside the ghata and watching it sprout by Dashami works like a germination check just before rabi sowing.', mr: 'घटाशेजारी धान्य पेरून दशमीपर्यंत अंकुर पाहणे म्हणजे रब्बी पेरणीपूर्वीची बीज-उगवण तपासणीच.' },
    ],
    myths: [
      { myth: ['"Navratri falls exactly on the equinox."', '"नवरात्र नेमके संपाताच्या दिवशी."'], verdict: 'does not hold', why: ['It follows the lunar month, so it starts within a few weeks of the equinox, not on it.', 'ते चांद्रमासाप्रमाणे चालते, म्हणून संपाताच्या काही आठवड्यांच्या आत सुरू होते, नेमक्या दिवशी नाही.'] },
      { myth: ['"The nine-day fast was designed as a detox."', '"नऊ दिवसांचा उपवास शुद्धीकरणासाठीच रचला."'], verdict: 'partly', why: ['The seasonal-cleansing logic is real in Ayurveda, and the Devi Bhagavata gives disease as the reason — but the vow itself is devotional.', 'ऋतुशुद्धीचा तर्क आयुर्वेदात खरा आहे, आणि देवीभागवत रोग हेच कारण सांगते — पण व्रत स्वतः भक्तीचे.'] },
    ],
    confidence: 'high',
    sky: [
      { label: ['Ghatasthapana — the Sun just past the autumn equinox', 'घटस्थापना — सूर्य शरद संपाताच्या पलीकडे'], defId: 'ghatasthapana', view: 'geo' },
      { label: ['Gudi Padwa — the spring equinox season', 'गुढीपाडवा — वसंत संपाताचा काळ'], defId: 'gudi-padwa', view: 'geo' },
    ],
    sources: [
      { title: 'Devi Bhagavata Purana 3.26 — wisdomlib', url: 'https://www.wisdomlib.org/hinduism/book/devi-bhagavata-purana/d/doc57159.html' },
      { title: 'Markandeya Purana XCII (Devi Mahatmya) — wisdomlib', url: 'https://www.wisdomlib.org/hinduism/book/the-markandeya-purana/d/doc117173.html' },
      { title: 'Charaka Samhita, Sutrasthana 6 — carakasamhitaonline', url: CS6 },
      { title: 'Sushruta Samhita, Sutrasthana 6 — Wikisource', url: 'https://en.wikisource.org/wiki/Sushruta_Samhita,_Volume_1/Chapter_6' },
    ],
  },
  {
    id: 'holi-bonfire',
    q: 8,
    theme: 'season',
    festivals: ['holika-dahan', 'holi', 'rang-panchami', 'holashtak'],
    title: ['Why is Holi a bonfire on Phalguna Purnima, at the end of winter?', 'हिवाळ्याच्या शेवटी फाल्गुन पौर्णिमेला होळी का पेटवतात?'],
    short: ['It is the year-end fire of an old spring calendar, lit at the very moment Ayurveda says the winter’s kapha starts to melt — and the full Moon sits in the Phalguni stars.', 'ही जुन्या वसंत-कालगणनेची वर्षअखेरची अग्नी, जी नेमकी आयुर्वेद सांगतो त्या क्षणी पेटते — जेव्हा हिवाळ्यातील कफ वितळू लागतो — आणि पूर्ण चंद्र फाल्गुनी नक्षत्रांत असतो.'],
    story: [
      `In every wada and colony the children collect dry wood, cow-dung cakes and the leftover litter of winter, and on Phalguna Purnima night the Holi is lit and puran poli is offered into the flames. Everyone knows the story of Prahlada, safe in the fire, and his aunt Holika, burnt despite her boon.

But the fire is older than that story. "Holaka", in old dietetic texts, means half-ripe grain roasted in the flame — the green chickpeas and wheat ears of the new rabi crop. The Phalguna full Moon was once the edge of the year: the Vedic seasonal sacrifices began here, the Taittiriya texts call the Phalguni full Moon "the mouth of the year", and in the North Indian calendar Chaitra still begins the very next day. So Holika Dahan is the last night of the old year — and we burn the old year's leftovers.

Ayurveda adds the season's medicine. Charaka says that in Vasanta the kapha that piled up through the cold months is melted by the Sun and dims the digestion. Vagbhata's spring advice reads almost like Holi itself: exercise, rubbing the body with dry powders, then a fragrant bath and time spent in flowering gardens. And the sky marks the date precisely: the Sun stands at the boundary of Kumbha and Meena — the end of winter — and the full Moon opposite it in Purva or Uttara Phalguni, the stars that give the month its name.`,
      `प्रत्येक वाड्यात, वस्तीत मुले सुकी लाकडे, गोवऱ्या आणि हिवाळ्यातील उरलेला कचरा गोळा करतात, आणि फाल्गुन पौर्णिमेच्या रात्री होळी पेटते, ज्वालांत पुरणपोळी अर्पण होते. अग्नीत सुखरूप राहिलेला प्रल्हाद आणि वर असूनही जळलेली त्याची आत्या होलिका — ही कथा सर्वांना माहीत आहे.

पण अग्नी त्या कथेपेक्षा जुना आहे. जुन्या आहारग्रंथांत "होलक" म्हणजे ज्वालेत भाजलेले अर्धवट पिकलेले धान्य — नव्या रब्बी पिकाचे हरभरे व गव्हाच्या लोंब्या. फाल्गुन पौर्णिमा एके काळी वर्षाची सीमा होती: वैदिक ऋतुयज्ञ इथेच सुरू होत, तैत्तिरीय ग्रंथ फाल्गुनी पौर्णिमेला "वर्षाचे मुख" म्हणतात, आणि उत्तर भारतीय पंचांगात चैत्र आजही दुसऱ्याच दिवशी सुरू होतो. म्हणजे होलिका दहन ही जुन्या वर्षाची शेवटची रात्र — आणि आपण जुन्या वर्षाचे उरलेले जाळतो.

आयुर्वेद ऋतूचे औषध जोडतो. चरक म्हणतात, वसंतात थंडीच्या महिन्यांत साचलेला कफ सूर्याने वितळून पचन मंदावतो. वाग्भटांचा वसंतातील सल्ला तर जवळजवळ होळीच वाटतो: व्यायाम, कोरड्या चूर्णाने उद्वर्तन, मग सुगंधी स्नान आणि फुललेल्या बागांत वेळ घालवणे. आणि आकाश तारीख अचूक ठरवते: सूर्य कुंभ-मीनेच्या सीमेवर — हिवाळ्याचा शेवट — आणि समोर पूर्ण चंद्र पूर्वा किंवा उत्तरा फाल्गुनीत — ज्यांच्यावरून महिन्याचे नाव.`,
    ],
    eureka: [
      'Holi is the year-end bonfire of an old spring calendar, burning at the Ayurvedic kapha turning point. In this app (2000–2050) Holika Dahan always has the Sun in Kumbha or Meena — the solar end of winter — and the full Moon opposite in Simha/Kanya, in the Magha and Phalguni stars that name the month. In the purnimanta calendar Chaitra begins the next day: Holika Dahan is literally the year’s last night.',
      'होळी ही जुन्या वसंत-कालगणनेची वर्षअखेरची अग्नी, आयुर्वेदातील कफाच्या वळणबिंदूवर पेटणारी. या ॲपनुसार (2000–2050) होलिका दहनाला सूर्य नेहमी कुंभ किंवा मीनेत — हिवाळ्याचा सौर शेवट — आणि समोर पूर्ण चंद्र सिंह/कन्येत, महिन्याला नाव देणाऱ्या मघा व फाल्गुनी नक्षत्रांत. पौर्णिमान्त पंचांगात दुसऱ्या दिवशी चैत्र सुरू होतो: होलिका दहन ही अक्षरशः वर्षाची शेवटची रात्र.',
    ],
    evidence: [
      { type: 'ritu', en: 'In Vasanta the kapha accumulated in winter is melted by the Sun’s rays, upsets agni and causes many diseases; vamana and light food are advised.', mr: 'वसंतात हिवाळ्यात साचलेला कफ सूर्यकिरणांनी वितळून अग्नी बिघडवतो व अनेक रोग करतो; वमन व हलका आहार सांगितला आहे.', source: 'Charaka Samhita, Sutrasthana 6.22–23', url: CS6, verified: true },
      { type: 'ritu', en: 'Spring regimen: exercise, dry-powder massage (udvartana), then a bath, sandal and saffron, and time in flowering gardens.', mr: 'वसंतातील दिनचर्या: व्यायाम, कोरड्या चूर्णाने उद्वर्तन, मग स्नान, चंदन-केशर, आणि फुललेल्या उद्यानांत वेळ.', source: 'Ashtanga Hridaya, Sutrasthana 3.18–25', url: AH3, verified: true },
      { type: 'shastra', en: '"Holaka" means half-ripened grain or pulse roasted, and is also the name of the spring festival before the Phalguna full Moon.', mr: '"होलक" म्हणजे भाजलेले अर्धवट पिकलेले धान्य/कडधान्य, आणि फाल्गुन पौर्णिमेपूर्वीच्या वसंतोत्सवाचे नावही.', source: 'Bhojanakutuhala; Sanskrit lexica (via wisdomlib)', url: 'https://www.wisdomlib.org/definition/holaka', verified: true },
      { type: 'shastra', en: 'The Vedic seasonal sacrifices begin with Vaishvadeva at the Phalguna (or Chaitra) full Moon; Taittiriya texts call the Phalguni full Moon the "mouth of the year".', mr: 'वैदिक ऋतुयज्ञांची सुरुवात फाल्गुन (किंवा चैत्र) पौर्णिमेच्या वैश्वदेवाने; तैत्तिरीय ग्रंथ फाल्गुनी पौर्णिमेला "वर्षाचे मुख" म्हणतात.', source: 'Caturmasya study; Taittiriya Samhita 7.4.8 (via Tilak)', url: GB, verified: false },
      { type: 'shastra', en: 'Holaka is discussed in Jaimini’s Purva Mimamsa (the "Holakadhikarana") as a regional observance that still carries authority.', mr: 'जैमिनींच्या पूर्वमीमांसेत (होलाकाधिकरण) होलकाचा प्रादेशिक पण प्रमाण आचार म्हणून विचार केला आहे.', source: 'Purva Mimamsa Sutras 1.3.15–23 (as cited)', url: 'https://www.hindupedia.com/en/Holi,_Holik%C4%81', verified: false },
      { type: 'shastra', en: 'The Prahlada–Holika story is the best-known later meaning of the fire.', mr: 'प्रल्हाद-होलिका कथा हा अग्नीचा सर्वात प्रसिद्ध, नंतरचा अर्थ.', source: 'Holika Dahan (traditions summarised)', url: 'https://en.wikipedia.org/wiki/Holika_Dahan', verified: false },
      { type: 'sky', en: 'Computed in this app (2000–2050): on Holika Dahan the Sun is in Kumbha (27 years) or Meena (24), and the full Moon in Simha or Kanya — Magha and the Phalgunis.', mr: 'या ॲपमधील गणित (2000–2050): होलिका दहनाला सूर्य कुंभ (27 वर्षे) किंवा मीनेत (24), आणि पूर्ण चंद्र सिंह/कन्येत — मघा व फाल्गुनी.' },
      { type: 'interpretation', en: 'Burning the dry litter of winter at the Shishira–Vasanta junction is practical spring-cleaning, and roasting the half-ripe rabi grain is a first-fruits rite.', mr: 'शिशिर-वसंताच्या संधीवर हिवाळ्यातील सुका कचरा जाळणे म्हणजे व्यावहारिक वसंत-स्वच्छता, आणि अर्धवट पिकलेले रब्बी धान्य भाजणे हा नवान्नाचा विधी.' },
    ],
    myths: [
      { myth: ['"The Holi fire disinfects the air of winter germs."', '"होळीचा अग्नी हवेतील हिवाळी जंतू नष्ट करतो."'], verdict: 'does not hold', why: ['No measurable disinfection happens; large fires mostly add smoke. The seasonal Ayurvedic logic stands on its own.', 'मोजता येईल असे निर्जंतुकीकरण होत नाही; मोठे अग्नी मुख्यतः धूर वाढवतात. आयुर्वेदाचा ऋतुविचार स्वतंत्रपणे टिकतो.'] },
      { myth: ['"Holi was always about Prahlada."', '"होळी नेहमीच प्रल्हादाची होती."'], verdict: 'does not hold', why: ['Early references (Holaka, Vasantotsava, Madanotsava) show a spring and full-moon rite; the Prahlada link came later.', 'सुरुवातीचे उल्लेख (होलक, वसंतोत्सव, मदनोत्सव) वसंत व पौर्णिमेचा विधी दाखवतात; प्रल्हादाचा संबंध नंतरचा.'] },
    ],
    confidence: 'medium',
    confidenceNote: ['Ayurveda and the sky are verified; some Vedic year-boundary passages were seen only through secondary sources', 'आयुर्वेद व आकाश पडताळलेले; वर्षसीमेचे काही वैदिक उतारे फक्त दुय्यम स्रोतांतून पाहिले'],
    sky: [
      { label: ['Holika Dahan — the full Moon in the Phalgunis', 'होलिका दहन — फाल्गुनीतील पूर्ण चंद्र'], defId: 'holika-dahan', view: 'sky' },
    ],
    sources: [
      { title: 'Charaka Samhita, Sutrasthana 6 — carakasamhitaonline', url: CS6 },
      { title: 'Ashtanga Hridaya, Sutrasthana 3 (ritucharya)', url: AH3 },
      { title: 'Holaka — dictionary entries (wisdomlib)', url: 'https://www.wisdomlib.org/definition/holaka' },
      { title: 'Holi, Holika — Hindupedia', url: 'https://www.hindupedia.com/en/Holi,_Holik%C4%81' },
    ],
  },
  {
    id: 'shravan',
    q: 12,
    theme: 'season',
    festivals: ['shravani-somvar', 'mangala-gaur', 'narali-purnima', 'nag-panchami', 'raksha-bandhan'],
    title: ['Why is Shravan a month of fasting and of avoiding fish and meat?', 'श्रावण हा उपवासाचा आणि मासे-मांस टाळण्याचा महिना का?'],
    short: ['Surprise: Charaka does not ban meat in the rains. The fish taboo follows the monsoon’s breeding pause — and the Koli fishermen reopen the sea on Narali Purnima, the full Moon of Shravan.', 'आश्चर्य: चरक पावसाळ्यात मांस निषिद्ध मानत नाहीत. मासे टाळण्याची प्रथा पावसाळ्यातील प्रजननकाळाशी जुळते — आणि कोळी बांधव श्रावणी पौर्णिमेला, नारळी पौर्णिमेला, समुद्र पुन्हा उघडतात.'],
    story: [
      `"It's Shravan — no fish, no meat," says every Maharashtrian household, even ones that love their bangda and surmai. Mondays become fasts for Shiva, Tuesdays bring the Mangala Gaur games of new brides, and the whole month is green, wet and devotional.

People often say Ayurveda forbids meat in the rains. Let us check. Charaka does say that in the monsoon our digestive fire is weak and food should be light and warm. But he actually recommends soups of dry-land meat in the rains, for strength! What he forbids is the meat of water and marsh animals — and that in Sharad, the following season. So the Shravan taboo does not come from Charaka's monsoon chapter.

Then where does it come from? Go to the coast. The monsoon is the breeding season of fish, and the seas are rough; Maharashtra's fishing boats are banned from 1 June to 31 July. And who reopens the sea? The Koli fishermen, on Narali Purnima — the full Moon of Shravan — when they offer coconuts to Varuna, repaint their boats and set out again. The Mahabharata adds that one who gives up meat for the four rainy months gains long life and strength. So Shravan's abstinence is a devotional discipline fitted to the monsoon's real rhythm: weak digestion, breeding fish, and a sea that must rest.`,
      `"श्रावण आहे — मासे नाही, मटण नाही," असे बांगडा-सुरमई आवडणारी घरेसुद्धा म्हणतात. सोमवार शिवाचे उपवास होतात, मंगळवारी नववधूंचे मंगळागौरीचे खेळ रंगतात, आणि संपूर्ण महिना हिरवा, ओला आणि भक्तिमय असतो.

लोक नेहमी म्हणतात, आयुर्वेद पावसाळ्यात मांस निषिद्ध मानतो. चला तपासू. चरक म्हणतात की पावसाळ्यात आपला अग्नी मंद असतो आणि आहार हलका व उष्ण असावा. पण ते तर पावसाळ्यात बळासाठी जांगल (कोरड्या प्रदेशातील) मांसाचे सूप सांगतात! ते निषिद्ध मानतात ते जलचर व आनूप प्राण्यांचे मांस — आणि तेही पुढच्या शरद ऋतूत. म्हणजे श्रावणातील निषेध चरकांच्या पावसाळ्याच्या अध्यायातून येत नाही.

मग कुठून येतो? किनाऱ्यावर चला. पावसाळा हा माशांच्या प्रजननाचा काळ, आणि समुद्र खवळलेला; महाराष्ट्रात 1 जून ते 31 जुलै मासेमारी बोटींना बंदी असते. आणि समुद्र पुन्हा कोण उघडतो? कोळी बांधव, नारळी पौर्णिमेला — श्रावणाच्या पौर्णिमेला — जेव्हा ते वरुणाला नारळ अर्पण करतात, होड्या रंगवतात आणि पुन्हा समुद्रात जातात. महाभारत सांगते, पावसाळ्याचे चार महिने मांस सोडणाऱ्याला दीर्घायुष्य व बळ मिळते. म्हणजे श्रावणातील संयम ही पावसाळ्याच्या खऱ्या लयीशी जुळवलेली भक्तीची शिस्त: मंद पचन, प्रजनन करणारे मासे, आणि विश्रांती हवी असलेला समुद्र.`,
    ],
    eureka: [
      'The Shravan fish-and-meat taboo does not come from Charaka’s monsoon chapter — which actually recommends dry-land meat soups in the rains. It lines up with the coast’s biology: fish breed with the monsoon, the west-coast trawl ban runs 1 June – 31 July, and Maharashtra’s Koli fishermen reopen the sea on Narali Purnima, the very full Moon that gives Shravan its name.',
      'श्रावणातील मासे-मांस निषेध चरकांच्या पावसाळ्याच्या अध्यायातून येत नाही — ते तर पावसाळ्यात जांगल मांसाचे सूप सांगतात. तो किनाऱ्याच्या जीवशास्त्राशी जुळतो: पावसाळ्यात मासे प्रजनन करतात, पश्चिम किनाऱ्यावरील मासेमारी बंदी 1 जून – 31 जुलै असते, आणि महाराष्ट्रातील कोळी बांधव नारळी पौर्णिमेला — श्रावणाला नाव देणाऱ्या पौर्णिमेलाच — समुद्र पुन्हा उघडतात.',
    ],
    evidence: [
      { type: 'ritu', en: 'In the rains agni is weak and all three doshas are disturbed; food should be light, warm and easy to digest.', mr: 'पावसाळ्यात अग्नी मंद व तिन्ही दोष बिघडलेले; आहार हलका, उष्ण व पचायला सोपा असावा.', source: 'Charaka Samhita, Sutrasthana 6.33–35', url: CS6, verified: true },
      { type: 'ritu', en: 'Charaka includes soups of jangala (dry-land) meat among foods suited to the rains; the meat of aquatic and marsh animals is forbidden in Sharad, not Varsha.', mr: 'चरक पावसाळ्याला अनुकूल आहारात जांगल मांसाचे सूप सांगतात; जलचर व आनूप मांस शरदात निषिद्ध, पावसाळ्यात नव्हे.', source: 'Charaka Samhita, Sutrasthana 6.35–36, 6.45', url: CS6, verified: true },
      { type: 'shastra', en: 'Ekabhukta or nakta vratas in Shravana, with abhisheka of Shiva and Vishnu; Upakarma on Shravana Purnima.', mr: 'श्रावणात एकभुक्त किंवा नक्त व्रते, शिव-विष्णूंचा अभिषेक; श्रावणी पौर्णिमेला उपाकर्म.', source: 'Dharmasindhu (via kamakoti.org)', url: 'https://www.kamakoti.org/kamakoti/dharmasindhu/bookview.php?chapnum=6', verified: true },
      { type: 'shastra', en: 'One who abstains from meat for the four months of the rains gains achievement, long life, fame and strength.', mr: 'पावसाळ्याचे चार महिने मांस टाळणाऱ्याला सिद्धी, दीर्घायुष्य, कीर्ती व बळ मिळते.', source: 'Mahabharata, Anushasana Parva CXV (Ganguli)', url: 'https://sacred-texts.com/hin/m13/m13b080.htm', verified: false },
      { type: 'shastra', en: 'After Upakarma on the Shravana full Moon, Vedic study is pursued for four and a half months.', mr: 'श्रावणी पौर्णिमेला उपाकर्म करून साडेचार महिने वेदाध्ययन करावे.', source: 'Manusmriti 4.95', url: 'https://www.wisdomlib.org/hinduism/book/manusmriti-with-the-commentary-of-medhatithi/d/doc200200.html', verified: true },
      { type: 'interpretation', en: 'Maharashtra bans mechanised fishing from 1 June to 31 July (sometimes extended to 15 August) to protect breeding stocks and keep boats off rough seas.', mr: 'प्रजनन करणाऱ्या माशांच्या रक्षणासाठी व खवळलेल्या समुद्रामुळे महाराष्ट्रात 1 जून ते 31 जुलै (कधी 15 ऑगस्टपर्यंत) यांत्रिक मासेमारीवर बंदी.', source: 'Maharashtra Marine Fishing Regulation Act 1981 (news reports)', url: 'https://icsf.net/newss/maharashtra-mechanized-boats-not-allowed-to-go-fishing-from-june-1-july-31/', verified: true },
      { type: 'interpretation', en: 'On Narali Purnima the Koli communities offer coconuts to the sea and begin the new fishing season.', mr: 'नारळी पौर्णिमेला कोळी समाज समुद्राला नारळ अर्पण करून नवा मासेमारी हंगाम सुरू करतो.', source: 'Jio Institute exhibit on Narali Purnima', url: 'https://exhibits.jioinstitute.edu.in/spotlight/the-koli-festival-of-narali-purnima', verified: true },
    ],
    myths: [
      { myth: ['"Ayurveda forbids meat in the monsoon."', '"आयुर्वेद पावसाळ्यात मांस निषिद्ध मानतो."'], verdict: 'does not hold', why: ['Charaka recommends dry-land meat soups in the rains; he forbids aquatic and marsh meat in Sharad.', 'चरक पावसाळ्यात जांगल मांसाचे सूप सांगतात; जलचर व आनूप मांस शरदात निषिद्ध.'] },
      { myth: ['"We avoid fish in Shravan because it is their breeding season."', '"श्रावणात मासे टाळतो कारण तो त्यांचा प्रजननकाळ."'], verdict: 'partly', why: ['The breeding pause is real, but it peaks in June–July, mostly before Shravan; the texts give devotional reasons.', 'प्रजननकाळ खरा, पण तो मुख्यतः जून–जुलैमध्ये, श्रावणापूर्वी; ग्रंथ भक्तीची कारणे देतात.'] },
    ],
    confidence: 'medium',
    sky: [
      { label: ['Narali Purnima — the full Moon of Shravan', 'नारळी पौर्णिमा — श्रावणाची पौर्णिमा'], defId: 'narali-purnima', view: 'sky' },
    ],
    sources: [
      { title: 'Charaka Samhita, Sutrasthana 6 — carakasamhitaonline', url: CS6 },
      { title: 'Manusmriti 4.95 — wisdomlib', url: 'https://www.wisdomlib.org/hinduism/book/manusmriti-with-the-commentary-of-medhatithi/d/doc200200.html' },
      { title: 'Maharashtra monsoon fishing ban — ICSF', url: 'https://icsf.net/newss/maharashtra-mechanized-boats-not-allowed-to-go-fishing-from-june-1-july-31/' },
      { title: 'The Koli Festival of Narali Purnima — Jio Institute', url: 'https://exhibits.jioinstitute.edu.in/spotlight/the-koli-festival-of-narali-purnima' },
    ],
  },
  {
    id: 'akshaya-tritiya',
    q: 14,
    theme: 'season',
    festivals: ['akshaya-tritiya'],
    title: ['Why is Akshaya Tritiya called "never-diminishing"?', 'अक्षय्य तृतीयेला "कधीही क्षय न पावणारी" का म्हणतात?'],
    short: ['Because both great lights are at their strongest: the Sun exalted in Mesha and the Moon exalted in Vrishabha — and the calendar builds this in. What it praises is giving, not buying gold.', 'कारण दोन्ही महान ज्योती सर्वाधिक बलवान: सूर्य मेषेत उच्च आणि चंद्र वृषभेत उच्च — आणि पंचांगच हे घडवते. ती स्तुती दानाची आहे, सोनेखरेदीची नाही.'],
    story: [
      `Akshaya Tritiya is one of the "sade-teen muhurtas" — the three and a half days so auspicious that no muhurat needs to be looked up. Shops advertise gold; but grandmother fills a matka with water and gives it away, with a fan and some fruit, in the heat of Vaishakha.

The Matsya Purana explains the name: whatever is given, offered or recited on this Tritiya becomes akshaya — imperishable. The Vishnu Purana counts it among the four yugadi tithis, anniversaries of the beginning of a yuga. For Jains it is the day Rishabhadeva broke his year-long fast with sugar-cane juice — the first act of dana. Everywhere, the day is about giving.

And the sky shows why it feels so full. Vaishakha, by definition, has the Sun in Mesha — its sign of exaltation. On the third day of the bright half, the Moon has moved 24 to 36 degrees ahead of the Sun — which carries it into Vrishabha, the Moon's own exaltation. The two exaltation points (the Sun's at 10° Mesha, the Moon's at 3° Vrishabha) are 23 degrees apart — almost exactly where the third tithi begins. Both lights of the sky stand at their very strongest together. This app finds them both exalted at the festival in 42 of 51 years. And the season fits too: at the start of summer, Charaka advises cool, sweet drinks — exactly the water, buttermilk and fruit we give away.`,
      `अक्षय्य तृतीया साडेतीन मुहूर्तांपैकी एक — इतके शुभ दिवस की मुहूर्त पाहण्याची गरजच नसते. दुकाने सोन्याच्या जाहिराती करतात; पण आजी वैशाखाच्या उन्हात पाण्याने भरलेला माठ, पंखा आणि फळे दान करते.

मत्स्य पुराण नावाचे कारण सांगते: या तृतीयेला जे दिले, अर्पण केले किंवा जपले ते अक्षय — कधीही नष्ट न होणारे — होते. विष्णुपुराण तिला चार युगादी तिथींपैकी एक मानते — युगारंभाचा वाढदिवस. जैनांसाठी हा ऋषभदेवांनी उसाच्या रसाने वर्षभराचा उपवास सोडल्याचा दिवस — दानाचे पहिले कृत्य. सर्वत्र हा दिवस देण्याचा आहे.

आणि आकाश दाखवते की तो इतका परिपूर्ण का वाटतो. वैशाख म्हणजेच सूर्य मेषेत — त्याच्या उच्च राशीत. शुद्ध पक्षाच्या तिसऱ्या दिवशी चंद्र सूर्याच्या 24 ते 36 अंश पुढे गेलेला असतो — म्हणजे वृषभेत, चंद्राच्या स्वतःच्या उच्च राशीत. दोन उच्चबिंदू (सूर्याचा मेष 10°, चंद्राचा वृषभ 3°) 23 अंशांवर आहेत — जवळजवळ नेमके तृतीया सुरू होते तिथे. आकाशातील दोन्ही ज्योती एकाच वेळी सर्वाधिक बलवान. हे ॲप 51 पैकी 42 वर्षांत उत्सवाला दोघेही उच्च असल्याचे दाखवते. आणि ऋतूही जुळतो: उन्हाळ्याच्या सुरुवातीला चरक थंड, गोड पेये सांगतात — नेमके आपण दान करतो ते पाणी, ताक आणि फळे.`,
    ],
    eureka: [
      '"Both luminaries exalted" is built into the calendar: Vaishakha means the Sun is in Mesha, and on Shukla Tritiya the Moon is 24°–36° ahead — in Vrishabha. The two exaltation points (Sun 10° Mesha, Moon 3° Vrishabha) are 23° apart, almost exactly where Tritiya begins. Computed in this app: both are exalted at the festival in 42 of 51 years (2000–2050).',
      '"दोन्ही ज्योती उच्च" हे पंचांगातच अंगभूत: वैशाख म्हणजे सूर्य मेषेत, आणि शुद्ध तृतीयेला चंद्र 24°–36° पुढे — वृषभेत. दोन उच्चबिंदू (सूर्य मेष 10°, चंद्र वृषभ 3°) 23° अंतरावर — जवळजवळ नेमके तृतीया सुरू होते तिथे. या ॲपचे गणित: 2000–2050 मधील 51 पैकी 42 वर्षांत उत्सवाला दोघेही उच्च.',
    ],
    evidence: [
      { type: 'shastra', en: 'Whatever is given, offered or recited on Vaishakha Shukla Tritiya becomes imperishable (akshaya), especially when joined with Krittika.', mr: 'वैशाख शुद्ध तृतीयेला दिलेले, अर्पिलेले वा जपलेले अक्षय होते — विशेषतः कृत्तिका नक्षत्र असल्यास.', source: 'Matsya Purana 65.1–7 (via Puranic Encyclopedia)', url: 'https://www.wisdomlib.org/definition/akshayatritiya', verified: false },
      { type: 'shastra', en: 'Vaishakha Shukla Tritiya is one of four yugadi tithis — anniversaries of the first day of a yuga.', mr: 'वैशाख शुद्ध तृतीया ही चार युगादी तिथींपैकी एक — युगारंभाच्या दिवसाचे स्मरण.', source: 'Vishnu Purana 3.14 (tr. Wilson)', url: 'https://www.wisdomlib.org/hinduism/book/vishnu-purana-wilson/d/doc115991.html', verified: true },
      { type: 'shastra', en: 'Which yuga began on it is disputed: Satya/Krita in one dictionary tradition, Treta in popular calendars.', mr: 'कोणते युग सुरू झाले याबद्दल मतभेद: एका कोश-परंपरेत सत्य/कृत, लोकप्रिय पंचांगांत त्रेता.', source: 'wisdomlib dictionary entry', url: 'https://www.wisdomlib.org/definition/akshayatritiya', verified: true },
      { type: 'shastra', en: 'For Jains, Rishabhadeva broke his year-long fast with sugar-cane juice on this day — the founding act of dana.', mr: 'जैनांसाठी ऋषभदेवांनी या दिवशी उसाच्या रसाने वर्षभराचा उपवास सोडला — दानाचे मूळ कृत्य.', source: 'wisdomlib (Jain section)', url: 'https://www.wisdomlib.org/definition/akshayatritiya', verified: true },
      { type: 'shastra', en: 'The Sun’s exaltation is Mesha 10° and the Moon’s Vrishabha 3°.', mr: 'सूर्याचा उच्चबिंदू मेष 10° आणि चंद्राचा वृषभ 3°.', source: 'Brihat Jataka 1.13', url: 'https://www.wisdomlib.org/hinduism/book/brihat-jataka-by-varahamihira-sanskrit-english/d/doc1501536.html', verified: true },
      { type: 'sky', en: 'Computed in this app (2000–2050): Sun in Mesha in 47 of 51 years, Moon in Vrishabha in 44, both together in 42.', mr: 'या ॲपमधील गणित (2000–2050): 51 पैकी 47 वर्षांत सूर्य मेषेत, 44 मध्ये चंद्र वृषभेत, दोघे एकत्र 42 मध्ये.' },
      { type: 'ritu', en: 'Vaishakha leads into Grishma, when the Sun dries the body; Charaka advises cold, sweet, liquid foods like mantha.', mr: 'वैशाख ग्रीष्माकडे नेतो, जेव्हा सूर्य शरीर कोरडे करतो; चरक मंथासारखे थंड, गोड, द्रव पदार्थ सांगतात.', source: 'Charaka Samhita, Sutrasthana 6.27–29', url: CS6, verified: true },
    ],
    myths: [
      { myth: ['"Scripture says you must buy gold on Akshaya Tritiya."', '"अक्षय्य तृतीयेला सोने घ्यावे असे शास्त्र सांगते."'], verdict: 'does not hold', why: ['The Puranas praise giving, japa, homa and fasting; buying gold is a modern commercial custom.', 'पुराणे दान, जप, होम व उपवासाची स्तुती करतात; सोनेखरेदी ही आधुनिक व्यापारी प्रथा.'] },
      { myth: ['"Both Sun and Moon are exalted on Akshaya Tritiya every year."', '"अक्षय्य तृतीयेला दरवर्षी सूर्य-चंद्र दोघेही उच्च."'], verdict: 'partly', why: ['True at the festival moment in 42 of 51 years; in some years the Moon is still in Mesha or already in Mithuna.', '51 पैकी 42 वर्षांत खरे; काही वर्षी चंद्र अजून मेषेत किंवा आधीच मिथुनेत.'] },
    ],
    confidence: 'high',
    confidenceNote: ['high for the sky; medium for some Puranic attributions', 'आकाशासाठी उच्च; काही पुराण-संदर्भांसाठी मध्यम'],
    sky: [
      { label: ['Akshaya Tritiya — Sun in Mesha, Moon in Vrishabha', 'अक्षय्य तृतीया — सूर्य मेषेत, चंद्र वृषभेत'], defId: 'akshaya-tritiya', view: 'geo' },
    ],
    sources: [
      { title: 'Akshaya Tritiya — wisdomlib (Matsya Purana, Jain tradition)', url: 'https://www.wisdomlib.org/definition/akshayatritiya' },
      { title: 'Vishnu Purana 3.14 (Wilson) — wisdomlib', url: 'https://www.wisdomlib.org/hinduism/book/vishnu-purana-wilson/d/doc115991.html' },
      { title: 'Brihat Jataka 1.13 — wisdomlib', url: 'https://www.wisdomlib.org/hinduism/book/brihat-jataka-by-varahamihira-sanskrit-english/d/doc1501536.html' },
      { title: 'Charaka Samhita, Sutrasthana 6 — carakasamhitaonline', url: CS6 },
    ],
  },
];
