import React, { useState } from 'react';
import { LOCATIONS } from '../../data/portfolioData';
import IconHelper from './IconHelper';
import CyanMapPin from './CyanMapPin';
import { sound } from '../../utils/audioEffects';
import { User } from 'lucide-react';

export default function RadialNav({
  activeLocation,
  onSelectNode
}) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [imgError, setImgError] = useState(false);

  // Spacious radius to gracefully orbit around the circular avatar
  const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 185 : 255;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-30 select-none">
      {/* Central Interactive HUD Anchor - LOCKED TO SCREEN CENTER */}
      <div className="relative pointer-events-auto flex items-center justify-center">
        {/* SVG Connecting Cyan Laser Spokes */}
        <svg
          className="absolute w-[720px] h-[720px] pointer-events-none"
          style={{ overflow: 'visible', zIndex: 2 }}
        >
          {LOCATIONS.map((loc, idx) => {
            const angle = (idx / LOCATIONS.length) * 2 * Math.PI - Math.PI / 2;
            const nx = 360 + Math.cos(angle) * radius;
            const ny = 360 + Math.sin(angle) * radius;
            const isTarget = activeLocation?.id === loc.id;
            const isHovered = hoveredNode?.id === loc.id;

            return (
              <g key={loc.id}>
                {/* Connecting Laser Line */}
                <line
                  x1="360"
                  y1="360"
                  x2={nx}
                  y2={ny}
                  stroke={isHovered || isTarget ? '#00f0ff' : 'rgba(0, 240, 255, 0.45)'}
                  strokeWidth={isHovered || isTarget ? '3.5' : '1.5'}
                  strokeDasharray={isHovered ? '4 2' : '3 3'}
                  className="transition-all duration-300"
                  filter="drop-shadow(0 0 6px rgba(0, 240, 255, 0.8))"
                />
                {/* Outer Orbit Halo Ring */}
                <circle
                  cx={nx}
                  cy={ny}
                  r="30"
                  fill="none"
                  stroke={isHovered || isTarget ? '#ffffff' : '#00f0ff'}
                  strokeWidth="1.2"
                  opacity={isHovered || isTarget ? '1' : '0.45'}
                  strokeDasharray="4 3"
                  className={isHovered ? 'animate-spin-slow' : ''}
                />
              </g>
            );
          })}
        </svg>

        {/* ========================================================= */}
        {/* CENTERED, PROMINENT CIRCULAR AVATAR IN HOLOGRAPHIC FRAME */}
        {/* ========================================================= */}
        <div
          className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center cursor-pointer group"
          style={{ zIndex: 10 }}
          onClick={() => {
            sound.playSelect();
            onSelectNode(LOCATIONS[0]);
          }}
        >
          {/* Top Floating Location Pin & Cyan Badge */}
          <div className="absolute -top-16 flex flex-col items-center animate-bounce z-20">
            <CyanMapPin className="w-9 h-9 drop-shadow-[0_4px_16px_rgba(0,240,255,0.95)]" />
            <div className="flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-space-950/98 border-2 border-neon-cyan text-xs font-mono text-neon-cyan shadow-neon-cyan backdrop-blur-xl -mt-1 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
              <span className="font-extrabold tracking-wide text-white">India &bull; Tamil Nadu</span>
            </div>
          </div>

          {/* Rotating Outer Circular Reticle Rings */}
          <div className="absolute -inset-5 rounded-full border border-dashed border-cyan-400/40 animate-spin-slow pointer-events-none" />
          <div className="absolute -inset-2.5 rounded-full border-2 border-neon-cyan/70 animate-pulse pointer-events-none shadow-neon-cyan" />
          <div className="absolute -inset-7 rounded-full border border-sky-400/30 border-dotted animate-spin-reverse pointer-events-none" />

          {/* PURE CIRCULAR HOLOGRAPHIC AVATAR FRAME */}
          <div className="relative w-full h-full rounded-full p-1.5 bg-gradient-to-tr from-neon-cyan via-sky-400 to-blue-600 shadow-[0_0_40px_rgba(0,240,255,0.85)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_50px_rgba(0,240,255,1)]">
            <div className="w-full h-full rounded-full overflow-hidden bg-space-900 border-2 border-space-950 flex items-center justify-center relative shadow-inner">
              {!imgError ? (
                <img
                  src="/avatar.jpg"
                  alt="Lingaraj"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-[center_10%] transition-transform duration-500 group-hover:scale-108"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-space-850 to-space-950 text-white select-none">
                  <User className="w-12 h-12 text-neon-cyan mb-1" />
                  <span className="text-[11px] font-orbitron font-extrabold text-white tracking-wider">
                    LINGARAJ
                  </span>
                </div>
              )}

              {/* Inner High-Tech Shimmer */}
              <div className="absolute inset-0 rounded-full border-2 border-neon-cyan/40 pointer-events-none shadow-inner" />
            </div>
          </div>

          {/* Bottom Illuminated Identity Pill */}
          <div className="absolute -bottom-4 px-4 py-0.5 rounded-full bg-space-950/98 border border-neon-cyan/80 text-[10px] font-orbitron font-extrabold text-white tracking-widest shadow-neon-cyan z-20 whitespace-nowrap">
            LINGARAJ &bull; CSE
          </div>
        </div>

        {/* 9 Radial Section Nodes - HIGH-CONTRAST & SPACIOUS */}
        <div className="absolute" style={{ zIndex: 15 }}>
          {LOCATIONS.map((loc, idx) => {
            const angle = (idx / LOCATIONS.length) * 2 * Math.PI - Math.PI / 2;
            const nx = Math.cos(angle) * radius;
            const ny = Math.sin(angle) * radius;
            const isTarget = activeLocation?.id === loc.id;
            const isHovered = hoveredNode?.id === loc.id;

            return (
              <div
                key={loc.id}
                className="absolute flex flex-col items-center"
                style={{
                  transform: `translate3d(${nx - 30}px, ${ny - 30}px, 0)`,
                  transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                {/* Circular Glass Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playSelect();
                    onSelectNode(loc);
                  }}
                  onMouseEnter={() => {
                    sound.playHover();
                    setHoveredNode(loc);
                  }}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="relative w-15 h-15 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 group shadow-2xl backdrop-blur-xl"
                  style={{
                    backgroundColor: isTarget || isHovered ? '#00f0ff' : 'rgba(3, 7, 18, 0.95)',
                    border: `2px solid ${isTarget || isHovered ? '#ffffff' : '#00f0ff'}`,
                    boxShadow: isTarget || isHovered
                      ? '0 0 35px #00f0ff, 0 0 15px #fff'
                      : '0 4px 20px rgba(0, 240, 255, 0.25)',
                    transform: isHovered ? 'scale(1.22)' : isTarget ? 'scale(1.12)' : 'scale(1)'
                  }}
                  title={`Select ${loc.title} (${loc.city})`}
                >
                  <IconHelper
                    name={loc.iconName}
                    className={`w-6 h-6 transition-colors ${
                      isTarget || isHovered ? 'text-black' : 'text-cyan-300'
                    }`}
                  />
                </button>

                {/* High-Contrast Section Name Pill Badge */}
                <div
                  className={`mt-2 whitespace-nowrap text-xs font-orbitron font-extrabold tracking-wider px-3.5 py-1 rounded-full border-2 transition-all duration-200 pointer-events-none shadow-2xl backdrop-blur-2xl ${
                    isHovered || isTarget
                      ? 'text-black bg-neon-cyan border-white shadow-neon-cyan scale-110'
                      : 'text-white bg-space-950/98 border-cyan-500/60 shadow-lg'
                  }`}
                >
                  {loc.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
