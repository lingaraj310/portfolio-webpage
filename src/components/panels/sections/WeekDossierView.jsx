import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight,
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Flame, 
  Layers, 
  Cpu, 
  Rocket, 
  Sparkles, 
  ChevronRight, 
  BookOpen, 
  Wrench, 
  Target, 
  ShieldCheck, 
  Lightbulb, 
  FileText,
  Workflow
} from 'lucide-react';
import { sound } from '../../../utils/audioEffects';

export default function WeekDossierView({ week, onBack, onNavigateWeek }) {
  if (!week) return null;

  const isCompleted = week.status === 'COMPLETED';
  const isActive = week.status === 'ACTIVE FOCUS';
  const weekNumFormatted = week.weekNumber < 10 ? `0${week.weekNumber}` : week.weekNumber;

  const phaseThemes = {
    1: { name: 'Phase 01 — Foundation & Problem Discovery', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    2: { name: 'Phase 02 — Digital Fabrication & Rapid Prototyping', color: 'text-sky-700', bg: 'bg-sky-50', border: 'border-sky-200' },
    3: { name: 'Phase 03 — Embedded Systems & IoT Telemetry', color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' },
    4: { name: 'Phase 04 — Product Integration & Venture Launch', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' }
  };

  const phase = phaseThemes[week.phaseId] || phaseThemes[1];

  return (
    <div className="w-full select-none font-sans text-slate-800 space-y-8 animate-fade-in pb-16">
      
      {/* 1. Top Header & Back Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-all cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>&larr; BACK TO PROTOSEM ROADMAP</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <span>PRICE PROTOSEM</span>
          <span>&bull;</span>
          <span className="text-sky-700 font-bold uppercase">WEEK {weekNumFormatted} DOSSIER</span>
        </div>
      </div>

      {/* 2. Executive Hero Banner */}
      <section className="relative p-6 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-mono text-[11px] font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            <span>WEEK {weekNumFormatted} &bull; {phase.name.split('—')[1] || 'INNOVATION FELLOWSHIP'}</span>
          </div>

          {isCompleted ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>VERIFIED COMPLETE</span>
            </span>
          ) : isActive ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-50 border border-sky-200 text-sky-700 animate-pulse">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>ACTIVE SPRINT FOCUS</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 border border-slate-200 text-slate-600">
              <Clock className="w-3.5 h-3.5" />
              <span>UPCOMING MILESTONE</span>
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h1 
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Week {weekNumFormatted} — {week.title}
          </h1>
          <p className="text-base font-semibold text-sky-600 font-mono">
            Focus: {week.topic || week.oneLineSummary}
          </p>
        </div>

        {/* Metadata Strip */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 py-3 px-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-sky-600" />
            <span><strong>Timeline:</strong> {week.timeline || `Week ${week.weekNumber} • 2025`}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <span><strong>Workload:</strong> {week.duration || '45 Working Hours'}</span>
          </div>

          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-rose-600" />
            <span><strong>Facility:</strong> {week.location || 'FORGE Innovation & Ventures, Coimbatore'}</span>
          </div>
        </div>

        {/* Executive Summary Paragraph */}
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
          {week.summary || week.oneLineSummary || week.description}
        </p>
      </section>

      {/* 3. Main Activities on the Week (Core Deliverables) */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-sky-600 uppercase tracking-wider flex items-center gap-1.5">
              <Workflow className="w-4 h-4" />
              <span>CORE ACTIVITIES &amp; SPRINT WORKFLOW</span>
            </span>
            <h2 
              className="text-2xl font-bold text-slate-900 tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Activities on Week {weekNumFormatted}
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-600 font-semibold px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
            {week.bullets ? week.bullets.length : 4} Key Tasks Completed
          </span>
        </div>

        {/* Grid of Key Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {week.bullets && week.bullets.map((bullet, idx) => (
            <div 
              key={idx} 
              className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-300 hover:shadow-xs transition-all flex items-start space-x-3.5 group"
            >
              <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 border border-sky-200 flex items-center justify-center shrink-0 font-mono text-xs font-bold mt-0.5 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                0{idx + 1}
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">
                  Activity 0{idx + 1}
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {bullet}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Curriculum Depth & Methodologies */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Syllabus Topic */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Curriculum Syllabus</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {week.topic || 'In-depth industry problem discovery, hands-on fabrication drills, and structured innovation frameworks.'}
          </p>
        </div>

        {/* Card 2: Tools & Toolchains */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center">
            <Wrench className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Toolchains &amp; Methods</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Applied engineering toolchains, Git collaboration, customer empathy frameworks, and parametric modeling environments.
          </p>
        </div>

        {/* Card 3: Milestone Outcome */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Verified Milestone</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Successfully reviewed by FORGE mentors, adhering to the 20-week innovation trajectory and technical evaluation rubric.
          </p>
        </div>
      </div>

      {/* 5. Bottom Navigation & Return Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to 20-Week Overview</span>
        </button>

        <div className="flex items-center gap-3">
          {week.weekNumber === 6 && (
            <button
              onClick={() => onNavigateWeek && onNavigateWeek(6)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-600 text-white font-mono text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Flame className="w-4 h-4 text-amber-300" />
              <span>Open 3D Viewer &amp; Fabrication Lab &rarr;</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
