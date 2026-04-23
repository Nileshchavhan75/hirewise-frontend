import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/career-resources/ResourcePage.css'

const InterviewPrep = () => {
  const categories = [
    {
      title: 'Technical Interviews',
      icon: '💻',
      description: 'Prepare for coding interviews and technical assessments',
      color: '#C850C0',
      articles: 8
    },
    {
      title: 'Behavioral Interviews',
      icon: '👥',
      description: 'Master STAR method and common behavioral questions',
      color: '#11998e',
      articles: 6
    },
    {
      title: 'HR Interviews',
      icon: '🤝',
      description: 'Navigate HR discussions and salary negotiations',
      color: '#FF6B6B',
      articles: 4
    }
  ]

  return (
    <div className="resource-page">
      <div className="resource-header" style={{ background: 'linear-gradient(135deg, #C850C0, #FF6B6B)' }}>
        <div className="header-content">
          <Link to="/candidate/career-guidance" className="back-button">
            <i className="fas fa-arrow-left"></i>
            Back to Career Guidance
          </Link>
          <h1>Interview Preparation</h1>
          <p>Ace your next interview with our comprehensive preparation guides</p>
        </div>
      </div>

      <div className="resource-content">
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card" style={{ borderTop: `4px solid ${category.color}` }}>
              <div className="category-icon" style={{ background: `${category.color}15`, color: category.color }}>
                {category.icon}
              </div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <span className="article-count">{category.articles} articles</span>
              <Link to={`/candidate/career-guidance/interview-prep/${category.title.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="category-link"
                    style={{ color: category.color }}>
                Explore <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InterviewPrep