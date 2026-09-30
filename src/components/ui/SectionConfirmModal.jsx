import React from 'react';
import { ArrowRight, X, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import IconHelper from './IconHelper';
import CyanMapPin from './CyanMapPin';
import { sound } from '../../utils/audioEffects';

export default function SectionConfirmModal({
  location,
  isOpen,
  onConfirm,
  onCancel
}) {
  if (!isOpen || !location) return null;

  const isProtoSem = location.id === 'protosem';

  const modalTitle = isProtoSem
    ? "ENTER PROTOSEM?"
    : `Would you like to enter ${location.title}?`;

  const modalSubtitle = isProtoSem
    ? "A 20-week innovation journey"
    : location.tagline;

  const enterButtonText = isProtoSem
    ? "ENTER JOURNEY"
    : `Enter ${location.title}`;

  const cancelButtonText = isProtoSem
    ? "GO BACK"
    : "Cancel";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-950/85 backdrop-blur-2xl animate-fade-in select-none">
      {/* Confirmation Card with High-Tech Glassmorphism */}
      <div
        className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-space-900/98 border-2 shadow-2xl space-y-6 transform transition-all duration-300 scale-100 sci-fi-corners cyber-grid-bg border-neon-cyan"
        style={{
          boxShadow: '0 0 50px rgba(0, 240, 255, 0.35), 0 25px 60px rgba(0,0,0,0.95)'
        }}
      >
        {/* Top Cyan Accent Stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-blue-600 via-neon-cyan to-sky-400 shadow-[0_0_15px_#00f0ff]" />

        {/* Header with Sector Tag & Cyan Map Pin Location */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-neon-cyan">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
            <span className="font-bold tracking-widest">{location.sectorCode}</span>
          </div>
          <div className="flex items-center space-x-1.5 font-mono text-xs text-white">
            <CyanMapPin className="w-4 h-4 shrink-0 drop-shadow-md" />
            <span className="font-bold">{location.city}, {location.country}</span>
          </div>
        </div>

        {/* Section Icon & Question Callout */}
        <div className="flex items-start space-x-4">
          <div className="p-3.5 rounded-2xl bg-space-950 border border-cyan-500/50 shrink-0 shadow-[0_0_20px_rgba(0,240,255,0.3)] text-neon-cyan">
            <IconHelper name={locName(location.iconName)} className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono text-neon-cyan uppercase tracking-wider block font-bold">
              {isProtoSem ? "INNOVATION WORLD ACCESS" : "TECH SECTOR ACCESS VERIFICATION"}
            </span>
            <h2 className="text-xl sm:text-2xl font-orbitron font-extrabold text-white tracking-wide">
              {modalTitle}
            </h2>
          </div>
        </div>

        {/* Section Overview / Subtitle */}
        <div className="p-4 rounded-2xl bg-space-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 font-space leading-relaxed space-y-1.5">
          <div className="font-semibold text-white flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-neon-cyan" />
            <span>{modalSubtitle}</span>
          </div>
          <p className="text-slate-400 text-xs">
            {location.description}
          </p>
        </div>

        {/* Two Options: Enter Journey OR Go Back */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          {/* Enter Section / Journey Button */}
          <button
            onClick={() => {
              sound.playSelect();
              sound.playWarp();
              onConfirm(location);
            }}
            onMouseEnter={() => sound.playHover()}
            className="w-full sm:flex-1 py-3.5 px-5 rounded-2xl font-orbitron font-extrabold text-xs sm:text-sm uppercase tracking-wider text-black flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer hover:scale-102 hover:brightness-110 shadow-lg bg-neon-cyan hover:bg-white"
            style={{
              boxShadow: '0 0 25px rgba(0, 240, 255, 0.7)'
            }}
          >
            <span>{enterButtonText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Go Back / Cancel Button */}
          <button
            onClick={() => {
              sound.playSelect();
              onCancel();
            }}
            onMouseEnter={() => sound.playHover()}
            className="w-full sm:w-auto py-3.5 px-5 rounded-2xl font-orbitron font-bold text-xs uppercase tracking-wider text-slate-300 hover:text-white bg-space-950/80 hover:bg-space-800 border border-slate-700 hover:border-slate-500 transition-all cursor-pointer flex items-center justify-center space-x-1.5"
          >
            <X className="w-4 h-4" />
            <span>{cancelButtonText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function locName(name) {
  return name || 'MapPin';
}
