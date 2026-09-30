import React from 'react';
import { ArrowRight, Sparkles, Compass, Shield, Orbit } from 'lucide-react';
import { sound } from '../../utils/audioEffects';

export default function HeroOverlay({ onEnterUniverse }) {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center text-center p-6 z-30 animated-tech-grid">
      {/* Centered Minimalist Cover Page */}
      <div className="max-w-2xl pointer-events-auto space-y-6 animate-fade-in flex flex-col items-center p-8 rounded-3xl bg-space-950/40 backdrop-blur-xl border border-neon-cyan/20 shadow-2xl sci-fi-corners">
        {/* Luminous Sci-Fi Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan text-xs font-mono tracking-widest uppercase shadow-neon-cyan backdrop-blur-md animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-neon-cyan" />
          <span>Interactive 3D Spatial Portfolio</span>
        </div>

        {/* Main Cover Title with Glowing Gradient */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-orbitron font-extrabold tracking-tight text-white drop-shadow-2xl">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-blue-400 to-neon-purple text-glow-cyan">My World</span>
          </h1>
          <p className="text-xl sm:text-3xl font-space font-bold text-white tracking-wide">
            Lingaraj
          </p>
          <p className="text-sm sm:text-base text-slate-300 font-space max-w-lg mx-auto leading-relaxed">
            Computer Science Engineer &bull; Problem Solver &bull; Future Product Builder
          </p>
        </div>

        {/* Enter Button with Neon Glow Flare */}
        <div className="pt-2">
          <button
            onClick={() => {
              sound.playSelect();
              sound.playWarp();
              onEnterUniverse();
            }}
            onMouseEnter={() => sound.playHover()}
            className="group relative px-10 py-4 bg-gradient-to-r from-neon-cyan/30 via-neon-blue/40 to-neon-purple/30 hover:from-neon-cyan/50 hover:to-neon-purple/50 border-2 border-neon-cyan rounded-full text-white font-orbitron font-bold text-base sm:text-lg tracking-widest uppercase transition-all duration-300 shadow-neon-cyan flex items-center space-x-3 cursor-pointer overflow-hidden hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
            <span>Enter</span>
            <ArrowRight className="w-5 h-5 text-neon-cyan group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>

        {/* Minimal helper prompt */}
        <div className="flex items-center space-x-2 text-xs font-mono text-neon-cyan/70 pt-2">
          <Orbit className="w-3.5 h-3.5 animate-spin-slow" />
          <span>Click &bull; Explore 3D Earth &bull; Spatial Navigation</span>
        </div>
      </div>
    </div>
  );
}
