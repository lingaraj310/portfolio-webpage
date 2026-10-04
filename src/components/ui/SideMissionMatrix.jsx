import React, { useState, useMemo } from 'react';
import { LOCATIONS, PROFILE_INFO } from '../../data/portfolioData';
import IconHelper from './IconHelper';
import { sound } from '../../utils/audioEffects';
import { 
  ChevronRight, 
  ChevronLeft,
  MapPin, 
  Search, 
  Menu, 
  X, 
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Compass,
  FolderCode,
  Briefcase,
  Cpu,
  Trophy,
  GraduationCap,
  FileText,
  Mail,
  User,
  Zap
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: '✨ All' },
  { id: 'builds', label: '🚀 Builds', ids: ['projects', 'skillset', 'hackathons'] },
  { id: 'innovation', label: '💡 Career', ids: ['protosem', 'experience'] },
  { id: 'dossier', label: '📄 Bio & CV', ids: ['about', 'education', 'resume', 'contact'] }
];

const SECTOR_CONFIG = {
  about: { 
    icon: User, 
    badge: 'Bio', 
    action: 'Read Bio', 
    bg: 'bg-sky-500/10 text-sky-400 border-sky-500/20 group-hover:bg-sky-500 group-hover:text-white',
    desc: 'Identity, Vision & Philosophy'
  },
  protosem: { 
    icon: Zap, 
    badge: 'Fellowship', 
    action: 'Explore', 
    bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white',
    desc: '20-Week Hardware & IoT Fellowship'
  },
  projects: { 
    icon: FolderCode, 
    badge: '4 Builds', 
    action: 'View Apps', 
    bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white',
    desc: 'Sign Bridge AI & Intelligent Learning'
  },
  experience: { 
    icon: Briefcase, 
    badge: 'Roles', 
    action: 'Timeline', 
    bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20 group-hover:bg-amber-500 group-hover:text-white',
    desc: 'Work Experience & Leadership'
  },
  skillset: { 
    icon: Cpu, 
    badge: '24 Techs', 
    action: 'Inspect', 
    bg: 'bg-purple-500/10 text-purple-400 border-purple-500/20 group-hover:bg-purple-500 group-hover:text-white',
    desc: 'Languages, Frameworks & Tools'
  },
  hackathons: { 
    icon: Trophy, 
    badge: '9 Wins', 
    action: 'Victories', 
    bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20 group-hover:bg-rose-500 group-hover:text-white',
    desc: 'SIH 2025, VERTX 2.0 & Ideathons'
  },
  education: { 
    icon: GraduationCap, 
    badge: 'KCT', 
    action: 'Academics', 
    bg: 'bg-blue-500/10 text-blue-400 border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white',
    desc: 'B.E. Computer Science & Engineering'
  },
  resume: { 
    icon: FileText, 
    badge: 'CV', 
    action: 'PDF CV', 
    bg: 'bg-teal-500/10 text-teal-400 border-teal-500/20 group-hover:bg-teal-500 group-hover:text-white',
    desc: 'Curriculum Vitae & Verified Dossier'
  },
  contact: { 
    icon: Mail, 
    badge: 'Connect', 
    action: 'Message', 
    bg: 'bg-pink-500/10 text-pink-400 border-pink-500/20 group-hover:bg-pink-500 group-hover:text-white',
    desc: 'Direct Email, LinkedIn & GitHub'
  }
};

export default function SideMissionMatrix({
  activeLocation,
  onSelectSection,
  onFlyToLocation
}) {
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [imgError, setImgError] = useState(false);

  // Filter locations by Category & Search query
  const filteredLocations = useMemo(() => {
    return LOCATIONS.filter(loc => {
      if (activeCategory !== 'all') {
        const cat = CATEGORIES.find(c => c.id === activeCategory);
        if (cat && !cat.ids.includes(loc.id)) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          loc.title.toLowerCase().includes(q) ||
          loc.city.toLowerCase().includes(q) ||
          loc.country.toLowerCase().includes(q) ||
          loc.description.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      {/* Mobile Floating Drawer Toggle Button */}
      <div className="fixed bottom-6 left-6 z-40 md:hidden pointer-events-auto select-none">
        <button
          onClick={() => {
            sound.playSelect();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className="flex items-center space-x-2 px-4 py-3 rounded-2xl bg-slate-900/95 border border-sky-500/40 text-sky-300 shadow-xl backdrop-blur-2xl font-sans text-xs font-bold cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          <span>{mobileMenuOpen ? 'Close Menu' : 'Navigation Menu'}</span>
        </button>
      </div>

      {/* Main Side Mission Matrix Floating Deck */}
      <aside
        className={`fixed top-16 bottom-6 left-4 md:left-6 z-30 flex flex-col pointer-events-auto select-none transition-all duration-300 ease-out ${
          mobileMenuOpen 
            ? 'w-[94vw] translate-x-0 opacity-100' 
            : isCollapsed
              ? 'w-16 -translate-x-0 opacity-100 hidden md:flex'
              : 'w-[94vw] sm:w-[380px] md:w-[410px] -translate-x-[110%] md:translate-x-0 opacity-0 md:opacity-100'
        }`}
      >
        {isCollapsed ? (
          /* ======================================================== */
          /* COLLAPSED MICRO DOCK                                     */
          /* ======================================================== */
          <div className="relative flex-1 flex flex-col items-center justify-between p-2.5 rounded-3xl bg-slate-950/90 border border-white/10 shadow-2xl backdrop-blur-2xl">
            <button
              onClick={() => {
                sound.playSelect();
                setIsCollapsed(false);
              }}
              className="w-11 h-11 rounded-2xl bg-slate-900 hover:bg-sky-950 border border-slate-700/80 hover:border-sky-400 text-sky-300 flex items-center justify-center transition-all cursor-pointer shadow-sm"
              title="Expand Navigation"
            >
              <ChevronRight className="w-5 h-5 text-sky-400" />
            </button>

            {/* Quick Icon Waypoints */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-2 py-4">
              {LOCATIONS.map((loc) => {
                const isSelected = activeLocation?.id === loc.id;
                const cfg = SECTOR_CONFIG[loc.id] || SECTOR_CONFIG.about;
                const Icon = cfg.icon;

                return (
                  <button
                    key={loc.id}
                    onClick={() => {
                      sound.playSelect();
                      onSelectSection(loc);
                    }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer relative group ${
                      isSelected
                        ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/40 scale-110'
                        : 'bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 hover:border-sky-400/40'
                    }`}
                    title={`${loc.title} (${loc.city})`}
                  >
                    <Icon className="w-5 h-5" />
                    {/* Hover Tooltip */}
                    <div className="absolute left-14 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/15 text-xs font-sans font-semibold text-white whitespace-nowrap shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                      {loc.title}
                    </div>
                  </button>
                );
              })}
            </div>

            <span className="text-[10px] font-mono text-slate-400 uppercase rotate-90 my-2 tracking-wider font-semibold">
              MENU
            </span>
          </div>
        ) : (
          /* ======================================================== */
          /* EXPANDED CUTE & PROFESSIONAL NAVIGATION CONSOLE          */
          /* ======================================================== */
          <div className="relative flex-1 flex flex-col bg-slate-950/90 border border-white/10 hover:border-sky-500/30 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-2xl overflow-hidden transition-all space-y-3.5">
            
            {/* Top Header Row */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-sm font-sans font-bold text-slate-100 tracking-wide flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-sky-400" />
                  <span>Portfolio Explorer</span>
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 font-semibold">
                  {filteredLocations.length} destinations
                </span>

                {/* Collapse Button (Desktop) */}
                <button
                  onClick={() => {
                    sound.playSelect();
                    setIsCollapsed(true);
                  }}
                  className="hidden md:flex p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-sky-400 text-slate-400 hover:text-white transition-all cursor-pointer"
                  title="Collapse sidebar"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Profile Identity Card (Cute & Clean) */}
            <div
              onClick={() => {
                sound.playSelect();
                onSelectSection(LOCATIONS[0]);
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center space-x-3.5 p-3 rounded-2xl bg-slate-900/80 hover:bg-sky-950/30 border border-white/10 hover:border-sky-400/40 transition-all cursor-pointer group shadow-sm"
            >
              {/* Avatar with Cute Status Dot */}
              <div className="relative w-12 h-12 rounded-2xl p-0.5 bg-gradient-to-tr from-sky-400 via-indigo-500 to-emerald-400 shrink-0 shadow-md">
                <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-950">
                  {!imgError ? (
                    <img
                      src="/avatar.jpg"
                      alt="Lingaraj"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover object-[center_10%] group-hover:scale-108 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sky-400 font-bold text-sm">
                      LR
                    </div>
                  )}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-xs" />
              </div>

              {/* Profile Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition-colors truncate flex items-center gap-1.5">
                    <span>{PROFILE_INFO.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  </h2>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                    Open to work
                  </span>
                </div>
                <p className="text-xs text-slate-200 truncate font-medium mt-0.5">
                  Computer Science Engineer &bull; KCT
                </p>
                <div className="flex items-center space-x-1 text-xs text-slate-400 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                  <span className="truncate">Coimbatore / Madurai, India</span>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            {/* Simple Clean Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destinations, skills, projects..."
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 focus:border-sky-400 text-sm text-slate-100 placeholder-slate-400 font-sans focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Cute Category Filter Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto custom-scrollbar pb-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.playSelect();
                    setActiveCategory(cat.id);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-sky-500 text-white font-bold shadow-md shadow-sky-500/30 scale-102'
                      : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800 border border-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Destination List (Cute, Clean, Large Text Cards) */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
              {filteredLocations.map((loc) => {
                const isSelected = activeLocation?.id === loc.id;
                const isHovered = hoveredLocation?.id === loc.id;
                const cfg = SECTOR_CONFIG[loc.id] || SECTOR_CONFIG.about;
                const Icon = cfg.icon;

                return (
                  <div
                    key={loc.id}
                    onClick={() => {
                      sound.playSelect();
                      onSelectSection(loc);
                    }}
                    onMouseEnter={() => {
                      sound.playHover();
                      setHoveredLocation(loc);
                    }}
                    onMouseLeave={() => setHoveredLocation(null)}
                    className={`relative flex flex-col p-3 rounded-2xl border transition-all duration-200 cursor-pointer group ${
                      isSelected
                        ? 'bg-slate-900 border-sky-400 shadow-md ring-1 ring-sky-400/40 scale-[1.01]'
                        : 'bg-slate-900/60 hover:bg-slate-900 border-white/5 hover:border-sky-400/40'
                    }`}
                  >
                    {/* Main Row */}
                    <div className="flex items-center justify-between">
                      
                      {/* Left: Icon + Title + Subtitle */}
                      <div className="flex items-center space-x-3.5 min-w-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                          isSelected
                            ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/30'
                            : cfg.bg
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center space-x-2">
                            <h3 className={`text-sm sm:text-base font-bold truncate transition-colors ${
                              isSelected || isHovered ? 'text-white' : 'text-slate-100 group-hover:text-sky-300'
                            }`}>
                              {loc.title}
                            </h3>
                            <span className="text-[11px] font-mono font-semibold text-slate-300 px-2 py-0.5 rounded-md bg-slate-950/70 border border-white/10">
                              {cfg.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 truncate mt-0.5 font-normal">
                            {cfg.desc}
                          </p>
                        </div>
                      </div>

                      {/* Right: Action Button */}
                      <div className="pl-2 shrink-0 flex items-center">
                        <span className={`text-xs sm:text-sm font-bold transition-all flex items-center space-x-1.5 px-3 py-1.5 rounded-xl ${
                          isSelected
                            ? 'bg-sky-500 text-white shadow-xs'
                            : 'bg-slate-950/90 text-slate-200 group-hover:text-sky-300 group-hover:bg-slate-800 border border-white/10 group-hover:border-sky-400/40'
                        }`}>
                          <span>{isSelected ? 'Active' : cfg.action}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer: Simple Clean Tip */}
            <div className="border-t border-white/10 pt-2.5 flex items-center justify-between text-xs text-slate-300 px-1">
              <span className="flex items-center space-x-1.5">
                <span className="px-1.5 py-0.5 rounded-md bg-slate-900 border border-white/10 text-slate-200 font-mono text-[10px] font-bold">1–9</span>
                <span>Quick Fly</span>
              </span>
              <span className="text-sky-400 font-bold flex items-center gap-1">
                <span>Click to Open</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

          </div>
        )}
      </aside>
    </>
  );
}
