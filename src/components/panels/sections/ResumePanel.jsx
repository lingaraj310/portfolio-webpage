import React from 'react';
import { Download, Printer, FileText, CheckCircle2, Award, Briefcase, GraduationCap, Code2, Sparkles, ExternalLink, Mail, Rocket } from 'lucide-react';
import { sound } from '../../../utils/audioEffects';

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

export default function ResumePanel() {
  const handlePrint = () => {
    sound.playSelect();
    window.print();
  };

  const handleDownload = () => {
    sound.playSelect();
    const cvContent = `
=====================================================
LINGARAJ — CURRICULUM VITAE / PROFILE DOSSIER
=====================================================
Student • Computer Science & Engineering
Kumaraguru College of Technology, Coimbatore, India
Email: lingaraj24bcs151@gmail.com
LinkedIn: https://www.linkedin.com/in/lingaraj-v-4a1438328
GitHub: https://github.com/lingaraj310

1. PROFESSIONAL EXPERIENCE & INNOVATION PROGRAMMES
• INNOVATION FORGE TRAINEE — FORGE Innovation & Ventures / PRICE ProtoSem (2025 – Present)
  - 20-week industry-integrated Innovation Engineer Trainee programme.
  - Solving challenges in Phygital Retail, Intelligent Commerce, AI & Analytics, IoT Systems, Rapid Hardware-Software Prototyping, and Tech Entrepreneurship.

2. ACADEMIC BACKGROUND
• Bachelor of Engineering (B.E.) in Computer Science & Engineering
  Kumaraguru College of Technology, Coimbatore (2024 – 2027)
  Current Academic CGPA: 8.0 / 10.0

3. TECHNICAL COMPETENCIES
• Core Languages: C, C++, Java
• Mobile & Web: Flutter, Dart, HTML5, CSS3, React
• Databases & Tools: MySQL, Git, GitHub, VS Code, Linux
• Innovation & AI: Computer Vision, Machine Learning, MediaPipe, Base44 No-Code

4. MAJOR SOFTWARE & INNOVATION PROJECTS
• Sign Bridge AI (Computer Vision + Machine Learning + Flutter)
  - AI-powered assistive communication platform converting Indian Sign Language (ISL) gestures into real-time text and speech.
  - Hand detection, landmark extraction, sentence formation, and animated avatar roadmap.

• JPED — Jesus Personalized Education (Adaptive AI + Educational Ecosystem)
  - AI-driven personalized learning platform adapting study plans, explanations, notes, and guidance to every student's cognitive pace.
  - Inspired by purpose, discipline, compassion, and holistic personal growth.

5. HACKATHONS & SPRINT ARENAS
• Smart India Hackathon (SIH) 2025 (Team Leader & Developer)
• CIT Hackathon, Coimbatore (Participant & Prototype Builder)
• VERTX 2.0 Hackathon, Chennai (Developer & Presenter)
• Ideathon, Kumaraguru College of Technology (Ideator & Team Lead)

=====================================================
`.trim();

    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Lingaraj_CV_2026.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-200 select-none max-w-4xl mx-auto">
      {/* Action Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-3xl bg-space-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-xl">
        <div>
          <div className="flex items-center space-x-2 text-neon-cyan text-xs font-mono mb-1">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
            <span>SECTOR 08 // DUBAI HUB &bull; VERIFIED DOSSIER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white">
            Curriculum Vitae / Resume
          </h2>
        </div>

        <div className="flex items-center space-x-3 self-stretch sm:self-auto">
          <button
            onClick={handleDownload}
            onMouseEnter={() => sound.playHover()}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-neon-cyan text-black font-orbitron font-extrabold text-xs uppercase tracking-wider transition-all shadow-neon-cyan cursor-pointer hover:bg-white"
          >
            <Download className="w-4 h-4" />
            <span>Download CV</span>
          </button>

          <button
            onClick={handlePrint}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center justify-center p-3 rounded-xl bg-space-950 hover:bg-space-850 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Print Resume"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Structured Resume Sheet */}
      <div className="p-6 sm:p-10 rounded-3xl bg-space-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl space-y-8 print:bg-white print:text-black">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-orbitron font-black text-white tracking-wide">
              LINGARAJ
            </h1>
            <p className="text-sm font-space text-cyan-300 font-medium mt-1">
              B.E. Computer Science and Engineering &bull; Kumaraguru College of Technology
            </p>
          </div>

          <div className="flex flex-col gap-1.5 font-mono text-xs text-slate-300 bg-space-950/80 p-3.5 rounded-2xl border border-slate-800">
            <a
              href="mailto:lingaraj24bcs151@gmail.com"
              className="flex items-center space-x-2 text-slate-300 hover:text-neon-cyan transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-neon-cyan" />
              <span>lingaraj24bcs151@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/lingaraj-v-4a1438328"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 text-slate-300 hover:text-neon-cyan transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-neon-cyan" />
              <span>linkedin.com/in/lingaraj-v-4a1438328</span>
            </a>
            <a
              href="https://github.com/lingaraj310"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 text-slate-300 hover:text-neon-cyan transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5 text-neon-cyan" />
              <span>github.com/lingaraj310</span>
            </a>
          </div>
        </div>

        {/* 1. Professional Innovation Experience */}
        <section className="space-y-3">
          <h3 className="text-xs font-mono text-neon-cyan uppercase tracking-wider font-bold flex items-center space-x-2">
            <Briefcase className="w-4 h-4" />
            <span>01 &bull; Professional Innovation Training</span>
          </h3>
          <div className="p-5 rounded-2xl bg-space-950/80 border border-slate-800 space-y-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h4 className="font-orbitron font-bold text-white text-base">
                  INNOVATION FORGE TRAINEE
                </h4>
                <p className="text-xs text-neon-cyan font-mono mt-0.5">
                  FORGE Innovation & Ventures / PRICE ProtoSem
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                2025 – Present &bull; 20-Week Programme
              </span>
            </div>
            <p className="text-xs text-slate-300 font-space leading-relaxed pt-1">
              Selected for the 20-week industry-integrated Innovation Engineer Trainee programme at FORGE, solving real-world challenges across Phygital Retail, AI & Analytics, IoT Systems, Rapid Hardware-Software Prototyping, and Tech Entrepreneurship.
            </p>
          </div>
        </section>

        {/* 2. Academic Foundation */}
        <section className="space-y-3">
          <h3 className="text-xs font-mono text-neon-cyan uppercase tracking-wider font-bold flex items-center space-x-2">
            <GraduationCap className="w-4 h-4" />
            <span>02 &bull; Academic Education</span>
          </h3>
          <div className="p-5 rounded-2xl bg-space-950/80 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h4 className="font-orbitron font-bold text-white text-base">
                Bachelor of Engineering (B.E.) &bull; Computer Science & Engineering
              </h4>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Kumaraguru College of Technology, Coimbatore, Tamil Nadu
              </p>
            </div>
            <div className="text-right font-mono shrink-0">
              <span className="text-xs text-slate-400 block">2024 – 2027 (3rd Year)</span>
              <span className="text-sm font-bold text-amber-400">CGPA: 8.0 / 10.0</span>
            </div>
          </div>
        </section>

        {/* 3. Technical Competencies */}
        <section className="space-y-3">
          <h3 className="text-xs font-mono text-neon-cyan uppercase tracking-wider font-bold flex items-center space-x-2">
            <Code2 className="w-4 h-4" />
            <span>03 &bull; Technical Competencies</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-4 rounded-xl bg-space-950/80 border border-slate-800 space-y-1">
              <span className="text-slate-500 font-bold block">CORE LANGUAGES</span>
              <span className="text-slate-200">C, C++, Java</span>
            </div>
            <div className="p-4 rounded-xl bg-space-950/80 border border-slate-800 space-y-1">
              <span className="text-slate-500 font-bold block">MOBILE & WEB</span>
              <span className="text-slate-200">Flutter, Dart, HTML5, CSS3, React</span>
            </div>
            <div className="p-4 rounded-xl bg-space-950/80 border border-slate-800 space-y-1">
              <span className="text-slate-500 font-bold block">DATABASES & TOOLS</span>
              <span className="text-slate-200">MySQL, Git, GitHub, VS Code, Linux</span>
            </div>
            <div className="p-4 rounded-xl bg-space-950/80 border border-slate-800 space-y-1">
              <span className="text-slate-500 font-bold block">AI & PROTOTYPING</span>
              <span className="text-slate-200">Computer Vision, Machine Learning, Base44</span>
            </div>
          </div>
        </section>

        {/* 4. Major Projects */}
        <section className="space-y-3">
          <h3 className="text-xs font-mono text-neon-cyan uppercase tracking-wider font-bold flex items-center space-x-2">
            <Rocket className="w-4 h-4" />
            <span>04 &bull; Major Software & Innovation Projects</span>
          </h3>
          <div className="space-y-3">
            <div className="p-5 rounded-2xl bg-space-950/80 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-orbitron font-bold text-white text-base">
                  Sign Bridge AI
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-neon-cyan border border-cyan-500/40 font-bold">
                  PROTOTYPE
                </span>
              </div>
              <p className="text-xs text-slate-300 font-space leading-relaxed">
                AI-powered assistive communication platform using Computer Vision and Machine Learning to recognize Indian Sign Language (ISL) gestures in real-time and translate them into text and speech.
              </p>
              <div className="text-[11px] font-mono text-cyan-300">
                Stack: Flutter &bull; Dart &bull; Computer Vision &bull; MediaPipe &bull; TensorFlow Lite
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-space-950/80 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-orbitron font-bold text-white text-base">
                  JPED (Jesus Personalized Education)
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-neon-cyan border border-cyan-500/40 font-bold">
                  CONCEPT
                </span>
              </div>
              <p className="text-xs text-slate-300 font-space leading-relaxed">
                AI-driven personalized educational ecosystem tailoring lessons, study roadmaps, interactive quizzes, mistake guidance, and mentor connections to each student’s unique pace and purpose.
              </p>
              <div className="text-[11px] font-mono text-cyan-300">
                Stack: Adaptive AI Algorithms &bull; Cognitive Diagnostic Modeling &bull; Full-Stack Architecture
              </div>
            </div>
          </div>
        </section>

        {/* 5. Hackathons */}
        <section className="space-y-3">
          <h3 className="text-xs font-mono text-neon-cyan uppercase tracking-wider font-bold flex items-center space-x-2">
            <Award className="w-4 h-4" />
            <span>05 &bull; Hackathons & Innovation Arenas</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-space-950/80 border border-slate-800">
              <strong className="text-white block">Smart India Hackathon (SIH) 2025</strong>
              <span className="text-slate-400">Team Leader & Developer &bull; National Arena</span>
            </div>
            <div className="p-3.5 rounded-xl bg-space-950/80 border border-slate-800">
              <strong className="text-white block">CIT Hackathon</strong>
              <span className="text-slate-400">Participant & Prototype Builder &bull; Coimbatore</span>
            </div>
            <div className="p-3.5 rounded-xl bg-space-950/80 border border-slate-800">
              <strong className="text-white block">VERTX 2.0 Hackathon</strong>
              <span className="text-slate-400">Developer & Presenter &bull; Chennai</span>
            </div>
            <div className="p-3.5 rounded-xl bg-space-950/80 border border-slate-800">
              <strong className="text-white block">Ideathon</strong>
              <span className="text-slate-400">Ideator & Team Lead &bull; KCT</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
