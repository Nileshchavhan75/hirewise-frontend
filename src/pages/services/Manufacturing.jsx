import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/ServicePage.css';

const Manufacturing = () => {
  const [stats, setStats] = useState({ placements: 0, clients: 0, satisfaction: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({ placements: 1800, clients: 120, satisfaction: 94 });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="service-page">
      <div className="service-hero" style={{ background: 'linear-gradient(135deg, #2A9D8F, #20A4B0)' }}>
        <h1>Manufacturing Recruitment</h1>
        <p>Specialized workforce for plant operations, supply chain & quality control</p>
      </div>

      <div className="service-stats">
        <div className="stat-card glass-card"><span className="stat-value">{stats.placements}+</span><span className="stat-label">Placements</span></div>
        <div className="stat-card glass-card"><span className="stat-value">{stats.clients}+</span><span className="stat-label">Clients</span></div>
        <div className="stat-card glass-card"><span className="stat-value">{stats.satisfaction}%</span><span className="stat-label">Satisfaction</span></div>
      </div>

      <div className="features-grid">
        <div className="feature-card glass-card"><div className="feature-icon">🏭</div><h3>Plant Operations</h3><p>Supervisors, Managers, Technicians</p></div>
        <div className="feature-card glass-card"><div className="feature-icon">📦</div><h3>Supply Chain</h3><p>Logistics, Inventory, Procurement</p></div>
        <div className="feature-card glass-card"><div className="feature-icon">✅</div><h3>Quality Control</h3><p>QA/QC Engineers, Inspectors</p></div>
        <div className="feature-card glass-card"><div className="feature-icon">⚙️</div><h3>Lean Manufacturing</h3><p>Six Sigma, Process Improvement</p></div>
      </div>

      <div className="benefits-list">
        <h2>Why Choose Us</h2>
        <ul>
          <li><i className="fas fa-check-circle"></i> Industry‑specific skill assessments</li>
          <li><i className="fas fa-check-circle"></i> Safety compliance verification</li>
          <li><i className="fas fa-check-circle"></i> Rapid deployment for shift roles</li>
        </ul>
      </div>

      <Link to="/contact-us" className="cta-button">Request Talent</Link>
    </div>
  );
};

export default Manufacturing;