import React from 'react';
import { LOCATIONS } from '../../data/portfolioData';
import IconHelper from './IconHelper';
import CyanMapPin from './CyanMapPin';
import { sound } from '../../utils/audioEffects';

export default function PinOverlays({
  projectedPins,
  activeLocation,
  onSelectLocation,
  onEnterDetail,
  currentStage
}) {
  if (!projectedPins) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-25 overflow-hidden select-none">
      {LOCATIONS.map((loc) => {
        const pin = projectedPins[loc.id];
        if (!pin || !pin.isVisible) return null;

        const isHome = loc.id === 'about';
        const isLanded = currentStage === 'landed';

        // When in orbit mode, RadialNav handles the central photo HUD
        if (isHome && currentStage === 'orbit' && !isLanded) {
          return null;
        }

        if (isLanded) return null;

        return (
          <div
            key={loc.id}
            className="absolute pointer-events-auto transition-transform duration-300"
            style={{
              transform: `translate3d(${pin.x}px, ${pin.y}px, 0)`,
              zIndex: 20
            }}
          >
            {/* Cyan Map Pin Beacon on Globe - Direct Click to Enter */}
            {!isHome && (
              <button
                onClick={() => {
                  sound.playSelect();
                  onSelectLocation(loc);
                }}
                onMouseEnter={() => sound.playHover()}
                className="group relative -top-8 -left-3 flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-125"
                title={`Enter ${loc.title} (${loc.city})`}
              >
                {/* Cyan Teardrop Map Pin Icon */}
                <CyanMapPin className="w-7 h-7 drop-shadow-[0_4px_12px_rgba(0,240,255,0.7)] animate-pulse" />

                {/* High-Contrast Floating Tag */}
                <span className="mt-0.5 px-2.5 py-0.5 rounded-full bg-space-950/98 border border-cyan-500/50 text-white group-hover:border-neon-cyan group-hover:text-neon-cyan text-[10px] font-orbitron font-bold whitespace-nowrap shadow-lg">
                  {loc.title}
                </span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
