import './style.css';
import { SkyScene, type ViewMode } from './scene/scene.ts';
import { skyState, GRAHAS, type SkyState } from './scene/sky.ts';
import type { Graha } from './astro/ephemeris.ts';
import { PLACES, DEFAULT_PLACE, type Place } from './data/locations.ts';
import { panchangAt, monthLabel, type YearBundle, type Occurrence, type MonthSystem, type Day } from './panchang/index.ts';
import type { Category } from './panchang/rules.ts';
import { RASHI_EN, pakshaMr, tithiNameMr } from './panchang/constants.ts';
import { t, nm, lang, setLang, type Lang } from './i18n.ts';
import { renderPrintCalendar } from './ui/printCalendar.ts';
import { renderMilan, renderMuhurat } from './ui/milanMuhurat.ts';
import { renderWhy, whyFor, whyTitle } from './ui/why.ts';
import type { MuhuratType } from './panchang/index.ts';
import { avakahada, NAAMAKSHAR, VARNA, VASHYA, YONI, GANA, NADI, TATVA, PAYA } from './panchang/avakahada.ts';

// ── Preferences ────────────────────────────────────────────────────────
interface Prefs {
  year: number;
  placeId: string;
  system: MonthSystem;
  view: ViewMode;
  cats: Category[];
  region: string;
  lang: Lang;
  detailsTab: 'festival' | 'avakahada' | 'milan' | 'muhurat' | 'why';
  muhuratType: MuhuratType;
}
const TODAY = new Date();
const DEFAULT_PREFS: Prefs = {
  year: TODAY.getFullYear(),
  placeId: DEFAULT_PLACE.id,
  system: 'amanta',
  view: 'geo',
  cats: ['utsav', 'vrat', 'ekadashi', 'period', 'sankranti', 'grahan'],
  region: 'all',
  lang: 'en',
  detailsTab: 'festival',
  muhuratType: 'vivah',
};
function loadPrefs(): Prefs {
  try {
    return { ...DEFAULT_PREFS, ...JSON.parse(localStorage.getItem('panchang-sky') ?? '{}') };
  } catch {
    return { ...DEFAULT_PREFS };
  }
}
const prefs = loadPrefs();
const savePrefs = () => {
  try {
    localStorage.setItem('panchang-sky', JSON.stringify(prefs));
  } catch {
    /* storage unavailable */
  }
};

setLang(prefs.lang);

const CATS: Category[] = ['utsav', 'vrat', 'ekadashi', 'period', 'sankranti', 'grahan', 'graha', 'masik'];

// ── DOM ────────────────────────────────────────────────────────────────
const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const els = {
  year: $<HTMLSelectElement>('year'),
  place: $<HTMLSelectElement>('place'),
  search: $<HTMLInputElement>('search'),
  chips: $('chips'),
  region: $<HTMLSelectElement>('region'),
  count: $('count'),
  list: $('list'),
  details: $('details'),
  hud: $('hud'),
  tools: $('view-tools'),
  loading: $('loading'),
  timeline: $('timeline'),
  when: $<HTMLInputElement>('when'),
  play: $<HTMLButtonElement>('play'),
  speed: $<HTMLSelectElement>('speed'),
  skyTab: $('sky-tab'),
  sidebar: $('sidebar'),
};

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const place = (): Place => PLACES.find((p) => p.id === prefs.placeId) ?? DEFAULT_PLACE;
const tzMs = () => place().tz * 3600000;
const localISO = (ms: number) => new Date(ms + tzMs()).toISOString();
const fmtTime = (ms: number) => localISO(ms).slice(11, 16);
const parseDate = (d: string) => new Date(`${d}T00:00:00Z`);
const fmtDate = (d: string, withYear = true) => {
  const x = parseDate(d);
  return `${nm.dow(x.getUTCDay())}, ${x.getUTCDate()} ${nm.monthShort(x.getUTCMonth())}${withYear ? ` ${x.getUTCFullYear()}` : ''}`;
};
/** "19 Mar" — day and month only */
const fmtDM = (d: string) => {
  const x = parseDate(d);
  return `${x.getUTCDate()} ${nm.monthShort(x.getUTCMonth())}`;
};
const isMr = () => lang() === 'mr';
const placeName = (p: Place = place()) => (isMr() ? p.mr : p.name);
/** Name in the current language, and the other language's name as a secondary line. */
const oName = (o: Occurrence) => (isMr() && o.mr ? o.mr : o.name);
const oAlt = (o: Occurrence) => (isMr() ? o.name : o.mr);
const oAbout = (o: Occurrence) => (isMr() && o.aboutMr ? o.aboutMr : o.about);
const mLabel = (month: number, adhik: boolean, tithi: number, system = prefs.system) => monthLabel(month, adhik, tithi, system, isMr());
const fmtDateTime = (ms: number) => {
  const iso = localISO(ms);
  return `${fmtDate(iso.slice(0, 10))}, ${iso.slice(11, 16)}`;
};
const degIn = (d: number) => {
  const x = d % 30;
  return `${Math.floor(x)}°${String(Math.floor((x % 1) * 60)).padStart(2, '0')}′`;
};

// ── State ──────────────────────────────────────────────────────────────
let bundle: YearBundle | null = null;
let dayMap = new Map<string, Day>();
let visible: Occurrence[] = [];
let selected: Occurrence | null = null;
let time = Date.now();
let playing = false;
let sky: SkyState | null = null;

const scene = new SkyScene($('viewport'), place());

// ── Worker ─────────────────────────────────────────────────────────────
const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
let reqId = 0;
function recompute(keepSelection = true) {
  const id = ++reqId;
  els.loading.classList.add('on');
  const prevKey = selected?.defId;
  worker.onmessage = (e) => {
    if (e.data.id !== id) return;
    els.loading.classList.remove('on');
    if (e.data.error) {
      els.details.innerHTML = `<div class="placeholder"><h2>${t('errTitle')}</h2><p>${esc(e.data.error)}</p></div>`;
      return;
    }
    bundle = e.data.bundle as YearBundle;
    dayMap = new Map(bundle.days.map((d) => [d.date, d]));
    applyFilters();
    let pick: Occurrence | undefined;
    if (keepSelection && prevKey) pick = bundle.occurrences.find((o) => o.defId === prevKey);
    if (!pick) {
      const today = localISO(Date.now()).slice(0, 10);
      pick = visible.find((o) => o.date >= today && o.category === 'utsav') ?? visible.find((o) => o.category === 'utsav') ?? visible[0];
    }
    renderTimeline();
    if (pick) select(pick, true);
  };
  worker.postMessage({ id, year: prefs.year, placeId: prefs.placeId, system: prefs.system });
}

// ── Controls ───────────────────────────────────────────────────────────
function initControls() {
  for (let y = 2000; y <= 2050; y++) els.year.add(new Option(String(y), String(y), false, y === prefs.year));
  for (const p of PLACES) els.place.add(new Option(placeName(p), p.id, false, p.id === prefs.placeId));
  document.querySelectorAll<HTMLButtonElement>('[data-lang]').forEach((b) => {
    b.classList.toggle('on', b.dataset.lang === prefs.lang);
    b.onclick = () => changeLang(b.dataset.lang as Lang);
  });
  els.year.onchange = () => setYear(Number(els.year.value));
  $('year-prev').onclick = () => setYear(prefs.year - 1);
  $('year-next').onclick = () => setYear(prefs.year + 1);
  els.place.onchange = () => {
    prefs.placeId = els.place.value;
    savePrefs();
    scene.setPlace(place());
    updateSkyTab();
    recompute();
  };
  document.querySelectorAll<HTMLButtonElement>('[data-system]').forEach((b) => {
    b.classList.toggle('on', b.dataset.system === prefs.system);
    b.onclick = () => {
      prefs.system = b.dataset.system as MonthSystem;
      savePrefs();
      document.querySelectorAll('[data-system]').forEach((x) => x.classList.toggle('on', x === b));
      recompute();
    };
  });
  for (const c of CATS) {
    const b = document.createElement('button');
    b.className = `chip c-${c}${prefs.cats.includes(c) ? ' on' : ''}`;
    b.dataset.cat = c;
    b.textContent = nm.catChip(c);
    b.onclick = () => {
      prefs.cats = prefs.cats.includes(c) ? prefs.cats.filter((x) => x !== c) : [...prefs.cats, c];
      b.classList.toggle('on');
      savePrefs();
      applyFilters();
      renderTimeline();
    };
    els.chips.appendChild(b);
  }
  els.region.value = prefs.region;
  els.region.onchange = () => {
    prefs.region = els.region.value;
    savePrefs();
    applyFilters();
    renderTimeline();
  };
  els.search.oninput = () => applyFilters();
  document.querySelectorAll<HTMLButtonElement>('[data-view]').forEach((b) => {
    b.onclick = () => setView(b.dataset.view as ViewMode);
  });
  $('toggle-list').onclick = () => els.sidebar.classList.toggle('open');
  $('print-cal').onclick = () => {
    if (!bundle) return;
    renderPrintCalendar($('print-view'), {
      bundle,
      system: prefs.system,
      placeName: placeName(),
      name: oName,
      regionOk: (o) => prefs.region === 'all' || o.region === 'all' || o.region === prefs.region,
    });
  };

  els.play.onclick = () => setPlaying(!playing);
  const step = (ms: number) => () => setTime(time + ms);
  $('step-back').onclick = step(-3600000);
  $('step-fwd').onclick = step(3600000);
  $('step-back-day').onclick = step(-86400000);
  $('step-fwd-day').onclick = step(86400000);
  $('now').onclick = () => {
    const now = Date.now();
    const y = new Date(now + tzMs()).getUTCFullYear();
    if (y !== prefs.year) setYear(y);
    setTime(now);
  };
  els.when.onchange = () => {
    if (!els.when.value) return;
    const [d, t] = els.when.value.split('T');
    const [Y, M, D] = d.split('-').map(Number);
    const [h, m] = t.split(':').map(Number);
    const ms = Date.UTC(Y, M - 1, D, h, m) - tzMs();
    if (Y !== prefs.year) setYear(Y);
    setTime(ms);
  };
  document.addEventListener('keydown', (e) => {
    if ((e.target as HTMLElement).matches('input, select, textarea')) return;
    if (e.key === ' ') {
      e.preventDefault();
      setPlaying(!playing);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const i = selected ? visible.indexOf(selected) : -1;
      const n = visible[Math.max(0, Math.min(visible.length - 1, i + (e.key === 'ArrowDown' ? 1 : -1)))];
      if (n) select(n, true);
    } else if (e.key === 'ArrowRight') setTime(time + (e.shiftKey ? 86400000 : 3600000));
    else if (e.key === 'ArrowLeft') setTime(time - (e.shiftKey ? 86400000 : 3600000));
  });
}

function setYear(y: number) {
  if (y < 2000 || y > 2050) return;
  prefs.year = y;
  els.year.value = String(y);
  savePrefs();
  recompute();
}

function updateSkyTab() {
  els.skyTab.textContent = t('view.sky', { place: placeName() });
}

/** Apply translations to static markup (elements carrying data-i18n / data-i18n-title / data-i18n-ph). */
function applyStaticText() {
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => (el.textContent = t(el.dataset.i18n!)));
  document.querySelectorAll<HTMLElement>('[data-i18n-title]').forEach((el) => (el.title = t(el.dataset.i18nTitle!)));
  document.querySelectorAll<HTMLInputElement>('[data-i18n-ph]').forEach((el) => (el.placeholder = t(el.dataset.i18nPh!)));
  document.title = t('brand.title');
  els.chips.querySelectorAll<HTMLElement>('[data-cat]').forEach((b) => (b.textContent = nm.catChip(b.dataset.cat as Category)));
  [...els.place.options].forEach((opt) => (opt.text = placeName(PLACES.find((p) => p.id === opt.value))));
  updateSkyTab();
}

function changeLang(l: Lang) {
  prefs.lang = l;
  savePrefs();
  setLang(l);
  document.querySelectorAll('[data-lang]').forEach((x) => x.classList.toggle('on', (x as HTMLElement).dataset.lang === l));
  applyStaticText();
  scene.refreshLanguage();
  renderList();
  renderTimeline();
  renderTools();
  renderHud();
  renderDetails();
}

function setView(v: ViewMode) {
  prefs.view = v;
  savePrefs();
  document.querySelectorAll('[data-view]').forEach((b) => b.classList.toggle('on', (b as HTMLElement).dataset.view === v));
  scene.setView(v);
  if (v === 'sky') scene.lookAt(selected ? focusFor(selected) : 'Moon');
  renderTools();
}

function setPlaying(p: boolean) {
  playing = p;
  els.play.textContent = p ? '❚❚' : '▶';
  scene.followFocus = p && scene.view === 'sky' && toolState.follow;
}

// ── Filtering & list ───────────────────────────────────────────────────
function occMonth(o: Occurrence) {
  if (o.tithi) return { month: o.tithi.month, adhik: o.tithi.adhik, tithi: o.tithi.n };
  const d = dayMap.get(o.date);
  return d ? { month: d.month, adhik: d.adhik, tithi: d.tithi } : null;
}

function applyFilters() {
  if (!bundle) return;
  const q = els.search.value.trim().toLowerCase();
  const regionOk = (r: string) => prefs.region === 'all' || r === 'all' || r === prefs.region;
  visible = bundle.occurrences.filter((o) => {
    if (q) return (o.name + ' ' + (o.mr ?? '') + ' ' + o.defId).toLowerCase().includes(q);
    return prefs.cats.includes(o.category) && regionOk(o.region);
  });
  renderList();
}

function monthRuns() {
  // consecutive runs of days sharing a lunar-month label, for header date ranges
  const runs: { label: string; labelMr: string; from: string; to: string }[] = [];
  for (const d of bundle!.days) {
    const label = monthLabel(d.month, d.adhik, d.tithi, prefs.system);
    const last = runs[runs.length - 1];
    if (last && last.label === label) last.to = d.date;
    else runs.push({ label, labelMr: monthLabel(d.month, d.adhik, d.tithi, prefs.system, true), from: d.date, to: d.date });
  }
  return runs;
}

function renderList() {
  const runs = monthRuns();
  const frag = document.createDocumentFragment();
  let curLabel = '';
  for (const o of visible) {
    const m = occMonth(o);
    const label = m ? monthLabel(m.month, m.adhik, m.tithi, prefs.system) : '';
    if (label !== curLabel) {
      curLabel = label;
      const run = runs.find((r) => r.label === label && r.from <= o.date && r.to >= o.date);
      const h = document.createElement('div');
      h.className = `month-head${m?.adhik ? ' adhik' : ''}`;
      const main = m ? mLabel(m.month, m.adhik, m.tithi) : '';
      const other = m ? monthLabel(m.month, m.adhik, m.tithi, prefs.system, !isMr()) : '';
      h.innerHTML = `<span>${esc(main)}<span class="mr">${esc(other)}</span></span>${run ? `<small>${fmtDM(run.from)} – ${fmtDM(run.to)}</small>` : ''}`;
      frag.appendChild(h);
    }
    const it = document.createElement('div');
    it.className = `item c-${o.category}${selected?.key === o.key ? ' sel' : ''}`;
    it.dataset.key = o.key;
    it.setAttribute('role', 'option');
    const x = parseDate(o.date);
    let sub = '';
    if (o.endDate) sub = t('until', { d: fmtDM(o.endDate) });
    else if (o.tithi) sub = nm.pakshaTithi(o.tithi.n);
    else if (o.notes[0] && !isMr()) sub = o.notes[0];
    const alt = oAlt(o);
    const tag = o.region === 'mh' ? `<span class="tag mh">${isMr() ? 'महा' : 'MH'}</span>` : o.region !== 'all' ? `<span class="tag">${t(`region.tag.${o.region}`)}</span>` : '';
    it.innerHTML = `<div class="d"><b>${x.getUTCDate()}</b><span>${nm.monthShort(x.getUTCMonth())} · ${nm.dow(x.getUTCDay())}</span></div>
      <div class="n"><div class="t">${esc(oName(o))}${tag}</div>
      <div class="s">${alt ? `<span class="mr">${esc(alt)}</span>${sub ? ' · ' : ''}` : ''}${esc(sub)}</div></div>`;
    it.onclick = () => {
      select(o, true);
      els.sidebar.classList.remove('open');
    };
    frag.appendChild(it);
  }
  els.list.replaceChildren(frag);
  if (!visible.length) els.list.innerHTML = `<div class="empty">${t('empty')}</div>`;
  els.count.textContent = t('shown', { n: visible.length });
}

// ── Selection ──────────────────────────────────────────────────────────
function focusFor(o: Occurrence): Graha {
  if (o.defId === 'surya-grahan' || o.category === 'sankranti') return 'Sun';
  if (o.defId === 'chandra-grahan') return 'Moon';
  const m = o.defId.match(/^(gochar|vakri|asta)-(\w+)$/);
  if (m) {
    const g = (m[2][0].toUpperCase() + m[2].slice(1)) as Graha;
    if (GRAHAS.includes(g)) return g;
  }
  if (o.kaal === 'moonrise' || o.kaal === 'nishita') return 'Moon';
  const s = skyState(o.moment, place());
  if (o.kaal === 'pradosh' || o.kaal === 'sayahna') return s.grahas.Moon.alt > 5 ? 'Moon' : 'Sun';
  if (s.grahas.Moon.alt > 0) return 'Moon';
  return 'Sun';
}

function select(o: Occurrence, jump: boolean) {
  selected = o;
  document.querySelectorAll('.item.sel').forEach((e) => e.classList.remove('sel'));
  const el = els.list.querySelector<HTMLElement>(`[data-key="${CSS.escape(o.key)}"]`);
  if (el) {
    el.classList.add('sel');
    el.scrollIntoView({ block: 'nearest' });
  }
  if (jump) setTime(o.moment);
  if (scene.view === 'sky') scene.lookAt(focusFor(o));
  renderDetails();
  renderTimelineMarks();
}

function setTime(ms: number) {
  if (bundle) {
    const lo = Date.UTC(prefs.year, 0, 1) - tzMs();
    const hi = Date.UTC(prefs.year + 1, 0, 1) - tzMs() - 60000;
    ms = Math.max(lo, Math.min(hi, ms));
  }
  time = ms;
  sky = skyState(ms, place());
  scene.update(sky);
  renderHud();
  renderLive();
  renderAvakahada();
  positionHead();
  els.when.value = localISO(ms).slice(0, 16);
}

// ── HUD ────────────────────────────────────────────────────────────────
function renderHud() {
  if (!bundle || !sky) return;
  const p = panchangAt(time, bundle.months);
  const masa = p.month ? mLabel(p.month.month, p.month.adhik, p.tithi) : '';
  const cell = (label: string, value: string, extra = '') => `<div class="cell"><span>${label}</span><b>${value}</b>${extra}</div>`;
  els.hud.innerHTML =
    cell(t('tithi'), nm.pakshaTithi(p.tithi), `<div class="bar"><i style="width:${(p.tithiProgress * 100).toFixed(1)}%"></i></div>`) +
    cell(t('masa'), esc(masa)) +
    cell(t('nakshatra'), `${nm.nakshatra(p.nakshatra)} · ${p.nakshatraPada}`) +
    cell(t('suryaChandra'), `${nm.rashi(p.sunRashi)} · ${nm.rashi(p.moonRashi)}`) +
    cell(t('ist'), esc(placeName()));
}

// ── Details panel ──────────────────────────────────────────────────────
const EXALT: Record<string, [number, number]> = { Sun: [0, 6], Moon: [1, 7], Mars: [9, 3], Mercury: [5, 11], Jupiter: [3, 9], Venus: [11, 5], Saturn: [6, 0] };
function dignity(g: string, rashi: number) {
  const e = EXALT[g];
  if (!e) return '';
  if (e[0] === rashi) return ` — <b>${t('exalted')}</b>`;
  if (e[1] === rashi) return ` — <b>${t('debilitated')}</b>`;
  return '';
}

function elongSvg(el: number) {
  const r = 26;
  const a = (el * Math.PI) / 180;
  const mx = 32 + r * Math.cos(a);
  const my = 32 - r * Math.sin(a);
  const large = el > 180 ? 1 : 0;
  const fill = el < 180 ? '#ffe9a8' : '#6a78d8';
  return `<svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="32" cy="32" r="${r}" fill="none" stroke="rgba(255,255,255,.15)"/>
    <path d="M32 32 L${32 + r} 32 A${r} ${r} 0 ${large} 0 ${mx.toFixed(2)} ${my.toFixed(2)} Z" fill="${fill}" fill-opacity=".35" stroke="${fill}" stroke-opacity=".7"/>
    <circle cx="32" cy="32" r="4" fill="#4a90e2"/>
    <circle cx="${32 + r}" cy="32" r="5" fill="#ffc53d"/>
    <circle cx="${mx.toFixed(2)}" cy="${my.toFixed(2)}" r="4" fill="#e6e8f0"/>
  </svg>`;
}

function whyItems(o: Occurrence): string[] {
  const s = skyState(o.moment, place());
  const p = panchangAt(o.moment, bundle!.months);
  const mr = isMr();
  const out: string[] = [];
  const rashiOf = (lon: number) => Math.floor(lon / 30);
  const nakOf = (lon: number) => Math.floor(lon / (360 / 27));
  if (o.tithi) {
    const tt = o.tithi;
    const otherSys: MonthSystem = prefs.system === 'amanta' ? 'purnimanta' : 'amanta';
    const lab = mLabel(tt.month, tt.adhik, tt.n);
    const other = mLabel(tt.month, tt.adhik, tt.n, otherSys);
    const kaal = o.kaal ? nm.kaal(o.kaal) : '';
    out.push(mr
      ? `<b>${esc(lab)} ${nm.pakshaTithi(tt.n)}</b> — ${kaal}
        <small>${t(otherSys)} नाव: ${esc(other)} ${nm.pakshaTithi(tt.n)}</small>`
      : `<b>${esc(lab)} ${nm.pakshaTithi(tt.n)}</b> ${kaal}
        <small>${t(otherSys)} name: ${esc(other)} ${nm.pakshaTithi(tt.n)} · मराठी: ${monthLabel(tt.month, tt.adhik, tt.n, 'amanta', true)} ${pakshaMr(tt.n)} ${tithiNameMr(tt.n)}</small>`);
    const lo = (tt.n - 1) * 12;
    out.push(mr
      ? `चंद्र सूर्याच्या <b>${p.elongation.toFixed(1)}°</b> पुढे — तिथी ${tt.n} म्हणजे ${lo}°–${lo + 12}°
        <small>${nm.tithi(tt.n)}: ${fmtDateTime(tt.start)} ते ${fmtDateTime(tt.end)}</small>`
      : `Moon is <b>${p.elongation.toFixed(1)}°</b> ahead of the Sun — tithi ${tt.n} spans ${lo}°–${lo + 12}°
        <small>${nm.tithi(tt.n)} runs ${fmtDateTime(tt.start)} → ${fmtDateTime(tt.end)}</small>`);
  } else {
    out.push(mr
      ? `चंद्र–सूर्य अंतर <b>${p.elongation.toFixed(1)}°</b> → ${nm.pakshaTithi(p.tithi)}`
      : `Moon–Sun angle <b>${p.elongation.toFixed(1)}°</b> → ${nm.pakshaTithi(p.tithi)}`);
  }
  if (o.nakshatra) {
    const start = (o.nakshatra.n * 40) / 3;
    out.push(mr
      ? `चंद्र <b>${nm.nakshatra(o.nakshatra.n)}</b> नक्षत्रात (${nm.rashi(rashiOf(start))} ${degIn(start)} पासून) · देवता: ${nm.devata(o.nakshatra.n)}
        <small>${fmtDateTime(o.nakshatra.start)} ते ${fmtDateTime(o.nakshatra.end)}</small>`
      : `Moon in <b>${nm.nakshatra(o.nakshatra.n)}</b> nakshatra (${degIn(start)} in ${nm.rashi(rashiOf(start))} onward) · Devata: ${nm.devata(o.nakshatra.n)}
        <small>${fmtDateTime(o.nakshatra.start)} → ${fmtDateTime(o.nakshatra.end)}</small>`);
  }
  const sun = s.grahas.Sun;
  const moon = s.grahas.Moon;
  const sr = rashiOf(sun.sid);
  const mrR = rashiOf(moon.sid);
  const lit = (50 * (1 - Math.cos((p.elongation * Math.PI) / 180))).toFixed(0);
  if (mr) {
    out.push(`सूर्य <b>${nm.rashi(sr)}</b> राशीत ${degIn(sun.sid)}${dignity('Sun', sr)}
      <small>${nm.nakshatra(nakOf(sun.sid))} नक्षत्र · ${sun.alt > 0 ? `क्षितिजावर, उंची ${sun.alt.toFixed(0)}°` : `क्षितिजाखाली (${sun.alt.toFixed(0)}°)`}</small>`);
    out.push(`चंद्र <b>${nm.rashi(mrR)}</b> राशीत ${degIn(moon.sid)} · ${nm.nakshatra(p.nakshatra)} ${t('pada')} ${p.nakshatraPada}${dignity('Moon', mrR)}
      <small>देवता: ${nm.devata(p.nakshatra)} · वृक्ष: ${nm.vriksha(p.nakshatra)} · ${moon.alt > 0 ? `दृश्य, उंची ${moon.alt.toFixed(0)}°, दिगंश ${moon.az.toFixed(0)}°` : 'क्षितिजाखाली'} · ${lit}% प्रकाशित</small>`);
  } else {
    out.push(`Sun in <b>${nm.rashi(sr)}</b> ${degIn(sun.sid)} (${RASHI_EN[sr]})${dignity('Sun', sr)}
      <small>${nm.nakshatra(nakOf(sun.sid))} nakshatra · ${sun.alt > 0 ? `above the horizon, altitude ${sun.alt.toFixed(0)}°` : `below the horizon (${sun.alt.toFixed(0)}°)`}</small>`);
    out.push(`Moon in <b>${nm.rashi(mrR)}</b> ${degIn(moon.sid)} · ${nm.nakshatra(p.nakshatra)} pada ${p.nakshatraPada}${dignity('Moon', mrR)}
      <small>Devata: ${nm.devata(p.nakshatra)} · Tree: ${nm.vriksha(p.nakshatra)} · ${moon.alt > 0 ? `visible, altitude ${moon.alt.toFixed(0)}° at azimuth ${moon.az.toFixed(0)}°` : 'below the horizon'} · ${lit}% illuminated</small>`);
  }
  return out;
}

let pendingWhy: string | null = null;

/** "Show in sky" from a Why? answer: a festival of the current year, or a fixed instant. */
function showWhy(target: { defId?: string; iso?: string; view: ViewMode }): boolean {
  let ms: number | null = null;
  if (target.defId && bundle) {
    const o = bundle.occurrences.find((x) => x.defId === target.defId);
    if (o) ms = o.moment;
  }
  if (ms === null && target.iso) {
    ms = Date.parse(target.iso);
    const y = new Date(ms + tzMs()).getUTCFullYear();
    if (y !== prefs.year) {
      // the target lies in another year: switch year, then jump once it is computed
      prefs.year = y;
      els.year.value = String(y);
      savePrefs();
      recompute();
      const go = ms;
      const wait = setInterval(() => {
        if (bundle?.year === y && !els.loading.classList.contains('on')) {
          clearInterval(wait);
          setTime(go);
          setView(target.view);
        }
      }, 150);
      return true;
    }
  }
  if (ms === null) return false;
  setTime(ms);
  setView(target.view);
  if (target.view === 'sky') scene.lookAt('Moon');
  return true;
}

function detailsTabs() {
  const tab = (id: Prefs['detailsTab'], key: string) =>
    `<button data-dtab="${id}" class="${prefs.detailsTab === id ? 'on' : ''}" role="tab">${t(key)}</button>`;
  return `<div class="dtabs" role="tablist">${tab('festival', 'tab.festival')}${tab('avakahada', 'tab.avakahada.short')}${tab('milan', 'tab.milan')}${tab('muhurat', 'tab.muhurat')}${tab('why', 'tab.why')}</div>`;
}

function bindDetailsTabs() {
  els.details.querySelectorAll<HTMLButtonElement>('[data-dtab]').forEach((b) => {
    b.onclick = () => {
      prefs.detailsTab = b.dataset.dtab as Prefs['detailsTab'];
      savePrefs();
      renderDetails();
    };
  });
}

function renderDetails() {
  if (prefs.detailsTab === 'why') {
    els.details.innerHTML = `${detailsTabs()}<div id="tabbox"></div>`;
    bindDetailsTabs();
    renderWhy($('tabbox'), { show: showWhy, open: pendingWhy ?? undefined });
    pendingWhy = null;
    return;
  }
  if (prefs.detailsTab === 'milan' || prefs.detailsTab === 'muhurat') {
    els.details.innerHTML = `${detailsTabs()}<div id="tabbox"></div>`;
    bindDetailsTabs();
    const box = $('tabbox');
    if (prefs.detailsTab === 'milan') {
      renderMilan(box, { now: () => ({ ms: time, place: place() }), rerender: renderDetails });
    } else if (bundle) {
      renderMuhurat(box, bundle, {
        type: prefs.muhuratType,
        setType: (k) => {
          prefs.muhuratType = k;
          savePrefs();
          renderDetails();
        },
        jump: (ms) => {
          setTime(ms);
          if (scene.view === 'sky') scene.lookAt('Moon');
        },
        fmtTime,
        fmtDate: (d) => fmtDate(d, false),
        localDate: (ms) => localISO(ms).slice(0, 10),
      });
    }
    return;
  }
  if (prefs.detailsTab === 'avakahada') {
    els.details.innerHTML = `${detailsTabs()}<div id="ava"></div>`;
    bindDetailsTabs();
    renderAvakahada(true);
    return;
  }
  renderFestival();
  const first = els.details.firstElementChild;
  first?.insertAdjacentHTML('beforebegin', detailsTabs());
  bindDetailsTabs();
}

let avaTimer = 0;
function renderAvakahada(force = false) {
  const box = document.getElementById('ava');
  if (!box || !bundle) return;
  const now = performance.now();
  if (!force && playing && now - avaTimer < 250) return;
  avaTimer = now;
  const mr = isMr();
  const pick = (pair: [string, string]) => (mr ? pair[1] : pair[0]);
  const a = avakahada(time, place());
  const p = panchangAt(time, bundle.months);
  const wd = parseDate(localISO(time).slice(0, 10)).getUTCDay();
  const years = Math.floor(a.dasha.balanceYears);
  const monthsF = (a.dasha.balanceYears - years) * 12;
  const months = Math.floor(monthsF);
  const days = Math.floor((monthsF - months) * 30.44);
  const row = (k: string, v: string) => `<dt>${t(k)}</dt><dd>${v}</dd>`;
  const grid = NAAMAKSHAR.map((padas, n) => {
    const cells = padas
      .map((s, i) => `<span class="${n === a.nakshatra && i + 1 === a.pada ? 'cur' : ''}" title="${t('pada')} ${i + 1}">${mr ? s[0] : s[1]}</span>`)
      .join('');
    return `<div class="ava-cell${n === a.nakshatra ? ' on' : ''}" title="${t('devata')}: ${nm.devata(n)} · ${t('vriksha')}: ${nm.vriksha(n)} (${nm.vrikshaBotanical(n)})"><b>${nm.nakshatra(n)}</b><i>${nm.devata(n)}</i><i class="tree">🌳 ${nm.vriksha(n)}</i><div>${cells}</div></div>`;
  }).join('');
  box.innerHTML = `
    <h2>${t('tab.avakahada')}</h2>
    <div class="date">${t('ava.for', { t: `<b>${fmtDateTime(time)}</b>`, place: esc(placeName()) })}</div>
    <p class="about">${t('ava.hint')}</p>
    <div class="ava-hero">
      <div class="ava-syl">${mr ? a.naamakshar[0] : a.naamakshar[1]}<small>${mr ? a.naamakshar[1] : a.naamakshar[0]}</small></div>
      <div><b>${nm.rashi(a.rashi)}</b> · ${nm.nakshatra(a.nakshatra)} ${t('pada')} ${a.pada}<br>
        <span>${t('devata')}: ${nm.devata(a.nakshatra)} · 🌳 ${nm.vriksha(a.nakshatra)}</span><br>
        <span>${t('ava.gana')}: ${pick(GANA[a.gana])} · ${t('ava.nadi')}: ${pick(NADI[a.nadi])} · ${t('ava.yoni')}: ${pick(YONI[a.yoni])}</span></div>
    </div>
    <dl class="kv ava-kv">
      ${row('ava.rashi', `${nm.rashi(a.rashi)} ${degIn(a.moonSid)}`)}
      ${row('ava.rashiLord', nm.graha(a.rashiLord))}
      ${row('ava.nak', `${nm.nakshatra(a.nakshatra)} · ${a.pada}`)}
      ${row('devata', nm.devata(a.nakshatra))}
      ${row('vriksha', `🌳 ${nm.vriksha(a.nakshatra)} <small style="color:var(--faint)"><i>${nm.vrikshaBotanical(a.nakshatra)}</i></small>`)}
      ${row('ava.nakLord', nm.graha(a.nakshatraLord))}
      ${row('ava.naam', `${a.naamakshar[0]} · ${a.naamakshar[1]}`)}
      ${row('ava.varna', pick(VARNA[a.varna]))}
      ${row('ava.vashya', pick(VASHYA[a.vashya]))}
      ${row('ava.yoni', pick(YONI[a.yoni]))}
      ${row('ava.gana', pick(GANA[a.gana]))}
      ${row('ava.nadi', pick(NADI[a.nadi]))}
      ${row('ava.tatva', pick(TATVA[a.tatva]))}
      ${row('ava.lagna', `${nm.rashi(a.lagnaRashi)} ${degIn(a.lagna)}`)}
      ${row('ava.paya', `${pick(PAYA[a.paya])} <small style="color:var(--faint)">(${t('ava.house', { n: a.moonHouse })})</small>`)}
      ${row('ava.dasha', `${nm.graha(a.dasha.lord)} — ${t('ava.ymd', { y: years, m: months, d: days })}`)}
    </dl>
    <h3>${t('ava.panchang')}</h3>
    <dl class="kv">
      ${row('tithi', nm.pakshaTithi(p.tithi))}
      ${row('yoga', nm.yoga(p.yoga))}
      ${row('karana', nm.karana(p.karana))}
      ${row('vara', nm.vara(wd))}
    </dl>
    <h3>${t('ava.grid')}</h3>
    <div class="ava-grid">${grid}</div>
    <p style="color:var(--faint);font-size:11px;margin-top:10px">${t('ava.note')}</p>`;
}

function renderFestival() {
  const o = selected;
  if (!o || !bundle) {
    els.details.innerHTML = `<div class="placeholder"><h2>${t('pickTitle')}</h2><p>${t('pickText')}</p></div>`;
    return;
  }
  let when = fmtDate(o.date);
  if (o.endDate) {
    const days = Math.round((parseDate(o.endDate).getTime() - parseDate(o.date).getTime()) / 86400000) + 1;
    when = `<b>${fmtDate(o.date, false)}</b> → <b>${fmtDate(o.endDate)}</b> · ${t('days', { n: days })}`;
  } else {
    when = `<b>${when}</b>`;
    if (o.window && o.window[0] !== o.window[1]) when += ` · ${fmtTime(o.window[0])}–${fmtTime(o.window[1])}`;
    else when += ` · ${fmtTime(o.moment)}`;
  }
  const same = bundle.occurrences.filter((x) => x.defId === o.defId);
  const idx = same.indexOf(o);
  els.details.innerHTML = `
    <div class="kicker c-${o.category}">${nm.catKicker(o.category)}${o.region !== 'all' ? ` · ${t(`region.tag.${o.region}`)}` : ''}</div>
    <h2>${esc(oName(o))}</h2>
    ${oAlt(o) ? `<div class="mrname">${esc(oAlt(o)!)}</div>` : ''}
    <div class="date">${when}</div>
    <p class="about">${esc(oAbout(o))}</p>
    <div class="elong">${elongSvg(skyState(o.moment, place()).elongation)}<div class="txt"><b>${t('angleTitle')}</b>${t('angleText')}</div></div>
    <h3>${t('why')}</h3>
    <ul class="why">${whyItems(o).map((x) => `<li>${x}</li>`).join('')}</ul>
    ${whyFor(o.defId).length ? `<div class="why-related"><b>💡 ${t('why.related')}</b>${whyFor(o.defId).map((e) => `<button class="link" data-whyopen="${e.id}">${esc(whyTitle(e))}</button>`).join('')}</div>` : ''}
    ${o.notes.length ? `<h3>${t('notes')}</h3><ul class="notes"${isMr() ? ' lang="en"' : ''}>${o.notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>` : ''}
    <div class="btn-row">
      <button id="d-jump">${t('jump')}</button>
      <button id="d-sky">${t('seeSky')}</button>
      ${same.length > 1 ? `<button id="d-prev" ${idx <= 0 ? 'disabled' : ''}>${t('prev')}</button><button id="d-next" ${idx >= same.length - 1 ? 'disabled' : ''}>${t('next')}</button>` : ''}
    </div>
    <h3 id="live-h">${t('skyAtSelected')}</h3>
    <div id="live"></div>`;
  $('d-jump').onclick = () => setTime(o.moment);
  els.details.querySelectorAll<HTMLButtonElement>('[data-whyopen]').forEach((b) => {
    b.onclick = () => {
      pendingWhy = b.dataset.whyopen!;
      prefs.detailsTab = 'why';
      savePrefs();
      renderDetails();
    };
  });
  $('d-sky').onclick = () => {
    setTime(o.moment);
    setView('sky');
  };
  if (same.length > 1) {
    $('d-prev').onclick = () => same[idx - 1] && select(same[idx - 1], true);
    $('d-next').onclick = () => same[idx + 1] && select(same[idx + 1], true);
  }
  renderLive();
}

let liveTimer = 0;
function renderLive() {
  const box = document.getElementById('live');
  if (!box || !bundle || !sky) return;
  const now = performance.now();
  if (playing && now - liveTimer < 250) return;
  liveTimer = now;
  const p = panchangAt(time, bundle.months);
  const date = localISO(time).slice(0, 10);
  const d = dayMap.get(date);
  const mA = p.month ? mLabel(p.month.month, p.month.adhik, p.tithi, 'amanta') : '—';
  const mP = p.month ? mLabel(p.month.month, p.month.adhik, p.tithi, 'purnimanta') : '—';
  const wd = parseDate(date).getUTCDay();
  const h = document.getElementById('live-h');
  if (h) h.textContent = t('skyAt', { t: fmtDateTime(time) });
  box.innerHTML = `<dl class="kv">
      <dt>${t('tithi')}</dt><dd>${nm.pakshaTithi(p.tithi)} (${t('elapsed', { p: (p.tithiProgress * 100).toFixed(0) })})</dd>
      <dt>${t('masa')}</dt><dd>${esc(mA)} <span style="color:var(--faint)">${t('amanta')}</span> · ${esc(mP)} <span style="color:var(--faint)">${t('purnimanta')}</span></dd>
      <dt>${t('nakshatra')}</dt><dd>${nm.nakshatra(p.nakshatra)} · ${t('pada')} ${p.nakshatraPada}</dd>
      <dt>${t('devata')}</dt><dd>${nm.devata(p.nakshatra)}</dd>
      <dt>${t('vriksha')}</dt><dd>🌳 ${nm.vriksha(p.nakshatra)}</dd>
      <dt>${t('yoga')}</dt><dd>${nm.yoga(p.yoga)}</dd>
      <dt>${t('karana')}</dt><dd>${nm.karana(p.karana)}${nm.isVishti(p.karana) ? ` <b style="color:#ff8f8f">(${t('bhadra')})</b>` : ''}</dd>
      <dt>${t('vara')}</dt><dd>${nm.vara(wd)}</dd>
      ${d ? `<dt>${t('sunriseSet')}</dt><dd>${fmtTime(d.sunrise)} · ${fmtTime(d.sunset)}</dd><dt>${t('moonrise')}</dt><dd>${d.moonrise ? fmtTime(d.moonrise) : '—'}</dd>` : ''}
    </dl>
    <h3>${t('grahasHead')}</h3>
    <table class="grahas"><thead><tr><th>${t('graha')}</th><th>${t('rashi')}</th><th>°</th><th>${t('nakshatra')}</th><th></th></tr></thead><tbody>
    ${GRAHAS.map((g) => {
      const st = sky!.grahas[g];
      const retro = st.speed < 0 && g !== 'Rahu' && g !== 'Ketu';
      return `<tr class="${st.alt > 0 ? 'up' : ''}"><td>${nm.graha(g)}</td><td>${nm.rashi(Math.floor(st.sid / 30))}</td><td>${degIn(st.sid)}</td><td>${nm.nakshatra(Math.floor(st.sid / (360 / 27)))}</td><td class="r">${retro ? '℞' : ''}</td></tr>`;
    }).join('')}
    </tbody></table>
    <p style="color:var(--faint);font-size:11px;margin-top:8px">${t('grahaFoot', { place: esc(placeName()), a: sky.ayanamsa.toFixed(3) })}</p>`;
}

// ── View tools ─────────────────────────────────────────────────────────
const toolState = { follow: false };
function renderTools() {
  const v = scene.view;
  const o = scene.opts;
  const btn = (key: keyof typeof o, text: string) => `<button data-opt="${key}" class="${o[key] ? 'on' : ''}">${text}</button>`;
  let html = '';
  if (v === 'sky') {
    html += `<div class="grp">${(['Sun', 'Moon', 'Venus', 'Jupiter', 'Saturn'] as Graha[]).map((g) => `<button data-look="${g}">${nm.graha(g)}</button>`).join('')}</div>`;
    html += `<div class="grp">${btn('labels', t('tool.labels'))}${btn('nakshatras', t('tool.yogatara'))}${btn('ground', t('tool.ground'))}<button data-follow class="${toolState.follow ? 'on' : ''}">${t('tool.follow')}</button></div>`;
  } else {
    html += `<div class="grp"><button data-preset="top">${t('tool.top')}</button><button data-preset="tilt">${t('tool.tilt')}</button><button data-preset="side">${t('tool.side')}</button></div>`;
    html += `<div class="grp">${btn('labels', t('tool.labels'))}${btn('nakshatras', t('tool.nak'))}${v === 'helio' ? btn('sightlines', t('tool.sight')) : ''}</div>`;
  }
  els.tools.innerHTML = html;
  els.tools.querySelectorAll<HTMLButtonElement>('[data-opt]').forEach((b) => {
    b.onclick = () => {
      const k = b.dataset.opt as keyof typeof o;
      scene.setOptions({ [k]: !o[k] });
      renderTools();
    };
  });
  els.tools.querySelectorAll<HTMLButtonElement>('[data-preset]').forEach((b) => (b.onclick = () => scene.preset(b.dataset.preset as 'top')));
  els.tools.querySelectorAll<HTMLButtonElement>('[data-look]').forEach((b) => (b.onclick = () => scene.lookAt(b.dataset.look as Graha)));
  const f = els.tools.querySelector<HTMLButtonElement>('[data-follow]');
  if (f) f.onclick = () => {
    toolState.follow = !toolState.follow;
    scene.followFocus = toolState.follow;
    renderTools();
  };
}

// ── Timeline ───────────────────────────────────────────────────────────
let tlStart = 0;
let tlEnd = 1;
const tlX = (ms: number) => ((ms - tlStart) / (tlEnd - tlStart)) * 100;
let headEl: HTMLDivElement;
let tipEl: HTMLDivElement;
let eventsEl: HTMLDivElement;

function renderTimeline() {
  if (!bundle) return;
  tlStart = Date.UTC(prefs.year, 0, 1) - tzMs();
  tlEnd = Date.UTC(prefs.year + 1, 0, 1) - tzMs();
  const tl = els.timeline;
  const monthsHtml = Array.from({ length: 12 }, (_, i) => `<span style="left:${tlX(Date.UTC(prefs.year, i, 1) - tzMs())}%">${nm.monthShort(i)}</span>`).join('');
  const runs = monthRuns();
  const lunarHtml = runs
    .map((r, i) => {
      const a = Math.max(0, tlX(Date.UTC(+r.from.slice(0, 4), +r.from.slice(5, 7) - 1, +r.from.slice(8)) - tzMs()));
      const b = Math.min(100, tlX(Date.UTC(+r.to.slice(0, 4), +r.to.slice(5, 7) - 1, +r.to.slice(8) + 1) - tzMs()));
      if (b <= 0 || a >= 100) return '';
      const shown = isMr() ? r.labelMr : r.label;
      return `<div class="${r.label.startsWith('Adhik') ? 'adhik' : i % 2 ? 'odd' : 'even'}" style="left:${a}%;width:${b - a}%" title="${esc(shown)}">${esc(shown)}</div>`;
    })
    .join('');
  // Period lanes
  const spans = visible.filter((o) => o.endDate);
  const lanes: number[] = [];
  const periodHtml = spans
    .map((o) => {
      const a = Math.max(0, tlX(Date.UTC(+o.date.slice(0, 4), +o.date.slice(5, 7) - 1, +o.date.slice(8)) - tzMs()));
      const b = Math.min(100, tlX(Date.UTC(+o.endDate!.slice(0, 4), +o.endDate!.slice(5, 7) - 1, +o.endDate!.slice(8) + 1) - tzMs()));
      let lane = lanes.findIndex((end) => end <= a);
      if (lane < 0 || lane > 2) {
        lane = lanes.length < 3 ? lanes.length : lanes.indexOf(Math.min(...lanes));
      }
      lanes[lane] = b;
      return `<div class="c-${o.category}" data-key="${esc(o.key)}" data-name="${esc(oName(o))}" style="left:${a}%;width:${Math.max(0.3, b - a)}%;top:${lane * 10}px"></div>`;
    })
    .join('');
  tl.innerHTML = `<div class="tl-months">${monthsHtml}</div><div class="tl-lunar">${lunarHtml}</div>
    <div class="tl-periods">${periodHtml}</div><div class="tl-events"></div><div class="tl-head"></div><div class="tl-tip"></div>`;
  headEl = tl.querySelector('.tl-head')!;
  tipEl = tl.querySelector('.tl-tip')!;
  eventsEl = tl.querySelector('.tl-events')!;
  renderTimelineMarks();
  positionHead();
}

function renderTimelineMarks() {
  if (!eventsEl) return;
  eventsEl.innerHTML = visible
    .filter((o) => !o.endDate)
    .map((o) => `<i class="c-${o.category}${selected?.key === o.key ? ' sel' : ''}" data-key="${esc(o.key)}" data-name="${esc(oName(o))}" style="left:${tlX(o.moment)}%"></i>`)
    .join('');
}

function positionHead() {
  if (headEl) headEl.style.left = `${tlX(time)}%`;
}

function initTimeline() {
  const tl = els.timeline;
  let dragging = false;
  const msAt = (e: PointerEvent) => {
    const r = tl.getBoundingClientRect();
    return tlStart + ((e.clientX - r.left) / r.width) * (tlEnd - tlStart);
  };
  tl.addEventListener('pointerdown', (e) => {
    const t = e.target as HTMLElement;
    const key = t.dataset.key;
    if (key) {
      const o = bundle?.occurrences.find((x) => x.key === key);
      if (o) select(o, true);
      return;
    }
    dragging = true;
    tl.setPointerCapture(e.pointerId);
    setTime(msAt(e));
  });
  tl.addEventListener('pointermove', (e) => {
    if (dragging) setTime(msAt(e));
    const t = e.target as HTMLElement;
    if (t.dataset.name) {
      const r = tl.getBoundingClientRect();
      tipEl.style.display = 'block';
      tipEl.style.left = `${e.clientX - r.left}px`;
      tipEl.textContent = t.dataset.name;
    } else if (tipEl) tipEl.style.display = 'none';
  });
  tl.addEventListener('pointerup', () => (dragging = false));
  tl.addEventListener('pointerleave', () => tipEl && (tipEl.style.display = 'none'));
}

// ── Loop ───────────────────────────────────────────────────────────────
let last = performance.now();
function tick(now: number) {
  const dt = (now - last) / 1000;
  last = now;
  if (playing && bundle) {
    const next = time + Number(els.speed.value) * dt;
    const hi = Date.UTC(prefs.year + 1, 0, 1) - tzMs() - 60000;
    setTime(next);
    if (next >= hi) setPlaying(false);
  }
  requestAnimationFrame(tick);
}

// ── Boot ───────────────────────────────────────────────────────────────
initControls();
initTimeline();
applyStaticText();
setView(prefs.view);
renderDetails();
recompute(false);
requestAnimationFrame(tick);
