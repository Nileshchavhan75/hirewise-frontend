import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../css/employer/PayrollOutsourcing.css'

const PayrollOutsourcing = () => {
  const [activeTab, setActiveTab] = useState('services')

  const services = [
    {
      title: 'Salary Processing',
      description: 'End-to-end monthly salary calculation and disbursement',
      features: ['Salary calculation', 'Bank transfers', 'Payslip generation', 'Reimbursements'],
      icon: '💰'
    },
    {
      title: 'Tax Compliance',
      description: 'Complete tax deduction and filing management',
      features: ['TDS calculation', 'Form 16 generation', 'Tax filing', 'PT compliance'],
      icon: '📊'
    },
    {
      title: 'Statutory Compliance',
      description: 'PF, ESI, Gratuity and other statutory requirements',
      features: ['PF registration & filing', 'ESI contributions', 'Gratuity management', 'Bonus calculation'],
      icon: '⚖️'
    },
    {
      title: 'Employee Self-Service',
      description: 'Portal for employees to access payslips and tax forms',
      features: ['Payslip access', 'Tax declaration', 'Leave balance', 'Investment proofs'],
      icon: '👥'
    }
  ]

  const benefits = [
    { value: '99.9%', label: 'Accuracy Rate' },
    { value: '24/7', label: 'Support' },
    { value: '500+', label: 'Happy Clients' },
    { value: '10+', label: 'Years Experience' }
  ]

  const pricingPlans = [
    {
      name: 'Starter',
      price: '₹199',
      period: 'per employee/month',
      features: ['Salary processing', 'Payslip generation', 'TDS calculation', 'Email support'],
      recommended: false
    },
    {
      name: 'Business',
      price: '₹299',
      period: 'per employee/month',
      features: ['Everything in Starter', 'PF/ESI filing', 'Tax returns', 'Priority support', 'Employee portal'],
      recommended: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'tailored pricing',
      features: ['Everything in Business', 'Dedicated manager', 'API integration', 'Audit support', 'Custom reports'],
      recommended: false
    }
  ]

  return (
    <div className="payroll-outsourcing-page">
      {/* Hero Section */}
      <section className="payroll-hero">
        <div className="hero-content">
          <h1>Payroll & Compliance <span className="gradient-text">Outsourcing</span></h1>
          <p>Simplify your payroll operations with 100% accuracy and compliance</p>
          <div className="hero-buttons">
            <Link to="/contact-us" className="btn-primary">Get Started</Link>
            <Link to="#demo" className="btn-secondary">Request Demo</Link>
          </div>
        </div>
        <div className="hero-stats">
          {benefits.map((benefit, index) => (
            <div key={index} className="stat-badge">
              <span className="stat-value">{benefit.value}</span>
              <span className="stat-label">{benefit.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <section className="payroll-tabs">
        <div className="tabs-header">
          <button 
            className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            Services
          </button>
          <button 
            className={`tab-btn ${activeTab === 'process' ? 'active' : ''}`}
            onClick={() => setActiveTab('process')}
          >
            How It Works
          </button>
          <button 
            className={`tab-btn ${activeTab === 'pricing' ? 'active' : ''}`}
            onClick={() => setActiveTab('pricing')}
          >
            Pricing
          </button>
          <button 
            className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            FAQ
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'services' && (
            <div className="services-grid">
              {services.map((service, index) => (
                <div key={index} className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}><i className="fas fa-check"></i> {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'process' && (
            <div className="process-timeline">
              <div className="process-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Data Collection</h3>
                  <p>We collect attendance, leaves, and variable pay data from your system</p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Salary Calculation</h3>
                  <p>Automated calculation of gross salary, deductions, and net pay</p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Compliance Check</h3>
                  <p>PF, ESI, PT, TDS calculations with compliance validation</p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Salary Disbursement</h3>
                  <p>Direct bank transfers and payslip generation</p>
                </div>
              </div>
              <div className="process-step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3>Reporting & Filing</h3>
                  <p>Monthly reports, annual returns, and tax filings</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="pricing-section">
              <div className="pricing-grid">
                {pricingPlans.map((plan, index) => (
                  <div key={index} className={`pricing-card ${plan.recommended ? 'recommended' : ''}`}>
                    {plan.recommended && <span className="recommended-badge">Recommended</span>}
                    <h3>{plan.name}</h3>
                    <div className="price">
                      <span className="amount">{plan.price}</span>
                      <span className="period">{plan.period}</span>
                    </div>
                    <ul className="plan-features">
                      {plan.features.map((feature, idx) => (
                        <li key={idx}><i className="fas fa-check"></i> {feature}</li>
                      ))}
                    </ul>
                    <Link to="/contact-us" className="plan-btn">Get Started</Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="faq-section">
              <div className="faq-item">
                <h4>What is included in payroll outsourcing?</h4>
                <p>We handle salary processing, tax deductions, PF/ESI compliance, payslip generation, and annual tax filings. Everything related to payroll management.</p>
              </div>
              <div className="faq-item">
                <h4>How do you ensure data security?</h4>
                <p>We use bank-level encryption and secure servers. All data is protected and never shared with third parties. We're ISO 27001 certified.</p>
              </div>
              <div className="faq-item">
                <h4>Can I integrate with my existing HRMS?</h4>
                <p>Yes, we provide API integration with major HRMS platforms. Our team will help set up seamless data transfer.</p>
              </div>
              <div className="faq-item">
                <h4>What is the typical turnaround time?</h4>
                <p>Salary processing takes 24-48 hours after receiving attendance data. Reports and payslips are generated by the 1st of every month.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="payroll-cta">
        <h2>Ready to simplify your payroll?</h2>
        <p>Join 500+ companies that trust us for payroll management</p>
        <Link to="/contact-us" className="cta-button">Schedule Free Consultation</Link>
      </section>
    </div>
  )
}

export default PayrollOutsourcing