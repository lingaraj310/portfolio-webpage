import React, { useState } from 'react';
import { Sparkles, Flag, ArrowRight, ArrowLeft, ChevronRight, CheckCircle2, Award, ExternalLink, MapPin, Compass, Navigation, Eye, Trophy, Layers, Clock, Camera, FileCheck } from 'lucide-react';
import { sound } from '../../../utils/audioEffects';

// Phase theme metadata with sunny warm amber & orange palettes
const PHASES = [
  {
    phase: 1,
    title: 'FOUNDATION & IMMERSION',
    subtitle: 'Weeks 01 — 05',
    description: 'Design thinking fundamentals, tangible clay prototyping, CAD sketches, and innovation culture induction.',
    accent: '#D97706',
    badge: 'bg-amber-100 text-amber-900 border-amber-300',
    ring: 'border-amber-500 bg-amber-500 text-white',
    cardBorder: 'hover:border-amber-400',
    glow: 'shadow-amber-500/10',
    weeks: [1, 2, 3, 4, 5]
  },
  {
    phase: 2,
    title: 'DISCOVERY & DIGITAL FABRICATION',
    subtitle: 'Weeks 06 — 10',
    description: 'CO₂ Laser cutting CAM, additive FDM 3D printing, embedded sensors, and physical-digital integration.',
    accent: '#EA580C',
    badge: 'bg-orange-100 text-orange-900 border-orange-300',
    ring: 'border-orange-500 bg-orange-500 text-white',
    cardBorder: 'hover:border-orange-400',
    glow: 'shadow-orange-500/10',
    weeks: [6, 7, 8, 9, 10]
  },
  {
    phase: 3,
    title: 'RAPID PROTOTYPING & SYSTEM BUILD',
    subtitle: 'Weeks 11 — 15',
    description: 'Full mechatronic hardware-software synchronization, edge compute integration, and bench testing.',
    accent: '#B45309',
    badge: 'bg-amber-100 text-amber-950 border-amber-300',
    ring: 'border-amber-600 bg-amber-600 text-white',
    cardBorder: 'hover:border-amber-500',
    glow: 'shadow-amber-500/10',
    weeks: [11, 12, 13, 14, 15]
  },
  {
    phase: 4,
    title: 'VALIDATION, ITERATION & VENTURE',
    subtitle: 'Weeks 16 — 20',
    description: 'Real-world field deployment, performance stress testing, venture pitching, and portfolio showcase.',
    accent: '#9A3412',
    badge: 'bg-orange-100 text-orange-950 border-orange-300',
    ring: 'border-orange-700 bg-orange-700 text-white',
    cardBorder: 'hover:border-orange-500',
    glow: 'shadow-orange-500/10',
    weeks: [16, 17, 18, 19, 20]
  }
];

export default function ProtoSemSerpentineRoadmap({
  weeks = [],
  currentWeekIndex = 0,
  onSelectWeekIndex,
  onOpenWeekDossier
}) {
  const [activePhaseFilter, setActivePhaseFilter] = useState('ALL');

  const filteredPhases = activePhaseFilter === 'ALL'
    ? PHASES
    : PHASES.filter(p => p.phase === activePhaseFilter);

  return (
    <div className="w-full select-none space-y-8 font-sans">
      
      {/* Header & Filter */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 border-b pb-5" style={{ borderColor: 'rgba(245, 158, 11, 0.2)' }}>
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider" style={{ color: '#D97706' }}>
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: '#F59E0B' }} />
            <span>20-WEEK VENTURE ROADMAP HIGHWAY</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: '#78350F', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Curriculum Roadmap & Milestone Phases
          </h3>
          <p className="text-xs sm:text-sm font-medium" style={{ color: 'rgba(120, 53, 15, 0.75)' }}>
            4 structured phase blocks taking concepts from initial clay ideation to verified physical prototypes.
          </p>
        </div>

        {/* Phase Filter */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl" style={{ backgroundColor: 'rgba(254, 243, 199, 0.7)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
          <button
            onClick={() => {
              sound.playSelect();
              setActivePhaseFilter('ALL');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePhaseFilter === 'ALL'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 shadow-sm'
                : 'text-amber-900 hover:bg-amber-200/50'
            }`}
          >
            All 20 Weeks
          </button>
          {PHASES.map((p) => (
            <button
              key={p.phase}
              onClick={() => {
                sound.playSelect();
                setActivePhaseFilter(p.phase);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activePhaseFilter === p.phase
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 shadow-sm'
                  : 'text-amber-900 hover:bg-amber-200/50'
              }`}
            >
              Phase 0{p.phase}
            </button>
          ))}
        </div>
      </div>

      {/* Phase Highway Blocks */}
      <div className="space-y-8">
        {filteredPhases.map((phaseObj) => {
          const phaseWeeks = phaseObj.weeks.map(wNum => weeks.find(w => w.weekNumber === wNum)).filter(Boolean);

          return (
            <section
              key={phaseObj.phase}
              className="rounded-3xl p-6 sm:p-7 space-y-5 transition-all duration-300"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                boxShadow: '0 8px 28px rgba(245, 158, 11, 0.08)'
              }}
            >
              {/* Phase Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3.5" style={{ borderColor: 'rgba(245, 158, 11, 0.15)' }}>
                <div className="flex items-center space-x-3">
                  <div
                    className="w-9 h-9 rounded-2xl flex items-center justify-center font-black text-sm text-slate-900 shadow-sm"
                    style={{ backgroundColor: phaseObj.accent }}
                  >
                    0{phaseObj.phase}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-sm sm:text-base" style={{ color: '#78350F' }}>
                        {phaseObj.title}
                      </h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${phaseObj.badge}`}>
                        {phaseObj.subtitle}
                      </span>
                    </div>
                    <p className="text-xs font-medium mt-0.5" style={{ color: 'rgba(120, 53, 15, 0.7)' }}>
                      {phaseObj.description}
                    </p>
                  </div>
                </div>

                <div className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-xl" style={{ backgroundColor: 'rgba(254, 243, 199, 0.7)', color: '#78350F' }}>
                  W0{phaseObj.weeks[0]} &rarr; W{String(phaseObj.weeks[4]).padStart(2, '0')}
                </div>
              </div>

              {/* 5 Milestone Week Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {phaseWeeks.map((week) => {
                  const globalIdx = week.weekNumber - 1;
                  const isSelected = currentWeekIndex === globalIdx;
                  const isWeek6 = week.weekNumber === 6;

                  return (
                    <div
                      key={week.weekNumber}
                      onClick={() => {
                        sound.playSelect();
                        onSelectWeekIndex(globalIdx);
                      }}
                      onMouseEnter={() => sound.playHover()}
                      className={`group p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px] text-left ${
                        isSelected
                          ? 'border-amber-500 ring-4 ring-amber-400/20 shadow-lg -translate-y-1 bg-amber-50/80'
                          : isWeek6
                          ? 'border-orange-400 shadow-sm hover:border-orange-500 hover:-translate-y-0.5 bg-orange-50/40'
                          : 'border-amber-200/70 shadow-sm hover:border-amber-400 hover:shadow-md hover:-translate-y-0.5 bg-amber-50/30'
                      }`}
                    >
                      <div>
                        {/* Top Node */}
                        <div className="flex items-center justify-between mb-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex flex-col items-center justify-center font-black shadow-sm transition-transform group-hover:scale-105 ${
                              isSelected
                                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 shadow-amber-500/30'
                                : isWeek6
                                ? 'bg-orange-500 text-white'
                                : 'bg-white text-amber-900 border border-amber-200'
                            }`}
                          >
                            <span className="text-[8px] font-mono leading-none opacity-80">WK</span>
                            <span className="text-xs font-black leading-none mt-0.5">
                              {String(week.weekNumber).padStart(2, '0')}
                            </span>
                          </div>

                          {isWeek6 ? (
                            <span className="px-2 py-0.5 rounded-lg bg-orange-100 text-orange-900 border border-orange-300 text-[10px] font-mono font-bold flex items-center space-x-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                              <span>VERIFIED</span>
                            </span>
                          ) : week.photos && week.photos.length > 0 ? (
                            <span className="px-2 py-0.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-mono font-bold flex items-center space-x-1">
                              <Camera className="w-3 h-3 text-amber-600" />
                              <span>{week.photos.length}</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono font-semibold" style={{ color: 'rgba(120, 53, 15, 0.6)' }}>
                              {week.status || 'Active'}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h5 className="font-bold text-xs sm:text-sm line-clamp-2 transition-colors leading-snug" style={{ color: '#78350F' }}>
                          {week.title}
                        </h5>

                        {/* Description */}
                        <p className="text-[11px] line-clamp-3 leading-relaxed mt-1.5" style={{ color: 'rgba(120, 53, 15, 0.75)' }}>
                          {week.description}
                        </p>
                      </div>

                      {/* Bottom Button */}
                      <div className="pt-2.5 mt-2.5 border-t border-amber-200/60 flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold uppercase" style={{ color: 'rgba(120, 53, 15, 0.6)' }}>
                          {isWeek6 ? 'Full Chapter' : 'Milestone'}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playSelect();
                            onOpenWeekDossier(week);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center space-x-1 transition-all cursor-pointer ${
                            isWeek6 || isSelected
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 shadow-sm'
                              : 'bg-white hover:bg-amber-100 text-amber-900 border border-amber-200'
                          }`}
                        >
                          <span>{week.isDocumented ? 'OPEN' : 'VIEW'}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Final Graduation Banner */}
      <section
        className="p-6 sm:p-7 rounded-3xl text-slate-900 shadow-md flex flex-col sm:flex-row items-center justify-between gap-5"
        style={{ background: 'linear-gradient(135deg, #78350F 0%, #B45309 50%, #EA580C 100%)' }}
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-white/10 border border-slate-300 text-amber-200">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-amber-200 uppercase tracking-wider">
              FINAL DESTINATION // WEEK 20
            </div>
            <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Hardware Venture Launch & Graduation
            </h4>
            <p className="text-xs text-amber-100 max-w-xl mt-0.5">
              Culmination of the 20-week fellowship: physical prototype validation, IP portfolio, and venture investor pitch.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playSelect();
            const w20 = weeks.find(w => w.weekNumber === 20);
            if (w20) onOpenWeekDossier(w20);
          }}
          className="px-5 py-2.5 rounded-2xl bg-white text-amber-950 font-bold text-xs flex items-center space-x-2 transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
        >
          <span>EXPLORE WEEK 20</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
        </button>
      </section>
    </div>
  );
}
