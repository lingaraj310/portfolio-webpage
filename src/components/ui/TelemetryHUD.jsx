import React, { useState } from 'react';
import { Volume2, VolumeX, ArrowLeft, Globe2, Compass, MapPin, FileText, Share2, Check, Radio } from 'lucide-react';
import { sound } from '../../utils/audioEffects';

export default function TelemetryHUD({
  activeLocation,
  currentStage,
  onResetToHero,
  onReturnToHomeBase,
  telemetryData,
  onOpenProfile,
  onOpenResume
}) {
  const [soundOn, setSoundOn] = useState(true);
  const [copied, setCopied] = useState(false);

  const toggleSound = () => {
    const nextState = sound.toggleSound();
    setSoundOn(nextState);
  };

  const handleCopyLink = () => {
    sound.playSelect();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Keep cover page clean
  if (currentStage === 'hero') {
    return (
      <div className="absolute top-6 right-6 pointer-events-auto z-40">
        <button
          onClick={toggleSound}
          onMouseEnter={() => sound.playHover()}
          className={`px-3.5 py-2 rounded-full border backdrop-blur-xl transition-all cursor-pointer shadow-lg flex items-center space-x-2 ${
            soundOn
              ? 'bg-space-900/90 border-cyan-500/50 text-neon-cyan shadow-neon-cyan'
              : 'bg-space-900/60 border-slate-800 text-slate-500 hover:text-slate-300'
          }`}
          title={soundOn ? 'Audio Active (Press M to Mute)' : 'Audio Muted (Press M to Unmute)'}
        >
          {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          {soundOn && (
            <div className="flex items-end space-x-0.5 h-3">
              <span className="w-0.5 h-2 bg-neon-cyan animate-pulse" />
              <span className="w-0.5 h-3 bg-neon-cyan animate-pulse delay-75" />
              <span className="w-0.5 h-1.5 bg-neon-cyan animate-pulse delay-150" />
            </div>
          )}
        </button>
      </div>
    );
  }

  const isAtHome = activeLocation?.id === 'about';

  return (
    <header className="absolute top-4 left-4 right-4 sm:top-5 sm:left-6 sm:right-6 pointer-events-none z-30 flex items-center justify-between select-none">
      
      {/* Left: Return to Cover / Home Base */}
      <div className="pointer-events-auto flex items-center space-x-2">
        <button
          onClick={() => {
            sound.playSelect();
            onResetToHero();
          }}
          onMouseEnter={() => sound.playHover()}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-space-950/85 hover:bg-space-900 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-white font-mono text-xs cursor-pointer transition-all backdrop-blur-xl group"
          title="Return to Cover Page"
        >
          <Globe2 className="w-3.5 h-3.5 text-neon-cyan group-hover:scale-110 transition-transform" />
          <span className="font-bold">Cover</span>
        </button>

        {!isAtHome && (
          <button
            onClick={() => {
              sound.playSelect();
              onReturnToHomeBase();
            }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-space-950/90 hover:bg-space-900 border border-cyan-500/50 hover:border-neon-cyan text-slate-200 hover:text-white font-mono text-xs cursor-pointer transition-all shadow-neon-cyan backdrop-blur-xl"
            title="Snap Camera to India Base"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-neon-cyan" />
            <span className="font-bold">India Base</span>
          </button>
        )}
      </div>

      {/* Center: Dynamic Sub-Orbital Telemetry HUD Banner */}
      <div className="hidden lg:flex items-center space-x-4 px-4 py-1.5 rounded-full bg-space-950/90 border border-cyan-500/40 shadow-[0_0_20px_rgba(0,240,255,0.2)] backdrop-blur-2xl text-[11px] font-mono pointer-events-auto">
        {currentStage === 'traveling' ? (
          <div className="flex items-center space-x-2 text-neon-cyan font-bold animate-pulse">
            <span className="text-sm">✈️</span>
            <span>SUB-ORBITAL FLIGHT EN ROUTE:</span>
            <span className="text-white">INDIA [ABOUT]</span>
            <span className="text-cyan-400">➔</span>
            <span className="text-cyan-300 uppercase">{activeLocation?.title} ({activeLocation?.city})</span>
            <span className="text-emerald-400 font-mono text-[10px] bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">MACH 9.2</span>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-1.5 text-neon-cyan font-bold">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>GEO-ORBIT // 7.6 km/s</span>
            </div>
            <span className="text-slate-700">&bull;</span>
            <div className="text-slate-300">
              TARGET: <strong className="text-white font-bold uppercase">{activeLocation?.city || 'India'}</strong>
              <span className="text-cyan-400 opacity-90 ml-1">({activeLocation?.sectorCode})</span>
            </div>
            {telemetryData && (
              <>
                <span className="text-slate-700">&bull;</span>
                <div className="text-slate-400">
                  LAT: <span className="text-white font-bold">{telemetryData.lat}&deg;</span> LNG: <span className="text-white font-bold">{telemetryData.lng}&deg;</span>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Right: Action Shortcuts + Audio Toggle */}
      <div className="pointer-events-auto flex items-center space-x-2 sm:space-x-2.5">
        
        {/* Quick CV Button */}
        {onOpenResume && (
          <button
            onClick={() => {
              sound.playSelect();
              onOpenResume();
            }}
            onMouseEnter={() => sound.playHover()}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-space-950/85 hover:bg-space-900 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-white text-xs font-mono transition-all backdrop-blur-xl cursor-pointer"
            title="Open Verified Resume Dossier (Section 08)"
          >
            <FileText className="w-3.5 h-3.5 text-neon-cyan" />
            <span className="font-bold">CV Dossier</span>
          </button>
        )}

        {/* Share Button */}
        <button
          onClick={handleCopyLink}
          onMouseEnter={() => sound.playHover()}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-space-950/85 hover:bg-space-900 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-white text-xs font-mono transition-all backdrop-blur-xl cursor-pointer"
          title="Copy Link to Portfolio"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Share</span>
            </>
          )}
        </button>

        {/* Audio Waveform Equalizer Toggle */}
        <button
          onClick={toggleSound}
          onMouseEnter={() => sound.playHover()}
          className={`px-3 py-1.5 rounded-full border backdrop-blur-xl transition-all cursor-pointer shadow-lg flex items-center space-x-2 ${
            soundOn
              ? 'bg-space-900/90 border-cyan-500/50 text-neon-cyan shadow-neon-cyan'
              : 'bg-space-900/60 border-slate-800 text-slate-500 hover:text-slate-300'
          }`}
          title={soundOn ? 'Audio Active (Press M to Mute)' : 'Audio Muted (Press M to Unmute)'}
        >
          {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          {soundOn && (
            <div className="flex items-end space-x-0.5 h-3">
              <span className="w-0.5 h-2 bg-neon-cyan animate-pulse" />
              <span className="w-0.5 h-3 bg-neon-cyan animate-pulse delay-75" />
              <span className="w-0.5 h-1.5 bg-neon-cyan animate-pulse delay-150" />
            </div>
          )}
        </button>
      </div>

    </header>
  );
}
