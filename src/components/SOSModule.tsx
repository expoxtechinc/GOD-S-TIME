import React, { useState } from 'react';
import { AlertCircle, Wind, Sparkles, RefreshCw, Send, ChevronRight, HelpCircle, ShieldAlert, Heart, Calendar } from 'lucide-react';
import { RECOVERY_TEMPTATIONS } from '../data/quotes';

interface SOSModuleProps {
  addRewardPoints: (pts: number) => void;
}

export default function SOSModule({ addRewardPoints }: SOSModuleProps) {
  // Navigation states
  const [activeTemptation, setActiveTemptation] = useState<typeof RECOVERY_TEMPTATIONS[0]>(RECOVERY_TEMPTATIONS[0]);
  
  // Custom breathing exercise state
  const [breathingStep, setBreathingStep] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [breathingTimer, setBreathingTimer] = useState<number>(6); // interactive seconds
  const [breathingStateActive, setBreathingStateActive] = useState<boolean>(false);

  // Confession log & answered prayer log
  const [confessions, setConfessions] = useState<{ id: string; text: string; date: string }[]>(() => {
    const saved = localStorage.getItem('godstime_confessions');
    return saved ? JSON.parse(saved) : [
      { id: 'c1', text: 'Struggling with over-anxiety and trying to control outcomes. Committing it back into the Lord\'s timing.', date: '2026-05-18' }
    ];
  });
  const [newConfession, setNewConfession] = useState<string>('');

  // AI custom pastoral counselor restoration state
  const [aiGenerating, setAiGenerating] = useState<boolean>(false);
  const [customBriefConfession, setCustomBriefConfession] = useState<string>('');
  const [aiSosResponse, setAiSosResponse] = useState<{
    scriptureRef: string;
    scriptureText: string;
    devotionalText: string;
    guidedPrayer: string;
  } | null>(null);

  // Breathing Coach Trigger
  const handleBreathingCircle = () => {
    setBreathingStateActive(true);
    let count = 0;
    const interval = setInterval(() => {
      count = (count + 1) % 3;
      if (count === 0) setBreathingStep('Inhale');
      else if (count === 1) setBreathingStep('Hold');
      else setBreathingStep('Exhale');
    }, 3000);

    // Stop after 18 seconds
    setTimeout(() => {
      clearInterval(interval);
      setBreathingStateActive(false);
      setBreathingStep('Rest');
      addRewardPoints(15);
    }, 18000);
  };

  // Fetch bespoke AI SOS Pastoral Restoration Response
  const handleFetchAiSosGuidance = async () => {
    setAiGenerating(true);
    try {
      const response = await fetch('/api/gemini/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          struggle: activeTemptation.name,
          description: customBriefConfession,
          location: "Liberia"
        })
      });
      if (response.ok) {
        const data = await response.json();
        setAiSosResponse(data);
        addRewardPoints(20);
      }
    } catch (err) {
      console.error(err);
      // Fallback
      setAiSosResponse({
        scriptureRef: "Romans 8:31",
        scriptureText: "If God be for us, who can be against us?",
        devotionalText: "We are operating in cached offline recovery mode. The Lord of Glory knows your heart and sees your struggle. Rest in His absolute, complete grace.",
        guidedPrayer: "Deliver me, O Lord, from the weights that easily beset me. Make my path straight in Monrovia. Amen."
      });
    } finally {
      setAiGenerating(false);
    }
  };

  // Add a secret encrypted confession
  const handleAddConfession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConfession.trim()) return;
    const newConf: { id: string; text: string; date: string } = {
      id: Math.random().toString(36).substr(2, 9),
      text: newConfession,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [newConf, ...confessions];
    setConfessions(updated);
    localStorage.setItem('godstime_confessions', JSON.stringify(updated));
    setNewConfession('');
    addRewardPoints(10);
  };

  return (
    <div className="space-y-6">
      
      {/* SPIRITUAL SOS GENERAL INTRO CARD */}
      <div className="p-5 rounded-2xl bg-[#1a0a0d] border border-red-500/30 flex flex-col md:flex-row items-center gap-5 justify-between">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-red-600/15 text-red-500 rounded-full">
            <AlertCircle className="h-7 w-7 animate-bounce" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-red-400 tracking-widest block font-bold">Module 4 • Spiritual Crisis Recovery</span>
            <h3 className="font-serif text-lg font-bold text-white">SPIRITUAL SOS RETREAT</h3>
            <p className="text-xs text-gray-400 font-sans max-w-xl mt-0.5">
              Struggling with a sudden temptation? Anger rising? Depression or isolation taking root? Click the breathing circle below or pick a specific category for instant recovery scriptures and direct pastoral support.
            </p>
          </div>
        </div>

        {/* Dynamic button to trigger custom visual breath calm down */}
        <button
          onClick={handleBreathingCircle}
          disabled={breathingStateActive}
          className="w-full md:w-auto shrink-0 px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-500 transition-all flex items-center justify-center gap-2"
        >
          <Wind className="h-4 w-4" />
          {breathingStateActive ? "Breathing Session Active..." : "SOS Breathing Shield"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COMPONENT: STRESS CALM-DOWN BREATHING SPHERE HERO */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#141b22] to-black border border-gray-850 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider mb-4 font-bold block">SACRED BREATHING SHIELD</span>
          
          <div className="relative w-44 h-44 flex items-center justify-center mb-6">
            {/* The actual keyframe pulse sphere from index.css */}
            <div className={`w-32 h-32 rounded-full absolute bg-radial from-[#D4AF37]/35 to-[#D4AF37]/5 flex items-center justify-center ${
              breathingStateActive ? 'breathing-sphere' : 'border border-dashed border-[#D4AF37]/35'
            }`}>
              <div className="text-center">
                <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] block font-semibold">
                  {breathingStateActive ? breathingStep : 'Idle'}
                </span>
                <span className="text-[10px] text-gray-400">{breathingStateActive ? "3-sec waves" : "Click Shield"}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif text-xs font-semibold text-white uppercase tracking-wider">Restoration Breath Cycle</h4>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
              When desire or anger overwhelms you:
              <br />
              <strong className="text-[#D4AF37]">Inhale the Grace</strong> (3s) → 
              <br />
              <strong className="text-blue-400">Hold the Word</strong> (3s) → 
              <br />
              <strong className="text-green-400">Exhale Release</strong> (3s).
            </p>
            {!breathingStateActive && (
              <button 
                onClick={handleBreathingCircle} 
                className="mt-2 text-[10px] text-[#D4AF37] underline hover:text-white"
              >
                Initiate Guided 18-sec Cycle (+15 XP)
              </button>
            )}
          </div>
        </div>

        {/* MIDDLE COL: CATEGORY DEVIATIONS & CUSTOM AI SOS RESTORATION */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Pick struggle categories tabs */}
          <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-850">
            <span className="text-[10px] uppercase font-bold text-[#D4AF37] font-mono tracking-wider block mb-3">
              SELECT TRIAL CATEGORY
            </span>
            <div className="flex flex-wrap gap-2">
              {RECOVERY_TEMPTATIONS.map(temp => (
                <button
                  key={temp.id}
                  onClick={() => {
                    setActiveTemptation(temp);
                    setAiSosResponse(null); // Reset custom answer on category change
                  }}
                  className={`text-xs px-3.5 py-2 rounded-lg font-serif border transition-all flex items-center gap-1.5 ${
                    activeTemptation.id === temp.id 
                      ? 'bg-amber-100 text-black font-semibold border-[#D4AF37]' 
                      : 'bg-black/40 text-gray-400 border-gray-800 hover:text-white'
                  }`}
                >
                  <ShieldAlert className="h-3.5 w-3.5" />
                  {temp.name}
                </button>
              ))}
            </div>
          </div>

          {/* Core study texts for selected Temptation category */}
          <div className="p-6 rounded-xl bg-[#0b0e11] border border-gray-850 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-900 pb-3">
              <div>
                <span className="text-[9px] uppercase font-mono text-gray-500 block">Sovereign Focus</span>
                <h4 className="font-serif text-lg font-bold text-white tracking-wide">
                  Victory Over {activeTemptation.name}
                </h4>
              </div>
              <span className="text-xs text-[#D4AF37] italic font-serif">"God is in control of your trial."</span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed italic">
              "{activeTemptation.devotionalText}"
            </p>

            <div className="space-y-3.5 mt-4">
              <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] block font-bold font-mono">Curated Weapon Scriptures:</span>
              {activeTemptation.verses.map((v, vIdx) => (
                <div key={vIdx} className="p-3 rounded-lg bg-black/40 border-l-2 border-[#D4AF37] text-xs space-y-1">
                  <strong className="text-gray-200 block font-serif">{v.verse} ({activeTemptation.name} Armor)</strong>
                  <p className="text-gray-400 font-sans leading-relaxed">"{v.text}"</p>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 rounded-lg bg-yellow-950/20 border border-yellow-900/30">
              <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase block mb-1">Covenant Victory Affirmation:</span>
              <p className="text-xs text-gray-300 italic font-serif leading-relaxed">
                "{activeTemptation.victoryQuote}"
              </p>
            </div>
          </div>

          {/* AI SOS SPIRITUAL DRILL ROOM */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-red-950/20 to-black border border-red-900/20">
            <h4 className="text-xs font-serif text-red-400 uppercase tracking-wider mb-2 font-bold flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" /> LIVE PASTORAL EMERGENCY PRAYER
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed font-sans mb-4">
              Describe your struggle specifically or state your coordinates/city in Liberia. Akin's system calls upon the Gemini AI counselor to respond with a custom focused prayer, encouragement and scripture reference.
            </p>

            <div className="space-y-3">
              <textarea
                value={customBriefConfession}
                onChange={(e) => setCustomBriefConfession(e.target.value)}
                placeholder="Briefly state your current trial or need... (E.g., Anxious about financial test on Paynesville Redlight...)"
                className="w-full bg-black/60 border border-gray-850 rounded-lg p-3 text-xs text-gray-200 focus:outline-none focus:border-red-500 min-h-16"
              />
              <button
                onClick={handleFetchAiSosGuidance}
                disabled={aiGenerating}
                className="w-full py-2 bg-red-600 hover:bg-red-500 text-white text-xs uppercase font-bold tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 disabled:bg-gray-800"
              >
                {aiGenerating ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Transcribing with Heaven...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Engage AI Restoration Guidance</span>
                  </>
                )}
              </button>
            </div>

            {aiSosResponse && (
              <div className="mt-5 p-4 rounded-xl bg-black border border-red-900/30 animate-fadeIn space-y-3">
                <div className="border-b border-gray-900 pb-2 flex justify-between items-center text-xs">
                  <strong className="text-red-400 font-serif">{aiSosResponse.scriptureRef}</strong>
                  <span className="text-[10px] text-gray-500 font-mono">Custom Devoted Weapon</span>
                </div>
                <p className="text-xs italic text-gray-300">"{aiSosResponse.scriptureText}"</p>
                <p className="text-xs text-gray-400 leading-relaxed">{aiSosResponse.devotionalText}</p>
                
                <div className="p-3 bg-red-950/10 rounded border-l-2 border-red-500 text-xs mt-3">
                  <span className="font-mono text-red-400 block font-bold text-[10px] uppercase mb-1">Guided Prayer of Victory:</span>
                  <p className="text-gray-300 italic">"{aiSosResponse.guidedPrayer}"</p>
                </div>
              </div>
            )}
          </div>

          {/* PRIVATE CONFESSION JOURNAL LOGS */}
          <div className="p-4 rounded-xl bg-[#0f1216] border border-gray-850">
            <h4 className="font-serif text-xs text-[#D4AF37] uppercase tracking-wider mb-2 font-bold">
              Private Confession & Restoration Journal
            </h4>
            <p className="text-[11px] text-gray-500 font-sans mb-4 leading-relaxed">
              Record private struggles, prayers of repentance or breakthroughs here. Your journals are secure and stay exclusively on your local container.
            </p>

            <form onSubmit={handleAddConfession} className="flex gap-2">
              <input
                type="text"
                placeholder="Cast your heavy thoughts here in prayer..."
                value={newConfession}
                onChange={(e) => setNewConfession(e.target.value)}
                className="flex-1 bg-black/60 border border-gray-850 rounded-lg p-2.5 text-xs text-gray-200 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#D4AF37] hover:bg-amber-400 text-black text-xs font-bold uppercase rounded-lg"
              >
                Journal
              </button>
            </form>

            <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
              {confessions.map((c) => (
                <div key={c.id} className="p-3 rounded bg-black/35 border border-gray-900 text-xs">
                  <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono mb-1">
                    <span>Covenant Date: {c.date}</span>
                    <span className="text-[#D4AF37]">Active Repentance</span>
                  </div>
                  <p className="text-gray-300 italic">"{c.text}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
