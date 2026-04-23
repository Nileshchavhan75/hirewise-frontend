import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/ServicePage.css';

const PayrollCompliance = () => {
  const [stats, setStats] = useState({ accuracy: 0, clients: 0, support: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({ accuracy: 99.9, clients: 800, support: 24 });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="service-page">
      <div className="service-hero" style={{ background: 'linear-gradient(135deg, #4568DC, #B06AB3)' }}>
        <h1>Payroll & Compliance</h1>
        <p>End‑to‑end payroll management & statutory compliance</p>
      </div>

      <div className="service-stats">
        <div className="stat-card glass-card"><span className="stat-value">{stats.accuracy}%</span><span className="stat-label">Accuracy</span></div>
        <div className="stat-card glass-card"><span className="stat-value">{stats.clients}+</span><span className="stat-label">Happy Clients</span></div>
        <div className="stat-card glass-card"><span className="stat-value">{stats.support}/7</span><span className="stat-label">Support</span></div>
      </div>

      <div className="features-grid">
        <div className="feature-card glass-card"><div className="feature-icon">💰</div><h3>Salary Processing</h3><p>Monthly payroll, reimbursements, bonuses</p></div>
        <div className="feature-card glass-card"><div className="feature-icon">📊</div><h3>Tax Compliance</h3><p>TDS, PT, Form 16, annual filings</p></div>
        <div className="feature-card glass-card"><div className="feature-icon">⚖️</div><h3>Statutory Compliance</h3><p>PF, ESI, Gratuity, LWF</p></div>
        <div className="feature-card glass-card"><div className="feature-icon">👥</div><h3>Employee Self‑Service</h3><p>Payslips, tax declarations, leave balance</p></div>
      </div>

      <div className="benefits-list">
        <h2>Why Outsource to Us</h2>
        <ul>
          <li><i className="fas fa-check-circle"></i> 100% accuracy guarantee</li>
          <li><i className="fas fa-check-circle"></i> Timely salary disbursement</li>
          <li><i className="fas fa-check-circle"></i> Audit support & compliance updates</li>
        </ul>
      </div>

      <Link to="/contact-us" className="cta-button">Get a Quote</Link>
    </div>
  );
};

export default PayrollCompliance;