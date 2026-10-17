// "Why? / का?" tab — story-style answers to the reasons behind panchang rules, each backed by
// labelled evidence (shastra / sky / ritu-Ayurveda / interpretation) and a "Show in sky" jump.
import { WHY, WHY_THEMES, type WhyEntry, type WhyTheme } from '../data/why.ts';
import { t, lang } from '../i18n.ts';

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const L = (p: [string, string]) => (lang() === 'mr' ? p[1] : p[0]);

const EVIDENCE_LABEL: Record<string, [string, string]> = {
  shastra: ['Shastra', 'शास्त्र'],
  sky: ['Sky', 'आकाश'],
  ritu: ['Ritu · Ayurveda', 'ऋतू · आयुर्वेद'],
  interpretation: ['Interpretation', 'अर्थ / अनुमान'],
};
const CONF_LABEL: Record<string, [string, string]> = {
  high: ['High confidence', 'उच्च विश्वासार्हता'],
  medium: ['Medium confidence', 'मध्यम विश्वासार्हता'],
  speculative: ['Speculative', 'अनुमानात्मक'],
};
const VERDICT: Record<string, [string, string]> = {
  holds: ['holds', 'खरे'],
  partly: ['partly true', 'अंशतः खरे'],
  'does not hold': ['does not hold', 'टिकत नाही'],
};

export interface WhyHooks {
  /** jump the sky to a festival occurrence (by defId) or an explicit ISO instant; returns false if unavailable */
  show: (target: { defId?: string; iso?: string; view: 'geo' | 'sky' | 'helio' }) => boolean;
  /** question id to open first */
  open?: string;
}

const state = { query: '', open: new Set<string>() };

function entryHtml(e: WhyEntry): string {
  const isOpen = state.open.has(e.id);
  const ev = e.evidence.map((x) => `<li class="ev ev-${x.type}"><span class="tag">${L(EVIDENCE_LABEL[x.type])}</span>${esc(L([x.en, x.mr]))}
      ${x.source ? `<small>${esc(x.source)}${x.verified === false ? ` · <em>${t('why.unverified')}</em>` : ''}${x.url ? ` · <a href="${esc(x.url)}" target="_blank" rel="noopener">${t('why.link')}</a>` : ''}</small>` : ''}</li>`).join('');
  const myths = (e.myths ?? []).map((m) => `<li><b>${esc(L(m.myth))}</b> — <span class="verdict v-${m.verdict.replace(/\s/g, '')}">${L(VERDICT[m.verdict])}</span>. ${esc(L(m.why))}</li>`).join('');
  const sky = (e.sky ?? []).map((s, i) => `<button class="text-btn why-sky" data-why="${e.id}" data-i="${i}">🔭 ${esc(L(s.label))}</button>`).join('');
  return `<article class="why-card${isOpen ? ' open' : ''}" id="why-${e.id}">
    <button class="why-q" data-toggle="${e.id}" aria-expanded="${isOpen}"><span class="num">${e.q}</span><span>${esc(L(e.title))}</span><i>${isOpen ? '−' : '+'}</i></button>
    <p class="why-short">${esc(L(e.short))}</p>
    ${isOpen ? `<div class="why-body">
      ${L(e.story).split('\n\n').map((p) => `<p>${esc(p)}</p>`).join('')}
      <div class="eureka"><b>💡 ${t('why.eureka')}</b>${esc(L(e.eureka))}</div>
      ${sky ? `<div class="why-actions">${sky}</div>` : ''}
      <h4>${t('why.evidence')}</h4><ul class="ev-list">${ev}</ul>
      ${myths ? `<h4>${t('why.myths')}</h4><ul class="myth-list">${myths}</ul>` : ''}
      <p class="why-conf c-${e.confidence}">${L(CONF_LABEL[e.confidence])}${e.confidenceNote ? ` — ${esc(L(e.confidenceNote))}` : ''}</p>
      ${e.sources.length ? `<details class="why-src"><summary>${t('why.sources')} (${e.sources.length})</summary><ol>${e.sources.map((s) => `<li>${s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a>` : esc(s.title)}</li>`).join('')}</ol></details>` : ''}
    </div>` : ''}
  </article>`;
}

export function renderWhy(box: HTMLElement, hooks: WhyHooks) {
  if (hooks.open) {
    // arriving from a festival card: show just that answer, expanded
    state.open = new Set([hooks.open]);
    state.query = '';
  }
  const q = state.query.trim().toLowerCase();
  const match = (e: WhyEntry) => !q || [...e.title, ...e.short, ...e.story].join(' ').toLowerCase().includes(q);
  const groups = WHY_THEMES.map((th: { id: WhyTheme; name: [string, string] }) => {
    const items = WHY.filter((e) => e.theme === th.id && match(e));
    if (!items.length) return '';
    return `<section class="why-theme"><h3>${esc(L(th.name))}</h3>${items.map(entryHtml).join('')}</section>`;
  }).join('');
  box.innerHTML = `
    <h2>${t('why.title')}</h2>
    <p class="about">${t('why.intro')}</p>
    <input type="search" class="why-search" placeholder="${t('why.search')}" value="${esc(state.query)}">
    ${groups || `<p class="warn">${t('empty')}</p>`}
    <p class="fine">${t('why.disclaimer')}</p>`;
  const input = box.querySelector<HTMLInputElement>('.why-search')!;
  input.oninput = () => {
    state.query = input.value;
    const pos = input.selectionStart;
    renderWhy(box, { ...hooks, open: undefined });
    const again = box.querySelector<HTMLInputElement>('.why-search')!;
    again.focus();
    again.setSelectionRange(pos, pos);
  };
  box.querySelectorAll<HTMLButtonElement>('[data-toggle]').forEach((b) => {
    b.onclick = () => {
      const id = b.dataset.toggle!;
      if (state.open.has(id)) state.open.delete(id);
      else state.open.add(id);
      renderWhy(box, { ...hooks, open: undefined });
      box.querySelector(`#why-${CSS.escape(id)}`)?.scrollIntoView({ block: 'nearest' });
    };
  });
  box.querySelectorAll<HTMLButtonElement>('.why-sky').forEach((b) => {
    b.onclick = () => {
      const e = WHY.find((x) => x.id === b.dataset.why)!;
      const s = e.sky![Number(b.dataset.i)];
      hooks.show({ defId: s.defId, iso: s.iso, view: s.view });
    };
  });
  if (hooks.open) box.querySelector(`#why-${CSS.escape(hooks.open)}`)?.scrollIntoView({ block: 'start' });
}

/** Questions related to a festival (for the Festival tab). */
export function whyFor(defId: string): WhyEntry[] {
  return WHY.filter((e) => e.festivals.includes(defId));
}
export const whyTitle = (e: WhyEntry) => L(e.title);
