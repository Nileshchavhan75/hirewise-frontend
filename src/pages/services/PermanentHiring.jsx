import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/ServicePage.css';

const PermanentHiring = () => {
  return (
    <div className="service-page">
      <div className="service-hero" style={{ background: 'linear-gradient(135deg, #FF6B4A, #FF3B7F)' }}>
        <h1>Permanent Hiring</h1>
        <p>Build your core team with leaders who drive growth</p>
      </div>

      <div className="service-stats">
        <div className="stat-card"><span className="stat-value">21 days</span><span className="stat-label">Avg. Time</span></div>
        <div className="stat-card"><span className="stat-value">95%</span><span className="stat-label">Success Rate</span></div>
        <div className="stat-card"><span className="stat-value">500+</span><span className="stat-label">Placements</span></div>
      </div>

      <div className="features-grid">
        <div className="feature-card"><div className="feature-icon">🎯</div><h3>Executive Search</h3><p>C‑level, VP, Director positions</p></div>
        <div className="feature-card"><div className="feature-icon">📊</div><h3>Mid‑Senior Level</h3><p>Managers, Leads, Architects</p></div>
        <div className="feature-card"><div className="feature-icon">👥</div><h3>Succession Planning</h3><p>Future leaders pipeline</p></div>
      </div>

      <div className="benefits-list">
        <h2>Why Choose Us</h2>
        <ul>
          <li><i className="fas fa-check-circle"></i> 90‑day replacement guarantee</li>
          <li><i className="fas fa-check-circle"></i> Cultural fit assessment</li>
          <li><i className="fas fa-check-circle"></i> Background verification</li>
        </ul>
      </div>

      <Link to="/candidate/submit-resume" className="cta-button">Submit Your Resume</Link>
    </div>
  );
};

export default PermanentHiring;