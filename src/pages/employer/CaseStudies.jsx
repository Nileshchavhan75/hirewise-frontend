import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../css/employer/CaseStudies.css'

const CaseStudies = () => {
  const [activeCase, setActiveCase] = useState(1)

  const caseStudies = [
    {
      id: 1,
      company: 'TechCorp India',
      logo: 'TC',
      industry: 'Information Technology',
      challenge: 'Needed to hire 50+ software engineers in 3 months for a new project',
      solution: 'Implemented bulk hiring drive with technical assessments and interviews',
      outcome: 'Successfully placed 52 candidates within 2.5 months',
      savings: '40% reduction in hiring time',
      roi: '₹2.5 Cr estimated cost savings',
      color: '#4158D0',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      testimonial: {
        quote: "HireWise delivered beyond our expectations. The quality of candidates was exceptional.",
        author: "Rajesh Mehta",
        role: "CTO, TechCorp"
      }
    },
    {
      id: 2,
      company: 'Global Finance Ltd',
      logo: 'GF',
      industry: 'Banking & Finance',
      challenge: 'Required 20+ finance professionals including 3 senior managers',
      solution: 'Executive search combined with mid-level recruitment drive',
      outcome: 'Placed 22 candidates including 3 senior managers in 45 days',
      savings: '₹45 lakhs in recruitment costs',
      roi: '3x ROI within 6 months',
      color: '#C850C0',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      testimonial: {
        quote: "The senior management placements were perfect. They understood our culture exactly.",
        author: "Priya Singh",
        role: "HR Director"
      }
    },
    {
      id: 3,
      company: 'Gulf Construction',
      logo: 'GC',
      industry: 'Oil & Gas',
      challenge: 'Need 100+ skilled workers for UAE project with visa requirements',
      solution: 'End-to-end recruitment including visa processing and relocation',
      outcome: 'Deployed 108 workers within 2 months with full compliance',
      savings: '60% faster mobilization',
      roi: 'Project completed 3 months ahead of schedule',
      color: '#11998e',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      testimonial: {
        quote: "They handled everything from recruitment to visa processing seamlessly.",
        author: "Ahmed Al-Rashid",
        role: "Project Director"
      }
    }
  ]

  return (
    <div className="case-studies-page">
      <div className="case-header">
        <h1>Success Stories</h1>
        <p>Real results from our client partnerships</p>
      </div>

      <div className="case-studies-showcase">
        <div className="case-selector">
          {caseStudies.map(study => (
            <button
              key={study.id}
              className={`case-btn ${activeCase === study.id ? 'active' : ''}`}
              onClick={() => setActiveCase(study.id)}
              style={{ borderColor: activeCase === study.id ? study.color : 'transparent' }}
            >
              <span className="case-btn-logo" style={{ background: study.color }}>{study.logo}</span>
              <span className="case-btn-company">{study.company}</span>
            </button>
          ))}
        </div>

        {caseStudies.map(study => (
          <div key={study.id} className={`case-detail ${activeCase === study.id ? 'active' : ''}`}>
            <div className="case-detail-grid">
              <div className="case-detail-image">
                <img src={study.image} alt={study.company} />
                <div className="image-overlay" style={{ background: `linear-gradient(45deg, ${study.color}, transparent)` }}></div>
              </div>
              <div className="case-detail-content">
                <div className="company-badge" style={{ background: study.color }}>
                  {study.company}
                </div>
                <h3>{study.industry}</h3>
                
                <div className="case-metrics">
                  <div className="case-metric">
                    <i className="fas fa-exclamation-triangle"></i>
                    <div>
                      <span className="metric-label">Challenge</span>
                      <p>{study.challenge}</p>
                    </div>
                  </div>
                  <div className="case-metric">
                    <i className="fas fa-lightbulb"></i>
                    <div>
                      <span className="metric-label">Solution</span>
                      <p>{study.solution}</p>
                    </div>
                  </div>
                  <div className="case-metric">
                    <i className="fas fa-chart-line"></i>
                    <div>
                      <span className="metric-label">Outcome</span>
                      <p>{study.outcome}</p>
                    </div>
                  </div>
                </div>

                <div className="case-results-grid">
                  <div className="result-card">
                    <span className="result-value">{study.savings}</span>
                    <span className="result-label">Cost/Time Savings</span>
                  </div>
                  <div className="result-card">
                    <span className="result-value">{study.roi}</span>
                    <span className="result-label">ROI</span>
                  </div>
                </div>

                <div className="case-testimonial">
                  <i className="fas fa-quote-left" style={{ color: study.color }}></i>
                  <p>"{study.testimonial.quote}"</p>
                  <div className="testimonial-author">
                    <strong>{study.testimonial.author}</strong>
                    <span>{study.testimonial.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CaseStudies