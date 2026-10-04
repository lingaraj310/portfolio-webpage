import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Orbit, 
  FileText, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ExternalLink,
  Code2,
  Cpu,
  GraduationCap,
  Volume2,
  VolumeX,
  Radio,
  Compass,
  Activity,
  Zap,
  Terminal
} from 'lucide-react';
import { LOCATIONS } from '../../data/portfolioData';
import { sound } from '../../utils/audioEffects';

const ROLES = [
  'Full-Stack Software Engineer',
  'PRICE ProtoSem Innovation Fellow',
  'AI / ML & Computer Vision Builder',
  'Digital Fabrication & Hardware Prototyper',
  'Future Tech Startup Founder'
];

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.94 0 1.7-.76 1.7-1.7 0-.93-.76-1.7-1.7-1.7-.93 0-1.7.77-1.7 1.7 0 .94.77 1.7 1.7 1.7m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
  </svg>
);

const GithubIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

export default function HeroOverlay({ onEnterUniverse, onOpenResume, onSelectSection }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [timeStr, setTimeStr] = useState('');
  
  // 3D Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0, spotlightX: 50, spotlightY: 50 });
  const cardRef = useRef(null);

  // Live Digital Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Role Rotator
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut listener for Enter and Space
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        sound.playSelect();
        sound.playWarp();
        onEnterUniverse();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEnterUniverse]);

  // Interactive 3D Perspective Tilt on Mouse Move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setTilt({
      x: normY * -8, // rotateX
      y: normX * 8,  // rotateY
      spotlightX: (x / rect.width) * 100,
      spotlightY: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, spotlightX: 50, spotlightY: 50 });
  };

  const toggleAudio = () => {
    const next = sound.toggleSound();
    setSoundOn(next);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center text-center p-3 sm:p-6 z-30 overflow-hidden select-none"
    >
      {/* Subtle Vignette Overlay allowing the real 3D Earth to shine through */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-space-950/80 via-transparent to-space-950/60" />
        <div className="absolute inset-0 scanline-grid opacity-15 pointer-events-none" />
      </div>

      {/* Top Left: Live Telemetry & Mission Clock */}
      <div className="absolute top-5 left-5 hidden md:flex items-center space-x-3 text-xs font-mono text-neon-cyan/90 z-20 pointer-events-auto">
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-space-950/80 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.15)] backdrop-blur-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-ping shadow-[0_0_8px_#00f0ff]" />
          <span className="tracking-widest uppercase font-bold text-white">ORBITAL SYSTEM // READY</span>
          <span className="text-slate-600">&bull;</span>
          <span className="text-cyan-300 font-bold">{timeStr || 'LIVE'}</span>
          <span className="text-slate-600">&bull;</span>
          <span className="text-slate-400">SECTOR-01 INDIA</span>
        </div>
      </div>

      {/* Top Right: Audio Wave Equalizer & Sound Toggle Switch */}
      <div className="absolute top-5 right-5 pointer-events-auto z-20">
        <button
          onClick={toggleAudio}
          onMouseEnter={() => sound.playHover()}
          className={`flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full border backdrop-blur-xl transition-all cursor-pointer shadow-lg ${
            soundOn
              ? 'bg-space-900/90 border-cyan-500/50 text-neon-cyan shadow-neon-cyan'
              : 'bg-space-900/60 border-slate-800 text-slate-500 hover:text-slate-300'
          }`}
          title={soundOn ? 'Audio Active (Press M to Mute)' : 'Audio Muted (Press M to Unmute)'}
        >
          {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span className="text-xs font-mono font-bold">{soundOn ? 'AUDIO ACTIVE' : 'MUTED'}</span>
          {soundOn && (
            <div className="flex items-end space-x-0.5 h-3">
              <span className="w-0.5 h-2 bg-neon-cyan animate-pulse" />
              <span className="w-0.5 h-3 bg-neon-cyan animate-pulse delay-75" />
              <span className="w-0.5 h-1.5 bg-neon-cyan animate-pulse delay-150" />
            </div>
          )}
        </button>
      </div>

      {/* Atmospheric Ambient Glows behind the card */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-sky-500/20 via-indigo-500/15 to-purple-500/10 blur-[130px] pointer-events-none -z-0" />

      {/* Centered Ultra-Aesthetic Holographic Glass Card */}
      <div 
        ref={cardRef}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out'
        }}
        className="relative z-10 w-full max-w-lg pointer-events-auto space-y-6 animate-fade-in flex flex-col items-center p-7 sm:p-10 rounded-[32px] bg-slate-950/75 backdrop-blur-3xl border border-cyan-400/30 shadow-[0_0_90px_rgba(0,240,255,0.22),inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden group text-center"
      >
        {/* Dynamic Cursor Spotlight Effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-50 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 360px at ${tilt.spotlightX}% ${tilt.spotlightY}%, rgba(0, 240, 255, 0.18), transparent 75%)`
          }}
        />

        {/* Futuristic Corner Tech Accents */}
        <div className="absolute top-3 left-3 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400/60 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-3 right-3 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400/60 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400/60 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400/60 rounded-br-lg pointer-events-none" />

        {/* Profile Avatar with Luminous Orbit Ring */}
        <div className="flex flex-col items-center space-y-2.5 relative z-10">
          <div className="relative group">
            {/* Outer Rotating Halo Glow */}
            <div className="absolute -inset-1.5 rounded-[26px] bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
            
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-[22px] p-1 bg-gradient-to-tr from-cyan-400 via-sky-500 to-indigo-600 shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-[18px] overflow-hidden bg-slate-950">
                <img
                  src="/avatar.jpg"
                  alt="Lingaraj"
                  className="w-full h-full object-cover object-[center_12%] transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            
            {/* Live Green Online Orb */}
            <span 
              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-[0_0_10px_#34d399] animate-pulse" 
              title="Open to Opportunities"
            />
          </div>

          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold tracking-wide shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>OPEN TO WORK &amp; INNOVATION</span>
          </div>
        </div>

        {/* Welcome Greeting & Hero Typography */}
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Welcome to my world</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-orbitron font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-300 drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]">
            LINGARAJ
          </h1>
          
          <div className="text-sm sm:text-base font-space font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300">
            PRICE ProtoSem Fellow &bull; Full-Stack &amp; AI Builder
          </div>

          <p className="text-xs sm:text-sm text-slate-300 font-space max-w-md mx-auto leading-relaxed font-normal pt-1">
            Engineering scalable web applications, assistive AI vision systems, and industrial-ready physical prototypes.
          </p>
        </div>

        {/* Primary Interactive Enter Button */}
        <div className="pt-2 w-full max-w-xs relative z-10 space-y-3">
          <button
            onClick={() => {
              sound.playSelect();
              sound.playWarp();
              onEnterUniverse();
            }}
            onMouseEnter={() => sound.playHover()}
            className="group relative w-full py-4 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 border border-cyan-300/60 rounded-2xl text-white font-orbitron font-extrabold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 shadow-[0_0_35px_rgba(0,240,255,0.4)] hover:shadow-[0_0_55px_rgba(0,240,255,0.7)] flex items-center justify-center space-x-3 cursor-pointer overflow-hidden hover:scale-104 active:scale-98"
          >
            {/* Animated Shimmer Stripe */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
            
            <span>Enter 3D Universe</span>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>

          {/* Quick Experience Pills */}
          <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1"><Orbit className="w-3 h-3 text-cyan-400" /> 3D Globe</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-amber-400" /> CAD &amp; Hardware</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1"><Compass className="w-3 h-3 text-indigo-400" /> 20-Wk Journey</span>
          </div>
        </div>

      </div>
    </div>
  );
}
