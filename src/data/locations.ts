export interface Place {
  id: string;
  name: string;
  /** Marathi name */
  mr: string;
  lat: number;
  lon: number;
  height: number;
  /** UTC offset in hours (India has no DST). */
  tz: number;
}

export const PLACES: Place[] = [
  { id: 'pune', name: 'Pune', mr: 'पुणे', lat: 18.5204, lon: 73.8567, height: 560, tz: 5.5 },
  { id: 'mumbai', name: 'Mumbai', mr: 'मुंबई', lat: 19.076, lon: 72.8777, height: 14, tz: 5.5 },
  { id: 'nashik', name: 'Nashik', mr: 'नाशिक', lat: 19.9975, lon: 73.7898, height: 584, tz: 5.5 },
  { id: 'nagpur', name: 'Nagpur', mr: 'नागपूर', lat: 21.1458, lon: 79.0882, height: 310, tz: 5.5 },
  { id: 'kolhapur', name: 'Kolhapur', mr: 'कोल्हापूर', lat: 16.705, lon: 74.2433, height: 569, tz: 5.5 },
  { id: 'pandharpur', name: 'Pandharpur', mr: 'पंढरपूर', lat: 17.6792, lon: 75.3319, height: 460, tz: 5.5 },
  { id: 'ujjain', name: 'Ujjain', mr: 'उज्जैन', lat: 23.1765, lon: 75.7885, height: 491, tz: 5.5 },
  { id: 'delhi', name: 'New Delhi', mr: 'नवी दिल्ली', lat: 28.6139, lon: 77.209, height: 216, tz: 5.5 },
  { id: 'varanasi', name: 'Varanasi', mr: 'वाराणसी', lat: 25.3176, lon: 82.9739, height: 80, tz: 5.5 },
  { id: 'kolkata', name: 'Kolkata', mr: 'कोलकाता', lat: 22.5726, lon: 88.3639, height: 9, tz: 5.5 },
  { id: 'chennai', name: 'Chennai', mr: 'चेन्नई', lat: 13.0827, lon: 80.2707, height: 6, tz: 5.5 },
  { id: 'bengaluru', name: 'Bengaluru', mr: 'बंगळुरू', lat: 12.9716, lon: 77.5946, height: 920, tz: 5.5 },
  { id: 'ahmedabad', name: 'Ahmedabad', mr: 'अहमदाबाद', lat: 23.0225, lon: 72.5714, height: 53, tz: 5.5 },
];

export const DEFAULT_PLACE = PLACES[0];
