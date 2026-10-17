// Prints the resolved festival list. Usage: npm run list -- [year] [placeId] [categories]
import { computeYear } from '../src/panchang/engine.ts';
import { resolveFestivals } from '../src/panchang/festivals.ts';
import { PLACES } from '../src/data/locations.ts';
const year = Number(process.argv[2] ?? 2026);
const place = PLACES.find(p => p.id === (process.argv[3] ?? 'pune'))!;
const t0 = performance.now();
const y = computeYear(year, place);
const occ = resolveFestivals(y);
console.log('computed in', Math.round(performance.now() - t0), 'ms;', occ.length, 'occurrences');
const cats = process.argv[4]?.split(',') ?? ['utsav','vrat','ekadashi','period','sankranti'];
for (const o of occ.filter(o => cats.includes(o.category))) console.log(o.date, o.endDate ? '→ ' + o.endDate : '', o.name, '|', o.notes.join(' ; '));
