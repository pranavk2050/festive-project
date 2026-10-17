// Printable yearly calendar (Kalnirnay-style month grids). Rendered as an overlay of A4
// landscape sheets; the browser's print dialog turns it into paper or a PDF.
import type { YearBundle, Occurrence, Day } from '../panchang/index.ts';
import { monthLabel } from '../panchang/index.ts';
import { nm, t, lang } from '../i18n.ts';
import type { Category } from '../panchang/rules.ts';

const SHOWN: Category[] = ['utsav', 'vrat', 'ekadashi', 'sankranti', 'grahan'];
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

export interface PrintOptions {
  bundle: YearBundle;
  system: 'amanta' | 'purnimanta';
  placeName: string;
  /** name of an occurrence in the current language */
  name: (o: Occurrence) => string;
  /** region filter currently applied in the list */
  regionOk: (o: Occurrence) => boolean;
}

function dayCell(d: Day, items: Occurrence[], starts: Occurrence[], system: PrintOptions['system'], name: PrintOptions['name']): string {
  const mr = lang() === 'mr';
  const x = new Date(`${d.date}T00:00:00Z`);
  const tithiShort = `${mr ? (d.tithi <= 15 ? 'शु.' : 'व.') : d.tithi <= 15 ? 'S.' : 'K.'} ${nm.tithi(d.tithi)}`;
  const moon = d.tithi === 15 ? '<i class="pc-moon full" title="Purnima"></i>' : d.tithi === 30 ? '<i class="pc-moon new" title="Amavasya"></i>' : '';
  const fest = [...items.slice(0, 3).map((o) => `<li class="c-${o.category}">${esc(name(o))}</li>`),
    ...starts.slice(0, 1).map((o) => `<li class="c-period">▸ ${esc(name(o))}</li>`)].join('');
  const more = items.length > 3 ? `<li class="more">+${items.length - 3}</li>` : '';
  const monthStart = d.tithi === 1 || (d.tithi === 16 && system === 'purnimanta');
  return `<div class="pc-day${x.getUTCDay() === 0 ? ' sun' : ''}${items.some((o) => o.category === 'utsav') ? ' fest' : ''}">
    <div class="pc-top"><b>${x.getUTCDate()}</b>${moon}<span class="pc-tithi">${tithiShort}</span></div>
    ${monthStart ? `<div class="pc-masa">${esc(monthLabel(d.month, d.adhik, d.tithi, system, mr))}</div>` : ''}
    <ul>${fest}${more}</ul>
    <div class="pc-nak">${nm.nakshatra(d.nakshatra)}</div>
  </div>`;
}

export function renderPrintCalendar(host: HTMLElement, o: PrintOptions) {
  const { bundle, system } = o;
  const mr = lang() === 'mr';
  const year = bundle.year;
  const byDate = new Map<string, Occurrence[]>();
  const startsByDate = new Map<string, Occurrence[]>();
  for (const occ of bundle.occurrences) {
    if (!o.regionOk(occ)) continue;
    if (occ.endDate && occ.category === 'period') {
      (startsByDate.get(occ.date) ?? startsByDate.set(occ.date, []).get(occ.date)!).push(occ);
    } else if (SHOWN.includes(occ.category)) {
      (byDate.get(occ.date) ?? byDate.set(occ.date, []).get(occ.date)!).push(occ);
    }
  }
  const dayMap = new Map(bundle.days.map((d) => [d.date, d]));
  const heads = Array.from({ length: 7 }, (_, i) => `<div class="pc-wd${i === 0 ? ' sun' : ''}">${nm.weekday(i)}</div>`).join('');
  const pages: string[] = [];
  for (let m = 0; m < 12; m++) {
    const first = new Date(Date.UTC(year, m, 1));
    const daysIn = new Date(Date.UTC(year, m + 1, 0)).getUTCDate();
    const cells: string[] = [];
    for (let i = 0; i < first.getUTCDay(); i++) cells.push('<div class="pc-day empty"></div>');
    const masas = new Set<string>();
    for (let d = 1; d <= daysIn; d++) {
      const date = `${year}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const day = dayMap.get(date);
      if (!day) continue;
      masas.add(monthLabel(day.month, day.adhik, day.tithi, system, mr));
      cells.push(dayCell(day, byDate.get(date) ?? [], startsByDate.get(date) ?? [], system, o.name));
    }
    pages.push(`<section class="pc-page">
      <header><h2>${nm.monthFull(m)} <span>${year}</span></h2>
        <div class="pc-meta"><b>${[...masas].map(esc).join(' → ')}</b><span>${esc(o.placeName)} · ${t(system)}</span></div></header>
      <div class="pc-grid">${heads}${cells.join('')}</div>
      <footer><span class="lg c-utsav">${nm.catChip('utsav')}</span><span class="lg c-vrat">${nm.catChip('vrat')}</span>
        <span class="lg c-ekadashi">${nm.catChip('ekadashi')}</span><span class="lg c-sankranti">${nm.catChip('sankranti')}</span>
        <span class="lg c-period">▸ ${nm.catChip('period')}</span><span class="lg"><i class="pc-moon full"></i> ${nm.tithi(15)}</span>
        <span class="lg"><i class="pc-moon new"></i> ${nm.tithi(30)}</span><em>${t('print.footer')}</em></footer>
    </section>`);
  }
  host.innerHTML = `<div class="pc-bar">
      <b>${t('print.title', { y: year })}</b>
      <span>${t('print.hint')}</span>
      <button class="text-btn primary" id="pc-print">🖨 ${t('print.print')}</button>
      <button class="text-btn" id="pc-close">✕ ${t('print.close')}</button>
    </div>
    <div class="pc-pages">${pages.join('')}</div>`;
  host.classList.add('on');
  document.body.classList.add('printing');
  host.querySelector<HTMLButtonElement>('#pc-print')!.onclick = () => window.print();
  const close = () => {
    host.classList.remove('on');
    document.body.classList.remove('printing');
    host.innerHTML = '';
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
  document.addEventListener('keydown', onKey);
  host.querySelector<HTMLButtonElement>('#pc-close')!.onclick = close;
}
