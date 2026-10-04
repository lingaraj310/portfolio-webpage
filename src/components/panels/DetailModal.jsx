import React from 'react';
import { ArrowLeft, X, MapPin } from 'lucide-react';
import { sound } from '../../utils/audioEffects';
import IconHelper from '../ui/IconHelper';

import AboutMePanel from './sections/AboutMePanel';
import ProjectsPanel from './sections/ProjectsPanel';
import ExperiencePanel from './sections/ExperiencePanel';
import SkillsetPanel from './sections/SkillsetPanel';
import ProtoSemPanel from './sections/ProtoSemPanel';
import EducationPanel from './sections/EducationPanel';
import ContactPanel from './sections/ContactPanel';
import ResumePanel from './sections/ResumePanel';
import HackathonsPanel from './sections/HackathonsPanel';

// Modern Luxury Dark Palette Configurations
const SECTION_PALETTES = {
  about: {
    primary: '#3B82F6',
    accent: '#60A5FA',
    glow: 'rgba(59, 130, 246, 0.25)',
    border: 'rgba(59, 130, 246, 0.3)'
  },
  skillset: {
    primary: '#10B981',
    accent: '#34D399',
    glow: 'rgba(16, 185, 129, 0.25)',
    border: 'rgba(16, 185, 129, 0.3)'
  },
  projects: {
    primary: '#A855F7',
    accent: '#C084FC',
    glow: 'rgba(168, 85, 247, 0.25)',
    border: 'rgba(168, 85, 247, 0.3)'
  },
  resume: {
    primary: '#38BDF8',
    accent: '#0284C7',
    glow: 'rgba(56, 189, 248, 0.25)',
    border: 'rgba(56, 189, 248, 0.3)'
  },
  protosem: {
    primary: '#3B82F6',
    accent: '#6366F1',
    glow: 'rgba(59, 130, 246, 0.25)',
    border: 'rgba(59, 130, 246, 0.3)'
  },
  contact: {
    primary: '#F43F5E',
    accent: '#FB7185',
    glow: 'rgba(244, 63, 94, 0.25)',
    border: 'rgba(244, 63, 94, 0.3)'
  },
  experience: {
    primary: '#F59E0B',
    accent: '#FBBF24',
    glow: 'rgba(245, 158, 11, 0.25)',
    border: 'rgba(245, 158, 11, 0.3)'
  },
  education: {
    primary: '#14B8A6',
    accent: '#2DD4BF',
    glow: 'rgba(20, 184, 166, 0.25)',
    border: 'rgba(20, 184, 166, 0.3)'
  },
  hackathons: {
    primary: '#F59E0B',
    accent: '#A855F7',
    glow: 'rgba(245, 158, 11, 0.25)',
    border: 'rgba(245, 158, 11, 0.3)'
  }
};

export default function DetailModal({
  location,
  onClose,
  onReturnHome
}) {
  if (!location) return null;

  const palette = SECTION_PALETTES[location.id] || SECTION_PALETTES.about;

  const renderSectionContent = () => {
    switch (location.id) {
      case 'about':
        return <AboutMePanel onClose={onClose} />;
      case 'projects':
        return <ProjectsPanel onClose={onClose} />;
      case 'experience':
        return <ExperiencePanel onClose={onClose} />;
      case 'skillset':
        return <SkillsetPanel onClose={onClose} />;
      case 'protosem':
        return <ProtoSemPanel onClose={onClose} />;
      case 'education':
        return <EducationPanel onClose={onClose} />;
      case 'contact':
        return <ContactPanel onClose={onClose} />;
      case 'resume':
        return <ResumePanel onClose={onClose} />;
      case 'hackathons':
        return <HackathonsPanel onClose={onClose} />;
      default:
        return <AboutMePanel onClose={onClose} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen flex flex-col overflow-hidden transition-all duration-300 animate-fade-in font-sans bg-[#f8fafc] text-slate-800">
      
      {/* Subtle Blueprint Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Subtle Luminous Background Glows */}
      <div 
        className="absolute top-0 left-1/4 w-[600px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-10"
        style={{ backgroundColor: palette.primary }}
      />
      <div 
        className="absolute bottom-10 right-1/4 w-[500px] h-[300px] rounded-full blur-[120px] pointer-events-none opacity-10"
        style={{ backgroundColor: palette.accent }}
      />

      {/* Top Accent Strip */}
      <div 
        className="w-full h-1 shrink-0 transition-all duration-300"
        style={{ 
          background: `linear-gradient(90deg, ${palette.primary}, ${palette.accent})`,
          boxShadow: `0 0 12px ${palette.glow}`
        }}
      />

      {/* Light Navigation Header */}
      <header className="w-full px-4 sm:px-8 md:px-12 py-3.5 flex justify-between items-center border-b border-slate-200/90 shrink-0 backdrop-blur-2xl z-40 bg-white/90 shadow-xs">
        {/* Left: Button */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => {
              sound.playSelect();
              onClose();
            }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white font-mono font-bold text-xs sm:text-sm cursor-pointer transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-blue-500/30"
            title="Return to 3D Globe Navigation"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>&larr; BACK TO GLOBE</span>
          </button>

          <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-slate-500 pl-3 border-l border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold">{location.city}, {location.country}</span>
          </div>
        </div>

        {/* Center: Section Title Badge */}
        <div className="flex items-center space-x-2.5">
          <div 
            className="w-8 h-8 rounded-xl flex items-center justify-center border border-slate-200 shadow-xs"
            style={{ 
              backgroundColor: `${palette.primary}15`,
              color: palette.primary 
            }}
          >
            <IconHelper name={location.iconName} className="w-4 h-4" />
          </div>
          <span 
            className="font-bold text-sm sm:text-base tracking-tight text-slate-900"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {location.title}
          </span>
        </div>

        {/* Right: Exit Button */}
        <button
          onClick={() => {
            sound.playSelect();
            onClose();
          }}
          onMouseEnter={() => sound.playHover()}
          className="p-2 rounded-xl transition-all cursor-pointer hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200"
          title="Exit to Globe (ESC)"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </header>

      {/* Main Full-Width Scrollable Content Area */}
      <main className="flex-1 w-full overflow-y-auto px-4 sm:px-6 md:px-10 lg:px-16 py-8 md:py-12 custom-scrollbar relative z-10">
        <div className="w-full max-w-6xl 2xl:max-w-7xl mx-auto pb-16">
          {renderSectionContent()}
        </div>
      </main>
    </div>
  );
}
