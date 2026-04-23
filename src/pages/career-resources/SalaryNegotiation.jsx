import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/career-resources/ResourcePage.css'

const SalaryNegotiation = () => {
  const articles = [
    {
      title: 'Salary Negotiation: Complete Guide',
      description: 'Master the art of negotiating your salary',
      readTime: '10 min',
      difficulty: 'Beginner',
      author: 'Priya Patel',
      date: 'Mar 15, 2026'
    },
    {
      title: 'How to Research Market Rates',
      description: 'Find out what you should be earning',
      readTime: '6 min',
      difficulty: 'Intermediate',
      author: 'David Williams',
      date: 'Mar 12, 2026'
    },
    {
      title: 'Negotiating Beyond Base Salary',
      description: 'Bonuses, equity, benefits, and more',
      readTime: '8 min',
      difficulty: 'Advanced',
      author: 'Michael Chen',
      date: 'Mar 10, 2026'
    },
    {
      title: 'Scripts for Every Situation',
      description: 'Proven scripts for phone, email, and in-person negotiations',
      readTime: '7 min',
      difficulty: 'Intermediate',
      author: 'Sarah Johnson',
      date: 'Mar 8, 2026'
    },
    {
      title: 'Handling Tough Negotiations',
      description: 'Strategies for difficult conversations',
      readTime: '9 min',
      difficulty: 'Advanced',
      author: 'Emily Rodriguez',
      date: 'Mar 5, 2026'
    }
  ]

  const scripts = [
    { name: 'Initial Offer Response Script', format: 'DOCX', downloads: '5.2K' },
    { name: 'Counter-Offer Email Template', format: 'DOCX', downloads: '4.8K' },
    { name: 'Benefits Negotiation Script', format: 'DOCX', downloads: '3.5K' },
    { name: 'Follow-up After Rejection', format: 'DOCX', downloads: '4.1K' }
  ]

  const tips = [
    'Always research market rates before negotiating',
    'Know your minimum acceptable offer',
    'Consider the total compensation package',
    'Practice your negotiation script',
    'Be professional and confident',
    'Don\'t accept the first offer',
    'Get everything in writing',
    'Know when to walk away'
  ]

  return (
    <div className="resource-page">
      <div className="resource-header" style={{ background: 'linear-gradient(135deg, #4568DC, #B06AB3)' }}>
        <div className="header-content">
          <Link to="/candidate/career-guidance" className="back-button">
            <i className="fas fa-arrow-left"></i>
            Back to Career Guidance
          </Link>
          <h1>Salary Negotiation</h1>
          <p>Get the compensation package you deserve with proven strategies</p>
        </div>
      </div>

      <div className="resource-container">
        {/* Featured Guide */}
        <div className="featured-guide">
          <div className="guide-preview">
            <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Salary Negotiation" />
            <div className="guide-overlay">
              <span className="guide-badge">Featured</span>
              <h2>The Complete Salary Negotiation Guide</h2>
              <p>Everything you need to maximize your compensation</p>
              <button className="guide-button" style={{ background: '#4568DC' }}>
                Start Reading <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Articles Section */}
        <div className="resource-articles-section">
          <h2>Latest Articles</h2>
          <div className="articles-grid">
            {articles.map((article, index) => (
              <div key={index} className="article-card">
                <div className="article-card-header">
                  <span className="article-difficulty" style={{ background: '#4568DC20', color: '#4568DC' }}>
                    {article.difficulty}
                  </span>
                  <span className="article-date">{article.date}</span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <div className="article-card-footer">
                  <span className="article-author">
                    <i className="far fa-user-circle"></i> {article.author}
                  </span>
                  <span className="article-read-time">
                    <i className="far fa-clock"></i> {article.readTime}
                  </span>
                </div>
                <button className="read-more-btn" style={{ color: '#4568DC' }}>
                  Read Article <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Scripts Section */}
        <div className="templates-section">
          <h2>Negotiation Scripts</h2>
          <div className="templates-grid">
            {scripts.map((script, index) => (
              <div key={index} className="template-card">
                <div className="template-icon">
                  <i className="fas fa-file-alt"></i>
                </div>
                <div className="template-info">
                  <h4>{script.name}</h4>
                  <p>{script.format} • {script.downloads} downloads</p>
                </div>
                <button className="download-btn" style={{ background: '#4568DC' }}>
                  <i className="fas fa-download"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="tips-section">
          <h2>Pro Tips</h2>
          <div className="tips-container">
            {tips.map((tip, index) => (
              <div key={index} className="tip-item">
                <i className="fas fa-check-circle" style={{ color: '#4568DC' }}></i>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="tools-section">
          <h2>Tools & Resources</h2>
          <div className="tools-grid">
            <div className="tool-card" style={{ background: '#4568DC10' }}>
              <i className="fas fa-calculator" style={{ color: '#4568DC' }}></i>
              <h4>Salary Calculator</h4>
              <p>Calculate your market worth</p>
              <button className="tool-button" style={{ color: '#4568DC' }}>Try Now →</button>
            </div>
            <div className="tool-card" style={{ background: '#B06AB310' }}>
              <i className="fas fa-file-invoice" style={{ color: '#B06AB3' }}></i>
              <h4>Offer Analyzer</h4>
              <p>Compare job offers side by side</p>
              <button className="tool-button" style={{ color: '#B06AB3' }}>Try Now →</button>
            </div>
            <div className="tool-card" style={{ background: '#11998e10' }}>
              <i className="fas fa-chart-pie" style={{ color: '#11998e' }}></i>
              <h4>Benefits Calculator</h4>
              <p>Calculate the value of benefits</p>
              <button className="tool-button" style={{ color: '#11998e' }}>Try Now →</button>
            </div>
            <div className="tool-card" style={{ background: '#FF6B6B10' }}>
              <i className="fas fa-file-signature" style={{ color: '#FF6B6B' }}></i>
              <h4>Script Generator</h4>
              <p>Generate custom negotiation scripts</p>
              <button className="tool-button" style={{ color: '#FF6B6B' }}>Try Now →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalaryNegotiation