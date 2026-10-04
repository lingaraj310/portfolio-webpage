import React from 'react';
import { HACKATHONS_DATA } from '../../../data/portfolioData';
import { Trophy, Award, Flame, Calendar, MapPin, Zap, CheckCircle2, Rocket, Sparkles } from 'lucide-react';
import { sound } from '../../../utils/audioEffects';

export default function HackathonsPanel() {
  return (
    <div className="select-none max-w-5xl mx-auto space-y-8 animate-fade-in font-sans text-slate-800">
      {/* Sector Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-300">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-mono text-[11px] font-semibold tracking-wider uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>INITIATIVES & CO-CURRICULAR</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Achievements, Hackathons & Events
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-light">
            High-intensity hackathons, national problem-solving arenas, and rapid technical prototyping competitions.
          </p>
        </div>

        <div className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-amber-50 border border-amber-200 text-amber-700 shrink-0 flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-700" />
          <span>4 ARENAS PARTICIPATED</span>
        </div>
      </div>

      {/* Hackathons Grid (Arena Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {HACKATHONS_DATA.map((hack, idx) => (
          <div
            key={hack.title}
            onMouseEnter={() => sound.playHover()}
            className="p-6 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm space-y-4 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 group"
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-sky-50 text-sky-700 border border-sky-200">
                {hack.badge}
              </span>
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 group-hover:scale-110 transition-transform">
                <Trophy className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 
                className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {hack.title}
              </h3>
              <p className="text-xs font-mono text-slate-500">
                {hack.organizer} {hack.location ? `• ${hack.location}` : ''}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 leading-relaxed text-slate-600 font-light">
              <span className="font-mono font-bold block text-sky-700">
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
