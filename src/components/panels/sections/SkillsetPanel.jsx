import React, { useState } from 'react';
import { 
  Code2, 
  Smartphone, 
  Database, 
  Cpu, 
  Sparkles, 
  Layers, 
  Wrench, 
  Terminal, 
  CheckCircle2,
  Zap,
  Boxes,
  Workflow
} from 'lucide-react';
import { SKILLS_DATA } from '../../../data/portfolioData';
import { sound } from '../../../utils/audioEffects';

const FILTER_TABS = [
  { id: 'all', label: 'All Disciplines', count: 18 },
  { id: 'languages', label: 'Languages', count: 4 },
  { id: 'mobile_web', label: 'Frontend & Mobile', count: 5 },
  { id: 'db_tools', label: 'Database & Tools', count: 5 },
  { id: 'ai', label: 'AI & Prototyping', count: 4 }
];

export default function SkillsetPanel() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCategories = SKILLS_DATA.categories.filter((cat) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'languages') return cat.name.includes('Languages');
    if (activeFilter === 'mobile_web') return cat.name.includes('Mobile') || cat.name.includes('Web');
    if (activeFilter === 'db_tools') return cat.name.includes('Database') || cat.name.includes('Tools');
    if (activeFilter === 'ai') return cat.name.includes('AI') || cat.name.includes('Prototyping');
    return true;
  });

  const getCategoryIcon = (name) => {
    if (name.includes('Languages')) return Code2;
    if (name.includes('Mobile') || name.includes('Web')) return Smartphone;
    if (name.includes('Database')) return Database;
    return Cpu;
  };

  const getCategoryColor = (name) => {
    if (name.includes('Languages')) return { bg: 'bg-sky-50', text: 'text-sky-400', border: 'border-sky-200', bar: 'from-sky-500 to-blue-600' };
    if (name.includes('Mobile') || name.includes('Web')) return { bg: 'bg-indigo-50', text: 'text-indigo-400', border: 'border-indigo-200', bar: 'from-indigo-500 to-purple-600' };
    if (name.includes('Database')) return { bg: 'bg-emerald-50', text: 'text-emerald-400', border: 'border-emerald-200', bar: 'from-emerald-500 to-teal-600' };
    return { bg: 'bg-amber-50', text: 'text-amber-400', border: 'border-amber-200', bar: 'from-amber-500 to-orange-600' };
  };

  return (
    <div className="w-full space-y-10 animate-fade-in font-sans text-slate-800">
      {/* 1. Header & Filter Tabs */}
      <section className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-mono text-[11px] font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span>TECHNICAL MATRIX & ARCHITECTURE</span>
            </div>
            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              The Engineering Stack
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
              Categorized technical proficiencies, developer ecosystems, cloud databases, and rapid prototyping workflows utilized across academic research and venture builds.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl backdrop-blur-xl shrink-0">
            <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono text-slate-500">SYSTEM DOMAINS</div>
              <div className="text-sm font-bold text-slate-900 font-mono">4 DISCIPLINES &bull; 18+ TOOLS</div>
            </div>
          </div>
        </div>

        {/* Filter Tab Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playSelect();
                  setActiveFilter(tab.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-slate-900 shadow-lg shadow-sky-500/25 border border-sky-400 scale-102'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-sky-300 hover:text-slate-900 backdrop-blur-xl'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Grid of Skill Category Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((cat, idx) => {
          const Icon = getCategoryIcon(cat.name);
          const color = getCategoryColor(cat.name);
          return (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 space-y-6 group"
            >
              {/* Category Title Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center space-x-3.5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color.bg} ${color.text} border ${color.border} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 
                      className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {cat.name}
                    </h3>
                    <span className="text-xs font-mono text-slate-500">
                      {cat.skills.length} TECHNOLOGIES CATALOGUED
                    </span>
                  </div>
                </div>

                <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${color.bg} ${color.text} border ${color.border}`}>
                  VERIFIED
                </span>
              </div>

              {/* Skills Progress List */}
              <div className="space-y-4">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800 group-hover/item:text-slate-900 transition-colors">
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-slate-500 font-medium">
                          {skill.level}%
                        </span>
                        <span className="font-mono text-[10px] font-semibold text-sky-600 px-2 py-0.5 rounded-full bg-sky-50 border border-sky-200">
                          {skill.tag}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full overflow-hidden bg-slate-50 border border-slate-200 p-0.5">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${color.bar} shadow-sm`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. Methodologies & Technical Workflows Strip */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
              <Workflow className="w-4 h-4" />
            </div>
            <div>
              <h3 
                className="text-base sm:text-lg font-bold text-slate-900"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Engineering Methodologies & Technical Workflows
              </h3>
              <p className="text-xs text-slate-500 font-light">
                Standardized processes applied during sprint development, firmware programming & hardware design.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-1">
          {[
            { name: 'Rapid Prototyping', tag: 'CAD / CAM' },
            { name: 'Cross-Platform UI', tag: 'Flutter / React' },
            { name: 'Version Control', tag: 'Git & GitHub' },
            { name: 'Computer Vision', tag: 'MediaPipe / OpenCV' },
            { name: 'REST & IoT APIs', tag: 'HTTP / MQTT' },
            { name: 'Agile Sprint Cycles', tag: 'Jira / Scrum' },
            { name: 'Problem Decomposition', tag: 'Analysis' },
            { name: 'Clean Architecture', tag: 'Modular Design' }
          ].map((item, i) => (
            <div 
              key={i}
              className="p-3.5 rounded-xl flex flex-col justify-between bg-slate-100 border border-slate-200 hover:border-sky-300 hover:bg-slate-100 transition-all group"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-700" />
                <span className="text-xs font-semibold text-slate-800 truncate group-hover:text-slate-900">
                  {item.name}
                </span>
              </div>
              <span className="text-[10px] font-mono text-sky-700 mt-1.5 pl-5 font-light">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
