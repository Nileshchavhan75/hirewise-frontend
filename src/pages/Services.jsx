import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from './services/servicesData';

import { useTheme } from '../context/ThemeContext';
// ...
const Services = () => {
 const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  const carouselRef = useRef(null);
  const autoScrollInterval = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const serviceList = Object.values(servicesData);
  const categories = {
    all: { name: 'All Services', icon: '✨', services: serviceList },
    hiring: { name: 'Hiring Solutions', icon: '🎯', services: serviceList.filter(s => ['permanent-hiring', 'contractual-hiring', 'intern-hiring', 'bulk-hiring'].includes(s.id)) },
    sector: { name: 'Sector Specific', icon: '💼', services: serviceList.filter(s => ['it-hiring', 'non-it-hiring', 'manufacturing', 'pharma-healthcare'].includes(s.id)) },
    international: { name: 'International', icon: '🌍', services: serviceList.filter(s => s.id === 'international-recruitment') },
    payroll: { name: 'Payroll & Compliance', icon: '⚖️', services: serviceList.filter(s => s.id === 'payroll-compliance') }
  };

  const currentServices = categories[activeCategory]?.services || [];
  const duplicatedServices = currentServices.length <= 2 
    ? Array(6).fill(currentServices).flat() 
    : Array(3).fill(currentServices).flat();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering && carouselRef.current && duplicatedServices.length > 0) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        const maxScroll = scrollWidth - clientWidth;
        let newLeft = scrollLeft + 1.8;
        if (newLeft >= maxScroll - 10) {
          const segmentWidth = scrollWidth / (duplicatedServices.length / currentServices.length);
          carouselRef.current.scrollLeft = segmentWidth;
        } else {
          carouselRef.current.scrollLeft = newLeft;
        }
      }
    }, 20);
    return () => clearInterval(interval);
  }, [isHovering, duplicatedServices, currentServices]);

  const stats = [
    { value: 500, label: 'Corporate Clients', suffix: '+' },
    { value: 10000, label: 'Candidates Placed', suffix: '+' },
    { value: 95, label: 'Success Rate', suffix: '%' },
    { value: 15, label: 'Countries', suffix: '+' }
  ];

  const heroBgImage = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format";

  // Dark mode colors
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#0f172a' : '#f8fafc';
  const cardBg = isDark ? '#1e293b' : 'white';
  const cardBorder = isDark ? '#334155' : '#e2e8f0';
  const textPrimary = isDark ? '#f1f5f9' : '#1e293b';
  const textSecondary = isDark ? '#94a3b8' : '#64748b';
  const tabBg = isDark ? '#1e293b' : 'white';
  const industryBg = isDark ? '#1e293b' : '#f8fafc';

  return (
    <div style={{ background: bgColor, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', transition: 'background 0.3s' }}>
      
      {/* Hero Section - Only background image, no color overlay */}
      <div style={{
        position: 'relative',
        color: 'white',
        padding: '90px 0',
        backgroundImage: `url(${heroBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        overflow: 'hidden'
      }}>
        {/* No gradient overlay – just the image */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 0.8fr', gap: '40px', alignItems: 'center' }}>
          <div>
            <span style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', padding: '6px 18px', borderRadius: '50px', fontSize: '14px', display: 'inline-block' }}>
              ✨ End-to-End Recruitment
            </span>
            <h1 style={{ fontSize: '52px', margin: '25px 0', fontWeight: '800', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
              Our <span style={{ background: 'linear-gradient(135deg, #fff, #ffd6e0)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Services</span>
            </h1>
            <p style={{ fontSize: '18px', marginBottom: '35px', opacity: 0.95, maxWidth: '90%', textShadow: '0 1px 5px rgba(0,0,0,0.2)' }}>
              Comprehensive hiring, workforce, and compliance solutions for businesses across industries.
            </p>
            <div style={{ display: 'flex', gap: '50px', marginBottom: '35px', flexWrap: 'wrap' }}>
              {stats.map((s, i) => (
                <div key={i} style={{ textAlign: 'center', textShadow: '0 1px 5px rgba(0,0,0,0.2)' }}>
                  <div style={{ fontSize: '34px', fontWeight: '800' }}>{s.value}{s.suffix}</div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <Link to="/contact-us" style={{ background: 'white', color: '#1e293b', padding: '12px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                Get Started <i className="fas fa-arrow-right"></i>
              </Link>
              <Link to="/resources" style={{ border: '2px solid white', padding: '12px 28px', borderRadius: '50px', textDecoration: 'none', color: 'white', fontWeight: '600', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                Watch Demo <i className="fas fa-play"></i>
              </Link>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '260px',
              height: '260px',
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              animation: 'float 6s ease-in-out infinite',
              boxShadow: '0 0 30px rgba(0,0,0,0.2)'
            }}>
              <i className="fas fa-bolt" style={{ fontSize: '72px', color: 'white', animation: 'pulse 2s infinite' }}></i>
            </div>
          </div>
        </div>
        
        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 2, animation: 'bounce 2s infinite' }}>
          <div style={{ fontSize: '14px', textShadow: '0 1px 5px rgba(0,0,0,0.3)' }}>Scroll</div>
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>

      {/* Category Tabs - with dark mode */}
      <div style={{ background: tabBg, padding: '8px 0', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 4px rgba(0,0,0,0.05)', transition: 'background 0.3s' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', padding: '0 20px' }}>
          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              style={{
                background: activeCategory === key ? 'linear-gradient(135deg, #4158D0, #C850C0)' : 'transparent',
                border: 'none',
                padding: '6px 20px',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                color: activeCategory === key ? 'white' : textPrimary,
                transition: 'background 0.2s',
                boxShadow: 'none'
              }}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel Section - with dark mode card colors */}
      <div style={{ padding: '30px 0 60px', transition: 'background 0.3s' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '36px', background: 'linear-gradient(135deg, #1e293b, #3b82f6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', marginBottom: '8px' }}>Explore Our Solutions</h2>
          <p style={{ color: textSecondary }}>Automatically scrolling — hover to pause</p>
        </div>
        
        <div 
          ref={carouselRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            overflowX: 'auto',
            overflowY: 'hidden',
            whiteSpace: 'nowrap',
            cursor: 'grab',
            padding: '15px 0 25px',
            scrollbarWidth: 'thin',
            scrollbarColor: '#94a3b8 #e2e8f0'
          }}
        >
          <div style={{ display: 'inline-flex', gap: '24px', padding: '0 24px' }}>
            {duplicatedServices.map((service, idx) => (
              <Link
                to={`/services/${service.id}`}
                key={`${service.id}-${idx}`}
                style={{
                  width: '350px',
                  flexShrink: 0,
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                  willChange: 'transform',
                  transition: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{
                  background: cardBg,
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
                  border: `1px solid ${cardBorder}`,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'background 0.3s, border 0.3s'
                }}>
                  <div style={{
                    height: '180px',
                    background: service.gradient || `linear-gradient(135deg, ${service.primaryColor || '#4158D0'}, ${service.secondaryColor || '#C850C0'})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '68px',
                    color: 'white'
                  }}>
                    <i className={service.icon}></i>
                  </div>
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '22px', marginBottom: '8px', color: textPrimary, fontWeight: '700' }}>{service.title}</h3>
                    <p style={{ color: textSecondary, fontSize: '13px', lineHeight: '1.45', marginBottom: '16px', whiteSpace: 'normal', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {service.subtitle || (service.description?.substring(0, 70) + '...')}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '18px' }}>
                      {service.metrics?.slice(0, 2).map((m, i) => (
                        <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                          <strong style={{ color: '#4158D0', fontSize: '18px', display: 'block' }}>{m.value}{m.suffix}</strong>
                          <span style={{ fontSize: '10px', textTransform: 'uppercase', color: textSecondary }}>{m.label}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px', color: '#4158D0', fontWeight: '600', fontSize: '13px' }}>
                      <span>Learn More</span>
                      <i className="fas fa-arrow-right" style={{ fontSize: '11px' }}></i>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Industries Section - dark mode */}
      <div style={{ background: cardBg, padding: '60px 0', transition: 'background 0.3s' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '36px', background: 'linear-gradient(135deg, #1e293b, #3b82f6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', marginBottom: '10px' }}>Industries We Serve</h2>
          <p style={{ textAlign: 'center', color: textSecondary, marginBottom: '40px' }}>Specialized expertise across diverse sectors</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { name: 'IT & Software', icon: '💻', placements: '2,000+' },
              { name: 'Banking & Finance', icon: '🏦', placements: '1,500+' },
              { name: 'Healthcare', icon: '🏥', placements: '1,200+' },
              { name: 'Manufacturing', icon: '🏭', placements: '1,800+' },
              { name: 'Retail & E‑commerce', icon: '🛍️', placements: '900+' },
              { name: 'Oil & Gas', icon: '⛽', placements: '600+' },
              { name: 'Pharmaceuticals', icon: '💊', placements: '800+' },
              { name: 'Logistics', icon: '🚚', placements: '700+' }
            ].map((ind, i) => (
              <div key={i} style={{
                background: industryBg,
                borderRadius: '20px',
                padding: '20px 16px',
                textAlign: 'center',
                transition: 'transform 0.2s',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden'
              }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ fontSize: '42px', marginBottom: '12px' }}>{ind.icon}</div>
                <h4 style={{ fontSize: '17px', marginBottom: '6px', color: textPrimary }}>{ind.name}</h4>
                <span style={{ color: textSecondary, fontSize: '13px' }}>{ind.placements} placements</span>
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '3px', background: '#4158D0', transition: 'height 0.2s' }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA - dark mode support */}
      <div style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)', textAlign: 'center', padding: '60px 20px', color: 'white' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '12px', fontWeight: '800' }}>Ready to Transform Your Hiring?</h2>
        <p style={{ fontSize: '17px', marginBottom: '28px', opacity: 0.95 }}>Join 500+ companies that trust HireWise</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact-us" style={{ background: 'white', color: '#1e293b', padding: '12px 32px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            Schedule Consultation
          </Link>
          <Link to="/employer/submit-requirement" style={{ border: '2px solid white', padding: '12px 32px', borderRadius: '50px', textDecoration: 'none', color: 'white', fontWeight: '600', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            Post a Job
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        a, button {
          -webkit-font-smoothing: antialiased;
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default Services;