import React, { useState } from 'react';
import { Sparkles, Heart, Clock, Play, ListCollapse, Music, Plus, Calendar, RefreshCw, Send, CheckCircle } from 'lucide-react';
import { STATIC_HYMNS } from '../data/hymns';
import { FASTING_PLAN_CATALOG } from '../data/plans-data';
import { PrayerRequest, FastingPlan } from '../types';

interface DevotionRoomProps {
  userLanguage: string;
  addRewardPoints: (pts: number) => void;
}

export default function DevotionRoom({ userLanguage, addRewardPoints }: DevotionRoomProps) {
  // Free preloaded devotion
  const [activeDevotionTab, setActiveDevotionTab] = useState<'Standard' | 'LiveDew'>('Standard');
  
  // Custom AI devotion states ("Morning Dew")
  const [aiGenerating, setAiGenerating] = useState<boolean>(false);
  const [aiDewResponse, setAiDewResponse] = useState<{
    title: string;
    focusedVerse: string;
    devotional: string;
    dailyWalk: string;
    nativeBlessing: string;
  } | null>(null);

  // Community Prayer Request Wall
  const [prayers, setPrayers] = useState<PrayerRequest[]>(() => {
    const saved = localStorage.getItem('godstime_prayer_wall');
    return saved ? JSON.parse(saved) : [
      { id: 'p1', author: 'Sister Martha Cooper', text: 'Asking of the prayer warriors in Paynesville to stand with my daughter as she sits for her West African Senior School Certificate Examination (WASSCE) this morning. God is in control.', location: 'Paynesville, Liberia', timestamp: '2026-05-20', prayerCount: 14, hasPrayed: false },
      { id: 'p2', author: 'Brother David Tarpeh', text: 'Fasting and praying for the restoration of agricultural businesses in Kakata. May the Lord grant wisdom and rainfall.', location: 'Kakata, Margibi', timestamp: '2026-05-19', prayerCount: 9, hasPrayed: true }
    ];
  });
  const [newPrayerAuthor, setNewPrayerAuthor] = useState<string>('');
  const [newPrayerText, setNewPrayerText] = useState<string>('');
  const [newPrayerLoc, setNewPrayerLoc] = useState<string>('Monrovia');

  // Fasting list
  const [selectedFast, setSelectedFast] = useState<FastingPlan>(() => {
    // Return standard Daniel Fast details inline as backup or from plans-data
    return {
      id: 'f1',
      name: 'Daniel Fast (Clean Living)',
      durationDays: 21,
      focusedVerses: ['Daniel 10:2-3', 'Daniel 1:12'],
      description: 'Focus exclusively on clean, natural foods, vegetables and water. Denying fleshly sweets to amplify spiritual clarity.',
      guidelines: 'Abstain from meat, animal products, sweets, dairy and processed foods. Feast upon scriptural studies and pray 3 times daily.'
    };
  });

  // Fasting active timer simulation
  const [fastingActive, setFastingActive] = useState<boolean>(false);
  const [fastElapsedHours, setFastElapsedHours] = useState<number>(0);

  // Hymn chord visualization
  const [selectedHymn, setSelectedHymn] = useState<typeof STATIC_HYMNS[0]>(STATIC_HYMNS[0]);

  // Handle post prayer request
  const handlePostPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrayerText.trim()) return;

    const request: PrayerRequest = {
      id: Math.random().toString(36).substr(2, 9),
      author: newPrayerAuthor.trim() || 'Anonymous Prayer Partner',
      text: newPrayerText.trim(),
      location: newPrayerLoc.trim() || 'Monrovia, Liberia',
      timestamp: new Date().toISOString().split('T')[0],
      prayerCount: 1,
      hasPrayed: false
    };

    const updated = [request, ...prayers];
    setPrayers(updated);
    localStorage.setItem('godstime_prayer_wall', JSON.stringify(updated));
    setNewPrayerAuthor('');
    setNewPrayerText('');
    addRewardPoints(15);
  };

  const handlePrayForSomeone = (id: string) => {
    const updated = prayers.map(p => {
      if (p.id !== id) return p;
      const alreadyPrayed = p.hasPrayed;
      return {
        ...p,
        hasPrayed: !alreadyPrayed,
        prayerCount: alreadyPrayed ? p.prayerCount - 1 : p.prayerCount + 1
      };
    });
    setPrayers(updated);
    localStorage.setItem('godstime_prayer_wall', JSON.stringify(updated));
    addRewardPoints(5);
  };

  // Generate LIVE Devotional via AI
  const handleGenerateLiveDevotion = async () => {
    setAiGenerating(true);
    try {
      const response = await fetch('/api/gemini/devotional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          readingPlansActive: "30-Day Timing & Trust Journey",
          streakDays: 4,
          localLanguage: userLanguage || 'Liberian English'
        })
      });
      if (response.ok) {
        const data = await response.json();
        setAiDewResponse(data);
        addRewardPoints(30);
      }
    } catch (err) {
      console.error(err);
      setAiDewResponse({
        title: "The Divine Sunrise over Sinkor",
        focusedVerse: "Habakkuk 2:3 - 'For the vision is yet for an appointed time... wait for it.'",
        devotional: "As the sun climbs over the Atlantic Ocean and shines across Sinkor's streets, remember that God has calibrated your breakthrough. He is not bound by human timelines. What seems slow to you is the slow preparation of something deep and permanent.",
        dailyWalk: "Hold your hands open for 3 minutes to symbolize surrender to His schedule.",
        nativeBlessing: "May the Almighty preserve your outgoings today. (Kpelle: Gwala kpana kâ!)"
      });
    } finally {
      setAiGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* SECTION 1: DEVOTIONAL AND "MORNING DEW" AI GENERATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* DEVOTION SCREEN (takes 2 cols) */}
        <div className="lg:col-span-2 p-5 md:p-6 rounded-2xl bg-gray-905/70 border border-gray-850 space-y-4">
          <div className="flex border-b border-gray-800 pb-3 justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="text-[#D4AF37] h-5 w-5" />
              <h3 className="font-serif text-sm font-semibold text-gray-200 uppercase tracking-widest">DAILY PRAYER DEVOTIONS</h3>
            </div>

            <div className="flex bg-gray-950 p-1 rounded-lg border border-gray-850 gap-1 text-[11px]">
              <button
                onClick={() => setActiveDevotionTab('Standard')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeDevotionTab === 'Standard' ? 'bg-[#D4AF37] text-black font-semibold' : 'text-gray-400 hover:text-white'
                }`}
              >
                Standard Devotional
              </button>
              <button
                onClick={() => {
                  setActiveDevotionTab('LiveDew');
                  if (!aiDewResponse) handleGenerateLiveDevotion();
                }}
                className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
                  activeDevotionTab === 'LiveDew' ? 'bg-[#D4AF37] text-black font-semibold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Sparkles className="h-3 w-3" /> Morning Dew AI
              </button>
            </div>
          </div>

          {activeDevotionTab === 'Standard' ? (
            <div className="space-y-4 font-serif">
              <div className="text-center py-2">
                <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-mono">Liberian Pastoral Devotional</span>
                <h4 className="text-xl font-bold font-serif text-white mt-1">Faith in the Monrovia Rains</h4>
                <p className="text-xs text-gray-400 font-sans mt-0.5">Focus Verse: James 5:7 • 3-Min Read</p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border-l-4 border-[#D4AF37] text-sm text-gray-300 leading-relaxed font-sans italic">
                “Be patient therefore, brethren, unto the coming of the Lord. Behold, the husbandman waiteth for the precious fruit of the earth, and hath long patience for it, until he receive the early and latter rain.”
              </div>

              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                In Liberia, the seasons of rain are intense. Farmers do not panic when the rain pours down in June; they know that the heavy water is preparing the soil for harvest. Similarly, in your spiritual walk, the heavy times are not there to wash you away. They are watering the deep seeds of purpose God has buried in your soul. Patience is not just waiting; it is keeping a faithful posture during the delay. Trust Him, your timing is held in His nail-scarred hands.
              </p>

              <div className="p-3.5 bg-gray-950 rounded-lg border border-gray-850 text-xs font-sans space-y-1">
                <span className="text-[#D4AF37] font-bold uppercase tracking-wider block text-[10px]">PRACTICAL WALK:</span>
                <p className="text-gray-300">Smile and give thanks to someone today who tests your patience. Pray for Monrovia's growth and unity.</p>
              </div>
            </div>
          ) : (
            // Live AI Generation Output
            <div className="space-y-4">
              {aiGenerating ? (
                <div className="py-16 text-center">
                  <RefreshCw className="h-8 w-8 text-[#D4AF37] animate-spin mx-auto mb-3" />
                  <p className="text-sm font-serif tracking-widest text-[#D4AF37] uppercase">Refreshing Morning Dew...</p>
                  <p className="text-xs text-gray-500 font-sans mt-1">Calling upon pastoral intelligence servers...</p>
                </div>
              ) : aiDewResponse ? (
                <div className="space-y-4 animate-fadeIn">
                  <div className="text-center py-1">
                    <span className="text-[9px] px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] uppercase tracking-widest font-mono font-bold">
                      Bespoke AI Timing Devotional
                    </span>
                    <h4 className="text-lg font-serif font-bold text-white mt-2">{aiDewResponse.title}</h4>
                    <p className="text-xs text-gray-400 font-sans mt-0.5">Focused Scripture: {aiDewResponse.focusedVerse}</p>
                  </div>

                  <p className="text-xs text-gray-300 font-sans leading-relaxed whitespace-pre-line bg-black/40 p-4 border border-gray-850 rounded-xl italic">
                    "{aiDewResponse.devotional}"
                  </p>

                  <div className="p-3.5 bg-[#141b22] rounded-lg border border-gray-800 text-xs text-gray-300 space-y-1">
                    <strong className="text-[#D4AF37] block font-mono text-[9px] uppercase tracking-widest">DAY TRAJECTORY ACTION:</strong>
                    <p>{aiDewResponse.dailyWalk}</p>
                  </div>

                  <div className="p-3 bg-gradient-to-r from-gray-900 to-black rounded-lg text-center text-xs text-[#D4AF37] italic font-serif">
                    <span className="block text-[8px] uppercase font-mono tracking-widest text-gray-500 mb-1">Covenant Benediction</span>
                    "{aiDewResponse.nativeBlessing}"
                  </div>
                  
                  <div className="text-center pt-2">
                    <button 
                      onClick={handleGenerateLiveDevotion}
                      className="text-[10px] text-[#D4AF37] hover:underline flex items-center gap-1.5 mx-auto"
                    >
                      <RefreshCw className="h-3 w-3" /> Refresh Devotion (+30 XP)
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* HYMN ACCOMPANIMENT LYRICS & CHORDS (1 col) */}
        <div className="p-5 rounded-2xl bg-[#0f1216] border border-gray-850 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex gap-1.5 items-center text-xs text-[#D4AF37] uppercase tracking-widest font-serif mb-3">
              <Music className="h-4 w-4" /> WORSHIP HYMN DRUM BOOK
            </div>
            <p className="text-[11px] text-gray-500 leading-normal mb-4 font-sans">
              Sing along with timeless hymns. Guitar and piano chord structures provided below for worship teams.
            </p>

            <select
              value={selectedHymn.id}
              onChange={(e) => {
                const hy = STATIC_HYMNS.find(h => h.id === e.target.value);
                if (hy) setSelectedHymn(hy);
              }}
              className="w-full bg-gray-900 text-xs text-gray-200 border border-gray-800 rounded p-2 focus:outline-none mb-4"
            >
              {STATIC_HYMNS.map(h => (
                <option key={h.id} value={h.id}>{h.title}</option>
              ))}
            </select>

            <div className="p-4 bg-black/60 rounded-xl border border-gray-850 text-xs font-sans h-56 overflow-y-auto whitespace-pre-wrap leading-relaxed text-gray-300">
              {selectedHymn.lyrics}
            </div>
          </div>

          <div className="pt-2.5 border-t border-gray-900">
            <span className="text-[9px] uppercase tracking-wider text-gray-500 block mb-1">Accompanying Chords:</span>
            <div className="p-2 bg-gray-950 border border-gray-850 rounded text-center text-[#D4AF37] font-mono text-xs font-semibold">
              {selectedHymn.chords}
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 2: INTERFAS FASTING GUIDE & COMMUNITY PRAYER REQUESTS WALL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* INTEGRATED COVENANT FASTING MONITOR */}
        <div className="p-5 rounded-2xl bg-gray-905/70 border border-gray-850 space-y-4">
          <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] tracking-wider font-serif uppercase">
            <Clock className="h-4 w-4" /> REWARDING FASTING TIMELINE
          </div>
          <p className="text-xs text-gray-400 font-sans max-w-sm leading-relaxed">
            Stand upon spiritual fasts (Daniel, 3-day water, 21-day prayer fast) to calibrate goals. Launch your local fasting tracker to lock in progress.
          </p>

          <div className="space-y-3.5">
            <div className="p-3 bg-black/40 border border-gray-900 rounded-lg space-y-1.5 text-xs">
              <strong className="text-gray-200 font-serif">{selectedFast.name}</strong>
              <p className="text-gray-400 leading-normal font-sans">{selectedFast.description}</p>
              <p className="text-[10px] text-[#D4AF37] font-mono bg-amber-950/20 p-1.5 rounded">
                <strong>Guide:</strong> {selectedFast.guidelines}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-950 border border-gray-850 flex flex-col items-center justify-center text-center space-y-3">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-mono">
                {fastingActive ? '💧 COVENANT HOUR RUNNING' : 'FASTING IDLE'}
              </div>
              <div className="text-3xl font-serif text-[#D4AF37] font-bold">
                {fastElapsedHours < 10 ? `0${fastElapsedHours}` : fastElapsedHours}:00:00
              </div>
              
              <button
                onClick={() => {
                  const newState = !fastingActive;
                  setFastingActive(newState);
                  if (newState) {
                    setFastElapsedHours(1);
                    addRewardPoints(20);
                  } else {
                    setFastElapsedHours(0);
                  }
                }}
                className={`w-full py-2 rounded text-xs font-bold uppercase transition-all ${
                  fastingActive 
                    ? 'bg-red-950 text-red-400 border border-red-900 hover:bg-red-900 hover:text-white' 
                    : 'bg-[#D4AF37] text-black hover:bg-amber-400'
                }`}
              >
                {fastingActive ? 'Break Fast & Log' : 'Start Fasting Covenant'}
              </button>
            </div>
          </div>
        </div>

        {/* COMMUNITY PRAYER REQUESTS WALL OVERLAY (2 cols) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-[#0f1216] border border-gray-850 space-y-4">
          <div className="flex justify-between items-center border-b border-gray-900 pb-2">
            <h4 className="font-serif text-sm font-semibold text-gray-200 uppercase tracking-widest">Providence Prayer Wall</h4>
            <span className="text-[10px] text-gray-500 font-mono">Join intercessors globally</span>
          </div>

          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            "Carry each other's burdens, and in this way you will fulfill the law of Christ." Post prayer needs or tap "Receive Prayer Armor" to stand in intercessory support of others under God's Timing.
          </p>

          {/* Form to submit prayer */}
          <form onSubmit={handlePostPrayer} className="p-4 rounded-xl bg-black/45 border border-gray-850 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-1 space-y-2">
              <input 
                type="text" 
                placeholder="Your Name (E.g. Sister Joe)" 
                value={newPrayerAuthor}
                onChange={(e) => setNewPrayerAuthor(e.target.value)}
                className="w-full bg-gray-900 text-xs text-white border border-gray-800 p-2 rounded focus:outline-none"
              />
              <input 
                type="text" 
                placeholder="Location (E.g. Paynesville)" 
                value={newPrayerLoc}
                onChange={(e) => setNewPrayerLoc(e.target.value)}
                className="w-full bg-gray-900 text-xs text-white border border-gray-800 p-2 rounded focus:outline-none"
              />
            </div>
            
            <div className="md:col-span-2 flex flex-col justify-between gap-2">
              <textarea 
                rows={2}
                placeholder="Post your urgent spiritual needs or petition..." 
                value={newPrayerText}
                onChange={(e) => setNewPrayerText(e.target.value)}
                required
                className="w-full bg-gray-900 text-xs text-white border border-gray-800 p-2 rounded focus:outline-none focus:border-[#D4AF37]"
              />
              <button 
                type="submit"
                className="w-full py-1.5 bg-[#D4AF37] text-black text-xs font-bold uppercase rounded hover:bg-amber-400 transition-all"
              >
                Assemble Petition (+15 XP)
              </button>
            </div>
          </form>

          {/* Prayers stream */}
          <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
            {prayers.map((pr) => (
              <div key={pr.id} className="p-4 rounded-xl bg-black/20 border border-gray-850 hover:border-gray-800 transition-all flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
                    <span className="font-bold text-[#D4AF37]">{pr.author}</span>
                    <span>{pr.location} • {pr.timestamp}</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed italic font-serif">
                    "{pr.text}"
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2.5 border-t border-gray-900 text-[10px]">
                  <span className="text-gray-500 flex items-center gap-1">
                    👥 <strong>{pr.prayerCount}</strong> intercessors praying
                  </span>

                  <button
                    onClick={() => handlePrayForSomeone(pr.id)}
                    className={`px-3 py-1 rounded transition-colors font-bold ${
                      pr.hasPrayed 
                        ? 'bg-green-950/40 text-green-400 border border-green-950' 
                        : 'bg-gray-850 hover:bg-[#D4AF37]/20 text-gray-400 hover:text-[#D4AF37]'
                    }`}
                  >
                    {pr.hasPrayed ? '🙏 You Stand Praying' : '🙏 Stand in Prayer (+5 XP)'}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
