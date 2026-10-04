import React from 'react';
import { EDUCATION_DATA } from '../../../data/portfolioData';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, CheckCircle2, Sparkles, Building2, ScrollText } from 'lucide-react';

export default function EducationPanel() {
  return (
    <div className="select-none max-w-5xl mx-auto space-y-8 animate-fade-in font-sans text-slate-800">
      {/* Top Banner Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-300">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-mono text-[11px] font-semibold tracking-wider uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>ACADEMIC TRAJECTORY</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Education & Qualifications
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-light">
            Foundational computer science & engineering education, higher academic credentials, and curricular milestones.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl flex items-center space-x-2 text-xs font-mono font-bold bg-sky-50 border border-sky-200 text-sky-600 shrink-0 shadow-sm">
          <Award className="w-4 h-4 text-amber-700" />
          <span>CURRENT CGPA: 8.0 / 10.0</span>
        </div>
      </div>

      {/* Main Degree Certificate Card */}
      <div className="p-6 sm:p-10 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm space-y-8 transition-all duration-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-sky-50 text-sky-700 border border-sky-200">
                UNDERGRADUATE DEGREE
              </span>
              <span className="text-xs font-mono text-slate-500">
                FULL-TIME &bull; AFFILIATED
              </span>
            </div>
            <h3 
              className="text-2xl sm:text-3xl font-bold text-slate-900"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {EDUCATION_DATA.degree}
            </h3>
            <p className="text-base font-semibold text-sky-700">
              {EDUCATION_DATA.branch}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-center min-w-[160px] shadow-lg">
            <span className="text-[11px] font-mono font-bold text-sky-700 block">CUMULATIVE CGPA</span>
            <span 
              className="text-3xl font-extrabold text-slate-900"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {EDUCATION_DATA.cgpa}
            </span>
            <span className="text-[10px] font-mono text-slate-500 block mt-0.5">Scale: 10.0</span>
          </div>
        </div>

        {/* Institution & Duration Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-3.5">
            <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase text-slate-500">COLLEGE / INSTITUTION:</span>
              <span className="font-bold text-xs text-slate-900">{EDUCATION_DATA.institution}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-3.5">
            <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase text-slate-500">PROGRAMME DURATION:</span>
              <span className="font-bold text-xs text-slate-900">{EDUCATION_DATA.timeline}</span>
            </div>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-sky-700">
            Curricular Focus & Key Highlights
          </h4>
          <div className="space-y-2.5">
            {EDUCATION_DATA.highlights.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-3 text-xs sm:text-sm p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-light"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-700" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
