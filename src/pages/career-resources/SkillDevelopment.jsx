import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/career-resources/ResourcePage.css'

const SkillDevelopment = () => {
  const articles = [
    {
      title: 'Top 10 Skills Employers Want in 2026',
      description: 'Discover the most in-demand skills across industries',
      readTime: '8 min',
      difficulty: 'Beginner',
      author: 'David Williams',
      date: 'Mar 15, 2026'
    },
    {
      title: 'Best Free Online Courses for Tech Professionals',
      description: 'Curated list of high-quality free courses',
      readTime: '10 min',
      difficulty: 'Intermediate',
      author: 'Michael Chen',
      date: 'Mar 12, 2026'
    },
    {
      title: 'Certification Guide by Industry',
      description: 'Which certifications matter most in your field',
      readTime: '12 min',
      difficulty: 'Advanced',
      author: 'Sarah Johnson',
      date: 'Mar 10, 2026'
    },
    {
      title: 'Learning Paths for Tech Careers',
      description: 'Structured learning paths for developers, data scientists, and more',
      readTime: '9 min',
      difficulty: 'Intermediate',
      author: 'Emily Rodriguez',
      date: 'Mar 8, 2026'
    },
    {
      title: 'Balancing Work and Learning',
      description: 'Strategies to upskill while working full-time',
      readTime: '5 min',
      difficulty: 'Beginner',
      author: 'Priya Patel',
      date: 'Mar 5, 2026'
    }
  ]

  const courses = [
    { name: 'Complete Web Development Bootcamp', platform: 'Udemy', duration: '60 hours' },
    { name: 'Data Science Specialization', platform: 'Coursera', duration: '80 hours' },
    { name: 'AWS Certified Solutions Architect', platform: 'AWS Training', duration: '40 hours' },
    { name: 'Project Management Professional (PMP)', platform: 'PMI', duration: '35 hours' }
  ]

  const tips = [
    'Dedicate at least 1 hour daily to learning',
    'Practice with real-world projects',
    'Join online communities for support',
    'Take notes and review regularly',
    'Teach others to reinforce learning',
    'Build a portfolio of your work',
    'Get feedback from experienced professionals',
    'Stay consistent with your learning schedule'
  ]

  return (
    <div className="resource-page">
      <div className="resource-header" style={{ background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)' }}>
        <div className="header-content">
          <Link to="/candidate/career-guidance" className="back-button">
            <i className="fas fa-arrow-left"></i>
            Back to Career Guidance
          </Link>
          <h1>Skill Development</h1>
          <p>Free courses and certification recommendations to boost your career</p>
        </div>
      </div>

      <div className="resource-container">
        {/* Featured Guide */}
        <div className="featured-guide">
          <div className="guide-preview">
            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Skill Development" />
            <div className="guide-overlay">
              <span className="guide-badge">Featured</span>
              <h2>The Ultimate Skill Development Guide</h2>
              <p>Master any skill with proven learning techniques</p>
              <button className="guide-button" style={{ background: '#FF6B6B' }}>
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
                  <span className="article-difficulty" style={{ background: '#FF6B6B20', color: '#FF6B6B' }}>
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
                <button className="read-more-btn" style={{ color: '#FF6B6B' }}>
                  Read Article <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Courses Section */}
        <div className="templates-section">
          <h2>Recommended Courses</h2>
          <div className="templates-grid">
            {courses.map((course, index) => (
              <div key={index} className="template-card">
                <div className="template-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div className="template-info">
                  <h4>{course.name}</h4>
                  <p>{course.platform} • {course.duration}</p>
                </div>
                <button className="download-btn" style={{ background: '#FF6B6B' }}>
                  <i className="fas fa-external-link-alt"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="tips-section">
          <h2>Learning Tips</h2>
          <div className="tips-container">
            {tips.map((tip, index) => (
              <div key={index} className="tip-item">
                <i className="fas fa-check-circle" style={{ color: '#FF6B6B' }}></i>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="tools-section">
          <h2>Tools & Resources</h2>
          <div className="tools-grid">
            <div className="tool-card" style={{ background: '#FF6B6B10' }}>
              <i className="fas fa-search" style={{ color: '#FF6B6B' }}></i>
              <h4>Course Finder</h4>
              <p>Find the best courses for your goals</p>
              <button className="tool-button" style={{ color: '#FF6B6B' }}>Try Now →</button>
            </div>
            <div className="tool-card" style={{ background: '#FF8E5310' }}>
              <i className="fas fa-chart-bar" style={{ color: '#FF8E53' }}></i>
              <h4>Progress Tracker</h4>
              <p>Track your learning progress</p>
              <button className="tool-button" style={{ color: '#FF8E53' }}>Try Now →</button>
            </div>
            <div className="tool-card" style={{ background: '#11998e10' }}>
              <i className="fas fa-clock" style={{ color: '#11998e' }}></i>
              <h4>Study Planner</h4>
              <p>Create a personalized study schedule</p>
              <button className="tool-button" style={{ color: '#11998e' }}>Try Now →</button>
            </div>
            <div className="tool-card" style={{ background: '#4568DC10' }}>
              <i className="fas fa-certificate" style={{ color: '#4568DC' }}></i>
              <h4>Certification Guide</h4>
              <p>Find the right certification for you</p>
              <button className="tool-button" style={{ color: '#4568DC' }}>Try Now →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillDevelopment