import React from 'react';
import { EXPERIENCE_DATA } from '../../../data/portfolioData';
import { Users, Shield, Compass, Sparkles, CheckCircle2, HeartHandshake, Briefcase, Rocket, Award, ChevronRight } from 'lucide-react';
import { sound } from '../../../utils/audioEffects';

export default function ExperiencePanel() {
  return (
    <div className="space-y-8 animate-fade-in text-slate-200 select-none max-w-5xl mx-auto">
      {/* Sector Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-3xl bg-space-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-neon-cyan text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
            <span>SECTOR 03 // NEW YORK HUB &bull; INNOVATION & LEADERSHIP</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white">
            Experience & Innovation Training
          </h2>
        </div>

        <div className="px-4 py-2 rounded-xl bg-space-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-neon-cyan">
          {EXPERIENCE_DATA.status}
        </div>
      </div>

      {/* 1. FEATURED ROLE: INNOVATION FORGE TRAINEE */}
      {EXPERIENCE_DATA.roles && EXPERIENCE_DATA.roles.map((roleItem, rIdx) => (
        <section
          key={rIdx}
          className="relative p-6 sm:p-10 rounded-3xl bg-space-900/95 border border-cyan-500/40 backdrop-blur-2xl shadow-2xl space-y-5 transition-all duration-300 hover:border-cyan-500/70 hover:shadow-[0_0_35px_rgba(0,240,255,0.25)]"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Role Header */}
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-neon-cyan border border-cyan-500/40 uppercase">
                  {roleItem.badge}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {roleItem.location}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-orbitron font-black text-white pt-1">
                {roleItem.role}
              </h3>

              <p className="text-sm font-space text-cyan-300 font-semibold">
                {roleItem.organization}
              </p>
            </div>

            <div className="px-4 py-2 rounded-xl bg-space-950/90 border border-slate-800 text-xs font-mono text-slate-300 font-bold shrink-0">
              {roleItem.timeline}
            </div>
          </div>

          {/* Description */}
          <p className="relative z-10 text-sm sm:text-base text-slate-200 font-space leading-relaxed p-5 rounded-2xl bg-space-950/80 border border-slate-800/90">
            {roleItem.desc}
          </p>

          {/* Key Competencies in this role */}
          <div className="relative z-10 flex flex-wrap gap-2 pt-1">
            {['Phygital Retail Systems', 'AI & Analytics', 'Intelligent IoT Systems', 'Hardware-Software Prototyping', 'Venture Feasibility'].map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-xl bg-space-950 border border-cyan-500/30 text-xs font-mono text-cyan-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      ))}

      {/* 2. Collaborative Mindset Philosophy */}
      <section className="p-6 sm:p-8 rounded-3xl bg-space-900/90 border border-slate-800 backdrop-blur-2xl space-y-3">
        <h3 className="text-lg sm:text-xl font-orbitron font-bold text-white flex items-center space-x-2.5">
          <HeartHandshake className="w-5 h-5 text-neon-cyan" />
          <span>Team Leadership & Collaborative Dynamics</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 font-space leading-relaxed">
          {EXPERIENCE_DATA.description}
        </p>
      </section>

      {/* 3. 4 Core Pillars of Engineering & Leadership */}
      <section className="space-y-4">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
          COLLABORATIVE & EXECUTION PILLARS
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {EXPERIENCE_DATA.pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              onMouseEnter={() => sound.playHover()}
              className="p-5 rounded-2xl bg-space-950/80 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 space-y-2.5 shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-center space-x-3 text-neon-cyan">
                <div className="w-8 h-8 rounded-xl bg-space-900 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-xs shadow-sm">
                  0{idx + 1}
                </div>
                <h4 className="font-orbitron font-bold text-white text-base">
                  {pillar.title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-space leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
