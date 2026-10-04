import React from 'react';
import { LOCATIONS } from '../../data/portfolioData';
import IconHelper from './IconHelper';
import { sound } from '../../utils/audioEffects';
import { ChevronLeft, ChevronRight, Globe, Compass, Sparkles } from 'lucide-react';

export default function EarthNavigatorHUD({
  activeLocation,
  onSelectLocation,
  currentStage
}) {
  if (currentStage !== 'orbit') return null;

  const currentIndex = LOCATIONS.findIndex(l => l.id === activeLocation?.id);
  const prevIndex = (currentIndex - 1 + LOCATIONS.length) % LOCATIONS.length;
  const nextIndex = (currentIndex + 1) % LOCATIONS.length;

  const prevLocation = LOCATIONS[prevIndex];
  const nextLocation = LOCATIONS[nextIndex];

  const handlePrev = () => {
    sound.playSelect();
    onSelectLocation(prevLocation);
  };

  const handleNext = () => {
    sound.playSelect();
    onSelectLocation(nextLocation);
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. FLOATING ORBITAL STEER BUTTONS (LEFT & RIGHT EDGES)                     */}
      {/* ========================================================================= */}
      <div className="fixed inset-y-0 left-4 sm:left-6 z-30 flex items-center pointer-events-none select-none">
        <button
          onClick={handlePrev}
          onMouseEnter={() => sound.playHover()}
          className="pointer-events-auto group flex items-center space-x-2 px-3 py-3 rounded-2xl bg-space-950/85 hover:bg-space-900 border-2 border-cyan-500/40 hover:border-neon-cyan shadow-[0_0_25px_rgba(0,240,255,0.3)] backdrop-blur-2xl transition-all duration-300 hover:scale-110 cursor-pointer"
          title={`Rotate Earth to ${prevLocation.title} (${prevLocation.city})`}
        >
          <ChevronLeft className="w-5 h-5 text-neon-cyan group-hover:-translate-x-1 transition-transform" />
          <div className="hidden md:flex flex-col text-left">
            <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase">PREV SECTOR</span>
            <span className="text-xs font-orbitron font-extrabold text-white group-hover:text-neon-cyan transition-colors">
              {prevLocation.title}
            </span>
          </div>
        </button>
      </div>

      <div className="fixed inset-y-0 right-4 sm:right-6 z-30 flex items-center pointer-events-none select-none">
        <button
          onClick={handleNext}
          onMouseEnter={() => sound.playHover()}
          className="pointer-events-auto group flex items-center space-x-2 px-3 py-3 rounded-2xl bg-space-950/85 hover:bg-space-900 border-2 border-cyan-500/40 hover:border-neon-cyan shadow-[0_0_25px_rgba(0,240,255,0.3)] backdrop-blur-2xl transition-all duration-300 hover:scale-110 cursor-pointer"
          title={`Rotate Earth to ${nextLocation.title} (${nextLocation.city})`}
        >
          <div className="hidden md:flex flex-col text-right">
            <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase">NEXT SECTOR</span>
            <span className="text-xs font-orbitron font-extrabold text-white group-hover:text-neon-cyan transition-colors">
              {nextLocation.title}
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-neon-cyan group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. MINIMAL BOTTOM ORBIT GUIDANCE RIBBON & QUICK SECTOR DOTS                */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto select-none max-w-[94vw]">
        <div className="flex flex-col items-center">
          
          {/* 9 Mini Holographic Quick-Jump Node Dots */}
          <div className="flex items-center space-x-2 mb-2.5 p-1.5 rounded-full bg-space-950/90 border border-cyan-500/40 backdrop-blur-xl shadow-lg">
            {LOCATIONS.map((loc, idx) => {
              const isCurrent = activeLocation?.id === loc.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => {
                    sound.playSelect();
                    onSelectLocation(loc);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`group relative flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? 'w-8 h-8 rounded-full bg-neon-cyan text-space-950 shadow-[0_0_20px_rgba(0,240,255,0.8)] scale-110 font-extrabold'
                      : 'w-7 h-7 rounded-full bg-space-900/80 hover:bg-space-850 text-slate-300 hover:text-white border border-slate-700 hover:border-cyan-400'
                  }`}
                  title={`${loc.title} (${loc.city}, ${loc.country}) - Press [${idx + 1}]`}
                >
                  <IconHelper name={loc.iconName} className={isCurrent ? "w-4 h-4" : "w-3.5 h-3.5"} />
                  
                  {/* Tooltip on hover */}
                  <div className="absolute -top-9 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none px-2.5 py-1 rounded-full bg-space-950/98 border border-neon-cyan text-[10px] font-orbitron font-bold text-white whitespace-nowrap shadow-neon-cyan">
                    {loc.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Exploration Hint Bar */}
          <div className="flex items-center space-x-3 px-4 py-2 rounded-2xl bg-space-950/90 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,240,255,0.25)] backdrop-blur-2xl text-xs font-mono text-slate-300">
            <span className="flex items-center space-x-1.5 text-neon-cyan font-bold">
              <Globe className="w-4 h-4 animate-spin-slow" />
              <span>SPATIAL 3D EARTH</span>
            </span>
            <span className="hidden sm:inline text-slate-500">&bull;</span>
            <span className="hidden sm:inline text-slate-300">
              Drag or rotate the globe to explore all sectors &bull; Click any card on Earth to enter
            </span>
            <span className="sm:hidden text-slate-300">
              Rotate Earth & click any card
            </span>
          </div>

        </div>
      </div>
    </>
  );
}
