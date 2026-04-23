import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/candidate/InternationalJobs.css'

const InternationalJobs = () => {
  const countries = [
    {
      name: 'United States',
      flag: '🇺🇸',
      jobs: 45,
      color: '#4158D0',
      description: 'H1B visa sponsorship available for tech and healthcare professionals'
    },
    {
      name: 'United Arab Emirates',
      flag: '🇦🇪',
      jobs: 38,
      color: '#C850C0',
      description: 'Tax-free salary opportunities in Dubai and Abu Dhabi'
    },
    {
      name: 'United Kingdom',
      flag: '🇬🇧',
      jobs: 22,
      color: '#11998e',
      description: 'Tier 2 visa sponsorship for skilled workers'
    },
    {
      name: 'Singapore',
      flag: '🇸🇬',
      jobs: 19,
      color: '#FF6B6B',
      description: 'Employment Pass and S-Pass opportunities available'
    },
    {
      name: 'Canada',
      flag: '🇨🇦',
      jobs: 27,
      color: '#4568DC',
      description: 'Express entry and work permits for qualified professionals'
    },
    {
      name: 'Australia',
      flag: '🇦🇺',
      jobs: 16,
      color: '#F08A5D',
      description: 'Skilled migration programs and temporary work visas'
    }
  ]

  return (
    <div className="international-jobs-page">
      <div className="international-header">
        <h1>International Opportunities</h1>
        <p>Take your career global with our international recruitment services</p>
      </div>

      <div className="countries-grid">
        {countries.map((country, index) => (
          <div key={index} className="country-card" style={{ borderTop: `4px solid ${country.color}` }}>
            <div className="country-flag">{country.flag}</div>
            <h3>{country.name}</h3>
            <p className="country-jobs">{country.jobs} jobs available</p>
            <p className="country-desc">{country.description}</p>
            <Link to={`/jobs/international/${country.name.toLowerCase()}`} className="country-link">
              View Jobs <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        ))}
      </div>

      <div className="visa-support">
        <h2>Visa & Relocation Support</h2>
        <p>We provide end-to-end assistance for your international move</p>
        <div className="support-grid">
          <div className="support-item">
            <i className="fas fa-passport"></i>
            <h4>Visa Sponsorship</h4>
            <p>H1B, Tier 2, and other work visas assistance</p>
          </div>
          <div className="support-item">
            <i className="fas fa-plane"></i>
            <h4>Relocation Assistance</h4>
            <p>Flight, temporary accommodation, and settling support</p>
          </div>
          <div className="support-item">
            <i className="fas fa-gavel"></i>
            <h4>Legal Compliance</h4>
            <p>Work permit and local labor law guidance</p>
          </div>
          <div className="support-item">
            <i className="fas fa-home"></i>
            <h4>Housing Support</h4>
            <p>Assistance in finding accommodation in new country</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InternationalJobs