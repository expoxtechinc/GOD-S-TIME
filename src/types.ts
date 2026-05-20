export interface BibleBook {
  id: string;
  name: string;
  testament: 'Old' | 'New';
  chaptersCount: number;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
  type: 'Biblical' | 'Pastoral' | 'Christian Author' | 'African Leader' | 'Affirmation' | 'Original';
  reference?: string;
}

export interface Goal {
  id: string;
  title: string;
  category: 'Spiritual' | 'Personal' | 'Professional';
  targetDate: string;
  verses: string[];
  quotes: string[];
  milestones: { id: string; text: string; completed: boolean }[];
  completed: boolean;
}

export interface Habit {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly';
  streak: number;
  lastCompleted?: string; // YYYY-MM-DD
  history: string[]; // List of completed dates (YYYY-MM-DD)
}

export interface SOSVerse {
  verse: string;
  text: string;
}

export interface SOSTemptation {
  id: string;
  name: string;
  icon: string;
  verses: SOSVerse[];
  devotionalText: string;
  victoryQuote: string;
}

export interface PrayerRequest {
  id: string;
  author: string;
  text: string;
  location: string;
  timestamp: string;
  prayerCount: number;
  hasPrayed?: boolean;
}

export interface FastingPlan {
  id: string;
  name: string;
  durationDays: number;
  focusedVerses: string[];
  description: string;
  guidelines: string;
}

export interface WorshipHymn {
  id: string;
  title: string;
  lyrics: string;
  theme: string;
  author?: string;
  chords?: string;
}

export interface Church {
  id: string;
  name: string;
  pastor: string;
  denomination: string;
  location: string;
  coordinates: { lat: number; lng: number };
  serviceTimes: string[];
  contact: string;
  district: string;
}

export interface UserProfile {
  name: string;
  denomination: string;
  region: string;
  spiritualStory: string;
  onboardingCompleted: boolean;
  readingStreak: number;
  points: number;
  badges: string[];
  bibleLanguage: string; // 'English' | 'Bassa' | 'Kpelle' | 'Vai' | 'Kru' etc.
}

export interface BibleNote {
  id: string;
  ref: string; // e.g. "John 3:16"
  text: string;
  color?: string; // highlight color
  timestamp: string;
}
