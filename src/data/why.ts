// "Why?" questions: story-style answers to the reasons behind panchang rules.
// Every answer keeps its evidence labelled: shastra (texts), sky (astronomy the app can show),
// ritu (season / Ayurveda reasoning) and interpretation (a reasoned hypothesis).
// Sky facts quoted here were computed with this app's engine over 2000–2050
// (see scripts/why-evidence.ts).

export type WhyTheme = 'sunmoon' | 'season' | 'ancestors' | 'planets';
type Bi = [string, string];

export interface WhyEvidence {
  type: 'shastra' | 'sky' | 'ritu' | 'interpretation';
  en: string;
  mr: string;
  source?: string;
  url?: string;
  /** false when the exact passage could not be checked */
  verified?: boolean;
}

export interface WhyEntry {
  id: string;
  q: number;
  theme: WhyTheme;
  /** festival defIds this question explains (shown on those festivals' cards) */
  festivals: string[];
  title: Bi;
  short: Bi;
  /** paragraphs separated by blank lines */
  story: Bi;
  eureka: Bi;
  evidence: WhyEvidence[];
  myths?: { myth: Bi; verdict: 'holds' | 'partly' | 'does not hold'; why: Bi }[];
  confidence: 'high' | 'medium' | 'speculative';
  confidenceNote?: Bi;
  /** "Show in sky": a festival of the selected year (defId) or a fixed instant (iso, UTC) */
  sky?: { label: Bi; defId?: string; iso?: string; view: 'geo' | 'sky' | 'helio' }[];
  sources: { title: string; url?: string }[];
}

export const WHY_THEMES: { id: WhyTheme; name: Bi }[] = [
  { id: 'sunmoon', name: ['Sun & Moon', 'सूर्य आणि चंद्र'] },
  { id: 'season', name: ['Seasons & Ayurveda', 'ऋतू आणि आयुर्वेद'] },
  { id: 'ancestors', name: ['Ancestors, dharma & nature', 'पितर, धर्म आणि निसर्ग'] },
  { id: 'planets', name: ['Planets & matching', 'ग्रह आणि गुणमिलन'] },
];

import { SUNMOON_WHY } from './why/sunmoon.ts';
import { SEASON_WHY } from './why/season.ts';
import { ANCESTORS_WHY } from './why/ancestors.ts';
import { PLANETS_WHY } from './why/planets.ts';

export const WHY: WhyEntry[] = [...SUNMOON_WHY, ...SEASON_WHY, ...ANCESTORS_WHY, ...PLANETS_WHY].sort((a, b) => a.q - b.q);
