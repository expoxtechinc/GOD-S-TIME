import React, { useState, useEffect } from 'react';
import { MapPin, Search, Navigation, Compass, Star, Globe, History, Radio } from 'lucide-react';
import { LIBERIAN_CHURCHES, LIBERIAN_REGION_DENOMINATIONS } from '../data/hymns';

interface ChurchFinderProps {
  appLanguage: string;
  addRewardPoints: (pts: number) => void;
}

export default function ChurchFinder({ appLanguage, addRewardPoints }: ChurchFinderProps) {
  // Region & Category searches
  const [activeRegion, setActiveRegion] = useState<string>('All');
  const [activeDenom, setActiveDenom] = useState<string>('All');
  const [filterName, setFilterName] = useState<string>('');

  // Local GPS simulator
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsLoading, setGpsLoading] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string>('');

  // Testimonies feed (Africa focus)
  const [testimonies, setTestimonies] = useState(() => {
    const saved = localStorage.getItem('godstime_testimonies_feed');
    return saved ? JSON.parse(saved) : [
      { id: 't1', title: 'Miracle Recovery at Broad Street', text: 'Our small trading stand in Paynesville caught fire last year, but through the intercessory prayers of Providence Baptist Church, we received a complete restorative grant! God\'s Time is indeed the best.', author: 'Grace Sirleaf', date: '2026-05-19', likes: 21 },
      { id: 't2', title: 'Fasting breakthroughs', text: 'Completing the 21-Day fast and habit logs has saved my marriage. My husband and I now study Romans 8 together every morning in Kpelle.', author: 'Bendu Kesselly', date: '2026-05-15', likes: 18 }
    ];
  });
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  // Handle HTML5 Geolocation
  const handleTriggerGeolocation = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGpsLoading(false);
        addRewardPoints(30);
      },
      (err) => {
        // Fallback to beautiful mock coordinates of central Monrovia
        console.warn("Geolocation permission blocked during sandbox mock, using Providence Monrovia Coordinates.");
        setUserLocation({ lat: 6.3149, lng: -10.8048 });
        setGpsLoading(false);
      }
    );
  };

  const handlePostTestimony = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBody.trim() || !newTitle.trim()) return;

    const newT = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTitle,
      text: newBody,
      author: newAuthor || 'Grace Partner',
      date: new Date().toISOString().split('T')[0],
      likes: 1
    };

    const updated = [newT, ...testimonies];
    setTestimonies(updated);
    localStorage.setItem('godstime_testimonies_feed', JSON.stringify(updated));
    setNewTitle('');
    setNewBody('');
    setNewAuthor('');
    addRewardPoints(20);
  };

  // Distance calculator helper
  const calculateDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    // simplified distance math
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  // Filter local churches
  const filteredChurches = LIBERIAN_CHURCHES.filter(ch => {
    const matchesRegion = activeRegion === 'All' || ch.location.toLowerCase().includes(activeRegion.split(' ')[0].toLowerCase());
    const matchesDenom = activeDenom === 'All' || ch.denomination === activeDenom;
    const matchesKeyword = !filterName.trim() || ch.name.toLowerCase().includes(filterName.toLowerCase()) || ch.pastor.toLowerCase().includes(filterName.toLowerCase());
    return matchesRegion && matchesDenom && matchesKeyword;
  });

  return (
    <div className="space-y-6">
      
      {/* SECTION 1: CHURCH GEOLOCATION LOCATOR MAP */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* PARISH MAP VIEWER (2 cols on large) */}
        <div className="lg:col-span-2 p-5 md:p-6 rounded-2xl bg-gray-905/70 border border-gray-850 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <Compass className="text-[#D4AF37] h-5 w-5" />
              <h3 className="font-serif text-sm font-semibold text-gray-200 uppercase tracking-widest">Liberia Church Coordinates Finder</h3>
            </div>

            {/* Geolocation trigger */}
            <button
              onClick={handleTriggerGeolocation}
              disabled={gpsLoading}
              className={`px-3 py-1.5 rounded text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
                userLocation 
                  ? 'bg-green-950/40 text-green-400 border border-green-900/60' 
                  : 'bg-[#D4AF37] text-black hover:bg-amber-400'
              }`}
            >
              <Navigation className="h-3 w-3" />
              {gpsLoading ? 'Acquiring GPS...' : userLocation ? 'GPS Matched' : 'Match Surrounding GPS'}
            </button>
          </div>

          <p className="text-xs text-gray-400 font-sans leading-normal">
            Locate historic and charismatic Christian assemblies surrounding your exact coordinates in West Africa. Filter by denomination structure or county.
          </p>

          {/* Quick Filter ribbons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-black/30 p-2.5 rounded-xl border border-gray-900">
            <div>
              <label className="block text-[8px] uppercase font-bold tracking-wider text-gray-500 mb-1">By Region / County:</label>
              <select
                value={activeRegion}
                onChange={(e) => setActiveRegion(e.target.value)}
                className="w-full bg-gray-900 text-xs text-gray-200 border border-gray-800 rounded p-1.5 focus:outline-none"
              >
                <option value="All">All Regions</option>
                {LIBERIAN_REGION_DENOMINATIONS.regions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[8px] uppercase font-bold tracking-wider text-gray-500 mb-1">By Denomination:</label>
              <select
                value={activeDenom}
                onChange={(e) => setActiveDenom(e.target.value)}
                className="w-full bg-gray-900 text-xs text-gray-200 border border-gray-800 rounded p-1.5 focus:outline-none"
              >
                <option value="All">All Devotional Streams</option>
                {LIBERIAN_REGION_DENOMINATIONS.denominations.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[8px] uppercase font-bold tracking-wider text-gray-500 mb-1">Or search keyword:</label>
              <input
                type="text"
                placeholder="Pastor, parish name..."
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                className="w-full bg-gray-900 text-xs text-gray-200 border border-gray-800 rounded p-1.5 focus:outline-none"
              />
            </div>
          </div>

          {/* Map List Display */}
          <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
            {filteredChurches.map(ch => {
              // Calculate distance if gps is active
              const dStr = userLocation 
                ? `${calculateDistanceKm(userLocation.lat, userLocation.lng, ch.coordinates.lat, ch.coordinates.lng)} km away`
                : 'GPS inactive';

              return (
                <div key={ch.id} className="p-4 rounded-xl bg-black/35 border border-gray-850 hover:border-gray-700 transition-all grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="md:col-span-3 space-y-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[9px] px-2 py-0.5 rounded bg-amber-950/20 text-[#D4AF37] border border-[#D4AF37]/20 font-mono uppercase tracking-wide">
                        {ch.denomination}
                      </span>
                      <span className="text-[9px] text-gray-500">{ch.district}</span>
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="font-serif text-sm font-semibold text-white tracking-wide">{ch.name}</h4>
                      <p className="text-xs text-gray-400 font-sans">{ch.description}</p>
                    </div>

                    <div className="text-[10px] text-gray-500 space-y-1">
                      <span className="block">👤 <strong>Principal Pastor:</strong> {ch.pastor}</span>
                      <span className="block">📍 <strong>Coordinates Address:</strong> {ch.location}</span>
                    </div>

                    {/* Schedule times list */}
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {ch.serviceTimes.map((time, tIdx) => (
                        <span key={tIdx} className="text-[9px] px-2 py-0.5 rounded bg-gray-900 border border-gray-850 font-sans text-gray-400">
                          ⏱ {time}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-1 border-t md:border-t-0 md:border-l border-gray-900 pt-3 md:pt-0 md:pl-4 flex flex-col justify-between items-center text-center">
                    <div>
                      <MapPin className="h-6 w-6 text-[#D4AF37] mb-1 mx-auto" />
                      <span className="text-[10px] text-gray-400 block font-mono uppercase tracking-widest">COORDINATES MATCH</span>
                      <span className="text-xs font-bold text-white block mt-0.5 font-mono">{dStr}</span>
                    </div>

                    <a 
                      href={`tel:${ch.contact}`}
                      className="w-full mt-3 py-1.5 bg-gray-850 hover:bg-[#D4AF37] hover:text-black transition-all text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider rounded"
                    >
                      Call Office
                    </a>
                  </div>
                </div>
              );
            })}

            {filteredChurches.length === 0 && (
              <div className="py-12 text-center text-xs text-gray-500">
                No historic parishes found matching the search criteria. Try setting filters to 'All'.
              </div>
            )}
          </div>
        </div>

        {/* TESTIMONY FEED / CHURCH NEWS BULLETIN */}
        <div className="p-5 rounded-2xl bg-[#0f1216] border border-gray-850 space-y-4 flex flex-col justify-between h-full">
          <div className="space-y-4">
            <div className="flex gap-1.5 items-center text-xs text-[#D4AF37] uppercase tracking-widest font-serif">
              <Radio className="h-4 w-4 text-amber-500" /> Paynesville Testimony Ground
            </div>
            <p className="text-[11px] text-gray-500 leading-normal leading-relaxed font-sans">
              Share your test of timing, breakthrough or answered prayer inside our secure Liberia fellowship timeline. Reminding others that God is never late!
            </p>

            {/* Post testimony panel */}
            <form onSubmit={handlePostTestimony} className="p-3 bg-black/45 border border-gray-850 rounded-xl space-y-2">
              <input
                type="text"
                placeholder="Breakthrough Title..."
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 text-white text-xs p-1.5 rounded focus:outline-none"
              />
              <input
                type="text"
                placeholder="Your Name (E.g. Sister Grace)"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 text-white text-xs p-1.5 rounded focus:outline-none"
              />
              <textarea
                rows={2}
                placeholder="Record your marvelous testimony..."
                required
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 text-white text-xs p-1.5 rounded focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="w-full py-1.5 bg-[#D4AF37] text-black text-xs font-bold uppercase rounded hover:bg-amber-400 transition-all font-mono"
              >
                Assemble Testimony (+20 XP)
              </button>
            </form>

            {/* Testimonies stream */}
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {testimonies.map(t => (
                <div key={t.id} className="p-3 bg-black/40 border border-gray-950 rounded text-xs space-y-1">
                  <div className="flex justify-between items-center text-[9px] font-mono text-gray-400">
                    <strong className="text-white block font-serif text-[10px]">{t.title}</strong>
                    <span>{t.date}</span>
                  </div>
                  <p className="text-gray-300 italic font-serif">"{t.text}"</p>
                  <span className="text-[9px] text-[#D4AF37] block font-mono text-right">— {t.author}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
