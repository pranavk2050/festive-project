import { type Ms, elongation, moonSidereal, sunSidereal, norm360 } from '../astro/ephemeris.ts';
import { computeYear, spanAt, type YearData, type Day, type LunarMonth } from './engine.ts';
import { resolveFestivals, type MonthSystem, type Occurrence } from './festivals.ts';
import { grahaEvents } from './graha.ts';
import { kumbhEvents } from './kumbh.ts';
import { findMuhurats, type MuhuratType, type MuhuratWindow } from './muhurat.ts';
import { PLACES, type Place } from '../data/locations.ts';
import { MONTHS, MONTHS_MR } from './constants.ts';

export interface YearBundle {
  year: number;
  place: Place;
  system: MonthSystem;
  days: Day[];
  months: LunarMonth[];
  occurrences: Occurrence[];
  muhurat: Record<MuhuratType, MuhuratWindow[]>;
}

export function computeAll(year: number, placeId: string, system: MonthSystem): YearBundle {
  const place = PLACES.find((p) => p.id === placeId) ?? PLACES[0];
  const y: YearData = computeYear(year, place);
  const occurrences = [...resolveFestivals(y, system), ...grahaEvents(y), ...kumbhEvents(y)];
  occurrences.sort((a, b) => a.date.localeCompare(b.date) || a.moment - b.moment);
  const muhurat = findMuhurats(y, occurrences, system);
  return { year, place, system, days: y.days, months: y.months, occurrences, muhurat };
}

export interface InstantPanchang {
  tithi: number;
  /** fraction of the tithi elapsed */
  tithiProgress: number;
  nakshatra: number;
  nakshatraPada: number;
  yoga: number;
  karana: number;
  sunRashi: number;
  moonRashi: number;
  month?: { month: number; adhik: boolean };
  elongation: number;
  sunSid: number;
  moonSid: number;
}

export function panchangAt(ms: Ms, months: LunarMonth[]): InstantPanchang {
  const el = elongation(ms);
  const sun = sunSidereal(ms);
  const moon = moonSidereal(ms);
  const nakSize = 360 / 27;
  const m = spanAt(months.map((x) => ({ ...x, n: x.month })), ms);
  return {
    tithi: Math.floor(el / 12) + 1,
    tithiProgress: (el % 12) / 12,
    nakshatra: Math.floor(moon / nakSize),
    nakshatraPada: Math.floor((moon % nakSize) / (nakSize / 4)) + 1,
    yoga: Math.floor(norm360(sun + moon) / nakSize),
    karana: Math.floor(el / 6),
    sunRashi: Math.floor(sun / 30),
    moonRashi: Math.floor(moon / 30),
    month: m ? { month: m.month, adhik: m.adhik } : undefined,
    elongation: el,
    sunSid: sun,
    moonSid: moon,
  };
}

/** Lunar month label for a given amanta month + tithi under the chosen system. */
export function monthLabel(month: number, adhik: boolean, tithi: number, system: MonthSystem, mr = false): string {
  const idx = system === 'purnimanta' && tithi > 15 && !adhik ? (month + 1) % 12 : month;
  const names = mr ? MONTHS_MR : MONTHS;
  return (adhik ? (mr ? 'अधिक ' : 'Adhik ') : '') + names[idx];
}

export type { Occurrence, MonthSystem, Day, LunarMonth, MuhuratType, MuhuratWindow };
