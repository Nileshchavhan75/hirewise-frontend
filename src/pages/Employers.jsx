import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import '../css/Employers.css'

// ADDED: API service imports
import jobService from '../services/jobService'
import authService from '../services/authService'

const Employers = () => {
  const { theme } = useTheme()
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')
  const [hoveredCard, setHoveredCard] = useState(null)
  
  // ADDED: Real data states with loading
  const [stats, setStats] = useState({
    activeJobs: 0,
    candidates: 0,
    placements: 0,
    avgTime: 0,
    trend: '+23%'
  })
  const [loading, setLoading] = useState(true)

  // Logic for the Post a Job button
  const handlePostJobClick = () => {
    if (!user) {
        // Not logged in - redirect to login
        navigate('/login', { state: { from: '/employers', action: 'postJob' } });
    } else if (user.role === 'employer') {
        // Employer - go to dashboard
        navigate('/employer-dashboard');
    } else {
        // Candidate - show error
        alert('Only employers can post jobs. Please login with an employer account.');
    }
  };

  // ADDED: API call to fetch real employer data
  useEffect(() => {
    const loadEmployerData = async () => {
      try {
        const currentUser = authService.getCurrentUser()
        if (currentUser) {
          const result = await jobService.getJobsByEmployer(currentUser.userId)
          if (result.success) {
            setStats({
              activeJobs: result.data.length,
              candidates: Math.floor(Math.random() * 1000), // Replace with real data later
              placements: Math.floor(Math.random() * 500),
              avgTime: 12,
              trend: '+23%'
            })
          }
        }
      } catch (error) {
        console.error('Error loading employer data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadEmployerData()
  }, [])

  useEffect(() => {
    // Load Lottie
    const script = document.createElement('script')
    script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Simulate dashboard data update (KEEPING your existing functionality)
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeJobs: prev.activeJobs + Math.floor(Math.random() * 10),
        candidates: prev.candidates + Math.floor(Math.random() * 50),
        placements: prev.placements + Math.floor(Math.random() * 5),
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // All 6 Hiring Models (YOUR EXISTING DATA - KEPT AS IS)
  const hiringModels = [
    {
      id: 1,
      title: 'Permanent Hiring',
      icon: '👔',
      description: 'Build your core team with leaders who drive growth',
      highlight: '90-day replacement guarantee',
      stats: [
        { value: '21d', label: 'AVG. TIME' },
        { value: '95%', label: 'SUCCESS' },
        { value: '500+', label: 'PLACEMENTS' }
      ],
      features: ['Executive Search', 'Mid-Senior Level', 'Leadership Pipeline'],
      color: '#FF6B4A',
      gradient: 'linear-gradient(145deg, #FF6B4A, #FF3B7F)',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      testimonial: {
        quote: "Found our CTO in 3 weeks. Exceptional quality.",
        author: "TechCorp",
        role: "Series B Startup"
      }
    },
    {
      id: 2,
      title: 'Contract Staffing',
      icon: '⚡',
      description: 'Scale instantly with pre-vetted contract professionals',
      highlight: '48-hour matching',
      stats: [
        { value: '48h', label: 'RESPONSE' },
        { value: '92%', label: 'RETENTION' },
        { value: '350+', label: 'ACTIVE' }
      ],
      features: ['Project-Based', 'Temp-to-Perm', 'Seasonal Scale'],
      color: '#2A9D8F',
      gradient: 'linear-gradient(145deg, #2A9D8F, #20A4B0)',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      testimonial: {
        quote: "Scaled from 10 to 50 engineers in 2 months.",
        author: "FinTech Ltd",
        role: "Enterprise"
      }
    },
    {
      id: 3,
      title: 'Bulk Hiring',
      icon: '📈',
      description: 'Mass recruitment for rapid team expansion',
      highlight: '500+ hires/month',
      stats: [
        { value: '7d', label: 'TURNAROUND' },
        { value: '90%', label: 'FILL RATE' },
        { value: '10K+', label: 'PLACED' }
      ],
      features: ['Walk-in Drives', 'Campus Hiring', 'Lateral Entry'],
      color: '#E76F51',
      gradient: 'linear-gradient(145deg, #E76F51, #F4A261)',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      testimonial: {
        quote: "Hired 200+ for our new office launch.",
        author: "Global Retail",
        role: "Fortune 500"
      }
    },
    {
      id: 4,
      title: 'Executive Search',
      icon: '🎯',
      description: 'Find transformative leaders for your organization',
      highlight: 'Global talent reach',
      stats: [
        { value: '45d', label: 'TIME' },
        { value: '94%', label: 'RETENTION' },
        { value: '150+', label: 'EXECS' }
      ],
      features: ['C-Level', 'Board Members', 'VP/Directors'],
      color: '#9C89B8',
      gradient: 'linear-gradient(145deg, #9C89B8, #B185DB)',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      testimonial: {
        quote: "Placed our CEO in under 60 days.",
        author: "HealthTech",
        role: "Unicorn Startup"
      }
    },
    {
      id: 5,
      title: 'Payroll & Compliance',
      icon: '💰',
      description: 'End-to-end payroll management with zero errors',
      highlight: '100% compliant',
      stats: [
        { value: '99.9%', label: 'ACCURACY' },
        { value: '24/7', label: 'SUPPORT' },
        { value: '800+', label: 'CLIENTS' }
      ],
      features: ['Salary Processing', 'Tax Filing', 'Audit Ready'],
      color: '#4A90E2',
      gradient: 'linear-gradient(145deg, #4A90E2, #6C5B7B)',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      testimonial: {
        quote: "Saved 40% on payroll management costs.",
        author: "Mid-Market",
        role: "Manufacturing"
      }
    },
    {
      id: 6,
      title: 'International Hiring',
      icon: '🌍',
      description: 'Access global talent with visa & relocation',
      highlight: '15+ countries',
      stats: [
        { value: '15+', label: 'COUNTRIES' },
        { value: '89%', label: 'SUCCESS' },
        { value: '2K+', label: 'PLACED' }
      ],
      features: ['US H1B', 'UAE Tax-Free', 'Relocation'],
      color: '#F4A261',
      gradient: 'linear-gradient(145deg, #F4A261, #E9C46A)',
      image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      testimonial: {
        quote: "Expanded to Dubai in record time.",
        author: "Tech Global",
        role: "SaaS Company"
      }
    }
  ]

  const filters = [
    { id: 'all', label: 'All Solutions', icon: '✨' },
    { id: 'core', label: 'Core Hiring', icon: '👔' },
    { id: 'flexible', label: 'Flexible', icon: '⚡' },
    { id: 'volume', label: 'Volume', icon: '📈' },
    { id: 'leadership', label: 'Leadership', icon: '🎯' },
    { id: 'operations', label: 'Operations', icon: '💰' },
    { id: 'global', label: 'Global', icon: '🌍' }
  ]

  const filteredModels = activeFilter === 'all' 
    ? hiringModels 
    : hiringModels.filter(m => {
        if (activeFilter === 'core') return m.id === 1
        if (activeFilter === 'flexible') return m.id === 2
        if (activeFilter === 'volume') return m.id === 3
        if (activeFilter === 'leadership') return m.id === 4
        if (activeFilter === 'operations') return m.id === 5
        if (activeFilter === 'global') return m.id === 6
        return true
      })

  // Case Studies / Success Stories (YOUR EXISTING DATA)
  const caseStudies = [
    {
      id: 1,
      company: 'TechCorp India',
      logo: 'TC',
      industry: 'Information Technology',
      challenge: 'Needed to hire 50+ software engineers in 3 months',
      outcome: 'Successfully placed 52 candidates within 2.5 months',
      savings: '40% reduction in hiring time',
      color: '#FF6B4A',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      testimonial: {
        quote: "HireWise delivered beyond our expectations. The quality of candidates was exceptional.",
        author: "Rajesh Mehta",
        role: "CTO"
      }
    },
    {
      id: 2,
      company: 'Global Finance Ltd',
      logo: 'GF',
      industry: 'Banking & Finance',
      challenge: 'Required 20+ finance professionals including senior managers',
      outcome: 'Placed 22 candidates including 3 senior managers in 45 days',
      savings: '₹45 lakhs in recruitment costs',
      color: '#2A9D8F',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      testimonial: {
        quote: "The senior management placements were perfect. They understood our culture exactly.",
        author: "Priya Singh",
        role: "HR Director"
      }
    },
    {
      id: 3,
      company: 'Gulf Construction',
      logo: 'GC',
      industry: 'Oil & Gas',
      challenge: 'Need 100+ skilled workers for UAE project',
      outcome: 'Deployed 108 workers within 2 months with full compliance',
      savings: '60% faster mobilization',
      color: '#E76F51',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      testimonial: {
        quote: "They handled everything from recruitment to visa processing seamlessly.",
        author: "Ahmed Al-Rashid",
        role: "Project Director"
      }
    }
  ]

  return (
    <div className="employers-page-fresh">
      {/* Hero Section with Image */}
      <section className="employer-image-hero">
        <div className="hero-image-container">
          <img 
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Modern office collaboration"
            className="hero-bg-image"
          />
          <div className="hero-image-overlay"></div>
          <div className="hero-pattern"></div>
        </div>

        <div className="hero-content-wrapper">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="badge-icon">⚡</span>
              <span>Trusted by 500+ Companies</span>
            </div>
            
            <h1 className="hero-main-title">
              <span className="title-light">Hire</span>
              <span className="title-bold">Exceptional</span>
              <span className="title-light">Talent</span>
            </h1>
            
            <p className="hero-description">
              End-to-end recruitment solutions powered by AI. 
              From startups to enterprises, we help you build winning teams.
            </p>

            <div className="hero-actions">
              <button onClick={handlePostJobClick} className="action-primary">
                <span>Post a Job</span>
                <i className="fas fa-arrow-right"></i>
              </button>
              <Link to="/contact-us" className="action-secondary">
                <i className="fas fa-headset"></i>
                <span>Talk to Expert</span>
              </Link>
            </div>

            {/* Company Strip */}
            <div className="company-strip">
              {['TechCorp', 'InnovateLabs', 'Global Finance', 'HealthPlus'].map((company, idx) => (
                <span key={idx} className="company-name">{company}</span>
              ))}
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-stats-card">
              <div className="stats-header">
                <h3>Active Hiring</h3>
                <span className="live-badge">LIVE</span>
              </div>
              {loading ? (
                <div className="stats-loading">Loading data...</div>
              ) : (
                <>
                  <div className="stats-grid">
                    <div className="stat-block">
                      <span className="stat-number">{stats.activeJobs.toLocaleString()}</span>
                      <span className="stat-label">Open Jobs</span>
                    </div>
                    <div className="stat-block">
                      <span className="stat-number">{stats.candidates.toLocaleString()}</span>
                      <span className="stat-label">Candidates</span>
                    </div>
                    <div className="stat-block">
                      <span className="stat-number">{stats.placements.toLocaleString()}</span>
                      <span className="stat-label">Placements</span>
                    </div>
                    <div className="stat-block">
                      <span className="stat-number">{stats.avgTime}d</span>
                      <span className="stat-label">Avg. Time</span>
                    </div>
                  </div>
                  <div className="stats-trend">
                    <i className="fas fa-arrow-up"></i>
                    <span>{stats.trend} vs last month</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="filter-container">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-chip ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <span className="chip-icon">{filter.icon}</span>
              <span className="chip-label">{filter.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Hiring Models Grid - All 6 Cards */}
      <section className="hiring-models-grid-section">
        <div className="models-grid-container">
          {filteredModels.map((model, index) => (
            <div 
              key={model.id} 
              className="hiring-model-card"
              onMouseEnter={() => setHoveredCard(model.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="model-card-header" style={{ background: model.gradient }}>
                <div className="model-icon">{model.icon}</div>
                <div className="model-title-section">
                  <h3>{model.title}</h3>
                  <span className="model-highlight">{model.highlight}</span>
                </div>
              </div>

              <div className="model-card-body">
                <p className="model-description">{model.description}</p>

                <div className="model-stats">
                  {model.stats.map((stat, idx) => (
                    <div key={idx} className="model-stat">
                      <span className="stat-value">{stat.value}</span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>

                <div className="model-features">
                  {model.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag" style={{ background: `${model.color}15`, color: model.color }}>
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="model-testimonial">
                  <i className="fas fa-quote-left" style={{ color: model.color, fontSize: '14px', opacity: 0.5 }}></i>
                  <p>"{model.testimonial.quote}"</p>
                  <span className="testimonial-author">— {model.testimonial.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Hiring Dashboard */}
      <section className="enhanced-dashboard">
        <div className="dashboard-header">
          <h2>Your Hiring Dashboard</h2>
          <p>Real-time analytics and insights</p>
        </div>

        <div className="dashboard-main-grid">
          {/* Main Stats Card */}
          <div className="dashboard-main-card">
            <div className="main-card-header">
              <h3>Overview</h3>
              <span className="update-badge">Live Updates</span>
            </div>
            <div className="main-card-stats">
              <div className="main-stat-item">
                <span className="stat-icon">📊</span>
                <div className="stat-detail">
                  <span className="stat-detail-label">Active Jobs</span>
                  <span className="stat-detail-value">{stats.activeJobs.toLocaleString()}</span>
                </div>
                <span className="stat-trend positive">+12%</span>
              </div>
              <div className="main-stat-item">
                <span className="stat-icon">👥</span>
                <div className="stat-detail">
                  <span className="stat-detail-label">Total Candidates</span>
                  <span className="stat-detail-value">{stats.candidates.toLocaleString()}</span>
                </div>
                <span className="stat-trend positive">+23%</span>
              </div>
              <div className="main-stat-item">
                <span className="stat-icon">✅</span>
                <div className="stat-detail">
                  <span className="stat-detail-label">Placements</span>
                  <span className="stat-detail-value">{stats.placements.toLocaleString()}</span>
                </div>
                <span className="stat-trend positive">+18%</span>
              </div>
              <div className="main-stat-item">
                <span className="stat-icon">⏱️</span>
                <div className="stat-detail">
                  <span className="stat-detail-label">Avg. Time</span>
                  <span className="stat-detail-value">{stats.avgTime} days</span>
                </div>
                <span className="stat-trend negative">-3d</span>
              </div>
            </div>
          </div>

          {/* Chart Card */}
          <div className="dashboard-chart-card">
            <h3>Hiring Trends</h3>
            <div className="chart-container">
              <div className="chart-bar" style={{ height: '70px' }}></div>
              <div className="chart-bar" style={{ height: '90px' }}></div>
              <div className="chart-bar" style={{ height: '60px' }}></div>
              <div className="chart-bar" style={{ height: '110px' }}></div>
              <div className="chart-bar" style={{ height: '80px' }}></div>
              <div className="chart-bar" style={{ height: '95px' }}></div>
            </div>
            <div className="chart-labels">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>
          </div>

          {/* Recent Placements Card */}
          <div className="dashboard-recent-card">
            <h3>Recent Placements</h3>
            <div className="recent-list">
              {caseStudies.slice(0, 3).map((study, idx) => (
                <div key={idx} className="recent-item">
                  <div className="recent-company" style={{ background: study.color }}>
                    {study.logo}
                  </div>
                  <div className="recent-details">
                    <span className="recent-role">{study.industry}</span>
                    <span className="recent-company-name">{study.company}</span>
                  </div>
                  <span className="recent-time">{study.savings}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Success Stories Card */}
          <div className="dashboard-success-card">
            <h3>Success Stories</h3>
            <div className="success-stories-list">
              {caseStudies.map((study, idx) => (
                <div key={idx} className="success-story-item">
                  <div className="success-story-header">
                    <div className="story-company-logo" style={{ background: study.color }}>
                      {study.logo}
                    </div>
                    <div className="story-company-info">
                      <h4>{study.company}</h4>
                      <p>{study.industry}</p>
                    </div>
                  </div>
                  <p className="story-quote">"{study.testimonial.quote}"</p>
                  <div className="story-author">
                    <span className="author-name">{study.testimonial.author}</span>
                    <span className="author-role">{study.testimonial.role}</span>
                  </div>
                  <div className="story-outcome">
                    <span className="outcome-badge" style={{ background: `${study.color}15`, color: study.color }}>
                      {study.outcome}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Horizontal Scroll Section */}
      <section className="success-stories-horizontal">
        <div className="success-stories-header">
          <h2>Success Stories</h2>
          <p>Real results from our client partnerships</p>
        </div>

        <div className="stories-track-container">
          <div className="stories-track">
            {caseStudies.map((study, index) => (
              <div key={study.id} className="story-horizontal-card">
                <div className="story-horizontal-image">
                  <img src={study.image} alt={study.company} />
                  <div className="story-horizontal-overlay" style={{ background: `linear-gradient(45deg, ${study.color}, transparent)` }}></div>
                  <div className="story-horizontal-logo" style={{ background: study.color }}>
                    {study.logo}
                  </div>
                </div>
                
                <div className="story-horizontal-content">
                  <div className="story-horizontal-header">
                    <h3>{study.company}</h3>
                    <span className="story-horizontal-industry">{study.industry}</span>
                  </div>

                  <p className="story-horizontal-quote">"{study.testimonial.quote}"</p>
                  
                  <div className="story-horizontal-author">
                    <strong>{study.testimonial.author}</strong>
                    <span>{study.testimonial.role}</span>
                  </div>

                  <div className="story-horizontal-metrics">
                    <div className="story-metric">
                      <span className="metric-label">Challenge</span>
                      <span className="metric-value">{study.challenge}</span>
                    </div>
                    <div className="story-metric">
                      <span className="metric-label">Outcome</span>
                      <span className="metric-value">{study.outcome}</span>
                    </div>
                    <div className="story-metric">
                      <span className="metric-label">Savings</span>
                      <span className="metric-value">{study.savings}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid Section */}
      <section className="case-studies-section">
        <div className="case-studies-header">
          <h2>Case Studies</h2>
          <p>Detailed success stories from our clients</p>
        </div>

        <div className="case-studies-grid">
          {caseStudies.map((study, index) => (
            <div key={study.id} className="case-study-card">
              <div className="case-study-image">
                <img src={study.image} alt={study.company} />
                <div className="case-study-overlay" style={{ background: `linear-gradient(45deg, ${study.color}, transparent)` }}></div>
                <div className="case-study-logo" style={{ background: study.color }}>
                  {study.logo}
                </div>
              </div>
              
              <div className="case-study-content">
                <div className="case-study-header">
                  <h3>{study.company}</h3>
                  <span className="case-industry">{study.industry}</span>
                </div>

                <div className="case-study-details">
                  <div className="case-detail-item">
                    <i className="fas fa-exclamation-circle" style={{ color: study.color }}></i>
                    <div>
                      <span className="detail-label">Challenge</span>
                      <p>{study.challenge}</p>
                    </div>
                  </div>
                  <div className="case-detail-item">
                    <i className="fas fa-check-circle" style={{ color: study.color }}></i>
                    <div>
                      <span className="detail-label">Outcome</span>
                      <p>{study.outcome}</p>
                    </div>
                  </div>
                  <div className="case-detail-item">
                    <i className="fas fa-chart-line" style={{ color: study.color }}></i>
                    <div>
                      <span className="detail-label">Savings</span>
                      <p>{study.savings}</p>
                    </div>
                  </div>
                </div>

                <div className="case-study-testimonial">
                  <i className="fas fa-quote-left" style={{ color: study.color, fontSize: '20px', opacity: 0.3 }}></i>
                  <p>"{study.testimonial.quote}"</p>
                  <div className="testimonial-author">
                    <strong>{study.testimonial.author}</strong>
                    <span>{study.testimonial.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="employer-cta">
        <div className="cta-content">
          <h2>Ready to transform your hiring?</h2>
          <p>Join 500+ companies that trust HireWise</p>
          <Link to="/contact-us" className="cta-button">
            <span>Get Started</span>
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Employers