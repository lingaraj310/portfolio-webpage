import React, { useState } from 'react';
import { 
  ExternalLink, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Eye, 
  X, 
  Cpu, 
  BookOpen, 
  Bot 
} from 'lucide-react';
import { PROJECTS_DATA } from '../../../data/portfolioData';
import { sound } from '../../../utils/audioEffects';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

export default function ProjectsPanel() {
  const [selectedProject, setSelectedProject] = useState(null);

  const featuredProject = PROJECTS_DATA[0]; // Sign Bridge AI
  const otherProjects = PROJECTS_DATA.slice(1);

  return (
    <div className="w-full space-y-10 animate-fade-in font-sans text-slate-800">
      {/* 1. Header Section */}
      <section className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-mono text-[11px] font-semibold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>CASE STUDIES & TECHNICAL PROTOTYPES</span>
        </div>
        <h1 
          className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Engineering Projects
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed font-light">
          Production-grade applications, assistive artificial intelligence, and adaptive cognitive software built with modern engineering workflows.
        </p>
      </section>

      {/* 2. Featured Project Hero Card (Sign Bridge AI) */}
      {featuredProject && (
        <section className="relative p-6 sm:p-8 lg:p-10 rounded-2xl bg-white border border-sky-200 backdrop-blur-2xl shadow-sm overflow-hidden transition-all duration-300 hover:border-sky-500/50">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl pointer-events-none" />

          {/* Top Badge */}
          <div className="flex items-center justify-between gap-4 mb-6 border-b border-slate-200 pb-4 relative z-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full flex items-center space-x-2 bg-sky-50 text-sky-700 border border-sky-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>FLAGSHIP FEATURED CASE STUDY</span>
            </span>

            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600">
              {featuredProject.category}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <h2 
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {featuredProject.title}
              </h2>
              <p className="text-sm font-semibold text-sky-700">
                {featuredProject.subtitle}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                {featuredProject.problem}
              </p>

              {/* Highlights List */}
              <div className="space-y-2 pt-2">
                {featuredProject.highlights.slice(0, 3).map((hl, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs sm:text-sm font-medium text-slate-800">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-700" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {featuredProject.stack.map((st, i) => (
                  <span
                    key={i}
                    className="font-mono text-[11px] font-semibold text-slate-600 px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg"
                  >
                    {st}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <button
                  onClick={() => {
                    sound.playSelect();
                    setSelectedProject(featuredProject);
                  }}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-900 font-semibold text-xs sm:text-sm shadow-lg shadow-sky-500/25 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Case Study Blueprint</span>
                </button>

                <a
                  href="https://github.com/lingaraj310"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playSelect()}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-900 font-semibold text-xs sm:text-sm transition-all hover:-translate-y-0.5 cursor-pointer shadow-md"
                >
                  <GithubIcon className="w-4 h-4 text-slate-900" />
                  <span>GitHub Repository ↗</span>
                </a>
              </div>
            </div>

            {/* Right Visual Teaser */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full aspect-video sm:aspect-square max-w-sm rounded-2xl p-5 flex flex-col justify-between border border-slate-200 bg-slate-50 backdrop-blur-xl shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-700">
                    COMPUTER VISION PIPELINE
                  </span>
                  <Bot className="w-5 h-5 text-emerald-700" />
                </div>

                <div className="space-y-2.5 py-4">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-800 flex items-center gap-2">
                    <span>📸</span> <span>Real-Time ISL Camera Input Stream</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-800 flex items-center gap-2">
                    <span>🧠</span> <span>MediaPipe 21-Point Landmark Extraction</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-800 flex items-center gap-2">
                    <span>🔊</span> <span>Confidence-Based Speech Synthesizer</span>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-center text-slate-500 bg-white/80 py-1 rounded-lg border border-slate-200">
                  Active Prototype &bull; Flutter + TFLite
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Additional Projects Grid */}
      <section className="space-y-4">
        <h2 
          className="text-xl font-bold text-slate-900 tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Research & Concept Architectures
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherProjects.map((proj) => (
            <div
              key={proj.id}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="font-mono text-[10px] font-bold px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                    {proj.category}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">
                    BLUEPRINT STAGE
                  </span>
                </div>

                <h3 
                  className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {proj.title}
                </h3>
                <p className="text-xs font-semibold text-sky-700">
                  {proj.subtitle}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  {proj.problem}
                </p>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.stack.map((s, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[10px] font-semibold text-slate-600 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playSelect();
                  setSelectedProject(proj);
                }}
                className="w-full py-2.5 rounded-xl font-mono font-semibold text-xs border border-sky-200 bg-sky-50 hover:bg-sky-500/20 text-sky-600 flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-sm"
              >
                <span>EXPLORE FULL BLUEPRINT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Detail Modal Overlay */}
      {selectedProject && (
        <div className="fixed inset-0 z-60 bg-slate-50 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-2xl p-6 sm:p-8 bg-white border border-white/15 shadow-sm max-h-[85vh] overflow-y-auto space-y-6 animate-fade-in custom-scrollbar">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-700">
                  {selectedProject.category}
                </span>
                <h2 
                  className="text-2xl font-bold text-slate-900"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {selectedProject.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer border border-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-slate-600">
              <p className="whitespace-pre-line font-light">
                {selectedProject.fullDescription}
              </p>

              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-base text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Key Capabilities & Architecture
                </h4>
                {selectedProject.highlights.map((hl, i) => (
                  <div key={i} className="flex items-start space-x-2 text-slate-800">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-700" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-900 font-mono font-semibold text-xs transition-all cursor-pointer shadow-lg shadow-sky-500/25"
              >
                CLOSE WINDOW
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
