import React, { useState } from 'react';
import { PROJECTS_DATA } from '../../../data/portfolioData';
import { Cpu, Sparkles, AlertCircle, CheckCircle2, Code2, Play, Terminal, Send, ArrowUpRight } from 'lucide-react';
import { sound } from '../../../utils/audioEffects';

export default function ProjectsPanel() {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'simulator'

  // Interactive Simulator States
  const [selectedGesture, setSelectedGesture] = useState('A');
  const [simOutput, setSimOutput] = useState('Detected: Letter [A] • ISL Alphabet • Confidence: 99.4%');
  const [jpedQuery, setJpedQuery] = useState('Explain binary search simply');
  const [jpedResponse, setJpedResponse] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleTestGesture = (letter) => {
    sound.playSelect();
    setSelectedGesture(letter);
    setIsSimulating(true);
    setSimOutput('PROCESSING CNN TENSORFLOW PIPELINE...');
    setTimeout(() => {
      setIsSimulating(false);
      setSimOutput(`Detected Gesture: [${letter}] • Indian Sign Language Alphabet • Confidence: 98.7%`);
    }, 400);
  };

  const handleJpedTest = (e) => {
    e.preventDefault();
    sound.playSelect();
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setJpedResponse({
        explanation: "Think of searching for a word in a dictionary: instead of reading from page 1, you open in the exact middle. If your word comes earlier alphabetically, you ignore the right half. You repeat this halving process at every step — finding any word in just O(log N) operations!",
        concept: "Adaptive Divide & Conquer",
        diagnostic: "Interactive Analogy Model"
      });
    }, 500);
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-200 select-none">
      {/* Sector Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-3xl bg-space-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-neon-cyan text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
            <span>SECTOR 02 // TOKYO HUB &bull; MAJOR PROJECTS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white">
            Major Software & Innovation Projects
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              sound.playSelect();
              setActiveTab('projects');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-neon-cyan text-black shadow-neon-cyan'
                : 'bg-space-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            PROJECT ARCHITECTURES
          </button>
          <button
            onClick={() => {
              sound.playSelect();
              setActiveTab('simulator');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'simulator'
                ? 'bg-neon-cyan text-black shadow-neon-cyan'
                : 'bg-space-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>LIVE SIMULATOR</span>
          </button>
        </div>
      </div>

      {/* 1. Dedicated One Box Per Project Layout */}
      {activeTab === 'projects' ? (
        <div className="space-y-8">
          {PROJECTS_DATA.map((proj, idx) => (
            <section
              key={proj.id}
              className="p-6 sm:p-10 rounded-3xl bg-space-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl space-y-6 transition-all duration-300 hover:border-cyan-500/60"
            >
              {/* Project Card Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-neon-cyan border border-cyan-500/40 uppercase">
                      PROJECT 0{idx + 1} &bull; {proj.category}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white pt-1">
                    {proj.title}
                  </h3>
                  <p className="text-sm font-space text-cyan-300 font-medium">
                    {proj.subtitle}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-space-950 border border-cyan-500/40 shadow-neon-cyan shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-pulse" />
                  <span className="font-mono text-xs text-slate-200 font-bold">
                    {proj.statusLabel}
                  </span>
                </div>
              </div>

              {/* Full Detailed Description */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
                  PROJECT OVERVIEW & CORE ARCHITECTURE
                </h4>
                <div className="text-sm sm:text-base text-slate-200 font-space leading-relaxed space-y-3 p-5 rounded-2xl bg-space-950/80 border border-slate-800">
                  {proj.fullDescription.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Key Capabilities & Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-neon-cyan uppercase tracking-wider font-bold flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>KEY SYSTEM CAPABILITIES & FEATURES</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {proj.highlights.map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-300 p-3.5 rounded-xl bg-space-950/60 border border-slate-800/90"
                    >
                      <CheckCircle2 className="w-4 h-4 text-neon-cyan shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack Tags */}
              <div className="pt-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold mb-2 flex items-center space-x-1.5">
                  <Code2 className="w-4 h-4 text-neon-cyan" />
                  <span>TECHNOLOGIES & TOOLS</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {proj.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 rounded-xl bg-space-950 border border-cyan-500/30 text-xs font-mono text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      ) : (
        /* 2. Interactive Sandbox Simulator */
        <div className="p-6 sm:p-10 rounded-3xl bg-space-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl space-y-8 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-neon-cyan uppercase font-bold">
                SANDBOX SIMULATION
              </span>
              <h3 className="text-2xl font-orbitron font-extrabold text-white">
                Live Prototype Simulator
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400 text-xs font-mono text-neon-cyan">
              INTERACTIVE TESTBED
            </span>
          </div>

          {/* SignBridge Gesture Simulation */}
          <div className="space-y-4 p-6 rounded-2xl bg-space-950/80 border border-slate-800">
            <h4 className="text-base font-orbitron font-bold text-white flex items-center space-x-2">
              <span className="text-neon-cyan">01</span>
              <span>Sign Bridge AI &bull; ISL Gesture Inference Simulator</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-space">
              Click any Indian Sign Language (ISL) alphabet to simulate real-time camera landmark detection & inference:
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              {['A', 'B', 'C', 'D', 'E', 'H', 'L', 'O', 'V', 'Z'].map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleTestGesture(letter)}
                  className={`w-11 h-11 rounded-xl font-orbitron font-extrabold text-sm transition-all cursor-pointer flex items-center justify-center ${
                    selectedGesture === letter
                      ? 'bg-neon-cyan text-black shadow-neon-cyan scale-110'
                      : 'bg-space-900 border border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-white'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-space-900 border border-cyan-500/40 space-y-1 font-mono">
              <div className="text-[10px] text-slate-500">INFERENCE TELEMETRY OUTPUT:</div>
              <div className="text-xs sm:text-sm font-bold text-neon-cyan flex items-center space-x-2">
                <Terminal className="w-4 h-4 shrink-0" />
                <span>{simOutput}</span>
              </div>
            </div>
          </div>

          {/* JPED AI Prompt Simulation */}
          <div className="space-y-4 p-6 rounded-2xl bg-space-950/80 border border-slate-800">
            <h4 className="text-base font-orbitron font-bold text-white flex items-center space-x-2">
              <span className="text-neon-cyan">02</span>
              <span>JPED &bull; Adaptive AI Teacher Prompt Simulator</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-space">
              Test the adaptive diagnostic explanation engine on any technical topic:
            </p>

            <form onSubmit={handleJpedTest} className="flex gap-2.5">
              <input
                type="text"
                value={jpedQuery}
                onChange={(e) => setJpedQuery(e.target.value)}
                placeholder="Ask any technical concept..."
                className="flex-1 px-4 py-3 rounded-xl bg-space-900 border border-slate-800 text-white font-space text-xs focus:border-neon-cyan outline-none"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-neon-cyan text-black font-orbitron font-bold text-xs uppercase tracking-wider shadow-neon-cyan cursor-pointer hover:bg-white transition-all flex items-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>EXPLAIN</span>
              </button>
            </form>

            {jpedResponse && (
              <div className="p-5 rounded-xl bg-space-900 border border-cyan-500/40 space-y-2.5 font-space animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs font-mono text-neon-cyan font-bold">
                  <span>CONCEPT: {jpedResponse.concept}</span>
                  <span>{jpedResponse.diagnostic}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {jpedResponse.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
