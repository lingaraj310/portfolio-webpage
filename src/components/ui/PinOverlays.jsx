import React, { useState } from 'react';
import { LOCATIONS } from '../../data/portfolioData';
import IconHelper from './IconHelper';
import CyanMapPin from './CyanMapPin';
import { sound } from '../../utils/audioEffects';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';

export default function PinOverlays({
  projectedPins,
  activeLocation,
  onSelectLocation,
  currentStage
}) {
  const [hoveredPinId, setHoveredPinId] = useState(null);

  if (!projectedPins || currentStage === 'hero' || currentStage === 'landed') return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-25 overflow-hidden select-none">
      {LOCATIONS.map((loc, idx) => {
        const pin = projectedPins[loc.id];
        if (!pin || !pin.isVisible) return null;

        const isHome = loc.id === 'about';
        const isSelected = activeLocation?.id === loc.id;
        const isHovered = hoveredPinId === loc.id;

        // Facing angle (1.0 = dead center, ~0.15 = at horizon)
        const dot = pin.dot || 0.5;
        const scaleFactor = Math.max(0.72, Math.min(1.1, 0.7 + dot * 0.4));
        const opacityFactor = Math.max(0.35, Math.min(1.0, (dot - 0.1) * 2.2));

        return (
          <div
            key={loc.id}
            className="absolute pointer-events-auto transition-transform duration-150 ease-out"
            style={{
              transform: `translate3d(${pin.x}px, ${pin.y}px, 0)`,
              zIndex: isSelected || isHovered ? 40 : Math.round(dot * 30)
            }}
          >
            {/* Holographic Beacon Container */}
            <div
              className="relative -translate-x-1/2 -translate-y-full flex flex-col items-center group cursor-pointer transition-all duration-300"
              style={{
                transform: `scale(${isHovered ? scaleFactor * 1.18 : isSelected ? scaleFactor * 1.1 : scaleFactor})`,
                opacity: opacityFactor
              }}
              onClick={() => {
                sound.playSelect();
                onSelectLocation(loc);
              }}
              onMouseEnter={() => {
                sound.playHover();
                setHoveredPinId(loc.id);
              }}
              onMouseLeave={() => setHoveredPinId(null)}
            >
              
              {/* ======================================================== */}
              {/* 1. SLEEK HOLOGRAPHIC RETICLE & PILL BADGE                 */}
              {/* ======================================================== */}
              <div
                className={`relative flex items-center space-x-2.5 px-3 py-1.5 rounded-full border-2 backdrop-blur-xl shadow-2xl transition-all duration-300 ${
                  isSelected || isHovered
                    ? 'bg-space-950/98 border-neon-cyan shadow-[0_0_30px_rgba(0,240,255,0.8)] scale-105'
                    : 'bg-space-950/85 hover:bg-space-900 border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:border-neon-cyan'
                }`}
              >
                {/* Left: Avatar or Glowing Icon */}
                {isHome ? (
                  <div className="relative w-7 h-7 rounded-full p-0.5 bg-gradient-to-tr from-neon-cyan via-white to-sky-400 shadow-[0_0_12px_rgba(0,240,255,0.9)] shrink-0">
                    <div className="w-full h-full rounded-full overflow-hidden bg-space-950">
                      <img
                        src="/avatar.jpg"
                        alt="Lingaraj"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all shrink-0 ${
                    isSelected || isHovered
                      ? 'bg-neon-cyan text-space-950 font-bold shadow-[0_0_10px_rgba(0,240,255,0.8)]'
                      : 'bg-space-900 text-cyan-300 border border-cyan-500/40'
                  }`}>
                    <IconHelper name={loc.iconName} className="w-3.5 h-3.5" />
                  </div>
                )}

                {/* City & Section Tag */}
                <div className="text-left whitespace-nowrap flex items-center space-x-1.5">
                  <span className={`text-[10px] font-orbitron font-extrabold transition-colors ${
                    isSelected || isHovered ? 'text-white' : 'text-slate-200 group-hover:text-neon-cyan'
                  }`}>
                    {loc.title}
                  </span>
                  <span className="text-[9px] font-mono text-cyan-400 opacity-90 border-l border-slate-700 pl-1.5">
                    {loc.city}
                  </span>
                </div>

                {/* Arrow indicator on hover */}
                {(isHovered || isSelected) && (
                  <div className="w-4 h-4 rounded-full bg-neon-cyan text-space-950 flex items-center justify-center ml-0.5 animate-pulse">
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>

              {/* ======================================================== */}
              {/* 2. VERTICAL HOLOGRAPHIC STEM & GROUND PULSE               */}
              {/* ======================================================== */}
              <div className="flex flex-col items-center">
                {/* Laser Stem */}
                <div className={`w-0.5 h-4 bg-gradient-to-b transition-all ${
                  isSelected || isHovered
                    ? 'from-neon-cyan to-transparent shadow-[0_0_6px_#00f0ff]'
                    : 'from-cyan-400/70 to-transparent'
                }`} />

                {/* Ground Impact Reticle */}
                <div className="relative flex items-center justify-center -mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_10px_#00f0ff]" />
                  <div className="absolute w-5 h-5 rounded-full border border-neon-cyan animate-ping pointer-events-none" />
                </div>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}
