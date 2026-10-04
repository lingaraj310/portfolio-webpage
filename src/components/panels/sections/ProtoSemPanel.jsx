import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Lock, 
  Flame, 
  Clock, 
  MapPin, 
  Compass, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Camera, 
  ChevronRight, 
  ChevronDown, 
  ShieldCheck, 
  Cpu, 
  Trophy, 
  Sliders, 
  Eye, 
  Award,
  Box,
  FileText,
  Activity,
  Play,
  X,
  Zap,
  Target,
  Workflow,
  Check
} from 'lucide-react';
import { 
  PROTOSEM_STRUCTURE, 
  PROTOSEM_WEEKS 
} from '../../../data/protoSemData';
import { sound } from '../../../utils/audioEffects';
import Week6IndustrialPrototyping from './Week6IndustrialPrototyping';
import ProtoSemMotionRoadmap from './ProtoSemMotionRoadmap';
import ProtoSemTimelineView from './ProtoSemTimelineView';
import WeekDossierView from './WeekDossierView';

const PHASES = [
  { 
    id: 'phase-1', 
    number: 1, 
    title: 'Foundation & Problem Discovery', 
    theme: 'Empathy Mapping, Problem Decomposition & Opportunity Discovery', 
    weekRange: [1, 5], 
    color: '#10B981', 
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10', 
    border: 'border-emerald-500/30',
    tag: '5 Weeks • Completed'
  },
  { 
    id: 'phase-2', 
    number: 2, 
    title: 'Digital Fabrication & Rapid Prototyping', 
    theme: 'CAD Modeling, Laser Cutting, FDM 3D Printing & Physical Validation', 
    weekRange: [6, 10], 
    color: '#38BDF8', 
    text: 'text-sky-400',
    bg: 'bg-sky-500/10', 
    border: 'border-sky-500/30',
    tag: '5 Weeks • Active Focus'
  },
  { 
    id: 'phase-3', 
    number: 3, 
    title: 'Embedded Systems & IoT Telemetry', 
    theme: 'Microcontroller Architecture, Sensor Telemetry & Edge Computing', 
    weekRange: [11, 15], 
    color: '#A855F7', 
    text: 'text-purple-400',
    bg: 'bg-purple-500/10', 
    border: 'border-purple-500/30',
    tag: '5 Weeks • Upcoming'
  },
  { 
    id: 'phase-4', 
    number: 4, 
    title: 'Product Integration & Venture Launch', 
    theme: 'System Integration, Production Readiness, IP & Investor Pitch', 
    weekRange: [16, 20], 
    color: '#F59E0B', 
    text: 'text-amber-400',
    bg: 'bg-amber-500/10', 
    border: 'border-amber-500/30',
    tag: '5 Weeks • Finale'
  },
];

export default function ProtoSemPanel({ onClose }) {
  const [viewMode, setViewMode] = useState('TIMELINE'); // 'TIMELINE' | 'MOTION' | 'BENTO'
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState('ALL');
  const [activeWeek, setActiveWeek] = useState(null); // Dedicated case study screen for Week 6
  const [selectedWeekDetail, setSelectedWeekDetail] = useState(null); // Quick syllabus drawer modal
  const [animatedProgress, setAnimatedProgress] = useState(0);

  const targetPercent = 30; // 6 of 20 weeks = 30%

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedProgress(targetPercent), 250);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterSelect = (phaseId) => {
    sound.playSelect();
    setSelectedPhaseFilter(phaseId);
  };

  const handleOpenWeek = (week) => {
    sound.playSelect();
    setActiveWeek(week);
    setTimeout(() => {
      const mainScroll = document.querySelector('main');
      if (mainScroll) {
        mainScroll.scrollTo({ top: 0, behavior: 'instant' });
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 10);
  };

  const handleBack = () => {
    sound.playSelect();
    setActiveWeek(null);
    setTimeout(() => {
      const mainScroll = document.querySelector('main');
      if (mainScroll) {
        mainScroll.scrollTo({ top: 0, behavior: 'instant' });
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 10);
  };

  // If user opened any dedicated week dossier
  if (activeWeek) {
    if (activeWeek.weekNumber === 6) {
      return (
        <Week6IndustrialPrototyping 
          onBack={handleBack}
        />
      );
    }

    return (
      <WeekDossierView 
        week={activeWeek}
        onBack={handleBack}
        onNavigateWeek={(wkNum) => {
          const targetWk = PROTOSEM_WEEKS.find(w => w.weekNumber === wkNum);
          if (targetWk) {
            handleOpenWeek(targetWk);
          }
        }}
      />
    );
  }

  return (
    <div className="w-full space-y-6 animate-fade-in font-sans text-slate-800 select-none">
      
      {/* ========================================================================= */}
      {/* 1. SIMPLE CLEAN HEADING & EXPLANATION OF PROTOSEM */}
      {/* ========================================================================= */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-mono text-[11px] font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>20-WEEK INNOVATION FELLOWSHIP</span>
        </div>

        <h1 
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          PRICE ProtoSem
        </h1>

        <p className="text-sm sm:text-base font-semibold text-sky-600">
          Innovation Engineer Trainee &bull; FORGE Innovation &amp; Ventures
        </p>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-4xl pt-1">
          PRICE ProtoSem is an intensive 20-week industry-integrated innovation fellowship focused on solving real-world retail, hardware, and software challenges. The program bridges customer empathy and problem discovery, precision CAD/CAM digital fabrication (laser cutting &amp; 3D printing), embedded IoT sensor telemetry, and commercial product feasibility.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 3. STICKY VIEW MODE & PHASE FILTER BAR */}
      {/* ========================================================================= */}
      <section className="sticky top-2 z-20">
        <div className="p-2.5 rounded-2xl bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-md flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: View Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => {
                sound.playSelect();
                setViewMode('TIMELINE');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                viewMode === 'TIMELINE'
                  ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>TIMELINE FLOW</span>
            </button>

            <button
              onClick={() => {
                sound.playSelect();
                setViewMode('MOTION');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                viewMode === 'MOTION'
                  ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>S-CURVE MOTION</span>
            </button>

            <button
              onClick={() => {
                sound.playSelect();
                setViewMode('BENTO');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                viewMode === 'BENTO'
                  ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>BENTO DASHBOARD</span>
            </button>
          </div>

          {/* Right: Phase Filter */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            <button
              onClick={() => handleFilterSelect('ALL')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                selectedPhaseFilter === 'ALL'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              All 20 Weeks
            </button>

            {PHASES.map((p) => (
              <button
                key={p.id}
                onClick={() => handleFilterSelect(p.id)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  selectedPhaseFilter === p.id
                    ? 'bg-sky-100 text-sky-800 border border-sky-300 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>Phase {p.number}</span>
                {p.id === 'phase-2' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. MAIN ROADMAP VIEW (VERTICAL TIMELINE FLOW / MOTION ROADMAP / BENTO) */}
      {/* ========================================================================= */}
      {viewMode === 'TIMELINE' ? (
        <ProtoSemTimelineView
          weeks={PROTOSEM_WEEKS}
          selectedPhaseFilter={selectedPhaseFilter}
          onOpenWeekDossier={handleOpenWeek}
          onOpenWeekDetail={(w) => {
            sound.playSelect();
            setSelectedWeekDetail(w);
          }}
        />
      ) : viewMode === 'MOTION' ? (
        <ProtoSemMotionRoadmap
          weeks={PROTOSEM_WEEKS}
          currentWeekIndex={5} // Week 06 Active
          onOpenWeekDossier={handleOpenWeek}
        />
      ) : (
        <div className="space-y-8">
          {PHASES.map((phase) => {
            if (selectedPhaseFilter !== 'ALL' && selectedPhaseFilter !== phase.id) {
              return null;
            }

            const phaseWeeks = PROTOSEM_WEEKS.filter(
              w => w.weekNumber >= phase.weekRange[0] && w.weekNumber <= phase.weekRange[1]
            );

            const isCurrentPhase = phase.id === 'phase-2';
            const isCompletedPhase = phase.id === 'phase-1';

            return (
              <section
                key={phase.id}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6 backdrop-blur-xl"
              >
                {/* Phase Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase bg-sky-50 text-sky-700 border border-sky-200">
                        PHASE 0{phase.number} &bull; WEEKS {String(phase.weekRange[0]).padStart(2, '0')}&ndash;{String(phase.weekRange[1]).padStart(2, '0')}
                      </span>
                      {isCurrentPhase && (
                        <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          <span>ACTIVE PHASE</span>
                        </span>
                      )}
                      {isCompletedPhase && (
                        <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                          <Check className="w-3 h-3" /> COMPLETED
                        </span>
                      )}
                    </div>

                    <h3 
                      className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {phase.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-normal">
                      {phase.theme}
                    </p>
                  </div>

                  <div className="text-xs font-mono text-slate-500 shrink-0">
                    {phaseWeeks.length} Milestones Scheduled
                  </div>
                </div>

                {/* Special Featured Spotlight for Week 06 */}
                {isCurrentPhase && (
                  <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50/50 to-indigo-50 border border-sky-200 shadow-sm space-y-4 relative overflow-hidden">
                    <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-sky-200/80 pb-3">
                      <div className="flex items-center space-x-2.5">
                        <span className="px-3 py-1 rounded-full font-mono font-bold text-xs bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-xs">
                          WEEK 06 &bull; CURRENT FOCUS
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
                          <Camera className="w-3.5 h-3.5" />
                          <span>16 Visual Documentation Captures</span>
                        </span>
                      </div>

                      <span className="font-mono text-xs font-bold text-amber-700 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5" />
                        <span>FLAGSHIP CASE STUDY READY</span>
                      </span>
                    </div>

                    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      <div className="lg:col-span-8 space-y-2.5">
                        <h4 
                          className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          Industrial-Ready Prototyping &amp; Digital Fabrication
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                          Practical CAD modeling on Autodesk Fusion 360, dual-layer CO₂ laser cutting/engraving on 1490 CO₂ machine (Dr. Kalam acrylic portrait), and precision FDM 3D printing on Bambu Lab H2S for the OPPO A3x 5G custom phone case.
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {['Fusion 360 CAD', '1490 CO₂ Laser Cutter', 'RDWorks V8 CAM', 'Bambu Studio Slicing', 'OPPO A3x 5G Case'].map(t => (
                            <span key={t} className="font-mono text-[10px] font-semibold text-slate-700 px-2.5 py-1 bg-white border border-slate-200 rounded-md shadow-2xs">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-4 flex justify-end">
                        <button
                          onClick={() => {
                            const w6 = PROTOSEM_WEEKS.find(w => w.weekNumber === 6);
                            if (w6) handleOpenWeek(w6);
                          }}
                          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-mono font-bold text-xs transition-all shadow-md hover:shadow-lg cursor-pointer"
                        >
                          <span>OPEN WEEK 06 CASE STUDY</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Milestone Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {phaseWeeks.map((week) => {
                    const isW6 = week.weekNumber === 6;
                    const isPast = week.status === 'COMPLETED';

                    return (
                      <div
                        key={week.weekNumber}
                        onClick={() => handleOpenWeek(week)}
                        className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 ${
                          isW6
                            ? 'bg-sky-50/70 border-sky-400 shadow-md ring-2 ring-sky-300 cursor-pointer hover:-translate-y-1'
                            : 'bg-white border-slate-200 shadow-xs hover:border-slate-300 cursor-pointer hover:-translate-y-1'
                        }`}
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-sky-700">
                              WEEK {String(week.weekNumber).padStart(2, '0')}
                            </span>
                            {isPast && (
                              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span>Complete</span>
                              </span>
                            )}
                            {isW6 && (
                              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md">
                                <Flame className="w-3 h-3 text-amber-500" />
                                <span>Live</span>
                              </span>
                            )}
                            {!isPast && !isW6 && (
                              <span className="inline-flex items-center gap-1 font-mono text-[10px] text-slate-400">
                                <Lock className="w-3 h-3" />
                                <span>Curriculum</span>
                              </span>
                            )}
                          </div>

                          <h4 className="text-sm font-bold text-slate-900 line-clamp-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {week.title}
                          </h4>

                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                            {week.topic || week.oneLineSummary}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                          {isW6 ? (
                            <span className="text-sky-700 font-bold flex items-center gap-1 hover:underline">
                              <span>Open Case Study</span>
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          ) : (
                            <span className="text-slate-500 flex items-center gap-1 hover:text-slate-800">
                              <span>View Syllabus</span>
                              <ChevronRight className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. FINALE GRADUATION BANNER */}
      {/* ========================================================================= */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="p-3.5 rounded-2xl bg-sky-500/20 text-amber-300 border border-sky-500/30">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider">
              FELLOWSHIP FINALE &bull; WEEK 20
            </div>
            <h4 className="text-xl font-bold text-white mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Hardware Venture Launch &amp; Graduation
            </h4>
            <p className="text-xs text-slate-300 max-w-xl mt-1 leading-relaxed font-light">
              Final culmination of the 20-week fellowship: comprehensive physical prototype validation, intellectual property documentation, and venture investor pitch.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playSelect();
            const w20 = PROTOSEM_WEEKS.find(w => w.weekNumber === 20);
            if (w20) setSelectedWeekDetail(w20);
          }}
          className="px-6 py-3 rounded-xl font-mono font-bold text-xs whitespace-nowrap bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white transition-all hover:scale-105 shrink-0 cursor-pointer shadow-lg shadow-sky-500/25"
        >
          EXPLORE WEEK 20 &rarr;
        </button>
      </section>

      {/* ========================================================================= */}
      {/* QUICK SYLLABUS DRAWER MODAL */}
      {/* ========================================================================= */}
      {selectedWeekDetail && (
        <div className="fixed inset-0 z-70 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-xl rounded-2xl p-6 sm:p-8 bg-white border border-slate-200 shadow-2xl space-y-5 text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-sky-700 uppercase">
                  WEEK {String(selectedWeekDetail.weekNumber).padStart(2, '0')} &bull; {selectedWeekDetail.phase}
                </span>
                <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {selectedWeekDetail.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedWeekDetail(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 border border-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-sky-700 font-mono block">Core Curriculum Topic:</strong>
                <p className="text-slate-900 font-medium">{selectedWeekDetail.topic}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-slate-500 font-mono block">Milestone Description &amp; Objectives:</strong>
                <p className="leading-relaxed font-normal">{selectedWeekDetail.oneLineSummary || selectedWeekDetail.description}</p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-mono text-slate-500">Status: <strong className="text-slate-900">{selectedWeekDetail.status}</strong></span>
                <span className="px-2.5 py-1 rounded-full font-mono text-[10px] bg-sky-50 text-sky-700 border border-sky-200 font-semibold">
                  {selectedWeekDetail.tag || 'Syllabus'}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedWeekDetail(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold transition-all cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
