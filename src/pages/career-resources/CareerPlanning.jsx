import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/career-resources/ResourcePage.css'

const CareerPlanning = () => {
  const articles = [
    {
      title: 'Setting SMART Career Goals',
      description: 'Learn how to set Specific, Measurable, Achievable, Relevant, and Time-bound goals',
      readTime: '7 min',
      difficulty: 'Beginner',
      author: 'Emily Rodriguez',
      date: 'Mar 15, 2026'
    },
    {
      title: 'Creating a 5-Year Career Plan',
      description: 'Step-by-step guide to mapping out your career trajectory',
      readTime: '9 min',
      difficulty: 'Intermediate',
      author: 'David Williams',
      date: 'Mar 12, 2026'
    },
    {
      title: 'Skill Gap Analysis Guide',
      description: 'Identify and bridge the gaps in your professional skills',
      readTime: '8 min',
      difficulty: 'Intermediate',
      author: 'Sarah Johnson',
      date: 'Mar 10, 2026'
    },
    {
      title: 'Industry Trends for 2026',
      description: 'Stay ahead with the latest trends in your industry',
      readTime: '11 min',
      difficulty: 'Advanced',
      author: 'Michael Chen',
      date: 'Mar 8, 2026'
    },
    {
      title: 'Finding the Right Mentor',
      description: 'How to find and build relationships with mentors',
      readTime: '6 min',
      difficulty: 'Beginner',
      author: 'Priya Patel',
      date: 'Mar 5, 2026'
    }
  ]

  const roadmaps = [
    { name: 'Software Engineer Career Path', type: 'PDF', downloads: '3.2K' },
    { name: 'Project Manager Roadmap', type: 'PDF', downloads: '2.8K' },
    { name: 'Data Scientist Growth Path', type: 'PDF', downloads: '2.5K' },
    { name: 'Marketing Professional Guide', type: 'PDF', downloads: '2.1K' }
  ]

  const tips = [
    'Review and adjust your goals quarterly',
    'Network with professionals in your target roles',
    'Document your achievements regularly',
    'Seek feedback from managers and peers',
    'Stay updated with industry certifications',
    'Build a personal brand on LinkedIn',
    'Attend industry conferences and webinars',
    'Create a skills development timeline'
  ]

  return (
    <div className="resource-page">
      <div className="resource-header" style={{ background: 'linear-gradient(135deg, #11998e, #38ef7d)' }}>
        <div className="header-content">
          <Link to="/candidate/career-guidance" className="back-button">
            <i className="fas fa-arrow-left"></i>
            Back to Career Guidance
          </Link>
          <h1>Career Planning</h1>
          <p>Strategic guidance for long-term career success and growth</p>
        </div>
      </div>

      <div className="resource-container">
        {/* Featured Guide */}
        <div className="featured-guide">
          <div className="guide-preview">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Career Planning" />
            <div className="guide-overlay">
              <span className="guide-badge">Featured</span>
              <h2>The Complete Career Planning Masterclass</h2>
              <p>Everything you need to create a roadmap to your dream career</p>
              <button className="guide-button" style={{ background: '#11998e' }}>
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
                  <span className="article-difficulty" style={{ background: '#11998e20', color: '#11998e' }}>
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
                <button className="read-more-btn" style={{ color: '#11998e' }}>
                  Read Article <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmaps Section */}
        <div className="templates-section">
          <h2>Career Roadmaps</h2>
          <div className="templates-grid">
            {roadmaps.map((roadmap, index) => (
              <div key={index} className="template-card">
                <div className="template-icon">
                  <i className="fas fa-road"></i>
                </div>
                <div className="template-info">
                  <h4>{roadmap.name}</h4>
                  <p>{roadmap.type} • {roadmap.downloads} downloads</p>
                </div>
                <button className="download-btn" style={{ background: '#11998e' }}>
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
                <i className="fas fa-check-circle" style={{ color: '#11998e' }}></i>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="tools-section">
          <h2>Tools & Resources</h2>
          <div className="tools-grid">
            <div className="tool-card" style={{ background: '#11998e10' }}>
              <i className="fas fa-chart-line" style={{ color: '#11998e' }}></i>
              <h4>Goal Tracker</h4>
              <p>Track and monitor your career goals</p>
              <button className="tool-button" style={{ color: '#11998e' }}>Try Now →</button>
            </div>
            <div className="tool-card" style={{ background: '#38ef7d10' }}>
              <i className="fas fa-tasks" style={{ color: '#38ef7d' }}></i>
              <h4>Skill Assessment</h4>
              <p>Evaluate your current skill level</p>
              <button className="tool-button" style={{ color: '#38ef7d' }}>Try Now →</button>
            </div>
            <div className="tool-card" style={{ background: '#FF6B6B10' }}>
              <i className="fas fa-calendar-alt" style={{ color: '#FF6B6B' }}></i>
              <h4>Milestone Planner</h4>
              <p>Plan your career milestones</p>
              <button className="tool-button" style={{ color: '#FF6B6B' }}>Try Now →</button>
            </div>
            <div className="tool-card" style={{ background: '#F08A5D10' }}>
              <i className="fas fa-users" style={{ color: '#F08A5D' }}></i>
              <h4>Mentor Match</h4>
              <p>Find the perfect mentor</p>
              <button className="tool-button" style={{ color: '#F08A5D' }}>Try Now →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareerPlanning