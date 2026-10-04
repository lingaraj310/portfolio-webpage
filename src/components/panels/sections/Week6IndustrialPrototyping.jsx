import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Layers, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Box, 
  Eye, 
  Printer, 
  Scissors, 
  Clock, 
  Weight, 
  Flame, 
  Wind, 
  Thermometer, 
  Zap, 
  Camera, 
  ChevronRight, 
  ChevronLeft, 
  ArrowRight, 
  ArrowLeft, 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Copy, 
  Download,
  ExternalLink,
  Activity,
  Maximize2,
  X,
  AlertTriangle,
  Info,
  BookOpen,
  CheckSquare,
  HelpCircle,
  CornerDownRight,
  Workflow
} from 'lucide-react';
import { sound } from '../../../utils/audioEffects';
import Model3DViewer from './Model3DViewer';

// Complete List of All 16 Figures for Week 6 Portfolio
const FIGURES = [
  {
    num: 'Figure 1',
    src: '/protosem/week-06/img6-rdworks-install.png',
    title: 'Laser Cutter Safety Rules',
    caption: 'Figure 1. Laser cutter safety rules and precautions followed in the Fab Lab.'
  },
  {
    num: 'Figure 2',
    src: '/protosem/week-06/industrial-co2-laser-machine.png',
    title: '1490 CO₂ Laser Specifications',
    caption: 'Figure 2. Technical specifications of the 1490 CO2 laser cutter used in the Fab Lab.'
  },
  {
    num: 'Figure 3',
    src: '/protosem/week-06/fablab-laser-cutting.png',
    title: '2 mm Acrylic Stock Sheet',
    caption: 'Figure 3. Acrylic material selected for the laser cutting and engraving activity.'
  },
  {
    num: 'Figure 4',
    src: '/protosem/week-06/img7-rdworks-kalam-laser.png',
    title: 'Dr. APJ Abdul Kalam Reference Design',
    caption: 'Figure 4. Selected Dr. APJ Abdul Kalam portrait used as the laser-fabrication design.'
  },
  {
    num: 'Figure 5',
    src: '/protosem/week-06/convertio-jpg-to-dxf.png',
    title: 'Convertio JPG-to-DXF Workflow',
    caption: 'Figure 5. JPG-to-DXF conversion using Convertio.'
  },
  {
    num: 'Figure 6',
    src: '/protosem/week-06/img7-rdworks-kalam-laser.png',
    title: 'reaConverter Vector Processing',
    caption: 'Figure 6. JPG-to-DXF conversion using reaConverter.'
  },
  {
    num: 'Figure 7',
    src: '/protosem/week-06/img7-rdworks-kalam-laser.png',
    title: 'Cleaned and Scaled 50×50 mm Design',
    caption: 'Figure 7. Cleaned and scaled design prepared in RDWorks V8.'
  },
  {
    num: 'Figure 8',
    src: '/protosem/week-06/img7-rdworks-kalam-laser.png',
    title: 'RDWorks Colour-Coded Layer Layout',
    caption: 'Figure 8. Final RDWorks layout showing the 50 × 50 mm design and colour-coded processing layers.'
  },
  {
    num: 'Figure 9',
    src: '/protosem/week-06/img7-rdworks-kalam-laser.png',
    title: 'RDWorks Cutting Layer Settings',
    caption: 'Figure 9. RDWorks cutting-layer parameters.'
  },
  {
    num: 'Figure 10',
    src: '/protosem/week-06/img7-rdworks-kalam-laser.png',
    title: 'RDWorks Engraving Layer Settings',
    caption: 'Figure 10. RDWorks engraving-layer parameters.'
  },
  {
    num: 'Figure 11',
    src: '/protosem/week-06/fablab-laser-cutting.png',
    title: '1490 CO₂ Laser In Operation',
    caption: 'Figure 11. Laser-cutting machine being operated during the fabrication process.'
  },
  {
    num: 'Figure 12',
    src: '/protosem/week-06/img7-rdworks-kalam-laser.png',
    title: 'Completed Kalam Engraving & Cut Design',
    caption: 'Figure 12. Completed Dr. APJ Abdul Kalam laser engraving and cutting design.'
  },
  {
    num: 'Figure 13',
    src: '/protosem/week-06/img3-fusion-design1.png',
    title: 'Fusion 360 Phone Cover CAD Model',
    caption: 'Figure 13. OPPO A3x 5G mobile-cover model designed in Autodesk Fusion 360.'
  },
  {
    num: 'Figure 14',
    src: '/protosem/week-06/img8-bambu-oppo-case.png',
    title: 'Bambu Studio Slicing Environment',
    caption: 'Figure 14. Bambu Studio slicing environment used to prepare the mobile-cover print.'
  },
  {
    num: 'Figure 15',
    src: '/protosem/week-06/bambu-3d-printer-operation.jpg',
    title: 'Bambu Lab 3D Printer In Active Operation',
    caption: 'Figure 15. Bambu Lab 3D printer actively fabricating the custom mobile phone case.'
  },
  {
    num: 'Figure 16',
    src: '/protosem/week-06/oppo-case-physical-output.png',
    title: 'Final 3D Printed OPPO A3x 5G Cover',
    caption: 'Figure 16. Final PLA 3D-printed OPPO A3x 5G mobile phone cover.'
  }
];

// Product Spotlight 4 Technical Hotspots for OPPO A3x 5G Case
const PRODUCT_HOTSPOTS = [
  {
    id: 1,
    num: '01',
    label: 'Camera Island Relief Cutout',
    spec: '2.50 mm Chamfered Perimeter',
    desc: 'Precision reverse-engineered dual lens aperture ensuring zero optical vignetting and flush flash clearance.',
    top: '22%',
    left: '32%'
  },
  {
    id: 2,
    num: '02',
    label: 'Embossed Tactile Typography',
    spec: '0.80 mm Positive Relief Projection',
    desc: 'Parametrically projected vector text "LINGARAJ" and Tamil motto ("முயற்சி திருவினையாக்கும்") providing grip texture.',
    top: '52%',
    left: '48%'
  },
  {
    id: 3,
    num: '03',
    label: 'Interference Snap-Fit Retention Lip',
    spec: '0.60 mm Elastic Undercut (±0.10 mm)',
    desc: 'Internal perimeter lip calibrated for zero-rattle phone retention with repeatable snap installation and removal.',
    top: '38%',
    left: '78%'
  },
  {
    id: 4,
    num: '04',
    label: 'Structural Shell & Core Density',
    spec: '1.80 mm Uniform Wall & 15% Gyroid',
    desc: '3 continuous perimeter loops with isotropic impact resistance, textured bottom plate finish, and port cutouts.',
    top: '80%',
    left: '50%'
  }
];

export default function Week6IndustrialPrototyping({ onBack }) {
  const [activeNav, setActiveNav] = useState('intro');
  const [activeHotspot, setActiveHotspot] = useState(PRODUCT_HOTSPOTS[1]);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // ScrollSpy to highlight sticky nav rail
  useEffect(() => {
    // Scroll the modal main container to the very top immediately
    const mainScroll = document.querySelector('main');
    if (mainScroll) {
      mainScroll.scrollTo({ top: 0, behavior: 'instant' });
    }
    window.scrollTo({ top: 0, behavior: 'instant' });

    const handleScroll = () => {
      const sections = [
        'intro', 'workflow', 
        'laser-safety', 'laser-machine', 'laser-materials', 'laser-design', 
        'laser-dxf', 'laser-prep', 'laser-nesting', 'laser-settings', 
        'laser-process', 'laser-result', 'laser-problems', 'laser-reflection', 'laser-files',
        'print-details', 'print-slicer', 'print-capabilities', 'print-why-additive',
        'print-stl', 'print-model', 'print-settings', 'print-metrics', 
        'print-process', 'print-result', 'print-problems', 'print-reflection', 'print-files',
        'final-reflection', 'references', 'summary-dashboard'
      ];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const elem = document.getElementById(sectionId);
        if (elem) {
          const top = elem.offsetTop;
          const height = elem.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveNav(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    sound.playSelect();
    setActiveNav(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openLightbox = (figIndex) => {
    sound.playHover();
    setLightboxIndex(figIndex);
    setLightboxPhoto(FIGURES[figIndex]);
  };

  const nextLightbox = () => {
    sound.playSelect();
    const nextIdx = (lightboxIndex + 1) % FIGURES.length;
    setLightboxIndex(nextIdx);
    setLightboxPhoto(FIGURES[nextIdx]);
  };

  const prevLightbox = () => {
    sound.playSelect();
    const prevIdx = (lightboxIndex - 1 + FIGURES.length) % FIGURES.length;
    setLightboxIndex(prevIdx);
    setLightboxPhoto(FIGURES[prevIdx]);
  };

  return (
    <div className="week6-portfolio select-none font-sans text-slate-900 space-y-10 animate-fade-in pb-16">
      
      {/* Top Header & Breadcrumbs */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-lg">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-500/20 border border-sky-400/30 transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>&larr; BACK TO PROTOSEM ROADMAP</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <span>PROTOSEM PHASE 02</span>
          <span>&bull;</span>
          <span className="text-sky-700 font-bold">WEEK 06 TECHNICAL DOSSIER</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO / INTRODUCTION SECTION */}
      {/* ========================================================================= */}
      <section 
        id="intro" 
        className="relative p-6 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-sm backdrop-blur-xl overflow-hidden space-y-8"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-mono text-[11px] font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>WEEK 06 &bull; INDUSTRIAL-READY PROTOTYPING</span>
          </div>

          <h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Industrial-Ready Prototyping
          </h1>

          <div className="text-base sm:text-lg font-medium text-sky-700 font-mono">
            “From Digital Design to Physical Prototype”
          </div>

          <p className="text-base sm:text-lg leading-relaxed max-w-4xl text-slate-700 font-normal">
            This week focused on practical digital fabrication using Fusion 360, laser cutting and 3D printing. The activities involved preparing digital designs, converting and preparing fabrication files, operating fabrication equipment, and producing functional physical prototypes. The week provided practical exposure to both subtractive and additive manufacturing processes.
          </p>
        </div>

        {/* 3 Visual Workflow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-all space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">1. CAD Design</h3>
            <p className="text-base text-slate-800 font-normal leading-relaxed leading-relaxed font-normal">
              Parametric 2D sketching, geometric constraints, solid modeling and tangible clay prototyping for ergonomic evaluation.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-cyan-500/40 transition-all space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-200 flex items-center justify-center">
              <Scissors className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">2. Laser Cutting</h3>
            <p className="text-base text-slate-800 font-normal leading-relaxed leading-relaxed font-normal">
              Subtractive CAM vector conversion, RDWorks layer nesting, and dual-operation engraving & cutting on 2 mm acrylic.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500/40 transition-all space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">3. 3D Printing</h3>
            <p className="text-base text-slate-800 font-normal leading-relaxed leading-relaxed font-normal">
              Additive FDM slicing in Bambu Studio, G-code toolpath validation, and rapid production of a custom OPPO A3x 5G case.
            </p>
          </div>
        </div>

        {/* Small Timeline Bar & CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-4 text-slate-600">
            <div><strong className="text-sky-700">26 Sep 2026:</strong> CAD & Clay Prototyping</div>
            <span className="hidden sm:inline text-slate-600">&bull;</span>
            <div><strong className="text-cyan-700">28 Sep 2026:</strong> Laser Cutting</div>
            <span className="hidden sm:inline text-slate-600">&bull;</span>
            <div><strong className="text-emerald-700">29 Sep 2026:</strong> 3D Printing</div>
          </div>

          <button
            onClick={() => scrollToSection('laser-safety')}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-900 font-bold transition-all shadow-md cursor-pointer shrink-0"
          >
            Explore My Fabrication Journey &rarr;
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. WEEK 6 WORKFLOW SECTION */}
      {/* ========================================================================= */}
      <section 
        id="workflow" 
        className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 backdrop-blur-xl"
      >
        <div className="space-y-1 border-b border-slate-200 pb-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-sky-700 uppercase">
            <Workflow className="w-4 h-4" />
            <span>FABRICATION PIPELINE ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            End-to-End Digital Fabrication Workflow
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {[
            { step: '01', title: 'IDEA', desc: 'Concept definition & user requirement specs' },
            { step: '02', title: 'CAD DESIGN', desc: 'Parametric 3D solid modeling in Fusion 360' },
            { step: '03', title: 'FILE PREPARATION', desc: 'Vector DXF conversion & STL meshing' },
            { step: '04', title: 'MACHINE SETUP', desc: 'RDWorks layer CAM & Bambu Studio slicing' },
            { step: '05', title: 'FABRICATION', desc: 'Laser ablation cutting & FDM layer extrusion' },
            { step: '06', title: 'FINAL PROTOTYPE', desc: 'Dimensional inspection & physical phone fit test' }
          ].map((st, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-all flex flex-col justify-between space-y-2">
              <span className="font-mono text-xs font-bold text-sky-700">STAGE {st.step}</span>
              <div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">{st.title}</h4>
                <p className="text-[11px] text-slate-500 font-normal mt-1">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PRE-FABRICATION — CAD MODELING & TANGIBLE CLAY PROTOTYPING SHOWCASE */}
      {/* ========================================================================= */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-1 border-b border-slate-200 pb-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-sky-700 uppercase">
            <Cpu className="w-4 h-4" />
            <span>DIGITAL CAD MODELING &amp; TANGIBLE PROTOTYPING</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Parametric CAD Design &amp; Physical Clay Form Study
          </h2>
          <p className="text-base sm:text-lg text-slate-800 font-normal leading-relaxed font-normal">
            Before digital manufacturing, digital parametric models were created in Autodesk Fusion 360 along with physical clay tactile mockups to validate spatial dimensions, grip ergonomics, and structural form.
          </p>
        </div>

        {/* 5-Card Media Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          
          {/* 1. Fusion Interface */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="rounded-lg overflow-hidden border border-slate-200 bg-white h-48 flex items-center justify-center">
              <img 
                src="/protosem/week-06/img1-fusion-interface.png" 
                alt="Fusion 360 Interface" 
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-sky-700 uppercase">AUTODESK FUSION 360</span>
              <h4 className="text-xs font-bold text-slate-900 mt-0.5">Workspace Setup &amp; Cloud CAM</h4>
              <p className="text-[11px] text-slate-500 mt-1">Parametric modeling environment, units calibration, and component hierarchy.</p>
            </div>
          </div>

          {/* 2. Sketch Tools */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="rounded-lg overflow-hidden border border-slate-200 bg-white h-48 flex items-center justify-center">
              <img 
                src="/protosem/week-06/img2-sketch-tools.png" 
                alt="2D Parametric Sketching Tools" 
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-sky-700 uppercase">2D PARAMETRIC CAM</span>
              <h4 className="text-xs font-bold text-slate-900 mt-0.5">Sketch Tools &amp; Geometric Constraints</h4>
              <p className="text-[11px] text-slate-500 mt-1">Tangent arcs, dimensional fillets, chamfer radii, and profile constraints.</p>
            </div>
          </div>

          {/* 3. Fusion Design 1 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="rounded-lg overflow-hidden border border-slate-200 bg-white h-48 flex items-center justify-center">
              <img 
                src="/protosem/week-06/img3-fusion-design1.png" 
                alt="3D Solid Model Design 1" 
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-sky-700 uppercase">3D SOLID MODELING</span>
              <h4 className="text-xs font-bold text-slate-900 mt-0.5">OPPO A3x 5G Parametric Enclosure</h4>
              <p className="text-[11px] text-slate-500 mt-1">1.80 mm uniform wall thickness, perimeter snap-fit lips, and port clearances.</p>
            </div>
          </div>

          {/* 4. Fusion Design 2 */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
            <div className="rounded-lg overflow-hidden border border-slate-200 bg-white h-48 flex items-center justify-center">
              <img 
                src="/protosem/week-06/img4-fusion-design2.png" 
                alt="3D Solid Model Design 2" 
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-sky-700 uppercase">FEATURE MODELING</span>
              <h4 className="text-xs font-bold text-slate-900 mt-0.5">Camera Island Relief &amp; Cutouts</h4>
              <p className="text-[11px] text-slate-500 mt-1">2.50 mm chamfered lens protection with flush optical clearance.</p>
            </div>
          </div>

          {/* 5. Physical Clay Prototype */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between sm:col-span-2 lg:col-span-2">
            <div 
              onClick={() => {
                sound.playHover();
                setLightboxPhoto({
                  num: 'Clay Form Study',
                  src: '/protosem/week-06/img5-clay-prototype.png',
                  title: 'Physical Tangible Clay Prototype',
                  caption: 'Tangible clay prototype modeled during Week 06 for physical spatial boundaries and volumetric ergonomic evaluation.'
                });
              }}
              className="rounded-lg overflow-hidden border border-slate-200 bg-white h-60 flex items-center justify-center cursor-pointer group"
            >
              <img 
                src="/protosem/week-06/img5-clay-prototype.png" 
                alt="Physical Tangible Clay Prototype" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-700 uppercase">TANGIBLE PHYSICAL FORM STUDY</span>
              <h4 className="text-xs font-bold text-slate-900 mt-0.5">Rapid Clay Prototype &amp; Physical Geometry Validation</h4>
              <p className="text-[11px] text-slate-500 mt-1">Tangible clay mockup modeled to evaluate tactile feel, spatial boundaries, and volumetric ergonomics before finalizing digital CAM parameters.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* PAGE 1 — LASER CUTTING (SECTION 01) */}
      {/* ========================================================================= */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50 border border-cyan-200">
          <div className="p-3 rounded-xl bg-cyan-100 text-cyan-700 border border-cyan-200">
            <Scissors className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-700">PART 01</span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              PAGE 1 — Subtractive Manufacturing: Laser Cutting & Engraving
            </h2>
          </div>
        </div>

        {/* SECTION 1 — LAB SAFETY & SAFETY RULES */}
        <section id="laser-safety" className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 backdrop-blur-xl">
          <div className="space-y-1 border-b border-slate-200 pb-4">
            <span className="text-sm font-mono font-bold text-cyan-700">SECTION 1</span>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              1. Lab Safety & Safety Rules
            </h3>
            <p className="text-base sm:text-lg text-slate-800 font-normal leading-relaxed font-normal">
              Laser cutting was carried out using a CO₂ laser cutter in the Fab Lab environment. Since laser cutting involves high-temperature laser energy, moving machine components, fumes, and fire risks, appropriate safety practices were followed during the activity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h4 className="text-sm font-mono font-bold text-cyan-700 uppercase flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-700" /> Laser Safety
                </h4>
                <ul className="text-base text-slate-800 font-normal leading-relaxed space-y-1 list-disc pl-4 font-normal">
                  <li>Safety goggles were used during the laser-cutting activity.</li>
                  <li>Gloves were used while handling the material and fabricated part.</li>
                  <li>The machine was operated according to the laboratory's safety requirements.</li>
                  <li>The laser cutter was not left unattended during operation.</li>
                  <li>The machine enclosure/door should remain closed during operation.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h4 className="text-sm font-mono font-bold text-cyan-700 uppercase flex items-center gap-2">
                  <Wind className="w-4 h-4 text-cyan-700" /> Exhaust / Blower System
                </h4>
                <p className="text-base text-slate-800 font-normal leading-relaxed leading-relaxed font-normal">
                  The laser-cutting process can generate smoke and fumes depending on the material. The machine's ventilation/blower system is intended to remove these fumes from the cutting area.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h4 className="text-sm font-mono font-bold text-cyan-700 uppercase flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-cyan-700" /> Chiller
                </h4>
                <p className="text-base text-slate-800 font-normal leading-relaxed leading-relaxed font-normal">
                  The laser tube requires cooling during operation. The laboratory safety instructions specify that the blower and chiller should be switched on while the machine is running.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <h4 className="text-sm font-mono font-bold text-cyan-700 uppercase flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-700" /> Earthing & Air Assist
                </h4>
                <p className="text-base text-slate-800 font-normal leading-relaxed leading-relaxed font-normal">
                  Proper electrical grounding/earthing reduces electrical hazards and supports safe operation. Air assist directs airflow toward the cutting area and can support cleaner cutting while reducing the effect of smoke and heat around the laser spot.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-sm font-mono font-bold text-cyan-700 uppercase flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-cyan-700" /> General Machine Safety
                </h4>
                <ul className="text-base text-slate-800 font-normal leading-relaxed space-y-1.5 list-disc pl-4 font-normal">
                  <li>Use only authorized materials.</li>
                  <li>Use proper machine settings.</li>
                  <li>Keep the machine door closed during operation.</li>
                  <li>Do not leave the laser cutter unattended.</li>
                  <li>Do not switch the machine off directly while it is operating.</li>
                  <li>Report damaged materials or missing tools.</li>
                  <li>Clean the work area after use.</li>
                  <li>Ask the technical team when unsure about machine operation.</li>
                  <li><strong>Safety equipment personally used:</strong> Safety goggles and gloves.</li>
                </ul>
              </div>

              {/* Banned Materials Warning Card */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 space-y-1 text-xs">
                <div className="font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700" /> PROHIBITED FAB LAB MATERIALS WARNING
                </div>
                <p className="font-normal text-slate-600">
                  Never cut PVC, vinyl, or chlorinated polymers in the CO₂ laser as they release lethal chlorine gas and corrosive hydrochloric acid.
                </p>
              </div>

              {/* Figure 1 Image */}
              <div 
                onClick={() => openLightbox(0)}
                className="group relative rounded-xl overflow-hidden border border-white/15 bg-slate-50 cursor-pointer shadow-md"
              >
                <img src={FIGURES[0].src} alt={FIGURES[0].title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-sm sm:text-base font-sans text-slate-700 font-medium">
                  {FIGURES[0].caption}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — MACHINE DETAILS */}
        <section id="laser-machine" className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 backdrop-blur-xl">
          <div className="space-y-1 border-b border-slate-200 pb-4">
            <span className="text-sm font-mono font-bold text-cyan-700">SECTION 2</span>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              2. Machine Details: 1490 CO₂ Laser Cutter
            </h3>
            <p className="text-base sm:text-lg text-slate-800 font-normal leading-relaxed font-normal">
              Note: The machine specifications below were obtained from the Fab Lab machine information provided during the activity. The manufacturer/brand was not identified, so it is not guessed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 overflow-x-auto">
              <table className="w-full text-sm sm:text-base text-left border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-50 text-cyan-700 font-mono">
                  <tr>
                    <th className="p-3.5 text-sm sm:text-base border-b border-slate-200">Parameter</th>
                    <th className="p-3.5 text-sm sm:text-base border-b border-slate-200">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-600 font-mono">
                  <tr><td className="p-3.5 text-slate-800 font-semibold text-slate-900">Make / Brand</td><td className="p-3.5 text-slate-800 text-slate-500">Not specified</td></tr>
                  <tr><td className="p-3.5 text-slate-800 font-semibold text-slate-900">Model</td><td className="p-3.5 text-slate-800 text-cyan-600 font-bold">1490 CO₂ Laser</td></tr>
                  <tr><td className="p-3.5 text-slate-800 font-semibold text-slate-900">Working / Bed Area</td><td className="p-3">1300 × 900 mm</td></tr>
                  <tr><td className="p-3.5 text-slate-800 font-semibold text-slate-900">Laser Tube Power</td><td className="p-3">150 W</td></tr>
                  <tr><td className="p-3.5 text-slate-800 font-semibold text-slate-900">Machine Power</td><td className="p-3">1000 W</td></tr>
                  <tr><td className="p-3.5 text-slate-800 font-semibold text-slate-900">Cutting Speed – machine spec</td><td className="p-3">25 m/min</td></tr>
                  <tr><td className="p-3.5 text-slate-800 font-semibold text-slate-900">Engraving Speed – machine spec</td><td className="p-3">55 m/min</td></tr>
                  <tr><td className="p-3.5 text-slate-800 font-semibold text-slate-900">Accuracy</td><td className="p-3">0.1 mm</td></tr>
                  <tr><td className="p-3.5 text-slate-800 font-semibold text-slate-900">Working Temperature</td><td className="p-3">0°C – 40°C</td></tr>
                  <tr><td className="p-3.5 text-slate-800 font-semibold text-slate-900">Blowing System</td><td className="p-3">Lower Blowing System</td></tr>
                  <tr><td className="p-3.5 text-slate-800 font-semibold text-slate-900">Control Software</td><td className="p-3.5 text-slate-800 text-cyan-600 font-bold">RDWorks V8</td></tr>
                  <tr><td className="p-3.5 text-slate-800 font-semibold text-slate-900">Material Capability</td><td className="p-3">Acrylic, plywood, MDF, foam board, cardboard, paper</td></tr>
                </tbody>
              </table>
            </div>

            <div className="lg:col-span-5">
              <div 
                onClick={() => openLightbox(1)}
                className="group relative rounded-xl overflow-hidden border border-white/15 bg-slate-50 cursor-pointer shadow-md"
              >
                <img src={FIGURES[1].src} alt={FIGURES[1].title} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-3 bg-slate-50 border-t border-slate-200 text-sm sm:text-base font-sans text-slate-700 font-medium">
                  {FIGURES[1].caption}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 & 4 — MATERIALS USED & SELECTED DESIGN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SECTION 3: MATERIALS USED */}
          <section id="laser-materials" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 backdrop-blur-xl">
            <div className="space-y-1 border-b border-slate-200 pb-3">
              <span className="text-sm font-mono font-bold text-cyan-700">SECTION 3</span>
              <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                3. Materials Used
              </h3>
            </div>

            <table className="w-full text-sm sm:text-base text-left border border-slate-200 rounded-xl overflow-hidden font-mono">
              <thead className="bg-slate-50 text-cyan-700">
                <tr><th className="p-3.5 text-sm sm:text-base text-sm">Parameter</th><th className="p-3.5 text-sm sm:text-base text-sm">Details</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-600">
                <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Material</td><td className="p-3.5 text-slate-800 text-slate-800 text-cyan-600 font-bold">Acrylic</td></tr>
                <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Thickness</td><td className="p-3.5 text-slate-800 text-slate-800 font-bold text-slate-900">2 mm</td></tr>
                <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Source</td><td className="p-2.5">Fab Lab</td></tr>
                <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Fabrication Process</td><td className="p-2.5">Laser cutting + engraving</td></tr>
              </tbody>
            </table>

            <p className="text-base text-slate-800 font-normal leading-relaxed leading-relaxed font-normal">
              A 2 mm acrylic sheet was selected for the fabrication activity. Acrylic is suitable for laser processing and allows both cutting and engraving operations.
            </p>

            <div 
              onClick={() => openLightbox(2)}
              className="group relative rounded-xl overflow-hidden border border-white/15 bg-slate-50 cursor-pointer shadow-md"
            >
              <img src={FIGURES[2].src} alt={FIGURES[2].title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-2 bg-slate-50 border-t border-slate-200 text-sm sm:text-base font-sans text-slate-700 font-medium">
                {FIGURES[2].caption}
              </div>
            </div>
          </section>

          {/* SECTION 4: SELECTED DESIGN / IMAGE */}
          <section id="laser-design" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 backdrop-blur-xl">
            <div className="space-y-1 border-b border-slate-200 pb-3">
              <span className="text-sm font-mono font-bold text-cyan-700">SECTION 4</span>
              <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                4. Selected Design / Image
              </h3>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1">
              <div className="text-cyan-700 font-bold">Selected Design:</div>
              <div className="text-slate-900 font-bold text-sm">Dr. APJ Abdul Kalam portrait with text “Dr. APJ ABDUL KALAM”</div>
              <div className="text-slate-500 text-[11px]">Original Reference Source: Google Images</div>
            </div>

            <p className="text-base text-slate-800 font-normal leading-relaxed leading-relaxed font-normal">
              <strong>Reason for Selection:</strong> The portrait was selected because it contains both a recognizable grayscale image and text, making it suitable for demonstrating laser engraving and cutting in a single fabrication workflow. It also provides a clear way to observe the effect of different RDWorks processing layers.
            </p>

            <div 
              onClick={() => openLightbox(3)}
              className="group relative rounded-xl overflow-hidden border border-white/15 bg-slate-50 cursor-pointer shadow-md"
            >
              <img src={FIGURES[3].src} alt={FIGURES[3].title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-2 bg-slate-50 border-t border-slate-200 text-sm sm:text-base font-sans text-slate-700 font-medium">
                {FIGURES[3].caption}
              </div>
            </div>
          </section>
        </div>

        {/* SECTION 5 — IMAGE-TO-DXF CONVERSION */}
        <section id="laser-dxf" className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 backdrop-blur-xl">
          <div className="space-y-1 border-b border-slate-200 pb-4">
            <span className="text-sm font-mono font-bold text-cyan-700">SECTION 5</span>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              5. Image-to-DXF Conversion
            </h3>
            <p className="text-base sm:text-lg text-slate-800 font-normal leading-relaxed font-normal">
              The selected image was converted into a DXF-compatible vector design before being prepared for laser fabrication.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-sm font-mono font-bold text-cyan-700 uppercase">Conversion Process</span>
                <ol className="text-base text-slate-800 font-normal leading-relaxed space-y-1.5 list-decimal pl-4 font-normal">
                  <li>The APJ Abdul Kalam JPG image was selected.</li>
                  <li>The image was uploaded to online conversion tools (<strong>Convertio</strong> &amp; <strong>reaConverter</strong>).</li>
                  <li>The image was converted into DXF/vector geometry.</li>
                  <li>The converted DXF file was imported into RDWorks V8.</li>
                  <li>The geometry was inspected for unwanted or duplicate lines.</li>
                  <li>Unnecessary geometry was removed.</li>
                  <li>The design was resized to the required final dimensions (50 × 50 mm).</li>
                </ol>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-sm font-mono font-bold text-cyan-700 uppercase">Important Quality Checklist</span>
                <div className="space-y-1.5 text-sm text-slate-800 font-normal leading-relaxed">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" /> Select the correct high-contrast image.</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" /> Convert JPG raster information into vector/DXF geometry.</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" /> Check the converted geometry thoroughly.</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" /> Remove duplicate and unwanted lines.</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" /> Verify the design before machining.</div>
                </div>
              </div>
            </div>

            {/* Convertio Screenshot Card */}
            <div className="lg:col-span-5 space-y-3">
              <div 
                onClick={() => openLightbox(4)}
                className="group relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm cursor-pointer"
              >
                <img 
                  src="/protosem/week-06/convertio-jpg-to-dxf.png" 
                  alt="Convertio JPG to DXF Converter" 
                  className="w-full h-56 object-contain bg-slate-50 p-2 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-3 bg-slate-50 border-t border-slate-200 text-sm sm:text-base font-sans text-slate-700 font-medium">
                  <strong>Figure 5.</strong> Convertio online raster-to-vector engine converting Dr. APJ Abdul Kalam portrait into DXF format.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 & 7 — FILE PREPARATION & NESTING IN RDWORKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SECTION 6: FILE PREPARATION */}
          <section id="laser-prep" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 backdrop-blur-xl">
            <div className="space-y-1 border-b border-slate-200 pb-3">
              <span className="text-sm font-mono font-bold text-cyan-700">SECTION 6</span>
              <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                6. File Preparation
              </h3>
            </div>

            <div className="space-y-2 text-sm text-slate-800 font-normal leading-relaxed">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block font-bold">Vector Cleaning:</strong>
                Unwanted and duplicate lines were removed from the converted geometry.
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block font-bold">Scaling to 50 mm × 50 mm:</strong>
                The design was resized to the final required dimensions: 50 mm × 50 mm.
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block font-bold">Closed Paths & Verification:</strong>
                The geometry was inspected and verified in RDWorks preview before sending the job to the machine.
              </div>
            </div>

            <div 
              onClick={() => openLightbox(6)}
              className="group relative rounded-xl overflow-hidden border border-white/15 bg-slate-50 cursor-pointer shadow-md"
            >
              <img src={FIGURES[6].src} alt={FIGURES[6].title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-2 bg-slate-50 border-t border-slate-200 text-sm sm:text-base font-sans text-slate-700 font-medium">
                {FIGURES[6].caption}
              </div>
            </div>
          </section>

          {/* SECTION 7: NESTING & LAYOUT IN RDWORKS */}
          <section id="laser-nesting" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 backdrop-blur-xl">
            <div className="space-y-1 border-b border-slate-200 pb-3">
              <span className="text-sm font-mono font-bold text-cyan-700">SECTION 7</span>
              <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                7. Nesting & Layout in RDWorks
              </h3>
            </div>

            <table className="w-full text-sm sm:text-base text-left border border-slate-200 rounded-xl overflow-hidden font-mono">
              <thead className="bg-slate-50 text-cyan-700">
                <tr><th className="p-3.5 text-sm sm:text-base text-sm">Colour</th><th className="p-3.5 text-sm sm:text-base text-sm">Operation</th><th className="p-3.5 text-sm sm:text-base text-sm">Purpose</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-600">
                <tr><td className="p-3.5 text-slate-800 text-slate-800 font-bold text-slate-900 flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-slate-50 border border-white/40" /> Black</td><td className="p-3.5 text-slate-800 text-slate-800 font-bold text-amber-600">Cut</td><td className="p-2.5">Outer boundary cut</td></tr>
                <tr><td className="p-3.5 text-slate-800 text-slate-800 font-bold text-slate-900 flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-blue-500" /> Blue</td><td className="p-3.5 text-slate-800 text-slate-800 font-bold text-cyan-600">Engrave / Scan</td><td className="p-2.5">Portrait & text scan</td></tr>
              </tbody>
            </table>

            <p className="text-base text-slate-800 font-normal leading-relaxed leading-relaxed font-normal">
              Final Design Size: <strong>50 mm × 50 mm</strong>. The black layer was assigned to cutting, while the blue layer was assigned to engraving/scan operation.
            </p>

            <div 
              onClick={() => openLightbox(7)}
              className="group relative rounded-xl overflow-hidden border border-white/15 bg-slate-50 cursor-pointer shadow-md"
            >
              <img src={FIGURES[7].src} alt={FIGURES[7].title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-2 bg-slate-50 border-t border-slate-200 text-sm sm:text-base font-sans text-slate-700 font-medium">
                {FIGURES[7].caption}
              </div>
            </div>
          </section>
        </div>

        {/* SECTION 8 — FINAL MACHINE SETTINGS */}
        <section id="laser-settings" className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 backdrop-blur-xl">
          <div className="space-y-1 border-b border-slate-200 pb-4">
            <span className="text-sm font-mono font-bold text-cyan-700">SECTION 8</span>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              8. Final Machine Settings (RDWorks Layer Parameters)
            </h3>
            <p className="text-base sm:text-lg text-slate-800 font-normal leading-relaxed font-normal">
              The following values are taken from the actual RDWorks Layer Parameter settings used for the fabrication. Frequency was not visible in the supplied RDWorks screenshots, so it is intentionally recorded as “Not displayed/specified” rather than guessed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* TABLE 1 — CUTTING SETTINGS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-600 uppercase flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-50 border border-white/40" />
                  TABLE 1 — CUTTING SETTINGS (BLACK LAYER)
                </span>
              </div>
              <table className="w-full text-sm sm:text-base text-left border border-slate-200 rounded-xl overflow-hidden font-mono">
                <thead className="bg-slate-50 text-amber-700">
                  <tr><th className="p-3.5 text-sm sm:text-base text-sm">Parameter</th><th className="p-3.5 text-sm sm:text-base text-sm">Actual Setting</th></tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-600">
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Material</td><td className="p-2">2 mm Acrylic</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Operation</td><td className="p-3.5 text-slate-800 text-slate-800 text-amber-600 font-bold">Cut</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Layer Colour</td><td className="p-2">Black</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Speed</td><td className="p-3.5 text-slate-800 text-slate-800 font-bold text-slate-900">100 mm/s</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Minimum Power</td><td className="p-2">30%</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Maximum Power</td><td className="p-2">30%</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Passes / Repeat</td><td className="p-2">1</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Blowing</td><td className="p-2">Yes</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Laser Through Mode</td><td className="p-3.5 text-slate-800 text-slate-800 text-emerald-700">Enabled</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Frequency</td><td className="p-3.5 text-slate-800 text-slate-800 text-slate-500">Not displayed/specified</td></tr>
                </tbody>
              </table>
            </div>

            {/* TABLE 2 — ENGRAVING SETTINGS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-600 uppercase flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
                  TABLE 2 — ENGRAVING SETTINGS (BLUE LAYER)
                </span>
              </div>
              <table className="w-full text-sm sm:text-base text-left border border-slate-200 rounded-xl overflow-hidden font-mono">
                <thead className="bg-slate-50 text-cyan-700">
                  <tr><th className="p-3.5 text-sm sm:text-base text-sm">Parameter</th><th className="p-3.5 text-sm sm:text-base text-sm">Actual Setting</th></tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-600">
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Material</td><td className="p-2">2 mm Acrylic</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Operation</td><td className="p-3.5 text-slate-800 text-slate-800 text-cyan-600 font-bold">Scan / Engrave</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Layer Colour</td><td className="p-2">Blue</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Speed</td><td className="p-3.5 text-slate-800 text-slate-800 font-bold text-slate-900">100 mm/s</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Minimum Power</td><td className="p-2">30%</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Maximum Power</td><td className="p-2">30%</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Passes / Repeat</td><td className="p-2">1</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Blowing</td><td className="p-2">Yes</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Scan Mode</td><td className="p-2">X_swing</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Interval</td><td className="p-2">0.1000 mm</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Overstriking</td><td className="p-2">Un-process</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Ramp Length</td><td className="p-2">0 mm</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Frequency</td><td className="p-3.5 text-slate-800 text-slate-800 text-slate-500">Not displayed/specified</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 9 & 10 — CUTTING PROCESS & FINAL HERO RESULT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SECTION 9: CUTTING PROCESS */}
          <section id="laser-process" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 backdrop-blur-xl">
            <div className="space-y-1 border-b border-slate-200 pb-3">
              <span className="text-sm font-mono font-bold text-cyan-700">SECTION 9</span>
              <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                9. Step-by-Step Cutting Process
              </h3>
            </div>

            <ol className="text-base text-slate-800 font-normal leading-relaxed space-y-1.5 list-decimal pl-4 font-normal">
              <li>The 2 mm acrylic sheet was prepared.</li>
              <li>The design was loaded into RDWorks V8.</li>
              <li>The design dimensions and layer assignments were checked.</li>
              <li>Black geometry was assigned to cutting.</li>
              <li>Blue geometry was assigned to engraving.</li>
              <li>The layer parameters were configured.</li>
              <li>The design preview was checked.</li>
              <li>The acrylic material was positioned in the laser cutter.</li>
              <li>The laser cutter was operated under supervision and safety precautions.</li>
              <li>The engraving and cutting process was completed successfully.</li>
            </ol>

            <div 
              onClick={() => openLightbox(10)}
              className="group relative rounded-xl overflow-hidden border border-white/15 bg-slate-50 cursor-pointer shadow-md"
            >
              <img src={FIGURES[10].src} alt={FIGURES[10].title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-2 bg-slate-50 border-t border-slate-200 text-sm sm:text-base font-sans text-slate-700 font-medium">
                {FIGURES[10].caption}
              </div>
            </div>
          </section>

          {/* SECTION 10: FINAL RESULT — HERO SHOT */}
          <section id="laser-result" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 backdrop-blur-xl">
            <div className="space-y-1 border-b border-slate-200 pb-3">
              <span className="text-sm font-mono font-bold text-cyan-700">SECTION 10</span>
              <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                10. Final Result — Hero Shot
              </h3>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1">
              <div><strong className="text-slate-900">Design:</strong> Dr. APJ Abdul Kalam portrait</div>
              <div><strong className="text-slate-900">Text:</strong> DR. APJ ABDUL KALAM</div>
              <div><strong className="text-slate-900">Material:</strong> 2 mm Acrylic &bull; <strong>Size:</strong> 50 × 50 mm</div>
              <div><strong className="text-slate-900">Status:</strong> <span className="text-emerald-700 font-bold">Successfully completed</span> (Cutting + Engraving)</div>
            </div>

            <div 
              onClick={() => openLightbox(11)}
              className="group relative rounded-xl overflow-hidden border border-white/15 bg-slate-50 cursor-pointer shadow-md"
            >
              <img src={FIGURES[11].src} alt={FIGURES[11].title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-2 bg-slate-50 border-t border-slate-200 text-sm sm:text-base font-sans text-slate-700 font-medium">
                {FIGURES[11].caption}
              </div>
            </div>
          </section>
        </div>

        {/* SECTION 11, 12, 13 — PROBLEMS, REFLECTION & SOURCE FILES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* SECTION 11: PROBLEMS FACED & SOLUTIONS MATRIX */}
          <section id="laser-problems" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 backdrop-blur-xl">
            <div className="space-y-1 border-b border-slate-200 pb-3">
              <span className="text-sm font-mono font-bold text-cyan-700 block">SECTION 11</span>
              <h4 className="font-bold text-slate-900 text-base">Problems Faced &amp; Solutions Implemented</h4>
            </div>

            <div className="space-y-3 text-xs">
              {/* Problem 1 */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-amber-700 text-[11px]">ISSUE 01 &bull; VECTOR DUPLICATION</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 font-semibold">RESOLVED</span>
                </div>
                <div className="text-slate-900 font-semibold">Overlapping Vectors from Raster Conversion</div>
                <p className="text-slate-600 font-normal leading-relaxed">
                  <strong>Cause:</strong> Online JPG-to-DXF auto-tracing generated dual overlapping outlines along the Dr. APJ Abdul Kalam text.
                </p>
                <p className="text-slate-600 font-normal leading-relaxed">
                  <strong>Solution:</strong> Imported DXF into RDWorks V8, ungrouped components, executed vector cleanup, and manually deleted duplicate lines.
                </p>
                <div className="text-emerald-700 font-mono font-semibold pt-1 border-t border-slate-200/60">
                  ✓ Outcome: Clean single-pass laser cut with zero acrylic charring or localized overheating.
                </div>
              </div>

              {/* Problem 2 */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-amber-700 text-[11px]">ISSUE 02 &bull; ENGRAVING CONTRAST</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 font-semibold">RESOLVED</span>
                </div>
                <div className="text-slate-900 font-semibold">Acrylic Frosting Depth &amp; Resolution</div>
                <p className="text-slate-600 font-normal leading-relaxed">
                  <strong>Cause:</strong> Initial test engraving at 300 mm/s produced faint low-contrast frosting on 2 mm clear acrylic.
                </p>
                <p className="text-slate-600 font-normal leading-relaxed">
                  <strong>Solution:</strong> Adjusted speed to 100 mm/s with 30% max power and set line interval to 0.100 mm in X_swing mode.
                </p>
                <div className="text-emerald-700 font-mono font-semibold pt-1 border-t border-slate-200/60">
                  ✓ Outcome: Crisp, frosted portrait engraving with sharp legibility on portrait text.
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 12: REFLECTION */}
          <section id="laser-reflection" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 backdrop-blur-xl">
            <span className="text-sm font-mono font-bold text-cyan-700 block">SECTION 12</span>
            <h4 className="font-bold text-slate-900 text-base">Laser Cutting Reflection</h4>
            <p className="text-base text-slate-800 font-normal leading-relaxed leading-relaxed font-normal italic">
              "This activity helped me understand the complete workflow of laser cutting, from preparing and converting a digital design to setting up the file in RDWorks and operating the laser-cutting machine. I learned the importance of proper vector-file preparation, scaling, removing unwanted geometry, assigning appropriate layers, and checking the design before fabrication."
            </p>
          </section>

          {/* SECTION 13: SOURCE FILES */}
          <section id="laser-files" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 backdrop-blur-xl">
            <span className="text-sm font-mono font-bold text-cyan-700 block">SECTION 13</span>
            <h4 className="font-bold text-slate-900 text-base">Laser Source Files</h4>
            <div className="space-y-2 text-xs font-mono">
              <a 
                href="/protosem/week-06/APJ ABDUL KALAM.rld" 
                download="APJ ABDUL KALAM.rld"
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-cyan-200 hover:border-cyan-400 text-cyan-600"
              >
                <span>APJ ABDUL KALAM.rld</span>
                <Download className="w-3.5 h-3.5" />
              </a>
              <a 
                href="/protosem/week-06/APJ_Abdul_Kalam_Laser.dxf" 
                download="APJ_Abdul_Kalam_Laser.dxf"
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-cyan-200 hover:border-cyan-400 text-cyan-600"
              >
                <span>APJ_Abdul_Kalam_Laser.dxf</span>
                <Download className="w-3.5 h-3.5" />
              </a>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-between">
                <span>Lingaraj .v.ai</span>
                <span className="text-[10px] text-amber-700">Available</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PAGE 2 — 3D PRINTING (SECTION 02) */}
      {/* ========================================================================= */}
      <div className="space-y-8 pt-6">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
          <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200">
            <Printer className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">PART 02</span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              PAGE 2 — Additive Manufacturing: 3D Printing & Product Enclosure
            </h2>
          </div>
        </div>

        {/* SECTION 1 — PRINTER DETAILS */}
        <section id="print-details" className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 backdrop-blur-xl">
          <div className="space-y-1 border-b border-slate-200 pb-4">
            <span className="text-sm font-mono font-bold text-emerald-700">SECTION 1</span>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              1. Printer Details: Bambu Lab H2S
            </h3>
            <p className="text-base sm:text-lg text-slate-800 font-normal leading-relaxed font-normal">
              The 3D-printing activity was performed using a Bambu Lab H2S printer. Specifications from official Bambu Lab published documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 overflow-x-auto">
              <table className="w-full text-sm sm:text-base text-left border border-slate-200 rounded-xl overflow-hidden font-mono">
                <thead className="bg-slate-50 text-emerald-700">
                  <tr><th className="p-3.5 text-sm sm:text-base">Parameter</th><th className="p-3.5 text-sm sm:text-base">Details</th></tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-600">
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Make / Brand</td><td className="p-3.5 text-slate-800 text-slate-800 text-emerald-600 font-bold">Bambu Lab</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Model</td><td className="p-3.5 text-slate-800 text-slate-800 text-slate-900 font-bold">H2S</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Printing Technology</td><td className="p-2.5">Fused Deposition Modeling (FDM)</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Build Volume</td><td className="p-3.5 text-slate-800 text-slate-800 font-bold text-slate-900">340 × 320 × 340 mm</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Included Nozzle</td><td className="p-2.5">0.4 mm</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Supported Nozzle Sizes</td><td className="p-2.5">0.2 / 0.4 / 0.6 / 0.8 mm</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Maximum Nozzle Temperature</td><td className="p-2.5">350°C</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Maximum Bed Temperature</td><td className="p-2.5">120°C</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Maximum Toolhead Speed</td><td className="p-3.5 text-slate-800 text-slate-800 text-emerald-600 font-bold">1000 mm/s</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Maximum Acceleration</td><td className="p-2.5">20,000 mm/s²</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Filament Diameter</td><td className="p-2.5">1.75 mm</td></tr>
                  <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Slicer</td><td className="p-3.5 text-slate-800 text-slate-800 text-emerald-600 font-bold">Bambu Studio</td></tr>
                </tbody>
              </table>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div 
                className="group relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow-md"
              >
                <img 
                  src="/protosem/week-06/bambu-x1c-ams-printer.png" 
                  alt="Bambu Lab H2S 3D Printer with AMS" 
                  className="w-full h-72 object-contain p-2 hover:scale-105 transition-transform duration-300" 
                />
                <div className="p-3 bg-slate-50 border-t border-slate-200 text-sm sm:text-base font-sans text-slate-700 font-medium">
                  <strong>Bambu Lab H2S / X1-Carbon 3D Printer</strong> with 4-Spool Automatic Material System (AMS) used in the Fab Lab.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 & 3 — SLICER, MATERIAL & PRINTER CAPABILITIES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SECTION 2: SLICER & MATERIAL */}
          <section id="print-slicer" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 backdrop-blur-xl">
            <div className="space-y-1 border-b border-slate-200 pb-3">
              <span className="text-sm font-mono font-bold text-emerald-700">SECTION 2</span>
              <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                2. Slicer & Material
              </h3>
            </div>

            <div className="space-y-3 text-sm text-slate-800 font-normal leading-relaxed font-normal">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <strong className="text-emerald-600 block font-bold font-mono">Slicer Software: Bambu Studio</strong>
                Bambu Studio was used to prepare the 3D model for printing and generate the printer file/G-code toolpaths.
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <strong className="text-emerald-600 block font-bold font-mono">Printing Material: PLA (Polylactic Acid)</strong>
                PLA was selected as the filament for the mobile-cover prototype. It is a biodegradable thermoplastic derived from renewable plant sources, offering low thermal shrinkage and high dimensional accuracy.
              </div>
            </div>
          </section>

          {/* SECTION 3: PRINTER CAPABILITIES */}
          <section id="print-capabilities" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 backdrop-blur-xl">
            <div className="space-y-1 border-b border-slate-200 pb-3">
              <span className="text-sm font-mono font-bold text-emerald-700">SECTION 3</span>
              <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                3. Printer Limits & Practical Considerations
              </h3>
            </div>

            <ul className="text-base text-slate-800 font-normal leading-relaxed space-y-1.5 list-disc pl-4 font-normal">
              <li><strong>Build Volume:</strong> 340 × 320 × 340 mm enclosed chamber.</li>
              <li><strong>Minimum Wall Thickness:</strong> Engineered at 1.80 mm (3 perimeter shells) for impact strength.</li>
              <li><strong>Overhangs & Support:</strong> Self-supporting chamfers up to 45° used to eliminate support marks.</li>
              <li><strong>Bed Adhesion:</strong> Heated textured PEI plate at 55°C with skirt brim.</li>
              <li><strong>Dimensional Accuracy:</strong> ±0.15 mm calibrated for snug snap-fit phone retention.</li>
            </ul>
          </section>
        </div>

        {/* SECTION 4 & 5 — WHY ADDITIVE & STL DEFINITION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SECTION 4: WHY ADDITIVE */}
          <section id="print-why-additive" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 backdrop-blur-xl">
            <div className="space-y-1 border-b border-slate-200 pb-3">
              <span className="text-sm font-mono font-bold text-emerald-700">SECTION 4</span>
              <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                4. Why the Object Cannot Be Made Subtractively
              </h3>
            </div>

            <p className="text-base text-slate-800 font-normal leading-relaxed leading-relaxed font-normal">
              "The OPPO A3x 5G mobile cover contains a complex three-dimensional form with curved edges, internal features, openings and detailed geometry. Manufacturing such a shape subtractively from a solid block would require removing material from multiple directions and may require several machining setups and specialized tooling. FDM additive manufacturing is more suitable for this prototype because the object can be constructed layer by layer directly from the digital 3D model, allowing the complex geometry to be produced without removing the majority of the material from a solid block."
            </p>
          </section>

          {/* SECTION 5: STL DEFINITION */}
          <section id="print-stl" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 backdrop-blur-xl">
            <div className="space-y-1 border-b border-slate-200 pb-3">
              <span className="text-sm font-mono font-bold text-emerald-700">SECTION 5</span>
              <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                5. STL Definition & Additive Workflow
              </h3>
            </div>

            <p className="text-base text-slate-800 font-normal leading-relaxed leading-relaxed font-normal">
              <strong>STL (Stereolithography)</strong> is a common 3D-printing file format that represents the outer surface of a three-dimensional object using a triangular mesh.
            </p>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono text-emerald-600 space-y-1 text-center">
              Fusion 360 model &rarr; STL &rarr; Bambu Studio &rarr; Slicing &rarr; G-code &rarr; Bambu Lab H2S &rarr; Physical Prototype
            </div>
          </section>
        </div>

        {/* SECTION 6 — INTERACTIVE 3D MODEL VIEWER (SELECTED STL MODEL) */}
        <section id="print-model" className="p-6 sm:p-8 rounded-3xl bg-white border border-emerald-200 shadow-sm backdrop-blur-xl">
          <Model3DViewer />
        </section>

        {/* SECTION 7 — SLICER SETTINGS */}
        <section id="print-settings" className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 backdrop-blur-xl">
          <div className="space-y-1 border-b border-slate-200 pb-4">
            <span className="text-sm font-mono font-bold text-emerald-700">SECTION 7</span>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              7. Slicer Settings (Reference / Default PLA Profile Values)
            </h3>
            <p className="text-base sm:text-lg text-slate-800 font-normal leading-relaxed font-normal">
              *Clearly labeled as Reference/Default Profile Values configured in Bambu Studio for 0.4 mm nozzle and PLA filament.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <table className="w-full text-sm sm:text-base text-left border border-slate-200 rounded-xl overflow-hidden font-mono">
              <thead className="bg-slate-50 text-emerald-700">
                <tr><th className="p-3.5 text-sm sm:text-base text-sm">Setting</th><th className="p-3.5 text-sm sm:text-base text-sm">Reference Value</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-600">
                <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Material</td><td className="p-3.5 text-slate-800 text-slate-800 text-emerald-600 font-bold">PLA</td></tr>
                <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Nozzle Temperature</td><td className="p-3.5 text-slate-800 text-slate-800 font-bold text-slate-900">220°C</td></tr>
                <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Bed Temperature</td><td className="p-3.5 text-slate-800 text-slate-800 font-bold text-slate-900">55°C</td></tr>
                <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Layer Height</td><td className="p-3.5 text-slate-800 text-slate-800 font-bold text-emerald-600">0.20 mm</td></tr>
                <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Infill &amp; Pattern</td><td className="p-3.5 text-slate-800 text-slate-800 text-emerald-600">15% Gyroid</td></tr>
                <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Wall / Shell Count</td><td className="p-2">3 Shells (1.80 mm)</td></tr>
                <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Print Speed</td><td className="p-2">200 mm/s</td></tr>
                <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Supports</td><td className="p-2">No (Self-supporting)</td></tr>
                <tr><td className="p-3.5 text-slate-800 text-slate-800 font-semibold text-slate-900">Build Plate Adhesion</td><td className="p-2">Skirt</td></tr>
              </tbody>
            </table>

            <div 
              onClick={() => openLightbox(13)}
              className="group relative rounded-xl overflow-hidden border border-white/15 bg-slate-50 cursor-pointer shadow-md"
            >
              <img src={FIGURES[13].src} alt={FIGURES[13].title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-sm sm:text-base font-sans text-slate-700 font-medium">
                {FIGURES[13].caption}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8, 9, 10 — PRINT METRICS, VARIANCE ANALYSIS & STEP-BY-STEP PROCESS */}
        <section id="print-metrics" className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 backdrop-blur-xl">
          <div className="space-y-1 border-b border-slate-200 pb-4">
            <span className="text-sm font-mono font-bold text-emerald-700">SECTIONS 8, 9 &amp; 10</span>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              8. Estimated vs. Actual Print Metrics &amp; 9. Step-by-Step Print Process
            </h3>
            <p className="text-base sm:text-lg text-slate-800 font-normal leading-relaxed font-normal">
              Comparative analysis evaluating slicer G-code estimation against physical fabrication telemetry and final dimensional measurements.
            </p>
          </div>

          {/* Slicer Estimation vs Actual Variance Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base text-left border border-slate-200 rounded-xl overflow-hidden font-mono">
              <thead className="bg-slate-50 text-emerald-700 border-b border-slate-200">
                <tr>
                  <th className="p-3.5 text-sm sm:text-base">Metric Parameter</th>
                  <th className="p-3.5 text-sm sm:text-base">Slicer Estimate (Bambu Studio)</th>
                  <th className="p-3.5 text-sm sm:text-base">Actual Measured (Physical)</th>
                  <th className="p-3.5 text-sm sm:text-base">Variance (%)</th>
                  <th className="p-3.5 text-sm sm:text-base">Technical Observation &amp; Cause</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr className="hover:bg-slate-50/60">
                  <td className="p-3.5 text-slate-800 font-semibold text-slate-900">Total Print Time</td>
                  <td className="p-3.5 text-slate-800 font-mono text-slate-700">1 h 26 min (86 min)</td>
                  <td className="p-3.5 text-slate-800 font-mono font-bold text-slate-900">1 h 17 min (77 min)</td>
                  <td className="p-3.5 text-slate-800 font-mono font-bold text-emerald-600 bg-emerald-50/50">-10.5% (-9 min)</td>
                  <td className="p-3.5 text-slate-800 font-sans text-slate-600 text-[11px] leading-relaxed">
                    Bambu Lab's active resonance compensation and high 20,000 mm/s² acceleration curves reduced non-print travel and corner deceleration overhead.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="p-3.5 text-slate-800 font-semibold text-slate-900">Filament Material Weight</td>
                  <td className="p-3.5 text-slate-800 font-mono text-slate-700">32.8 g (incl. skirt)</td>
                  <td className="p-3.5 text-slate-800 font-mono font-bold text-emerald-600">30.0 g</td>
                  <td className="p-3.5 text-slate-800 font-mono font-bold text-emerald-600 bg-emerald-50/50">-8.5% (-2.8 g)</td>
                  <td className="p-3.5 text-slate-800 font-sans text-slate-600 text-[11px] leading-relaxed">
                    15% Gyroid infill optimization minimized unnecessary internal solid infill while maintaining high isotropic shear strength.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="p-3.5 text-slate-800 font-semibold text-slate-900">Filament Length Consumed</td>
                  <td className="p-3.5 text-slate-800 font-mono text-slate-700">10.95 m (1.75 mm PLA)</td>
                  <td className="p-3.5 text-slate-800 font-mono font-bold text-slate-900">10.10 m</td>
                  <td className="p-3.5 text-slate-800 font-mono font-bold text-emerald-600 bg-emerald-50/50">-7.7% (-0.85 m)</td>
                  <td className="p-3.5 text-slate-800 font-sans text-slate-600 text-[11px] leading-relaxed">
                    Single-line skirt extrusion and zero support structures eliminated excess filament purge waste.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="p-3.5 text-slate-800 font-semibold text-slate-900">Snap-Fit Lip Clearance</td>
                  <td className="p-3.5 text-slate-800 font-mono text-slate-700">0.60 mm nominal</td>
                  <td className="p-3.5 text-slate-800 font-mono font-bold text-slate-900">0.58 mm (caliper)</td>
                  <td className="p-3.5 text-slate-800 font-mono font-bold text-cyan-600 bg-cyan-50/50">-3.3% (-0.02 mm)</td>
                  <td className="p-3.5 text-slate-800 font-sans text-slate-600 text-[11px] leading-relaxed">
                    Minor thermal PLA shrinkage during cool-down was within allowable ±0.15 mm mechanical tolerance, achieving a zero-rattle snap lock.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
            {/* Actual Metrics Highlight Cards */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-5 rounded-xl bg-slate-50 border border-emerald-200 space-y-2">
                <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase">PHYSICAL FABRICATION OUTCOME</span>
                <div className="text-2xl font-bold text-slate-900 font-mono">1 h 17 min</div>
                <div className="text-base text-slate-800 font-normal leading-relaxed">Actual Completed Print Time</div>
                <div className="text-2xl font-bold text-emerald-600 font-mono pt-2">30.0 g</div>
                <div className="text-base text-slate-800 font-normal leading-relaxed">Actual Net PLA Material Weight</div>
                <div className="pt-3 border-t border-slate-200 text-xs text-emerald-700 font-bold font-mono">
                  ✓ Physical Fit Test: 100% Verified on OPPO A3x 5G
                </div>
              </div>

              {/* Figure 16 Hero Image */}
              <div 
                onClick={() => openLightbox(15)}
                className="group relative rounded-xl overflow-hidden border border-slate-200 bg-white cursor-pointer shadow-sm"
              >
                <img src={FIGURES[15].src} alt={FIGURES[15].title} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-sm sm:text-base font-sans text-slate-700 font-medium">
                  {FIGURES[15].caption}
                </div>
              </div>
            </div>

            {/* 12 Step Workflow */}
            <div className="lg:col-span-8 p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 text-sm font-mono text-emerald-700">Step-by-Step Additive Workflow:</h4>
              <ol className="text-base text-slate-800 font-normal leading-relaxed space-y-1.5 list-decimal pl-4 font-normal">
                <li>The OPPO A3x 5G cover was designed in Autodesk Fusion 360 using parametric reverse engineering.</li>
                <li>Finalized dimensions, uniform 1.80 mm wall thickness, and dual camera relief cutouts.</li>
                <li>The completed CAD model was exported as high-resolution binary STL: <strong>Lingaraj v.stl</strong>.</li>
                <li>The STL file was imported into Bambu Studio slicing environment.</li>
                <li>The model was positioned flat on the textured PEI build plate.</li>
                <li>PLA filament was selected in the Bambu Studio material profile.</li>
                <li>Configured 0.20 mm layer height, 3 shell perimeters, and 15% Gyroid infill.</li>
                <li>Sliced the model and verified G-code toolpaths layer by layer.</li>
                <li>Loaded G-code to the Bambu Lab H2S 3D printer.</li>
                <li>The print completed cleanly in 1 h 17 min without mid-print defects or stringing.</li>
                <li>Measured net weight of 30 g PLA consumed.</li>
                <li>The physical phone case was installed onto the OPPO A3x 5G handset, verifying snug snap retention and camera port alignment.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* INTERACTIVE PRODUCT HOTSPOT INSPECTION */}
        <section id="product-spotlight" className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 backdrop-blur-xl">
          <div className="space-y-1 border-b border-slate-200 pb-4">
            <span className="text-sm font-mono font-bold text-emerald-700">INTERACTIVE INSPECTION</span>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              OPPO A3x 5G Phone Cover — Technical Hotspot Inspection
            </h3>
            <p className="text-xs text-slate-500">Click the numbered radar pins on the phone cover to inspect the reverse-engineered parameters.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-white/15 bg-slate-50 shadow-md">
              <img src="/protosem/week-06/oppo-case-physical-output.png" alt="OPPO A3x 5G Case" className="w-full h-80 object-cover" />
              {PRODUCT_HOTSPOTS.map((h) => {
                const isCurrent = activeHotspot.id === h.id;
                return (
                  <button
                    key={h.id}
                    onClick={() => {
                      sound.playHover();
                      setActiveHotspot(h);
                    }}
                    style={{ top: h.top, left: h.left }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full font-mono text-xs font-bold flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                      isCurrent
                        ? 'bg-emerald-400 text-slate-950 scale-125 ring-4 ring-emerald-400/50'
                        : 'bg-white text-slate-900 border border-white/30 hover:scale-110'
                    }`}
                  >
                    {h.num}
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-5 p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-mono text-xs font-bold text-emerald-700">HOTSPOT {activeHotspot.num} INSPECTION</span>
                <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-semibold bg-emerald-100 text-emerald-600 border border-emerald-200">
                  VERIFIED
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">{activeHotspot.label}</h4>
              <div className="font-mono text-xs font-bold text-amber-600">Spec: {activeHotspot.spec}</div>
              <p className="text-base text-slate-800 font-normal leading-relaxed leading-relaxed font-normal">{activeHotspot.desc}</p>
            </div>
          </div>
        </section>

        {/* SECTION 11, 12, 13 — 3D PRINT PROBLEMS, REFLECTION & SOURCE FILES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* SECTION 11: PROBLEMS FACED & SOLUTIONS MATRIX */}
          <section id="print-problems" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 backdrop-blur-xl">
            <div className="space-y-1 border-b border-slate-200 pb-3">
              <span className="text-sm font-mono font-bold text-emerald-700 block">SECTION 11</span>
              <h4 className="font-bold text-slate-900 text-base">Problems Faced &amp; Solutions Implemented</h4>
            </div>

            <div className="space-y-3 text-xs">
              {/* Problem 1 */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-amber-700 text-[11px]">ISSUE 01 &bull; OVERHANG INTEGRITY</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 font-semibold">RESOLVED</span>
                </div>
                <div className="text-slate-900 font-semibold">Camera Island Chamfer Droop Risk</div>
                <p className="text-slate-600 font-normal leading-relaxed">
                  <strong>Cause:</strong> Internal lens aperture overhangs could sag if printed unsupported without proper chamfer geometry.
                </p>
                <p className="text-slate-600 font-normal leading-relaxed">
                  <strong>Solution:</strong> Modeled a 45° self-supporting conical chamfer in Fusion 360, adhering to FDM Design for Additive Manufacturing (DfAM) rules without requiring break-away supports.
                </p>
                <div className="text-emerald-700 font-mono font-semibold pt-1 border-t border-slate-200/60">
                  ✓ Outcome: Zero support scarring with smooth, flush optical aperture transitions.
                </div>
              </div>

              {/* Problem 2 */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-amber-700 text-[11px]">ISSUE 02 &bull; SNAP-FIT TOLERANCE</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 font-semibold">RESOLVED</span>
                </div>
                <div className="text-slate-900 font-semibold">Perimeter Retention Lip Clearance</div>
                <p className="text-slate-600 font-normal leading-relaxed">
                  <strong>Cause:</strong> Risk of over-tight phone fitting or corner cracking due to PLA filament thermal shrinkage.
                </p>
                <p className="text-slate-600 font-normal leading-relaxed">
                  <strong>Solution:</strong> Reverse-engineered a 0.60 mm elastic undercut lip with 1.80 mm sidewall flexure and calibrated nozzle flow rate.
                </p>
                <div className="text-emerald-700 font-mono font-semibold pt-1 border-t border-slate-200/60">
                  ✓ Outcome: Repeatable, rattle-free snap installation and removal without scratching the phone frame.
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 12: REFLECTION */}
          <section id="print-reflection" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 backdrop-blur-xl">
            <span className="text-sm font-mono font-bold text-emerald-700 block">SECTION 12</span>
            <h4 className="font-bold text-slate-900 text-base">3D Printing Reflection</h4>
            <p className="text-base text-slate-800 font-normal leading-relaxed leading-relaxed font-normal italic">
              "This activity helped me understand the complete workflow of additive manufacturing, from creating a 3D model in Fusion 360 to exporting it as an STL file, preparing it in Bambu Studio, and producing the final physical object using a 3D printer. I learned how factors such as model dimensions, layer height, infill, supports and printing conditions can influence the final output."
            </p>
          </section>

          {/* SECTION 13: SOURCE FILES */}
          <section id="print-files" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 backdrop-blur-xl">
            <span className="text-sm font-mono font-bold text-emerald-700 block">SECTION 13</span>
            <h4 className="font-bold text-slate-900 text-base">3D Print Source Files</h4>
            <div className="space-y-2 text-xs font-mono">
              <a 
                href="/protosem/week-06/Lingaraj v.stl" 
                download="Lingaraj v.stl"
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-emerald-200 hover:border-emerald-400 text-emerald-600"
              >
                <span>Lingaraj v.stl</span>
                <Download className="w-3.5 h-3.5" />
              </a>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 flex items-center justify-between">
                <span>G-code / printer file</span>
                <span className="text-[10px] text-emerald-700">Available</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-between">
                <span>Fusion 360 source</span>
                <span className="text-[10px] text-sky-700">CAD Model</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FINAL REFLECTION & LEARNING SECTION */}
      {/* ========================================================================= */}
      <section 
        id="final-reflection" 
        className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 backdrop-blur-xl"
      >
        <div className="space-y-1 border-b border-slate-200 pb-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-sky-700 uppercase">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>SYNTHESIS & MASTERY</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Reflection & Learning Matrix
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-sky-700 text-sm font-mono">WHAT I LEARNED</h4>
            <ul className="text-base text-slate-800 font-normal leading-relaxed space-y-1 list-disc pl-4 font-normal">
              <li>CAD parametric modelling</li>
              <li>CO₂ laser cutting & engraving</li>
              <li>RDWorks CAM layer control</li>
              <li>FDM additive manufacturing</li>
              <li>Bambu Studio toolpath slicing</li>
              <li>Digital fabrication workflow</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-amber-700 text-sm font-mono">CHALLENGES</h4>
            <ul className="text-base text-slate-800 font-normal leading-relaxed space-y-1 list-disc pl-4 font-normal">
              <li>Vector file preparation & DXF conversion</li>
              <li>Maintaining tight mechanical dimensions (±0.15 mm)</li>
              <li>Laser power-to-speed balance for acrylic</li>
              <li>Understanding complete CAM-to-machine workflow</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-emerald-700 text-sm font-mono">SKILLS DEVELOPED</h4>
            <ul className="text-base text-slate-800 font-normal leading-relaxed space-y-1 list-disc pl-4 font-normal">
              <li>Autodesk Fusion 360</li>
              <li>Vector DXF preparation</li>
              <li>RDWorks V8 software</li>
              <li>Bambu Studio slicing</li>
              <li>Rapid physical prototyping</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-purple-700 text-sm font-mono">FUTURE IMPROVEMENTS</h4>
            <ul className="text-base text-slate-800 font-normal leading-relaxed space-y-1 list-disc pl-4 font-normal">
              <li>Multi-component mechanical assemblies</li>
              <li>Comprehensive material parameter testing</li>
              <li>Advanced DfAM topology optimization</li>
              <li>Post-processing & surface finishing</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* REFERENCES & CREDITS */}
      {/* ========================================================================= */}
      <section 
        id="references" 
        className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 backdrop-blur-xl"
      >
        <div className="space-y-1 border-b border-slate-200 pb-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-sky-700 uppercase">
            <BookOpen className="w-4 h-4" />
            <span>ATTRIBUTION & BIBLIOGRAPHY</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            References & Credits
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">1. Autodesk Fusion 360</strong>
            <p className="text-slate-500 text-[11px] font-normal">Purpose: Parametric CAD modelling and product enclosure design.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">2. RDWorks V8</strong>
            <p className="text-slate-500 text-[11px] font-normal">Purpose: Laser-cutting file preparation, CAM toolpaths and machine control.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">3. Bambu Studio</strong>
            <p className="text-slate-500 text-[11px] font-normal">Purpose: 3D-print slicing and G-code generation.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">4. Bambu Lab Official Documentation</strong>
            <p className="text-slate-500 text-[11px] font-normal">Purpose: Bambu Lab H2S printer specifications and PLA filament guidance.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">5. Convertio & reaConverter</strong>
            <p className="text-slate-500 text-[11px] font-normal">Purpose: Online JPG-to-DXF vector conversion utilities.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">6. Google Images</strong>
            <p className="text-slate-500 text-[11px] font-normal">Purpose: Reference image source for the APJ Abdul Kalam laser portrait.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 md:col-span-2">
            <strong className="text-slate-900 block font-bold">7. AI-Assisted Documentation</strong>
            <p className="text-slate-500 text-[11px] font-normal">Purpose: AI-assisted documentation, technical layout structure and portfolio preparation: ChatGPT.</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FINAL WEEK 6 SUMMARY DASHBOARD */}
      {/* ========================================================================= */}
      <section 
        id="summary-dashboard" 
        className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6"
      >
        <div className="space-y-1.5 border-b border-slate-100 pb-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100 uppercase">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>EXECUTIVE SUMMARY</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Final Week 6 Activity Summary Dashboard
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* CARD 1 */}
          <div className="p-5 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-sky-300 shadow-sm transition-all space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-sky-600 font-bold bg-sky-100/70 px-2 py-0.5 rounded-md">CARD 01</span>
              <span className="text-slate-400 font-medium">26-09-2026</span>
            </div>
            <h4 className="font-bold text-slate-900 text-base">CAD & Physical Prototyping</h4>
            <div className="text-xs text-slate-500 font-mono">Tools: Fusion 360, Clay</div>
            <p className="text-base text-slate-800 font-normal leading-relaxed font-normal pt-1 leading-relaxed">
              <strong className="text-slate-800">Outcome:</strong> Developed CAD parametric modelling and low-fidelity physical form evaluation skills.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="p-5 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-cyan-300 shadow-sm transition-all space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-cyan-700 font-bold bg-cyan-100/70 px-2 py-0.5 rounded-md">CARD 02</span>
              <span className="text-slate-400 font-medium">28-09-2026</span>
            </div>
            <h4 className="font-bold text-slate-900 text-base">Laser Cutting & Engraving</h4>
            <div className="text-xs text-slate-500 font-mono">Machine: 1490 CO₂ Laser (150W)</div>
            <div className="text-xs text-slate-500 font-mono">Material: 2 mm Acrylic (50×50 mm)</div>
            <p className="text-base text-slate-800 font-normal leading-relaxed font-normal pt-1 leading-relaxed">
              <strong className="text-slate-800">Outcome:</strong> Successfully fabricated Dr. APJ Abdul Kalam portrait (Cut + Engrave at 100 mm/s, 30% power).
            </p>
          </div>

          {/* CARD 3 */}
          <div className="p-5 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-emerald-300 shadow-sm transition-all space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-emerald-700 font-bold bg-emerald-100/70 px-2 py-0.5 rounded-md">CARD 03</span>
              <span className="text-slate-400 font-medium">29-09-2026</span>
            </div>
            <h4 className="font-bold text-slate-900 text-base">3D Printing Additive Manufacturing</h4>
            <div className="text-xs text-slate-500 font-mono">Printer: Bambu Lab H2S</div>
            <div className="text-xs text-slate-500 font-mono">Object: OPPO A3x 5G Cover (30 g, 1h 17m)</div>
            <p className="text-base text-slate-800 font-normal leading-relaxed font-normal pt-1 leading-relaxed">
              <strong className="text-slate-800">Outcome:</strong> Successfully printed and correctly fitted the physical OPPO A3x 5G mobile phone.
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          <span className="text-xs font-mono text-slate-400">PROTOSEM &bull; 20-WEEK ROADMAP &bull; WEEK 06</span>
          <button
            onClick={onBack}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-medium text-xs shadow-md shadow-sky-500/20 cursor-pointer transition-all"
          >
            RETURN TO ROADMAP &rarr;
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* HIGH-RES LIGHTBOX MODAL */}
      {/* ========================================================================= */}
      {lightboxPhoto && (
        <div 
          className="fixed inset-0 z-70 bg-slate-50 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxPhoto(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-white border border-slate-300 rounded-2xl overflow-hidden shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <div>
                <span className="text-sm font-mono font-bold text-sky-700">{lightboxPhoto.num}</span>
                <h4 className="text-lg font-bold text-slate-900">{lightboxPhoto.title}</h4>
              </div>
              <button
                onClick={() => setLightboxPhoto(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 flex items-center justify-center max-h-[70vh] overflow-hidden">
              <img
                src={lightboxPhoto.src}
                alt={lightboxPhoto.title}
                className="max-h-[65vh] w-auto object-contain rounded-lg"
              />
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
              <p className="text-slate-600 max-w-2xl">{lightboxPhoto.caption}</p>
              <div className="flex gap-2">
                <button
                  onClick={prevLightbox}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200"
                >
                  &larr; Prev
                </button>
                <button
                  onClick={nextLightbox}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200"
                >
                  Next &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
