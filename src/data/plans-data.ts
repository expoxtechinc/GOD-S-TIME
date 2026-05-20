import { FastingPlan } from '../types';

export const FASTING_PLAN_CATALOG: FastingPlan[] = [
  {
    id: 'f1',
    name: 'Daniel Fast (Clean Living)',
    durationDays: 21,
    focusedVerses: ['Daniel 10:2-3', 'Daniel 1:12'],
    description: 'Focus exclusively on clean, natural foods, vegetables and water. Denying fleshly sweets to amplify spiritual clarity.',
    guidelines: 'Abstain from meat, animal products, sweets, dairy and processed foods. Feast upon scriptural studies and pray 3 times daily.'
  },
  {
    id: 'f2',
    name: '3-Day Esther Fast (Dry Fast)',
    durationDays: 3,
    focusedVerses: ['Esther 4:16'],
    description: 'Absolute abstinence from food and water for 3 days to invoke intense divine intervention, protection and breaking of curses.',
    guidelines: 'No bread or water for 3 full days. Dedicate hours to deep worship and reading of Esther & Nehemiah. Break fast on Day 4 with light fluids.'
  },
  {
    id: 'f3',
    name: '1-Week Spiritual Awakening Fast',
    durationDays: 7,
    focusedVerses: ['Isaiah 58:6-8'],
    description: 'Partial fast focused on unlocking loose bonds, breaking heavy burdens, letting the oppressed go free, and spiritual awakening.',
    guidelines: 'Fast daily from 6:00 AM to 6:00 PM. Read daily devotions, pray for Liberia’s restoration, and break daily with a humble evening meal.'
  }
];

export const BIBLE_STUDY_PLANS = [
  {
    id: 'p1',
    name: '30-Day New Believers timing',
    duration: '30 Days',
    description: 'An introductory reading journey crossing the Gospels, Acts, and essential teachings in Romans.',
    activeDays: 14,
    recommendedFor: 'New converts'
  },
  {
    id: 'p2',
    name: '90-Day Wisdom & Psalms Alignment',
    duration: '90 Days',
    description: 'Nurture deep devotion by completing the entirety of Psalms, Proverbs, Ecclesiastes, and Job.',
    activeDays: 0,
    recommendedFor: 'Poetry & wisdom lovers'
  },
  {
    id: 'p3',
    name: '1-Year Full Gospel & Law Chronology',
    duration: '1 Year',
    description: 'Read the complete Old Bible and New Bible of 66 books chronologically from Genesis to Revelation.',
    activeDays: 4,
    recommendedFor: 'Discipleship experts'
  }
];
