import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/career-resources/ResourcePage.css'

const JobSearch = () => {
  const articles = [
    {
      title: 'Modern Job Search Strategies',
      description: 'How to find jobs in today\'s market',
      readTime: '9 min',
      difficulty: 'Beginner',
      author: 'Michael Chen',
      date: 'Mar 15, 2026'
    },
    {
      title: 'LinkedIn Optimization Guide',
      description: 'Make your profile stand out to recruiters',
      readTime: '7 min',
      difficulty: 'Intermediate',
      author: 'Sarah Johnson',
      date: 'Mar 12, 2026'
    },
    {
      title: 'Networking That Actually Works',
      description: 'Build meaningful professional connections',
      readTime: '8 min',
      difficulty: 'Intermediate',
      author: 'Emily Rodriguez',
      date: 'Mar 10, 2026'
    },
    {
      title: 'Follow-Up Email Templates',
      description: 'Perfect templates for every situation',
      readTime: '5 min',
      difficulty: 'Beginner',
      author: 'Priya Patel',
      date: 'Mar 8, 2026'
    },
    {
      title: 'Working with Recruiters',
      description: 'How to build effective relationships with recruiters',
      readTime: '6 min',
      difficulty: 'Advanced',
      author: 'David Williams',
      date: 'Mar 5, 2026'
    }
  ]

  const templates = [
    { name: 'Cover Letter Templates', format: 'DOCX', downloads: '6.2K' },
    { name: 'Follow-up Email Templates', format: 'DOCX', downloads: '5.8K' },
    { name: 'Thank You Note Templates', format: 'DOCX', downloads: '4.5K' },
    { name: 'Networking Message Templates', format: 'DOCX', downloads: '5.1K' }
  ]

  const tips = [
    'Customize each application for the role',
    'Follow up within 24-48 hours',
    'Build your network before you need it',
    'Keep your LinkedIn profile updated',
    'Use job alerts to stay informed',
    'Track your applications in a spreadsheet',
    'Prepare questions for interviews',
    'Send thank you notes after interviews'
  ]

  return (
    <div className="resource-page">
      <div className="resource-header" style={{ background: 'linear-gradient(135deg, #F08A5D, #F9D56E)' }}>
        <div className="header-content">
          <Link to="/candidate/career-guidance" className="back-button">
            <i className="fas fa-arrow-left"></i>
            Back to Career Guidance
          </Link>
          <h1>Job Search Strategies</h1>
          <p>Effective techniques to land your dream job faster</p>
        </div>
      </div>

      <div className="resource-container">
        {/* Featured Guide */}
        <div className="featured-guide">
          <div className="guide-preview">
            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Job Search" />
            <div className="guide-overlay">
              <span className="guide-badge">Featured</span>
              <h2>The Complete Job Search Guide</h2>
              <p>Everything you need to land your dream job</p>
              <button className="guide-button" style={{ background: '#F08A5D' }}>
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
                  <span className="article-difficulty" style={{ background: '#F08A5D20', color: '#F08A5D' }}>
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
                <button className="read-more-btn" style={{ color: '#F08A5D' }}>
                  Read Article <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Templates Section */}
        <div className="templates-section">
          <h2>Job Search Templates</h2>
          <div className="templates-grid">
            {templates.map((template, index) => (
              <div key={index} className="template-card">
                <div className="template-icon">
                  <i className="fas fa-file-alt"></i>
                </div>
                <div className="template-info">
                  <h4>{template.name}</h4>
                  <p>{template.format} • {template.downloads} downloads</p>
                </div>
                <button className="download-btn" style={{ background: '#F08A5D' }}>
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
                <i className="fas fa-check-circle" style={{ color: '#F08A5D' }}></i>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="tools-section">
          <h2>Tools & Resources</h2>
          <div className="tools-grid">
            <div className="tool-card" style={{ background: '#F08A5D10' }}>
              <i className="fas fa-table" style={{ color: '#F08A5D' }}></i>
              <h4>Application Tracker</h4>
              <p>Track all your job applications</p>
              <button className="tool-button" style={{ color: '#F08A5D' }}>Try Now →</button>
            </div>
            <div className="tool-card" style={{ background: '#F9D56E10' }}>
              <i className="fab fa-linkedin" style={{ color: '#F9D56E' }}></i>
              <h4>LinkedIn Optimizer</h4>
              <p>Optimize your LinkedIn profile</p>
              <button className="tool-button" style={{ color: '#F9D56E' }}>Try Now →</button>
            </div>
            <div className="tool-card" style={{ background: '#11998e10' }}>
              <i className="fas fa-network-wired" style={{ color: '#11998e' }}></i>
              <h4>Network Builder</h4>
              <p>Build and manage your network</p>
              <button className="tool-button" style={{ color: '#11998e' }}>Try Now →</button>
            </div>
            <div className="tool-card" style={{ background: '#4568DC10' }}>
              <i className="fas fa-envelope" style={{ color: '#4568DC' }}></i>
              <h4>Email Templates</h4>
              <p>Templates for every situation</p>
              <button className="tool-button" style={{ color: '#4568DC' }}>Try Now →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobSearch