// Spot-checks well-known festival dates in other years to catch rule regressions.
// Usage: npm run regression
import { computeAll } from '../src/panchang/index.ts';
const expect: Record<number, Record<string, string>> = {
  2025: { 'maha-shivaratri': '2025-02-26', holi: '2025-03-14', 'ram-navami': '2025-04-06', 'akshaya-tritiya': '2025-04-30',
    'ekadashi-devshayani': '2025-07-06', 'guru-purnima': '2025-07-10', 'raksha-bandhan': '2025-08-09',
    hartalika: '2025-08-26', 'ganesh-chaturthi': '2025-08-27', ghatasthapana: '2025-09-22', dussehra: '2025-10-02',
    'karva-chauth': '2025-10-10', diwali: '2025-10-20', 'ekadashi-prabodhini': '2025-11-01' },
  2023: { 'ekadashi-padmini': '2023-07-29', 'ekadashi-parama': '2023-08-12', diwali: '2023-11-12', 'raksha-bandhan': '2023-08-30',
    janmashtami: '2023-09-06', 'ganesh-chaturthi': '2023-09-19', dussehra: '2023-10-24' },
};
let ok = 0, bad = 0;
for (const [y, exp] of Object.entries(expect)) {
  const b = computeAll(Number(y), 'pune', 'amanta');
  for (const [id, d] of Object.entries(exp)) {
    const got = b.occurrences.filter((o) => o.defId === id).map((o) => o.date);
    if (got.includes(d)) ok++;
    else { bad++; console.log(y, id, 'expected', d, 'got', got.join(',')); }
  }
}
console.log(`${ok} ok, ${bad} mismatched`);
