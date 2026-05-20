import React, { useState } from 'react';
import { Target, Plus, Calendar, CheckSquare, Award, Flame, Star, BookOpen, Clock, Heart, Trash2 } from 'lucide-react';
import { Goal, Habit } from '../types';

interface GoalPlannerProps {
  streakDays: number;
  incrementStreak: () => void;
  addRewardPoints: (pts: number) => void;
}

export default function GoalPlanner({ streakDays, incrementStreak, addRewardPoints }: GoalPlannerProps) {
  // Local active goals
  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('godstime_spiritual_goals');
    return saved ? JSON.parse(saved) : [
      {
        id: 'g1',
        title: 'Complete 30-Day New Believers Reading Plan',
        category: 'Spiritual',
        targetDate: '2026-06-25',
        verses: ['John 3:16', 'Romans 8:28'],
        quotes: ['He who has God has everything. Wait patiently on His calendar.'],
        milestones: [
          { id: 'm1', text: 'Complete Gospels of Matthew & John', completed: true },
          { id: 'm2', text: 'Write down 5 personal life reflections', completed: false },
          { id: 'm3', text: 'Share testimony with study partner', completed: false }
        ],
        completed: false
      },
      {
        id: 'g2',
        title: 'Maintain Daily Quiet Time At 6:00 AM',
        category: 'Personal',
        targetDate: '2026-06-10',
        verses: ['Psalm 23:1'],
        quotes: ['Faith does not eliminate questions.'],
        milestones: [
          { id: 'm4', text: 'Wake up at 5:45 am without snooze', completed: true },
          { id: 'm5', text: 'Engage 10 days of prayer tracking', completed: true }
        ],
        completed: true
      }
    ];
  });

  // Local active habits
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('godstime_spiritual_habits');
    return saved ? JSON.parse(saved) : [
      { id: 'h1', name: 'Scrutinize Daily Devotions', frequency: 'daily', streak: 4, history: ['2026-05-19'] },
      { id: 'h2', name: 'Intercessory Prayer Hour', frequency: 'daily', streak: 2, history: ['2026-05-19'] },
      { id: 'h3', name: 'Study African Heritage Theology', frequency: 'weekly', streak: 1, history: [] }
    ];
  });

  // New goal form states
  const [showAddGoal, setShowAddGoal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCat, setNewCat] = useState<'Spiritual' | 'Personal' | 'Professional'>('Spiritual');
  const [newDate, setNewDate] = useState<string>('2026-06-30');
  const [newVerses, setNewVerses] = useState<string>('');
  const [newMilestonesText, setNewMilestonesText] = useState<string>('');

  // New habit state
  const [newHabitName, setNewHabitName] = useState<string>('');

  // Handle Goal save
  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const parsedMilestones = newMilestonesText
      .split('\n')
      .filter(line => line.trim())
      .map((line, idx) => ({ id: `m_new_${idx}`, text: line.trim(), completed: false }));

    const newGoal: Goal = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTitle,
      category: newCat,
      targetDate: newDate,
      verses: newVerses.split(',').map(v => v.trim()).filter(Boolean),
      quotes: ["Walk in the timing of the Almighty."],
      milestones: parsedMilestones,
      completed: false
    };

    const updated = [newGoal, ...goals];
    setGoals(updated);
    localStorage.setItem('godstime_spiritual_goals', JSON.stringify(updated));
    addRewardPoints(25);
    
    // reset form
    setNewTitle('');
    setNewVerses('');
    setNewMilestonesText('');
    setShowAddGoal(false);
  };

  const handleToggleMilestone = (goalId: string, milestoneId: string) => {
    const updated = goals.map(g => {
      if (g.id !== goalId) return g;
      const updatedMilestones = g.milestones.map(m => {
        if (m.id !== milestoneId) return m;
        return { ...m, completed: !m.completed };
      });
      // Check if all are completed
      const allDone = updatedMilestones.every(m => m.completed);
      if (allDone && !g.completed) {
        addRewardPoints(50);
      }
      return { ...g, milestones: updatedMilestones, completed: allDone };
    });
    setGoals(updated);
    localStorage.setItem('godstime_spiritual_goals', JSON.stringify(updated));
  };

  const handleDeleteGoal = (id: string) => {
    const updated = goals.filter(g => g.id !== id);
    setGoals(updated);
    localStorage.setItem('godstime_spiritual_goals', JSON.stringify(updated));
  };

  // Habits handling
  const handleAddNewHabit = () => {
    if (!newHabitName.trim()) return;
    const newH: Habit = {
      id: Math.random().toString(36).substr(2, 9),
      name: newHabitName,
      frequency: 'daily',
      streak: 0,
      history: []
    };
    const updated = [...habits, newH];
    setHabits(updated);
    localStorage.setItem('godstime_spiritual_habits', JSON.stringify(updated));
    setNewHabitName('');
    addRewardPoints(15);
  };

  const handleCompleteHabit = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    const updated = habits.map(h => {
      if (h.id !== id) return h;
      if (h.history.includes(today)) return h; // already completed today
      const newHist = [...h.history, today];
      h.streak = h.streak + 1;
      addRewardPoints(10);
      incrementStreak(); // increment parent Bible read readingStreak
      return { ...h, streak: h.streak, history: newHist, lastCompleted: today };
    });
    setHabits(updated);
    localStorage.setItem('godstime_spiritual_habits', JSON.stringify(updated));
  };

  // Stats calculation
  const totalCompletedGoals = goals.filter(g => g.completed).length;
  const totalSpiritualGoals = goals.filter(g => g.category === 'Spiritual').length;

  return (
    <div className="space-y-6">
      
      {/* HEADER STREAK METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Streak Display Card */}
        <div className="p-4 rounded-xl bg-[#1d140b] border border-[#D4AF37]/40 flex items-center gap-4">
          <div className="p-4 rounded-full bg-[#D4AF37]/15">
            <Flame className="h-7 w-7 text-[#D4AF37] fill-[#D4AF37] animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block uppercase font-mono">BIBLE READING STREAK</span>
            <strong className="text-2xl font-serif text-[#D4AF37]">{streakDays} Consecutive Days</strong>
            <span className="text-[10px] text-amber-100/50 block">Your local streak has been secured.</span>
          </div>
        </div>

        {/* Goal completion ratio card */}
        <div className="p-4 rounded-xl bg-[#0b131c] border border-blue-900/30 flex items-center gap-4">
          <div className="p-4 rounded-full bg-blue-500/10">
            <Target className="h-7 w-7 text-blue-400" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block uppercase font-mono">ACTIVE PLAN PROGRESS</span>
            <strong className="text-2xl font-serif text-white">{totalCompletedGoals} / {goals.length} Plans</strong>
            <span className="text-[10px] text-blue-300/50 block">Milestones reflect real growth.</span>
          </div>
        </div>

        {/* Achievements badging */}
        <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-850 flex items-center gap-4">
          <div className="p-4 rounded-full bg-amber-500/10">
            <Award className="h-7 w-7 text-amber-500" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block uppercase font-mono">EARNED BADGES GALLERY</span>
            <div className="flex gap-1.5 mt-1">
              <span className="text-xs px-2 py-0.5 rounded bg-[#D4AF37]/10 text-[#D4AF37] uppercase font-mono" title="Daily Reading Streak Hero">🔥 Pioneer</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 uppercase font-mono" title="Annotator Master">📖 Sage</span>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 uppercase font-mono">💡 Light</span>
            </div>
          </div>
        </div>

      </div>

      {/* TWO SECTIONS: Core Goal Planner & Daily Habit Tracker logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN: SPIRITUAL COGNITIVE PLANNER */}
        <div className="p-5 rounded-2xl bg-[#0f1216] border border-gray-850 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Target className="text-[#D4AF37] h-5 w-5" />
              <h3 className="font-serif text-sm font-semibold text-gray-200 uppercase tracking-widest">SMART Spiritual Goals</h3>
            </div>
            <button
              onClick={() => setShowAddGoal(!showAddGoal)}
              className="text-xs px-2.5 py-1 rounded bg-[#D4AF37] text-black font-bold uppercase tracking-wider hover:bg-amber-400 transition-all flex items-center gap-1"
            >
              <Plus className="h-3 w-3" /> New Goal
            </button>
          </div>

          {showAddGoal && (
            <form onSubmit={handleCreateGoal} className="p-4 rounded-xl bg-black/50 border border-gray-800 space-y-3 animate-fadeIn">
              <div className="text-xs font-semibold text-[#D4AF37] border-b border-gray-800 pb-1 uppercase">Define Covenant Milestones</div>
              
              <div>
                <label className="block text-[9px] text-gray-400 uppercase mb-1">Goal Vision Statement</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Complete Proverbs study with daily commentary"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-gray-900 text-xs text-white border border-gray-800 rounded p-2 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] text-gray-400 uppercase mb-1">Timing Category</label>
                  <select
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value as any)}
                    className="w-full bg-gray-900 text-xs text-white border border-gray-800 rounded p-2"
                  >
                    <option value="Spiritual">Spiritual (Habitual)</option>
                    <option value="Personal">Personal Development</option>
                    <option value="Professional">Professional Integrity</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] text-gray-400 uppercase mb-1">Target Grace Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-gray-900 text-xs text-white border border-gray-800 rounded p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] text-gray-400 uppercase mb-1">Focused Verses (comma separated)</label>
                <input
                  type="text"
                  placeholder="E.g., Psalm 119:105, Romans 12:2"
                  value={newVerses}
                  onChange={(e) => setNewVerses(e.target.value)}
                  className="w-full bg-gray-900 text-xs text-white border border-gray-800 rounded p-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] text-gray-400 uppercase mb-1">Action Items / Milestones (1 per line)</label>
                <textarea
                  rows={2}
                  value={newMilestonesText}
                  onChange={(e) => setNewMilestonesText(e.target.value)}
                  placeholder="Review with accountability partner&#10;Write reflections weekly"
                  className="w-full bg-gray-900 text-xs text-white border border-gray-800 rounded p-2 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#D4AF37] text-black text-xs font-bold rounded hover:bg-amber-400 uppercase transition-all"
              >
                Assemble Goal (+25 Key Points)
              </button>
            </form>
          )}

          {/* Goals catalog */}
          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
            {goals.map(goal => (
              <div 
                key={goal.id} 
                className={`p-4 rounded-xl border transition-all ${
                  goal.completed 
                    ? 'bg-[#121c15] border-green-900/60' 
                    : 'bg-black/30 border-gray-850'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase ${
                      goal.category === 'Spiritual' ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'bg-blue-900/20 text-blue-400'
                    }`}>
                      {goal.category} Timing
                    </span>
                    <h4 className={`font-serif text-sm font-semibold mt-1.5 ${goal.completed ? 'text-gray-400 line-through' : 'text-gray-100'}`}>
                      {goal.title}
                    </h4>
                  </div>
                  
                  <button 
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="p-1 text-gray-600 hover:text-red-400 rounded transition-colors"
                    title="Delete goal"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Sub verses associated with goal */}
                {goal.verses.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    <span className="text-[9px] text-gray-500 font-bold mr-1">Verses:</span>
                    {goal.verses.map((v, vIdx) => (
                      <span key={vIdx} className="text-[9px] px-1.5 py-0.5 rounded bg-gray-900 text-gray-300 font-mono italic">
                        {v}
                      </span>
                    ))}
                  </div>
                )}

                {/* Milestones checklists */}
                <div className="mt-3.5 space-y-1.5 border-t border-gray-900 pt-3">
                  <span className="text-[9px] uppercase tracking-wider text-[#D4AF37] block font-bold font-mono">Covenant Milestones:</span>
                  {goal.milestones.map(m => (
                    <label 
                      key={m.id} 
                      className="flex items-start gap-2 text-xs text-gray-300 cursor-pointer select-none hover:text-white"
                    >
                      <input 
                        type="checkbox" 
                        checked={m.completed}
                        onChange={() => handleToggleMilestone(goal.id, m.id)}
                        className="mt-0.5 text-[#D4AF37] bg-gray-900 rounded border-gray-700 focus:outline-none focus:ring-0 active:ring-0" 
                      />
                      <span className={m.completed ? 'text-gray-500 line-through' : ''}>
                        {m.text}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between text-[10px] text-gray-500 pt-1.5">
                  <span className="flex items-center gap-1 font-serif">
                    <Calendar className="h-3 w-3" /> Target: {goal.targetDate}
                  </span>
                  {goal.completed && (
                    <span className="text-green-400 font-bold uppercase tracking-wider">🎉 Vision Achieved</span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: REWARDING HABIT TRACKER LOGS */}
        <div className="p-5 rounded-2xl bg-[#0f1216] border border-gray-850 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare className="text-[#D4AF37] h-5 w-5" />
              <h3 className="font-serif text-sm font-semibold text-gray-200 uppercase tracking-widest">Habit Mastery Log</h3>
            </div>
            <span className="text-[10px] text-[#D4AF37] font-mono tracking-wide">Earn points on every completion</span>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed font-sans mt-1">
            Build compounding devotion habits. Committing acts daily builds reading streaks and awards you points for our custom badges gallery.
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="E.g., Reflect upon Proverb Daily..."
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              className="flex-1 bg-black/65 text-xs border border-gray-850 p-2.5 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
              onKeyDown={(e) => e.key === 'Enter' && handleAddNewHabit()}
            />
            <button
              onClick={handleAddNewHabit}
              className="px-4 py-2 bg-gray-850 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black transition-all font-bold text-xs uppercase"
            >
              Add
            </button>
          </div>

          <div className="space-y-3.5 pt-2 max-h-[350px] overflow-y-auto">
            {habits.map(h => {
              const today = new Date().toISOString().split('T')[0];
              const isCheckedToday = h.history.includes(today);

              return (
                <div key={h.id} className="p-3.5 rounded-xl bg-black/30 border border-gray-850 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-serif font-semibold text-white tracking-wide">{h.name}</h4>
                    <span className="text-[9px] text-gray-500 flex items-center gap-1 mt-1">
                      <Clock className="h-2.5 w-2.5" /> Frequency: Daily • STREAK: {h.streak} 🔥
                    </span>
                  </div>

                  <button
                    disabled={isCheckedToday}
                    onClick={() => handleCompleteHabit(h.id)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                      isCheckedToday 
                        ? 'bg-green-950/40 text-green-400 border border-green-900/50' 
                        : 'bg-[#D4AF37] text-black hover:bg-amber-400'
                    }`}
                  >
                    {isCheckedToday ? '✓ Done Today' : '+ Complete (+10 XP)'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
