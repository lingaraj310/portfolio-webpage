import React from 'react';
import { HACKATHONS_DATA } from '../../../data/portfolioData';
import { Trophy, Award, Flame, Calendar, MapPin, Zap, CheckCircle2 } from 'lucide-react';
import { sound } from '../../../utils/audioEffects';

export default function HackathonsPanel() {
  return (
    <div className="space-y-8 animate-fade-in text-slate-200 select-none">
      {/* Sector Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-3xl bg-space-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-neon-cyan text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
            <span>SECTOR 09 // SYDNEY HUB &bull; SPRINT ARENAS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white">
            Hackathons & Rapid Sprints
          </h2>
        </div>

        <div className="px-4 py-2 rounded-xl bg-space-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-neon-cyan">
          4 ARENAS PARTICIPATED
        </div>
      </div>

      {/* Hackathons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {HACKATHONS_DATA.map((hack) => (
          <div
            key={hack.title}
            onMouseEnter={() => sound.playHover()}
            className="p-6 sm:p-7 rounded-3xl bg-space-900/90 border border-slate-800 hover:border-cyan-500/60 transition-all duration-300 space-y-4 shadow-xl hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]"
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 border border-cyan-500/40 text-neon-cyan font-bold">
                {hack.badge}
              </span>
              <Trophy className="w-5 h-5 text-neon-cyan" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-orbitron font-bold text-white group-hover:text-neon-cyan transition-colors">
                {hack.title}
              </h3>
              <p className="text-xs font-mono text-slate-400">
                {hack.organizer} {hack.location ? `• ${hack.location}` : ''}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-space-950/80 border border-slate-800 text-xs font-space text-slate-300 leading-relaxed space-y-1.5">
              <span className="font-mono text-neon-cyan font-bold block">
                ROLE: {hack.role}
              </span>
              <p>{hack.focus}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
