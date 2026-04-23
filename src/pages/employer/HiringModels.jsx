import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../css/employer/HiringModels.css'

const HiringModels = () => {
  const [activeModel, setActiveModel] = useState(null)

  const models = [
    {
      id: 1,
      title: 'Permanent Hiring',
      icon: '👔',
      description: 'Build your core team with full-time employees',
      longDescription: 'Ideal for long-term positions where you need committed professionals who become part of your organization culture.',
      features: [
        'Executive Search & Leadership Hiring',
        'Mid to Senior Level Recruitment',
        'Technical & Non-Technical Roles',
        'Succession Planning'
      ],
      benefits: [
        '90-day replacement guarantee',
        'Cultural fit assessment',
        'Background verification',
        'Onboarding support'
      ],
      timeline: '21-30 days',
      successRate: '95%',
      industries: ['IT', 'Finance', 'Healthcare', 'Manufacturing'],
      color: '#4158D0',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Contract Staffing',
      icon: '📅',
      description: 'Flexible workforce for project-based requirements',
      longDescription: 'Perfect for short-term projects, seasonal demands, or specialized skills needed for a fixed duration.',
      features: [
        'Short-term Projects (3-6 months)',
        'Long-term Contracts (6-24 months)',
        'Temp-to-Perm Options',
        'Project-based Staffing'
      ],
      benefits: [
        '48-hour turnaround',
        'No long-term commitment',
        'Payroll management included',
        'Easy scaling up/down'
      ],
      timeline: '48 hours',
      successRate: '92%',
      industries: ['IT', 'Construction', 'Events', 'Retail'],
      color: '#C850C0',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Bulk Hiring',
      icon: '📊',
      description: 'Volume recruitment for rapid team expansion',
      longDescription: 'Designed for companies scaling quickly, requiring large numbers of qualified candidates in a short time.',
      features: [
        'Volume Recruitment (50-500+ hires)',
        'Walk-in Drive Organization',
        'Campus Hiring Campaigns',
        'Mass Recruitment Events'
      ],
      benefits: [
        '7-day turnaround for initial batch',
        'Reduced cost per hire',
        'Streamlined screening',
        'Dedicated recruitment team'
      ],
      timeline: '7-14 days',
      successRate: '90%',
      industries: ['BPO', 'Retail', 'Manufacturing', 'Tech'],
      color: '#11998e',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'Executive Search',
      icon: '🎯',
      description: 'Find transformative leaders for your organization',
      longDescription: 'Specialized search for C-level executives, board members, and senior leadership positions.',
      features: [
        'C-level Executives (CEO, CFO, CTO)',
        'Board Members',
        'Vice Presidents & Directors',
        'CXO Positions'
      ],
      benefits: [
        'Global talent reach',
        'Confidential search process',
        'Rigorous assessment',
        'Succession planning'
      ],
      timeline: '45-60 days',
      successRate: '94%',
      industries: ['All Industries'],
      color: '#FF6B6B',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      title: 'Payroll Outsourcing',
      icon: '💰',
      description: 'Complete payroll management and compliance',
      longDescription: 'End-to-end payroll processing, tax compliance, and statutory filings for your workforce.',
      features: [
        'Salary Processing',
        'Tax Deductions (PF, ESI, PT)',
        'Payslip Generation',
        'Annual Tax Filings'
      ],
      benefits: [
        '100% accuracy guarantee',
        'Timely disbursement',
        'Compliance updates',
        'Audit support'
      ],
      timeline: 'Ongoing',
      successRate: '99%',
      industries: ['All Industries'],
      color: '#4568DC',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      title: 'International Hiring',
      icon: '🌍',
      description: 'Access global talent with visa support',
      longDescription: 'Hire talent from around the world with complete visa and relocation assistance.',
      features: [
        'US Placements (H1B Visa)',
        'UAE Placements (Tax-free)',
        'Skilled Workforce Deployment',
        'Relocation Support'
      ],
      benefits: [
        'Visa sponsorship',
        'Relocation assistance',
        'Local compliance',
        'Cultural orientation'
      ],
      timeline: '45-60 days',
      successRate: '89%',
      industries: ['IT', 'Healthcare', 'Construction', 'Oil & Gas'],
      color: '#F08A5D',
      image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ]

  return (
    <div className="hiring-models-page">
      <div className="models-header">
        <h1>Hiring Models</h1>
        <p>Flexible solutions tailored to your business needs</p>
      </div>

      <div className="models-grid-detailed">
        {models.map(model => (
          <div 
            key={model.id} 
            className={`model-detailed-card ${activeModel === model.id ? 'expanded' : ''}`}
            onClick={() => setActiveModel(activeModel === model.id ? null : model.id)}
          >
            <div className="model-preview">
              <div className="model-icon-large" style={{ background: model.color }}>
                {model.icon}
              </div>
              <div className="model-info">
                <h3>{model.title}</h3>
                <p>{model.description}</p>
              </div>
              <div className="model-expand-icon">
                <i className={`fas fa-chevron-${activeModel === model.id ? 'up' : 'down'}`}></i>
              </div>
            </div>

            {activeModel === model.id && (
              <div className="model-details">
                <div className="details-grid">
                  <div className="details-left">
                    <img src={model.image} alt={model.title} className="model-detail-image" />
                    <div className="model-metrics">
                      <div className="metric-badge">
                        <span className="metric-label">Timeline</span>
                        <span className="metric-value">{model.timeline}</span>
                      </div>
                      <div className="metric-badge">
                        <span className="metric-label">Success Rate</span>
                        <span className="metric-value">{model.successRate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="details-right">
                    <p className="model-long-description">{model.longDescription}</p>
                    
                    <div className="detail-section">
                      <h4>Key Features</h4>
                      <ul className="feature-list">
                        {model.features.map((feature, idx) => (
                          <li key={idx}><i className="fas fa-check-circle" style={{ color: model.color }}></i> {feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="detail-section">
                      <h4>Benefits</h4>
                      <ul className="benefit-list">
                        {model.benefits.map((benefit, idx) => (
                          <li key={idx}><i className="fas fa-star" style={{ color: model.color }}></i> {benefit}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="detail-section">
                      <h4>Industries</h4>
                      <div className="industry-tags">
                        {model.industries.map((industry, idx) => (
                          <span key={idx} className="industry-tag" style={{ background: `${model.color}15`, color: model.color }}>
                            {industry}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="detail-actions">
                      <Link to="/employer/submit-requirement" className="detail-action-btn" style={{ background: model.color }}>
                        Post Requirement
                        <i className="fas fa-arrow-right"></i>
                      </Link>
                      <Link to="/contact-us" className="detail-action-btn outline">
                        Talk to Expert
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HiringModels