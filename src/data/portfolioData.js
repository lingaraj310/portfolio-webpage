export const LOCATIONS = [
  {
    id: 'about',
    title: 'About Me',
    tagline: 'Identity & Vision Hub',
    city: 'Madurai',
    country: 'India',
    region: 'Tamil Nadu',
    lat: 9.9252,
    lng: 78.1198,
    altitude: 1.6,
    color: '#00f0ff',
    iconName: 'User',
    sectorCode: 'SECTOR-01-IND',
    description: 'Home base & origin coordinates. Computer Science Engineering student and future product builder.'
  },
  {
    id: 'projects',
    title: 'Projects',
    tagline: 'Innovation & Research Prototypes',
    city: 'Tokyo',
    country: 'Japan',
    region: 'Kanto',
    lat: 35.6762,
    lng: 139.6503,
    altitude: 1.6,
    color: '#00f0ff',
    iconName: 'Cpu',
    sectorCode: 'SECTOR-02-JPN',
    description: 'Sign Bridge AI & JPED (Jesus Personalized Education).'
  },
  {
    id: 'experience',
    title: 'Experience',
    tagline: 'Leadership & Team Dynamics',
    city: 'New York',
    country: 'USA',
    region: 'East Coast',
    lat: 40.7128,
    lng: -74.0060,
    altitude: 1.6,
    color: '#00f0ff',
    iconName: 'Users',
    sectorCode: 'SECTOR-03-USA',
    description: 'Innovation Forge Trainee at FORGE, student leadership, and sprint hackathons.'
  },
  {
    id: 'skillset',
    title: 'Skillset',
    tagline: 'Technical Competency Matrix',
    city: 'Berlin',
    country: 'Germany',
    region: 'Central Europe',
    lat: 52.5200,
    lng: 13.4050,
    altitude: 1.6,
    color: '#00f0ff',
    iconName: 'Code2',
    sectorCode: 'SECTOR-04-DEU',
    description: 'Core languages, Flutter mobile development, database architectures, and emerging AI tools.'
  },
  {
    id: 'protosem',
    title: 'ProtoSem',
    tagline: '20-Week Innovation Journey',
    city: 'San Francisco',
    country: 'USA',
    region: 'West Coast',
    lat: 37.7749,
    lng: -122.4194,
    altitude: 1.6,
    color: '#00f0ff',
    iconName: 'Compass',
    sectorCode: 'SECTOR-05-USA',
    description: 'PRICE ProtoSem: 20-week industry-integrated innovation programme across 4 phases.'
  },
  {
    id: 'education',
    title: 'Education',
    tagline: 'Academic Roadmap & Metrics',
    city: 'London',
    country: 'UK',
    region: 'Western Europe',
    lat: 51.5074,
    lng: -0.1278,
    altitude: 1.6,
    color: '#00f0ff',
    iconName: 'GraduationCap',
    sectorCode: 'SECTOR-06-GBR',
    description: 'B.E. in Computer Science & Engineering at Kumaraguru College of Technology (CGPA: 8.0/10.0).'
  },
  {
    id: 'contact',
    title: 'Contact',
    tagline: 'Sub-Orbital Communications',
    city: 'Singapore',
    country: 'Singapore',
    region: 'Southeast Asia',
    lat: 1.3521,
    lng: 103.8198,
    altitude: 1.6,
    color: '#00f0ff',
    iconName: 'Radio',
    sectorCode: 'SECTOR-07-SGP',
    description: 'Direct communications channels, LinkedIn, GitHub, and verified encrypted transmission.'
  },
  {
    id: 'resume',
    title: 'Resume',
    tagline: 'Verified Dossier & CV',
    city: 'Dubai',
    country: 'UAE',
    region: 'Middle East',
    lat: 25.2048,
    lng: 55.2708,
    altitude: 1.6,
    color: '#00f0ff',
    iconName: 'FileText',
    sectorCode: 'SECTOR-08-UAE',
    description: 'Comprehensive curriculum vitae, verified coursework, and printable profile.'
  },
  {
    id: 'hackathons',
    title: 'Hackathons',
    tagline: 'Rapid Prototyping Arenas',
    city: 'Sydney',
    country: 'Australia',
    region: 'New South Wales',
    lat: -33.8688,
    lng: 151.2093,
    altitude: 1.6,
    color: '#00f0ff',
    iconName: 'Trophy',
    sectorCode: 'SECTOR-09-AUS',
    description: 'CIT Hackathon, VERTX 2.0, Smart India Hackathon (SIH) 2025, and Ideathon.'
  }
];

export const PROFILE_INFO = {
  name: 'Lingaraj',
  title: 'Computer Science Engineering Student & Future Product Builder',
  institution: 'Kumaraguru College of Technology',
  batch: '2024 – 2027 (3rd Year)',
  cgpa: '8.0 / 10.0',
  homeCoordinates: '10.7905° N, 78.7047° E (Madurai / Tamil Nadu)',
  identityLine: 'Computer Science Engineer in the Making. Problem Solver. Future Product Builder.',
  bio: 'A curious and persistent Computer Science Engineering student at Kumaraguru College of Technology who enjoys identifying real-world challenges, researching solutions, learning modern technology stacks, and transforming ideas into practical, high-impact prototypes.',
  longTermGoal: 'Combine strong engineering skills with product development, business, and entrepreneurship to eventually build a technology startup solving a meaningful real-world problem.',
  interests: ['Sports & Fitness', 'Global Travel & Geography', 'Emerging Tech Architecture', 'Competitive Hackathons']
};

export const PROJECTS_DATA = [
  {
    id: 'signbridge',
    title: 'Sign Bridge AI',
    subtitle: 'AI-Powered Assistive Communication Platform',
    category: 'Assistive Tech & Computer Vision',
    status: 'PROTOTYPE_STAGE',
    statusLabel: 'Prototype Built • Active Research Pipeline',
    statusColor: 'cyan',
    problem: 'Sign Bridge AI is an AI-powered assistive communication platform designed to make communication easier, faster, and more accessible for people with hearing and speech impairments.',
    fullDescription: `Sign Bridge AI is an AI-powered assistive communication platform designed to make communication easier, faster, and more accessible for people with hearing and speech impairments.

It uses Computer Vision, Machine Learning, and Artificial Intelligence to understand sign language gestures captured through a camera and convert them into meaningful text and speech.

Based on the recognized gestures, Sign Bridge AI can help users communicate by displaying the corresponding words or messages and converting them into speech for hearing users.

The platform is designed to support Indian Sign Language (ISL) and can be developed to recognize alphabets, numbers, common words, and eventually dynamic signs and sentences.

The system uses techniques such as hand detection, landmark extraction, feature processing, and machine learning classification to improve real-time sign recognition.

Sign Bridge AI also focuses on making communication more natural by providing features such as sentence formation, text-to-speech conversion, confidence-based predictions, and real-time camera interaction.

The platform can be further extended to support speech-to-sign communication, where spoken language can be converted into sign language through an animated avatar.

Ultimately, Sign Bridge AI aims to become a complete assistive communication ecosystem where AI and computer vision work together to reduce the communication barrier between sign-language users and the wider community.`,
    highlights: [
      'Real-time camera sign gesture capture & translation to text and speech',
      'Supports Indian Sign Language (ISL) alphabets, numbers, and common words',
      'Hand detection, landmark extraction & ML classification pipeline',
      'Sentence formation, text-to-speech conversion & confidence predictions',
      'Speech-to-sign roadmap with 3D animated avatar synthesis'
    ],
    stack: ['Flutter', 'Dart', 'Computer Vision', 'MediaPipe', 'Machine Learning', 'TensorFlow Lite', 'Text-to-Speech']
  },
  {
    id: 'jped',
    title: 'JPED (Jesus Personalized Education)',
    subtitle: 'AI-Driven Personalized Education Ecosystem',
    category: 'EdTech & Intelligent Learning',
    status: 'CONCEPT_STAGE',
    statusLabel: 'Conceptual Architecture & Feature Blueprint',
    statusColor: 'cyan',
    problem: 'JPED (Jesus Personalized Education) is a personalized education platform designed to make learning easier, smarter, and more meaningful for every student.',
    fullDescription: `JPED (Jesus Personalized Education) is a personalized education platform designed to make learning easier, smarter, and more meaningful for every student.

It uses AI to understand each student’s learning level, interests, strengths, and weaknesses. Based on this, JPED provides personalized lessons, study plans, explanations, practice, and guidance.

Students can learn through lectures, courses, notes, quizzes, projects, and interactive learning tools. The platform also connects students with teachers, mentors, career guidance, and learning resources.

JPED continuously tracks learning progress and adapts the learning experience according to the student. Its goal is to support not only academic growth but also skills, career development, creativity, and personal growth.

The project is inspired by Christian values and the teachings of Jesus, focusing on learning with purpose, discipline, and compassion.

Ultimately, JPED aims to become a complete next-generation educational ecosystem where technology and personalized learning work together to help every student grow.`,
    highlights: [
      'AI cognitive profiler understanding student level, strengths & weaknesses',
      'Personalized lessons, adaptive study roadmaps & mistake guidance',
      'Interactive lectures, courses, notes, quizzes & project-based modules',
      'Teacher, mentor & career guidance network integration',
      'Inspired by purpose, discipline, compassion, and holistic personal growth'
    ],
    stack: ['Adaptive AI Algorithms', 'Cognitive Diagnostic Modeling', 'Full-Stack Web/Mobile', 'NLP', 'Knowledge Graphs']
  }
];

export const SKILLS_DATA = {
  categories: [
    {
      name: 'Programming Languages',
      skills: [
        { name: 'C', level: 85, tag: 'Core Systems' },
        { name: 'C++', level: 82, tag: 'OOP & Algorithms' },
        { name: 'Java', level: 80, tag: 'Enterprise & Data Structures' }
      ]
    },
    {
      name: 'Mobile & Web Development',
      skills: [
        { name: 'Flutter', level: 88, tag: 'Cross-Platform UI' },
        { name: 'Dart', level: 85, tag: 'Mobile Architecture' },
        { name: 'HTML5 & CSS3', level: 90, tag: 'Frontend Basics' },
        { name: 'React', level: 75, tag: 'Active Deep Dive', active: true }
      ]
    },
    {
      name: 'Database & Tools',
      skills: [
        { name: 'MySQL', level: 80, tag: 'Relational DB' },
        { name: 'Git & GitHub', level: 88, tag: 'Version Control' },
        { name: 'VS Code & Linux', level: 85, tag: 'Dev Environment' }
      ]
    },
    {
      name: 'AI & Rapid Prototyping',
      skills: [
        { name: 'AI/ML Fundamentals', level: 72, tag: 'Algorithms & Models' },
        { name: 'Computer Vision Basics', level: 70, tag: 'Image Pipelines' },
        { name: 'Base44', level: 80, tag: 'No-Code Prototyping' }
      ]
    }
  ]
};

export const EDUCATION_DATA = {
  degree: 'Bachelor of Engineering (B.E.)',
  branch: 'Computer Science and Engineering',
  institution: 'Kumaraguru College of Technology',
  location: 'Coimbatore, Tamil Nadu, India',
  timeline: '2024 – 2027 (Currently in 3rd Year)',
  cgpa: '8.0 / 10.0',
  highlights: [
    'Strong foundation in Object-Oriented Programming, Data Structures, Algorithms, and Database Management Systems.',
    'Hands-on engagement in software prototyping, competitive hackathons, and technical design sprints.',
    'Selected for the prestigious PRICE ProtoSem Innovation Engineer Trainee programme.'
  ]
};

export const EXPERIENCE_DATA = {
  status: 'Innovation Forge Trainee & Student Leader',
  description: 'Undergoing intensive industry-integrated innovation training at FORGE while leading technical development in student cohorts and competitive sprint hackathons.',
  roles: [
    {
      role: 'INNOVATION FORGE TRAINEE',
      organization: 'FORGE Innovation & Ventures / PRICE ProtoSem',
      timeline: '2025 – Present • 20-Week Industry Programme',
      location: 'Coimbatore, Tamil Nadu, India',
      badge: 'FEATURED PROGRAMME',
      desc: 'Selected for the prestigious 20-week industry-integrated Innovation Engineer Trainee programme at FORGE. Focused on Phygital Retail, Intelligent Commerce, AI & Analytics, IoT Systems, Rapid Hardware-Software Prototyping, and Technology Entrepreneurship.'
    }
  ],
  pillars: [
    { title: 'Rapid Ideation & Architecture', desc: 'Translating real-world problem statements into structured, tangible technical blueprints.' },
    { title: 'Cross-Functional Collaboration', desc: 'Working with multidisciplinary teams across software frontend, backend, computer vision, and hardware systems.' },
    { title: 'Sprint Management', desc: 'Driving 24-to-48 hour hackathon build cycles with clarity, milestone discipline, and focus.' },
    { title: 'Continuous Technology Adoption', desc: 'Learning modern tools and frameworks on demand to solve domain-specific friction points.' }
  ]
};

export const HACKATHONS_DATA = [
  {
    title: 'Smart India Hackathon (SIH) 2025',
    organizer: 'Ministry of Education & AICTE',
    role: 'Team Leader & Developer',
    focus: 'National-level problem solving on real-world governance and accessibility challenges.',
    badge: 'National Arena'
  },
  {
    title: 'CIT Hackathon',
    organizer: 'Coimbatore Institute of Technology',
    role: 'Participant & Prototype Builder',
    focus: 'Rapid software engineering sprint focused on consumer technology solutions.',
    badge: 'Regional Sprint'
  },
  {
    title: 'VERTX 2.0 Hackathon',
    organizer: 'Chennai Technical Arena',
    role: 'Developer & Presenter',
    focus: 'Intensive 24-hour innovation challenge developing AI-powered assistive concepts.',
    badge: 'Innovation Sprint'
  },
  {
    title: 'Ideathon',
    organizer: 'Kumaraguru College of Technology',
    role: 'Ideator & Team Lead',
    focus: 'Product design and feasibility validation for high-impact campus tech ideas.',
    badge: 'Campus Arena'
  }
];
