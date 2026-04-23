import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const About = () => {
  const { theme } = useTheme()

  useEffect(() => {
    // Load Lottie
    const script = document.createElement('script')
    script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
    script.async = true
    document.body.appendChild(script)

    // Animate counters
    const counters = document.querySelectorAll('.counter')
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'))
      let count = 0
      const increment = target / 50
      
      const updateCount = () => {
        if (count < target) {
          count += increment
          counter.innerText = Math.ceil(count)
          setTimeout(updateCount, 20)
        } else {
          counter.innerText = target
        }
      }
      updateCount()
    })

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Based on your uploaded document
  const timeline = [
    { year: '2020', event: 'Started as partnership recruitment firm', icon: '🚀', description: 'Founded with a vision to transform recruitment' },
    { year: '2023', event: 'Expanded PAN India operations', icon: '🇮🇳', description: 'IT & Non-IT hiring across all major cities' },
    { year: '2025', event: 'Converted to Hire Wise Solutions Pvt. Ltd.', icon: '🏢', description: 'Corporate structure with enhanced capabilities' }
  ]

  const leadership = {
    name: 'Sneha Pathak',
    role: 'Co-Founder',
    location: 'Pune',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'With over 15 years of experience in recruitment and HR consulting, Sneha has built HireWise into a trusted name in talent acquisition.',
    expertise: ['Strategic HR', 'Talent Acquisition', 'Business Development']
  }

  const stats = [
    { value: '500+', label: 'Corporate Clients', icon: '🏢' },
    { value: '10000', label: 'Candidates Placed', icon: '👥' },
    { value: '95', label: 'Success Rate', icon: '📈' },
    { value: '15', label: 'Countries', icon: '🌍' },
    { value: '50+', label: 'Recruitment Experts', icon: '👔' },
    { value: '24/7', label: 'Support Available', icon: '⚡' }
  ]

  const whyChooseUs = [
    {
      icon: '🎯',
      title: 'End-to-End Solutions',
      description: 'Complete recruitment lifecycle management from sourcing to onboarding',
      color: '#00d4ff'
    },
    {
      icon: '🌍',
      title: 'PAN India & International',
      description: 'Presence across India with operations in US & UAE',
      color: '#ff66b5'
    },
    {
      icon: '⚡',
      title: 'Faster Hiring',
      description: 'Average time-to-hire reduced by 60% with quality matching',
      color: '#00d68f'
    },
    {
      icon: '🔒',
      title: 'Secure & Scalable',
      description: '100% data protection with scalable recruitment solutions',
      color: '#ffb547'
    }
  ]

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-particles"></div>
        <div className="about-hero-container">
          <div className="about-hero-content">
            <div className="about-hero-badge">
              <span className="badge-icon">🏆</span>
              <span>ISO 27001 Certified</span>
            </div>
            <h1 className="about-hero-title">
              About <span className="gradient-text">HireWise</span>
            </h1>
            <p className="about-hero-description">
              Professional recruitment and HR service provider offering end-to-end 
              talent acquisition solutions across IT and Non-IT sectors
            </p>
            <div className="about-hero-stats">
              {stats.slice(0, 3).map((stat, index) => (
                <div key={index} className="hero-stat-item">
                  <span className="hero-stat-value counter" data-target={stat.value.replace(/\D/g, '')}>0</span>
                  <span className="hero-stat-suffix">{stat.value.replace(/[0-9]/g, '')}</span>
                  <span className="hero-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-hero-visual">
            <lottie-player
              src="https://assets2.lottiefiles.com/packages/lf20_tno6cg2w.json"
              background="transparent"
              speed="1"
              style={{ width: '100%', height: '500px' }}
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="journey-section">
        <div className="journey-container">
          <div className="section-header">
            <span className="section-subtitle">OUR JOURNEY</span>
            <h2 className="section-title">
              From <span className="gradient-text">2020 to 2025</span>
            </h2>
            <p className="section-description">
              Transforming recruitment with innovation and excellence
            </p>
          </div>

          <div className="timeline">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-icon">{item.icon}</div>
                </div>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h3 className="timeline-title">{item.event}</h3>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="vision-mission">
        <div className="vision-mission-container">
          <div className="vision-card">
            <div className="vision-icon">
              <i className="fas fa-eye"></i>
            </div>
            <h2>Our Vision</h2>
            <p>To build a transparent, intelligent, and future-ready recruitment ecosystem that connects talent with opportunity seamlessly.</p>
          </div>
          <div className="mission-card">
            <div className="mission-icon">
              <i className="fas fa-bullseye"></i>
            </div>
            <h2>Our Mission</h2>
            <p>To simplify and accelerate hiring using scalable technology-driven solutions while maintaining the human touch.</p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="leadership-section">
        <div className="leadership-container">
          <div className="leadership-content">
            <span className="section-subtitle">LEADERSHIP</span>
            <h2 className="section-title">
              Meet Our <span className="gradient-text">Founder</span>
            </h2>
            <div className="leader-card">
              <div className="leader-image">
                <img src={leadership.image} alt={leadership.name} />
              </div>
              <div className="leader-info">
                <h3>{leadership.name}</h3>
                <p className="leader-role">{leadership.role} | {leadership.location}</p>
                <p className="leader-bio">{leadership.bio}</p>
                <div className="leader-expertise">
                  {leadership.expertise.map((skill, index) => (
                    <span key={index}>{skill}</span>
                  ))}
                </div>
                <div className="leader-social">
                  <a href="#"><i className="fab fa-linkedin"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fas fa-envelope"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div className="leadership-visual">
            <lottie-player
              src="https://assets3.lottiefiles.com/packages/lf20_puciaact.json"
              background="transparent"
              speed="1"
              style={{ width: '100%', height: '400px' }}
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <div className="why-choose-container">
          <div className="section-header">
            <span className="section-subtitle">WHY CHOOSE US</span>
            <h2 className="section-title">
              Built for <span className="gradient-text">Modern Hiring</span>
            </h2>
          </div>

          <div className="why-choose-grid">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="why-choose-card">
                <div className="why-choose-icon" style={{ background: `${item.color}20`, color: item.color }}>
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

          <div className="why-choose-features">
            <div className="features-list">
              <h3>What makes us different:</h3>
              <ul>
                <li><i className="fas fa-check-circle"></i> End-to-end recruitment & workforce solutions</li>
                <li><i className="fas fa-check-circle"></i> PAN India & international reach</li>
                <li><i className="fas fa-check-circle"></i> Faster hiring with quality matching</li>
                <li><i className="fas fa-check-circle"></i> Secure & scalable platform</li>
                <li><i className="fas fa-check-circle"></i> 95% client retention rate</li>
                <li><i className="fas fa-check-circle"></i> 24/7 dedicated support</li>
              </ul>
            </div>
            <div className="features-visual">
              <lottie-player
                src="https://assets10.lottiefiles.com/packages/lf20_qp1q7mct.json"
                background="transparent"
                speed="1"
                style={{ width: '100%', height: '350px' }}
                loop
                autoplay
              ></lottie-player>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="stats-counter">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="counter-card">
              <div className="counter-icon">{stat.icon}</div>
              <div className="counter-number">
                <span className="counter" data-target={stat.value.replace(/\D/g, '')}>0</span>
                <span className="counter-suffix">{stat.value.replace(/[0-9]/g, '')}</span>
              </div>
              <div className="counter-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="about-cta-container">
          <h2>Ready to Transform Your Hiring?</h2>
          <p>Join 500+ companies that trust HireWise for their recruitment needs</p>
          <div className="about-cta-actions">
            <Link to="/contact-us" className="btn-primary">
              <i className="fas fa-calendar-alt"></i>
              Schedule Consultation
            </Link>
            <Link to="/services" className="btn-outline">
              <i className="fas fa-briefcase"></i>
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About