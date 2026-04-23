import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/career-resources/ResourcePage.css'

const ResumeGuide = () => {
  const articles = [
    {
      title: 'The Ultimate ATS-Friendly Resume Guide',
      description: 'Learn how to optimize your resume for applicant tracking systems',
      readTime: '8 min',
      difficulty: 'Beginner',
      author: 'Sarah Johnson',
      date: 'Mar 15, 2026'
    },
    {
      title: '10 Resume Mistakes That Cost You Interviews',
      description: 'Common pitfalls and how to avoid them',
      readTime: '6 min',
      difficulty: 'Intermediate',
      author: 'Michael Chen',
      date: 'Mar 12, 2026'
    },
    {
      title: 'Industry-Specific Resume Templates',
      description: 'Tailored templates for tech, finance, healthcare and more',
      readTime: '10 min',
      difficulty: 'Advanced',
      author: 'Priya Patel',
      date: 'Mar 10, 2026'
    },
    {
      title: 'Keywords That Get You Hired',
      description: 'Strategic keyword placement for maximum impact',
      readTime: '5 min',
      difficulty: 'Intermediate',
      author: 'David Williams',
      date: 'Mar 8, 2026'
    },
    {
      title: 'Formatting Tips That Work in 2026',
      description: 'Modern resume formatting trends and best practices',
      readTime: '7 min',
      difficulty: 'Beginner',
      author: 'Emily Rodriguez',
      date: 'Mar 5, 2026'
    }
  ]

  const templates = [
    { name: 'Software Engineer Resume', format: 'DOCX, PDF', downloads: '2.5K' },
    { name: 'Project Manager Resume', format: 'DOCX, PDF', downloads: '1.8K' },
    { name: 'Marketing Professional Resume', format: 'DOCX, PDF', downloads: '2.1K' },
    { name: 'Entry Level Resume', format: 'DOCX, PDF', downloads: '3.2K' },
    { name: 'Executive Resume', format: 'DOCX, PDF', downloads: '1.5K' }
  ]

  const tips = [
    'Use action verbs to describe achievements',
    'Quantify accomplishments with numbers',
    'Customize resume for each application',
    'Keep it to 1-2 pages maximum',
    'Include relevant keywords from job description',
    'Use a clean, professional format',
    'Proofread multiple times',
    'Include a strong summary statement'
  ]

  return (
    <div className="resource-page">
      <div className="resource-header" style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}>
        <div className="header-content">
          <Link to="/candidate/career-guidance" className="back-button">
            <i className="fas fa-arrow-left"></i>
            Back to Career Guidance
          </Link>
          <h1>Resume Writing Guide</h1>
          <p>Master the art of creating compelling resumes that get you noticed</p>
        </div>
      </div>

      <div className="resource-container">
        {/* Featured Guide */}
        <div className="featured-guide">
          <div className="guide-preview">
            <img src="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Resume Guide" />
            <div className="guide-overlay">
              <span className="guide-badge">Featured</span>
              <h2>The Complete Resume Writing Masterclass</h2>
              <p>Everything you need to create a standout resume that gets interviews</p>
              <button className="guide-button" style={{ background: '#4158D0' }}>
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
                  <span className="article-difficulty" style={{ background: '#4158D020', color: '#4158D0' }}>
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
                <button className="read-more-btn" style={{ color: '#4158D0' }}>
                  Read Article <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Templates Section */}
        <div className="templates-section">
          <h2>Resume Templates</h2>
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
                <button className="download-btn" style={{ background: '#4158D0' }}>
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
                <i className="fas fa-check-circle" style={{ color: '#4158D0' }}></i>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="tools-section">
          <h2>Tools & Resources</h2>
          <div className="tools-grid">
            <div className="tool-card" style={{ background: '#4158D010' }}>
              <i className="fas fa-search" style={{ color: '#4158D0' }}></i>
              <h4>Resume Scanner</h4>
              <p>Check your resume against ATS requirements</p>
              <button className="tool-button" style={{ color: '#4158D0' }}>Try Now →</button>
            </div>
            <div className="tool-card" style={{ background: '#C850C010' }}>
              <i className="fas fa-magic" style={{ color: '#C850C0' }}></i>
              <h4>Keyword Optimizer</h4>
              <p>Optimize your resume with industry keywords</p>
              <button className="tool-button" style={{ color: '#C850C0' }}>Try Now →</button>
            </div>
            <div className="tool-card" style={{ background: '#11998e10' }}>
              <i className="fas fa-eye" style={{ color: '#11998e' }}></i>
              <h4>Format Checker</h4>
              <p>Ensure your resume format is perfect</p>
              <button className="tool-button" style={{ color: '#11998e' }}>Try Now →</button>
            </div>
            <div className="tool-card" style={{ background: '#FF6B6B10' }}>
              <i className="fas fa-file-pdf" style={{ color: '#FF6B6B' }}></i>
              <h4>PDF Converter</h4>
              <p>Convert your resume to PDF instantly</p>
              <button className="tool-button" style={{ color: '#FF6B6B' }}>Try Now →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeGuide