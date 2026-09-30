import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, X, Layers, Compass, Cpu, Boxes, Terminal, ShieldCheck, ChevronRight, ChevronLeft, Image, CheckCircle2, Quote, Play, Pause, FastForward, Rewind, MapPin, Flag, ExternalLink, Calendar, FileText, Copy, Check, Eye } from 'lucide-react';
import { PROTOSEM_STRUCTURE, PROTOSEM_WEEKS } from '../../../data/protoSemData';
import { sound } from '../../../utils/audioEffects';

export default function ProtoSemPanel() {
  const [viewMode, setViewMode] = useState('ROADMAP'); // 'ROADMAP' | 'GRID'
  const [selectedPhase, setSelectedPhase] = useState('ALL'); // 'ALL' | 1 | 2 | 3 | 4
  const [activeWeek, setActiveWeek] = useState(null); // Selected week for full-page dossier view
  const [previewPhoto, setPreviewPhoto] = useState(null); // Fullscreen image preview lightbox
  const [selectedDayTab, setSelectedDayTab] = useState('ALL'); // 'ALL' | 1 | 2 | 3 for daywise breakdown
  const [copiedBrief, setCopiedBrief] = useState(false); // Feedback state for Copy Brief action
  
  // Roadmap Traveling Simulation States
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0); // 0 to 19 (Week 1 to 20)
  const [isPlaying, setIsPlaying] = useState(false);
  const autoPlayTimerRef = useRef(null);

  // Auto-Drive Interval
  useEffect(() => {
    if (isPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentWeekIndex((prev) => (prev + 1) % PROTOSEM_WEEKS.length);
        sound.playHover();
      }, 2200);
    } else {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlaying]);

  const handleSelectWeekIndex = (idx) => {
    sound.playSelect();
    setCurrentWeekIndex(idx);
  };

  const handleNextWeek = () => {
    sound.playSelect();
    setCurrentWeekIndex((prev) => (prev + 1) % PROTOSEM_WEEKS.length);
  };

  const handlePrevWeek = () => {
    sound.playSelect();
    setCurrentWeekIndex((prev) => (prev - 1 + PROTOSEM_WEEKS.length) % PROTOSEM_WEEKS.length);
  };

  const currentActiveWeekData = PROTOSEM_WEEKS[currentWeekIndex];
  const activeWeekData = activeWeek
    ? PROTOSEM_WEEKS.find((w) => w.id === activeWeek.id || w.weekNumber === activeWeek.weekNumber) || activeWeek
    : null;

  // Filter weeks for grid view
  const filteredWeeks = selectedPhase === 'ALL'
    ? PROTOSEM_WEEKS
    : PROTOSEM_WEEKS.filter(w => w.phaseId === selectedPhase);

  // Helper for navigating between weeks inside full-page dossier view
  const [dossierTab, setDossierTab] = useState('ALL'); // 'ALL' | 'OVERVIEW' | 'DAY_1' | 'DAY_2' | 'DAY_3' | 'REALIZATION' | 'GALLERY'
  const [realizationActiveIdx, setRealizationActiveIdx] = useState(0); // 0 | 1 | 2
  const [galleryCategory, setGalleryCategory] = useState('ALL'); // 'ALL' | 'CAD' | 'LASER' | '3D_PRINT' | 'CLAY'
  const [dayActivePhoto, setDayActivePhoto] = useState({}); // { 1: photoObj, 2: photoObj, 3: photoObj }
  const [activeHotspotId, setActiveHotspotId] = useState('typography'); // 'camera' | 'typography' | 'snapfit' | 'shell'

  // Hotspot definitions for the physical product spotlight in Week 6
  const PRODUCT_HOTSPOTS = [
    {
      id: 'camera',
      label: 'Camera Island Relief',
      spec: '2.5mm Chamfered Clearance',
      desc: 'Precision reverse-engineered dual lens aperture ensuring zero optical flare and complete flash visibility.',
      top: '22%',
      left: '32%',
      badge: 'OPTICAL CLEARANCE'
    },
    {
      id: 'typography',
      label: 'Embossed Typography',
      spec: '0.80mm High-Relief "LINGARAJ"',
      desc: 'Parametrically projected vector text and Tamil spiritual scripture ("முயற்சி திருவினையாக்கும்") with crisp tactile texture.',
      top: '52%',
      left: '48%',
      badge: 'TACTILE ART'
    },
    {
      id: 'snapfit',
      label: 'Interference Snap-Fit Lip',
      spec: '±0.15mm Snug Retention',
      desc: 'Internal 0.60mm retention ridge providing zero-rattle phone retention with secure elastic snap fit.',
      top: '38%',
      left: '78%',
      badge: 'SNAP-FIT TOLERANCE'
    },
    {
      id: 'shell',
      label: 'Uniform Shell Wall',
      spec: '1.80mm Wall & 15% Gyroid Core',
      desc: '3 perimeter loops with high isotropic impact resistance, textured PEI bed finish, and pass-through ports.',
      top: '80%',
      left: '50%',
      badge: 'STRUCTURAL DfAM'
    }
  ];

  // Helper for navigating between weeks inside full-page dossier view
  const navigateDossierWeek = (direction) => {
    sound.playSelect();
    if (!activeWeekData) return;
    const currentNum = activeWeekData.weekNumber;
    let nextNum = currentNum + direction;
    if (nextNum < 1) nextNum = 20;
    if (nextNum > 20) nextNum = 1;
    const nextWeekObj = PROTOSEM_WEEKS.find((w) => w.weekNumber === nextNum);
    if (nextWeekObj) {
      setActiveWeek(nextWeekObj);
      setSelectedDayTab('ALL');
      setDossierTab('ALL');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Helper to categorize photos in the gallery
  const getCategorizedPhotos = (photos = []) => {
    return photos.map((p) => {
      let cat = 'CAD';
      const text = (p.caption + ' ' + p.src).toLowerCase();
      if (text.includes('laser') || text.includes('rdworks') || text.includes('kalam') || text.includes('fablab-laser')) {
        cat = 'LASER';
      } else if (text.includes('bambu') || text.includes('3d printer') || text.includes('3d-printer') || text.includes('oppo-case') || text.includes('phone case')) {
        cat = '3D_PRINT';
      } else if (text.includes('clay') || text.includes('house')) {
        cat = 'CLAY';
      }
      return { ...p, category: cat };
    });
  };

  // =========================================================================
  // VIEW A: FULL-PAGE IMMERSIVE CHAPTER DOSSIER VIEW (COVERS ENTIRE PANEL)
  // =========================================================================
  if (activeWeekData) {
    const categorizedPhotos = getCategorizedPhotos(activeWeekData.photos || []);
    const filteredGalleryPhotos = galleryCategory === 'ALL'
      ? categorizedPhotos
      : categorizedPhotos.filter((p) => p.category === galleryCategory);

    const activeHotspotObj = PRODUCT_HOTSPOTS.find((h) => h.id === activeHotspotId) || PRODUCT_HOTSPOTS[1];

    return (
      <div className="space-y-8 animate-fade-in select-none text-slate-100 max-w-6xl mx-auto pb-20">
        {/* Full-Page Dossier Top Navigation Header */}
        <div className="sticky top-0 z-40 bg-space-950/95 backdrop-blur-2xl p-4 sm:p-5 rounded-3xl border border-cyan-500/40 shadow-2xl space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Left: Back to 20-Week Highway & Week Indicator */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  sound.playSelect();
                  setActiveWeek(null);
                }}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-space-900 hover:bg-space-850 border border-cyan-500/60 hover:border-neon-cyan text-neon-cyan hover:text-white font-orbitron font-extrabold text-xs sm:text-sm cursor-pointer transition-all shadow-neon-cyan group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>BACK TO 20-WEEK ROADMAP</span>
              </button>

              <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-slate-400 border-l border-slate-800 pl-3">
                <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-neon-cyan font-bold">
                  {activeWeekData.weekFormatted}
                </span>
                <span>//</span>
                <span className="text-slate-300 font-bold">{activeWeekData.phase}</span>
              </div>
            </div>

            {/* Right: Adjacent Week Jump & Copy Brief */}
            <div className="flex items-center space-x-2.5 self-stretch sm:self-auto justify-between sm:justify-end">
              {/* Prev / Next Week Switcher */}
              <div className="flex items-center bg-space-900 rounded-xl border border-slate-800 p-1">
                <button
                  onClick={() => navigateDossierWeek(-1)}
                  className="p-1.5 rounded-lg hover:bg-space-800 text-slate-300 hover:text-neon-cyan transition-colors cursor-pointer"
                  title="Previous Week Dossier"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2 text-xs font-mono text-slate-300 font-bold">
                  {String(activeWeekData.weekNumber).padStart(2, '0')} / 20
                </span>
                <button
                  onClick={() => navigateDossierWeek(1)}
                  className="p-1.5 rounded-lg hover:bg-space-800 text-slate-300 hover:text-neon-cyan transition-colors cursor-pointer"
                  title="Next Week Dossier"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Copy Brief Action */}
              <button
                onClick={() => {
                  sound.playSelect();
                  const textBrief = `# ${activeWeekData.weekFormatted} — ${activeWeekData.title}\n\n${activeWeekData.description}\n\nKey Reflection: ${activeWeekData.reflection || activeWeekData.quote || ''}`;
                  navigator.clipboard.writeText(textBrief);
                  setCopiedBrief(true);
                  setTimeout(() => setCopiedBrief(false), 2000);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer border ${
                  copiedBrief
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-space-900 text-slate-200 border-slate-800 hover:border-cyan-400 hover:text-white'
                }`}
                title="Copy formatted dossier brief to clipboard"
              >
                {copiedBrief ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{copiedBrief ? 'COPIED!' : 'COPY BRIEF'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Station Workbench Mode Switcher Bar */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
            <button
              onClick={() => {
                sound.playSelect();
                setDossierTab('ALL');
              }}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                dossierTab === 'ALL'
                  ? 'bg-neon-cyan text-black shadow-neon-cyan'
                  : 'bg-space-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              📑 ALL CHAPTER MODULES
            </button>
            <button
              onClick={() => {
                sound.playSelect();
                setDossierTab('OVERVIEW');
              }}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                dossierTab === 'OVERVIEW'
                  ? 'bg-neon-cyan text-black shadow-neon-cyan'
                  : 'bg-space-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              🚀 OVERVIEW & SPECS
            </button>
            {activeWeekData.dailyModules && activeWeekData.dailyModules.map((dm) => (
              <button
                key={dm.dayNumber}
                onClick={() => {
                  sound.playSelect();
                  setDossierTab(`DAY_${dm.dayNumber}`);
                }}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                  dossierTab === `DAY_${dm.dayNumber}`
                    ? 'bg-cyan-500 text-black shadow-neon-cyan'
                    : 'bg-space-900 border border-slate-800 text-cyan-300 hover:text-white'
                }`}
              >
                {dm.dayNumber === 1 && '📐 DAY 01: CAD & CLAY'}
                {dm.dayNumber === 2 && '⚡ DAY 02: LASER CAM'}
                {dm.dayNumber === 3 && '🖨️ DAY 03: 3D PRINTING'}
              </button>
            ))}
            {activeWeekData.realizationStages && (
              <button
                onClick={() => {
                  sound.playSelect();
                  setDossierTab('REALIZATION');
                }}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                  dossierTab === 'REALIZATION'
                    ? 'bg-neon-cyan text-black shadow-neon-cyan'
                    : 'bg-space-900 border border-cyan-500/40 text-neon-cyan hover:text-white'
                }`}
              >
                🔬 REALIZATION LAB
              </button>
            )}
            {activeWeekData.photos && activeWeekData.photos.length > 0 && (
              <button
                onClick={() => {
                  sound.playSelect();
                  setDossierTab('GALLERY');
                }}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                  dossierTab === 'GALLERY'
                    ? 'bg-neon-cyan text-black shadow-neon-cyan'
                    : 'bg-space-900 border border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                📸 PHOTO VAULT ({activeWeekData.photos.length})
              </button>
            )}
          </div>
        </div>

        {/* 1. HERO BANNER HEADER CARD */}
        <section className="relative p-6 sm:p-10 rounded-3xl bg-space-900/90 border border-cyan-500/40 backdrop-blur-2xl shadow-2xl overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#00f0ff15_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

          <div className="relative z-10 space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neon-cyan uppercase font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-ping" />
              <span className="px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-neon-cyan tracking-wider">
                {activeWeekData.weekFormatted} &bull; {activeWeekData.phase}
              </span>
              <span className="text-slate-400 font-normal">
                STATUS: <strong className="text-white font-bold">{activeWeekData.status}</strong>
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-orbitron font-extrabold text-white tracking-tight leading-tight">
                {activeWeekData.title}
              </h1>
              {activeWeekData.storyTitle && (
                <p className="text-sm sm:text-base font-space text-cyan-300/90 font-medium">
                  {activeWeekData.storyTitle}
                </p>
              )}
            </div>

            {/* Quick Stats Ribbon HUD */}
            {activeWeekData.quickStats && activeWeekData.quickStats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {activeWeekData.quickStats.map((stat, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3.5 sm:p-4 rounded-2xl bg-space-950/80 border border-cyan-500/30 hover:border-cyan-400 transition-all flex flex-col justify-center space-y-1 shadow-md"
                  >
                    <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                      {stat.label}
                    </span>
                    <span className="text-xs sm:text-sm font-orbitron font-bold text-neon-cyan truncate">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeWeekData.quote && (
              <div className="p-5 sm:p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-start space-x-4 text-cyan-100 italic font-space text-sm sm:text-base leading-relaxed shadow-md">
                <Quote className="w-6 h-6 sm:w-7 sm:h-7 text-neon-cyan shrink-0 mt-0.5" />
                <p>"{activeWeekData.quote}"</p>
              </div>
            )}
          </div>
        </section>

        {/* 2. CHAPTER OVERVIEW */}
        <section id="overview-sec" className="space-y-3">
          <h3 className="text-sm sm:text-base font-mono text-cyan-400 uppercase font-bold tracking-wider flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>CHAPTER OVERVIEW & SCOPE</span>
          </h3>
          <p className="text-base sm:text-lg text-slate-100 font-space leading-relaxed p-6 sm:p-8 rounded-3xl bg-space-950/90 border border-slate-800 shadow-xl">
            {activeWeekData.description}
          </p>
        </section>

        {/* ========================================================================= */}
        {/* 3. DAYWISE PLAN & DAYWISE IMAGES (FIRST IN SEQUENCE)                      */}
        {/* ========================================================================= */}
        {activeWeekData.dailyModules && activeWeekData.dailyModules.length > 0 && (
          <section id="daily-sec" className="space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-mono text-neon-cyan uppercase font-bold flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-neon-cyan" />
                  <span>DAY-BY-DAY PLAN & WORKSHOP FIELD NOTES</span>
                </h3>
                <p className="text-xs font-mono text-slate-400 pt-0.5">
                  Complete chronological engineering methodology with companion visual captures
                </p>
              </div>

              {/* Day Filter Switcher (When on ALL mode) */}
              {dossierTab === 'ALL' && (
                <div className="flex flex-wrap gap-2 p-1.5 bg-space-950 rounded-2xl border border-slate-800">
                  <button
                    onClick={() => {
                      sound.playSelect();
                      setSelectedDayTab('ALL');
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedDayTab === 'ALL'
                        ? 'bg-neon-cyan text-black shadow-neon-cyan'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    ALL DAYS
                  </button>
                  {activeWeekData.dailyModules.map((dm) => (
                    <button
                      key={dm.dayNumber}
                      onClick={() => {
                        sound.playSelect();
                        setSelectedDayTab(dm.dayNumber);
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                        selectedDayTab === dm.dayNumber
                          ? 'bg-neon-cyan text-black shadow-neon-cyan'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      DAY 0{dm.dayNumber}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Day Modules List: Day Plan + In-Day Images */}
            <div className="space-y-12">
              {activeWeekData.dailyModules
                .filter((dm) => {
                  if (dossierTab === `DAY_${dm.dayNumber}`) return true;
                  if (dossierTab === 'ALL') {
                    return selectedDayTab === 'ALL' || selectedDayTab === dm.dayNumber;
                  }
                  return false;
                })
                .map((dm) => {
                  const currentFeaturedPhoto = dayActivePhoto[dm.dayNumber] || (dm.photos && dm.photos[0]);

                  return (
                    <div
                      key={dm.dayNumber}
                      className="rounded-3xl bg-space-950/90 border border-cyan-500/40 p-6 sm:p-8 space-y-7 shadow-2xl transition-all"
                    >
                      {/* Day Header */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800/90 pb-5">
                        <div className="space-y-1.5">
                          <div className="flex items-center space-x-3">
                            <span className="px-3.5 py-1 rounded-lg bg-neon-cyan text-black text-sm font-mono font-black shadow-neon-cyan">
                              DAY 0{dm.dayNumber}
                            </span>
                            <span className="text-sm sm:text-base font-mono text-cyan-300 font-bold">
                              {dm.date}
                            </span>
                          </div>
                          <h4 className="text-lg sm:text-2xl font-orbitron font-bold text-white pt-1">
                            {dm.title}
                          </h4>
                        </div>
                        {dm.focus && (
                          <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-xs sm:text-sm font-space text-cyan-200 font-medium max-w-md text-left sm:text-right">
                            {dm.focus}
                          </span>
                        )}
                      </div>

                      {/* Day Plan: Structured Point-by-Point Technical Modules */}
                      <div className="space-y-4">
                        <h5 className="text-xs sm:text-sm font-mono text-cyan-400 uppercase font-bold flex items-center space-x-2 tracking-wider">
                          <FileText className="w-4 h-4 text-neon-cyan" />
                          <span>DAY 0{dm.dayNumber} TECHNICAL PLAN & METHODOLOGY</span>
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {dm.sections.map((sec, sIdx) => (
                            <div
                              key={sIdx}
                              className="p-5 rounded-2xl bg-space-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-3 shadow-md"
                            >
                              <h6 className="text-sm sm:text-base font-orbitron font-bold text-cyan-300 flex items-center space-x-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                                <span>{sec.heading}</span>
                              </h6>
                              <ul className="space-y-2.5 pt-1">
                                {sec.points.map((pt, pIdx) => (
                                  <li
                                    key={pIdx}
                                    className="flex items-start space-x-3 text-sm sm:text-base font-space text-slate-100 leading-relaxed"
                                  >
                                    <span className="w-2 h-2 rounded-full bg-neon-cyan mt-2 shrink-0 shadow-[0_0_8px_rgba(0,240,255,0.9)]" />
                                    <span>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Day Images: Comprehensive Visual Gallery for that Day */}
                      {dm.photos && dm.photos.length > 0 && (
                        <div className="pt-4 border-t border-slate-800/90 space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-mono text-neon-cyan font-bold flex items-center space-x-2 uppercase">
                              <Image className="w-4 h-4 text-neon-cyan" />
                              <span>DAY 0{dm.dayNumber} CAPTURES & VISUAL EVIDENCE ({dm.photos.length} PHOTOS)</span>
                            </span>
                            <span className="text-xs font-mono text-slate-400">
                              Click photo to enlarge
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {dm.photos.map((ph, pIdx) => (
                              <div
                                key={pIdx}
                                onClick={() => setPreviewPhoto(ph)}
                                className="group relative h-52 sm:h-60 rounded-2xl overflow-hidden border border-slate-800 hover:border-neon-cyan cursor-pointer shadow-lg transition-all bg-space-900"
                              >
                                <img
                                  src={ph.src}
                                  alt={ph.caption}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-3.5 flex items-end">
                                  <span className="text-xs sm:text-sm font-space text-cyan-100 font-medium leading-tight">
                                    {ph.caption}
                                  </span>
                                </div>
                                <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/70 text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Eye className="w-4 h-4" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 4. AT THE END: THE INTERACTIVE DESIGN & PRODUCT REALIZATION (GRAND FINALE)*/}
        {/* ========================================================================= */}
        
        {/* Physical Product Spotlight with Interactive 3D Hotspot Pins */}
        {(dossierTab === 'ALL' || dossierTab === 'OVERVIEW' || dossierTab === 'REALIZATION') && (
          <section id="interactive-spotlight-sec" className="space-y-6 pt-4 border-t border-slate-800/90">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-2xl font-orbitron font-extrabold text-neon-cyan uppercase flex items-center space-x-3">
                <Sparkles className="w-6 h-6 text-neon-cyan animate-pulse" />
                <span>INTERACTIVE PRODUCT SPOTLIGHT & PHYSICAL VALIDATION</span>
              </h3>
              <p className="text-xs sm:text-sm font-space text-slate-300">
                Interactive inspection of the manufactured OPPO A3x 5G custom snap-fit phone case with live target pins
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-space-900/95 border border-cyan-500/50 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left 6 cols: Interactive Hotspot Image Canvas */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-cyan-500/50 bg-space-950 group shadow-2xl">
                    <img
                      src="/protosem/week-06/oppo-case-physical-output.png"
                      alt="Physical 3D Printed OPPO A3x 5G Phone Case"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Interactive Hotspot Pins */}
                    {PRODUCT_HOTSPOTS.map((spot) => {
                      const isSelected = activeHotspotId === spot.id;
                      return (
                        <button
                          key={spot.id}
                          onClick={() => {
                            sound.playHover();
                            setActiveHotspotId(spot.id);
                          }}
                          onMouseEnter={() => {
                            sound.playHover();
                            setActiveHotspotId(spot.id);
                          }}
                          style={{ top: spot.top, left: spot.left }}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-20 ${
                            isSelected
                              ? 'bg-neon-cyan text-black scale-125 shadow-[0_0_20px_rgba(0,240,255,1)] ring-4 ring-cyan-300/60'
                              : 'bg-black/80 border-2 border-neon-cyan text-neon-cyan hover:scale-110 shadow-lg'
                          }`}
                          title={spot.label}
                        >
                          <span className="w-2 h-2 rounded-full bg-current animate-ping" />
                          <span className="absolute text-[10px] font-mono font-black">
                            +
                          </span>
                        </button>
                      );
                    })}

                    {/* Expand Fullscreen Button */}
                    <button
                      onClick={() =>
                        setPreviewPhoto({
                          src: '/protosem/week-06/oppo-case-physical-output.png',
                          caption: 'Final 3D Printed OPPO A3x 5G Custom Phone Case — Physical Output with Embossed Typography'
                        })
                      }
                      className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-xl bg-black/80 hover:bg-space-850 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-bold flex items-center space-x-1.5 transition-all cursor-pointer z-10"
                    >
                      <Eye className="w-4 h-4" />
                      <span>EXPAND VIEW</span>
                    </button>
                  </div>
                </div>

                {/* Right 6 cols: Hotspot Spec Inspector + Pin Selector */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="space-y-1">
                    <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-xs font-mono font-bold text-neon-cyan border border-cyan-500/40">
                      INTERACTIVE TARGET PIN INSPECTION
                    </span>
                    <h4 className="text-xl sm:text-2xl font-orbitron font-bold text-white pt-1">
                      {activeHotspotObj.label}
                    </h4>
                    <p className="text-xs font-mono text-cyan-300 font-semibold">
                      SPEC: {activeHotspotObj.spec}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base font-space text-slate-200 leading-relaxed p-5 rounded-2xl bg-space-950/80 border border-slate-800">
                    {activeHotspotObj.desc}
                  </p>

                  {/* Hotspot Target Switcher Buttons */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    {PRODUCT_HOTSPOTS.map((spot) => (
                      <button
                        key={spot.id}
                        onClick={() => {
                          sound.playHover();
                          setActiveHotspotId(spot.id);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          activeHotspotId === spot.id
                            ? 'bg-neon-cyan text-black border-neon-cyan shadow-neon-cyan'
                            : 'bg-space-950 border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50'
                        }`}
                      >
                        <div className="text-xs font-orbitron font-bold truncate">
                          {spot.label}
                        </div>
                        <div className={`text-[10px] font-mono truncate ${activeHotspotId === spot.id ? 'text-black/80' : 'text-cyan-400'}`}>
                          {spot.badge}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Digital-to-Physical Realization Lab (3-Stage Transformation Stepper) */}
        {(dossierTab === 'ALL' || dossierTab === 'OVERVIEW' || dossierTab === 'REALIZATION') && activeWeekData.realizationStages && activeWeekData.realizationStages.length > 0 && (
          <section id="realization-sec" className="space-y-6 pt-4 border-t border-slate-800/90">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-mono text-neon-cyan uppercase font-bold flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-neon-cyan" />
                  <span>3-STAGE DIGITAL-TO-PHYSICAL REALIZATION PIPELINE</span>
                </h3>
                <p className="text-xs font-mono text-slate-400 pt-0.5">
                  End-to-End transition from parametric CAD slicing to physical phone case in hand
                </p>
              </div>

              {/* Stage Stepper Tabs */}
              <div className="flex items-center space-x-2 bg-space-950 p-1.5 rounded-2xl border border-slate-800">
                {activeWeekData.realizationStages.map((stg, stIdx) => (
                  <button
                    key={stIdx}
                    onClick={() => {
                      sound.playSelect();
                      setRealizationActiveIdx(stIdx);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      realizationActiveIdx === stIdx
                        ? 'bg-neon-cyan text-black shadow-neon-cyan'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    STAGE {stg.stage}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Hero Stage Inspector Card */}
            {activeWeekData.realizationStages[realizationActiveIdx] && (
              <div className="rounded-3xl bg-space-950/95 border border-cyan-500/50 p-6 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  {/* Left Media Preview */}
                  <div
                    onClick={() =>
                      setPreviewPhoto({
                        src: activeWeekData.realizationStages[realizationActiveIdx].image,
                        caption: `${activeWeekData.realizationStages[realizationActiveIdx].title}: ${activeWeekData.realizationStages[realizationActiveIdx].caption}`
                      })
                    }
                    className="w-full lg:w-1/2 h-64 sm:h-80 rounded-2xl overflow-hidden border border-cyan-500/40 hover:border-neon-cyan cursor-pointer shadow-xl transition-all relative group bg-space-900"
                  >
                    <img
                      src={activeWeekData.realizationStages[realizationActiveIdx].image}
                      alt={activeWeekData.realizationStages[realizationActiveIdx].title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-4">
                      <span className="text-xs sm:text-sm font-space text-cyan-100 font-medium">
                        {activeWeekData.realizationStages[realizationActiveIdx].caption}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/70 text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1.5 text-xs font-mono">
                      <Eye className="w-4 h-4" />
                      <span>CLICK TO EXPAND</span>
                    </div>
                  </div>

                  {/* Right Stage Description & Meta */}
                  <div className="w-full lg:w-1/2 space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <span className="px-3.5 py-1 rounded-lg bg-neon-cyan text-black font-mono font-black text-xs shadow-neon-cyan">
                          STAGE {activeWeekData.realizationStages[realizationActiveIdx].stage}
                        </span>
                        <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                          {activeWeekData.realizationStages[realizationActiveIdx].badge}
                        </span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-orbitron font-extrabold text-white">
                        {activeWeekData.realizationStages[realizationActiveIdx].title}
                      </h4>
                      <p className="text-xs sm:text-sm font-mono text-slate-400">
                        {activeWeekData.realizationStages[realizationActiveIdx].subtitle}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base font-space text-slate-200 leading-relaxed bg-space-900/80 p-5 rounded-2xl border border-slate-800">
                      {activeWeekData.realizationStages[realizationActiveIdx].description}
                    </p>

                    {/* Step-by-Step Stage Navigation Bar */}
                    <div className="flex items-center space-x-3 pt-2">
                      <button
                        disabled={realizationActiveIdx === 0}
                        onClick={() => {
                          sound.playSelect();
                          setRealizationActiveIdx((prev) => Math.max(0, prev - 1));
                        }}
                        className="px-4 py-2 rounded-xl bg-space-900 border border-slate-800 disabled:opacity-30 hover:border-cyan-400 text-xs font-mono font-bold text-slate-300 hover:text-white transition-all cursor-pointer flex items-center space-x-1.5"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>PREV STAGE</span>
                      </button>
                      <button
                        disabled={realizationActiveIdx === activeWeekData.realizationStages.length - 1}
                        onClick={() => {
                          sound.playSelect();
                          setRealizationActiveIdx((prev) => Math.min(activeWeekData.realizationStages.length - 1, prev + 1));
                        }}
                        className="px-4 py-2 rounded-xl bg-space-900 border border-slate-800 disabled:opacity-30 hover:border-cyan-400 text-xs font-mono font-bold text-cyan-400 hover:text-white transition-all cursor-pointer flex items-center space-x-1.5"
                      >
                        <span>NEXT STAGE</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* 6-Step Digital-to-Physical Pipeline Bar */}
        {(dossierTab === 'ALL' || dossierTab === 'OVERVIEW') && activeWeekData.pipelineSteps && (
          <section id="pipeline-sec" className="space-y-4 pt-4 border-t border-slate-800/90">
            <h3 className="text-sm sm:text-base font-mono text-neon-cyan uppercase font-bold flex items-center space-x-2">
              <Compass className="w-5 h-5 text-neon-cyan" />
              <span>END-TO-END INDUSTRIAL PROTOTYPING PIPELINE</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {activeWeekData.pipelineSteps.map((st, sIdx) => (
                <div
                  key={sIdx}
                  className="p-4 sm:p-5 rounded-2xl bg-space-950/90 border border-cyan-500/30 hover:border-neon-cyan transition-all flex flex-col justify-between space-y-2 shadow-lg group"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400 font-bold">
                    <span>STEP {st.step}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-orbitron font-bold text-white leading-tight">
                      {st.name}
                    </div>
                    <div className="text-xs sm:text-sm font-space text-slate-300 leading-snug pt-1">
                      {st.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Engineering Specifications & Parameter HUD Card */}
        {(dossierTab === 'ALL' || dossierTab === 'OVERVIEW') && activeWeekData.specs && (
          <section id="specs-sec" className="space-y-4">
            <h3 className="text-sm sm:text-base font-mono text-cyan-300 uppercase font-bold flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-cyan-300" />
              <span>ENGINEERING PARAMETERS & HARDWARE SPECIFICATIONS</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeWeekData.specs.map((sp, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-space-950/90 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-center space-y-1 shadow-lg"
                >
                  <span className="text-xs font-mono text-slate-400 uppercase font-semibold tracking-wider">
                    {sp.label}
                  </span>
                  <span className="text-base sm:text-lg font-orbitron font-bold text-neon-cyan pt-0.5">
                    {sp.value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Categorized Complete Photo Archive Gallery */}
        {(dossierTab === 'ALL' || dossierTab === 'GALLERY') && activeWeekData.photos && activeWeekData.photos.length > 0 && (
          <section id="gallery-sec" className="space-y-6 pt-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-sm sm:text-base font-mono text-neon-cyan uppercase font-bold flex items-center space-x-2">
                  <Image className="w-5 h-5 text-neon-cyan" />
                  <span>COMPLETE WORKSHOP PHOTO ARCHIVE ({categorizedPhotos.length} HIGH-RES CAPTURES)</span>
                </h3>
                <p className="text-xs font-mono text-slate-400 pt-0.5">
                  Filter visual evidence by fabrication technology
                </p>
              </div>

              {/* Category Filter Chips */}
              <div className="flex flex-wrap gap-2 p-1.5 bg-space-950 rounded-2xl border border-slate-800">
                <button
                  onClick={() => {
                    sound.playSelect();
                    setGalleryCategory('ALL');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    galleryCategory === 'ALL'
                      ? 'bg-neon-cyan text-black shadow-neon-cyan'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  ALL ({categorizedPhotos.length})
                </button>
                <button
                  onClick={() => {
                    sound.playSelect();
                    setGalleryCategory('CAD');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    galleryCategory === 'CAD'
                      ? 'bg-neon-cyan text-black shadow-neon-cyan'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  📐 CAD (4)
                </button>
                <button
                  onClick={() => {
                    sound.playSelect();
                    setGalleryCategory('LASER');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    galleryCategory === 'LASER'
                      ? 'bg-neon-cyan text-black shadow-neon-cyan'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  ⚡ LASER (3)
                </button>
                <button
                  onClick={() => {
                    sound.playSelect();
                    setGalleryCategory('3D_PRINT');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    galleryCategory === '3D_PRINT'
                      ? 'bg-neon-cyan text-black shadow-neon-cyan'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  🖨️ 3D PRINT (3)
                </button>
                <button
                  onClick={() => {
                    sound.playSelect();
                    setGalleryCategory('CLAY');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    galleryCategory === 'CLAY'
                      ? 'bg-neon-cyan text-black shadow-neon-cyan'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  🏺 CLAY (1)
                </button>
              </div>
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredGalleryPhotos.map((photo, pIdx) => (
                <div
                  key={pIdx}
                  onClick={() => setPreviewPhoto(photo)}
                  className="group relative h-48 sm:h-60 rounded-2xl overflow-hidden border border-slate-800 hover:border-neon-cyan cursor-pointer shadow-xl transition-all bg-space-950"
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-black/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-bold">
                      {photo.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3.5 flex items-end">
                    <span className="text-xs sm:text-sm font-space text-cyan-100 font-medium line-clamp-2 leading-tight">
                      {photo.caption}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technologies & Tools */}
        {(dossierTab === 'ALL' || dossierTab === 'OVERVIEW') && activeWeekData.technologies && activeWeekData.technologies.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-sm sm:text-base font-mono text-cyan-400 uppercase font-bold flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span>TOOLS, FRAMEWORKS & HARDWARE TECHNOLOGIES</span>
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {activeWeekData.technologies.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs sm:text-sm font-mono text-cyan-200 font-semibold shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Outcomes & Milestones */}
        {(dossierTab === 'ALL' || dossierTab === 'OVERVIEW') && activeWeekData.outcomes && activeWeekData.outcomes.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-sm sm:text-base font-mono text-emerald-400 uppercase font-bold flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>KEY OUTCOMES & MILESTONES ACHIEVED</span>
            </h3>
            <div className="space-y-3">
              {activeWeekData.outcomes.map((out, oIdx) => (
                <div
                  key={oIdx}
                  className="flex items-start space-x-3 text-sm sm:text-base text-slate-100 p-4 sm:p-5 rounded-2xl bg-space-950/70 border border-slate-800/90 shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                  <span>{out}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Personal Learning / Reflection */}
        {(dossierTab === 'ALL' || dossierTab === 'OVERVIEW') && activeWeekData.reflection && (
          <section id="reflection-sec" className="space-y-4 pt-2 border-t border-slate-800/90">
            <h3 className="text-sm sm:text-base font-mono text-amber-400 uppercase font-bold flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>PERSONAL LEARNING & ENGINEERING REFLECTION</span>
            </h3>
            <p className="text-base sm:text-lg text-slate-100 font-space leading-relaxed p-6 sm:p-8 rounded-3xl bg-space-950/80 border border-slate-800 shadow-xl">
              {activeWeekData.reflection}
            </p>
          </section>
        )}

        {/* Bottom Navigation: Return to Roadmap or Next Chapter */}
        <section className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={() => {
              sound.playSelect();
              setActiveWeek(null);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-space-900 border border-cyan-500/50 hover:border-neon-cyan text-neon-cyan hover:text-white font-orbitron font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 cursor-pointer shadow-neon-cyan transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO 20-WEEK ROADMAP</span>
          </button>

          <button
            onClick={() => navigateDossierWeek(1)}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-neon-cyan hover:bg-white text-black font-orbitron font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-2 cursor-pointer shadow-neon-cyan transition-all"
          >
            <span>NEXT CHAPTER ({String(activeWeekData.weekNumber === 20 ? 1 : activeWeekData.weekNumber + 1).padStart(2, '0')})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

        {/* Fullscreen Photo Lightbox Modal */}
        {previewPhoto && (
          <div
            onClick={() => setPreviewPhoto(null)}
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl animate-fade-in cursor-pointer"
          >
            <div className="relative max-w-4xl max-h-[90vh] space-y-3 text-center" onClick={(e) => e.stopPropagation()}>
              <img
                src={previewPhoto.src}
                alt={previewPhoto.caption}
                className="max-w-full max-h-[80vh] rounded-2xl object-contain border border-cyan-500/40 shadow-2xl mx-auto"
              />
              <p className="text-sm font-space text-cyan-300 font-medium">
                {previewPhoto.caption}
              </p>
              <button
                onClick={() => setPreviewPhoto(null)}
                className="px-5 py-1.5 rounded-full bg-space-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
              >
                Close Preview [ESC]
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW B: DEFAULT 20-WEEK ROADMAP & GRID OVERVIEW
  // =========================================================================
  return (
    <div className="space-y-16 animate-fade-in select-none text-slate-100 max-w-6xl mx-auto">
      {/* 1. EDITORIAL HEADER COMPOSITION */}
      <section className="relative p-6 sm:p-10 rounded-3xl bg-space-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#00f0ff15_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono text-neon-cyan tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
            <span>MY WORLD &rarr; PROTOSEM &rarr; INNOVATION JOURNEY</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl font-orbitron font-extrabold text-white tracking-tight">
              {PROTOSEM_STRUCTURE.title}
            </h1>
            <h2 className="text-lg sm:text-2xl font-space font-semibold text-cyan-300">
              {PROTOSEM_STRUCTURE.role}
            </h2>
            <p className="text-xs sm:text-sm font-mono tracking-wider text-slate-400 uppercase pt-1">
              {PROTOSEM_STRUCTURE.programmeType}
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-300 font-space leading-relaxed max-w-4xl pt-2 border-t border-slate-800/80">
            {PROTOSEM_STRUCTURE.description}
          </p>
        </div>
      </section>

      {/* 2. PROGRAMME METRICS & VIEW SWITCHER */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full sm:w-auto">
          {PROTOSEM_STRUCTURE.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-4 rounded-2xl bg-space-900/95 border border-cyan-500/30 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-md"
            >
              <div className="text-2xl sm:text-3xl font-orbitron font-black text-neon-cyan">
                {m.number}
              </div>
              <div className="text-[10px] font-mono tracking-widest text-slate-300 font-bold uppercase mt-0.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* View Mode Toggle: Road Map vs Grid */}
        <div className="flex items-center space-x-2 p-1.5 rounded-2xl bg-space-950/90 border border-slate-800 self-stretch sm:self-auto">
          <button
            onClick={() => {
              sound.playSelect();
              setViewMode('ROADMAP');
            }}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl font-orbitron text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'ROADMAP'
                ? 'bg-neon-cyan text-black shadow-neon-cyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>20-WEEK ROADMAP VIEW</span>
          </button>
          <button
            onClick={() => {
              sound.playSelect();
              setViewMode('GRID');
            }}
            className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl font-orbitron text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'GRID'
                ? 'bg-neon-cyan text-black shadow-neon-cyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>GRID DOSSIER VIEW</span>
          </button>
        </div>
      </section>

      {/* 3. 20-WEEK DYNAMIC ROADMAP ANIMATION EXPERIENCE */}
      {viewMode === 'ROADMAP' ? (
        <section className="space-y-8 animate-fade-in">
          {/* Roadmap Interactive Controls Panel */}
          <div className="p-6 sm:p-8 rounded-3xl bg-space-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs font-mono text-neon-cyan uppercase">
                  <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                  <span>INNOVATION HIGHWAY &bull; 20-WEEK FLIGHT PATH</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-orbitron font-extrabold text-white">
                  Week {String(currentActiveWeekData.weekNumber).padStart(2, '0')} Milestone &bull; {currentActiveWeekData.title}
                </h3>
              </div>

              {/* Road Controls */}
              <div className="flex items-center space-x-2 self-stretch sm:self-auto">
                <button
                  onClick={handlePrevWeek}
                  className="p-2.5 rounded-xl bg-space-950 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-white transition-all cursor-pointer"
                  title="Previous Week"
                >
                  <Rewind className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    sound.playSelect();
                    setIsPlaying(!isPlaying);
                  }}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-orbitron text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    isPlaying
                      ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/30'
                      : 'bg-neon-cyan text-black shadow-neon-cyan'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'PAUSE TRIP' : 'AUTO-TRAVEL ROADMAP'}</span>
                </button>

                <button
                  onClick={handleNextWeek}
                  className="p-2.5 rounded-xl bg-space-950 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-white transition-all cursor-pointer"
                  title="Next Week"
                >
                  <FastForward className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Milestone Spotlight Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2 space-y-3 p-6 rounded-2xl bg-space-950/80 border border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-neon-cyan border border-cyan-500/40 font-bold">
                    {currentActiveWeekData.phase}
                  </span>
                  <span className="text-slate-400">
                    STATUS: <strong className="text-white">{currentActiveWeekData.status}</strong>
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-orbitron font-bold text-white">
                  {currentActiveWeekData.title}
                </h4>

                <p className="text-xs sm:text-sm font-space text-slate-300 leading-relaxed">
                  {currentActiveWeekData.description}
                </p>

                {currentActiveWeekData.isDocumented && (
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    {currentActiveWeekData.photos && currentActiveWeekData.photos.length > 0 && (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono flex items-center space-x-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{currentActiveWeekData.photos.length} Captured Photos</span>
                      </span>
                    )}
                    <button
                      onClick={() => {
                        sound.playSelect();
                        setActiveWeek(currentActiveWeekData);
                        setSelectedDayTab('ALL');
                      }}
                      className="px-4 py-1.5 rounded-full bg-neon-cyan text-black font-orbitron font-extrabold text-xs tracking-wider shadow-neon-cyan cursor-pointer hover:bg-white transition-all"
                    >
                      OPEN {currentActiveWeekData.weekFormatted} FULL DOSSIER &rarr;
                    </button>
                  </div>
                )}
              </div>

              {/* Progress Dial Meter */}
              <div className="p-6 rounded-2xl bg-space-950/80 border border-cyan-500/30 text-center space-y-2 flex flex-col items-center justify-center">
                <span className="text-[11px] font-mono text-slate-400 uppercase">
                  ROADMAP PROGRESSION
                </span>
                <div className="text-4xl font-orbitron font-black text-neon-cyan">
                  {Math.round(((currentWeekIndex + 1) / 20) * 100)}%
                </div>
                <div className="w-full bg-space-900 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 via-sky-400 to-neon-cyan transition-all duration-500"
                    style={{ width: `${((currentWeekIndex + 1) / 20) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  MILESTONE {currentWeekIndex + 1} OF 20 REACHED
                </span>
              </div>
            </div>
          </div>

          {/* 4 Connected Phases Road Track */}
          <div className="p-6 sm:p-10 rounded-3xl bg-space-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl space-y-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-neon-cyan uppercase font-bold flex items-center space-x-2">
                <Flag className="w-4 h-4" />
                <span>20-WEEK CONTINUOUS INNOVATION HIGHWAY</span>
              </span>
              <span className="text-xs font-mono text-slate-400">
                CLICK ANY NODE TO TRAVEL
              </span>
            </div>

            {[
              { phase: 1, title: 'PHASE 01 — FOUNDATION & IMMERSION', weeks: PROTOSEM_WEEKS.slice(0, 5) },
              { phase: 2, title: 'PHASE 02 — DISCOVERY & DESIGN', weeks: PROTOSEM_WEEKS.slice(5, 10) },
              { phase: 3, title: 'PHASE 03 — RAPID PROTOTYPING & BUILD', weeks: PROTOSEM_WEEKS.slice(10, 15) },
              { phase: 4, title: 'PHASE 04 — VALIDATION & VENTURE', weeks: PROTOSEM_WEEKS.slice(15, 20) },
            ].map((section) => (
              <div key={section.phase} className="space-y-4 relative">
                <div className="flex items-center space-x-3">
                  <div className="px-3 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-neon-cyan font-mono font-bold text-xs">
                    PHASE 0{section.phase}
                  </div>
                  <h4 className="font-orbitron font-bold text-sm sm:text-base text-white">
                    {section.title}
                  </h4>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-500/40 to-transparent" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
                  {section.weeks.map((week) => {
                    const globalIdx = week.weekNumber - 1;
                    const isReached = currentWeekIndex >= globalIdx;
                    const isCurrent = currentWeekIndex === globalIdx;

                    return (
                      <div
                        key={week.weekNumber}
                        onClick={() => handleSelectWeekIndex(globalIdx)}
                        onMouseEnter={() => sound.playHover()}
                        className={`relative p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer backdrop-blur-xl flex flex-col justify-between min-h-[140px] group ${
                          isCurrent
                            ? 'bg-space-900 border-neon-cyan shadow-[0_0_30px_rgba(0,240,255,0.4)] scale-105 -translate-y-1'
                            : isReached
                            ? 'bg-space-950/90 border-cyan-500/40 hover:border-neon-cyan'
                            : 'bg-space-950/60 border-slate-800/80 opacity-70 hover:opacity-100 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-xs font-mono font-bold ${
                              isCurrent
                                ? 'text-black px-2 py-0.5 rounded-full bg-neon-cyan font-extrabold shadow-neon-cyan'
                                : isReached
                                ? 'text-neon-cyan'
                                : 'text-slate-400'
                            }`}
                          >
                            WEEK {String(week.weekNumber).padStart(2, '0')}
                          </span>

                          {isCurrent && (
                            <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-400 text-black text-[9px] font-mono font-black animate-pulse shadow-md">
                              <span>ROVER</span>
                            </div>
                          )}

                          {week.isDocumented && !isCurrent && (
                            <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-ping" />
                          )}
                        </div>

                        <div className="my-2">
                          <h5 className="font-orbitron font-bold text-white text-xs line-clamp-2 group-hover:text-neon-cyan transition-colors">
                            {week.title}
                          </h5>
                          <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                            {week.status}
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playSelect();
                            setActiveWeek(week);
                            setSelectedDayTab('ALL');
                          }}
                          className="text-[10px] font-mono text-cyan-400 hover:text-white flex items-center justify-between pt-2 border-t border-slate-800/80"
                        >
                          <span>{week.photos && week.photos.length > 0 ? `${week.photos.length} PHOTOS • VIEW` : week.isDocumented ? 'VIEW DOSSIER' : 'DETAILS'}</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        /* 4. CLASSIC GRID DOSSIER VIEW */
        <section className="space-y-8 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-space-900/90 border border-slate-800">
            <div className="flex flex-wrap gap-2">
              {['ALL', 1, 2, 3, 4].map((ph) => {
                const isSelected = selectedPhase === ph;
                return (
                  <button
                    key={ph}
                    onClick={() => {
                      sound.playSelect();
                      setSelectedPhase(ph);
                    }}
                    className={`px-4 py-2 rounded-xl font-orbitron text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-neon-cyan text-black shadow-neon-cyan'
                        : 'bg-space-950 text-slate-300 hover:text-white border border-slate-800'
                    }`}
                  >
                    {ph === 'ALL' ? 'ALL 20 WEEKS' : `PHASE 0${ph}`}
                  </button>
                );
              })}
            </div>
            <span className="text-xs font-mono text-slate-400">
              {filteredWeeks.length} OF 20 STORIES DISPLAYED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredWeeks.map((week) => {
              const isDoc = week.isDocumented;
              return (
                <div
                  key={week.weekNumber}
                  onClick={() => {
                    sound.playSelect();
                    setActiveWeek(week);
                    setSelectedDayTab('ALL');
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer backdrop-blur-xl flex flex-col justify-between min-h-[160px] group ${
                    isDoc
                      ? 'bg-space-900 border-neon-cyan shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:scale-103'
                      : 'bg-space-950/80 border-slate-800 hover:border-cyan-500/50 hover:bg-space-900'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-neon-cyan font-bold uppercase">
                      WEEK {String(week.weekNumber).padStart(2, '0')}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] bg-space-900 border border-slate-800 text-slate-400">
                      PHASE 0{week.phaseId}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-orbitron font-bold text-white text-sm group-hover:text-neon-cyan transition-colors">
                      {week.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-space line-clamp-2 mt-1">
                      {week.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-[11px] font-mono text-cyan-400 mt-2">
                    <span>{week.photos && week.photos.length > 0 ? `${week.photos.length} EVENT PHOTOS` : isDoc ? 'EXPLORE DOSSIER' : 'EXPLORE STORY'}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. FOUR CONNECTED PROGRAMME DISCIPLINES */}
      <section className="space-y-6 pt-4">
        <div className="space-y-1">
          <div className="text-xs font-mono text-neon-cyan uppercase tracking-widest">
            FOUR CORE PILLARS
          </div>
          <h3 className="text-xl sm:text-2xl font-orbitron font-bold text-white">
            Connected Innovation Disciplines
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {PROTOSEM_STRUCTURE.disciplines.map((d) => (
            <div
              key={d.id}
              className="p-6 rounded-3xl bg-space-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 space-y-2.5 shadow-xl"
            >
              <div className="flex items-center space-x-2.5 text-neon-cyan">
                <Cpu className="w-5 h-5" />
                <h4 className="font-orbitron font-bold text-base text-white">
                  {d.title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-space leading-relaxed">
                {d.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
