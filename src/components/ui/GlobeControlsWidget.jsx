import React from 'react';
import { Plus, Minus, Play, Pause, RotateCcw, Globe, Compass, Plane } from 'lucide-react';
import { sound } from '../../utils/audioEffects';

export default function GlobeControlsWidget({
  onZoomIn,
  onZoomOut,
  onReturnToBase,
  isAutoRotating,
  onToggleAutoRotate,
  flightsEnabled = true,
  onToggleFlights,
  currentStage
}) {
  if (currentStage !== 'orbit') return null;

  return (
    <div className="fixed bottom-6 right-6 z-30 pointer-events-auto select-none flex items-center space-x-3">
      
      {/* Guidance Pill (Desktop) */}
      <div className="hidden xl:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-space-950/80 border border-slate-800 text-[10px] font-mono text-slate-400 backdrop-blur-xl">
        <span className="text-neon-cyan font-bold">&bull;</span>
        <span>Drag to rotate &bull; Scroll to zoom</span>
      </div>

      {/* Mini Controls Dock */}
      <div className="flex items-center space-x-1.5 p-1.5 rounded-2xl bg-space-950/90 border border-cyan-500/40 shadow-[0_0_25px_rgba(0,240,255,0.25)] backdrop-blur-2xl">
        
        {/* Flights ON/OFF Toggle */}
        {onToggleFlights && (
          <button
            onClick={() => {
              sound.playSelect();
              onToggleFlights();
            }}
            onMouseEnter={() => sound.playHover()}
            className={`flex items-center space-x-1 px-2 py-1.5 rounded-xl border transition-all cursor-pointer font-mono text-[9px] font-bold ${
              flightsEnabled
                ? 'bg-cyan-500/20 border-neon-cyan text-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                : 'bg-space-900/80 hover:bg-space-850 text-slate-400 border-slate-700/80 hover:border-cyan-400'
            }`}
            title={flightsEnabled ? 'Turn Flights OFF' : 'Turn Flights ON'}
          >
            <Plane className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{flightsEnabled ? 'FLIGHTS ON' : 'FLIGHTS OFF'}</span>
          </button>
        )}

        {/* Return to India Base */}
        <button
          onClick={() => {
            sound.playSelect();
            onReturnToBase();
          }}
          onMouseEnter={() => sound.playHover()}
          className="p-2 rounded-xl bg-space-900/80 hover:bg-space-850 text-slate-300 hover:text-white border border-slate-700/80 hover:border-cyan-400 transition-all cursor-pointer group"
          title="Return Camera to India Home Base"
        >
          <RotateCcw className="w-4 h-4 text-neon-cyan group-hover:-rotate-45 transition-transform" />
        </button>

        {/* Auto-Rotate Toggle */}
        {onToggleAutoRotate && (
          <button
            onClick={() => {
              sound.playSelect();
              onToggleAutoRotate();
            }}
            onMouseEnter={() => sound.playHover()}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isAutoRotating
                ? 'bg-cyan-500/20 border-neon-cyan text-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                : 'bg-space-900/80 hover:bg-space-850 text-slate-400 border-slate-700/80 hover:border-cyan-400'
            }`}
            title={isAutoRotating ? 'Pause Planetary Auto-Rotation' : 'Resume Planetary Auto-Rotation'}
          >
            {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        )}

        <span className="w-px h-4 bg-slate-700 mx-0.5" />

        {/* Zoom In */}
        <button
          onClick={() => {
            sound.playSelect();
            if (onZoomIn) onZoomIn();
          }}
          onMouseEnter={() => sound.playHover()}
          className="p-2 rounded-xl bg-space-900/80 hover:bg-space-850 text-slate-300 hover:text-white border border-slate-700/80 hover:border-cyan-400 transition-all cursor-pointer"
          title="Zoom In (or scroll up)"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={() => {
            sound.playSelect();
            if (onZoomOut) onZoomOut();
          }}
          onMouseEnter={() => sound.playHover()}
          className="p-2 rounded-xl bg-space-900/80 hover:bg-space-850 text-slate-300 hover:text-white border border-slate-700/80 hover:border-cyan-400 transition-all cursor-pointer"
          title="Zoom Out (or scroll down)"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
