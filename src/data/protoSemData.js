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
      startWeek: 1,
      endWeek: 5
    },
    {
      id: 2,
      phaseCode: "PHASE 02",
      phaseTitle: "PHASE 02 — WEEKS 06–10",
      startWeek: 6,
      endWeek: 10
    },
    {
      id: 3,
      phaseCode: "PHASE 03",
      phaseTitle: "PHASE 03 — WEEKS 11–15",
      startWeek: 11,
      endWeek: 15
    },
    {
      id: 4,
      phaseCode: "PHASE 04",
      phaseTitle: "PHASE 04 — WEEKS 16–20",
      startWeek: 16,
      endWeek: 20
    }
  ]
};

// Generate exactly 20 structured future story chapters with Week 1 populated
export const PROTOSEM_WEEKS = Array.from({ length: 20 }, (_, i) => {
  const weekNum = i + 1;
  const phaseId = Math.ceil(weekNum / 5);
  const formattedWeek = `WEEK ${weekNum < 10 ? '0' + weekNum : weekNum}`;
  
  // Populated Week 01 Documentation & Photos
  if (weekNum === 1) {
    return {
      id: 'week-01',
      weekNumber: 1,
      phaseId: 1,
      phase: 'PHASE 01',
      weekFormatted: 'WEEK 01',
      status: 'DOCUMENTED // INAUGURATION & FOUNDATION',
      isDocumented: true,
      title: 'PRICE ProtoSem Inauguration, Self-Discovery & Foundations',
      storyTitle: 'PRICE ProtoSem Inauguration, Self-Discovery & Foundations',
      quote: 'Week 01 was an introductory and foundation-building week where we focused on self-awareness, teamwork, professional development, prompting, entrepreneurship and getting prepared for the PRICE ProtoSem journey.',
      oneLineSummary:
        'Week 01 was an introductory and foundation-building week where we focused on self-awareness, teamwork, professional development, prompting, entrepreneurship and getting prepared for the PRICE ProtoSem journey.',
      description:
        'Week 01 was mainly about getting introduced to the PRICE ProtoSem environment, understanding ourselves, building connections, and preparing for the upcoming learning journey.',
      activities: [
        'Completed personal details, cohort registration, and self-introduction activities.',
        'Participated in the 16 Personality Test and reflected on our personality profiles.',
        'Selected an inspiring story from ZenoPencil and presented how it relates to our individual engineering ethos.',
        'Obtained an initial overview of INDEX and learned about LinkedIn optimization & professional identity.',
        'Participated in interactive teamwork games (Imposter and Among Us) to build cohort dynamics.',
        'Attended the official PRICE ProtoSem Launch and Inauguration at Sarabhai Kalam Theater, KCT Campus.',
        'Keynote session by Mr. Kumar Rajagopalan (CEO, Retailers Association of India - RAI) on Gen Z Consumer Experience & Retail Innovation.',
        'Participated in a Tech Talk on the Art of Prompting and generative AI workflows.',
        'Started hands-on engagement with the ProtoSem digital platform, blog writing, and field note documentation.',
        'Attended entrepreneurship-oriented sessions including the YEP (Young Entrepreneurs Programme) Kick-Off & Orientation Batch 2026.'
      ],
      technologies: [
        'ProtoSem Ecosystem',
        'Generative AI & Prompt Engineering',
        'INDEX Framework',
        'LinkedIn & Professional Branding',
        'Phygital Retail Principles',
        'YEP Entrepreneurship'
      ],
      photos: [
        {
          src: '/protosem/week-01/img1.jpg',
          caption: 'PRICE ProtoSem Official Inauguration at Sarabhai Kalam Theater, KCT Campus'
        },
        {
          src: '/protosem/week-01/img2.jpg',
          caption: 'Inauguration Address on Phygital Retail, Intelligent Commerce & Entrepreneurship'
        },
        {
          src: '/protosem/week-01/img3.jpg',
          caption: 'Special Address by Mr. Kumar Rajagopalan (CEO, Retailers Association of India - RAI)'
        },
        {
          src: '/protosem/week-01/img4.jpg',
          caption: 'Collaborative Cohort Ideation, Problem Statement Mapping & Team Discussions'
        },
        {
          src: '/protosem/week-01/img5.jpg',
          caption: 'YEP Kick-Off Batch 2026 on World Entrepreneurs’ Day with Ms. Swathi Sri'
        }
      ],
      outcomes: [
        'Established clear self-awareness and alignment with the PRICE ProtoSem mission.',
        'Formed close collaborative bonds with multidisciplinary cohort peers.',
        'Gained valuable retail-tech industry perspective directly from RAI leadership.'
      ],
      reflection:
        'Overall, Week 01 helped us move from self-awareness and teamwork toward professional, entrepreneurial and technology-oriented learning.'
    };
  }

  // Week 06 - Industrial-Ready Prototyping
  if (weekNum === 6) {
    return {
      id: 'week-06',
      weekNumber: 6,
      phaseId: 2,
      phase: 'PHASE 02',
      weekFormatted: 'WEEK 06',
      status: 'DOCUMENTED // INDUSTRIAL-READY PROTOTYPING',
      isDocumented: true,
      title: 'Industrial-Ready Prototyping (CAD, Laser Cutting & 3D Printing)',
      storyTitle: 'Industrial-Ready Prototyping (CAD, Laser Cutting & 3D Printing)',
      topic: 'Industrial-Ready Prototyping & Digital Fabrication',
      quote:
        'Week 6 marked a pivotal milestone in my engineering journey—transitioning from digital CAD concepts to physical hardware execution through parametric 3D modelling, CNC laser cutting, physical clay validation, and high-speed multi-material 3D printing.',
      oneLineSummary:
        'Practical immersion into industrial-ready prototyping covering Autodesk Fusion 360 CAD modelling, RDWorks V8 laser cutting/engraving at FabLab Coimbatore, physical clay prototyping, and Bambu Studio 3D printing for a custom embossed OPPO A3x 5G case.',
      description:
        'During Week 6 (26 September 2026 – 29 September 2026), we undertook intensive practical sessions in digital manufacturing and industrial-ready prototyping. The curriculum spanned end-to-end product realization: from establishing parametric 2D sketches and 3D solid bodies in Autodesk Fusion 360, to tactile low-fidelity clay prototyping, configuring vector CAM layers in RDWorks V8 for CNC laser cutting at FabLab Coimbatore, and engineering a functional snap-fit mobile enclosure for the OPPO A3x 5G prepared and fabricated via Bambu Studio and high-speed 3D printing systems.',
      quickStats: [
        { label: 'CAD / CAM SUITES', value: 'Fusion 360 • RDWorks • Bambu' },
        { label: 'FABRICATION LAB', value: 'FabLab Coimbatore' },
        { label: 'TARGET PRODUCT', value: 'OPPO A3x 5G Custom Enclosure' },
        { label: 'SNAP-FIT CLEARANCE', value: '±0.15 mm Snug Tolerance' }
      ],
      activities: [
        'DAY 1: Mastered Autodesk Fusion 360 UI hierarchy, document settings, metric units (mm, g), origin planes, and timeline-based parametric design history.',
        'DAY 1: Executed precision 2D sketches utilizing Lines, Arcs, Free-form Splines, Circles, Offsets, Dimensional Constraints, and Mirror symmetry.',
        'DAY 1: Applied advanced 3D solid operations: Extrude (Join/Cut), Fillet stress relief, Chamfer edge finishing, and Circular/Rectangular Pattern repetitions.',
        'DAY 1: Engineered two distinct mechanical CAD models: Design 1 (cylindrical patterned gear assembly) and Design 2 (isometric chamfered bracket).',
        'DAY 1: Sculpted a physical multi-colored clay house prototype to evaluate tangible spatial ergonomics, layout, and entrance architecture before digital commitment.',
        'DAY 2: Installed, configured, and calibrated RDWorks V8 CAM software for CO2 CNC laser cutting systems at FabLab Coimbatore.',
        'DAY 2: Processed dual-layer vector artwork of Dr. APJ Abdul Kalam: Layer 1 (Blue) Laser Scan engraving @ 100 mm/s & 30% Power + Layer 2 (Black) through-cut contour.',
        'DAY 2: Calibrated laser optical focal distance, operated smoke extraction systems, and executed supervised live cutting following laboratory safety protocols.',
        'DAY 3: Explored Additive Manufacturing & DfAM fundamentals: layer deposition dynamics, PEI build plates, support-free overhangs (≤ 45°), and slicing pipelines.',
        'DAY 3: Reverse-engineered physical OPPO A3x 5G device dimensions with caliper measurements: camera module island, speaker ports, and button reliefs.',
        'DAY 3: Designed 1.8mm uniform wall thickness snap-fit case featuring custom embossed lettering ("LINGARAJ") and inspirational bilingual scriptures.',
        'DAY 3: Configured Bambu Studio slicing: 0.2mm layer height, 15% gyroid infill, 3 perimeter wall loops, textured PEI plate, and executed physical 3D print.'
      ],
      dailyModules: [
        {
          dayNumber: 1,
          date: '26 September 2026',
          title: 'Autodesk Fusion 360, 2D/3D CAD Modelling & Tangible Clay Prototyping',
          focus: 'Parametric CAD Fundamentals, 3D Solid Feature Operations & Low-Fidelity Ergonomic Prototyping',
          sections: [
            {
              heading: '1. Fusion 360 Environment & Parametric Hierarchy',
              points: [
                'Installed and calibrated Autodesk Fusion 360 workstation environment for industrial product design.',
                'Configured Document Settings and Measurement Units to Standard Metric (millimetres mm, grams g).',
                'Explored Cartesian Origin (X, Y, Z coordinate reference system) and plane selection (XY, XZ, YZ).',
                'Studied design hierarchy: Components, Solid Bodies, 2D Sketches, Construction Geometry, and non-destructive Timeline History.'
              ]
            },
            {
              heading: '2. Mastering the 2D Create Sketch Environment',
              points: [
                'Basic Geometry: Line, Midpoint Line, 2-Point & Center Rectangles, Center-Diameter Circles, and 3-Point Arcs.',
                'Complex Profiles: Polygons, Ellipses, Free-form Spline curves, Points, and Project/Include geometry references.',
                'Geometric & Dimensional Constraints: Applied Horizontal/Vertical, Coincident, Concentric, Tangent, and Exact Sketch Dimensions.',
                'Pattern Arrays: Configured Circular Pattern circular arrays and Rectangular Pattern coordinate grids.'
              ]
            },
            {
              heading: '3. Core 3D Solid Feature Modelling Operations',
              points: [
                'Extrude: Transformed 2D profile sketches into solid 3D geometry with defined extrusion depth and taper angles.',
                'Fillet & Chamfer: Applied smooth ergonomic radii and bevelled edges for mechanical stress relief and aesthetics.',
                'Mirror: Duplicated complex 3D features across symmetrical construction reference planes.',
                'Patterning: Multiplying repeated solid features along directional axes and circular paths.'
              ]
            },
            {
              heading: '4. Creation of Two Practical Engineering CAD Designs',
              points: [
                'Design 1: Engineered a multi-tiered cylindrical machine component featuring extruded concentric steps, gear cutouts, and patterned recesses.',
                'Design 2: Modelled an isometric mechanical bracket with chamfered structural ribs and multi-angle spatial inspection.'
              ]
            },
            {
              heading: '5. Low-Fidelity Clay-Based Tangible Prototyping',
              points: [
                'Explored the fundamental product realization cycle: Idea → Design → Tactile Form → Digital CAD → Prototype.',
                'Sculpted a physical multi-colored clay house model featuring main structure, angled roof, entrance portico, pathway, and perimeter boundaries.',
                'Demonstrated how low-fidelity physical materials enable rapid spatial evaluation and tactile ergonomics prior to digital investment.'
              ]
            }
          ],
          photos: [
            {
              src: '/protosem/week-06/img1-fusion-interface.png',
              caption: 'Autodesk Fusion 360 Workspace, Browser & Document Settings'
            },
            {
              src: '/protosem/week-06/img2-sketch-tools.png',
              caption: 'Fusion 360 Create Sketch Environment & 2D Toolset (Lines, Curves & Constraints)'
            },
            {
              src: '/protosem/week-06/img3-fusion-design1.png',
              caption: 'Fusion 360 Design 1 — Extruded & Patterned Cylindrical Assembly'
            },
            {
              src: '/protosem/week-06/img4-fusion-design2.png',
              caption: 'Fusion 360 Design 2 — Isometric View & Feature-Based 3D Modeling'
            },
            {
              src: '/protosem/week-06/img5-clay-prototype.png',
              caption: 'Physical Clay House Prototype — Hands-on Form Exploration & Tangible Prototyping'
            }
          ]
        },
        {
          dayNumber: 2,
          date: '28 September 2026',
          title: 'Laser Cutting Technology, RDWorks V8 CAM & FabLab Coimbatore Execution',
          focus: 'Subtractive Fabrication, Vector Layer Calibration & CNC Laser Machine Safety Protocols',
          sections: [
            {
              heading: '1. RDWorks V8 CAM Architecture & Workspace Setup',
              points: [
                'Installed and calibrated RDWorks V8 machine controller software for CNC CO2 laser cutting systems.',
                'Explored UI toolbars: Workbed Boundary (X/Y mm), Vector Layer Manager, Object Scaling, Coordinate Positioning, and Laser Work Settings.',
                'Configured communication parameters with the laser DSP motion controller.'
              ]
            },
            {
              heading: '2. Working Principle of Laser Cutting vs Raster Engraving',
              points: [
                'Laser Scan (Engrave Mode): Rapid back-and-forth beam oscillation vaporizing surface layers for photographic/graphic contrast.',
                'Laser Cut (Through-Material Slicing): Continuous high-power focused beam delivering through-thickness separation.',
                'Calibrated key parameters: Laser Power (%), Speed (mm/s), Material Thickness, Focal Length, and Pass Count.'
              ]
            },
            {
              heading: '3. Practical Laser Fabrication: Dr. APJ Abdul Kalam Job',
              points: [
                'Imported vector profile of Dr. APJ Abdul Kalam into RDWorks V8 workspace.',
                'Layer 1 (Blue Layer): Laser Scan raster engraving configured at 100 mm/s Speed and 30% Laser Power.',
                'Layer 2 (Black Layer): Laser Cut through-cut contour for the outer frame and top hanging cutout.',
                'Transferred compiled CAM job to CNC laser cutter controller and set material home coordinate (X0, Y0).'
              ]
            },
            {
              heading: '4. FabLab Safety Protocols & Operational Execution',
              points: [
                'Calibrated optical focal distance using manual step gauge block between laser nozzle and material sheet.',
                'Activated high-volume fume extraction ventilation and air-assist nozzle to eliminate combustion flare-up.',
                'Maintained continuous visual supervision throughout the active laser cutting cycle adhering to laboratory protocols.'
              ]
            }
          ],
          photos: [
            {
              src: '/protosem/week-06/img6-rdworks-install.png',
              caption: 'RDWorks V8 Laser Cutting Software Setup & Machine Controller Configuration'
            },
            {
              src: '/protosem/week-06/img7-rdworks-kalam-laser.png',
              caption: 'RDWorks V8 Laser Fabrication Job — Dr. APJ Abdul Kalam Laser Scan & Cut Profile'
            },
            {
              src: '/protosem/week-06/fablab-laser-cutting.png',
              caption: 'Hands-on Laser Cutting Machine Operation & Safety Protocol at FabLab Coimbatore'
            }
          ]
        },
        {
          dayNumber: 3,
          date: '29 September 2026',
          title: '3D Printing, Bambu Studio Slicing & OPPO A3x 5G Custom Phone Case Fabrication',
          focus: 'Additive Manufacturing, DfAM Guidelines, G-code Toolpaths & Custom Embossed Physical Output',
          sections: [
            {
              heading: '1. Additive Manufacturing Pipeline & DfAM Principles',
              points: [
                'Explored fused deposition modeling (FDM): layer-by-layer polymer deposition vs subtractive fabrication.',
                'Complete realization pipeline: 3D Concept → Parametric CAD → Slicing G-code → Machine Execution → Inspection.',
                'Design for Additive Manufacturing (DfAM): Self-supporting overhang angle limits (≤ 45°), bridge spans, and thermal bed adhesion.'
              ]
            },
            {
              heading: '2. Product Engineering: OPPO A3x 5G Custom Phone Case',
              points: [
                'Reverse-engineered physical device dimensions with precision caliper: corner radii, thickness, and component offsets.',
                'Engineered 1.8mm uniform wall thickness with ±0.15mm interference snap-fit lip for a secure mechanical grip.',
                'Modelled custom pass-through reliefs: dual camera module island, LED flash, volume rockers, power key, and speaker grills.',
                'Integrated custom embossed typography: bold personalized lettering ("LINGARAJ") and inspirational bilingual scriptures.'
              ]
            },
            {
              heading: '3. Bambu Studio Slicing Configuration & Toolpath Inspection',
              points: [
                'Configured Bambu Studio with target high-speed CoreXY 3D printer profile and textured PEI build plate.',
                'Calibrated slicing parameters: 0.20 mm layer height, 3 perimeter wall loops, 15% gyroid infill pattern, 220°C nozzle temp, 55°C bed temp.',
                'Generated sliced preview to verify toolpath flow, nozzle travel speeds (up to 250 mm/s), and seamless seam placement.'
              ]
            },
            {
              heading: '4. Physical Machine Execution & Prototype Validation',
              points: [
                'Supervised automatic bed levelling (ABL), resonance frequency calibration, and first-layer PEI adhesion check.',
                'Operated Bambu Lab touch screen interface and multi-material AMS unit.',
                'Inspected completed physical 3D print: validated snap-fit retention, tactile lettering depth, and dimensional accuracy.'
              ]
            }
          ],
          photos: [
            {
              src: '/protosem/week-06/img8-bambu-oppo-case.png',
              caption: 'Bambu Studio 3D Printing Preparation — OPPO A3x 5G Mobile Case Prototype on Build Plate'
            },
            {
              src: '/protosem/week-06/bambu-3d-printer-operation.jpg',
              caption: 'Operating Bambu Lab 3D Printer Interface & Calibrating Multi-Material AMS System'
            },
            {
              src: '/protosem/week-06/oppo-case-physical-output.png',
              caption: 'Final 3D Printed OPPO A3x 5G Custom Phone Case — Physical Output with Embossed Typography'
            }
          ]
        }
      ],
      specs: [
        { label: '3D CAD Software', value: 'Autodesk Fusion 360 (Parametric)' },
        { label: 'Laser Cutting CAM', value: 'RDWorks V8 (CNC DSP)' },
        { label: '3D Slicing Engine', value: 'Bambu Studio (G-code Generator)' },
        { label: 'Laser Engrave Calibration', value: '100 mm/s Speed • 30% Power' },
        { label: '3D Slicing Parameters', value: '0.20mm Layer • 15% Gyroid • 3 Walls' },
        { label: 'Target Product', value: 'OPPO A3x 5G Custom Snap-Fit Case' },
        { label: 'Snap-Fit Tolerance', value: '±0.15mm Interference Fit' },
        { label: 'Tactile Form Study', value: 'Low-Fidelity Clay House Model' },
        { label: 'Fabrication Facility', value: 'FabLab Coimbatore' }
      ],
      realizationStages: [
        {
          stage: '01',
          title: 'Parametric CAD & Slicing Toolpaths',
          subtitle: 'Autodesk Fusion 360 & Bambu Studio',
          description: 'Reverse-engineering smartphone dimensions with vernier calipers (~165.7 x 76.0 x 7.7mm), 1.8mm shell wall thickness, embossed bilingual typography ("LINGARAJ"), and 0.20mm layer G-code toolpath slicing in Bambu Studio.',
          badge: 'DIGITAL STAGE',
          image: '/protosem/week-06/img8-bambu-oppo-case.png',
          caption: 'Bambu Studio 3D plate preview with precise wall loops and Gyroid infill'
        },
        {
          stage: '02',
          title: 'CoreXY Additive Execution',
          subtitle: 'Bambu Lab 3D Printer & Multi-Material AMS',
          description: 'Automated bed levelling (ABL), resonance frequency input shaping, multi-material AMS filament routing, and high-speed extrusion onto textured PEI build plate at FabLab.',
          badge: 'FABRICATION STAGE',
          image: '/protosem/week-06/bambu-3d-printer-operation.jpg',
          caption: 'Active high-speed Bambu Lab 3D printer operation and interface monitor'
        },
        {
          stage: '03',
          title: 'Physical Snap-Fit Realization',
          subtitle: 'OPPO A3x 5G Custom Phone Case',
          description: 'Inspecting physical manufactured case: zero-rattle snap-fit retention, clean port apertures, crisp embossed "LINGARAJ" lettering, and tactile durability.',
          badge: 'PHYSICAL REALIZATION',
          image: '/protosem/week-06/oppo-case-physical-output.png',
          caption: 'Final physical 3D printed phone case with embossed typography in hand'
        }
      ],
      pipelineSteps: [
        { step: '01', name: 'Concept & Needs', desc: 'Smartphone protection & custom embossed aesthetics requirements' },
        { step: '02', name: '2D Constraints', desc: 'Precision caliper measurements, profiles, and sketch constraints' },
        { step: '03', name: '3D CAD Solid', desc: 'Fusion 360 shell extrusion, port reliefs, fillets & typography' },
        { step: '04', name: 'CAM & Slicing', desc: 'RDWorks V8 laser layers & Bambu Studio 0.20mm G-code slicing' },
        { step: '05', name: 'Digital Fabrication', desc: 'CO2 laser cutting at FabLab Coimbatore & Bambu CoreXY 3D print' },
        { step: '06', name: 'Physical Validation', desc: 'Snap-fit tolerance fit testing & tactile ergonomics verification' }
      ],
      technologies: [
        'Autodesk Fusion 360',
        'RDWorks V8 (Laser CAM)',
        'Bambu Studio (3D Slicing)',
        '3D CAD & Parametric Modeling',
        'CNC Laser Cutting & Raster Engraving',
        'Additive Manufacturing & 3D Printing (DfAM)',
        'Physical Clay Rapid Prototyping',
        'OPPO A3x 5G Custom Product Engineering',
        'High-Speed CoreXY 3D Printers (AMS)',
        'FabLab Laboratory Safety & Optical Calibration'
      ],
      photos: [
        {
          src: '/protosem/week-06/img1-fusion-interface.png',
          caption: 'Autodesk Fusion 360 Workspace, Browser Hierarchy & Document Units Configuration'
        },
        {
          src: '/protosem/week-06/img2-sketch-tools.png',
          caption: 'Fusion 360 Create Sketch Environment & 2D Toolset (Lines, Curves & Constraints)'
        },
        {
          src: '/protosem/week-06/img3-fusion-design1.png',
          caption: 'Fusion 360 Design 1 — Extruded & Patterned Cylindrical Assembly'
        },
        {
          src: '/protosem/week-06/img4-fusion-design2.png',
          caption: 'Fusion 360 Design 2 — Isometric View & Feature-Based 3D Modeling'
        },
        {
          src: '/protosem/week-06/img5-clay-prototype.png',
          caption: 'Physical Clay House Prototype — Hands-on Form Exploration & Tangible Prototyping'
        },
        {
          src: '/protosem/week-06/img6-rdworks-install.png',
          caption: 'RDWorks V8 Laser Cutting Software Setup & Machine Controller Configuration'
        },
        {
          src: '/protosem/week-06/img7-rdworks-kalam-laser.png',
          caption: 'RDWorks V8 Laser Fabrication Job — Dr. APJ Abdul Kalam Laser Scan & Cut Profile'
        },
        {
          src: '/protosem/week-06/fablab-laser-cutting.png',
          caption: 'Hands-on Laser Cutting Machine Operation & Safety Protocol at FabLab Coimbatore'
        },
        {
          src: '/protosem/week-06/img8-bambu-oppo-case.png',
          caption: 'Bambu Studio 3D Printing Preparation — OPPO A3x 5G Mobile Case Prototype on Build Plate'
        },
        {
          src: '/protosem/week-06/bambu-3d-printer-operation.jpg',
          caption: 'Operating Bambu Lab 3D Printer Interface & Calibrating Multi-Material AMS System'
        },
        {
          src: '/protosem/week-06/oppo-case-physical-output.png',
          caption: 'Final 3D Printed OPPO A3x 5G Custom Phone Case — Physical Output with Embossed Typography'
        }
      ],
      outcomes: [
        'End-to-End Digital-to-Physical Competency: Mastered the full realization cycle from 2D sketch constraints to parametric CAD, vector CAM, G-code slicing, and physical machine operation.',
        'Dual Fusion 360 Engineering CAD Models: Developed precision cylindrical patterned machine geometry and an isometric chamfered mechanical assembly.',
        'Subtractive Laser Fabrication Competency: Acquired practical mastery in RDWorks V8, dual-layer engraving/cutting calibration, optical focal alignment, and laboratory fire safety protocols at FabLab Coimbatore.',
        'Real-World Product Engineering: Reverse-engineered, modelled, sliced, and successfully 3D-printed a functional snap-fit phone case for OPPO A3x 5G with embossed typography and tight ±0.15mm tolerance.',
        'Tangible Prototyping Skills: Bridged low-fidelity clay spatial massing with high-fidelity additive polymer manufacturing for real-world industrial product development.'
      ],
      reflection:
        'Week 6 was an important transition from learning design concepts to actually understanding how digital designs can be manufactured. I started with basic CAD sketching in Fusion 360, where I learned how simple sketches can be developed into detailed 3D models using tools such as Extrude, Fillet, Mirror, and Rectangular Pattern. The clay activity then helped me understand physical prototyping from a more hands-on perspective. Later, the laser-cutting session introduced me to digital fabrication using RDWorks V8 and helped me understand how parameters such as speed and power affect manufacturing. Finally, the 3D-printing session allowed me to apply CAD modelling to a real-world product by designing a mobile phone cover for the OPPO A3x 5G and learning how the model can be prepared for 3D printing using Bambu Studio. Overall, this week helped me understand the complete journey from concept and design to fabrication and physical prototype, which is an important foundation for industrial product development.'
    };
  }

  return {
    id: `week-${weekNum < 10 ? '0' + weekNum : weekNum}`,
    weekNumber: weekNum,
    phaseId: phaseId,
    phase: `PHASE 0${phaseId}`,
    weekFormatted: formattedWeek,
    status: 'FIELD NOTES IN PROGRESS',
    isDocumented: false,
    title: `Week ${weekNum < 10 ? '0' + weekNum : weekNum} Milestone`,
    storyTitle: null,
    quote: null,
    teaser: 'This chapter of the ProtoSem journey will be documented soon.',
    description: 'This chapter of the ProtoSem journey will be documented soon.',
    activities: [],
    technologies: [],
    photos: [],
    outcomes: [],
    reflection: null
  };
});
