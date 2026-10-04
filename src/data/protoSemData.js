// Reusable data-driven architecture for the 20-Week ProtoSem Innovation Journey

export const PROTOSEM_STRUCTURE = {
  title: "PRICE ProtoSem",
  role: "Innovation Engineer Trainee",
  programmeType: "20-WEEK INDUSTRY-INTEGRATED INNOVATION PROGRAMME",
  description:
    "Selected for a 20-week industry-integrated innovation programme focused on solving real-world retail and commerce challenges through AI, analytics, intelligent systems, IoT, prototyping, and entrepreneurship. Working with industry problem statements to explore, develop, and validate practical technology solutions beyond conventional classroom learning.",
  
  metrics: [
    { number: "01", label: "PROGRAMME" },
    { number: "04", label: "PHASES" },
    { number: "20", label: "WEEKS" },
    { number: "20", label: "FUTURE STORIES" }
  ],

  disciplines: [
    {
      id: "phygital",
      title: "PHYGITAL RETAIL & INTELLIGENT COMMERCE",
      shortTitle: "Phygital Retail",
      desc: "Bridging physical store environments with digital intelligence, automated checkout, and interactive customer journeys."
    },
    {
      id: "ai-analytics",
      title: "AI & ANALYTICS",
      shortTitle: "AI & Analytics",
      desc: "Predictive retail intelligence, computer vision pipelines, customer behavior modeling, and algorithmic decision systems."
    },
    {
      id: "iot-systems",
      title: "INTELLIGENT SYSTEMS & IoT",
      shortTitle: "Intelligent Systems & IoT",
      desc: "Connected sensor arrays, edge compute micro-controllers, inventory tracking, and autonomous telemetry."
    },
    {
      id: "prototyping",
      title: "PROTOTYPING & ENTREPRENEURSHIP",
      shortTitle: "Prototyping & Venture",
      desc: "Rapid hardware-software fabrication, product feasibility testing, unit economics, and venture deployment frameworks."
    }
  ],

  phases: [
    {
      id: 1,
      phaseCode: "PHASE 01",
      phaseTitle: "PHASE 01 — WEEKS 01–05",
      title: "Foundation & Problem Discovery",
      startWeek: 1,
      endWeek: 5,
      color: "#10B981"
    },
    {
      id: 2,
      phaseCode: "PHASE 02",
      phaseTitle: "PHASE 02 — WEEKS 06–10",
      title: "Digital Fabrication & Rapid Prototyping",
      startWeek: 6,
      endWeek: 10,
      color: "#38BDF8"
    },
    {
      id: 3,
      phaseCode: "PHASE 03",
      phaseTitle: "PHASE 03 — WEEKS 11–15",
      title: "Embedded Systems & IoT Telemetry",
      startWeek: 11,
      endWeek: 15,
      color: "#A855F7"
    },
    {
      id: 4,
      phaseCode: "PHASE 04",
      phaseTitle: "PHASE 04 — WEEKS 16–20",
      title: "Product Integration & Venture Launch",
      startWeek: 16,
      endWeek: 20,
      color: "#F59E0B"
    }
  ]
};

// Curated comprehensive milestone metadata for all 20 weeks
const WEEK_CURRICULUM = [
  // Phase 01: Foundation (Weeks 01-05)
  {
    weekNumber: 1,
    title: "PRICE ProtoSem Inauguration & Self-Discovery",
    topic: "Program Orientation, 16 Personalities, RAI Keynote & Ecosystem Setup",
    timeline: "Week 01 • Dec 2024",
    duration: "45 Working Hours",
    location: "FORGE Innovation & Ventures, Coimbatore",
    summary: "Introductory foundation-building week focusing on self-awareness, teamwork, professional development, and retail innovation orientation.",
    status: "COMPLETED",
    isDocumented: true,
    tag: "Foundation",
    bullets: [
      "Completed 16 Personalities behavioral assessment and team formation dynamics.",
      "Attended RAI keynote on future trajectories in phygital retail and automated commerce.",
      "Established development toolchains, Git repositories, and collaborative engineering workflows.",
      "Mapped personal learning objectives against the 20-week fellowship milestones."
    ]
  },
  {
    weekNumber: 2,
    title: "Customer Empathy Mapping & Problem Discovery",
    topic: "Stakeholder Interviews, Pain Point Mapping & Problem Decomposition",
    timeline: "Week 02 • Jan 2025",
    duration: "45 Working Hours",
    location: "Retail Store Environments & FORGE Hub",
    summary: "Conducted field interviews in local retail ecosystems, framing problem statements around checkout friction and inventory discrepancies.",
    status: "COMPLETED",
    isDocumented: false,
    tag: "Empathy",
    bullets: [
      "Conducted 12+ in-person customer and store manager empathy interviews.",
      "Built customer empathy maps and identified severe latency during physical item checkout.",
      "Synthesized qualitative interview data into structured problem decomposition trees.",
      "Defined key performance indicators for smart assistive retail automation."
    ]
  },
  {
    weekNumber: 3,
    title: "Design Thinking & Value Proposition Design",
    topic: "Ideation Sprints, User Persona Definition & Solution Feasibility",
    timeline: "Week 03 • Jan 2025",
    duration: "45 Working Hours",
    location: "Design Thinking Studio, FORGE",
    summary: "Formulated value proposition canvas, prioritizing assistive AI translation and intelligent sensor integration.",
    status: "COMPLETED",
    isDocumented: false,
    tag: "Design Thinking",
    bullets: [
      "Generated 30+ concept sketches across computer vision and IoT sensor arrays.",
      "Developed Value Proposition Canvas aligning customer jobs with AI solutions.",
      "Evaluated technical and financial feasibility across candidate architectures.",
      "Formulated user personas for multi-lingual and differently-abled retail shoppers."
    ]
  },
  {
    weekNumber: 4,
    title: "Phygital Systems Architecture & Service Mapping",
    topic: "System Architecture Flowcharts, Cloud Telemetry & Microservices",
    timeline: "Week 04 • Jan 2025",
    duration: "45 Working Hours",
    location: "Systems Engineering Lab, FORGE",
    summary: "Mapped end-to-end user journeys connecting edge hardware microcontrollers with cloud databases and mobile frontends.",
    status: "COMPLETED",
    isDocumented: false,
    tag: "Architecture",
    bullets: [
      "Architected bidirectional hardware-to-cloud communication schemas via MQTT & WebSockets.",
      "Mapped service blueprints spanning sensor triggers to edge computing inference.",
      "Designed low-latency API contracts for real-time telemetry streaming.",
      "Drafted state transition diagrams for fail-safe embedded device operation."
    ]
  },
  {
    weekNumber: 5,
    title: "Phase 01 Milestone Review & Concept Validation",
    topic: "Pivots, Mentor Reviews, Cohort Pitches & Feasibility Check",
    timeline: "Week 05 • Jan 2025",
    duration: "45 Working Hours",
    location: "Executive Review Hall, FORGE",
    summary: "Presented concept validation dossier to FORGE mentors, securing green light for physical prototyping in Phase 02.",
    status: "COMPLETED",
    isDocumented: false,
    tag: "Milestone 01",
    bullets: [
      "Delivered formal Phase 01 executive presentation before industry mentors.",
      "Validated core assumptions with benchmark data and peer design critiques.",
      "Refined product requirement documents (PRD) for physical digital fabrication.",
      "Awarded Phase 01 completion verification and lab clearance for fabrication tools."
    ]
  },

  // Phase 02: Fabrication (Weeks 06-10)
  {
    weekNumber: 6,
    title: "Industrial-Ready Prototyping & Digital Fabrication",
    topic: "Fusion 360 CAD, 1490 CO₂ Laser Cutting & Bambu Lab H2S 3D Printing",
    timeline: "Week 06 • Feb 2025 (Active Focus)",
    duration: "50+ Working Hours",
    location: "Fab Lab & Rapid Prototyping Center, FORGE",
    summary: "Flagship case study: Parametric CAD modeling, 50×50mm Kalam portrait laser cutting/engraving on 2mm acrylic, and custom OPPO A3x 5G snap-fit case printing.",
    status: "ACTIVE FOCUS",
    isDocumented: true,
    tag: "Flagship Case Study",
    bullets: [
      "Operated industrial 80W CO₂ laser cutter (1490 CO₂ Laser, RDWorks v8) with full optical focus & exhaust protocol.",
      "Vectorized high-contrast raster portraits into precision DXF paths for APJ Abdul Kalam commemorative portrait.",
      "Optimized laser engraving & cutting parameters (Speed: 300 mm/s, Power: 18–20% for crisp edges).",
      "Modeled and sliced custom OPPO A3x 5G snap-fit protective case in Bambu Studio with 0.2mm layer height.",
      "Validated dimensional tolerance stackups (±0.15mm) and completed physical part assembly."
    ]
  },
  {
    weekNumber: 7,
    title: "Parametric CAD Enclosures & Tolerance Stackup",
    topic: "Snap-Fit Joints, Thermal Clearance & DfAM Optimization",
    timeline: "Week 07 • Feb 2025",
    duration: "45 Working Hours",
    location: "CAD Design Studio, FORGE",
    summary: "Refining mechanical enclosures with heat dissipation fins, internal component mounting ribs, and ±0.10mm interference fits.",
    status: "CURRICULUM SCHEDULED",
    isDocumented: false,
    tag: "Enclosures",
    bullets: [
      "Constructed parametric CAD assemblies with living hinges and cantilever snap joints.",
      "Performed thermal clearance simulations for embedded microcontroller enclosures.",
      "Calculated geometric dimensioning and tolerancing (GD&T) for injection-ready parts.",
      "Optimized internal ribbing to prevent structural warping during 3D printing."
    ]
  },
  {
    weekNumber: 8,
    title: "Rapid PCB Design & Circuit Prototyping",
    topic: "Schematic Capture, PCB Routing in KiCAD & CNC Milling/Soldering",
    timeline: "Week 08 • Feb 2025",
    duration: "45 Working Hours",
    location: "Electronics & PCB Fabrication Lab",
    summary: "Designing custom breakout PCBs for microcontroller power regulation, sensor routing, and peripheral communication buses.",
    status: "CURRICULUM SCHEDULED",
    isDocumented: false,
    tag: "PCB Design",
    bullets: [
      "Captured multi-sheet schematics in KiCAD with decoupled power rails.",
      "Routed high-density 2-layer PCB layouts adhering to 8mil track/space rules.",
      "Fabricated prototype circuit boards via precision PCB CNC isolation milling.",
      "Soldered surface-mount (SMD) components and conducted continuity & power testing."
    ]
  },
  {
    weekNumber: 9,
    title: "Microcontroller Architecture & Embedded Firmware",
    topic: "ESP32 C/C++ Firmware, FreeRTOS Tasks & GPIO Interrupt Handling",
    timeline: "Week 09 • Feb 2025",
    duration: "45 Working Hours",
    location: "Embedded Systems Lab, FORGE",
    summary: "Developing non-blocking embedded firmware routines for low-power sensor data acquisition and local actuation.",
    status: "CURRICULUM SCHEDULED",
    isDocumented: false,
    tag: "Embedded C++",
    bullets: [
      "Wrote modular FreeRTOS tasks on dual-core ESP32 for telemetry & communication.",
      "Implemented hardware timer interrupts and edge-triggered GPIO sensor reading.",
      "Integrated non-volatile memory (NVM) configuration storage and OTA update handlers.",
      "Optimized dynamic RAM utilization to eliminate heap fragmentation."
    ]
  },
  {
    weekNumber: 10,
    title: "Phase 02 Alpha Prototype Integration & Lab Review",
    topic: "Alpha Hardware-Software Mating, Lab Bench Testing & Safety Verification",
    timeline: "Week 10 • Feb 2025",
    duration: "45 Working Hours",
    location: "Integration Lab & Testing Hall",
    summary: "Combining physical laser/3D-printed chassis with embedded electronics for benchtop functionality validation.",
    status: "CURRICULUM SCHEDULED",
    isDocumented: false,
    tag: "Milestone 02",
    bullets: [
      "Mated 3D-printed enclosure with custom PCB, display screen, and battery subsystem.",
      "Conducted 100-cycle mechanical endurance and thermal soak benchmarking.",
      "Delivered live Alpha prototype bench demonstration to FORGE faculty advisors.",
      "Secured approval for Phase 03 sensor network scaling and edge AI integration."
    ]
  },

  // Phase 03: Embedded Systems & IoT (Weeks 11-15)
  {
    weekNumber: 11,
    title: "Sensor Array Interfacing & Telemetry Acquisition",
    topic: "I2C/SPI Sensor Calibration, ADC Filtering & Error Rejection",
    timeline: "Week 11 • Mar 2025",
    duration: "45 Working Hours",
    location: "Sensor & Metrology Lab",
    summary: "Interfacing multi-sensor telemetry nodes with high-frequency sampling and analog noise filtering.",
    status: "CURRICULUM SCHEDULED",
    isDocumented: false,
    tag: "Sensors",
    bullets: [
      "Calibrated multi-channel I2C sensors with digital low-pass filtering.",
      "Implemented moving average and Kalman filters for noisy analog inputs.",
      "Benchmarked sampling jitter and optimized DMA bus transactions.",
      "Engineered automated sensor error detection and fallback safe modes."
    ]
  },
  {
    weekNumber: 12,
    title: "Edge AI Vision & MediaPipe Pipeline Integration",
    topic: "TensorFlow Lite Micro, Real-Time Landmark Tracking & On-Device Inference",
    timeline: "Week 12 • Mar 2025",
    duration: "45 Working Hours",
    location: "AI & Computer Vision Studio",
    summary: "Deploying quantized gesture recognition models on edge compute hardware for low-latency assistive translation.",
    status: "CURRICULUM SCHEDULED",
    isDocumented: false,
    tag: "Edge AI",
    bullets: [
      "Integrated MediaPipe Hands pipeline for 21 3D spatial hand landmark tracking.",
      "Quantized deep learning neural nets to INT8 for sub-30ms inference on edge devices.",
      "Trained custom sign gesture classification models with 94%+ accuracy.",
      "Streamed real-time prediction overlays to client frontend via WebSockets."
    ]
  },
  {
    weekNumber: 13,
    title: "Cloud Telemetry, WebSockets & Live Dashboards",
    topic: "MQTT Message Brokers, WebSocket Feeds & Responsive React UI",
    timeline: "Week 13 • Mar 2025",
    duration: "45 Working Hours",
    location: "Cloud & Network Lab",
    summary: "Establishing bidirectional hardware-to-cloud streams with live data visualization and alert notifications.",
    status: "CURRICULUM SCHEDULED",
    isDocumented: false,
    tag: "IoT Cloud",
    bullets: [
      "Provisioned EMQX MQTT broker with TLS encryption and user authorization.",
      "Built real-time React dashboard with dynamic live telemetry gauges and charting.",
      "Configured automated anomaly alert triggers via push notifications.",
      "Stress-tested 10,000+ simulated messages/sec with zero message loss."
    ]
  },
  {
    weekNumber: 14,
    title: "Beta Hardware Packaging & Environmental Testing",
    topic: "Drop Resistance, Thermal Stress Profiling & Power Consumption",
    timeline: "Week 14 • Mar 2025",
    duration: "45 Working Hours",
    location: "Reliability Engineering Center",
    summary: "Evaluating physical beta prototype packaging under real-world mechanical stress and continuous operating duty cycles.",
    status: "CURRICULUM SCHEDULED",
    isDocumented: false,
    tag: "Beta Build",
    bullets: [
      "Conducted 1.2m drop tests and vibration bench vibration profiling.",
      "Measured current consumption profiles across sleep, idle, and full transmission modes.",
      "Optimized power management circuitry to extend operational battery life by 35%.",
      "Applied conformal coating for moisture and dust protection."
    ]
  },
  {
    weekNumber: 15,
    title: "Phase 03 Beta Prototype User Validation",
    topic: "In-Situ Field Trials, Usability Metrics & Beta Feedback Loop",
    timeline: "Week 15 • Mar 2025",
    duration: "45 Working Hours",
    location: "Live Pilot Retail Store",
    summary: "Deploying functional beta prototypes in target environments, measuring transaction speeds and error rates.",
    status: "CURRICULUM SCHEDULED",
    isDocumented: false,
    tag: "Milestone 03",
    bullets: [
      "Deployed 3 Beta hardware units in a live retail testbed for 72-hour trial.",
      "Recorded quantitative usability metrics, transaction times, and user satisfaction.",
      "Gathered feedback from 50+ real shoppers and store associates.",
      "Compiled actionable punchlist for final Phase 04 product refinement."
    ]
  },

  // Phase 04: Product Integration & Venture Launch (Weeks 16-20)
  {
    weekNumber: 16,
    title: "Design for Manufacturing (DFM) & Bill of Materials",
    topic: "Injection Molding Feasibility, Component Sourcing & BOM Costing",
    timeline: "Week 16 • Apr 2025",
    duration: "45 Working Hours",
    location: "Manufacturing Systems Lab",
    summary: "Analyzing production economics, tooling expenses, supplier logistics, and unit assembly labor times.",
    status: "CURRICULUM SCHEDULED",
    isDocumented: false,
    tag: "DFM & BOM",
    bullets: [
      "Drafted comprehensive Bill of Materials (BOM) with Tier-1 and Tier-2 suppliers.",
      "Modified enclosure CAD for injection mold draft angles and parting lines.",
      "Estimated scaled unit production economics across 500 and 5,000 unit runs.",
      "Established assembly line SOPs to reduce manual manufacturing cycle times."
    ]
  },
  {
    weekNumber: 17,
    title: "Intellectual Property & Compliance Certification",
    topic: "Patent Landscaping, Prior Art Search & CE/FCC Safety Standards",
    timeline: "Week 17 • Apr 2025",
    duration: "45 Working Hours",
    location: "IP & Legal Clinic, FORGE",
    summary: "Drafting provisional patent claims, documenting novel algorithm claims, and ensuring regulatory compliance.",
    status: "CURRICULUM SCHEDULED",
    isDocumented: false,
    tag: "IP & Patents",
    bullets: [
      "Conducted extensive patent prior art search across USPTO and Indian Patent Office.",
      "Drafted provisional patent disclosure for multi-modal gesture sensor fusion.",
      "Reviewed CE / FCC electromagnetic compatibility (EMC) compliance criteria.",
      "Compiled product technical file and electrical safety test reports."
    ]
  },
  {
    weekNumber: 18,
    title: "Unit Economics & Business Model Canvas",
    topic: "CAC/LTV Modelling, Pricing Strategy & Go-To-Market Strategy",
    timeline: "Week 18 • Apr 2025",
    duration: "45 Working Hours",
    location: "Venture Incubation Hub",
    summary: "Developing venture monetization strategies, recurring SaaS margins, and B2B deployment agreements.",
    status: "CURRICULUM SCHEDULED",
    isDocumented: false,
    tag: "Venture Model",
    bullets: [
      "Built financial model detailing Hardware-as-a-Service (HaaS) unit economics.",
      "Calculated customer acquisition cost (CAC) and customer lifetime value (LTV).",
      "Mapped B2B enterprise sales funnel for commercial retail chains.",
      "Identified pilot deployment partners for post-fellowship rollouts."
    ]
  },
  {
    weekNumber: 19,
    title: "Demo Day Rehearsal & Pitch Deck Engineering",
    topic: "Executive Storytelling, Investor Deck Design & Live Demo Staging",
    timeline: "Week 19 • Apr 2025",
    duration: "45 Working Hours",
    location: "Auditorium & Pitch Stage",
    summary: "Rehearsing dynamic hardware-software live demonstrations for industrial stakeholders and angel investors.",
    status: "CURRICULUM SCHEDULED",
    isDocumented: false,
    tag: "Pitch Rehearsal",
    bullets: [
      "Engineered high-impact 10-slide investor pitch deck with interactive metrics.",
      "Conducted 5+ dry run live hardware product demonstrations under time constraints.",
      "Refined executive narrative emphasizing market size, traction, and competitive moat.",
      "Prepared Q&A defense playbook addressing technical and commercial inquiries."
    ]
  },
  {
    weekNumber: 20,
    title: "ProtoSem Grand Finale & Hardware Venture Launch",
    topic: "Graduation Showcase, Investor Demo Day & Venture Incubation",
    timeline: "Week 20 • May 2025",
    duration: "50 Working Hours",
    location: "Grand Convention Hall & FORGE Accelerator",
    summary: "Culmination of the 20-week fellowship: full prototype demonstration, FORGE incubation transition, and graduation showcase.",
    status: "FELLOWSHIP FINALE",
    isDocumented: false,
    tag: "Grand Finale",
    bullets: [
      "Presented live hardware prototype at FORGE ProtoSem Demo Day before 200+ attendees.",
      "Demonstrated real-time AI translation and smart retail interaction without latency.",
      "Transitioned intellectual property and project assets to startup incubation track.",
      "Formally awarded Innovation Engineer Trainee Fellowship Graduate credential."
    ]
  }
];

export const PROTOSEM_WEEKS = WEEK_CURRICULUM.map((item) => {
  const weekNum = item.weekNumber;
  const phaseId = Math.ceil(weekNum / 5);
  const formattedWeek = `WEEK ${weekNum < 10 ? '0' + weekNum : weekNum}`;

  return {
    ...item,
    id: `week-${weekNum < 10 ? '0' + weekNum : weekNum}`,
    weekNumber: weekNum,
    phaseId: phaseId,
    phase: `PHASE 0${phaseId}`,
    weekFormatted: formattedWeek,
    status: item.status,
    isDocumented: item.isDocumented,
    title: item.title,
    topic: item.topic,
    timeline: item.timeline,
    duration: item.duration,
    location: item.location,
    bullets: item.bullets,
    summary: item.summary,
    tag: item.tag,
    quote: item.summary,
    oneLineSummary: item.summary,
    description: `${item.title}: ${item.topic}. ${item.summary}`,
    activities: item.bullets || [item.topic, item.summary],
    technologies: [item.tag, `Phase 0${phaseId}`],
    photos: weekNum === 6 ? [
      { src: '/protosem/week-06/img1-fusion-interface.png', caption: 'Fusion 360 Workspace' },
      { src: '/protosem/week-06/img7-rdworks-kalam-laser.png', caption: 'RDWorks Laser Cutting' },
      { src: '/protosem/week-06/oppo-case-physical-output.png', caption: '3D Printed Phone Case' }
    ] : [],
    outcomes: [item.summary],
    reflection: null
  };
});
