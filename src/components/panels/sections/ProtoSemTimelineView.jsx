import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronRight, 
  ExternalLink, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  Layers, 
  Cpu, 
  Rocket, 
  ArrowRight,
  Eye,
  Check
} from 'lucide-react';
import { sound } from '../../../utils/audioEffects';

const PHASE_CONFIG = {
  1: {
    name: 'Phase 01 — Foundation & Problem Discovery',
    theme: 'Empathy Mapping, Problem Decomposition & Concept Validation',
    color: '#059669',
    text: 'text-emerald-700',
    titleText: 'text-emerald-950',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    ring: 'ring-emerald-200',
    nodeBorder: 'border-emerald-500',
    nodeBg: 'bg-emerald-600',
    weeks: 'Weeks 01 — 05'
  },
  2: {
    name: 'Phase 02 — Digital Fabrication & Rapid Prototyping',
    theme: 'CAD Modeling, Laser Cutting, 3D Printing & Physical Validation',
    color: '#0284c7',
    text: 'text-sky-700',
    titleText: 'text-sky-950',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    ring: 'ring-sky-200',
    nodeBorder: 'border-sky-500',
    nodeBg: 'bg-sky-600',
    weeks: 'Weeks 06 — 10'
  },
  3: {
    name: 'Phase 03 — Embedded Systems & IoT Telemetry',
    theme: 'Microcontroller Architecture, Sensor Telemetry & Edge AI',
    color: '#7c3aed',
    text: 'text-purple-700',
    titleText: 'text-purple-950',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    ring: 'ring-purple-200',
    nodeBorder: 'border-purple-500',
    nodeBg: 'bg-purple-600',
    weeks: 'Weeks 11 — 15'
  },
  4: {
    name: 'Phase 04 — Product Integration & Venture Launch',
    theme: 'System Integration, Production Readiness, IP & Demo Day Pitch',
    color: '#d97706',
    text: 'text-amber-700',
    titleText: 'text-amber-950',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    ring: 'ring-amber-200',
    nodeBorder: 'border-amber-500',
    nodeBg: 'bg-amber-600',
    weeks: 'Weeks 16 — 20'
  }
};

export default function ProtoSemTimelineView({
  weeks = [],
  selectedPhaseFilter = 'ALL',
  onOpenWeekDossier,
  onOpenWeekDetail
}) {
  const [activeHoverId, setActiveHoverId] = useState(null);

  // Filter weeks by phase if applicable
  const filteredWeeks = weeks.filter((w) => {
    if (selectedPhaseFilter === 'ALL') return true;
    if (selectedPhaseFilter === 'phase-1') return w.phaseId === 1;
    if (selectedPhaseFilter === 'phase-2') return w.phaseId === 2;
    if (selectedPhaseFilter === 'phase-3') return w.phaseId === 3;
    if (selectedPhaseFilter === 'phase-4') return w.phaseId === 4;
    return true;
  });

  return (
    <div className="relative w-full py-4 select-none font-sans">
      
      {/* Subtle blueprint grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:32px_32px] rounded-3xl pointer-events-none" />

      {/* Main Timeline Stream */}
      <div className="relative max-w-5xl mx-auto space-y-12">
        
        {filteredWeeks.map((week, index) => {
          const phaseConfig = PHASE_CONFIG[week.phaseId] || PHASE_CONFIG[1];
          const isWeek6 = week.weekNumber === 6;
          const isPhaseStart = index === 0 || filteredWeeks[index - 1].phaseId !== week.phaseId;
          const isCompleted = week.status === 'COMPLETED';
          const isActive = week.status === 'ACTIVE FOCUS' || isWeek6;

          return (
            <div key={week.id} className="relative">
              
              {/* Phase Header Divider Banner */}
              {isPhaseStart && (
                <div className="mb-8 pt-4">
                  <div className={`p-4 sm:p-5 rounded-2xl ${phaseConfig.bg} border ${phaseConfig.border} shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2.5 rounded-xl bg-white ${phaseConfig.text} border ${phaseConfig.border} shadow-xs`}>
                        {week.phaseId === 1 && <CheckCircle2 className="w-5 h-5" />}
                        {week.phaseId === 2 && <Flame className="w-5 h-5" />}
                        {week.phaseId === 3 && <Cpu className="w-5 h-5" />}
                        {week.phaseId === 4 && <Rocket className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className={`text-base sm:text-lg font-bold ${phaseConfig.titleText} font-['Space_Grotesk']`}>
                          {phaseConfig.name}
                        </h3>
                        <p className="text-xs text-slate-600 font-medium">
                          {phaseConfig.theme}
                        </p>
                      </div>
                    </div>
                    <span className={`self-start sm:self-center px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${phaseConfig.text} bg-white border ${phaseConfig.border} shadow-xs`}>
                      {phaseConfig.weeks}
                    </span>
                  </div>
                </div>
              )}

              {/* Single Timeline Row */}
              <div className="relative flex items-start group">
                
                {/* 1. Left Vertical Line & Node Column */}
                <div className="relative flex flex-col items-center mr-4 sm:mr-8 shrink-0 self-stretch">
                  
                  {/* Top connector line */}
                  <div className="w-0.5 bg-slate-200 flex-1 min-h-[24px]" />

                  {/* Circular Milestone Node */}
                  <div 
                    className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/30 ring-4 ring-sky-100 scale-110'
                        : isCompleted
                          ? 'bg-white border-2 border-emerald-500 text-emerald-600 shadow-xs'
                          : 'bg-white border-2 border-slate-300 text-slate-500'
                    }`}
                  >
                    {isActive ? (
                      <Flame className="w-4 h-4 text-white animate-pulse" />
                    ) : isCompleted ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <span className="text-xs font-mono font-bold">
                        {week.weekNumber < 10 ? `0${week.weekNumber}` : week.weekNumber}
                      </span>
                    )}
                  </div>

                  {/* Bottom connector line */}
                  <div className="w-0.5 bg-slate-200 flex-1 min-h-[24px]" />
                </div>

                {/* 2. Right Connected Card (Clickable to Enter Week) */}
                <div 
                  onClick={() => {
                    sound.playSelect();
                    if (onOpenWeekDossier) onOpenWeekDossier(week);
                    else if (onOpenWeekDetail) onOpenWeekDetail(week);
                  }}
                  onMouseEnter={() => {
                    sound.playHover();
                    setActiveHoverId(week.id);
                  }}
                  onMouseLeave={() => setActiveHoverId(null)}
                  className={`flex-1 p-6 sm:p-8 rounded-2xl transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white border-2 border-sky-500 shadow-[0_10px_30px_rgba(14,165,233,0.12)] ring-1 ring-sky-100 hover:scale-[1.008]'
                      : 'bg-white border border-slate-200 shadow-sm hover:border-sky-400 hover:shadow-md hover:scale-[1.005]'
                  }`}
                >
                  
                  {/* Card Header with Week Number Label */}
                  <div className="space-y-1.5 pb-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-sky-50 text-sky-700 border border-sky-200">
                          WEEK {week.weekNumber < 10 ? `0${week.weekNumber}` : week.weekNumber}
                        </span>
                        <span className="text-xs font-mono text-slate-500 font-semibold">
                          PRICE ProtoSem &bull; {phaseConfig.name.split('—')[1] || 'Innovation Fellowship'}
                        </span>
                      </div>
                      
                      {isActive && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-50 border border-sky-200 text-sky-700 animate-pulse">
                          <span className="w-2 h-2 rounded-full bg-sky-500" />
                          <span>LIVE ACTIVE FOCUS</span>
                        </span>
                      )}
                      
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                          <Check className="w-3 h-3" />
                          <span>VERIFIED COMPLETE</span>
                        </span>
                      )}
                    </div>

                    <h3 
                      className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight pt-1"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Week {week.weekNumber < 10 ? `0${week.weekNumber}` : week.weekNumber} — {week.title}
                    </h3>
                  </div>

                  {/* Metadata Row (Timeline, Hours, Location) */}
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-6 py-2.5 text-xs font-mono text-slate-600 border-y border-slate-100 my-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      <span>{week.timeline || `Week ${week.weekNumber} • 2025`}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{week.duration || '45 Working Hours'}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-rose-600" />
                      <span>{week.location || 'FORGE Innovation & Ventures, Coimbatore'}</span>
                    </div>
                  </div>

                  {/* Summary Paragraph */}
                  <p className="text-sm text-slate-600 leading-relaxed font-normal mt-3 mb-4">
                    {week.summary || week.oneLineSummary}
                  </p>

                  {/* Explicit Activities Header */}
                  {week.bullets && week.bullets.length > 0 && (
                    <div className="space-y-2.5 mb-6">
                      <div className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 pb-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                        <span>Activities on Week {week.weekNumber < 10 ? `0${week.weekNumber}` : week.weekNumber}:</span>
                      </div>

                      {week.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700">
                          <ChevronRight className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                          <span className="leading-normal">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons Row */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {isWeek6 ? (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playSelect();
                            if (onOpenWeekDossier) onOpenWeekDossier(week);
                          }}
                          className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-500/20 border border-sky-500 hover:from-sky-500 hover:to-blue-600 transition-all flex items-center space-x-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <Flame className="w-4 h-4 text-amber-300" />
                          <span>Enter Week 06 Full Engineering Dossier &amp; 3D Viewer</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </button>

                        <a
                          href="/protosem/week-06/APJ ABDUL KALAM.rld"
                          download="APJ_ABDUL_KALAM.rld"
                          onClick={(e) => e.stopPropagation()}
                          className="px-4 py-2.5 rounded-xl text-xs font-mono font-semibold bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-all flex items-center space-x-2"
                        >
                          <Download className="w-3.5 h-3.5 text-sky-600" />
                          <span>Download Laser &amp; 3D Files</span>
                        </a>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playSelect();
                            if (onOpenWeekDossier) onOpenWeekDossier(week);
                          }}
                          className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-sky-600 text-white shadow-xs border border-sky-500 hover:bg-sky-500 transition-all flex items-center space-x-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <span>Enter Week {week.weekNumber < 10 ? `0${week.weekNumber}` : week.weekNumber} Dossier</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playSelect();
                            if (onOpenWeekDetail) onOpenWeekDetail(week);
                          }}
                          className="px-4 py-2.5 rounded-xl text-xs font-mono font-semibold bg-slate-100 border border-slate-200 text-slate-700 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-700 transition-all flex items-center space-x-2 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-sky-600" />
                          <span>View Curriculum Topics</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
