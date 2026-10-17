// Guna Milan and Muhurat tabs of the details panel.
import { PLACES, type Place } from '../data/locations.ts';
import { gunaMilan, type MilanResult, type KootaId } from '../panchang/milan.ts';
import { VARNA, VASHYA, YONI, GANA, NADI } from '../panchang/avakahada.ts';
import type { YearBundle, MuhuratType, MuhuratWindow } from '../panchang/index.ts';
import { MUHURAT_TYPES } from '../panchang/muhurat.ts';
import { nm, t, lang } from '../i18n.ts';

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const mr = () => lang() === 'mr';
const pick = (p: [string, string]) => (mr() ? p[1] : p[0]);
const placeLabel = (p: Place) => (mr() ? p.mr : p.name);

// ── Guna Milan ────────────────────────────────────────────────────────
interface PersonInput {
  date: string;
  time: string;
  placeId: string;
}
/** Birth details stay in memory only — nothing is stored or sent anywhere. */
const milanState: { bride: PersonInput; groom: PersonInput; result: MilanResult | null } = {
  bride: { date: '', time: '', placeId: 'pune' },
  groom: { date: '', time: '', placeId: 'pune' },
  result: null,
};

const KOOTA_NAME: Record<KootaId, [string, string]> = {
  varna: ['Varna', 'वर्ण'], vashya: ['Vashya', 'वश्य'], tara: ['Tara', 'तारा'], yoni: ['Yoni', 'योनी'],
  maitri: ['Graha Maitri', 'ग्रहमैत्री'], gana: ['Gana', 'गण'], bhakoot: ['Bhakoot', 'भकूट'], nadi: ['Nadi', 'नाडी'],
};
const KOOTA_ABOUT: Record<KootaId, [string, string]> = {
  varna: ['Spiritual temperament (by Moon rashi)', 'स्वभाव/आध्यात्मिक वृत्ती (चंद्र राशीवरून)'],
  vashya: ['Mutual attraction and control', 'परस्पर आकर्षण व वश्यता'],
  tara: ['Birth-star compatibility, counted both ways', 'जन्मनक्षत्रांची परस्पर अनुकूलता'],
  yoni: ['Physical and instinctive nature', 'शारीरिक व सहज प्रवृत्ती'],
  maitri: ['Friendship of the Moon-sign lords', 'राशिस्वामींची मैत्री'],
  gana: ['Temperament — Deva, Manushya, Rakshasa', 'स्वभाव — देव, मनुष्य, राक्षस'],
  bhakoot: ['Rashi distance — family welfare', 'राशींमधील अंतर — कौटुंबिक सुख'],
  nadi: ['Constitution and progeny', 'प्रकृती व संतती'],
};
const BAND: [string, string][] = [
  ['Below 18 — not recommended', '18 पेक्षा कमी — शिफारस नाही'],
  ['Acceptable', 'मध्यम / स्वीकार्य'],
  ['Very good', 'उत्तम'],
  ['Excellent', 'अति उत्तम'],
];
const DOSHA_NAME: Record<string, [string, string]> = {
  nadi: ['Nadi dosha', 'नाडी दोष'], bhakoot: ['Bhakoot dosha', 'भकूट दोष'], gana: ['Gana dosha', 'गण दोष'],
};
const CANCEL: Record<string, [string, string]> = {
  sameRashiDiffNak: ['same rashi, different nakshatra', 'रास एक, नक्षत्र भिन्न'],
  sameNakDiffRashi: ['same nakshatra, different rashi', 'नक्षत्र एक, रास भिन्न'],
  sameNakDiffPada: ['same nakshatra, different pada', 'नक्षत्र एक, चरण भिन्न'],
  friendlyLords: ['rashi lords are the same or friends', 'राशिस्वामी एकच किंवा मित्र'],
  sameLord: ['same rashi lord', 'राशिस्वामी एकच'],
  bhakootGood: ['Bhakoot is favourable', 'भकूट अनुकूल'],
  nakDistance: ['bride’s nakshatra is beyond the 14th from the groom’s', 'वधूचे नक्षत्र वराच्या नक्षत्रापासून 14 च्या पुढे'],
};

export interface MilanHooks {
  /** current timeline instant and place, to prefill a person */
  now: () => { ms: number; place: Place };
  rerender: () => void;
}

function toMs(p: PersonInput): number | null {
  if (!p.date || !p.time) return null;
  const place = PLACES.find((x) => x.id === p.placeId) ?? PLACES[0];
  const [Y, M, D] = p.date.split('-').map(Number);
  const [h, m] = p.time.split(':').map(Number);
  return Date.UTC(Y, M - 1, D, h, m) - place.tz * 3600000;
}

export function renderMilan(box: HTMLElement, hooks: MilanHooks) {
  const s = milanState;
  const placeOpts = (sel: string) => PLACES.map((p) => `<option value="${p.id}"${p.id === sel ? ' selected' : ''}>${esc(placeLabel(p))}</option>`).join('');
  const card = (who: 'bride' | 'groom') => `
    <fieldset class="person">
      <legend>${t(`milan.${who}`)}</legend>
      <label>${t('milan.date')}<input type="date" data-who="${who}" data-f="date" value="${s[who].date}"></label>
      <label>${t('milan.time')}<input type="time" data-who="${who}" data-f="time" value="${s[who].time}"></label>
      <label>${t('place')}<select data-who="${who}" data-f="placeId">${placeOpts(s[who].placeId)}</select></label>
      <button class="link" data-use="${who}">${t('milan.useNow')}</button>
    </fieldset>`;
  box.innerHTML = `
    <h2>${t('tab.milan.full')}</h2>
    <p class="about">${t('milan.hint')}</p>
    <div class="milan-form">${card('bride')}${card('groom')}</div>
    <button class="text-btn primary wide" id="milan-go">${t('milan.go')}</button>
    <div id="milan-result">${s.result ? milanResultHtml(s.result) : ''}</div>`;
  box.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[data-who]').forEach((el) => {
    el.onchange = () => {
      (s[el.dataset.who as 'bride' | 'groom'] as unknown as Record<string, string>)[el.dataset.f!] = el.value;
    };
  });
  box.querySelectorAll<HTMLButtonElement>('[data-use]').forEach((b) => {
    b.onclick = () => {
      const { ms, place } = hooks.now();
      const iso = new Date(ms + place.tz * 3600000).toISOString();
      s[b.dataset.use as 'bride' | 'groom'] = { date: iso.slice(0, 10), time: iso.slice(11, 16), placeId: place.id };
      hooks.rerender();
    };
  });
  box.querySelector<HTMLButtonElement>('#milan-go')!.onclick = () => {
    const bm = toMs(s.bride);
    const gm = toMs(s.groom);
    if (bm === null || gm === null) {
      box.querySelector('#milan-result')!.innerHTML = `<p class="warn">${t('milan.missing')}</p>`;
      return;
    }
    s.result = gunaMilan(
      { ms: bm, place: PLACES.find((p) => p.id === s.bride.placeId)! },
      { ms: gm, place: PLACES.find((p) => p.id === s.groom.placeId)! },
    );
    box.querySelector('#milan-result')!.innerHTML = milanResultHtml(s.result);
  };
}

function milanResultHtml(r: MilanResult): string {
  const g = r.bride;
  const b = r.groom;
  const pct = (r.total / 36) * 100;
  const kootaVal = (id: KootaId, a: typeof g) => {
    switch (id) {
      case 'varna': return pick(VARNA[a.varna]);
      case 'vashya': return pick(VASHYA[a.vashya]).split(' (')[0];
      case 'tara': return `${nm.nakshatra(a.nakshatra)}`;
      case 'yoni': return pick(YONI[a.yoni]).split(' (')[0];
      case 'maitri': return nm.graha(a.rashiLord);
      case 'gana': return pick(GANA[a.gana]);
      case 'bhakoot': return nm.rashi(a.rashi);
      case 'nadi': return pick(NADI[a.nadi]).split(' (')[0];
    }
  };
  const rows = r.kootas.map((k) => `<tr>
      <td><b>${pick(KOOTA_NAME[k.id])}</b><small>${pick(KOOTA_ABOUT[k.id])}</small></td>
      <td>${esc(kootaVal(k.id, g))}</td><td>${esc(kootaVal(k.id, b))}</td>
      <td class="pts"><span class="${k.points === 0 ? 'zero' : k.points === k.max ? 'full' : ''}">${k.points}</span>/${k.max}
        <i style="width:${(k.points / k.max) * 100}%"></i></td></tr>`).join('');
  const doshas = r.doshas.filter((d) => d.present).map((d) => {
    const ok = d.cancelledBy.length > 0;
    return `<li class="${ok ? 'ok' : 'bad'}"><b>${pick(DOSHA_NAME[d.id])}</b> — ${ok
      ? `${t('milan.cancelled')}: ${d.cancelledBy.map((c) => pick(CANCEL[c])).join('; ')}`
      : t('milan.notCancelled')}</li>`;
  }).join('');
  const mg = (label: string, m: MilanResult['mangal']['bride']) => {
    const manglik = (m.manglikLagna || m.manglikMoon) && !m.ownOrExalted;
    return `<li class="${manglik ? 'bad' : 'ok'}"><b>${label}</b> — ${t('milan.marsHouse', { l: m.fromLagna, m: m.fromMoon })}:
      ${manglik ? t('milan.manglik') : m.ownOrExalted && (m.manglikLagna || m.manglikMoon) ? t('milan.manglikCancelled') : t('milan.notManglik')}</li>`;
  };
  return `
    <div class="milan-score">
      <div class="ring" style="--p:${pct}%"><b>${r.total}</b><span>/ 36</span></div>
      <div><b class="band b${r.band}">${pick(BAND[r.band])}</b>
        <p>${t('milan.bandNote')}</p></div>
    </div>
    <div class="milan-people">
      <div><span>${t('milan.bride')}</span><b>${nm.rashi(g.rashi)} · ${nm.nakshatra(g.nakshatra)} ${g.pada}</b></div>
      <div><span>${t('milan.groom')}</span><b>${nm.rashi(b.rashi)} · ${nm.nakshatra(b.nakshatra)} ${b.pada}</b></div>
    </div>
    <table class="milan-table"><thead><tr><th>${t('milan.koota')}</th><th>${t('milan.bride')}</th><th>${t('milan.groom')}</th><th>${t('milan.points')}</th></tr></thead>
      <tbody>${rows}</tbody></table>
    <h3>${t('milan.doshas')}</h3>
    <ul class="dosha-list">${doshas || `<li class="ok">${t('milan.noDosha')}</li>`}
      ${mg(t('milan.bride'), r.mangal.bride)}${mg(t('milan.groom'), r.mangal.groom)}
      ${r.mangal.mutual ? `<li class="ok">${t('milan.mutualManglik')}</li>` : ''}</ul>
    <p class="fine">${t('milan.disclaimer')}</p>`;
}

// ── Muhurat ───────────────────────────────────────────────────────────
const MUHURAT_NAME: Record<MuhuratType, [string, string]> = {
  vivah: ['Vivah (marriage)', 'विवाह'],
  griha: ['Griha pravesh', 'गृहप्रवेश'],
  vahan: ['Vehicle purchase', 'वाहन खरेदी'],
  property: ['Property purchase', 'मालमत्ता खरेदी'],
};
const MUHURAT_RULE_TEXT: Record<MuhuratType, [string, string]> = {
  vivah: [
    'Nakshatras Rohini, Mrigashira, Magha, Uttara Phalguni, Hasta, Swati, Anuradha, Mula, Uttara Ashadha, Uttara Bhadrapada, Revati · Sun in Mesha, Vrishabha, Mithuna, Vrishchika, Makara or Kumbha · no Amavasya · excludes Chaturmas, Adhik maas, Guru/Shukra asta (with vriddha/bala margins), visible eclipses, Bhadra and Vyatipata/Vaidhriti yoga (Holashtak too under Purnimanta).',
    'नक्षत्रे: रोहिणी, मृगशीर्ष, मघा, उत्तरा फाल्गुनी, हस्त, स्वाती, अनुराधा, मूळ, उत्तराषाढा, उत्तरा भाद्रपदा, रेवती · सूर्य मेष, वृषभ, मिथुन, वृश्चिक, मकर किंवा कुंभ राशीत · अमावस्या वर्ज्य · चातुर्मास, अधिक मास, गुरू/शुक्र अस्त (वृद्ध/बाल दिवसांसह), दृश्य ग्रहण, भद्रा आणि व्यतिपात/वैधृती योग वगळले.',
  ],
  griha: [
    'Nakshatras Rohini, Mrigashira, Uttara Phalguni, Chitra, Anuradha, Uttara Ashadha, Uttara Bhadrapada, Revati · tithis 2, 3, 5, 7, 10, 11, 13 (and Shukla Pratipada) · Mon, Wed, Thu, Fri, Sat · months Magha, Phalguna, Vaishakha, Jyeshtha, Kartik, Margashirsha · excludes Sun in Meena, Adhik maas, Guru/Shukra asta, eclipses and Bhadra.',
    'नक्षत्रे: रोहिणी, मृगशीर्ष, उत्तरा फाल्गुनी, चित्रा, अनुराधा, उत्तराषाढा, उत्तरा भाद्रपदा, रेवती · तिथी 2, 3, 5, 7, 10, 11, 13 (व शुद्ध प्रतिपदा) · सोम, बुध, गुरू, शुक्र, शनी · मास: माघ, फाल्गुन, वैशाख, ज्येष्ठ, कार्तिक, मार्गशीर्ष · मीनेतील सूर्य, अधिक मास, गुरू/शुक्र अस्त, ग्रहण व भद्रा वगळले.',
  ],
  vahan: [
    'Chara nakshatras (Punarvasu, Swati, Shravana, Dhanishta, Shatabhisha) and Mridu/Kshipra ones · no Rikta tithis (4, 9, 14) or Amavasya · Sun, Mon, Wed, Thu, Fri · excludes Bhadra and Rahu kaal.',
    'चर नक्षत्रे (पुनर्वसू, स्वाती, श्रवण, धनिष्ठा, शततारका) व मृदू/क्षिप्र नक्षत्रे · रिक्ता तिथी (4, 9, 14) व अमावस्या वर्ज्य · रवि, सोम, बुध, गुरू, शुक्र · भद्रा व राहुकाळ वगळले.',
  ],
  property: [
    'Nakshatras Mrigashira, Punarvasu, Ashlesha, Magha, Purva Phalguni, Vishakha, Anuradha, Jyeshtha, Mula, Purva Ashadha, Purva Bhadrapada, Revati · Thursday or Friday · no Amavasya or Adhik maas · excludes Rahu kaal.',
    'नक्षत्रे: मृगशीर्ष, पुनर्वसू, आश्लेषा, मघा, पूर्वा फाल्गुनी, विशाखा, अनुराधा, ज्येष्ठा, मूळ, पूर्वाषाढा, पूर्वा भाद्रपदा, रेवती · गुरुवार किंवा शुक्रवार · अमावस्या व अधिक मास वर्ज्य · राहुकाळ वगळला.',
  ],
};

export interface MuhuratHooks {
  type: MuhuratType;
  setType: (t: MuhuratType) => void;
  jump: (ms: number) => void;
  fmtTime: (ms: number) => string;
  fmtDate: (date: string) => string;
  localDate: (ms: number) => string;
}

export function renderMuhurat(box: HTMLElement, bundle: YearBundle, h: MuhuratHooks) {
  const list: MuhuratWindow[] = bundle.muhurat[h.type];
  const byMonth = new Map<number, Map<string, MuhuratWindow[]>>();
  for (const w of list) {
    const m = Number(w.date.slice(5, 7)) - 1;
    const days = byMonth.get(m) ?? byMonth.set(m, new Map()).get(m)!;
    (days.get(w.date) ?? days.set(w.date, []).get(w.date)!).push(w);
  }
  const chips = MUHURAT_TYPES.map((k) => `<button class="chip${k === h.type ? ' on' : ''}" data-mt="${k}">${pick(MUHURAT_NAME[k])}</button>`).join('');
  const months = [...byMonth.entries()].map(([m, days]) => `
    <div class="mu-month"><h4>${nm.monthFull(m)} <span>${days.size}</span></h4>
      ${[...days.entries()].map(([date, ws]) => `
        <div class="mu-day"><b>${esc(h.fmtDate(date))}</b>
          ${ws.map((w) => {
            const endDay = h.localDate(w.end) !== date ? ' <sup>+1</sup>' : '';
            return `<button class="mu-win" data-ms="${w.start}">${h.fmtTime(w.start)}–${h.fmtTime(w.end)}${endDay}
              <span>${w.nakshatras.map(nm.nakshatra).join(' → ')} · ${w.tithis.map(nm.pakshaTithi).join(' → ')}</span></button>`;
          }).join('')}
        </div>`).join('')}
    </div>`).join('');
  box.innerHTML = `
    <h2>${t('tab.muhurat.full')}</h2>
    <div class="chips mu-chips">${chips}</div>
    <p class="about">${t('mu.count', { n: new Set(list.map((w) => w.date)).size, y: bundle.year, place: esc(placeLabel(bundle.place)) })}</p>
    ${months || `<p class="warn">${t('mu.none')}</p>`}
    <h3>${t('mu.rules')}</h3>
    <p class="fine">${pick(MUHURAT_RULE_TEXT[h.type])}</p>
    <p class="fine">${t('mu.disclaimer')}</p>`;
  box.querySelectorAll<HTMLButtonElement>('[data-mt]').forEach((b) => (b.onclick = () => h.setType(b.dataset.mt as MuhuratType)));
  box.querySelectorAll<HTMLButtonElement>('[data-ms]').forEach((b) => (b.onclick = () => h.jump(Number(b.dataset.ms))));
}
