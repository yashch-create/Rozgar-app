import { Job, Company, JobApplication, SubscriptionPlan, BlogPost, User, NotificationItem, PaymentTransaction, ResumeData } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-seeker-1',
    name: 'Hamza Chaudhry',
    email: 'hamza.dev@gmail.com',
    role: 'seeker',
    phone: '+92 300 1234567',
    city: 'Lahore',
    title: 'Senior Full Stack Developer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    isVerified: true,
    createdAt: '2026-01-10'
  },
  {
    id: 'usr-employer-1',
    name: 'Sarah Ahmed',
    email: 'hr@systemsltd.com',
    role: 'employer',
    companyId: 'comp-1',
    phone: '+92 321 9876543',
    city: 'Lahore',
    title: 'Talent Acquisition Manager',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    isVerified: true,
    createdAt: '2025-11-15'
  },
  {
    id: 'usr-admin-1',
    name: 'Tariq Mehmood',
    email: 'admin@rozgar.pk',
    role: 'admin',
    phone: '+92 333 5551212',
    city: 'Islamabad',
    title: 'Platform Administrator',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    isVerified: true,
    createdAt: '2025-01-01'
  }
];

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'comp-1',
    name: 'Systems Limited',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
    industry: 'Information Technology & Software Services',
    city: 'Lahore',
    website: 'https://systemsltd.com',
    description: 'Systems Limited is Pakistan’s premier IT exporter and technology provider, offering global digital transformation, cloud computing, and enterprise software solutions.',
    size: '5,000+ Employees',
    established: '1977',
    verified: true,
    rating: 4.8,
    openJobsCount: 4
  },
  {
    id: 'comp-2',
    name: 'Jazz (PMCL)',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000',
    industry: 'Telecommunications & Fintech',
    city: 'Islamabad',
    website: 'https://jazz.com.pk',
    description: 'Jazz is Pakistan’s largest digital operator and telecommunications company, serving over 75 million subscribers with JazzCash digital financial ecosystem.',
    size: '10,000+ Employees',
    established: '1994',
    verified: true,
    rating: 4.7,
    openJobsCount: 3
  },
  {
    id: 'comp-3',
    name: 'Bank Alfalah',
    logo: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000',
    industry: 'Banking & Financial Services',
    city: 'Karachi',
    website: 'https://bankalfalah.com',
    description: 'Bank Alfalah is one of the top commercial banks in Pakistan, empowering businesses and individuals with digital banking, trade finance, and retail solutions.',
    size: '8,000+ Employees',
    established: '1997',
    verified: true,
    rating: 4.5,
    openJobsCount: 2
  },
  {
    id: 'comp-4',
    name: 'Bazaar Technologies',
    logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000',
    industry: 'E-Commerce & Supply Chain Tech',
    city: 'Karachi',
    website: 'https://bazaar.tech',
    description: 'Bazaar is building Pakistan’s largest B2B e-commerce platform and financial services network connecting merchant retailers directly with wholesalers and brands.',
    size: '500-1,000 Employees',
    established: '2020',
    verified: true,
    rating: 4.6,
    openJobsCount: 2
  },
  {
    id: 'comp-5',
    name: 'Arbisoft',
    logo: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000',
    industry: 'Custom Software Engineering',
    city: 'Lahore',
    website: 'https://arbisoft.com',
    description: 'Arbisoft develops sophisticated web platforms, machine learning products, and mobile applications for international brands and Fortune 500 partners.',
    size: '1,000+ Employees',
    established: '2007',
    verified: true,
    rating: 4.9,
    openJobsCount: 3
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior React / Node.js Engineer',
    companyId: 'comp-1',
    companyName: 'Systems Limited',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    city: 'Lahore',
    locationType: 'Hybrid',
    jobType: 'Full-time',
    category: 'Information Technology',
    salaryMin: 250000,
    salaryMax: 400000,
    salaryPeriod: 'Monthly',
    experienceLevel: 'Senior Level',
    description: 'We are seeking a seasoned Full Stack Engineer with expertise in React, Node.js, TypeScript, and microservices architecture to lead enterprise client engineering in Gulberg, Lahore.',
    responsibilities: [
      'Architect and build scalable microfrontends and REST API gateways using Node.js and React.',
      'Mentor junior software engineers and conduct high-standard code reviews.',
      'Optimize database queries on PostgreSQL/MySQL for high throughput applications.',
      'Collaborate with global client product managers across US and EMEA timezones.'
    ],
    requirements: [
      '5+ years hands-on web software development experience.',
      'Strong proficiency in TypeScript, React 18+, Redux/Zustand, and Express/Nest.js.',
      'Deep understanding of RESTful APIs, JWT authentication, Docker, and CI/CD pipelines.',
      'Bachelor’s degree in Computer Science or Software Engineering from a recognized university (FAST, NUST, LUMS, PUCIT, etc.).'
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'AWS'],
    benefits: [
      'Competitive tax-adjusted salary (PKR 250k - 400k)',
      'Provident Fund & Gratuity',
      'Inpatient & Outpatient Health Insurance for family',
      'Annual Performance Bonus & Fuel Allowance',
      'Gym Membership Reimbursement'
    ],
    postedDate: '2026-07-28',
    status: 'active',
    isFeatured: true,
    applicantsCount: 28
  },
  {
    id: 'job-2',
    title: 'Lead DevOps & Cloud Engineer (AWS/Kubernetes)',
    companyId: 'comp-5',
    companyName: 'Arbisoft',
    companyLogo: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=200',
    city: 'Lahore',
    locationType: 'On-site',
    jobType: 'Full-time',
    category: 'Information Technology',
    salaryMin: 350000,
    salaryMax: 550000,
    salaryPeriod: 'Monthly',
    experienceLevel: 'Senior Level',
    description: 'Arbisoft is hiring a Lead Infrastructure & DevOps Engineer to design cloud-native deployment pipelines on AWS and GCP for million-user edtech and fintech clients.',
    responsibilities: [
      'Manage Kubernetes clusters, Terraform infrastructure-as-code, and GitHub Actions CI/CD workflows.',
      'Maintain 99.99% uptime across production Kubernetes deployments.',
      'Implement zero-trust security compliance and automated log monitoring with Grafana and Prometheus.'
    ],
    requirements: [
      '4+ years managing production Linux server environments & AWS Cloud Infrastructure.',
      'Expertise with Kubernetes, Docker, Helm, Terraform, and Python/Bash scripting.',
      'AWS Certified Solutions Architect or CKA preferred.'
    ],
    skills: ['DevOps', 'AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Linux'],
    benefits: [
      'Executive Salary Package in PKR',
      'On-site gourmet lunch & coffee bar in Lahore campus',
      'Comprehensive Medical Coverage',
      'Interest-free vehicle and laptop loans'
    ],
    postedDate: '2026-07-30',
    status: 'active',
    isFeatured: true,
    applicantsCount: 14
  },
  {
    id: 'job-3',
    title: 'Fintech Product Manager (JazzCash Digital)',
    companyId: 'comp-2',
    companyName: 'Jazz (PMCL)',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
    city: 'Islamabad',
    locationType: 'On-site',
    jobType: 'Full-time',
    category: 'Fintech & Product',
    salaryMin: 300000,
    salaryMax: 480000,
    salaryPeriod: 'Monthly',
    experienceLevel: 'Mid Level',
    description: 'Drive feature roadmap for digital payment products, QR merchant payments, and micro-loans targeting 25 million active JazzCash app users.',
    responsibilities: [
      'Define product specifications, user stories, and acceptance criteria for mobile app features.',
      'Analyze transaction funnel metrics, conversion rates, and user drop-offs.',
      'Coordinate with State Bank of Pakistan (SBP) regulatory compliance and security teams.'
    ],
    requirements: [
      '3-6 years product management experience in fintech, digital banking, or mobile money.',
      'Demonstrated experience delivering consumer-facing iOS/Android mobile apps.',
      'Strong data analytics skills using SQL and Mixpanel/Amplitude.'
    ],
    skills: ['Product Management', 'Fintech', 'Agile/Scrum', 'Data Analytics', 'SQL', 'UX Research'],
    benefits: [
      'Market-leading Telco compensation package',
      'Company maintained vehicle or Car Allowance',
      'Free high-speed home fiber internet & mobile line',
      'Family Health Insurance & Executive Club Allowance'
    ],
    postedDate: '2026-07-25',
    status: 'active',
    isFeatured: true,
    applicantsCount: 42
  },
  {
    id: 'job-4',
    title: 'Assistant Vice President - Credit Risk & Analytics',
    companyId: 'comp-3',
    companyName: 'Bank Alfalah',
    companyLogo: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=200',
    city: 'Karachi',
    locationType: 'On-site',
    jobType: 'Full-time',
    category: 'Banking & Finance',
    salaryMin: 280000,
    salaryMax: 420000,
    salaryPeriod: 'Monthly',
    experienceLevel: 'Senior Level',
    description: 'Bank Alfalah Head Office in Karachi is looking for an experienced Credit Risk Officer to manage commercial and retail credit portfolios, ECL modeling, and IFRS 9 compliance.',
    responsibilities: [
      'Formulate portfolio credit risk limits, stress testing, and non-performing loan (NPL) recovery strategies.',
      'Develop predictive credit scoring models using Python and SAS.',
      'Present risk dashboards to Board Risk Committee.'
    ],
    requirements: [
      'Master’s degree in Finance, Economics, Statistics, or MBA from IBA/LUMS.',
      '6+ years in commercial banking risk management or credit appraisal.',
      'Proficiency in Python/R, SAS, and Basel III regulatory guidelines.'
    ],
    skills: ['Credit Risk', 'Banking', 'Python', 'Financial Modeling', 'IFRS 9', 'Risk Management'],
    benefits: [
      'Attractive Banking Grade Grade A Salary',
      'Annual Bonuses & Loan Subsidies (House & Car Loan at concessionary rate)',
      'Comprehensive OPD & IPD Family Hospitalization',
      'Life Insurance Coverage'
    ],
    postedDate: '2026-07-20',
    status: 'active',
    isFeatured: false,
    applicantsCount: 19
  },
  {
    id: 'job-5',
    title: 'Mobile App Developer (Flutter / React Native)',
    companyId: 'comp-4',
    companyName: 'Bazaar Technologies',
    companyLogo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=200',
    city: 'Karachi',
    locationType: 'Hybrid',
    jobType: 'Full-time',
    category: 'Information Technology',
    salaryMin: 200000,
    salaryMax: 320000,
    salaryPeriod: 'Monthly',
    experienceLevel: 'Mid Level',
    description: 'Join Bazaar to build offline-first mobile applications used by over 100,000 neighborhood shopkeepers across 50+ Pakistani cities.',
    responsibilities: [
      'Develop smooth, performant mobile interfaces in Flutter/React Native for Android devices.',
      'Optimize localized offline storage, SQLite synchronization, and low-bandwidth network connectivity.',
      'Integrate bluetooth receipt printer SDKs and QR code scanners.'
    ],
    requirements: [
      '2.5+ years of production experience in Flutter/Dart or React Native.',
      'Solid grasp of state management (Bloc, Provider, or Zustand).',
      'Experience optimizing Android apps for entry-level budget smartphones.'
    ],
    skills: ['Flutter', 'React Native', 'Android', 'Dart', 'Mobile Apps', 'REST API'],
    benefits: [
      'Equity Options / ESOPs',
      'Hybrid Work from Home flexibility',
      'Relocation assistance to Karachi if outside Sindh',
      'Continuous learning fund & tech stipend'
    ],
    postedDate: '2026-07-29',
    status: 'active',
    isFeatured: false,
    applicantsCount: 31
  },
  {
    id: 'job-6',
    title: 'AI & Data Science Specialist',
    companyId: 'comp-1',
    companyName: 'Systems Limited',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    city: 'Islamabad',
    locationType: 'Remote',
    jobType: 'Full-time',
    category: 'Information Technology',
    salaryMin: 270000,
    salaryMax: 450000,
    salaryPeriod: 'Monthly',
    experienceLevel: 'Mid Level',
    description: 'Leverage LLMs, GenAI, and machine learning models to build intelligent document processing and automated customer intelligence pipelines.',
    responsibilities: [
      'Fine-tune open-source models (Llama, Gemini API) for industry workflows.',
      'Deploy vector databases (Pinecone, Qdrant) for RAG applications.',
      'Collaborate with cloud engineers to serve low-latency inference APIs.'
    ],
    requirements: [
      '3+ years in Machine Learning and Python Data Science libraries (PyTorch, Hugging Face, LangChain).',
      'Experience with Gemini API / OpenAI API integration in production.',
      'Strong background in linear algebra, NLP, and statistical analysis.'
    ],
    skills: ['Python', 'GenAI', 'Gemini API', 'PyTorch', 'NLP', 'Vector DB', 'LangChain'],
    benefits: [
      '100% Remote Work Option',
      'Flexible Work Hours',
      'USD-indexed salary review cycles',
      'Full Health & Term Life Insurance'
    ],
    postedDate: '2026-07-31',
    status: 'active',
    isFeatured: true,
    applicantsCount: 22
  }
];

export const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Senior React / Node.js Engineer',
    companyName: 'Systems Limited',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    seekerId: 'usr-seeker-1',
    seekerName: 'Hamza Chaudhry',
    seekerEmail: 'hamza.dev@gmail.com',
    seekerPhone: '+92 300 1234567',
    seekerCity: 'Lahore',
    coverNote: 'I have 5 years of full-stack engineering experience delivering scalable React and Node.js solutions in Gulberg Lahore. Excited to contribute to Systems Limited global delivery.',
    status: 'Interview Scheduled',
    appliedDate: '2026-07-29',
    atsScore: 92,
    matchAnalysis: 'Strong match on React, TypeScript, Node.js, and Lahore location. Exceeds experience requirement.',
    interviewDate: '2026-08-05 11:00 AM PKT',
    interviewNotes: 'Technical round with Engineering Lead via Google Meet.'
  },
  {
    id: 'app-2',
    jobId: 'job-6',
    jobTitle: 'AI & Data Science Specialist',
    companyName: 'Systems Limited',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    seekerId: 'usr-seeker-1',
    seekerName: 'Hamza Chaudhry',
    seekerEmail: 'hamza.dev@gmail.com',
    seekerPhone: '+92 300 1234567',
    seekerCity: 'Lahore',
    coverNote: 'Experienced in LLM API integration, Gemini SDK, and Python backend services.',
    status: 'Submitted',
    appliedDate: '2026-07-31',
    atsScore: 85,
    matchAnalysis: 'Good match on Python and AI APIs. Recommended for initial technical screening.'
  }
];

export const SAMPLE_SEEKER_RESUME: ResumeData = {
  fullName: 'Hamza Chaudhry',
  email: 'hamza.dev@gmail.com',
  phone: '+92 300 1234567',
  city: 'Lahore, Pakistan',
  headline: 'Senior Full-Stack Software Engineer (React, Node.js, TypeScript)',
  summary: 'Results-driven Full-Stack Engineer with 5+ years of experience building high-traffic web applications, microservices, and AI integrations for enterprise clients in Pakistan and UAE. Passionate about clean code, high performance, and team mentorship.',
  skills: ['React.js', 'Node.js', 'Express', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'REST APIs', 'Gemini AI', 'Git'],
  education: [
    {
      degree: 'BS Computer Science (BSCS)',
      institution: 'FAST National University of Computer and Emerging Sciences (NUCES), Lahore',
      year: '2017 - 2021'
    }
  ],
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Techlogix Pakistan',
      period: '2023 - Present',
      description: 'Led a team of 4 engineers building React and Node.js microservices for a regional fintech platform handling 50k+ daily transactions in PKR.'
    },
    {
      title: 'Full Stack Web Developer',
      company: 'Netsol Technologies',
      period: '2021 - 2023',
      description: 'Developed responsive frontend UI components and optimized backend database queries on PostgreSQL reducing response latency by 35%.'
    }
  ],
  projects: [
    {
      title: 'AI Resume Screener for Pakistani Job Market',
      description: 'Integrated Gemini API to evaluate candidate CVs against target job descriptions with detailed ATS scoring and missing keyword alerts.',
      link: 'https://github.com/hamza-dev/ai-resume-screener'
    }
  ]
};

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-starter',
    name: 'Free Starter',
    pricePKR: 0,
    durationDays: 30,
    jobPostsLimit: 2,
    featuredPostsLimit: 0,
    candidateContactLimit: 10,
    aiAssist: false,
    badge: 'Basic',
    features: [
      'Post up to 2 active jobs',
      'Basic candidate search',
      'Standard application tracking',
      'Email support'
    ]
  },
  {
    id: 'plan-growth',
    name: 'Growth Business',
    pricePKR: 15000,
    durationDays: 30,
    jobPostsLimit: 10,
    featuredPostsLimit: 2,
    candidateContactLimit: 100,
    aiAssist: true,
    badge: 'Most Popular',
    features: [
      'Post up to 10 active jobs',
      '2 Featured Job Listings on homepage',
      'AI Job Description Generator',
      'Direct candidate WhatsApp / Phone contact',
      'JazzCash & Easypaisa express payment',
      'Priority Support'
    ]
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise Corporate',
    pricePKR: 45000,
    durationDays: 90,
    jobPostsLimit: 50,
    featuredPostsLimit: 10,
    candidateContactLimit: 500,
    aiAssist: true,
    badge: 'Best Value',
    features: [
      '50 Active Job postings with 90-day validity',
      '10 Featured top-banner postings',
      'Unlimited Candidate CV Downloads',
      'Dedicated HR Account Manager in PK',
      'Custom Branding & Company Verification Badge',
      'AI Candidate Match & Automatic Screener'
    ]
  }
];

export const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'tx-1001',
    employerName: 'Systems Limited',
    planName: 'Enterprise Corporate',
    amountPKR: 45000,
    paymentMethod: 'JazzCash',
    accountNumberOrRef: '0300****890 (TID: JC9823145)',
    transactionDate: '2026-07-15',
    status: 'Completed'
  },
  {
    id: 'tx-1002',
    employerName: 'Bazaar Technologies',
    planName: 'Growth Business',
    amountPKR: 15000,
    paymentMethod: 'Easypaisa',
    accountNumberOrRef: '0345****112 (TID: EP4439201)',
    transactionDate: '2026-07-20',
    status: 'Completed'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Top In-Demand Tech & Software Skills in Pakistan for 2026',
    slug: 'top-tech-skills-pakistan-2026',
    excerpt: 'Explore why React, Node.js, Cloud DevOps, AI/GenAI, and Flutter dominate job opportunities across Lahore, Karachi, and Islamabad.',
    content: `The Pakistani technology ecosystem is experiencing unprecedented growth. Software exports, IT outsourcing, and fintech startups in Lahore, Karachi, and Islamabad are actively hiring skilled software professionals.

Key skill demand trends in Pakistan:
1. Full Stack JavaScript (React.js + Node.js + TypeScript): The undisputed benchmark for enterprise software houses and US/UK remote teams.
2. GenAI & AI Engineering: Companies are eager to integrate Gemini API and LLM agents into internal automation pipelines.
3. DevOps & Cloud Engineering: Demand for AWS, Kubernetes, and Terraform expertise has surged with 40%+ salary premium in PKR.
4. Mobile App Development: Flutter remains the leading cross-platform mobile choice for local e-commerce and delivery platforms like Bazaar and Foodpanda.`,
    author: 'Zainab Qureshi',
    date: '2026-07-24',
    readTime: '5 min read',
    category: 'Career Insights',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'blog-2',
    title: 'How to Craft an ATS-Friendly Resume for Pakistani & Global Employers',
    slug: 'ats-friendly-resume-guide-pakistan',
    excerpt: 'Learn essential tips to optimize your CV for Applicant Tracking Systems used by top companies like Systems Ltd, Jazz, and Netsol.',
    content: `Many qualified job seekers in Pakistan face rejection simply because their resume fails the automated ATS screening filter before reaching a human recruiter.

Top ATS Resume Optimization Steps:
1. Use Standard Section Headers: Stick to clean labels like 'Work Experience', 'Education', and 'Skills'.
2. Align Keywords with Job Descriptions: Include exact technology terms mentioned in the job post (e.g., 'TypeScript', 'REST API', 'Agile').
3. Quantify Achievements: Instead of writing "Developed software", write "Engineered React microfrontend served to 100,000 active monthly users in Pakistan".
4. Use Rozgar Pakistan's Built-in AI Resume Analyzer: Run your CV against target jobs to get live ATS score recommendations instantly.`,
    author: 'Ali Raza',
    date: '2026-07-18',
    readTime: '6 min read',
    category: 'Resume Tips',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'usr-seeker-1',
    title: 'Interview Scheduled!',
    message: 'Systems Limited scheduled an interview for Senior React / Node.js Engineer on August 5th at 11:00 AM PKT.',
    date: '2026-07-30',
    read: false,
    type: 'interview'
  },
  {
    id: 'notif-2',
    userId: 'usr-seeker-1',
    title: 'Application Received',
    message: 'Your application for AI & Data Science Specialist at Systems Limited was successfully submitted.',
    date: '2026-07-31',
    read: true,
    type: 'application'
  }
];

export const PAKISTAN_CITIES = [
  'All Cities',
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Peshawar',
  'Multan',
  'Sialkot',
  'Gujranwala',
  'Quetta',
  'Hyderabad',
  'Remote (Pakistan)'
];

export const JOB_CATEGORIES = [
  'All Categories',
  'Information Technology',
  'Banking & Finance',
  'Fintech & Product',
  'Telecommunications',
  'Customer Support / BPO',
  'Marketing & Advertising',
  'Engineering & Construction',
  'Healthcare & Medical',
  'Education & Training',
  'Supply Chain & E-Commerce'
];

export const MYSQL_SCHEMA_DDL = `-- ============================================================
-- ROZGAR PAKISTAN - COMPLETE MYSQL PRODUCTION DATABASE SCHEMA
-- Database Name: rozgar_db
-- Engine: InnoDB | Character Set: utf8mb4_unicode_ci
-- ============================================================

CREATE DATABASE IF NOT EXISTS rozgar_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE rozgar_db;

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('seeker', 'employer', 'admin') NOT NULL DEFAULT 'seeker',
  phone VARCHAR(20),
  city VARCHAR(80),
  title VARCHAR(100),
  avatar_url TEXT,
  company_id VARCHAR(64),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
) ENGINE=InnoDB;

-- 2. COMPANIES TABLE
CREATE TABLE IF NOT EXISTS companies (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  logo_url TEXT,
  cover_url TEXT,
  industry VARCHAR(100),
  city VARCHAR(80),
  website VARCHAR(200),
  description TEXT,
  size VARCHAR(50),
  established VARCHAR(10),
  verified BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2) DEFAULT 4.5,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. JOBS TABLE
CREATE TABLE IF NOT EXISTS jobs (
  id VARCHAR(64) PRIMARY KEY,
  company_id VARCHAR(64) NOT NULL,
  title VARCHAR(150) NOT NULL,
  city VARCHAR(80) NOT NULL,
  location_type ENUM('On-site', 'Remote', 'Hybrid') DEFAULT 'On-site',
  job_type ENUM('Full-time', 'Part-time', 'Contract', 'Internship') DEFAULT 'Full-time',
  category VARCHAR(100) NOT NULL,
  salary_min DECIMAL(12,2) NOT NULL,
  salary_max DECIMAL(12,2) NOT NULL,
  salary_period VARCHAR(20) DEFAULT 'Monthly',
  experience_level VARCHAR(50) DEFAULT 'Mid Level',
  description TEXT NOT NULL,
  responsibilities JSON,
  requirements JSON,
  skills JSON,
  benefits JSON,
  posted_date DATE NOT NULL,
  status ENUM('active', 'closed', 'pending') DEFAULT 'active',
  is_featured BOOLEAN DEFAULT FALSE,
  applicants_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  INDEX idx_city_category (city, category),
  INDEX idx_status (status)
) ENGINE=InnoDB;

-- 4. JOB APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS job_applications (
  id VARCHAR(64) PRIMARY KEY,
  job_id VARCHAR(64) NOT NULL,
  seeker_id VARCHAR(64) NOT NULL,
  seeker_name VARCHAR(100) NOT NULL,
  seeker_email VARCHAR(150) NOT NULL,
  seeker_phone VARCHAR(20),
  seeker_city VARCHAR(80),
  cover_note TEXT,
  status ENUM('Submitted', 'Screening', 'Interview Scheduled', 'Offer Extended', 'Hired', 'Rejected') DEFAULT 'Submitted',
  ats_score INT DEFAULT 0,
  match_analysis TEXT,
  applied_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  FOREIGN KEY (seeker_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. INTERVIEWS TABLE
CREATE TABLE IF NOT EXISTS interview_schedules (
  id VARCHAR(64) PRIMARY KEY,
  application_id VARCHAR(64) NOT NULL,
  candidate_name VARCHAR(100) NOT NULL,
  candidate_email VARCHAR(150) NOT NULL,
  date_time VARCHAR(100) NOT NULL,
  mode VARCHAR(50) NOT NULL,
  location_or_link TEXT,
  status VARCHAR(30) DEFAULT 'Upcoming',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (application_id) REFERENCES job_applications(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. TRANSACTIONS & SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS payment_transactions (
  id VARCHAR(64) PRIMARY KEY,
  employer_name VARCHAR(150) NOT NULL,
  plan_name VARCHAR(100) NOT NULL,
  amount_pkr DECIMAL(10,2) NOT NULL,
  payment_method ENUM('JazzCash', 'Easypaisa', 'Bank Transfer', 'Credit/Debit Card') NOT NULL,
  account_ref VARCHAR(100) NOT NULL,
  transaction_date DATE NOT NULL,
  status ENUM('Completed', 'Pending', 'Failed') DEFAULT 'Completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
`;

export const DOCKER_COMPOSE_YML = `# ============================================================
# ROZGAR PAKISTAN - DOCKER COMPOSE DEPLOYMENT CONFIGURATION
# ============================================================
version: '3.8'

services:
  # App Service (Node.js Express + React / Vite frontend)
  rozgar-app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - GEMINI_API_KEY=\${GEMINI_API_KEY}
      - JWT_SECRET=rozgar_pakistan_jwt_super_secret_2026
      - MYSQL_HOST=mysql-db
      - MYSQL_USER=rozgar_user
      - MYSQL_PASSWORD=rozgar_pass
      - MYSQL_DATABASE=rozgar_db
    depends_on:
      - mysql-db
    restart: always

  # MySQL Database Container
  mysql-db:
    image: mysql:8.0
    container_name: rozgar_mysql
    environment:
      MYSQL_ROOT_PASSWORD: root_secret_password
      MYSQL_DATABASE: rozgar_db
      MYSQL_USER: rozgar_user
      MYSQL_PASSWORD: rozgar_pass
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./rozgar_db.sql:/docker-entrypoint-initdb.d/rozgar_db.sql
    restart: always

volumes:
  mysql_data:
`;
