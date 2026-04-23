import React from 'react';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
  // Based on your uploaded document - Section 3 Services
  const serviceCategories = [
    {
      title: 'Hiring Solutions',
      icon: '🎯',
      color: '#00d4ff',
      services: [
        {
          name: 'Permanent Hiring',
          path: '/services/permanent-hiring',
          icon: '👔',
          description: 'Mid to Senior Level Recruitment & Executive Search',
          features: ['Mid to Senior Level', 'Executive Search', 'Leadership Hiring'],
          gradient: 'linear-gradient(135deg, #00d4ff, #0099cc)'
        },
        {
          name: 'Contractual Hiring',
          path: '/services/contractual-hiring',
          icon: '📅',
          description: 'Short-term Projects & Long-term Contracts',
          features: ['Project-based', 'Temporary Staffing', 'Flexible Workforce'],
          gradient: 'linear-gradient(135deg, #ff66b5, #cc3399)'
        },
        {
          name: 'Intern Hiring',
          path: '/services/intern-hiring',
          icon: '🎓',
          description: 'College/University Tie-ups & Internship Programs',
          features: ['Campus Recruitment', 'Internship Management', 'Graduate Training'],
          gradient: 'linear-gradient(135deg, #00d68f, #009966)'
        },
        {
          name: 'Bulk/Lateral Hiring',
          path: '/services/bulk-hiring',
          icon: '📊',
          description: 'Volume-based Recruitment & Walk-in Drives',
          features: ['Volume Recruitment', 'Walk-in Drives', 'Campus Hiring'],
          gradient: 'linear-gradient(135deg, #ffb547, #cc8800)'
        }
      ]
    },
    {
      title: 'Sector-Specific Hiring',
      icon: '💼',
      color: '#ff66b5',
      services: [
        {
          name: 'IT Hiring',
          path: '/services/it-hiring',
          icon: '💻',
          description: 'Software, Cloud, AI/ML, Cybersecurity Experts',
          features: ['Software Developers', 'Cloud Architects', 'AI/ML Experts', 'Cybersecurity'],
          gradient: 'linear-gradient(135deg, #667eea, #764ba2)'
        },
        {
          name: 'Non-IT Hiring',
          path: '/services/non-it-hiring',
          icon: '📋',
          description: 'Sales, Marketing, HR, Finance, Operations',
          features: ['Sales & Marketing', 'HR & Admin', 'Finance & Accounts', 'Operations'],
          gradient: 'linear-gradient(135deg, #f093fb, #f5576c)'
        },
        {
          name: 'Manufacturing',
          path: '/services/manufacturing',
          icon: '🏭',
          description: 'Plant Operations, Supply Chain, Logistics',
          features: ['Plant Operations', 'Supply Chain', 'Quality Control', 'Logistics'],
          gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)'
        },
        {
          name: 'Pharma & Healthcare',
          path: '/services/pharma-healthcare',  // Fixed: matches servicesData.js
          icon: '💊',
          description: 'R&D, Clinical Research, Regulatory Affairs',
          features: ['R&D', 'Clinical Research', 'Regulatory Affairs', 'Medical Affairs'],
          gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)'
        }
      ]
    },
    {
      title: 'International Recruitment',
      icon: '🌍',
      color: '#00d68f',
      services: [
        {
          name: 'US Placements',
          path: '/services/international-recruitment', // Merged into international
          icon: '🇺🇸',
          description: 'H1B Visa Sponsorship, IT & Non-IT Roles',
          features: ['H1B Visa', 'Green Card', 'Permanent Positions', 'Contract Roles'],
          gradient: 'linear-gradient(135deg, #3f51b5, #2196f3)'
        },
        {
          name: 'UAE Placements',
          path: '/services/international-recruitment',
          icon: '🇦🇪',
          description: 'Dubai, Abu Dhabi, Tax-Free Salary',
          features: ['Tax-Free', 'Accommodation', 'Visa Sponsorship', 'Family Benefits'],
          gradient: 'linear-gradient(135deg, #ff5722, #ff9800)'
        },
        {
          name: 'Skilled Workforce',
          path: '/services/international-recruitment',
          icon: '👷',
          description: 'Engineering, Construction, Healthcare, Hospitality',
          features: ['Engineering', 'Construction', 'Healthcare', 'Hospitality'],
          gradient: 'linear-gradient(135deg, #9c27b0, #673ab7)'
        }
      ]
    },
    {
      title: 'Payroll & Compliance',
      icon: '⚖️',
      color: '#ffb547',
      services: [
        {
          name: 'Payroll Management',
          path: '/services/payroll-compliance',
          icon: '💰',
          description: 'End-to-end payroll processing and management',
          features: ['Salary Processing', 'Tax Deductions', 'Payslip Generation', 'Annual Filings'],
          gradient: 'linear-gradient(135deg, #00c853, #64dd17)'
        },
        {
          name: 'Compliance Management',
          path: '/services/payroll-compliance',
          icon: '📋',
          description: 'PF, ESI, PT, Gratuity, Statutory Filings',
          features: ['PF & ESI', 'PT & Gratuity', 'Statutory Filings', 'Audit Support'],
          gradient: 'linear-gradient(135deg, #ffb74d, #ff9800)'
        }
      ]
    }
  ];

  return (
    <section className="services-showcase">
      <div className="services-showcase-container">
        {/* Header */}
        <div className="services-showcase-header">
          <span className="section-subtitle">WHAT WE OFFER</span>
          <h2 className="section-title">
            Comprehensive <span className="gradient-text">Hiring Solutions</span>
          </h2>
          <p className="section-description">
            Tailored recruitment strategies for every business need, from startups to enterprises
          </p>
        </div>

        {/* Service Categories */}
        {serviceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="service-category-block">
            <div className="category-header">
              <div className="category-icon" style={{ background: `${category.color}20`, color: category.color }}>
                {category.icon}
              </div>
              <h3>{category.title}</h3>
            </div>

            <div className="category-services-grid">
              {category.services.map((service, serviceIndex) => (
                <Link 
                  to={service.path} 
                  key={serviceIndex} 
                  className="flip-card"
                >
                  <div className="flip-card-inner">
                    {/* Front */}
                    <div className="flip-card-front">
                      <div className="service-icon-large" style={{ background: `${service.gradient}` }}>
                        <span>{service.icon}</span>
                      </div>
                      <h4>{service.name}</h4>
                      <p>{service.description}</p>
                      <div className="service-tags">
                        {service.features.slice(0, 2).map((feature, idx) => (
                          <span key={idx}>{feature}</span>
                        ))}
                      </div>
                    </div>

                    {/* Back */}
                    <div className="flip-card-back" style={{ background: service.gradient }}>
                      <div className="back-content">
                        <h4>Key Features</h4>
                        <ul>
                          {service.features.map((feature, idx) => (
                            <li key={idx}>
                              <i className="fas fa-check-circle"></i>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <span className="explore-btn">
                          Explore Service
                          <i className="fas fa-arrow-right"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* View All Services Button - FIXED: removed broken link */}
        <div className="view-all-services">
          <Link to="/services" className="view-all-btn">
            View All Services
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;