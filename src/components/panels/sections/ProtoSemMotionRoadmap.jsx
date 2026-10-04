import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Flame, 
  ArrowRight, 
  Camera, 
  Layers, 
  Compass, 
  MapPin,
  Eye,
  Activity,
  Zap,
  Target,
  ExternalLink,
  Check
} from 'lucide-react';
import { sound } from '../../../utils/audioEffects';

const PHASE_THEMES = {
  1: { 
    name: 'Foundation & Discovery', 
    text: 'text-emerald-400', 
    bg: 'bg-emerald-50', 
    border: 'border-emerald-200', 
    glow: 'rgba(16, 185, 129, 0.3)', 
    hex: '#10B981',
    gradient: 'from-emerald-500 to-teal-600'
  },
  2: { 
    name: 'Digital Fabrication', 
    text: 'text-sky-400', 
    bg: 'bg-sky-50', 
    border: 'border-sky-200', 
    glow: 'rgba(56, 189, 248, 0.3)', 
    hex: '#38BDF8',
    gradient: 'from-sky-500 to-blue-600'
  },
  3: { 
    name: 'Embedded IoT & Systems', 
    text: 'text-purple-400', 
    bg: 'bg-purple-50', 
    border: 'border-purple-200', 
    glow: 'rgba(168, 85, 247, 0.3)', 
    hex: '#A855F7',
    gradient: 'from-purple-500 to-indigo-600'
  },
  4: { 
    name: 'Venture & Demo Day', 
    text: 'text-amber-400', 
    bg: 'bg-amber-50', 
    border: 'border-amber-200', 
    glow: 'rgba(245, 158, 11, 0.3)', 
    hex: '#F59E0B',
    gradient: 'from-amber-500 to-orange-600'
  }
};

export default function ProtoSemMotionRoadmap({
  weeks = [],
  currentWeekIndex = 5, // Default Week 6 (index 5)
  onSelectWeekIndex,
  onOpenWeekDossier
}) {
  const [activeIdx, setActiveIdx] = useState(currentWeekIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const autoPlayTimerRef = useRef(null);

  // Sync external index changes
  useEffect(() => {
    setActiveIdx(currentWeekIndex);
  }, [currentWeekIndex]);

  // Auto-drive traveler along the roadmap
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.round(2400 / playbackSpeed);
      autoPlayTimerRef.current = setInterval(() => {
        setActiveIdx((prev) => {
          const next = (prev + 1) % weeks.length;
          sound.playHover();
          if (onSelectWeekIndex) onSelectWeekIndex(next);
          return next;
        });
      }, intervalMs);
    } else {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlaying, playbackSpeed, weeks.length, onSelectWeekIndex]);

  const handleStep = (direction) => {
    sound.playSelect();
    const nextIdx = (activeIdx + direction + weeks.length) % weeks.length;
    setActiveIdx(nextIdx);
    if (onSelectWeekIndex) onSelectWeekIndex(nextIdx);
  };

  const handleNodeClick = (idx) => {
    sound.playSelect();
    setActiveIdx(idx);
    if (onSelectWeekIndex) onSelectWeekIndex(idx);
  };

  const currentWeekObj = weeks[activeIdx] || weeks[0];
  const currentPhaseId = currentWeekObj.phaseId || Math.ceil(currentWeekObj.weekNumber / 5);
  const currentTheme = PHASE_THEMES[currentPhaseId] || PHASE_THEMES[2];

  // SVG Geometry Calculation
  const totalNodes = 20;
  const svgWidth = 900;
  const startY = 100;
  const rowHeight = 140;
  const svgHeight = startY + (totalNodes - 1) * rowHeight + 120;

  // Generate alternating S-curve positions
  const nodePositions = Array.from({ length: totalNodes }, (_, i) => {
    const y = startY + i * rowHeight;
    const isEven = i % 2 === 0;
    const x = isEven ? 260 : 640;
    const phaseId = Math.ceil((i + 1) / 5);

    return { x, y, weekNumber: i + 1, index: i, phaseId, isLeft: isEven };
  });

  // Construct smooth SVG cubic Bezier curve path connecting all nodes
  const pathData = nodePositions.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = nodePositions[i - 1];
    const cpY1 = prev.y + (pt.y - prev.y) * 0.5;
    const cpY2 = prev.y + (pt.y - prev.y) * 0.5;
    return `${acc} C ${prev.x} ${cpY1}, ${pt.x} ${cpY2}, ${pt.x} ${pt.y}`;
  }, '');

  const activeNodePos = nodePositions[activeIdx] || nodePositions[0];

  return (
    <div className="protosem-motion-roadmap select-none font-sans space-y-6">
      
      {/* ========================================================================= */}
      {/* 1. TOP MOTION CONTROLLER BAR */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Indicator */}
        <div className="flex items-center space-x-3">
          <div className={`p-2.5 rounded-xl ${currentTheme.bg} ${currentTheme.text} border ${currentTheme.border} shadow-sm`}>
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              <span className={`w-2 h-2 rounded-full ${currentTheme.text} animate-ping`} />
              <span>S-CURVE INTERACTIVE TRAIL &bull; 20 MILESTONES</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Active Selection: Week {String(currentWeekObj.weekNumber).padStart(2, '0')} &bull; {currentWeekObj.title}
            </h4>
          </div>
        </div>

        {/* Right: Playback Controls */}
        <div className="flex items-center space-x-2">
          {/* Prev Step */}
          <button
            onClick={() => handleStep(-1)}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer border border-slate-200 shadow-sm"
            title="Previous Milestone"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Auto-Travel Play/Pause */}
          <button
            onClick={() => {
              sound.playSelect();
              setIsPlaying(!isPlaying);
            }}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all shadow-lg ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-amber-500/25'
                : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-900 shadow-sky-500/25'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'PAUSE TRAIL' : 'AUTO-TRAVEL'}</span>
          </button>

          {/* Next Step */}
          <button
            onClick={() => handleStep(1)}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer border border-slate-200 shadow-sm"
            title="Next Milestone"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Speed Toggle */}
          <button
            onClick={() => {
              sound.playSelect();
              setPlaybackSpeed(prev => prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1);
            }}
            className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-sky-700 text-xs font-mono font-bold transition-colors cursor-pointer border border-slate-200"
            title="Playback Speed"
          >
            {playbackSpeed}x
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ACTIVE MILESTONE SPOTLIGHT CARD */}
      {/* ========================================================================= */}
      <div className={`p-6 sm:p-8 rounded-2xl bg-white border ${currentTheme.border} backdrop-blur-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all relative overflow-hidden`}>
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ backgroundColor: currentTheme.hex }}
        />

        <div className="space-y-2.5 max-w-3xl relative z-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1 rounded-full font-bold bg-gradient-to-r from-sky-500 to-blue-600 text-slate-900 shadow-sm">
              WEEK {String(currentWeekObj.weekNumber).padStart(2, '0')}
            </span>
            <span className={`px-3 py-1 rounded-full font-semibold ${currentTheme.bg} ${currentTheme.text} border ${currentTheme.border}`}>
              PHASE 0{currentPhaseId}: {currentTheme.name}
            </span>
            {currentWeekObj.tag && (
              <span className="px-3 py-1 rounded-full font-semibold bg-white/10 text-slate-600 border border-white/15">
                {currentWeekObj.tag}
              </span>
            )}
            {currentWeekObj.weekNumber === 6 && (
              <span className="px-3 py-1 rounded-full font-semibold bg-amber-100 text-amber-600 border border-amber-200 flex items-center gap-1.5 animate-pulse">
                <Flame className="w-3.5 h-3.5 text-amber-700" />
                <span>Active Live Case Study</span>
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {currentWeekObj.title}
          </h3>

          <div className="text-xs sm:text-sm font-mono text-sky-600">
            {currentWeekObj.topic}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light pt-1">
            {currentWeekObj.oneLineSummary || currentWeekObj.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="shrink-0 self-stretch md:self-auto relative z-10">
          {currentWeekObj.weekNumber === 6 ? (
            <button
              onClick={() => {
                sound.playSelect();
                if (onOpenWeekDossier) onOpenWeekDossier(currentWeekObj);
              }}
              className="w-full md:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-slate-900 text-xs font-mono font-bold flex items-center justify-center space-x-2 transition-all shadow-sm shadow-sky-500/25 hover:-translate-y-0.5 cursor-pointer border border-sky-400/40"
            >
              <span>OPEN WEEK 06 CASE STUDY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : currentWeekObj.isDocumented ? (
            <button
              onClick={() => {
                sound.playSelect();
                if (onOpenWeekDossier) onOpenWeekDossier(currentWeekObj);
              }}
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-mono font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer border border-slate-200 shadow-md"
            >
              <span>VIEW CHAPTER DOSSIER</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-xs font-mono text-center">
              Curriculum Scheduled
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SERPENTINE MOTION SVG CANVAS (Winding W01 -> W20 Path) */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm relative overflow-hidden flex justify-center">
        
        {/* Background Radial Lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-50 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative w-full max-w-[900px]">
          <svg 
            viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
            className="w-full h-auto overflow-visible"
          >
            <defs>
              {/* Path Multi-Phase Neon Gradient */}
              <linearGradient id="serpentineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="25%" stopColor="#06B6D4" />
                <stop offset="50%" stopColor="#38BDF8" />
                <stop offset="75%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>

              {/* Glow Filter */}
              <filter id="neonBlur" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Rail Track */}
            <path
              d={pathData}
              fill="none"
              stroke="#0B1120"
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={pathData}
              fill="none"
              stroke="#1E293B"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Glowing Active Multi-Color Path */}
            <path
              d={pathData}
              fill="none"
              stroke="url(#serpentineGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#neonBlur)"
              className="opacity-90"
            />

            {/* Flowing Dashed Pulse Line */}
            <path
              d={pathData}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeDasharray="10, 18"
              strokeLinecap="round"
              className="opacity-40 animate-pulse"
            />

            {/* Phase Section Divider Headers along the path */}
            {[
              { y: 35, title: "PHASE 01: FOUNDATION & DISCOVERY (W01–W05)", color: "#10B981" },
              { y: startY + 5 * rowHeight - 25, title: "PHASE 02: DIGITAL FABRICATION (W06–W10)", color: "#38BDF8" },
              { y: startY + 10 * rowHeight - 25, title: "PHASE 03: EMBEDDED IoT & SYSTEMS (W11–W15)", color: "#A855F7" },
              { y: startY + 15 * rowHeight - 25, title: "PHASE 04: VENTURE & DEMO DAY (W16–W20)", color: "#F59E0B" }
            ].map((ph, pi) => (
              <g key={pi} transform={`translate(${svgWidth / 2}, ${ph.y})`}>
                <rect
                  x="-230"
                  y="-16"
                  width="460"
                  height="32"
                  rx="16"
                  fill="#030712"
                  stroke={ph.color}
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                />
                <text
                  x="0"
                  y="5"
                  textAnchor="middle"
                  fill={ph.color}
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="monospace"
                  letterSpacing="1"
                >
                  {ph.title}
                </text>
              </g>
            ))}

            {/* Render 20 Interactive Milestone Nodes & Cards */}
            {nodePositions.map((node, idx) => {
              const isSelected = activeIdx === idx;
              const isWeek6 = idx === 5;
              const isPastOrCurrent = idx <= 5;
              const weekData = weeks[idx] || {};
              const phaseTheme = PHASE_THEMES[node.phaseId] || PHASE_THEMES[1];

              // Card Placement:
              // isLeft (x=260) -> card goes right (x=310)
              // isRight (x=640) -> card goes left (x=330)
              const cardX = node.isLeft ? node.x + 45 : node.x - 315;
              const cardY = node.y - 32;

              return (
                <g 
                  key={node.weekNumber} 
                  className="cursor-pointer group"
                  onClick={() => handleNodeClick(idx)}
                >
                  {/* Selected Ripple Ring */}
                  {isSelected && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="36"
                      fill="none"
                      stroke={phaseTheme.hex}
                      strokeWidth="2.5"
                      className="animate-ping opacity-60"
                    />
                  )}

                  {/* Connecting arm line between node and card */}
                  <line
                    x1={node.x}
                    y1={node.y}
                    x2={node.isLeft ? node.x + 45 : node.x - 45}
                    y2={node.y}
                    stroke={isSelected ? phaseTheme.hex : "rgba(255,255,255,0.2)"}
                    strokeWidth="1.5"
                    strokeDasharray={isSelected ? undefined : "3,3"}
                  />

                  {/* Node Outer Ring */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? "24" : "18"}
                    fill={isSelected ? phaseTheme.hex : isPastOrCurrent ? "#090D16" : "#0F172A"}
                    stroke={isSelected ? "#FFFFFF" : isWeek6 ? "#38BDF8" : isPastOrCurrent ? phaseTheme.hex : "#334155"}
                    strokeWidth={isSelected ? "3.5" : isWeek6 ? "3" : "2"}
                    filter={isSelected || isWeek6 ? "url(#neonBlur)" : undefined}
                    className="transition-all duration-300 group-hover:scale-115"
                  />

                  {/* Node Inner Core Dot */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="6"
                    fill={isSelected ? "#000000" : isPastOrCurrent ? phaseTheme.hex : "#475569"}
                  />

                  {/* Week Number in node */}
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    fill={isSelected ? "#000000" : isPastOrCurrent ? "#FFFFFF" : "#94A3B8"}
                    fontSize="9.5"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {String(node.weekNumber).padStart(2, '0')}
                  </text>

                  {/* Milestone Card Tag */}
                  <g 
                    transform={`translate(${cardX}, ${cardY})`}
                    className={`transition-all duration-300 ${
                      isSelected ? 'opacity-100 scale-102' : 'opacity-85 group-hover:opacity-100'
                    }`}
                  >
                    {/* Card Body */}
                    <rect
                      x="0"
                      y="0"
                      width="270"
                      height="64"
                      rx="14"
                      fill={isSelected ? "#0F172A" : "#0A0F1D"}
                      stroke={isSelected ? phaseTheme.hex : isWeek6 ? "#38BDF8" : "rgba(255,255,255,0.12)"}
                      strokeWidth={isSelected ? "2" : "1"}
                      className="shadow-sm"
                    />

                    {/* Top Row: Week Badge & Tag */}
                    <text
                      x="14"
                      y="20"
                      fill={phaseTheme.hex}
                      fontSize="9.5"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      WEEK {String(node.weekNumber).padStart(2, '0')} &bull; {weekData.tag || `PHASE 0${node.phaseId}`}
                    </text>

                    {/* Verified/Live indicator pill */}
                    {isWeek6 && (
                      <text
                        x="256"
                        y="20"
                        textAnchor="end"
                        fill="#38BDF8"
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        ★ LIVE DOSSIER
                      </text>
                    )}

                    {/* Main Title */}
                    <text
                      x="14"
                      y="38"
                      fill="#FFFFFF"
                      fontSize="11"
                      fontWeight="bold"
                      fontFamily="'Space Grotesk', sans-serif"
                    >
                      {weekData.title ? (weekData.title.length > 30 ? weekData.title.slice(0, 28) + '...' : weekData.title) : `Milestone ${node.weekNumber}`}
                    </text>

                    {/* Subtitle / Topic */}
                    <text
                      x="14"
                      y="53"
                      fill="#94A3B8"
                      fontSize="9"
                      fontFamily="sans-serif"
                      fontWeight="normal"
                    >
                      {weekData.topic ? (weekData.topic.length > 38 ? weekData.topic.slice(0, 36) + '...' : weekData.topic) : 'Curriculum topic in progress'}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Glowing Traveling Beacon Orb */}
            <g 
              transform={`translate(${activeNodePos.x}, ${activeNodePos.y})`}
              className="transition-transform duration-700 ease-out pointer-events-none"
            >
              <circle
                cx="0"
                cy="0"
                r="26"
                fill={currentTheme.hex}
                className="opacity-40 animate-ping"
              />
              <circle
                cx="0"
                cy="0"
                r="12"
                fill={currentTheme.hex}
                filter="url(#neonBlur)"
              />
              <circle
                cx="0"
                cy="0"
                r="4.5"
                fill="#FFFFFF"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
