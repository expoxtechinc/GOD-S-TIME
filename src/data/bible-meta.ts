import { BibleBook } from '../types';

export const BIBLE_BOOKS: BibleBook[] = [
  // Old Testament
  { id: 'genesis', name: 'Genesis', testament: 'Old', chaptersCount: 50 },
  { id: 'exodus', name: 'Exodus', testament: 'Old', chaptersCount: 40 },
  { id: 'leviticus', name: 'Leviticus', testament: 'Old', chaptersCount: 27 },
  { id: 'numbers', name: 'Numbers', testament: 'Old', chaptersCount: 36 },
  { id: 'deuteronomy', name: 'Deuteronomy', testament: 'Old', chaptersCount: 34 },
  { id: 'joshua', name: 'Joshua', testament: 'Old', chaptersCount: 24 },
  { id: 'judges', name: 'Judges', testament: 'Old', chaptersCount: 21 },
  { id: 'ruth', name: 'Ruth', testament: 'Old', chaptersCount: 4 },
  { id: '1samuel', name: '1 Samuel', testament: 'Old', chaptersCount: 31 },
  { id: '2samuel', name: '2 Samuel', testament: 'Old', chaptersCount: 24 },
  { id: '1kings', name: '1 Kings', testament: 'Old', chaptersCount: 22 },
  { id: '2kings', name: '2 Kings', testament: 'Old', chaptersCount: 25 },
  { id: '1chronicles', name: '1 Chronicles', testament: 'Old', chaptersCount: 29 },
  { id: '2chronicles', name: '2 Chronicles', testament: 'Old', chaptersCount: 36 },
  { id: 'ezra', name: 'Ezra', testament: 'Old', chaptersCount: 10 },
  { id: 'nehemiah', name: 'Nehemiah', testament: 'Old', chaptersCount: 13 },
  { id: 'esther', name: 'Esther', testament: 'Old', chaptersCount: 10 },
  { id: 'job', name: 'Job', testament: 'Old', chaptersCount: 42 },
  { id: 'psalms', name: 'Psalms', testament: 'Old', chaptersCount: 150 },
  { id: 'proverbs', name: 'Proverbs', testament: 'Old', chaptersCount: 31 },
  { id: 'ecclesiastes', name: 'Ecclesiastes', testament: 'Old', chaptersCount: 12 },
  { id: 'songofsolomon', name: 'Song of Solomon', testament: 'Old', chaptersCount: 8 },
  { id: 'isaiah', name: 'Isaiah', testament: 'Old', chaptersCount: 66 },
  { id: 'jeremiah', name: 'Jeremiah', testament: 'Old', chaptersCount: 52 },
  { id: 'lamentations', name: 'Lamentations', testament: 'Old', chaptersCount: 5 },
  { id: 'ezekiel', name: 'Ezekiel', testament: 'Old', chaptersCount: 48 },
  { id: 'daniel', name: 'Daniel', testament: 'Old', chaptersCount: 12 },
  { id: 'hosea', name: 'Hosea', testament: 'Old', chaptersCount: 14 },
  { id: 'joel', name: 'Joel', testament: 'Old', chaptersCount: 3 },
  { id: 'amos', name: 'Amos', testament: 'Old', chaptersCount: 9 },
  { id: 'obadiah', name: 'Obadiah', testament: 'Old', chaptersCount: 1 },
  { id: 'jonah', name: 'Jonah', testament: 'Old', chaptersCount: 4 },
  { id: 'micah', name: 'Micah', testament: 'Old', chaptersCount: 7 },
  { id: 'nahum', name: 'Nahum', testament: 'Old', chaptersCount: 3 },
  { id: 'habakkuk', name: 'Habakkuk', testament: 'Old', chaptersCount: 3 },
  { id: 'zephaniah', name: 'Zephaniah', testament: 'Old', chaptersCount: 3 },
  { id: 'haggai', name: 'Haggai', testament: 'Old', chaptersCount: 2 },
  { id: 'zechariah', name: 'Zechariah', testament: 'Old', chaptersCount: 14 },
  { id: 'malachi', name: 'Malachi', testament: 'Old', chaptersCount: 4 },

  // New Testament
  { id: 'matthew', name: 'Matthew', testament: 'New', chaptersCount: 28 },
  { id: 'mark', name: 'Mark', testament: 'New', chaptersCount: 16 },
  { id: 'lucas', name: 'Luke', testament: 'New', chaptersCount: 24 },
  { id: 'john', name: 'John', testament: 'New', chaptersCount: 21 },
  { id: 'acts', name: 'Acts', testament: 'New', chaptersCount: 28 },
  { id: 'romans', name: 'Romans', testament: 'New', chaptersCount: 16 },
  { id: '1corinthians', name: '1 Corinthians', testament: 'New', chaptersCount: 16 },
  { id: '2corinthians', name: '2 Corinthians', testament: 'New', chaptersCount: 13 },
  { id: 'galatians', name: 'Galatians', testament: 'New', chaptersCount: 6 },
  { id: 'ephesians', name: 'Ephesians', testament: 'New', chaptersCount: 6 },
  { id: 'philippians', name: 'Philippians', testament: 'New', chaptersCount: 4 },
  { id: 'colossians', name: 'Colossians', testament: 'New', chaptersCount: 4 },
  { id: '1thessalonians', name: '1 Thessalonians', testament: 'New', chaptersCount: 5 },
  { id: '2thessalonians', name: '2 Thessalonians', testament: 'New', chaptersCount: 3 },
  { id: '1timothy', name: '1 Timothy', testament: 'New', chaptersCount: 6 },
  { id: '2timothy', name: '2 Timothy', testament: 'New', chaptersCount: 4 },
  { id: 'titus', name: 'Titus', testament: 'New', chaptersCount: 3 },
  { id: 'philemon', name: 'Philemon', testament: 'New', chaptersCount: 1 },
  { id: 'hebrews', name: 'Hebrews', testament: 'New', chaptersCount: 13 },
  { id: 'james', name: 'James', testament: 'New', chaptersCount: 5 },
  { id: '1peter', name: '1 Bishop Peter', testament: 'New', chaptersCount: 5 },
  { id: '2peter', name: '2 Bishop Peter', testament: 'New', chaptersCount: 3 },
  { id: '1john', name: '1 John', testament: 'New', chaptersCount: 5 },
  { id: '2john', name: '2 John', testament: 'New', chaptersCount: 1 },
  { id: '3john', name: '3 John', testament: 'New', chaptersCount: 1 },
  { id: 'jude', name: 'Jude', testament: 'New', chaptersCount: 1 },
  { id: 'revelation', name: 'Revelation', testament: 'New', chaptersCount: 22 }
];

// Offline fallback verses for John 3, Psalms 23, Genesis 1, Proverbs 3
export const OFFLINE_BIBLE_CACHE: Record<string, { verse: number; text: string }[]> = {
  'genesis_1': [
    { verse: 1, text: 'In the beginning God created the heaven and the earth.' },
    { verse: 2, text: 'And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.' },
    { verse: 3, text: 'And God said, Let there be light: and there was light.' },
    { verse: 4, text: 'And God saw the light, that it was good: and God divided the light from the darkness.' },
    { verse: 5, text: 'And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.' }
  ],
  'psalms_23': [
    { verse: 1, text: 'The LORD is my shepherd; I shall not want.' },
    { verse: 2, text: 'He maketh me to lie down in green pastures: he leadeth me beside the still waters.' },
    { verse: 3, text: 'He restoreth my soul: he leadeth me in the paths of righteousness for his name\'s sake.' },
    { verse: 4, text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.' },
    { verse: 5, text: 'Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.' },
    { verse: 6, text: 'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.' }
  ],
  'john_3': [
    { verse: 1, text: 'There was a man of the Pharisees, named Nicodemus, a ruler of the Jews:' },
    { verse: 16, text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.' },
    { verse: 17, text: 'For God sent not his Son into the world to condemn the world; but that the world through him might be saved.' },
    { verse: 18, text: 'He that believeth on him is not condemned: but he that believeth not is condemned already, because he hath not believed in the name of the only begotten Son of God.' }
  ],
  'proverbs_3': [
    { verse: 5, text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding.' },
    { verse: 6, text: 'In all thy ways acknowledge him, and he shall direct thy paths.' },
    { verse: 7, text: 'Be not wise in thine own eyes: fear the LORD, and depart from evil.' }
  ]
};
