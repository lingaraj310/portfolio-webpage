import React from 'react';
import { EXPERIENCE_DATA } from '../../../data/portfolioData';
import { Users, Shield, Compass, Sparkles, CheckCircle2, HeartHandshake, Briefcase, Rocket, Award, ChevronRight, Milestone, TrendingUp } from 'lucide-react';
import { sound } from '../../../utils/audioEffects';

export default function ExperiencePanel() {
  return (
    <div className="select-none max-w-5xl mx-auto space-y-8 animate-fade-in font-sans text-slate-800">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-300">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-mono text-[11px] font-semibold tracking-wider uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>PRACTICAL EXPOSURE & INDUSTRY TRAINING</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Industry Experience
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-light">
            Structured industrial fellowship focused on hardware-software product incubation, rapid prototyping, and technology venture feasibility.
          </p>
        </div>

        <div className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-emerald-50 border border-emerald-200 text-emerald-700 shrink-0 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{EXPERIENCE_DATA.status}</span>
        </div>
      </div>

      {/* 1. FEATURED ROLE: INNOVATION FORGE TRAINEE */}
      {EXPERIENCE_DATA.roles && EXPERIENCE_DATA.roles.map((roleItem, rIdx) => (
        <section
          key={rIdx}
          className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm space-y-6 transition-all duration-300 hover:border-sky-300"
        >
          {/* Role Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-200 pb-5">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-sky-50 text-sky-700 border border-sky-200">
                  {roleItem.badge}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {roleItem.location}
                </span>
              </div>

              <h3 
                className="text-2xl font-bold text-slate-900 pt-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {roleItem.role}
              </h3>

              <p className="text-sm font-semibold text-sky-700">
                {roleItem.organization}
              </p>
            </div>

            <div className="px-4 py-1.5 rounded-xl text-xs font-mono font-semibold bg-slate-100 border border-slate-200 text-slate-800 shrink-0">
              {roleItem.timeline}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed p-5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-light">
            {roleItem.desc}
          </p>

          {/* Key Competencies */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase block text-slate-500">
              CORE WORKSHOP SKILLS & TECHNICAL PILLARS
            </span>
            <div className="flex flex-wrap gap-2">
              {['Phygital Retail Systems', 'AI & Analytics', 'Intelligent IoT Systems', 'Hardware-Software Prototyping', 'Venture Feasibility', 'Digital Fabrication DfAM'].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] font-semibold text-slate-600 px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg hover:text-sky-700 hover:border-sky-300 hover:bg-sky-50 transition-all"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* 2. Collaborative Mindset Philosophy */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm space-y-3">
        <h3 
          className="text-lg font-bold flex items-center space-x-2 text-slate-900"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <HeartHandshake className="w-5 h-5 text-sky-700" />
          <span>Team Dynamics & Leadership Philosophy</span>
        </h3>
        <p className="text-sm leading-relaxed text-slate-600 font-light">
          {EXPERIENCE_DATA.description}
        </p>
      </section>

      {/* 3. 4 Core Pillars of Engineering & Leadership */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {EXPERIENCE_DATA.pillars.map((pillar, idx) => (
          <div
            key={pillar.title}
            onMouseEnter={() => sound.playHover()}
            className="p-5 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm space-y-2 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 group"
          >
            <div className="flex items-center space-x-3">
              <span className="p-2.5 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 group-hover:scale-110 transition-transform">
                {idx === 0 && <Compass className="w-4 h-4" />}
                {idx === 1 && <Users className="w-4 h-4" />}
                {idx === 2 && <Shield className="w-4 h-4" />}
                {idx === 3 && <Sparkles className="w-4 h-4" />}
              </span>
              <h4 
                className="text-sm font-bold text-slate-900"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {pillar.title}
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1 font-light">
              {pillar.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
