import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/ServicePage.css';

const PharmaHealthcare = () => {
  const [stats, setStats] = useState({ placements: 0, clients: 0, retention: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({ placements: 850, clients: 75, retention: 96 });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="service-page">
      <div className="service-hero" style={{ background: 'linear-gradient(135deg, #6C5B7B, #8A6E9E)' }}>
        <h1>Pharma & Healthcare</h1>
        <p>Specialized recruitment for pharmaceutical, biotech & healthcare sectors</p>
      </div>

      <div className="service-stats">
        <div className="stat-card glass-card"><span className="stat-value">{stats.placements}+</span><span className="stat-label">Placements</span></div>
        <div className="stat-card glass-card"><span className="stat-value">{stats.clients}+</span><span className="stat-label">Clients</span></div>
        <div className="stat-card glass-card"><span className="stat-value">{stats.retention}%</span><span className="stat-label">Retention</span></div>
      </div>

      <div className="features-grid">
        <div className="feature-card glass-card"><div className="feature-icon">🔬</div><h3>R&D Scientists</h3><p>Research, Development, Formulation</p></div>
        <div className="feature-card glass-card"><div className="feature-icon">📋</div><h3>Clinical Research</h3><p>CRAs, CRC, Clinical Data Managers</p></div>
        <div className="feature-card glass-card"><div className="feature-icon">⚖️</div><h3>Regulatory Affairs</h3><p>RA Specialists, Drug Safety</p></div>
        <div className="feature-card glass-card"><div className="feature-icon">🏥</div><h3>Healthcare Professionals</h3><p>Doctors, Nurses, Pharmacists</p></div>
      </div>

      <div className="benefits-list">
        <h2>Why Choose Us</h2>
        <ul>
          <li><i className="fas fa-check-circle"></i> GMP/GDP compliance knowledge</li>
          <li><i className="fas fa-check-circle"></i> Clinical trial experience verification</li>
          <li><i className="fas fa-check-circle"></i> Regulatory certification checks</li>
        </ul>
      </div>

      <Link to="/contact-us" className="cta-button">Hire Talent</Link>
    </div>
  );
};

export default PharmaHealthcare;