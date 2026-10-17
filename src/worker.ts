// Computes a year's panchang off the main thread so the 3D view stays smooth.
import { computeAll } from './panchang/index.ts';
import type { MonthSystem } from './panchang/festivals.ts';

self.onmessage = (e: MessageEvent<{ id: number; year: number; placeId: string; system: MonthSystem }>) => {
  const { id, year, placeId, system } = e.data;
  try {
    const t0 = performance.now();
    const bundle = computeAll(year, placeId, system);
    (self as unknown as Worker).postMessage({ id, bundle, ms: performance.now() - t0 });
  } catch (err) {
    (self as unknown as Worker).postMessage({ id, error: String(err) });
  }
};
