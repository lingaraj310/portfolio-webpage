import React from 'react';
import { EDUCATION_DATA } from '../../../data/portfolioData';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, CheckCircle2, Sparkles } from 'lucide-react';

export default function EducationPanel() {
  return (
    <div className="space-y-8 animate-fade-in text-slate-200 select-none">
      {/* Sector Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-3xl bg-space-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-neon-cyan text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
            <span>SECTOR 06 // LONDON HUB &bull; ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white">
            Academic Background
          </h2>
        </div>

        <div className="px-4 py-2 rounded-xl bg-space-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-neon-cyan">
          CURRENT CGPA: 8.0 / 10.0
        </div>
      </div>

      {/* Main Degree Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-space-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-neon-cyan uppercase tracking-wider font-bold">
              UNDERGRADUATE DEGREE
            </span>
            <h3 className="text-2xl sm:text-4xl font-orbitron font-extrabold text-white">
              {EDUCATION_DATA.degree}
            </h3>
            <p className="text-base font-space text-cyan-300 font-semibold">
              {EDUCATION_DATA.branch}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-space-950 border border-cyan-500/40 text-center font-mono shadow-neon-cyan">
            <span className="text-xs text-slate-400 block font-bold">CURRENT CGPA</span>
            <span className="text-3xl font-orbitron font-black text-amber-400">{EDUCATION_DATA.cgpa}</span>
          </div>
        </div>

        {/* Institution & Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-300">
          <div className="p-4 rounded-2xl bg-space-950/80 border border-slate-800 flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-neon-cyan shrink-0" />
            <div>
              <span className="text-slate-500 block text-[10px]">INSTITUTION:</span>
              <span className="text-white font-bold">{EDUCATION_DATA.institution}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-space-950/80 border border-slate-800 flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-neon-cyan shrink-0" />
            <div>
              <span className="text-slate-500 block text-[10px]">PROGRAMME TIMELINE:</span>
              <span className="text-white font-bold">{EDUCATION_DATA.timeline}</span>
            </div>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
            Curricular Focus & Key Highlights
          </h4>
          <div className="space-y-2.5">
            {EDUCATION_DATA.highlights.map((item) => (
              <div
                key={item}
                className="flex items-start space-x-3 text-xs sm:text-sm text-slate-300 p-4 rounded-2xl bg-space-950/80 border border-slate-800 hover:border-cyan-500/40 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-neon-cyan shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
