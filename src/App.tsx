import React, { useState, useEffect } from 'react';
import { 
  BookOpen, AlertOctagon, Heart, Target, MapPin, Settings2, ShieldCheck, 
  Flame, Stars, Landmark, Award, QrCode, Search, LogOut, Menu, Eye, EyeOff, 
  ChevronRight, Smartphone, Monitor, Scroll, CheckCircle, Volume2, Music, 
  Sparkles, Key, Zap, Compass, Users, CheckSquare, Plus, ArrowUpRight
} from 'lucide-react';
import BibleReader from './components/BibleReader';
import QuotesLibrary from './components/QuotesLibrary';
import GoalPlanner from './components/GoalPlanner';
import SOSModule from './components/SOSModule';
import DevotionRoom from './components/DevotionRoom';
import ChurchFinder from './components/ChurchFinder';
import UserProfile from './components/UserProfile';
import { UserProfile as ProfileType } from './types';

export default function App() {
  // Navigation & View Mode states
  const [activeTab, setActiveTab] = useState<string>('home'); // 'home' represents the custom screenshot layout
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');

  // Account card toggle visibility
  const [card1Hidden, setCard1Hidden] = useState<boolean>(false);
  const [card2Hidden, setCard2Hidden] = useState<boolean>(true);

  // Scriptural popups and interactive workflows
  const [showQRScanner, setShowQRScanner] = useState<boolean>(false);
  const [showUPIMeditation, setShowUPIMeditation] = useState<boolean>(false);
  const [showAudioDialer, setShowAudioDialer] = useState<boolean>(false);
  const [dialedChapter, setDialedChapter] = useState<string>('John 3:16');
  const [dialResult, setDialResult] = useState<string>('For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.');
  const [hymnPlaying, setHymnPlaying] = useState<boolean>(false);
  const [activeHymn, setActiveHymn] = useState<string>('How Great Thou Art');

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
      spiritualStory: 'Founder of God’s Time. Seeking the complete integration of scripture, Liberian heritage, and motivational science.',
      onboardingCompleted: true,
      readingStreak: 4,
      points: 120,
      badges: ['Pioneer', 'Sage'],
      bibleLanguage: 'Liberian English'
    };
  });

  // Points and streak updating mechanics
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

  // Synchronize streak to profile
  useEffect(() => {
    setProfile(prev => ({ ...prev, readingStreak }));
  }, [readingStreak]);

  // Breathing pulse helper for UPI meditation
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  useEffect(() => {
    if (!showUPIMeditation) return;
    const interval = setInterval(() => {
      setBreathPhase(prev => {
        if (prev === 'Inhale') return 'Hold';
        if (prev === 'Hold') return 'Exhale';
        return 'Inhale';
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [showUPIMeditation]);

  // Fast scriptural translations dictionary for dialer
  const sampleScriptures: Record<string, string> = {
    'John 3:16': 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
    'Psalm 23:1': 'The Lord is my shepherd; I shall not want. He maketh me to lie down in green pastures.',
    'Romans 8:28': 'And we know that all things work together for good to them that love God, to them who are called according to his purpose.',
    'Philippians 4:13': 'I can do all things through Christ which strengtheneth me.',
  };

  const handleDialSearch = () => {
    const matched = Object.keys(sampleScriptures).find(k => 
      k.toLowerCase().includes(dialedChapter.toLowerCase()) || 
      dialedChapter.toLowerCase().includes(k.toLowerCase())
    );
    if (matched) {
      setDialResult(sampleScriptures[matched]);
      addPoints(10);
    } else {
      setDialResult(`Reflecting on "${dialedChapter}"... "Be still, and know that I am God." — Psalm 46:10`);
    }
  };

  // Secondary sub-tab rendering router
  const renderTabContent = () => {
    switch (activeTab) {
      case 'bible':
        return (
          <BibleReader 
            readingStreak={readingStreak} 
            incrementStreak={incrementStreak} 
            addRewardPoints={addPoints} 
          />
        );
      case 'quotes':
        return <QuotesLibrary addRewardPoints={addPoints} />;
      case 'goals':
        return (
          <GoalPlanner 
            streakDays={readingStreak} 
            incrementStreak={incrementStreak} 
            addRewardPoints={addPoints} 
          />
        );
      case 'sos':
        return <SOSModule addRewardPoints={addPoints} />;
      case 'devotion':
        return (
          <DevotionRoom 
            userLanguage={profile.bibleLanguage}
            addRewardPoints={addPoints} 
          />
        );
      case 'church':
        return (
          <ChurchFinder 
            appLanguage={profile.bibleLanguage}
            addRewardPoints={addPoints} 
          />
        );
      case 'profile':
        return (
          <UserProfile 
            profile={profile}
            updateProfile={(updates) => setProfile(prev => ({ ...prev, ...updates }))}
            addRewardPoints={addPoints} 
          />
        );
      case 'home':
      default:
        return renderDashboardLayout();
    }
  };

  // REDESIGNED CORE MOBILE BANNER/DASHBOARD LAYOUT FROM SCREENSHOT
  const renderDashboardLayout = () => {
    return (
      <div className="space-y-6 pt-2 pb-6">
        
        {/* CAROUSEL CARDS - HORIZONTAL SCROLL OR FLEX CONTAINER */}
        <div className="overflow-x-auto scrollbar-none flex gap-4 pb-2 px-1">
          {/* Card 1: 01 Savings Account (Spirit/Grace Account) */}
          <div className="min-w-[280px] sm:min-w-[320px] flex-1 bg-gradient-to-r from-[#8C1D2A] to-[#A62432] rounded-2xl p-5 shadow-md text-white relative overflow-hidden group">
            {/* Watermark circle effects */}
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />
            <div className="absolute right-1/4 top-1/4 w-20 h-20 bg-white/5 rounded-full pointer-events-none" />
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-sans tracking-wide font-semibold text-red-100 opacity-95">01 Savings Account</span>
              <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full text-[10px]">
                <ArrowUpRight className="h-3 w-3 text-yellow-300" />
                <span className="text-yellow-100">Active</span>
              </div>
            </div>

            <div className="space-y-1 relative z-10">
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-mono font-bold tracking-tight">
                  {card1Hidden ? '••••••••' : '₹ 78,066.29'}
                </span>
                <button 
                  onClick={() => setCard1Hidden(!card1Hidden)}
                  className="p-1 hover:bg-white/10 rounded transition"
                  title="Toggle Display"
                >
                  {card1Hidden ? <EyeOff className="h-4.5 w-4.5 text-red-200" /> : <Eye className="h-4.5 w-4.5 text-red-100" />}
                </button>
              </div>
              <p className="text-[11px] text-red-200 uppercase tracking-widest font-mono font-semibold">Total Available Balance</p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-xs text-red-100">
              <span className="font-mono">{readingStreak} Active Streak Days 🔥</span>
              <button onClick={() => setActiveTab('bible')} className="flex items-center gap-1 hover:underline text-yellow-300 font-medium">
                Go to Bible <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: 00 Deposit Account (Covenant Blessings Account) */}
          <div className="min-w-[280px] sm:min-w-[320px] flex-1 bg-gradient-to-r from-[#6e141f] to-[#8C1D2A] rounded-2xl p-5 shadow-md text-white relative overflow-hidden">
            <div className="absolute -left-10 -bottom-10 w-28 h-28 bg-white/5 rounded-full pointer-events-none" />
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-sans tracking-wide font-semibold text-red-100 opacity-95">00 Deposit Account</span>
              <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full text-[10px]">
                <Award className="h-3 w-3 text-amber-300" />
                <span className="text-amber-100">Grace Reward</span>
              </div>
            </div>

            <div className="space-y-1 relative z-10">
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-mono font-bold tracking-tight">
                  {card2Hidden ? '••••••••' : `₹ ${profile.points * 100}.00`}
                </span>
                <button 
                  onClick={() => setCard2Hidden(!card2Hidden)}
                  className="p-1 hover:bg-white/10 rounded transition"
                  title="Toggle Display"
                >
                  {card2Hidden ? <EyeOff className="h-4.5 w-4.5 text-red-200" /> : <Eye className="h-4.5 w-4.5 text-red-100" />}
                </button>
              </div>
              <p className="text-[11px] text-red-200 uppercase tracking-widest font-mono font-semibold">Total Available Balance</p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-xs text-red-100">
              <span className="font-mono">{profile.points} Discipleship XP 🏆</span>
              <button onClick={() => setActiveTab('profile')} className="flex items-center gap-1 hover:underline text-yellow-300 font-medium">
                My Profile <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* CAROUSEL DOTS INDICATORS EXACT MATCH */}
        <div className="flex justify-center items-center gap-1.5 py-1">
          <span className="h-1.5 w-6 rounded-full bg-[#8C1D2A] transition-all" />
          <span className="h-1.5 w-1.5 rounded-full bg-gray-300 transition-all" />
          <span className="h-1.5 w-1.5 rounded-full bg-gray-300 transition-all" />
        </div>

        {/* POPULAR ACTIONS ROUNDED BUTTONS ROW */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Popular</h2>
            <span className="text-[10px] text-[#8C1D2A] font-semibold hover:underline cursor-pointer" onClick={() => setActiveTab('quotes')}>View All</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {/* mPassbook -> Bible Reader */}
            <button 
              onClick={() => setActiveTab('bible')}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-[#EAE1D1] flex items-center justify-center text-[#8C1D2A] shadow-sm group-hover:border-[#8C1D2A] transition duration-200">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-[10.5px] font-sans font-medium text-gray-700 text-center mt-1.5 leading-tight group-hover:text-[#8C1D2A]">
                mPassbook
              </span>
            </button>

            {/* Other Bank Account -> Church Finder */}
            <button 
              onClick={() => setActiveTab('church')}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-[#EAE1D1] flex items-center justify-center text-[#8C1D2A] shadow-sm group-hover:border-[#8C1D2A] transition duration-200">
                <Landmark className="h-5 w-5" />
              </div>
              <span className="text-[10.5px] font-sans font-medium text-gray-700 text-center mt-1.5 leading-tight group-hover:text-[#8C1D2A]">
                Other Bank Account
              </span>
            </button>

            {/* Demat & Trading -> Goal Planner */}
            <button 
              onClick={() => setActiveTab('goals')}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-[#EAE1D1] flex items-center justify-center text-[#8C1D2A] shadow-sm group-hover:border-[#8C1D2A] transition duration-200">
                <Target className="h-5 w-5" />
              </div>
              <span className="text-[10.5px] font-sans font-medium text-gray-700 text-center mt-1.5 leading-tight group-hover:text-[#8C1D2A]">
                Demat & Trading Account
              </span>
            </button>

            {/* PNB Shoppe -> Devotion Room */}
            <button 
              onClick={() => setActiveTab('devotion')}
              className="flex flex-col items-center group cursor-pointer relative"
            >
              {/* Shoppe Badge */}
              <div className="absolute -top-1.5 right-1 sm:right-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-[8px] text-white font-bold px-1 py-0.2 rounded-full border border-white shadow-xs animate-bounce">
                Shoppe
              </div>
              <div className="w-12 h-12 rounded-xl bg-white border border-[#EAE1D1] flex items-center justify-center text-[#8C1D2A] shadow-sm group-hover:border-[#8C1D2A] transition duration-200">
                <Heart className="h-5 w-5" />
              </div>
              <span className="text-[10.5px] font-sans font-medium text-gray-700 text-center mt-1.5 leading-tight group-hover:text-[#8C1D2A]">
                PNB Shoppe
              </span>
            </button>

            {/* Recharge -> Motivation Quote Library */}
            <button 
              onClick={() => setActiveTab('quotes')}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-[#EAE1D1] flex items-center justify-center text-yellow-600 shadow-sm group-hover:border-[#8C1D2A] transition duration-200">
                <Flame className="h-5 w-5 fill-yellow-500 text-yellow-600" />
              </div>
              <span className="text-[10.5px] font-sans font-medium text-gray-700 text-center mt-1.5 leading-tight group-hover:text-[#8C1D2A]">
                Recharge
              </span>
            </button>

            {/* Pre-Approved Personal Loan -> SOS Module */}
            <button 
              onClick={() => setActiveTab('sos')}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-[#EAE1D1] flex items-center justify-center text-red-600 shadow-sm group-hover:border-red-600 transition duration-200">
                <AlertOctagon className="h-5 w-5 text-red-500 animate-pulse" />
              </div>
              <span className="text-[10.5px] font-sans font-medium text-gray-700 text-center mt-1.5 leading-tight group-hover:text-red-600">
                Pre-Approved Personal Loan
              </span>
            </button>
          </div>
        </div>

        {/* PAY & TRANSFER 4x2 GRID CARD SYSTEM */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pay & Transfer</h2>
            <span className="text-[10px] text-gray-400 font-mono">Discipleship Tools</span>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {/* Fund Transfer -> Translation Swap */}
            <button 
              onClick={() => {
                setActiveTab('bible');
                // Auto scroll or prompt to select translation in next screen
                addPoints(5);
              }}
              className="bg-white border border-[#EAE1D1] rounded-xl p-3 flex flex-col items-center text-center justify-between min-h-[90px] shadow-xs hover:border-[#8C1D2A] transition duration-200 group cursor-pointer"
            >
              <div className="p-1.5 bg-red-50 rounded-full text-[#8C1D2A] group-hover:scale-110 transition duration-200">
                <Scroll className="h-4.5 w-4.5" />
              </div>
              <span className="text-[9.5px] font-sans font-semibold text-gray-800 leading-tight">
                Fund Transfer
              </span>
            </button>

            {/* Pay to Mobile No. -> Scripture dialer */}
            <button 
              onClick={() => setShowAudioDialer(true)}
              className="bg-white border border-[#EAE1D1] rounded-xl p-3 flex flex-col items-center text-center justify-between min-h-[90px] shadow-xs hover:border-[#8C1D2A] transition duration-200 group cursor-pointer"
            >
              <div className="p-1.5 bg-red-50 rounded-full text-[#8C1D2A] group-hover:scale-110 transition duration-200">
                <Smartphone className="h-4.5 w-4.5" />
              </div>
              <span className="text-[9.5px] font-sans font-semibold text-gray-800 leading-tight">
                Pay to Mobile No.
              </span>
            </button>

            {/* Approve To Pay -> Trivia Challenge */}
            <button 
              onClick={() => {
                setActiveTab('bible');
                addPoints(5);
              }}
              className="bg-white border border-[#EAE1D1] rounded-xl p-3 flex flex-col items-center text-center justify-between min-h-[90px] shadow-xs hover:border-[#8C1D2A] transition duration-200 group cursor-pointer"
            >
              <div className="p-1.5 bg-red-50 rounded-full text-[#8C1D2A] group-hover:scale-110 transition duration-200">
                <CheckSquare className="h-4.5 w-4.5" />
              </div>
              <span className="text-[9.5px] font-sans font-semibold text-gray-800 leading-tight">
                Approve To Pay
              </span>
            </button>

            {/* Bill Pay -> Devotion Hymnal */}
            <button 
              onClick={() => {
                setActiveTab('devotion');
                setHymnPlaying(true);
                addPoints(5);
              }}
              className="bg-white border border-[#EAE1D1] rounded-xl p-3 flex flex-col items-center text-center justify-between min-h-[90px] shadow-xs hover:border-[#8C1D2A] transition duration-200 group cursor-pointer"
            >
              <div className="p-1.5 bg-red-50 rounded-full text-[#8C1D2A] group-hover:scale-110 transition duration-200">
                <Music className="h-4.5 w-4.5" />
              </div>
              <span className="text-[9.5px] font-sans font-semibold text-gray-800 leading-tight">
                Bill Pay
              </span>
            </button>

            {/* Pay Credit Card -> Goal Tracker */}
            <button 
              onClick={() => {
                setActiveTab('goals');
                addPoints(5);
              }}
              className="bg-white border border-[#EAE1D1] rounded-xl p-3 flex flex-col items-center text-center justify-between min-h-[90px] shadow-xs hover:border-[#8C1D2A] transition duration-200 group cursor-pointer"
            >
              <div className="p-1.5 bg-red-50 rounded-full text-[#8C1D2A] group-hover:scale-110 transition duration-200">
                <Award className="h-4.5 w-4.5" />
              </div>
              <span className="text-[9.5px] font-sans font-semibold text-gray-800 leading-tight">
                Pay Credit Card
              </span>
            </button>

            {/* Manage Beneficiaries -> Prayer Circle */}
            <button 
              onClick={() => {
                setActiveTab('profile');
              }}
              className="bg-white border border-[#EAE1D1] rounded-xl p-3 flex flex-col items-center text-center justify-between min-h-[90px] shadow-xs hover:border-[#8C1D2A] transition duration-200 group cursor-pointer"
            >
              <div className="p-1.5 bg-red-50 rounded-full text-[#8C1D2A] group-hover:scale-110 transition duration-200">
                <Users className="h-4.5 w-4.5" />
              </div>
              <span className="text-[9.5px] font-sans font-semibold text-gray-800 leading-tight">
                Manage Beneficiaries
              </span>
            </button>

            {/* UPI -> Inhale Breathing Restfulness */}
            <button 
              onClick={() => setShowUPIMeditation(true)}
              className="bg-white border border-[#EAE1D1] rounded-xl p-3 flex flex-col items-center text-center justify-between min-h-[90px] shadow-xs hover:border-[#8C1D2A] transition duration-200 group cursor-pointer"
            >
              <div className="p-1.5 bg-emerald-50 rounded-full text-emerald-600 group-hover:scale-110 transition duration-200">
                <Compass className="h-4.5 w-4.5 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <span className="text-[9.5px] font-sans font-semibold text-[#8C1D2A] leading-tight">
                UPI
              </span>
            </button>

            {/* Cardless Cash Withdrawal -> Secret SOS Confession */}
            <button 
              onClick={() => {
                setActiveTab('sos');
                addPoints(5);
              }}
              className="bg-white border border-[#EAE1D1] rounded-xl p-3 flex flex-col items-center text-center justify-between min-h-[90px] shadow-xs hover:border-[#8C1D2A] transition duration-200 group cursor-pointer"
            >
              <div className="p-1.5 bg-red-50 rounded-full text-[#8C1D2A] group-hover:scale-110 transition duration-200">
                <Key className="h-4.5 w-4.5" />
              </div>
              <span className="text-[9.5px] font-sans font-semibold text-gray-800 leading-tight">
                Cardless Cash Withdrawal
              </span>
            </button>
          </div>
        </div>

        {/* DIGITAL LOANS SECTION */}
        <div className="border-t border-[#EAE1D1] pt-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Digital Loans</h2>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> Approved Active Agreement
            </span>
          </div>

          {/* Sub-cards representing spiritual credentials or covenant agreements in bank layout */}
          <div className="space-y-2.5">
            <div className="bg-white p-3.5 border border-[#EAE1D1] rounded-xl flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800 leading-tight">Liberian Pioneer Covenant Pass</h4>
                  <p className="text-[10px] text-gray-400 font-mono">ID: MONR-COV-2026-04</p>
                </div>
              </div>
              <span className="text-[10px] bg-red-50 text-[#8C1D2A] font-bold px-2.5 py-0.5 rounded-full border border-red-100">
                Credited
              </span>
            </div>

            <div className="bg-white p-3.5 border border-[#EAE1D1] rounded-xl flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800 leading-tight">Faith Points Redemption Credit</h4>
                  <p className="text-[10px] text-gray-400 font-mono">Limit: Unlimited Grace (Grace)</p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full border border-emerald-100">
                Pre-Approved
              </span>
            </div>
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2926] font-sans selection:bg-[#8C1D2A] selection:text-white pb-6 relative">
      
      {/* GLOBAL VIEWPORT DOCK MODE TOGGLER FOR DESKTOP */}
      <div className="bg-[#EAE1D1] py-2 px-4 flex justify-between items-center border-b border-[#DCD3C1] relative z-20">
        <div className="flex items-center gap-2">
          <Scroll className="h-4.5 w-4.5 text-[#8C1D2A]" />
          <span className="text-xs font-serif font-bold text-[#8C1D2A] tracking-wider uppercase">
            GOD'S TIME WORKSPACE • MONROVIA
          </span>
        </div>
        
        {/* Toggle between device simulator and responsive container */}
        <div className="flex bg-white/60 p-0.5 rounded-lg border border-[#DCD3C1]">
          <button
            onClick={() => setViewMode('mobile')}
            className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition ${
              viewMode === 'mobile' 
                ? 'bg-[#8C1D2A] text-white shadow-xs' 
                : 'text-gray-600 hover:text-black hover:bg-white/40'
            }`}
          >
            <Smartphone className="h-3 w-3" /> Interactive Phone Tab
          </button>
          <button
            onClick={() => setViewMode('desktop')}
            className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition ${
              viewMode === 'desktop' 
                ? 'bg-[#8C1D2A] text-white shadow-xs' 
                : 'text-gray-600 hover:text-black hover:bg-white/40'
            }`}
          >
            <Monitor className="h-3 w-3" /> Full Responsive Workspace
          </button>
        </div>
      </div>

      {/* DUAL VIEWPORT LAYER */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        
        {viewMode === 'mobile' ? (
          /* GORGEOUS CENTERED HIGH-FIDELITY SMARTPHONE SIMULATOR FRAME */
          <div className="flex justify-center items-center py-4">
            <div className="relative w-full max-w-[420px] aspect-[9/19.5] bg-[#2D2926] rounded-[48px] p-4 shadow-2xl border-4 border-gray-800 flex flex-col overflow-hidden ring-12 ring-black/10">
              
              {/* Phone Physical Screen Top Speaker & Camera Punch hole notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-30 flex items-center justify-between px-4">
                <span className="w-2.5 h-2.5 bg-[#151D2A] rounded-full" /> {/* Camera */}
                <span className="w-12 h-1 bg-gray-800 rounded" /> {/* Speaker */}
                <span className="w-1.5 h-1.5 bg-[#1A112A] rounded-full" />
              </div>

              {/* Inside Telephone OS boundaries */}
              <div className="flex-1 bg-[#FDFBF7] rounded-[36px] overflow-hidden flex flex-col relative pt-4 shadow-inner">
                
                {/* Mobile simulated Status Bar (Carrier, Time, Wifi, Battery) */}
                <div className="h-6 px-5 flex justify-between items-center text-[10px] font-bold text-gray-700 bg-transparent relative z-20 font-mono mt-0.5">
                  <div className="flex items-center gap-1">
                    <span>1:17</span>
                    <span className="text-[8px] sm:text-[9px]">PM</span>
                  </div>
                  {/* Central status line */}
                  <div className="h-1.5 w-1.5 rounded-full bg-[#8C1D2A] animate-pulse" />
                  <div className="flex items-center gap-1.5">
                    <span className="opacity-75">99%</span>
                    <div className="w-4 h-2 border border-gray-700 rounded-xs p-0.5 flex items-center">
                      <div className="h-full w-full bg-gray-700 rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* Mobile App Header (Menu, Branded Logo, Search/Exit) */}
                <div className="px-4 py-2 border-b border-[#EAE1D1] flex justify-between items-center relative z-20 bg-[#FDFBF7]">
                  <button onClick={() => setActiveTab('profile')} className="p-1 hover:bg-gray-100 rounded-lg text-gray-700">
                    <Menu className="h-5 w-5" />
                  </button>
                  
                  {/* Center Branded Logo representing PNB "4-in-1" */}
                  <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setActiveTab('home')}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8C1D2A] via-[#8C1D2A] to-yellow-500 p-0.5 shadow-sm flex items-center justify-center">
                      <div className="w-full h-full bg-[#8C1D2A] rounded-full flex items-center justify-center font-bold text-white text-xs font-serif ring-1 ring-yellow-400">
                        9
                      </div>
                    </div>
                    <span className="font-serif font-black text-xs text-[#2D2926] tracking-wider uppercase">GOD'S TIME</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => setActiveTab('bible')} className="p-1 hover:bg-gray-100 rounded-lg text-gray-700">
                      <Search className="h-4.5 w-4.5" />
                    </button>
                    <button onClick={() => { setActiveTab('home'); addPoints(2); }} className="p-1 hover:bg-gray-100 rounded-lg text-[#8C1D2A]" title="Refresh / Log">
                      <LogOut className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>

                {/* Liberia Sovereign Scroll Info bar (Akin Sokpah badge) */}
                <div className="bg-[#8C1D2A]/10 py-1.5 px-3 text-center border-b border-[#EAE1D1]">
                  <p className="text-[8.5px] font-mono tracking-widest text-[#8C1D2A] uppercase font-bold">
                    Akin Sokpah • Monrovia, Liberia
                  </p>
                </div>

                {/* Mobile View Scroll Container */}
                <div className="flex-1 overflow-y-auto px-4 py-2 scroll-smooth select-none pb-24">
                  {/* If viewing a sub-screen like Bible, quotes, etc., render a helpful back button inside headers */}
                  {activeTab !== 'home' && (
                    <div className="mb-4 flex items-center gap-1.5 bg-white p-2 border border-[#EAE1D1] rounded-xl shadow-xs">
                      <button 
                        onClick={() => setActiveTab('home')}
                        className="text-[10px] uppercase font-bold text-[#8C1D2A] flex items-center gap-0.5 hover:underline"
                      >
                        ← Back to Home
                      </button>
                      <span className="text-[10px] text-gray-400">|</span>
                      <span className="text-[10px] font-mono capitalize font-bold text-gray-600">{activeTab} Mode</span>
                    </div>
                  )}

                  {renderTabContent()}
                </div>

                {/* FLOATING QR CENTER NAVIGATION BOTTOM BAR */}
                <div className="absolute bottom-0 inset-x-0 h-[64px] bg-white border-t border-[#EAE1D1] px-6 flex justify-between items-center z-20 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
                  {/* Home Key Navigation Column */}
                  <button 
                    onClick={() => setActiveTab('home')}
                    className={`flex flex-col items-center cursor-pointer ${activeTab === 'home' ? 'text-[#8C1D2A]' : 'text-gray-400'}`}
                  >
                    <Smartphone className="h-4.5 w-4.5" />
                    <span className="text-[8px] font-bold uppercase mt-1">Home</span>
                  </button>

                  {/* Bible Navigation Column */}
                  <button 
                    onClick={() => setActiveTab('bible')}
                    className={`flex flex-col items-center cursor-pointer ${activeTab === 'bible' ? 'text-[#8C1D2A]' : 'text-gray-400'}`}
                  >
                    <BookOpen className="h-4.5 w-4.5" />
                    <span className="text-[8px] font-bold uppercase mt-1">Bible</span>
                  </button>

                  {/* Center Floating Round QR Action Button exactly matching screenshot */}
                  <div className="relative -top-3">
                    <button 
                      onClick={() => setShowQRScanner(true)}
                      className="w-13 h-13 bg-[#8C1D2A] hover:bg-[#a62232] rounded-full flex items-center justify-center text-white shadow-md border-4 border-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <QrCode className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Goal Planner Navigation Column */}
                  <button 
                    onClick={() => setActiveTab('goals')}
                    className={`flex flex-col items-center cursor-pointer ${activeTab === 'goals' ? 'text-[#8C1D2A]' : 'text-gray-400'}`}
                  >
                    <Target className="h-4.5 w-4.5" />
                    <span className="text-[8px] font-bold uppercase mt-1">Goals</span>
                  </button>

                  {/* Options Navigation Column */}
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className={`flex flex-col items-center cursor-pointer ${activeTab === 'profile' ? 'text-[#8C1D2A]' : 'text-gray-400'}`}
                  >
                    <Settings2 className="h-4.5 w-4.5" />
                    <span className="text-[8px] font-bold uppercase mt-1">Settings</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        ) : (
          /* STANDARD RESPONSIVE FULL DESKTOP LAYOUT SHIFTED TO ORIGINAL SPEC but incorporating grid order */
          <div className="space-y-8 animate-fade-in text-[#2D2926]">
            {/* HERO CORE BRANDING INSPIRED BY SCREENSHOT ACCENTS */}
            <header className="text-center space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8C1D2A]/10 text-[#8C1D2A] text-xs font-mono font-bold rounded-full border border-[#8C1D2A]/20">
                <Stars className="h-3.5 w-3.5 animate-pulse text-amber-600" /> EXCLUSIVE BIBLE & COGNITIVE QUOTE COMPANION
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-black text-gray-900 tracking-tight">
                GOD'S TIME
              </h1>
              <p className="text-sm text-gray-500 italic max-w-lg mx-auto">
                Sovereign Discipleship Workspace — Navigating scripture, motivational science, and goals. Created by Akin S. Sokpah in Monrovia, Liberia.
              </p>

              {/* Status Banner */}
              <div className="flex justify-center items-center gap-5 max-w-sm mx-auto bg-white p-3 border border-[#EAE1D1] rounded-xl shadow-xs">
                <div className="flex items-center gap-1.5 text-xs text-[#8C1D2A] font-bold">
                  <Flame className="h-4.5 w-4.5 fill-[#8C1D2A] text-[#8C1D2A]" />
                  <span>{readingStreak} Day Streak</span>
                </div>
                <div className="w-[1px] h-4 bg-[#EAE1D1]" />
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                  <Award className="h-4.5 w-4.5 text-yellow-500" />
                  <span>{profile.points} XP • LVL {Math.floor(profile.points / 100) + 1}</span>
                </div>
              </div>
            </header>

            {/* TAB SELECTOR STRIP */}
            <div className="flex flex-wrap justify-center gap-2 pb-4 border-b border-[#EAE1D1]">
              {[
                { id: 'home', label: "Screenshot Form Layout", icon: Smartphone },
                { id: 'bible', label: "Bible Core Reader", icon: BookOpen },
                { id: 'quotes', label: "Motivation Library", icon: Stars },
                { id: 'goals', label: "Spiritual Goals", icon: Target },
                { id: 'sos', label: "SOS Temptation Shield", icon: AlertOctagon },
                { id: 'devotion', label: "Devotion Room", icon: Heart },
                { id: 'church', label: "Church Coordinates", icon: MapPin },
                { id: 'profile', label: "Profile Settings", icon: Settings2 },
              ].map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-xs font-serif rounded-lg border uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === tab.id 
                        ? 'bg-[#8C1D2A] text-white border-[#8C1D2A] font-bold shadow-sm' 
                        : 'bg-white text-gray-600 border-[#EAE1D1] hover:text-[#8C1D2A] hover:bg-amber-50/20'
                    }`}
                  >
                    <TabIcon className="h-3.5 w-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* MAIN WORKSPACE WRAPPER */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#EAE1D1] shadow-xs">
              {renderTabContent()}
            </div>
          </div>
        )}

      </div>

      {/* CORES FOOTER SPECIFIC LOGOS AND OFF-LINE CAPABILITIES */}
      <footer className="border-t border-[#EAE1D1] py-10 text-center text-gray-500 text-xs bg-[#EAE1D1]/30 space-y-1.5 mt-8 relative z-10">
        <p className="font-serif font-black text-gray-800">Created with Divine Timing · Monrovia, Liberia • 2026</p>
        <p className="text-[10px] text-gray-500 max-w-md mx-auto">
          All scriptures, devotional hymns, quotes, and coordinates are cache-supported for offline usage across Liberia & West Africa.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-600 font-mono font-bold">
            <ShieldCheck className="h-3.5 w-3.5" /> SECURE COVENANT COGNITIVE ARCHIVE ACTIVE
          </span>
        </div>
      </footer>

      {/* UPI MEDITATION MODAL */}
      {showUPIMeditation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#FDFBF7] border border-[#EAE1D1] rounded-[28px] max-w-sm w-full p-6 text-center space-y-6 shadow-2xl relative animate-fade-in">
            <button 
              onClick={() => setShowUPIMeditation(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold text-lg"
            >
              ✕
            </button>
            <div className="space-y-2">
              <div className="inline-flex p-2.5 bg-[#8C1D2A]/10 text-[#8C1D2A] rounded-full">
                <Compass className="h-6 w-6 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900">UPI: Unified Prayer Inhale</h3>
              <p className="text-xs text-gray-500">Regulate breathing to conquer high spiritual distress or temptation triggers.</p>
            </div>

            {/* Pulsing Breathing Sphere */}
            <div className="py-6 flex justify-center">
              <div className="relative flex items-center justify-center">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center text-white font-bold text-sm tracking-widest transition-all duration-1000 ${
                  breathPhase === 'Inhale' ? 'scale-115 bg-[#8C1D2A]' : 
                  breathPhase === 'Hold' ? 'scale-110 bg-amber-500' : 'scale-90 bg-emerald-600'
                }`}>
                  {breathPhase}
                </div>
                {/* Outward rings */}
                <div className="absolute inset-0 border border-[#8C1D2A]/40 rounded-full animate-ping pointer-events-none" />
              </div>
            </div>

            <div className="text-xs bg-white py-2 px-4 rounded-xl border border-[#EAE1D1] font-mono text-gray-600">
              {breathPhase === 'Inhale' && 'Slowly take deep breath through nose in: 3..2..1'}
              {breathPhase === 'Hold' && 'Hold covenants in high wisdom: 3..2..1'}
              {breathPhase === 'Exhale' && 'Release anxieties, rest peacefully in Him: 3..2..1'}
            </div>

            <button 
              onClick={() => {
                setShowUPIMeditation(false);
                addPoints(15);
              }}
              className="w-full py-2.5 bg-[#8C1D2A] text-white hover:bg-[#a62232] rounded-xl text-xs font-bold uppercase tracking-wider transition"
            >
              Complete UPI Breath Session 
            </button>
          </div>
        </div>
      )}

      {/* SCRIPTURAL AUDIO DIALER MODAL ("Pay to Mobile No.") */}
      {showAudioDialer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#FDFBF7] border border-[#EAE1D1] rounded-[28px] max-w-md w-full p-6 space-y-5 shadow-2xl relative animate-fade-in text-[#2D2926]">
            <button 
              onClick={() => setShowAudioDialer(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold text-lg"
            >
              ✕
            </button>
            <div className="text-center space-y-1">
              <div className="inline-flex p-2 bg-red-50 text-[#8C1D2A] rounded-full">
                <Smartphone className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold">Scriptural Audio Dialer</h3>
              <p className="text-xs text-gray-500">
                Dial any verse via prompt text or phone keys to receive vocal prayer streaming & answers!
              </p>
            </div>

            {/* Quick pre-made speed dials */}
            <div className="flex justify-center gap-1.5 flex-wrap">
              {Object.keys(sampleScriptures).map((vers) => (
                <button
                  key={vers}
                  onClick={() => setDialedChapter(vers)}
                  className="px-2.5 py-1 bg-white border border-[#EAE1D1] rounded-lg text-[10px] text-gray-700 hover:border-[#8C1D2A]"
                >
                  ☏ {vers}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={dialedChapter}
                  onChange={(e) => setDialedChapter(e.target.value)}
                  placeholder="Enter Verse (e.g. John 3:16)"
                  className="flex-1 text-xs px-3 py-2 border border-[#EAE1D1] rounded-lg"
                />
                <button 
                  onClick={handleDialSearch}
                  className="px-4 bg-[#8C1D2A] text-white hover:bg-[#a62232] text-xs font-bold rounded-lg transition"
                >
                  Dial
                </button>
              </div>

              {/* Dialer Response Card */}
              <div className="bg-white p-4 rounded-xl border border-[#EAE1D1] space-y-2 text-center">
                <p className="text-[11px] uppercase tracking-widest font-mono text-[#8C1D2A] font-bold">Dial Output Stream</p>
                <p className="text-xs italic text-gray-800 leading-relaxed font-serif">"{dialResult}"</p>
                <div className="flex justify-center gap-4 pt-2">
                  <button 
                    onClick={() => {
                      if ('speechSynthesis' in window) {
                        const utterance = new SpeechSynthesisUtterance(dialResult);
                        utterance.rate = 1.0;
                        window.speechSynthesis.speak(utterance);
                      } else {
                        alert("Speech synthesis is not supported in this frame.");
                      }
                    }}
                    className="flex items-center gap-1 text-[10.5px] text-[#8C1D2A] font-bold hover:underline"
                  >
                    <Volume2 className="h-3.5 w-3.5" /> Read Aloud
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 max-w-xs mx-auto text-xs">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    if (key === '*') setDialedChapter('');
                    else if (key === '#') handleDialSearch();
                    else setDialedChapter(prev => prev + key);
                  }}
                  className="py-2.5 bg-white border border-[#EAE1D1] rounded-lg text-center hover:bg-[#EAE1D1] active:bg-[#DCD3C1] font-mono font-bold"
                >
                  {key}
                </button>
              ))}
            </div>

            <div className="text-[10px] text-gray-400 text-center font-mono">
              Dial **#** to route the Scripture translation. Dial ***** to clear keys.
            </div>
          </div>
        </div>
      )}

      {/* QR SCANNERS / COVENANT SCANNERS MODAL */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#FDFBF7] border border-[#EAE1D1] rounded-[28px] max-w-sm w-full p-6 text-center space-y-6 shadow-2xl relative animate-fade-in text-[#2D2926]">
            <button 
              onClick={() => setShowQRScanner(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold text-lg"
            >
              ✕
            </button>
            <div className="space-y-1">
              <div className="inline-flex p-2 bg-red-50 text-[#8C1D2A] rounded-full">
                <QrCode className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold">God's Time Covenant Scanner</h3>
              <p className="text-xs text-gray-500">Scan this QR Code with friends to share grace badges or transfer XP points!</p>
            </div>

            {/* Generated Simulated QR Code container */}
            <div className="bg-white p-4 rounded-2xl border border-[#EAE1D1] inline-block relative mx-auto shadow-sm group">
              <div className="w-44 h-44 bg-gray-100 flex items-center justify-center border-2 border-dashed border-[#8C1D2A] relative overflow-hidden">
                {/* Horizontal scanner light effect */}
                <div className="absolute inset-x-0 h-0.5 bg-red-600 animate-bounce top-0 pointer-events-none shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                
                {/* High fidelity simulated pixels QR block representation */}
                <div className="w-32 h-32 bg-[#2D2926] p-2 rounded-md flex flex-wrap content-start">
                  {/* Square corner indicators */}
                  <div className="w-10 h-10 border-4 border-white m-0.5 relative">
                    <div className="absolute inset-1 bg-[#2D2926]" />
                  </div>
                  <div className="flex-1 h-10 m-0.5 flex flex-wrap">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className={`w-2 h-2 m-0.5 ${i % 3 === 0 ? 'bg-white' : 'bg-transparent'}`} />
                    ))}
                  </div>
                  <div className="w-10 h-10 border-4 border-white m-0.5 relative">
                    <div className="absolute inset-1 bg-[#2D2926]" />
                  </div>
                  <div className="w-full h-10 flex">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className={`w-2 h-2 m-0.5 ${i % 2 === 0 ? 'bg-white' : 'bg-[#e5e5e5]/10'}`} />
                    ))}
                  </div>
                  <div className="w-10 h-10 border-4 border-white m-0.5 relative">
                    <div className="absolute inset-1 bg-[#2D2926]" />
                  </div>
                  {/* Small QR center badge logo */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#8C1D2A] rounded-md border-2 border-white flex items-center justify-center text-[10px] text-white font-bold font-serif font-black">
                    9
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs bg-amber-50 p-3 rounded-xl border border-amber-100 font-serif text-amber-900 italic">
              "Thy word is a lamp unto my feet, and a light unto my path." — Psalm 119:105
            </div>

            <button 
              onClick={() => {
                setShowQRScanner(false);
                addPoints(25);
              }}
              className="w-full py-2.5 bg-[#8C1D2A] text-white hover:bg-[#a62232] rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-sm"
            >
              Simulate Active Scan Match (+25 XP)
            </button>
          </div>
        </div>
      )}

      {/* Floating active hymn notification if player is playing */}
      {hymnPlaying && (
        <div className="fixed bottom-20 sm:bottom-4 right-4 bg-white border border-[#EAE1D1] rounded-xl p-3 shadow-lg max-w-xs animate-slide-up z-50 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-50 text-[#8C1D2A] flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
            <Music className="h-4.5 w-4.5" />
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="text-[11px] font-bold text-gray-800 truncate">Now Streaming Hymn</h5>
            <p className="text-[10px] text-gray-500 italic truncate">{activeHymn}</p>
          </div>
          <button 
            onClick={() => setHymnPlaying(false)}
            className="text-[10px] text-gray-400 hover:text-black font-bold font-mono px-1.5"
          >
            ✕
          </button>
        </div>
      )}

    </div>
  );
}
