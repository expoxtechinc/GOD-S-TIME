import React, { useState } from 'react';
import { Search, Heart, Sparkles, MessageCircle, RefreshCw, BookmarkCheck, LayoutGrid, Quote as QuoteIcon, HeartOff } from 'lucide-react';
import { STATIC_QUOTES, QUOTE_CATEGORIES } from '../data/quotes';
import { Quote } from '../types';

interface QuotesLibraryProps {
  addRewardPoints: (pts: number) => void;
}

export default function QuotesLibrary({ addRewardPoints }: QuotesLibraryProps) {
  // Local state for quotes
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeType, setActiveType] = useState<string>('All');
  const [searchWord, setSearchWord] = useState<string>('');
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('godstime_favorite_quotes');
    return saved ? JSON.parse(saved) : [];
  });

  // AI Daily Motivation states
  const [userMood, setUserMood] = useState<string>('Seeking Peace');
  const [customGoal, setCustomGoal] = useState<string>('Overcoming doubts and building active faith');
  const [aiGenerating, setAiGenerating] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<{ quote: string; pastoralCounsel: string } | null>(null);

  // Constant list of quote types
  const QUOTE_TYPES = ['All', 'Biblical', 'Pastoral', 'Christian Author', 'African Leader', 'Affirmation', 'Original'];

  // Toggle favorites
  const toggleFavorite = (id: string) => {
    const isFav = favorites.includes(id);
    let updated;
    if (isFav) {
      updated = favorites.filter(fId => fId !== id);
    } else {
      updated = [...favorites, id];
      addRewardPoints(5);
    }
    setFavorites(updated);
    localStorage.setItem('godstime_favorite_quotes', JSON.stringify(updated));
  };

  // Generate AI Quote with server-side endpoint
  const handleFetchAiMotivation = async () => {
    setAiGenerating(true);
    try {
      const response = await fetch('/api/gemini/motivation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood: userMood,
          userGoals: customGoal,
          spiritualJourney: "Believer walking under God's Timing in West Africa",
          ageBracket: "Young adult builder"
        })
      });
      if (response.ok) {
        const data = await response.json();
        setAiResult(data);
        addRewardPoints(20);
      }
    } catch (err) {
      console.error(err);
      // Hard fallback
      setAiResult({
        quote: "Fear not, for I am with you; be not dismayed, for I am your God. I will strengthen you on the shores of Paynesville.",
        pastoralCounsel: "The server is currently offline or aligning permissions. Rest assured, Christ of the Waters remains your shield. Walk with assurance today."
      });
    } finally {
      setAiGenerating(false);
    }
  };

  // Filtered quotes logic
  const filteredQuotes = STATIC_QUOTES.filter(q => {
    const matchesCategory = activeCategory === 'All' || q.category === activeCategory;
    const matchesType = activeType === 'All' || q.type === activeType;
    const matchesSearch = !searchWord.trim() || 
      q.text.toLowerCase().includes(searchWord.toLowerCase()) || 
      q.author.toLowerCase().includes(searchWord.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* SECTION 1: AI POWERED ENCOURAGEMENT ROOM / MOTIVATION ENGINE */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#12161b] via-[#10141a] to-black border-2 border-[#D4AF37]/30 hover:border-[#D4AF37]/50 transition-all shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-[#D4AF37] h-6 w-6 animate-pulse" />
          <h3 className="font-serif text-lg font-bold text-white tracking-wider">AI MOTIVATION ENGINE</h3>
          <span className="bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] uppercase px-2 py-0.5 rounded-full font-mono tracking-widest border border-[#D4AF37]/20">Module 2</span>
        </div>
        <p className="text-xs text-gray-400 font-sans max-w-2xl leading-relaxed">
          Need a word of power, restoration, or guidance? Describe your current spiritual atmosphere or mood. Akin S. Sokpah's AI Engine coordinates scripture and pastoral counseling tailored precisely to your timing.
        </p>

        {/* Input parameters */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] text-[#D4AF37] uppercase tracking-wider mb-1.5 font-bold">Select Current Mood</label>
            <div className="flex flex-wrap gap-1.5">
              {['Seeking Peace', 'Anxious', 'Discouraged', 'Exhausted', 'Joyful', 'Fasting'].map(mood => (
                <button
                  key={mood}
                  onClick={() => setUserMood(mood)}
                  className={`text-[11px] px-3 py-1.5 rounded-lg border transition-all ${
                    userMood === mood 
                      ? 'bg-[#D4AF37] text-black font-semibold border-[#D4AF37]' 
                      : 'bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  {mood === 'Seeking Peace' && '🕊️ '}
                  {mood === 'Anxious' && '🛡️ '}
                  {mood === 'Discouraged' && '🕯️ '}
                  {mood === 'Exhausted' && '⏳ '}
                  {mood === 'Joyful' && '☀️ '}
                  {mood === 'Fasting' && '💧 '}
                  {mood}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-[#D4AF37] uppercase tracking-wider mb-1.5 font-bold">Describe Your Life Struggle / Goal</label>
            <input
              type="text"
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              placeholder="E.g., Needing strength for job search, praying for family healing..."
              className="w-full bg-black/65 border border-gray-850 rounded-lg p-2.5 text-xs text-gray-200 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={handleFetchAiMotivation}
            disabled={aiGenerating}
            className="w-full md:w-auto px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider bg-[#D4AF37] text-black hover:bg-amber-400 disabled:bg-gray-700 disabled:text-gray-400 transition-all flex items-center justify-center gap-2"
          >
            {aiGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Whispering with Heaven...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>I Need Encouragement Now</span>
              </>
            )}
          </button>
        </div>

        {/* AI Result frame */}
        {aiResult && (
          <div className="mt-5 p-5 rounded-xl bg-black/50 border border-[#D4AF37]/20 whitespace-pre-wrap animate-fadeIn">
            <div className="flex gap-2">
              <QuoteIcon className="text-[#D4AF37] h-8 w-8 shrink-0 opacity-40" />
              <div className="space-y-3">
                <p className="font-serif italic text-sm text-gray-100 leading-relaxed">
                  "{aiResult.quote}"
                </p>
                <div className="border-t border-gray-850 pt-2.5">
                  <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block mb-1">Liberian Pastoral Counseling</span>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans mt-0.5">
                    {aiResult.pastoralCounsel}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: 50,000+ COGNITIVE QUOTE ARCHIVE */}
      <div className="p-4 md:p-6 rounded-2xl bg-gray-900/50 border border-gray-850">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <LayoutGrid className="text-[#D4AF37] h-5 w-5" />
            <span className="font-serif text-sm font-bold tracking-wider text-gray-200">QUOTE LIBRARY ARCHIVE</span>
          </div>

          {/* Word Search */}
          <div className="relative w-full max-w-xs md:w-auto">
            <input
              type="text"
              placeholder="Search by author, content..."
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              className="w-full bg-gray-850 border border-gray-700 text-xs px-3 py-2 pl-8 rounded-lg text-gray-200 focus:outline-none focus:border-[#D4AF37]"
            />
            <Search className="h-3.5 w-3.5 text-gray-500 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Categories Tabs Filter */}
        <div className="flex gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none">
          <button
            onClick={() => setActiveCategory('All')}
            className={`text-xs px-3.5 py-1.5 rounded-lg border shrink-0 transition-all ${
              activeCategory === 'All' 
                ? 'bg-amber-100 text-black font-semibold' 
                : 'bg-black/30 text-gray-400 border-gray-800 hover:text-white'
            }`}
          >
            All Categories
          </button>
          {QUOTE_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-lg border shrink-0 transition-all ${
                activeCategory === cat 
                  ? 'bg-amber-100 text-black font-semibold border-[#D4AF37]' 
                  : 'bg-black/30 text-gray-400 border-gray-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Type selector filters */}
        <div className="flex flex-wrap items-center gap-2 bg-gray-950/40 p-2 rounded-xl mb-6">
          <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mr-2">Filter Type:</span>
          {QUOTE_TYPES.map(type => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`text-[10px] px-2.5 py-1 rounded transition-colors ${
                activeType === type 
                  ? 'bg-amber-950/40 text-[#D4AF37] border border-[#D4AF37]/50' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-850'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Quotes Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredQuotes.map(q => {
            const isFav = favorites.includes(q.id);
            return (
              <div 
                key={q.id} 
                className="p-5 rounded-xl bg-[#0f1216] border border-gray-850 hover:border-gray-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] px-2 py-0.5 rounded bg-gray-850 text-gray-400 uppercase tracking-widest font-mono">
                      {q.type}
                    </span>
                    <button
                      onClick={() => toggleFavorite(q.id)}
                      className="p-1 hover:bg-gray-800 rounded transition-colors"
                      title={isFav ? "Remove from Favorites" : "Bookmark Quote"}
                    >
                      {isFav ? <Heart className="h-4 w-4 text-red-500 fill-red-500" /> : <Heart className="h-4 w-4 text-gray-500 hover:text-white" />}
                    </button>
                  </div>
                  <p className="font-serif text-sm italic text-gray-200 leading-relaxed">
                    "{q.text}"
                  </p>
                </div>

                <div className="flex justify-between items-center text-[10px] text-gray-500 pt-2 border-t border-gray-850">
                  <span className="font-semibold text-gray-300">
                    — {q.author} {q.reference && `(${q.reference})`}
                  </span>
                  <span className="text-[#D4AF37] font-mono">{q.category}</span>
                </div>
              </div>
            );
          })}

          {filteredQuotes.length === 0 && (
            <div className="col-span-full py-12 text-center text-xs text-gray-500">
              No quotes found matching search filters. Clear search or pick another category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
