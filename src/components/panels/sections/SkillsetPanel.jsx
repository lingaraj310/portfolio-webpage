import React, { useState } from 'react';
import { SKILLS_DATA } from '../../../data/portfolioData';
import { Code2, Sparkles, Terminal, Layers, BookOpen, Rocket, CheckCircle2, Cpu, Database, Smartphone, Wrench, Search } from 'lucide-react';
import { sound } from '../../../utils/audioEffects';

export default function SkillsetPanel() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filterOptions = [
    { id: 'ALL', label: 'All Competencies', icon: Layers },
    { id: 'Languages', label: 'Languages', icon: Code2 },
    { id: 'Mobile/Web', label: 'Mobile & Web', icon: Smartphone },
    { id: 'Database/Tools', label: 'DB & Tools', icon: Database },
    { id: 'AI/Prototyping', label: 'AI & Vision', icon: Cpu },
  ];

  // Category Icon Mapping
  const getCategoryIcon = (name) => {
    if (name.includes('Programming')) return <Code2 className="w-5 h-5 text-neon-cyan" />;
    if (name.includes('Mobile')) return <Smartphone className="w-5 h-5 text-sky-400" />;
    if (name.includes('Database')) return <Database className="w-5 h-5 text-cyan-300" />;
    return <Cpu className="w-5 h-5 text-neon-cyan" />;
  };

  // Filter skills
  const filteredCategories = SKILLS_DATA.categories.map(cat => {
    let matchesCategory = true;
    if (activeFilter === 'Languages') matchesCategory = cat.name.includes('Programming');
    if (activeFilter === 'Mobile/Web') matchesCategory = cat.name.includes('Mobile');
    if (activeFilter === 'Database/Tools') matchesCategory = cat.name.includes('Database');
    if (activeFilter === 'AI/Prototyping') matchesCategory = cat.name.includes('AI');

    const matchingSkills = cat.skills.filter(s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
      ...cat,
      isVisible: matchesCategory && matchingSkills.length > 0,
      skills: matchingSkills
    };
  }).filter(cat => cat.isVisible);

  return (
    <div className="space-y-8 animate-fade-in text-slate-200 select-none max-w-6xl mx-auto">
      {/* Sector Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 sm:p-8 rounded-3xl bg-space-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-neon-cyan text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
            <span>SECTOR 04 // BERLIN HUB &bull; ENGINEERING MATRIX</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white">
            Technical Competency Matrix
          </h2>
          <p className="text-xs sm:text-sm font-space text-slate-300">
            Proficiencies, frameworks, tools, and active research domains.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter skills (e.g. Flutter, C++)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-space-950/90 border border-slate-800 focus:border-neon-cyan text-xs font-mono text-white placeholder-slate-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2.5">
        {filterOptions.map((opt) => {
          const Icon = opt.icon;
          const isActive = activeFilter === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => {
                sound.playSelect();
                setActiveFilter(opt.id);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-orbitron text-xs font-bold transition-all duration-300 cursor-pointer backdrop-blur-xl ${
                isActive
                  ? 'bg-neon-cyan text-black shadow-neon-cyan scale-102 font-extrabold'
                  : 'bg-space-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 hover:bg-space-850'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Modern Bento Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((cat, cIdx) => (
          <div
            key={cat.name}
            className="p-6 sm:p-7 rounded-3xl bg-space-900/90 border border-cyan-500/25 backdrop-blur-2xl shadow-xl space-y-5 transition-all duration-300 hover:border-cyan-500/60 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]"
          >
            {/* Category Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center space-x-2.5">
                {getCategoryIcon(cat.name)}
                <h3 className="font-orbitron font-bold text-white text-base">
                  {cat.name}
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-space-950 border border-slate-800 text-cyan-300">
                {cat.skills.length} SKILLS
              </span>
            </div>

            {/* Skills Progress Cards */}
            <div className="space-y-3.5">
              {cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-4 rounded-2xl bg-space-950/70 border border-slate-850 hover:border-cyan-500/40 transition-all space-y-2 group"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-orbitron font-bold text-white text-sm group-hover:text-neon-cyan transition-colors">
                      {skill.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full ${
                          skill.active
                            ? 'bg-cyan-500/20 border border-cyan-400 text-neon-cyan font-bold animate-pulse'
                            : 'bg-space-900 border border-slate-750 text-slate-400'
                        }`}
                      >
                        {skill.tag}
                      </span>
                      <span className="text-xs font-mono font-extrabold text-neon-cyan">
                        {skill.level}%
                      </span>
                    </div>
                  </div>

                  {/* Gradient Progress Bar */}
                  <div className="w-full bg-space-900 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 via-sky-400 to-neon-cyan transition-all duration-700 shadow-[0_0_8px_#00f0ff]"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Strategic Deep Dives & Vectors Footer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="p-6 rounded-3xl bg-space-900/90 border border-cyan-500/30 backdrop-blur-xl space-y-2.5 shadow-lg">
          <div className="flex items-center space-x-2 text-neon-cyan">
            <BookOpen className="w-5 h-5" />
            <h4 className="font-orbitron font-bold text-base text-white">Active Research Deep Dives</h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 font-space leading-relaxed">
            Actively mastering <strong className="text-neon-cyan">React & Next.js</strong> for modern frontend architectures, along with building strong mathematical foundations in <strong className="text-neon-cyan">Machine Learning & Computer Vision</strong>.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-space-900/90 border border-slate-800 backdrop-blur-xl space-y-2.5 shadow-lg">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Rocket className="w-5 h-5" />
            <h4 className="font-orbitron font-bold text-base text-white">Future Strategic Vectors</h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 font-space leading-relaxed">
            Full-stack distributed system design, scalable cloud deployments, AI agent workflows, product lifecycle management, and technology startup entrepreneurship.
          </p>
        </div>
      </div>
    </div>
  );
}
