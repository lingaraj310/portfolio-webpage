import React, { useState } from 'react';
import { LOCATIONS } from '../../data/portfolioData';
import IconHelper from './IconHelper';
import { sound } from '../../utils/audioEffects';
import { 
  Grid3X3, 
  Layers, 
  ArrowRight, 
  MapPin
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'ALL SECTORS (9)' },
  { id: 'identity', label: 'IDENTITY & VISION', ids: ['about', 'protosem', 'resume'] },
  { id: 'tech', label: 'PROJECTS & TECH', ids: ['projects', 'skillset', 'hackathons', 'experience'] },
  { id: 'network', label: 'ACADEMICS & CONNECT', ids: ['education', 'contact'] }
];

export default function MissionDockNav({
  activeLocation,
  onSelectNode
}) {
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('dock'); // 'dock' | 'matrix'

  // Filter locations based on category
  const filteredLocations = LOCATIONS.filter(loc => {
    if (activeCategory === 'all') return true;
    const cat = CATEGORIES.find(c => c.id === activeCategory);
    return cat ? cat.ids.includes(loc.id) : true;
  });

  const previewItem = hoveredLocation || activeLocation || LOCATIONS[0];

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. SECTOR MATRIX OVERVIEW OVERLAY (Full-Screen Holographic Command Deck)  */}
      {/* ========================================================================= */}
      {viewMode === 'matrix' && (
        <div className="fixed inset-0 z-40 bg-space-950/85 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-12 animate-fade-in select-none">
          {/* Matrix Header */}
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-neon-cyan animate-ping" />
              <h2 className="text-xl md:text-2xl font-orbitron font-extrabold text-white tracking-widest flex items-center gap-2">
                <Grid3X3 className="w-6 h-6 text-neon-cyan" />
                ORBITAL SECTOR MATRIX
              </h2>
              <span className="hidden sm:inline px-3 py-1 rounded-full bg-cyan-950/60 border border-neon-cyan/40 text-xs font-mono text-cyan-300">
                9 ACTIVE NODES
              </span>
            </div>

            <button
              onClick={() => {
                sound.playSelect();
                setViewMode('dock');
              }}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-500/20 hover:bg-cyan-500/40 border border-neon-cyan text-neon-cyan hover:text-white font-mono text-xs transition-all shadow-neon-cyan cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>RETURN TO DOCK VIEW</span>
            </button>
          </div>

          {/* 3x3 Responsive Holographic Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 my-auto max-w-7xl mx-auto w-full py-6 overflow-y-auto max-h-[75vh] custom-scrollbar">
            {LOCATIONS.map((loc, idx) => {
              const isCurrent = activeLocation?.id === loc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => {
                    sound.playSelect();
                    setViewMode('dock');
                    onSelectNode(loc);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer group flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-gradient-to-br from-cyan-950/90 via-space-900/90 to-space-950/90 border-neon-cyan shadow-[0_0_30px_rgba(0,240,255,0.4)] scale-[1.02]'
                      : 'bg-space-900/70 hover:bg-space-850/90 border-cyan-500/30 hover:border-neon-cyan/80 hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] hover:scale-[1.02]'
                  }`}
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-10 h-10 rounded-xl bg-space-950 border border-cyan-500/50 flex items-center justify-center text-neon-cyan group-hover:scale-110 transition-transform">
                          <IconHelper name={loc.iconName} className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-cyan-400 tracking-wider">
                            NODE #{idx + 1} &bull; {loc.sectorCode}
                          </span>
                          <h3 className="text-base font-orbitron font-bold text-white group-hover:text-neon-cyan transition-colors">
                            {loc.title}
                          </h3>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-space-950/90 border border-slate-700 text-[11px] font-mono text-slate-300 font-bold">
                        [{idx + 1}]
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-sans mb-3">
                      {loc.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-cyan-900/40 mt-2 text-xs font-mono text-slate-400">
                    <span className="flex items-center space-x-1 text-cyan-300">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{loc.city}, {loc.country}</span>
                    </span>

                    <span className="flex items-center space-x-1 text-neon-cyan font-bold group-hover:translate-x-1 transition-transform">
                      <span>OPEN</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center text-xs font-mono text-slate-500">
            Press [1–9] on keyboard to instantly jump to any sector &bull; Click anywhere on a card to launch
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FLOATING HOLOGRAPHIC PREVIEW DECK (Slides up on item hover)           */}
      {/* ========================================================================= */}
      {viewMode === 'dock' && previewItem && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-30 pointer-events-none w-full max-w-xl px-4 select-none">
          <div className="pointer-events-auto bg-space-950/90 border-2 border-neon-cyan/60 rounded-2xl p-4 shadow-[0_0_40px_rgba(0,240,255,0.35)] backdrop-blur-2xl transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Left Preview Info */}
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-950 to-space-900 border-2 border-neon-cyan flex items-center justify-center text-neon-cyan shadow-neon-cyan shrink-0">
                <IconHelper name={previewItem.iconName} className="w-7 h-7" />
              </div>
              <div className="text-left overflow-hidden">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-[10px] font-mono text-neon-cyan font-bold tracking-wider">
                    {previewItem.sectorCode}
                  </span>
                  <span className="text-[11px] font-mono text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    {previewItem.city}, {previewItem.country}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-orbitron font-extrabold text-white tracking-wide mt-0.5">
                  {previewItem.title}
                </h3>
                <p className="text-xs text-slate-300 font-sans line-clamp-1 mt-0.5">
                  {previewItem.tagline || previewItem.description}
                </p>
              </div>
            </div>

            {/* Right Action Button */}
            <button
              onClick={() => {
                sound.playSelect();
                onSelectNode(previewItem);
              }}
              onMouseEnter={() => sound.playHover()}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-neon-cyan to-sky-400 hover:from-white hover:to-neon-cyan text-space-950 font-orbitron font-extrabold text-xs tracking-wider cursor-pointer transition-all duration-200 shadow-[0_0_20px_rgba(0,240,255,0.7)] hover:scale-105 shrink-0"
            >
              <span>LAUNCH ROOM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MAIN COMMAND DOCK (Bottom Horizontal Control Bar)                      */}
      {/* ========================================================================= */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-auto select-none max-w-[96vw]">
        <div className="flex flex-col items-center">
          
          {/* Category Filter Chips & Matrix Toggle */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 mb-2 px-3 py-1 rounded-full bg-space-950/90 border border-cyan-500/30 backdrop-blur-xl shadow-lg">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playSelect();
                  setActiveCategory(cat.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-neon-cyan text-space-950 font-extrabold shadow-[0_0_12px_rgba(0,240,255,0.6)]'
                    : 'text-slate-400 hover:text-white hover:bg-space-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}

            <span className="w-px h-3 bg-slate-700 mx-1" />

            {/* Matrix View Toggle */}
            <button
              onClick={() => {
                sound.playSelect();
                setViewMode(viewMode === 'matrix' ? 'dock' : 'matrix');
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-cyan-950/60 hover:bg-cyan-900 border border-neon-cyan/40 text-cyan-300 hover:text-white text-[10px] font-mono transition-all cursor-pointer"
              title="Toggle Full-Screen Grid View"
            >
              <Grid3X3 className="w-3 h-3 text-neon-cyan" />
              <span className="hidden sm:inline">MATRIX</span>
            </button>
          </div>

          {/* Dock Glassmorphic Bar */}
          <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-2.5 rounded-2xl bg-space-950/95 border-2 border-cyan-500/40 shadow-[0_0_35px_rgba(0,240,255,0.3)] backdrop-blur-2xl overflow-x-auto max-w-full custom-scrollbar">
            {filteredLocations.map((loc) => {
              const originalIndex = LOCATIONS.findIndex(l => l.id === loc.id) + 1;
              const isSelected = activeLocation?.id === loc.id;
              const isHovered = hoveredLocation?.id === loc.id;

              return (
                <button
                  key={loc.id}
                  onClick={() => {
                    sound.playSelect();
                    onSelectNode(loc);
                  }}
                  onMouseEnter={() => {
                    sound.playHover();
                    setHoveredLocation(loc);
                  }}
                  onMouseLeave={() => setHoveredLocation(null)}
                  className={`group relative flex flex-col items-center justify-center p-2 sm:px-3 sm:py-2 rounded-xl transition-all duration-200 cursor-pointer shrink-0 ${
                    isSelected || isHovered
                      ? 'bg-gradient-to-b from-cyan-500/30 to-cyan-900/50 border border-neon-cyan shadow-[0_0_20px_rgba(0,240,255,0.6)] scale-110 -translate-y-1'
                      : 'bg-space-900/70 hover:bg-space-850 border border-slate-800 hover:border-cyan-500/50'
                  }`}
                  title={`${loc.title} (${loc.city})`}
                >
                  {/* Shortcut Number Badge */}
                  <span className="absolute -top-2 -right-1 px-1.5 py-0.2 rounded-full bg-space-950 border border-cyan-500/60 text-[9px] font-mono text-cyan-300 font-bold group-hover:border-neon-cyan group-hover:text-white shadow">
                    {originalIndex}
                  </span>

                  {/* Icon */}
                  <div className={`p-1.5 rounded-lg transition-transform ${
                    isSelected || isHovered ? 'text-neon-cyan scale-110' : 'text-slate-300 group-hover:text-white'
                  }`}>
                    <IconHelper name={loc.iconName} className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  {/* Label */}
                  <span className={`text-[10px] sm:text-[11px] font-orbitron font-bold whitespace-nowrap mt-0.5 tracking-tight transition-colors ${
                    isSelected || isHovered ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  }`}>
                    {loc.title}
                  </span>

                  {/* Active Indicator Dot */}
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-ping mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}
