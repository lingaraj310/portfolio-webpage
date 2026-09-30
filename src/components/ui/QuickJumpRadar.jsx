import React from 'react';
import { LOCATIONS } from '../../data/portfolioData';
import IconHelper from './IconHelper';
import { sound } from '../../utils/audioEffects';

export default function QuickJumpRadar({
  activeLocation,
  onSelectLocation,
  currentStage
}) {
  if (currentStage === 'hero') return null;

  return (
    <div className="absolute bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto select-none max-w-[95vw] overflow-x-auto p-1.5 rounded-2xl bg-space-900/90 border border-slate-700/80 backdrop-blur-xl shadow-2xl flex items-center space-x-1 sm:space-x-2">
      <div className="px-2.5 py-1 text-[10px] font-mono text-neon-cyan font-bold tracking-wider uppercase border-r border-slate-800 flex items-center space-x-1.5 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
        <span>SECTORS</span>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-1.5">
        {LOCATIONS.map((loc) => {
          const isActive = activeLocation?.id === loc.id;
          return (
            <button
              key={loc.id}
              onClick={() => {
                sound.playSelect();
                sound.playWarp();
                onSelectLocation(loc);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`group relative px-2.5 py-1.5 rounded-xl text-xs font-space font-medium transition-all duration-300 flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-950 to-space-800 text-white border shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-space-800/80 border border-transparent'
              }`}
              style={{
                borderColor: isActive ? loc.color : 'transparent',
                boxShadow: isActive ? `0 0 15px ${loc.color}40` : 'none'
              }}
              title={`${loc.title} (${loc.city}, ${loc.country})`}
            >
              <div
                className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
                style={{ backgroundColor: loc.color }}
              />
              <span className="text-[11px] sm:text-xs font-semibold">{loc.title}</span>
              <span className="hidden lg:inline text-[9px] font-mono text-slate-500">[{loc.city}]</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
