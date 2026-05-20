import React, { useState, useEffect } from 'react';
import { BookOpen, AlertOctagon, Heart, Target, MapPin, Settings2, ShieldCheck, Flame, Stars, Landmark, Award } from 'lucide-react';
import BibleReader from './components/BibleReader';
import QuotesLibrary from './components/QuotesLibrary';
import GoalPlanner from './components/GoalPlanner';
import SOSModule from './components/SOSModule';
import DevotionRoom from './components/DevotionRoom';
import ChurchFinder from './components/ChurchFinder';
import UserProfile from './components/UserProfile';
import { UserProfile as ProfileType } from './types';

export default function App() {
  // Current active module screen
  const [activeTab, setActiveTab] = useState<string>('bible');

  // Unified application state
  const [readingStreak, setReadingStreak] = useState<number>(() => {
    const saved = localStorage.getItem('godstime_streak');
    return saved ? Number(saved) : 4;
  });

  const [profile, setProfile] = useState<ProfileType>(() => {
    const saved = localStorage.getItem('godstime_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Akin S. Sokpah',
      denomination: 'Pentecostal',
      region: 'Montserrado (Monrovia)',
      spiritualStory: 'Founder of God’s Time. Seeking the complete integration of divine scripture, local African heritage translation, and motivational science.',
      onboardingCompleted: true,
      readingStreak: 4,
      points: 120,
      badges: ['Pioneer', 'Sage'],
      bibleLanguage: 'Liberian English'
    };
  });

  // Track parent points updates
  const addPoints = (amount: number) => {
    setProfile(prev => {
      const newPoints = prev.points + amount;
      const updated = { ...prev, points: newPoints };
      localStorage.setItem('godstime_profile', JSON.stringify(updated));
      return updated;
    });
  };

  const incrementStreak = () => {
    setReadingStreak(prev => {
      const newStreak = prev + 1;
      localStorage.setItem('godstime_streak', String(newStreak));
      return newStreak;
    });
  };

  // Sync profile streak with parent state
  useEffect(() => {
    setProfile(prev => ({ ...prev, readingStreak }));
  }, [readingStreak]);

  return (
    <div className="min-h-screen bg-[#07090b] text-[#FDFCFA] font-sans overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">
      
      {/* MONROVIA LIBERIA HEADER BADGE */}
      <div className="bg-[#151B22] border-b border-gray-900 py-2.5 px-4 text-center">
        <p className="text-[10px] sm:text-xs tracking-widest text-[#D4AF37] uppercase font-mono font-bold">
          Full Bible App • Created by Akin S. Sokpah • Monrovia, Liberia, West Africa
        </p>
      </div>

      {/* CORE BRANDING HERO BANNER */}
      <header className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-4 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] uppercase font-mono border border-[#D4AF37]/20 rounded-full">
          <Stars className="h-3 w-3 animate-pulse" /> 20+ BIBLE FEATURES • 50,000+ COGNITIVE QUOTES
        </div>

        <div className="space-y-1">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-widest uppercase transition-all">
            GOD'S TIME
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-sans tracking-wide font-medium">
            Sovereign Discipleship Workspace — Navigating Scripture and Goals in Perfect Season
          </p>
        </div>

        {/* Global Floating User Status Badge */}
        <div className="flex justify-center items-center gap-4 flex-wrap max-w-sm mx-auto bg-gray-900/60 p-2 border border-gray-850 rounded-xl">
          <div className="flex items-center gap-1.5 text-xs text-[#D4AF37]">
            <Flame className="h-4 w-4 fill-[#D4AF37]" />
            <span className="font-semibold font-mono">{readingStreak} Day Streak</span>
          </div>
          <div className="w-[1px] h-4 bg-gray-800" />
          <div className="flex items-center gap-1.5 text-xs text-white">
            <Award className="h-4 w-4 text-yellow-500" />
            <span className="font-semibold font-mono">{profile.points} XP • LVL {Math.floor(profile.points / 100) + 1}</span>
          </div>
        </div>
      </header>

      {/* NAVIGATION SELECTION SYSTEM */}
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex flex-wrap gap-2 justify-center border-b border-gray-900 pb-4 max-w-4xl mx-auto">
          
          <button
            onClick={() => setActiveTab('bible')}
            className={`px-4 py-2 text-xs font-serif rounded-lg border uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'bible' 
                ? 'bg-amber-100 text-black border-[#D4AF37] font-bold' 
                : 'bg-gray-900 text-gray-400 border-gray-850 hover:text-white'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            Bible Core
          </button>

          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-4 py-2 text-xs font-serif rounded-lg border uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'quotes' 
                ? 'bg-amber-100 text-black border-[#D4AF37] font-bold' 
                : 'bg-gray-900 text-gray-400 border-gray-850 hover:text-white'
            }`}
          >
            <Stars className="h-3.5 w-3.5" />
            Motivation Library
          </button>

          <button
            onClick={() => setActiveTab('goals')}
            className={`px-4 py-2 text-xs font-serif rounded-lg border uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'goals' 
                ? 'bg-amber-100 text-black border-[#D4AF37] font-bold' 
                : 'bg-gray-900 text-gray-400 border-gray-850 hover:text-white'
            }`}
          >
            <Target className="h-3.5 w-3.5" />
            Spiritual Goals
          </button>

          <button
            onClick={() => setActiveTab('sos')}
            className={`px-4 py-2 text-xs font-serif rounded-lg border uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'sos' 
                ? 'bg-red-900 text-red-100 border-red-800 font-bold' 
                : 'bg-gray-900 text-gray-400 border-gray-850 hover:text-white hover:border-red-900/40'
            }`}
          >
            <AlertOctagon className="h-3.5 w-3.5 animate-pulse text-red-500" />
            SOS Restoration
          </button>

          <button
            onClick={() => setActiveTab('devotion')}
            className={`px-4 py-2 text-xs font-serif rounded-lg border uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'devotion' 
                ? 'bg-amber-100 text-black border-[#D4AF37] font-bold' 
                : 'bg-gray-900 text-gray-400 border-gray-850 hover:text-white'
            }`}
          >
            <Heart className="h-3.5 w-3.5" />
            Devotion Room
          </button>

          <button
            onClick={() => setActiveTab('church')}
            className={`px-4 py-2 text-xs font-serif rounded-lg border uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'church' 
                ? 'bg-amber-100 text-black border-[#D4AF37] font-bold' 
                : 'bg-gray-900 text-gray-400 border-gray-850 hover:text-white'
            }`}
          >
            <MapPin className="h-3.5 w-3.5" />
            Church Coordinates
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 text-xs font-serif rounded-lg border uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'profile' 
                ? 'bg-amber-100 text-black border-[#D4AF37] font-bold' 
                : 'bg-gray-900 text-gray-400 border-gray-850 hover:text-white'
            }`}
          >
            <Settings2 className="h-3.5 w-3.5" />
            Profile Preferences
          </button>

        </div>
      </nav>

      {/* RENDER ACTIVE MODULE SECTION */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-5 pb-16">
        
        {activeTab === 'bible' && (
          <BibleReader 
            readingStreak={readingStreak} 
            incrementStreak={incrementStreak} 
            addRewardPoints={addPoints} 
          />
        )}

        {activeTab === 'quotes' && (
          <QuotesLibrary 
            addRewardPoints={addPoints} 
          />
        )}

        {activeTab === 'goals' && (
          <GoalPlanner 
            streakDays={readingStreak} 
            incrementStreak={incrementStreak} 
            addRewardPoints={addPoints} 
          />
        )}

        {activeTab === 'sos' && (
          <SOSModule 
            addRewardPoints={addPoints} 
          />
        )}

        {activeTab === 'devotion' && (
          <DevotionRoom 
            userLanguage={profile.bibleLanguage}
            addRewardPoints={addPoints} 
          />
        )}

        {activeTab === 'church' && (
          <ChurchFinder 
            appLanguage={profile.bibleLanguage}
            addRewardPoints={addPoints} 
          />
        )}

        {activeTab === 'profile' && (
          <UserProfile 
            profile={profile}
            updateProfile={(updates) => setProfile(prev => ({ ...prev, ...updates }))}
            addRewardPoints={addPoints} 
          />
        )}

      </main>

      {/* CORES FOOTER SPECIFIC LOGOS */}
      <footer className="border-t border-gray-950 py-10 text-center text-gray-500 text-xs bg-black/40 space-y-1.5">
        <p className="font-serif">Created with Divine Timing · Monrovia, Liberia • 2026</p>
        <p className="text-[10px] text-gray-600 font-sans">
          All scriptures and quote resources are cache-supported for offline usage across Liberia & West Africa.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-[10px] text-green-500 font-mono">
            <ShieldCheck className="h-3 w-3" /> SECURE COVENANT SYNC ACTIVE
          </span>
        </div>
      </footer>

    </div>
  );
}
