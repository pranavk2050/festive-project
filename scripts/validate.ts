// Compares the engine's 2026 Pune output with published dates (src/data/reference-2026.json).
// Usage: npm run validate [-- --verbose]
import { readFileSync } from 'node:fs';
import { computeAll } from '../src/panchang/index.ts';
import type { Occurrence } from '../src/panchang/festivals.ts';

interface Ref { id: string; name: string; date: string; confidence: string; note?: string }
const ref = JSON.parse(readFileSync(new URL('../src/data/reference-2026.json', import.meta.url), 'utf8')) as { events: Ref[] };
const verbose = process.argv.includes('--verbose');
const bundle = computeAll(2026, 'pune', 'amanta');
const occ = bundle.occurrences;

const ALIAS: Record<string, string[]> = {
  'chaitra-navratri-start': ['chaitra-navratri'],
  'adhik-maas-start': ['adhik-maas'],
  'nirjala-ekadashi': ['ekadashi-nirjala'],
  'ashadhi-ekadashi': ['ekadashi-devshayani'],
  'kartiki-ekadashi': ['ekadashi-prabodhini'],
  'hartalika-teej': ['hartalika'],
  'pitru-paksha-start': ['pitru-paksha'],
  'kojagiri-purnima': ['kojagiri'],
  'diwali-lakshmi-puja': ['diwali'],
  'govardhan-puja': ['balipratipada'],
  'chhath-puja': ['chhath'],
  'ekadashi-parsva': ['ekadashi-parivartini'],
  'solar-eclipse': ['surya-grahan'],
  'lunar-eclipse': ['chandra-grahan'],
};
const RASHI_IDX: Record<string, number> = {
  mesha: 0, vrishabha: 1, mithuna: 2, karka: 3, simha: 4, kanya: 5, tula: 6, vrishchika: 7, dhanu: 8, makara: 9, kumbha: 10, meena: 11,
};

function candidates(r: Ref): { list: Occurrence[]; useEnd?: boolean } {
  const id = r.id;
  if (id === 'adhik-maas-end') return { list: occ.filter((o) => o.defId === 'adhik-maas'), useEnd: true };
  if (id.startsWith('sankashti-')) return { list: occ.filter((o) => o.defId === 'sankashti' || o.defId === 'angarki-sankashti' || o.defId === 'karva-chauth') };
  if (id.startsWith('purnima-')) return { list: occ.filter((o) => o.defId === 'purnima') };
  if (id.startsWith('amavasya-')) return { list: occ.filter((o) => ['amavasya', 'somvati-amavasya', 'shani-amavasya'].includes(o.defId)) };
  if (id.startsWith('sankranti-')) {
    const k = RASHI_IDX[id.slice(10)];
    const defs = k === 9 ? ['makar-sankranti'] : k === 0 ? ['mesha-sankranti'] : [`sankranti-${k}`];
    return { list: occ.filter((o) => defs.includes(o.defId)) };
  }
  const base = id.replace(/-\d{4}-\d{2}-\d{2}$/, '');
  const defs = ALIAS[base] ?? [id];
  return { list: occ.filter((o) => defs.includes(o.defId)) };
}

const dayDiff = (a: string, b: string) => Math.round((Date.parse(a) - Date.parse(b)) / 86400000);
let ok = 0;
let off = 0;
let missing = 0;
const rows: string[] = [];
for (const r of ref.events) {
  const { list, useEnd } = candidates(r);
  const dates = list.map((o) => (useEnd ? o.endDate! : o.date)).filter(Boolean);
  if (!dates.length) {
    missing++;
    rows.push(`  MISSING  ${r.id.padEnd(28)} ref ${r.date}`);
    continue;
  }
  const best = dates.reduce((a, b) => (Math.abs(dayDiff(a, r.date)) <= Math.abs(dayDiff(b, r.date)) ? a : b));
  const d = dayDiff(best, r.date);
  if (d === 0) {
    ok++;
    if (verbose) rows.push(`  ok       ${r.id.padEnd(28)} ${r.date}`);
  } else {
    off++;
    rows.push(`  ${(d > 0 ? '+' : '') + d}d`.padEnd(11) + `${r.id.padEnd(28)} ref ${r.date} (${r.confidence})  ours ${best}${r.note ? `  — ${r.note}` : ''}`);
  }
}
console.log(rows.join('\n'));
const total = ref.events.length;
console.log(`\n${ok}/${total} exact (${((ok / total) * 100).toFixed(1)}%), ${off} off, ${missing} missing`);
