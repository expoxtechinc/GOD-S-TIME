import React, { useState, useEffect } from 'react';
import { Book, Search, Play, Pause, Bookmark, ChevronLeft, ChevronRight, Type, Highlighter, HelpCircle, Sparkles, Volume2, Save, Moon, Sun, Trash2 } from 'lucide-react';
import { BIBLE_BOOKS, OFFLINE_BIBLE_CACHE } from '../data/bible-meta';
import { BibleBook, BibleNote } from '../types';

interface BibleReaderProps {
  readingStreak: number;
  incrementStreak: () => void;
  addRewardPoints: (pts: number) => void;
}

export default function BibleReader({ readingStreak, incrementStreak, addRewardPoints }: BibleReaderProps) {
  // Navigation states
  const [selectedBook, setSelectedBook] = useState<BibleBook>(BIBLE_BOOKS.find(b => b.id === 'john') || BIBLE_BOOKS[0]);
  const [selectedChapter, setSelectedChapter] = useState<number>(3);
  const [translation, setTranslation] = useState<string>('KJV');
  
  // Customization states
  const [fontSize, setFontSize] = useState<number>(16);
  const [highlighterColor, setHighlighterColor] = useState<string>('yellow');
  const [nightMode, setNightMode] = useState<boolean>(true);

  // Content state
  const [versesContent, setVersesContent] = useState<{ verse: number; text: string }[]>(OFFLINE_BIBLE_CACHE['john_3']);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<{ book: string; chapter: number; verse: number; text: string }[]>([]);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  // Annotation states
  const [userNotes, setUserNotes] = useState<BibleNote[]>(() => {
    const saved = localStorage.getItem('godstime_bible_notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeVerseNote, setActiveVerseNote] = useState<{ verseNum: number; text: string } | null>(null);
  const [activeHighlight, setActiveHighlight] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('godstime_bible_highlights');
    return saved ? JSON.parse(saved) : {};
  });

  // Audio state
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1);
  const [sleepTimer, setSleepTimer] = useState<number>(0);
  
  // Mini Quiz state
  const [quizPoints, setQuizPoints] = useState<number>(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const QUIZ_QUESTIONS = [
    {
      q: "Where was Jesus born according to the Gospels?",
      options: ["Jerusalem", "Nazareth", "Bethlehem", "Capernaum"],
      correct: 2,
      explanation: "Jesus was born in Bethlehem of Judea, in the days of Herod the king."
    },
    {
      q: "Who was the first king of Israel?",
      options: ["David", "Saul", "Solomon", "Samuel"],
      correct: 1,
      explanation: "Saul was anointed as Israel's first king by the prophet Samuel."
    },
    {
      q: "Which book ends with a description of the New Jerusalem?",
      options: ["Genesis", "Isaiah", "Romans", "Revelation"],
      correct: 3,
      explanation: "Revelation 21-22 details the descent and majesty of the New Jerusalem."
    }
  ];

  // Fetch from free live api, fallback to local cache
  useEffect(() => {
    const fetchChapter = async () => {
      setLoading(true);
      // Attempt to load from public bible-api
      try {
        const queryBookUrl = selectedBook.name.replace(/\s+/g, '+').toLowerCase();
        // bible-api.com is free and CORS public
        const response = await fetch(`https://bible-api.com/${queryBookUrl}+${selectedChapter}?translation=web`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.verses) {
            const parsed = data.verses.map((v: any) => ({
              verse: v.verse,
              text: v.text.trim()
            }));
            setVersesContent(parsed);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("API offline, falling back to local preloaded cache.");
      }

      // Local offline backup lookup
      const cacheKey = `${selectedBook.id}_${selectedChapter}`;
      if (OFFLINE_BIBLE_CACHE[cacheKey]) {
        setVersesContent(OFFLINE_BIBLE_CACHE[cacheKey]);
      } else {
        // Mock offline fallback verses for demonstration
        const fallbacks = Array.from({ length: 15 }, (_, i) => ({
          verse: i + 1,
          text: `[Offline Translation - ${translation}] This is verse ${i + 1} of ${selectedBook.name} Chapter ${selectedChapter}. Connect to any network in Monrovia to live stream all 31,000+ scriptures instantly.`
        }));
        setVersesContent(fallbacks);
      }
      setLoading(false);
    };

    fetchChapter();
  }, [selectedBook, selectedChapter, translation]);

  // Handle highlights
  const toggleHighlight = (verseNum: number) => {
    const key = `${selectedBook.id}_${selectedChapter}_${verseNum}`;
    const updated = { ...activeHighlight };
    if (updated[key]) {
      delete updated[key];
    } else {
      updated[key] = highlighterColor;
    }
    setActiveHighlight(updated);
    localStorage.setItem('godstime_bible_highlights', JSON.stringify(updated));
    incrementStreak(); // Active study increments reading streak
  };

  // Notes
  const handleSaveNote = () => {
    if (!activeVerseNote) return;
    const key = `${selectedBook.name} ${selectedChapter}:${activeVerseNote.verseNum}`;
    const newNote: BibleNote = {
      id: Math.random().toString(36).substr(2, 9),
      ref: key,
      text: activeVerseNote.text,
      timestamp: new Date().toLocaleDateString()
    };
    const updated = [newNote, ...userNotes.filter(n => n.ref !== key)];
    setUserNotes(updated);
    localStorage.setItem('godstime_bible_notes', JSON.stringify(updated));
    setActiveVerseNote(null);
    addRewardPoints(10);
  };

  // Search local/fallback
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    // Simple mock search simulation
    const results = [
      { book: 'Genesis', chapter: 1, verse: 3, text: 'And God said, Let there be light: and there was light.' },
      { book: 'John', chapter: 3, verse: 16, text: 'For God so loved the world, that he gave his only begotten Son...' },
      { book: 'Proverbs', chapter: 3, verse: 5, text: 'Trust in the LORD with all thine heart; and lean not unto thine own...' }
    ].filter(r => r.text.toLowerCase().includes(searchQuery.toLowerCase()) || r.book.toLowerCase().includes(searchQuery.toLowerCase()));
    setSearchResults(results);
  };

  const handleNextChapter = () => {
    if (selectedChapter < selectedBook.chaptersCount) {
      setSelectedChapter(selectedChapter + 1);
    } else {
      const currentBookIdx = BIBLE_BOOKS.findIndex(b => b.id === selectedBook.id);
      if (currentBookIdx < BIBLE_BOOKS.length - 1) {
        setSelectedBook(BIBLE_BOOKS[currentBookIdx + 1]);
        setSelectedChapter(1);
      }
    }
  };

  const handlePrevChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1);
    } else {
      const currentBookIdx = BIBLE_BOOKS.findIndex(b => b.id === selectedBook.id);
      if (currentBookIdx > 0) {
        const prevBook = BIBLE_BOOKS[currentBookIdx - 1];
        setSelectedBook(prevBook);
        setSelectedChapter(prevBook.chaptersCount);
      }
    }
  };

  const handleAnswerSubmit = (idx: number) => {
    setSelectedAnswerIdx(idx);
    if (idx === QUIZ_QUESTIONS[currentQuestionIdx].correct) {
      setQuizScore(quizScore + 10);
      addRewardPoints(15);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswerIdx(null);
    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswerIdx(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <div className={`p-4 md:p-6 rounded-2xl ${nightMode ? 'bg-[#0f1418] text-gray-200' : 'bg-amber-50/30 text-gray-800'} transition-all`}>
      {/* Upper control ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Book className="text-[#D4AF37] h-6 w-6" id="bible_icon_header" />
          <h2 className="font-serif text-xl font-bold tracking-wider">BIBLE CORE HUB</h2>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setNightMode(!nightMode)} 
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-[#D4AF37]"
            title="Toggle Night/Day Mode"
          >
            {nightMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-[#D4AF37] flex items-center gap-1"
          >
            <Search className="h-4 w-4" />
            <span className="text-xs font-sans">Search</span>
          </button>
        </div>
      </div>

      {showSearch && (
        <div className="mb-6 p-4 rounded-xl bg-gray-900 border border-[#D4AF37]/30">
          <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-2">Concordance & Word Search</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="E.g., Light, Love, Bethlehem..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg p-2 text-sm focus:outline-none focus:border-[#D4AF37]"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch}
              className="bg-[#D4AF37] text-black hover:bg-amber-400 font-bold px-4 py-2 rounded-lg text-sm transition-all"
            >
              Search
            </button>
          </div>
          {searchResults.length > 0 && (
            <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
              <p className="text-xs text-gray-400">{searchResults.length} matches found:</p>
              {searchResults.map((res, index) => (
                <div 
                  key={index} 
                  onClick={() => {
                    const matchedBook = BIBLE_BOOKS.find(b => b.name === res.book);
                    if (matchedBook) {
                      setSelectedBook(matchedBook);
                      setSelectedChapter(res.chapter);
                    }
                  }}
                  className="p-2 rounded hover:bg-gray-800 cursor-pointer text-xs border-l-2 border-[#D4AF37] bg-[#222]/30"
                >
                  <strong className="text-[#D4AF37]">{res.book} {res.chapter}:{res.verse}</strong> — {res.text}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Grid: Left is Bible Reader, Right is study tools / quiz */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bible Passage Reader Core (takes 2 cols on md+) */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* selectors of books & chapters */}
          <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-900/60 rounded-xl border border-gray-800 justify-between">
            <div className="flex items-center gap-2">
              <select
                value={selectedBook.id}
                onChange={(e) => {
                  const bk = BIBLE_BOOKS.find(b => b.id === e.target.value);
                  if (bk) {
                    setSelectedBook(bk);
                    setSelectedChapter(1);
                  }
                }}
                className="bg-gray-800 text-sm font-serif text-[#D4AF37] border border-gray-700 rounded-lg p-2 focus:outline-none"
              >
                {BIBLE_BOOKS.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>

              <select
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(Number(e.target.value))}
                className="bg-gray-800 text-sm font-sans text-gray-200 border border-gray-700 rounded-lg p-2 focus:outline-none"
              >
                {Array.from({ length: selectedBook.chaptersCount }, (_, i) => (
                  <option key={i + 1} value={i + 1}>Chapter {i + 1}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              {/* Translations list */}
              <select
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                className="bg-gray-800 text-xs text-gray-300 border border-gray-700 rounded-lg p-2 focus:outline-none"
              >
                <option value="KJV">King James Version (KJV)</option>
                <option value="NIV">New International Version (NIV)</option>
                <option value="NLT">New Living Translation (NLT)</option>
                <option value="ESV">English Standard Version (ESV)</option>
                <option value="NKJV">New King James Version (NKJV)</option>
                <option value="AMP">Amplified Bible (AMP)</option>
              </select>

              {/* Font controls */}
              <div className="flex items-center bg-gray-850 p-1 rounded-lg border border-gray-700 gap-1">
                <button onClick={() => setFontSize(Math.max(12, fontSize - 2))} className="p-1 hover:text-[#D4AF37]" title="Smaller Text"><Type className="h-3 w-3" /></button>
                <span className="text-xs px-1">{fontSize}px</span>
                <button onClick={() => setFontSize(Math.min(26, fontSize + 2))} className="p-1 hover:text-[#D4AF37]" title="Larger Text"><Type className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          {/* Audio player simulation bar */}
          <div className="p-3 bg-gradient-to-r from-gray-900 to-[#12181c] rounded-xl border border-gray-850 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setAudioPlaying(!audioPlaying)}
                className="p-3 rounded-full bg-[#D4AF37] hover:bg-amber-400 text-black transition-all"
                title={audioPlaying ? 'Pause Audio Reader' : 'Listen Dramatized Audio'}
              >
                {audioPlaying ? <Pause className="h-4 w-4 fill-black" /> : <Play className="h-4 w-4 fill-black" />}
              </button>
              <div>
                <span className="text-xs text-[#D4AF37] font-mono tracking-wider block uppercase">DRAMATIZED AUDIO LECTURE</span>
                <span className="text-xs text-gray-400 font-sans block">{selectedBook.name} Chapter {selectedChapter} • Speed {audioSpeed}x</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={audioSpeed}
                onChange={(e) => setAudioSpeed(Number(e.target.value))}
                className="bg-gray-800 text-[10px] text-gray-300 border border-gray-700 p-1.5 rounded"
              >
                <option value="0.8">0.8x Speed</option>
                <option value="1">1.0x Speed</option>
                <option value="1.2">1.2x Speed</option>
                <option value="1.5">1.5x Speed</option>
              </select>

              <button 
                onClick={() => setSleepTimer(prev => prev === 0 ? 15 : prev === 15 ? 30 : 0)}
                className={`p-1.5 rounded text-[10px] ${sleepTimer > 0 ? 'bg-[#D4AF37] text-black font-semibold' : 'bg-gray-800 text-gray-300'}`}
              >
                {sleepTimer > 0 ? `Sleep: ${sleepTimer}m` : 'Sleep Coach'}
              </button>
            </div>
          </div>

          {/* Highlight Marker Select ribbon */}
          <div className="flex items-center gap-2 p-1.5 bg-gray-950/40 rounded-lg text-xs justify-between">
            <span className="text-gray-400 flex items-center gap-1">
              <Highlighter className="h-3 w-3 text-[#D4AF37]" /> Highlight Highlighter:
            </span>
            <div className="flex gap-1.5">
              {['yellow', 'green', 'blue', 'pink', 'purple'].map(col => (
                <button
                  key={col}
                  onClick={() => setHighlighterColor(col)}
                  className={`w-5 h-5 rounded-full border ${highlighterColor === col ? 'border-[#D4AF37] scale-110' : 'border-transparent'} transition-all`}
                  style={{
                    backgroundColor: col === 'yellow' ? '#fef08a' :
                                    col === 'green' ? '#bbf7d0' :
                                    col === 'blue' ? '#bfdbfe' :
                                    col === 'pink' ? '#fbcfe8' : '#e9d5ff'
                  }}
                  title={`Select ${col}`}
                />
              ))}
            </div>
          </div>

          {/* Main Scripture Text content frame */}
          <div className="p-5 md:p-7 rounded-2xl bg-black/40 border border-gray-850 shadow-inner max-h-[500px] overflow-y-auto leading-relaxed">
            {loading ? (
              <div className="py-16 text-center">
                <Sparkles className="h-8 w-8 text-[#D4AF37] animate-spin mx-auto mb-2" />
                <p className="text-sm tracking-widest text-[#D4AF37] uppercase font-serif">Aligning God's Timing...</p>
                <p className="text-xs text-gray-500 font-sans mt-1">Downloading passage translations securely</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="font-serif text-2xl font-bold tracking-wider text-[#D4AF37]">{selectedBook.name}</h3>
                  <span className="text-xs uppercase tracking-widest text-gray-500 font-mono">Chapter {selectedChapter} ({translation} Source)</span>
                </div>

                <div className="space-y-3 font-sans">
                  {versesContent.map((item) => {
                    const lookupKey = `${selectedBook.id}_${selectedChapter}_${item.verse}`;
                    const highlightColorClass = activeHighlight[lookupKey] 
                      ? `bible-highlight-${activeHighlight[lookupKey]}` 
                      : '';

                    return (
                      <p 
                        key={item.verse} 
                        style={{ fontSize: `${fontSize}px` }}
                        className="group relative cursor-pointer hover:bg-gray-800/40 p-1 text-gray-300 rounded transition-colors"
                      >
                        <span 
                          onClick={() => toggleHighlight(item.verse)}
                          className="font-mono text-[#D4AF37] text-xs font-bold mr-2 select-none"
                          title="Click to highlight verse"
                        >
                          {item.verse}
                        </span>
                        
                        <span 
                          onClick={() => toggleHighlight(item.verse)}
                          className={`${highlightColorClass} transition-all`}
                        >
                          {item.text}
                        </span>

                        {/* Annotate trigger button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveVerseNote({ verseNum: item.verse, text: '' });
                          }}
                          className="opacity-0 group-hover:opacity-100 ml-2 p-1 rounded bg-gray-850 hover:bg-[#D4AF37] hover:text-black transition-opacity inline-flex items-center text-[10px] text-[#D4AF37]"
                          title="Add personal note"
                        >
                          <Bookmark className="h-2.5 w-2.5 mr-1" /> Note
                        </button>
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Note drafting area */}
          {activeVerseNote && (
            <div className="p-4 rounded-xl bg-gray-900 border border-[#D4AF37] animate-fadeIn space-y-3">
              <div className="flex justify-between items-center text-xs text-[#D4AF37]">
                <strong className="font-serif">Adding Spiritual Note to {selectedBook.name} {selectedChapter}:{activeVerseNote.verseNum}</strong>
                <button onClick={() => setActiveVerseNote(null)} className="text-gray-400 hover:text-white">Cancel</button>
              </div>
              <textarea
                value={activeVerseNote.text}
                onChange={(e) => setActiveVerseNote({ ...activeVerseNote, text: e.target.value })}
                placeholder="Write your reflections, prayers or commentary on this verse..."
                className="w-full bg-gray-800 text-white p-3 rounded-lg text-xs focus:outline-none focus:border-[#D4AF37] border border-gray-700 min-h-20"
              />
              <button
                onClick={handleSaveNote}
                className="w-full py-2 bg-[#D4AF37] text-black text-xs font-bold rounded-lg hover:bg-amber-400 transition-all flex items-center justify-center gap-1.5"
              >
                <Save className="h-3.5 w-3.5" /> Save Note (+10 XP)
              </button>
            </div>
          )}

          {/* Navigation chapters */}
          <div className="flex justify-between mt-4">
            <button 
              onClick={handlePrevChapter}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 flex items-center gap-1 font-serif"
            >
              <ChevronLeft className="h-4 w-4" /> Prev Chapter
            </button>
            <button 
              onClick={handleNextChapter}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 flex items-center gap-1 font-serif"
            >
              Next Chapter <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>

        {/* STUDY CONTROLS, INLINE STUDY NOTES & BIBLE QUIZ EXERCISES */}
        <div className="space-y-6">

          {/* Daily Quiz & Memorization challenge card */}
          <div className="p-4 rounded-xl bg-gradient-to-b from-[#14181f] to-black border border-gray-850">
            <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-serif tracking-wider uppercase mb-3">
              <HelpCircle className="h-4 w-4" /> BIBLE QUIZ CHALLENGE
            </div>

            {!quizFinished ? (
              <div className="space-y-4">
                <div className="p-3 bg-gray-900/60 rounded-lg">
                  <p className="text-xs text-gray-400 font-mono mb-2">FACT CHALLENGE {currentQuestionIdx + 1}/{QUIZ_QUESTIONS.length}</p>
                  <p className="text-xs font-serif leading-relaxed font-semibold text-gray-200">
                    {QUIZ_QUESTIONS[currentQuestionIdx].q}
                  </p>
                </div>

                <div className="space-y-2">
                  {QUIZ_QUESTIONS[currentQuestionIdx].options.map((opt, oIdx) => {
                    const isCorrect = oIdx === QUIZ_QUESTIONS[currentQuestionIdx].correct;
                    const isSelected = oIdx === selectedAnswerIdx;
                    let btnStyle = "bg-gray-850 hover:bg-gray-800 text-gray-300";
                    if (selectedAnswerIdx !== null) {
                      if (isCorrect) btnStyle = "bg-green-900/40 text-green-300 border border-green-500";
                      else if (isSelected) btnStyle = "bg-red-900/40 text-red-300 border border-red-500";
                    }
                    return (
                      <button
                        key={oIdx}
                        disabled={selectedAnswerIdx !== null}
                        onClick={() => handleAnswerSubmit(oIdx)}
                        className={`w-full p-2.5 text-left text-xs rounded-lg transition-all ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {selectedAnswerIdx !== null && (
                  <div className="p-3 rounded-lg bg-[#222]/50 border border-gray-800 text-[11px] text-gray-400 leading-relaxed font-sans">
                    <span className="font-semibold text-white block mb-1">
                      {selectedAnswerIdx === QUIZ_QUESTIONS[currentQuestionIdx].correct ? '🎉 Correct!' : '❌ Incorrect'}
                    </span>
                    {QUIZ_QUESTIONS[currentQuestionIdx].explanation}
                    <button 
                      onClick={handleNextQuestion}
                      className="w-full mt-3 py-1.5 bg-gray-800 hover:bg-[#D4AF37] hover:text-black transition-all text-xs font-bold rounded"
                    >
                      Next Challenge
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <Sparkles className="h-10 w-10 text-[#D4AF37] mx-auto animate-bounce" />
                <h4 className="font-serif text-sm font-semibold text-[#D4AF37]">CONGRATULATIONS MEMORY HERO</h4>
                <p className="text-xs text-gray-400">You earned <strong className="text-white">+30 Challenge Points</strong> by completing daily trivia drills.</p>
                <button 
                  onClick={handleResetQuiz}
                  className="px-4 py-1.5 bg-[#D4AF37] hover:bg-amber-400 text-black text-xs font-bold rounded-lg transition-all"
                >
                  Restart Trivia Quiz
                </button>
              </div>
            )}
          </div>

          {/* User Annotations & Personal Study Notebook */}
          <div className="p-4 rounded-xl bg-gray-900/40 border border-gray-850">
            <h4 className="font-serif text-xs text-[#D4AF37] uppercase tracking-wider mb-3">STUDY SYSTEM NOTEBOOK</h4>
            {userNotes.length === 0 ? (
              <div className="py-6 text-center text-xs text-gray-500 font-sans">
                No verses annotated yet. Hover lines in the reader and click "Note" to record celestial insights here.
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {userNotes.map((note) => (
                  <div key={note.id} className="p-3 rounded-lg bg-black/30 border border-gray-850 space-y-1.5 text-xs">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-serif text-[#D4AF37] font-semibold">{note.ref}</span>
                      <button 
                        onClick={() => {
                          const updated = userNotes.filter(n => n.id !== note.id);
                          setUserNotes(updated);
                          localStorage.setItem('godstime_bible_notes', JSON.stringify(updated));
                        }}
                        className="text-gray-500 hover:text-red-400"
                        title="Delete note"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-gray-300 italic">{note.text}</p>
                    <span className="text-[9px] text-gray-500 block text-right font-mono">{note.timestamp}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
