import React from 'react';
import { 
  Download, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Sparkles, 
  Code2, 
  Trophy, 
  Rocket, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Compass,
  Cpu,
  Bot,
  Zap,
  Globe
} from 'lucide-react';
import { PROFILE_INFO } from '../../../data/portfolioData';
import { sound } from '../../../utils/audioEffects';

export default function AboutMePanel({ onClose }) {
  const stats = [
    { label: 'Academic Standing', value: '3rd Year B.E.', sub: 'Computer Science @ KCT', icon: GraduationCap, color: 'sky' },
    { label: 'Cumulative GPA', value: '8.0 / 10', sub: 'Strong CS Fundamentals', icon: Sparkles, color: 'amber' },
    { label: 'Prototypes Built', value: '6+ Systems', sub: 'AI, IoT & Web Apps', icon: Code2, color: 'emerald' },
    { label: 'Hackathons & Sprints', value: '9+ Arenas', sub: 'SIH 2025, VERTX 2.0', icon: Trophy, color: 'purple' }
  ];

  const pillars = [
    {
      title: '⚡ Software & AI Architecture',
      desc: 'Developing Computer Vision pipelines, MediaPipe gesture tracking, and adaptive neural algorithms.',
      icon: Lightbulb,
      tag: 'AI & Vision'
    },
    {
      title: '📟 Embedded & IoT Prototyping',
      desc: 'Integrating ESP32 microcontrollers, hardware sensors, and live telemetry web interfaces.',
      icon: Cpu,
      tag: 'Hardware IoT'
    },
    {
      title: '🏭 Industrial Digital Fabrication',
      desc: 'Hands-on CAD design, laser cutting CAM, FDM 3D printing, and Design for Additive Manufacturing.',
      icon: Rocket,
      tag: 'Digital Fab'
    },
    {
      title: '🌱 Tech Venture Incubation',
      desc: 'Trained at FORGE Innovation & Ventures on customer validation, market feasibility, and tech enterprise.',
      icon: CheckCircle2,
      tag: 'Venture Build'
    }
  ];

  return (
    <div className="w-full space-y-10 animate-fade-in font-sans text-slate-800">
      {/* 1. Two-Column Luxury Editorial Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left: Holographic Portrait Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group w-full max-w-sm">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/30 via-indigo-500/20 to-emerald-500/30 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500" />
            <div className="relative w-full rounded-2xl p-3 bg-white border border-slate-200 backdrop-blur-xl shadow-sm transition-all duration-300 hover:border-sky-500/50 hover:-translate-y-1">
              <div className="w-full h-84 rounded-xl overflow-hidden bg-slate-50 relative border border-slate-200">
                <img
                  src="/avatar.jpg"
                  alt="Lingaraj"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-white backdrop-blur-md border border-slate-200 text-xs font-mono text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Open for Internships
                  </span>
                  <span className="text-sky-700 font-semibold">2026/27</span>
                </div>
              </div>

              {/* Portrait Metadata Strip */}
              <div className="flex justify-between items-center px-2 pt-3 text-[11px] font-mono text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span className="font-semibold text-slate-800">B.E. CSE &bull; KCT</span>
                </div>
                <span>COIMBATORE, INDIA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Personal Narrative, Badges & Actions */}
        <div className="lg:col-span-7 space-y-5">
          {/* Badge Group */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-600 font-mono text-[11px] font-semibold tracking-wider uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              COMPUTER SCIENCE & ENGINEERING
            </span>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 font-mono text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Building: Sign Bridge AI & IoT</span>
            </div>
          </div>

          <h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Lingaraj
          </h1>

          <div className="text-base sm:text-lg font-medium text-sky-700 leading-snug">
            Computer Science Engineering Student Exploring AI, Computer Vision & Intelligent Systems
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
            {PROFILE_INFO.bio}
          </p>

          <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-sky-700" />
            <span>Madurai / Coimbatore, Tamil Nadu, India</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="/resume.pdf"
              download="Lingaraj_Resume.pdf"
              onClick={() => sound.playSelect()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-900 font-semibold text-xs sm:text-sm shadow-lg shadow-sky-500/25 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download CV (.pdf)</span>
            </a>

            <a
              href="mailto:contact@lingaraj.dev"
              onClick={() => sound.playSelect()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 hover:border-slate-300 text-slate-900 font-semibold text-xs sm:text-sm transition-all hover:-translate-y-0.5 cursor-pointer shadow-md"
            >
              <Mail className="w-4 h-4 text-sky-700" />
              <span>Get in Touch</span>
            </a>
          </div>

          {/* Technical Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['CSE', 'FLUTTER', 'COMPUTER VISION', 'PYTHON', 'IoT', 'PROTOSEM', 'MEDIAPIPE', 'CAD/CAM'].map((chip) => (
              <span
                key={chip}
                className="font-mono text-[10px] font-semibold text-slate-600 px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg hover:text-sky-700 hover:border-sky-300 hover:bg-sky-50 transition-all"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Key Metrics Bento Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-sky-500/10 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                  {st.label}
                </span>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-sky-50 text-sky-700 border border-sky-200 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h3 
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {st.value}
                </h3>
                <p className="text-xs text-slate-500">
                  {st.sub}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. Core Pillars & Engineering Foundation */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-sky-700 uppercase mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>CORE DOMAINS & ENGINEERING PHILOSOPHY</span>
          </div>
          <h2 
            className="text-2xl font-bold text-slate-900 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Engineering with a Practical Perspective
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Connecting abstract computer science algorithms with physical sensors, embedded microcontrollers, and real-world deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Left: 4 Pillars */}
          <div className="space-y-3.5">
            {pillars.map((pil, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-lg space-y-2 hover:border-sky-300 hover:bg-white transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {pil.title}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-50 text-sky-600 border border-sky-200">
                    {pil.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  {pil.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Engineering Foundation Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs font-mono font-bold">
              <span className="text-sky-700">ENGINEERING FOUNDATION</span>
              <span className="text-slate-500">KCT &bull; CSE</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                <span><strong className="text-slate-900">Academic Rigor:</strong> Data Structures, Algorithms, Object-Oriented Software & Database Management.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span><strong className="text-slate-900">Hardware & Prototyping:</strong> ESP32, Computer Vision landmark processing & IoT telemetry.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span><strong className="text-slate-900">Innovation Fellowship:</strong> 20-week intensive hardware-software engineering at FORGE ProtoSem.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                <span><strong className="text-slate-900">Competitive Arenas:</strong> Smart India Hackathon (SIH) 2025, VERTX 2.0, and CIT Hackathon.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Long-Term Goal Banner */}
      <section className="relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-900 border border-sky-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-sky-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            VISION & LONG-TERM OBJECTIVE
          </span>
          <p className="text-sm sm:text-base font-normal leading-relaxed text-slate-800 max-w-3xl italic">
            "{PROFILE_INFO.longTermGoal}"
          </p>
        </div>
        
        <button
          onClick={() => {
            sound.playSelect();
            if (onClose) onClose();
          }}
          className="relative z-10 px-6 py-3 rounded-xl font-mono font-bold text-xs whitespace-nowrap bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-900 transition-all hover:scale-105 shrink-0 cursor-pointer shadow-lg shadow-sky-500/25"
        >
          EXPLORE ALL SECTORS &rarr;
        </button>
      </section>
    </div>
  );
}
