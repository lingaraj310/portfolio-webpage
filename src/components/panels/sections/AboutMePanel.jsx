import React from 'react';
import { PROFILE_INFO } from '../../../data/portfolioData';
import { User, Flame, Heart, BookOpen, GraduationCap, MapPin } from 'lucide-react';

export default function AboutMePanel() {
  return (
    <div className="space-y-8 animate-fade-in text-slate-200 select-none max-w-4xl mx-auto">
      {/* 1. Main Clean Profile Dossier */}
      <section className="relative p-6 sm:p-10 rounded-3xl bg-space-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar Photo */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-neon-cyan via-sky-400 to-blue-600 shadow-[0_0_35px_rgba(0,240,255,0.45)] shrink-0 group">
            <img
              src="/avatar.jpg"
              alt="Lingaraj"
              className="w-full h-full object-cover object-[center_12%] rounded-full transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-full border-2 border-neon-cyan/40 pointer-events-none shadow-inner" />
          </div>

          {/* Core Info & Academic Details */}
          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-neon-cyan text-xs font-mono tracking-wider">
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
              <span>ORIGIN: TAMIL NADU, INDIA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-orbitron font-extrabold text-white tracking-tight">
              {PROFILE_INFO.name}
            </h2>

            <p className="text-sm sm:text-base font-space font-medium text-cyan-300 leading-snug">
              "{PROFILE_INFO.identityLine}"
            </p>

            {/* Clean Academic Badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2 font-mono text-xs text-slate-300">
              <div className="px-3.5 py-1.5 rounded-xl bg-space-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">INSTITUTION</span>
                <span className="text-white font-bold">{PROFILE_INFO.institution}</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-space-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">PROGRAMME</span>
                <span className="text-neon-cyan font-bold">{PROFILE_INFO.batch}</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-space-950/80 border border-cyan-500/40">
                <span className="text-slate-500 block text-[10px]">CGPA</span>
                <span className="text-amber-400 font-extrabold">{PROFILE_INFO.cgpa}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Description */}
        <div className="relative z-10 mt-8 pt-6 border-t border-slate-800/80 text-sm sm:text-base text-slate-200 font-space leading-relaxed">
          {PROFILE_INFO.bio}
        </div>
      </section>

      {/* 2. Long-Term Mission & Focus Areas */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mission Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-space-900/90 border border-cyan-500/30 backdrop-blur-xl space-y-3 shadow-xl">
          <div className="flex items-center space-x-2 text-neon-cyan">
            <Flame className="w-5 h-5" />
            <h3 className="font-orbitron font-bold text-lg text-white">Long-Term Mission</h3>
          </div>
          <p className="text-sm text-slate-300 font-space leading-relaxed">
            {PROFILE_INFO.longTermGoal}
          </p>
        </div>

        {/* Focus & Interests Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-space-900/90 border border-slate-800 backdrop-blur-xl space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Heart className="w-5 h-5" />
            <h3 className="font-orbitron font-bold text-lg text-white">Personal Focus Areas</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {PROFILE_INFO.interests.map((interest) => (
              <span
                key={interest}
                className="px-3.5 py-1.5 rounded-xl bg-space-950 border border-slate-700 text-xs font-mono text-slate-200 hover:border-cyan-500/50 hover:text-neon-cyan transition-colors"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
