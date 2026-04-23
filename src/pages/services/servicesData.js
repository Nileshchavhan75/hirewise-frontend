// src/pages/services/servicesData.js
export const servicesData = {
  // ==================== HIRING SOLUTIONS ====================
  'permanent-hiring': {
    id: 'permanent-hiring',
    title: 'Permanent Hiring',
    subtitle: 'Build your core team with long-term talent',
    description: 'Mid to Senior Level Recruitment & Executive Search. We find leaders who drive your business forward.',
    icon: 'fas fa-user-tie',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    primaryColor: '#667eea',
    secondaryColor: '#764ba2',
    lottieUrl: 'https://assets2.lottiefiles.com/packages/lf20_pucia5hy.json',
    metrics: [
      { value: 98, label: 'Placement Success', suffix: '%', icon: 'fas fa-chart-line' },
      { value: 15, label: 'Avg. Days to Hire', suffix: ' days', icon: 'fas fa-calendar-alt' },
      { value: 94, label: '90-Day Retention', suffix: '%', icon: 'fas fa-heart' }
    ],
    features: [
      'Mid to Senior Level Recruitment',
      'Executive Search & Leadership Hiring',
      'Behavioral & Technical Assessments',
      'Background Verification & Reference Checks',
      'Offer Negotiation & Onboarding Support',
      '90-Day Replacement Guarantee'
    ],
    process: [
      { step: 'Requirement Analysis', icon: 'fas fa-clipboard-list', desc: 'Understand role, culture, and expectations' },
      { step: 'Sourcing & Screening', icon: 'fas fa-search', desc: 'Multi-channel sourcing + AI screening' },
      { step: 'Assessment & Interviews', icon: 'fas fa-tasks', desc: 'Technical, psychometric & managerial rounds' },
      { step: 'Offer & Onboarding', icon: 'fas fa-handshake', desc: 'Seamless offer management and joining' }
    ],
    faq: [
      { q: 'How long does permanent hiring take?', a: 'Typically 15-20 working days from requirement to offer acceptance.' },
      { q: 'What is your replacement policy?', a: 'We offer 90-day replacement guarantee for permanent placements.' }
    ]
  },

  'contractual-hiring': {
    id: 'contractual-hiring',
    title: 'Contractual Hiring',
    subtitle: 'Flexible workforce for project-based needs',
    description: 'Short-term projects, long-term contracts, and flexible workforce solutions. Scale up or down instantly.',
    icon: 'fas fa-file-contract',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    primaryColor: '#11998e',
    secondaryColor: '#38ef7d',
    lottieUrl: 'https://assets9.lottiefiles.com/packages/lf20_5wnfdu2r.json',
    metrics: [
      { value: 72, label: 'Avg. Contract Duration', suffix: ' days', icon: 'fas fa-clock' },
      { value: 100, label: 'Client Satisfaction', suffix: '%', icon: 'fas fa-smile' },
      { value: 48, label: 'Hourly Replacement', suffix: ' hrs', icon: 'fas fa-bolt' }
    ],
    features: [
      'Short-term Project Staffing',
      'Long-term Contract Extensions',
      'Payroll & Compliance Management',
      'Instant Replacement Policy',
      'Remote/Hybrid/Onsite Options'
    ],
    process: [
      { step: 'Requirement', icon: 'fas fa-file-signature', desc: 'Share role & duration' },
      { step: 'Candidate Match', icon: 'fas fa-user-check', desc: 'Within 24-48 hours' },
      { step: 'Onboarding', icon: 'fas fa-user-plus', desc: 'Same week joining' }
    ]
  },

  'intern-hiring': {
    id: 'intern-hiring',
    title: 'Intern Hiring',
    subtitle: 'Nurture young talent from campuses',
    description: 'College/university tie-ups, internship programs, and management. Build a pipeline of fresh graduates.',
    icon: 'fas fa-graduation-cap',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    primaryColor: '#f093fb',
    secondaryColor: '#f5576c',
    lottieUrl: 'https://assets5.lottiefiles.com/packages/lf20_yrlwld0r.json',
    metrics: [
      { value: 85, label: 'Converted to Full-time', suffix: '%', icon: 'fas fa-chart-simple' },
      { value: 200, label: 'Partner Colleges', suffix: '+', icon: 'fas fa-university' }
    ],
    features: [
      'Campus Hiring Drives',
      'Virtual Internship Programs',
      'Stipend Management',
      'Performance Tracking & Mentorship'
    ]
  },

  'bulk-hiring': {
    id: 'bulk-hiring',
    title: 'Bulk / Lateral Hiring',
    subtitle: 'Volume recruitment done right',
    description: 'Mass hiring for BPO, retail, logistics, and entry-level roles. Walk-in drives, campus hiring, and lateral events.',
    icon: 'fas fa-layer-group',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    primaryColor: '#fa709a',
    secondaryColor: '#fee140',
    lottieUrl: 'https://assets1.lottiefiles.com/packages/lf20_vxqxm4s2.json',
    metrics: [
      { value: 500, label: 'Hires per month', suffix: '+', icon: 'fas fa-users' },
      { value: 48, label: 'Turnaround time', suffix: ' hrs', icon: 'fas fa-stopwatch' }
    ],
    features: ['Walk-in Drives', 'Campus Hiring', 'Lateral Events', 'Assessment Centers']
  },

  // ==================== SECTOR-SPECIFIC HIRING ====================
  'it-hiring': {
    id: 'it-hiring',
    title: 'IT Hiring',
    subtitle: 'Tech talent for the digital age',
    description: 'Software developers, Cloud, AI/ML, Data Analytics, Cybersecurity, and niche tech profiles.',
    icon: 'fas fa-code',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    primaryColor: '#4facfe',
    secondaryColor: '#00f2fe',
    lottieUrl: 'https://assets3.lottiefiles.com/packages/lf20_6mckhbak.json',
    metrics: [
      { value: 1200, label: 'Tech Hires', suffix: '+', icon: 'fas fa-laptop-code' },
      { value: 96, label: 'Tech Retention', suffix: '%', icon: 'fas fa-microchip' }
    ],
    features: [
      'Full-stack, Frontend, Backend',
      'Cloud (AWS/Azure/GCP)',
      'AI/ML & Data Science',
      'Cybersecurity Experts',
      'DevOps & SRE'
    ]
  },

  'non-it-hiring': {
    id: 'non-it-hiring',
    title: 'Non-IT Hiring',
    subtitle: 'Core business & operations talent',
    description: 'Sales & Marketing, HR, Finance, Operations, Manufacturing, Logistics, Pharma, Oil & Gas.',
    icon: 'fas fa-chart-line',
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    primaryColor: '#f6d365',
    secondaryColor: '#fda085',
    lottieUrl: 'https://assets2.lottiefiles.com/packages/lf20_zsmr9iqi.json',
    metrics: [
      { value: 2500, label: 'Non-IT Hires', suffix: '+', icon: 'fas fa-building' },
      { value: 50, label: 'Industries Served', suffix: '+', icon: 'fas fa-industry' }
    ],
    features: [
      'Sales & Marketing',
      'HR & Administration',
      'Finance & Accounts',
      'Operations & Logistics',
      'Pharmaceuticals',
      'Oil & Gas'
    ]
  },

  // ==================== UPCOMING SERVICES (show "Coming Soon" banner) ====================
  'pharma-healthcare': {
    id: 'pharma-healthcare',
    title: 'Pharma & Healthcare',
    subtitle: 'Specialized talent for life sciences',
    description: 'R&D, clinical research, sales, regulatory affairs, and hospital staffing. Our dedicated pharma recruitment team connects you with top talent.',
    icon: 'fas fa-capsules',
    gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    primaryColor: '#a1c4fd',
    secondaryColor: '#c2e9fb',
    lottieUrl: null, // No Lottie, fallback icon animation will show
    // No metrics or features → triggers "Upcoming" banner in ServiceDetail
  },

  'manufacturing': {
    id: 'manufacturing',
    title: 'Manufacturing',
    subtitle: 'Blue-collar & white-collar talent',
    description: 'Plant heads, engineers, quality controllers, and shop floor supervisors for manufacturing excellence.',
    icon: 'fas fa-industry',
    gradient: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
    primaryColor: '#d4fc79',
    secondaryColor: '#96e6a1',
    lottieUrl: null,
  },

  // === INTERNATIONAL RECRUITMENT - NOW FULL SERVICE (NOT UPCOMING) ===
  'international-recruitment': {
    id: 'international-recruitment',
    title: 'International Recruitment',
    subtitle: 'Global opportunities in US & UAE',
    description: 'Overseas placements for skilled & semi-skilled workforce. IT and Non-IT roles in United States and United Arab Emirates. End-to-end visa processing and relocation support.',
    icon: 'fas fa-globe-americas',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    primaryColor: '#3b82f6',
    secondaryColor: '#1d4ed8',
    lottieUrl: 'https://assets6.lottiefiles.com/packages/lf20_xgzc1h6w.json',
    metrics: [
      { value: 15, label: 'Countries', suffix: '', icon: 'fas fa-flag-checkered' },
      { value: 100, label: 'Visa Success', suffix: '%', icon: 'fas fa-passport' },
      { value: 2000, label: 'International Hires', suffix: '+', icon: 'fas fa-users' }
    ],
    features: [
      'US H1B Visa Sponsorship',
      'UAE Employment Visa',
      'Relocation & Accommodation Support',
      'Compliance & Onboarding',
      'Skilled & Semi-Skilled Workforce',
      'IT & Non-IT International Roles'
    ],
    process: [
      { step: 'Requirement Analysis', icon: 'fas fa-clipboard-list', desc: 'Understand role, country, visa requirements' },
      { step: 'Sourcing & Screening', icon: 'fas fa-search', desc: 'Global talent sourcing' },
      { step: 'Visa Processing', icon: 'fas fa-passport', desc: 'Complete visa and documentation support' },
      { step: 'Relocation & Onboarding', icon: 'fas fa-plane', desc: 'Smooth transition and joining' }
    ],
    faq: [
      { q: 'Which countries do you recruit for?', a: 'We currently specialize in United States (US) and United Arab Emirates (UAE).' },
      { q: 'Do you provide visa sponsorship?', a: 'Yes, we handle H1B for US and employment visa for UAE.' }
    ]
  },

  'payroll-compliance': {
    id: 'payroll-compliance',
    title: 'Payroll & Compliance',
    subtitle: 'Hassle-free payroll & statutory management',
    description: 'Salary processing, tax deductions, PF, ESI, PT, Gratuity, and regulatory filings. Keep your business compliant.',
    icon: 'fas fa-file-invoice-dollar',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    primaryColor: '#ff9a9e',
    secondaryColor: '#fecfef',
    lottieUrl: null,
  }
};

export const getAllServiceIds = () => Object.keys(servicesData);
export const getServiceById = (id) => servicesData[id];