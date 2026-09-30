import React from 'react';
import { ArrowLeft, X, MapPin, Sparkles, Globe, Home, ExternalLink } from 'lucide-react';
import { LOCATIONS } from '../../data/portfolioData';
import { sound } from '../../utils/audioEffects';
import IconHelper from '../ui/IconHelper';
import CyanMapPin from '../ui/CyanMapPin';

import AboutMePanel from './sections/AboutMePanel';
import ProjectsPanel from './sections/ProjectsPanel';
import ExperiencePanel from './sections/ExperiencePanel';
import SkillsetPanel from './sections/SkillsetPanel';
import ProtoSemPanel from './sections/ProtoSemPanel';
import EducationPanel from './sections/EducationPanel';
import ContactPanel from './sections/ContactPanel';
import ResumePanel from './sections/ResumePanel';
import HackathonsPanel from './sections/HackathonsPanel';

export default function DetailModal({
  location,
  onClose,
  onReturnHome
}) {
  if (!location) return null;

  // Render exclusively the selected section's dedicated environment
  const renderSectionContent = () => {
    switch (location.id) {
      case 'about':
        return <AboutMePanel />;
      case 'projects':
        return <ProjectsPanel />;
      case 'experience':
        return <ExperiencePanel />;
      case 'skillset':
        return <SkillsetPanel />;
      case 'protosem':
        return <ProtoSemPanel />;
      case 'education':
        return <EducationPanel />;
      case 'contact':
        return <ContactPanel />;
      case 'resume':
        return <ResumePanel />;
      case 'hackathons':
        return <HackathonsPanel />;
      default:
        return <AboutMePanel />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-space-950/98 backdrop-blur-3xl animate-fade-in flex flex-col overflow-hidden select-none">
      {/* Luminous Top Accent Stripe */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-neon-cyan to-sky-400 shadow-[0_0_20px_#00f0ff] z-60" />

      {/* FULL-PAGE IMMERSIVE HEADER BAR */}
      <header className="w-full px-4 sm:px-8 md:px-12 py-4 bg-space-950/95 border-b border-slate-800/90 flex justify-between items-center z-50 backdrop-blur-2xl">
        {/* Left: Back to My World Action + Breadcrumb */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <button
            onClick={() => {
              sound.playSelect();
              onClose();
            }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center space-x-2.5 px-4 sm:px-5 py-2.5 rounded-xl bg-space-900 hover:bg-space-850 border-2 border-cyan-500/60 hover:border-neon-cyan text-white font-orbitron font-extrabold text-xs sm:text-sm cursor-pointer transition-all shadow-neon-cyan group hover:scale-102"
            title="Return to 3D Globe Navigation"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-neon-cyan group-hover:-translate-x-1 transition-transform" />
            <span>Back to My World</span>
          </button>

          <div className="hidden md:flex items-center space-x-3 font-mono text-xs border-l border-slate-800 pl-5">
            <CyanMapPin className="w-4 h-4 shrink-0" />
            <span className="text-slate-300 font-bold">{location.city}, {location.country}</span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-neon-cyan font-bold uppercase tracking-wider">{location.sectorCode}</span>
          </div>
        </div>

        {/* Center: Sector Title & Tagline */}
        <div className="hidden lg:flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-space-900 border border-cyan-500/40 text-neon-cyan">
            <IconHelper name={location.iconName} className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-orbitron font-extrabold text-white text-base tracking-wide uppercase">
              {location.title}
            </h1>
            <p className="text-xs text-slate-400 font-space">{location.tagline}</p>
          </div>
        </div>

        {/* Right: Exit / Return Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              sound.playSelect();
              onClose();
            }}
            onMouseEnter={() => sound.playHover()}
            className="p-2.5 rounded-xl bg-space-900 hover:bg-space-850 border border-slate-700 hover:border-neon-cyan text-slate-400 hover:text-white transition-all cursor-pointer shadow-md"
            title="Exit to Globe (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* FULL-PAGE CONTENT BODY - 100% WIDTH & HEIGHT SCROLLABLE */}
      <main className="flex-1 w-full overflow-y-auto px-4 sm:px-8 md:px-16 lg:px-24 py-8 md:py-10 custom-scrollbar cyber-grid-bg">
        <div className="max-w-6xl mx-auto space-y-8 pb-16">
          {renderSectionContent()}
        </div>
      </main>

      {/* FULL-PAGE IMMERSIVE FOOTER */}
      <footer className="w-full px-4 sm:px-8 md:px-12 py-3.5 bg-space-950/98 border-t border-slate-800/90 flex justify-between items-center text-xs font-mono text-slate-400 z-50">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-ping" />
          <span className="text-white font-extrabold font-orbitron">{location.title}</span>
          <span className="text-slate-500 hidden sm:inline">&bull; Computer Science Engineering Portfolio</span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              sound.playSelect();
              onClose();
            }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-space-900 hover:bg-space-850 border border-cyan-500/50 hover:border-neon-cyan text-neon-cyan hover:text-white font-bold cursor-pointer transition-all text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Globe</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
