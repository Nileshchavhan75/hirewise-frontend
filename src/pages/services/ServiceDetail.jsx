// src/pages/services/ServiceDetail.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../../context/ThemeContext';
import { getServiceById } from './servicesData';
import AnimatedCounter from '../../components/AnimatedCounter';
import ProcessTimeline from '../../components/ProcessTimeline';
import './ServicePage.css';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const [error, setError] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const service = getServiceById(serviceId);

  // Scroll to top on page load (fixes "page opens at middle" issue)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Mouse move parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x: x * 20, y: y * 20 });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!service) {
      setError(`Service "${serviceId}" not found`);
      setTimeout(() => navigate('/services'), 2000);
    }
  }, [service, serviceId, navigate]);

  if (error) {
    return (
      <div className="error-page">
        <i className="fas fa-exclamation-triangle"></i>
        <h2>Service Not Found</h2>
        <p>{error}</p>
        <Link to="/services" className="btn-primary">Back to Services</Link>
      </div>
    );
  }
  if (!service) return <div className="loading-spinner"><i className="fas fa-spinner fa-pulse"></i> Loading...</div>;

  const isUpcoming = !service.features || service.features.length === 0 || !service.metrics;

  // Beautiful animated illustration that always works
  const renderHeroVisual = () => (
    <div className="hero-visual-container">
      <div className="floating-orb" style={{ background: `radial-gradient(circle at 30% 30%, ${service.primaryColor}, ${service.secondaryColor})` }}>
        <div className="orb-ring"></div>
        <div className="orb-ring orb-ring-2"></div>
        <div className="orb-icon">
          <i className={service.icon}></i>
        </div>
      </div>
      <div className="floating-particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="float-particle" style={{ animationDelay: `${i * 0.5}s` }}>
            <i className="fas fa-star"></i>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{service.title} | Hire Wise Solutions</title>
        <meta name="description" content={service.description} />
      </Helmet>

      <main className={`service-detail-page ${theme}`}>
        {/* Hero Section */}
        <header 
          className="service-hero" 
          ref={heroRef}
          style={{ 
            background: service.gradient,
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        >
          <div className="hero-particles">
            {[...Array(40)].map((_, i) => (
              <div 
                key={i} 
                className="particle" 
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${4 + Math.random() * 6}s`
                }}
              />
            ))}
          </div>
          <div className="hero-overlay"></div>
          <div className="container">
            <div className="hero-grid">
              <div className="hero-text">
                <span className="service-badge">
                  <i className={service.icon}></i> {service.title}
                </span>
                <h1 className="glow-text">{service.subtitle || service.title}</h1>
                <p>{service.description}</p>
              </div>
              <div className="hero-visual">
                {renderHeroVisual()}
              </div>
            </div>
          </div>
          <div className="hero-scroll-indicator">
            <span>Scroll</span>
            <div className="scroll-arrow">
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </header>

        {/* Upcoming Banner */}
        {isUpcoming && (
          <section className="upcoming-banner">
            <div className="container">
              <div className="upcoming-content">
                <i className="fas fa-clock"></i>
                <h3>Coming Soon!</h3>
                <p>We're crafting an exceptional recruitment solution for {service.title}. Stay tuned.</p>
                <Link to="/contact-us" className="btn-upcoming">Notify Me</Link>
              </div>
            </div>
          </section>
        )}

        {/* Metrics Section */}
        {!isUpcoming && service.metrics && service.metrics.length > 0 && (
          <section className="metrics-section">
            <div className="container">
              <div className="metrics-grid">
                {service.metrics.map((metric, idx) => (
                  <div className="metric-card-3d" key={idx}>
                    <div className="metric-icon" style={{ color: service.primaryColor }}>
                      <i className={metric.icon}></i>
                    </div>
                    <div className="metric-number">
                      <AnimatedCounter end={metric.value} suffix={metric.suffix} />
                    </div>
                    <div className="metric-label">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <div className="section-header">
              <h2>{isUpcoming ? 'Coming Soon Features' : "What's Included"}</h2>
              <p>{isUpcoming ? 'We are preparing something amazing' : 'End-to-end solutions tailored to your needs'}</p>
            </div>
            <div className="features-grid">
              {service.features && service.features.length > 0 ? (
                service.features.map((feature, idx) => (
                  <div className="feature-card-glow" key={idx}>
                    <div className="feature-icon" style={{ background: service.primaryColor }}>
                      <i className="fas fa-check"></i>
                    </div>
                    <h3>{feature}</h3>
                    <div className="feature-glow" style={{ background: service.primaryColor }}></div>
                  </div>
                ))
              ) : (
                [...Array(4)].map((_, idx) => (
                  <div className="feature-card-glow" key={idx}>
                    <div className="feature-icon" style={{ background: '#94a3b8' }}>
                      <i className="fas fa-spinner fa-pulse"></i>
                    </div>
                    <h3>Exciting Feature Coming Soon</h3>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        {!isUpcoming && service.process && service.process.length > 0 && (
          <section className="process-section">
            <div className="container">
              <div className="section-header">
                <h2>Our Process</h2>
                <p>How we deliver excellence</p>
              </div>
              <ProcessTimeline steps={service.process} primaryColor={service.primaryColor} />
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {!isUpcoming && service.faq && service.faq.length > 0 && (
          <section className="faq-section">
            <div className="container">
              <div className="section-header">
                <h2>Frequently Asked Questions</h2>
              </div>
              <div className="faq-grid">
                {service.faq.map((item, idx) => (
                  <div className="faq-item-glow" key={idx}>
                    <div className="faq-question">
                      <i className="fas fa-question-circle" style={{ color: service.primaryColor }}></i>
                      <h3>{item.q}</h3>
                    </div>
                    <p>{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="service-cta" style={{ background: service.gradient }}>
          <div className="container">
            <h2>Ready to transform your hiring?</h2>
            <p>Get in touch with our experts for a free consultation</p>
            <Link to="/contact-us" className="cta-button-pulse">
              Contact Us <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default ServiceDetail;