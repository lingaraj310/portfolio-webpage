import React from 'react';
import { 
  Download, 
  Printer, 
  FileText, 
  CheckCircle2, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Sparkles, 
  ExternalLink, 
  Mail, 
  Rocket, 
  MapPin, 
  Calendar, 
  Phone 
} from 'lucide-react';
import { PROFILE_INFO, EDUCATION_DATA, EXPERIENCE_DATA, HACKATHONS_DATA } from '../../../data/portfolioData';
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
• JPED — Jesus Personalized Education (Adaptive AI + Educational Ecosystem)
  - AI-driven personalized learning platform adapting study plans, explanations, notes, and guidance to every student's cognitive pace.

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
    link.download = `Lingaraj_Resume_2026.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="select-none max-w-6xl mx-auto space-y-8 animate-fade-in font-sans text-slate-800">
      {/* Top Banner with Action Buttons */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-300">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-mono text-[11px] font-semibold tracking-wider uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>CURRICULUM VITAE</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Official Resume
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-light">
            Verified academic credentials, industrial innovation fellowship training, technical mastery & milestone timeline.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-stretch sm:self-auto shrink-0">
          <button
            onClick={handleDownload}
            onMouseEnter={() => sound.playHover()}
            className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-900 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-sky-500/25 cursor-pointer hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume (.pdf)</span>
          </button>

          <button
            onClick={handlePrint}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center justify-center p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-900 transition-all duration-200 cursor-pointer shadow-sm"
            title="Print Resume"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Two-Column Structured Resume Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Sticky Sidebar Card (4 cols) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 p-6 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm transition-all duration-300">
          {/* Profile Photo & Identity */}
          <div className="text-center space-y-3 pb-6 border-b border-slate-200">
            <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden border border-sky-200 bg-slate-50 shadow-lg">
              <img
                src="/avatar.jpg"
                alt="Lingaraj"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80';
                }}
              />
            </div>

            <div>
              <h1 
                className="text-xl font-bold text-slate-900 tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                LINGARAJ
              </h1>
              <p className="text-xs font-semibold text-sky-700 mt-0.5">
                B.E. Computer Science & Engineering
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Kumaraguru College of Technology
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase block text-slate-500">
              CONTACT & PROFILES
            </span>
            <div className="space-y-2 text-xs">
              <a
                href="mailto:lingaraj24bcs151@gmail.com"
                className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 transition-all duration-200"
              >
                <Mail className="w-4 h-4 shrink-0 text-sky-700" />
                <span className="truncate font-medium">lingaraj24bcs151@gmail.com</span>
              </a>

              <a
                href="https://www.linkedin.com/in/lingaraj-v-4a1438328"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-50 border border-slate-200 text-sky-700 font-semibold transition-all duration-200"
              >
                <LinkedinIcon className="w-4 h-4 shrink-0" />
                <span className="truncate">linkedin.com/in/lingaraj-v ↗</span>
              </a>

              <a
                href="https://github.com/lingaraj310"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 font-semibold transition-all duration-200"
              >
                <GithubIcon className="w-4 h-4 shrink-0" />
                <span className="truncate">github.com/lingaraj310 ↗</span>
              </a>

              <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500">
                <MapPin className="w-4 h-4 shrink-0 text-sky-700" />
                <span className="truncate font-medium">Coimbatore, Tamil Nadu, India</span>
              </div>
            </div>
          </div>

          {/* Quick Skills Summary Chips */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase block text-slate-500">
              CORE SKILLS SUMMARY
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                'C / C++', 'Java', 'Flutter', 'Dart', 'React',
                'Computer Vision', 'Machine Learning', 'MySQL', 'Git & GitHub',
                'Rapid Prototyping', 'IoT & Hardware DfAM'
              ].map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-[10px] font-semibold text-slate-600 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Academic Snapshot */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-center shadow-lg">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-700">
              CUMULATIVE CGPA
            </span>
            <div 
              className="text-2xl font-extrabold text-slate-900"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              8.0 / 10.0
            </div>
            <span className="text-[10px] font-mono text-slate-500">
              Kumaraguru College of Technology
            </span>
          </div>
        </aside>

        {/* RIGHT COLUMN: Vertical Timeline */}
        <main className="lg:col-span-8 space-y-6">
          
          {/* Section 1: Professional Innovation Experience */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm space-y-6 transition-all duration-300">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-200">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h3 
                  className="text-base sm:text-lg font-bold uppercase tracking-wide text-slate-900"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Innovation & Professional Experience
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                CURRENT
              </span>
            </div>

            {/* Timeline Item */}
            <div className="relative pl-6 border-l-2 border-sky-200 space-y-3">
              {/* Dot Marker */}
              <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-sky-400 bg-slate-50" />

              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                  <h4 className="text-base font-bold text-slate-900">
                    INNOVATION FORGE TRAINEE
                  </h4>
                  <span className="text-xs font-mono font-semibold text-sky-700">
                    2025 – Present &bull; 20-Week Fellowship
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  FORGE Innovation & Ventures / PRICE ProtoSem
                </p>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 mt-2.5 font-light">
                  Undergoing the 20-week rigorous innovation and venture development fellowship. Spearheading real-world industrial projects across Phygital Retail, Intelligent Commerce, AI & Analytics, IoT Systems, Rapid Hardware-Software Prototyping (CAD, Laser CAM, FDM 3D Printing), and Tech Entrepreneurship.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {['Phygital Retail', 'Hardware-Software Prototyping', 'CAD & DfAM', 'Intelligent IoT', 'Venture Engineering'].map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] font-semibold text-slate-600 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Academic Education Timeline */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm space-y-6 transition-all duration-300">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-200">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 
                  className="text-base sm:text-lg font-bold uppercase tracking-wide text-slate-900"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Academic Background
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                B.E. DEGREE
              </span>
            </div>

            {/* Timeline Item */}
            <div className="relative pl-6 border-l-2 border-sky-200 space-y-3">
              <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-sky-400 bg-slate-50" />

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Bachelor of Engineering (B.E.) — Computer Science & Engineering
                  </h4>
                  <p className="text-xs font-semibold text-sky-700 mt-0.5">
                    Kumaraguru College of Technology, Coimbatore, Tamil Nadu
                  </p>
                </div>
                <div className="text-right font-mono shrink-0">
                  <span className="text-xs font-bold text-sky-700 block">CGPA: 8.0 / 10.0</span>
                  <span className="text-[11px] font-medium text-slate-500">2024 – 2027</span>
                </div>
              </div>

              <ul className="space-y-1.5 pt-2 text-xs sm:text-sm text-slate-600 font-light">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-700" />
                  <span>Core coursework in Data Structures, Object-Oriented Programming, Database Systems, Computer Networks & AI.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-700" />
                  <span>Active member in technical coding clubs, developer communities, and hackathon teams.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Selected Projects */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm space-y-6 transition-all duration-300">
            <div className="flex items-center space-x-2.5 border-b border-slate-200 pb-4">
              <div className="p-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-200">
                <Rocket className="w-4 h-4" />
              </div>
              <h3 
                className="text-base sm:text-lg font-bold uppercase tracking-wide text-slate-900"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Selected Projects & Software Systems
              </h3>
            </div>

            <div className="space-y-4">
              {/* Project 1 */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-slate-900">
                    Sign Bridge AI — Assistive Indian Sign Language Translator
                  </h4>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold bg-sky-50 text-sky-700 border border-sky-200">
                    ACTIVE PROTOTYPE
                  </span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-light">
                  Assistive communication platform converting Indian Sign Language (ISL) gestures into real-time speech and text. Built with Computer Vision, MediaPipe hand landmark extraction, and a high-performance cross-platform Flutter mobile UI.
                </p>
                <div className="text-[11px] font-mono font-semibold text-sky-700">
                  Flutter &bull; Dart &bull; Computer Vision &bull; MediaPipe &bull; TensorFlow Lite
                </div>
              </div>

              {/* Project 2 */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-slate-900">
                    JPED (Jesus Personalized Education) — Adaptive Learning Platform
                  </h4>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold bg-purple-50 text-purple-700 border border-purple-200">
                    RESEARCH CONCEPT
                  </span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-light">
                  AI-driven personalized education ecosystem tailoring learning pathways, mistake analytics, and interactive curriculum roadmaps to each student's cognitive pace and holistic development.
                </p>
                <div className="text-[11px] font-mono font-semibold text-purple-700">
                  Adaptive Learning Algorithms &bull; Cognitive Diagnostic Modeling &bull; React &bull; Node.js
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Hackathons & Competitions */}
          <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-sm space-y-6 transition-all duration-300">
            <div className="flex items-center space-x-2.5 border-b border-slate-200 pb-4">
              <div className="p-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-200">
                <Award className="w-4 h-4" />
              </div>
              <h3 
                className="text-base sm:text-lg font-bold uppercase tracking-wide text-slate-900"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Hackathons & Sprint Arenas
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="block text-sm font-bold text-slate-900">Smart India Hackathon (SIH) 2025</strong>
                <span className="font-mono text-xs text-sky-700 block">Team Leader & Developer &bull; National Level</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="block text-sm font-bold text-slate-900">VERTX 2.0 Hackathon</strong>
                <span className="font-mono text-xs text-sky-700 block">Developer & Presenter &bull; Chennai</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="block text-sm font-bold text-slate-900">CIT Hackathon</strong>
                <span className="font-mono text-xs text-sky-700 block">Participant & Prototype Builder &bull; Coimbatore</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="block text-sm font-bold text-slate-900">KCT Ideathon</strong>
                <span className="font-mono text-xs text-sky-700 block">Ideator & Team Lead &bull; Kumaraguru Campus</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
