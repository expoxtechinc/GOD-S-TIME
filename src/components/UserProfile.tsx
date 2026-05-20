import React, { useState } from 'react';
import { User, Award, Globe, ShieldAlert, Sparkles, Settings, BookmarkCheck, Star, RefreshCw } from 'lucide-react';
import { UserProfile as ProfileType } from '../types';

interface UserProfileProps {
  profile: ProfileType;
  updateProfile: (updates: Partial<ProfileType>) => void;
  addRewardPoints: (pts: number) => void;
}

export default function UserProfile({ profile, updateProfile, addRewardPoints }: UserProfileProps) {
  // Editing state
  const [userName, setUserName] = useState<string>(profile.name || 'Faith Builder');
  const [userDenom, setUserDenom] = useState<string>(profile.denomination || 'Pentecostal');
  const [userRegion, setUserRegion] = useState<string>(profile.region || 'Montserrado (Monrovia)');
  const [lang, setLang] = useState<string>(profile.bibleLanguage || 'English');
  const [story, setStory] = useState<string>(profile.spiritualStory || 'Faith seeker striving to fulfill spiritual purpose under God\'s timing.');

  // Onboarding questionnaire answers
  const [lifeStage, setLifeStage] = useState<string>('Young Adult');
  const [primeStruggle, setPrimeStruggle] = useState<string>('Overcoming Fear & Worry');
  const [timingGoal, setTimingGoal] = useState<string>('Establish 6:00 am prayer routine');

  // Trigger onboarding submit
  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: userName,
      denomination: userDenom,
      region: userRegion,
      spiritualStory: `Walking as a ${lifeStage} in Liberia. Primary focus: ${primeStruggle}. Core goal: ${timingGoal}. Reflection journey: ${story}`,
      bibleLanguage: lang,
      onboardingCompleted: true,
      points: profile.points + 50 // onboarding completes awards points!
    });
    addRewardPoints(50);
  };

  return (
    <div className="space-y-6 animate-fadeIn text-gray-200">
      
      {/* COVENANT PROGRESS SUMMARY */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-gray-900 to-black border border-gray-850 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="p-5 bg-[#D4AF37]/15 rounded-full border border-[#D4AF37]/35 flex items-center justify-center">
              <User className="h-8 w-8 text-[#D4AF37]" />
            </div>
            <span className="absolute bottom-0 right-0 p-1 bg-green-500 rounded-full border-2 border-black w-3.5 h-3.5" title="Covenant Sync Online" />
          </div>

          <div>
            <span className="text-[10px] text-gray-500 block uppercase font-mono tracking-wider">Covenant Discipleship</span>
            <h3 className="font-serif text-lg font-bold text-white tracking-wide">{profile.name || 'Grace Disciple'}</h3>
            <p className="text-xs text-[#D4AF37] font-sans mt-0.5">{profile.denomination} • {profile.region}</p>
          </div>
        </div>

        {/* Level & Points displaying */}
        <div className="flex gap-4">
          <div className="px-5 py-3 rounded-xl bg-gray-950 border border-gray-850 text-center min-w-24">
            <span className="text-[9px] text-gray-500 uppercase tracking-widest block font-mono">REWARD LEVELS</span>
            <span className="text-xl font-serif text-[#D4AF37] font-bold">LVL {Math.floor(profile.points / 100) + 1}</span>
          </div>

          <div className="px-5 py-3 rounded-xl bg-gray-950 border border-gray-850 text-center min-w-24">
            <span className="text-[9px] text-gray-500 uppercase tracking-widest block font-mono">REWARDS XP</span>
            <span className="text-xl font-serif text-white font-bold">{profile.points} XP</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SETTINGS CARD (takes 2 cols) */}
        <div className="lg:col-span-2 p-5 md:p-6 rounded-2xl bg-gray-905/70 border border-gray-850 space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
            <Settings className="text-[#D4AF37] h-5 w-5" />
            <h4 className="font-serif text-sm font-semibold uppercase tracking-widest">Spiritual Profile Preferences</h4>
          </div>

          <form onSubmit={handleOnboardingSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Disciple Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded p-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Primary Denomination Affiliation</label>
                <select
                  value={userDenom}
                  onChange={(e) => setUserDenom(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded p-2 text-xs text-white focus:outline-none"
                >
                  <option value="Non-denominational">Non-denominational</option>
                  <option value="Baptist">Baptist</option>
                  <option value="Methodist">Methodist</option>
                  <option value="Catholic">Catholic</option>
                  <option value="Episcopal">Episcopal</option>
                  <option value="Pentecostal">Pentecostal</option>
                  <option value="Lutheran">Lutheran</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">State / County Location</label>
                <input
                  type="text"
                  value={userRegion}
                  onChange={(e) => setUserRegion(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded p-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Bible Translation Language</label>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded p-2 text-xs text-white focus:outline-none"
                >
                  <option value="English">General English</option>
                  <option value="Liberian English">Liberian English / Colloquial</option>
                  <option value="Bassa">Bassa Vernacular (Bassa Bible)</option>
                  <option value="Kpelle">Kpelle (Gwala Kpana Bible)</option>
                  <option value="Vai">Vai Language</option>
                  <option value="Kru">Kru / Krahn dialect</option>
                </select>
              </div>
            </div>

            {/* Onboarding Questionnaire */}
            <div className="p-4 bg-black/40 border border-gray-850 rounded-xl space-y-3.5">
              <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-mono font-bold block">Onboarding Assessment & Personalization</span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase mb-1">Current Life Stage</label>
                  <select 
                    value={lifeStage}
                    onChange={(e) => setLifeStage(e.target.value)}
                    className="w-full bg-gray-900 text-xs text-gray-300 p-2 rounded border border-gray-800 focus:outline-none"
                  >
                    <option value="Youth (Student)">Youth Student (~ Paynesville / Monrovia High)</option>
                    <option value="Young Adult">Young Adult Builder</option>
                    <option value="Family Parent">Family Steward / Parent</option>
                    <option value="Elder Guide">Elder Spiritual Mentor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-gray-400 uppercase mb-1">Primary Trial / Battle Category</label>
                  <select 
                    value={primeStruggle}
                    onChange={(e) => setPrimeStruggle(e.target.value)}
                    className="w-full bg-gray-900 text-xs text-gray-300 p-2 rounded border border-gray-800 focus:outline-none"
                  >
                    <option value="Overcoming Fear & Worry">Overcoming Fear & Worry</option>
                    <option value="Lust & Moral Warfare">Lust & Moral Warfare</option>
                    <option value="Anger Management">Anger / Temper Calm</option>
                    <option value="Addiction Restoration">Addiction & Habitual Chains</option>
                    <option value="Depression / Loneliness">Depression & Heavy Hearts</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 uppercase mb-1">Timing & Devotion Goal Preferences</label>
                <input
                  type="text"
                  value={timingGoal}
                  onChange={(e) => setTimingGoal(e.target.value)}
                  placeholder="Establish 6:00 am prayer cycle..."
                  className="w-full bg-gray-900 border border-gray-800 text-xs text-white p-2 rounded focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Narrate Your Spiritual Story Context</label>
              <textarea
                rows={3}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Briefly review your covenant walk or testimony milestones here..."
                className="w-full bg-gray-900 border border-gray-850 rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider rounded font-mono hover:bg-amber-400 transition-all"
            >
              Commit Covenant Profile updates (+50 XP)
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: COVENANT BADGES ARCHIVE */}
        <div className="p-5 rounded-2xl bg-[#0f1216] border border-gray-850 space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <Award className="text-[#D4AF37] h-5 w-5" />
            <h4 className="font-serif text-xs font-semibold uppercase tracking-wider">Achievements & Badges</h4>
          </div>

          <p className="text-[11px] text-gray-400 font-sans leading-normal leading-relaxed">
            Unblock high badges by maintaining reading streaks, finishing bible FACT challenge trivia, or adding prayers to the Providence wall.
          </p>

          <div className="space-y-3 pt-2">
            
            <div className="p-3 bg-black/40 border border-gray-900 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🔥</span>
                <div>
                  <strong className="text-xs text-white font-serif block">Novice Reading Streak</strong>
                  <span className="text-[9px] text-gray-500 font-mono">Unlock on 3 consecutive days</span>
                </div>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded bg-green-950/20 text-green-400 border border-green-900/50">Unlocked</span>
            </div>

            <div className="p-3 bg-black/40 border border-gray-900 rounded-lg flex items-center justify-between opacity-80">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🛡️</span>
                <div>
                  <strong className="text-xs text-white font-serif block">Shield of Repentance</strong>
                  <span className="text-[9px] text-gray-500 font-mono font-sans font-bold block">Log 5 private confessions</span>
                </div>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded bg-gray-900 text-gray-400">Locked</span>
            </div>

            <div className="p-3 bg-black/40 border border-gray-900 rounded-lg flex items-center justify-between opacity-85">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🌍</span>
                <div>
                  <strong className="text-xs text-white font-serif block">Monrovia Intercessor</strong>
                  <span className="text-[9px] text-gray-500 font-mono font-sans font-bold block">Pray for 10 partners</span>
                </div>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded bg-gray-900 text-gray-400">Locked</span>
            </div>

            <div className="p-3 bg-black/40 border border-gray-900 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🎓</span>
                <div>
                  <strong className="text-xs text-white font-serif block">Scriptural Sage</strong>
                  <span className="text-[9px] text-gray-500 font-mono">Answer 3/3 Trivia Drill questions</span>
                </div>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded bg-green-950/20 text-green-400 border border-green-900/50">Completed</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
