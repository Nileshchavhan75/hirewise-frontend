import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import ServicesSection from '../components/ServicesSection'

const Home = () => {
  const { theme } = useTheme()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const stats = [
    { value: '500+', label: 'Corporate Clients', icon: '🏢' },
    { value: '10K+', label: 'Successful Placements', icon: '👥' },
    { value: '95%', label: 'Client Retention', icon: '📈' },
    { value: '15+', label: 'Countries', icon: '🌍' }
  ]

  const testimonials = [
    {
      name: 'Rajesh Mehta',
      role: 'CTO, TechCorp',
      content: 'HireWise transformed our hiring. Their understanding of tech roles is unmatched.',
      avatar: 'https://i.pravatar.cc/150?img=12',
      rating: 5
    },
    {
      name: 'Priya Singh',
      role: 'HR Director, InnovateLabs',
      content: 'The quality of candidates and speed of hiring has improved by 60%.',
      avatar: 'https://i.pravatar.cc/150?img=32',
      rating: 5
    },
    {
      name: 'Ahmed Al-Rashid',
      role: 'CEO, Gulf Tech',
      content: 'Their UAE recruitment helped us build our Dubai office in record time.',
      avatar: 'https://i.pravatar.cc/150?img=45',
      rating: 5
    }
  ]

  // Handle Upload Resume button click
  const handleUploadResume = () => {
    if (!user) {
      // Not logged in - redirect to login
      navigate('/login', { state: { from: '/', action: 'uploadResume' } })
    } else if (user.role === 'candidate') {
      // Candidate - go to browse jobs page to apply
      navigate('/candidates')
    } else {
      // Employer or Admin - show message
      alert('Only candidates can upload resumes to apply for jobs')
    }
  }

  const getPrimaryButton = () => {
    if (user?.role === 'employer' || user?.role === 'admin') {
      return {
        text: 'Post a Job',
        icon: 'fas fa-plus-circle',
        link: '/employer-dashboard',
        className: 'btn-primary'
      }
    }
    return {
      text: 'Browse Jobs',
      icon: 'fas fa-search',
      link: '/candidates',
      className: 'btn-primary'
    }
  }

  const primaryButton = getPrimaryButton()

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-particles"></div>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">✨</span>
              <span>Trusted by 500+ Companies</span>
            </div>

            <h1 className="hero-title">
              Where 
              <span className="gradient-text"> Talent</span>
              <br />Meets 
              <span className="gradient-text"> Opportunity</span>
            </h1>

            <p className="hero-description">
              End-to-end recruitment solutions for IT & Non-IT sectors. 
              PAN India presence with international operations in US & UAE.
            </p>

            <div className="hero-actions">
              <Link to={primaryButton.link} className={primaryButton.className}>
                <i className={primaryButton.icon}></i>
                <span>{primaryButton.text}</span>
                <i className="fas fa-arrow-right"></i>
              </Link>
              
              <button onClick={handleUploadResume} className="btn-secondary">
                <i className="fas fa-file-upload"></i>
                <span>Upload Resume</span>
              </button>
            </div>

            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-info">
                    <span className="stat-number">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <lottie-player
              src="https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json"
              background="transparent"
              speed="1"
              style={{ width: '100%', height: '500px' }}
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="mouse"></div>
          <span>Scroll</span>
        </div>
      </section>

      <ServicesSection />

      <section className="testimonials">
        <div className="testimonials-container">
          <h2>What Our Clients Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">
                  <i className="fas fa-quote-left"></i>
                  <p>{testimonial.content}</p>
                </div>
                <div className="testimonial-author">
                  <img src={testimonial.avatar} alt={testimonial.name} />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Transform Your Hiring?</h2>
          <p>Join 500+ companies that trust HireWise for their recruitment needs</p>
          <div className="cta-actions">
            <Link to="/contact-us" className="btn-primary">
              <i className="fas fa-calendar-alt"></i>
              Schedule Consultation
            </Link>
            <Link to="/resources" className="btn-outline">
              <i className="fas fa-download"></i>
              Download Brochure
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home