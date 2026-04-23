import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/candidate/CareerGuidance.css'

const CareerGuidance = () => {
  const resources = [
    {
      id: 'resume-guide',
      title: 'Resume Writing Guide',
      icon: '📄',
      description: 'Learn to create ATS-friendly resumes that get shortlisted by top companies',
      features: ['ATS Optimization', 'Keyword Strategies', 'Formatting Tips'],
      color: '#4158D0',
      gradient: 'linear-gradient(135deg, #4158D0, #C850C0)',
      image: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      path: '/candidate/career-guidance/resume-guide'
    },
    {
      id: 'interview-prep',
      title: 'Interview Preparation',
      icon: '🎯',
      description: 'Master technical and HR interviews with expert guides and mock interviews',
      features: ['Technical Questions', 'Behavioral Interviews', 'HR Discussions'],
      color: '#C850C0',
      gradient: 'linear-gradient(135deg, #C850C0, #FF6B6B)',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      path: '/candidate/career-guidance/interview-prep'
    },
    {
      id: 'career-planning',
      title: 'Career Planning',
      icon: '📈',
      description: 'Strategic guidance for long-term career success and growth',
      features: ['Goal Setting', 'Skill Development', 'Industry Trends'],
      color: '#11998e',
      gradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      path: '/candidate/career-guidance/career-planning'
    },
    {
      id: 'skill-development',
      title: 'Skill Development',
      icon: '💻',
      description: 'Free courses and certification recommendations to boost your career',
      features: ['Online Courses', 'Certifications', 'Learning Paths'],
      color: '#FF6B6B',
      gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      path: '/candidate/career-guidance/skill-development'
    },
    {
      id: 'salary-negotiation',
      title: 'Salary Negotiation',
      icon: '💰',
      description: 'Get the compensation package you deserve with proven strategies',
      features: ['Negotiation Scripts', 'Market Research', 'Benefits Guide'],
      color: '#4568DC',
      gradient: 'linear-gradient(135deg, #4568DC, #B06AB3)',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      path: '/candidate/career-guidance/salary-negotiation'
    },
    {
      id: 'job-search',
      title: 'Job Search Strategies',
      icon: '🔍',
      description: 'Effective techniques to land your dream job faster',
      features: ['Networking Tips', 'Application Strategy', 'Follow-up Guide'],
      color: '#F08A5D',
      gradient: 'linear-gradient(135deg, #F08A5D, #F9D56E)',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      path: '/candidate/career-guidance/job-search'
    }
  ]

  return (
    <div className="career-guidance-page">
      {/* Hero Image Section */}
      <div className="career-hero-image">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Career Guidance"
          className="hero-bg-image"
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Career <span className="gradient-text">Guidance</span></h1>
          <p>Expert resources to help you at every stage of your career journey</p>
        </div>
      </div>

      {/* Explore Our Resources Section */}
      <section className="explore-resources-section">
        <div className="section-header">
          <h2>Explore Our Resources</h2>
          <p>Comprehensive guides, tools, and templates to accelerate your career</p>
        </div>

        <div className="resources-grid">
          {resources.map((resource) => (
            <Link to={resource.path} key={resource.id} className="resource-card-link" style={{ textDecoration: 'none' }}>
              <div className="resource-card">
                <div className="resource-card-inner">
                  {/* Card Image */}
                  <div className="card-image-container">
                    <img src={resource.image} alt={resource.title} className="card-image" />
                    <div className="image-overlay" style={{ background: resource.gradient }}></div>
                    <div className="card-icon" style={{ background: resource.color }}>
                      {resource.icon}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="card-content">
                    <h3>{resource.title}</h3>
                    <p className="card-description">{resource.description}</p>

                    {/* Features Tags */}
                    <div className="feature-tags">
                      {resource.features.map((feature, index) => (
                        <span key={index} className="feature-tag" style={{ backgroundColor: `${resource.color}15`, color: resource.color }}>
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Explore Button - Now part of the Link */}
                    <div className="explore-button" style={{ backgroundColor: resource.color }}>
                      <span>Explore Now</span>
                      <i className="fas fa-arrow-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Expert Consultation CTA */}
      <section className="expert-cta">
        <div className="cta-background">
          <div className="cta-circle circle-1"></div>
          <div className="cta-circle circle-2"></div>
        </div>
        
        <div className="cta-content">
          <h2>Need Personalized Career Guidance?</h2>
          <p>Get 1-on-1 advice from our career experts tailored to your specific goals</p>
          <Link to="/contact-us" className="cta-button">
            <i className="fas fa-calendar-check"></i>
            <span>Schedule Free Consultation</span>
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>

        <div className="cta-testimonials">
          <div className="testimonial-avatars">
            <img src="https://i.pravatar.cc/50?img=12" alt="User" />
            <img src="https://i.pravatar.cc/50?img=32" alt="User" />
            <img src="https://i.pravatar.cc/50?img=45" alt="User" />
            <img src="https://i.pravatar.cc/50?img=7" alt="User" />
            <span className="avatar-count">+2K</span>
          </div>
          <p className="testimonial-text">Trusted by professionals worldwide</p>
        </div>
      </section>
    </div>
  )
}

export default CareerGuidance