import React, { useState } from 'react';
import { Volume2, VolumeX, ArrowLeft, Globe2, Home, Radio, Compass, Command } from 'lucide-react';
import { sound } from '../../utils/audioEffects';

export default function TelemetryHUD({
  activeLocation,
  currentStage,
  onResetToHero,
  onReturnToHomeBase,
  telemetryData
}) {
  const [soundOn, setSoundOn] = useState(true);

  const toggleSound = () => {
    const nextState = sound.toggleSound();
    setSoundOn(nextState);
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
    <div className="absolute top-6 left-6 right-6 pointer-events-none z-30 flex items-center justify-between select-none">
      {/* Left Action: Return to Cover / Return to India */}
      <div className="pointer-events-auto flex items-center space-x-3">
        {!isAtHome && currentStage !== 'hero' ? (
          <button
            onClick={() => {
              sound.playSelect();
              onReturnToHomeBase();
            }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-space-950/95 hover:bg-space-900 border border-cyan-500/50 hover:border-neon-cyan text-slate-200 hover:text-white font-mono text-xs cursor-pointer transition-all shadow-neon-cyan backdrop-blur-xl group hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 text-neon-cyan group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold">Return to India</span>
          </button>
        ) : (
          <button
            onClick={() => {
              sound.playSelect();
              onResetToHero();
            }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-space-950/85 hover:bg-space-900 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-slate-200 font-mono text-xs cursor-pointer transition-all backdrop-blur-xl"
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Cover Page</span>
          </button>
        )}

        {/* Live Real-time Telemetry Coordinates */}
        {telemetryData && (
          <div className="hidden lg:flex items-center space-x-3 px-4 py-1.5 rounded-full bg-space-950/85 border border-slate-800 text-[11px] font-mono text-slate-400 backdrop-blur-xl">
            <span className="flex items-center space-x-1 text-neon-cyan">
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              <span className="font-bold">TELEMETRY</span>
            </span>
            <span>LAT: <strong className="text-white">{telemetryData.lat}&deg;</strong></span>
            <span>LNG: <strong className="text-white">{telemetryData.lng}&deg;</strong></span>
          </div>
        )}
      </div>

      {/* Right Action: Audio Waveform Equalizer & Power-User Shortcuts */}
      <div className="pointer-events-auto flex items-center space-x-3">
        {/* Keyboard Shortcuts Helper Pill */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-space-950/80 border border-slate-800 text-[10px] font-mono text-slate-400 backdrop-blur-xl">
          <span className="px-1.5 py-0.5 rounded bg-space-900 border border-slate-700 text-slate-300 font-bold">1–9</span>
          <span>Jump</span>
          <span className="text-slate-600">&bull;</span>
          <span className="px-1.5 py-0.5 rounded bg-space-900 border border-slate-700 text-slate-300 font-bold">ESC</span>
          <span>Exit</span>
        </div>

        {/* Audio Waveform Equalizer Toggle */}
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
    </div>
  );
}
