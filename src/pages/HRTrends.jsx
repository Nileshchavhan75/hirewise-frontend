import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hrTrends } from '../data/hrTrends';
import '../css/HRTrends.css';

const HRTrends = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="hr-trends-page">
      <section className="trends-hero">
        <div className="trends-hero-content">
          <h1>HR <span className="gradient-text">Trends</span></h1>
          <p>Curated content to help you make better hiring decisions</p>
        </div>
      </section>

      <section className="trends-grid-section">
        <div className="container">
          <div className="trends-grid">
            {hrTrends.map(trend => (
              <Link to={`/hr-trends/${trend.id}`} key={trend.id} className="trend-card">
                <div className="trend-image">
                  <img src={trend.image} alt={trend.title} />
                  <div className="trend-category" style={{ background: trend.color }}>
                    HR Trend
                  </div>
                </div>
                <div className="trend-content">
                  <div className="trend-meta">
                    <span><i className="far fa-clock"></i> {trend.readTime}</span>
                    <span><i className="far fa-calendar"></i> {trend.date}</span>
                  </div>
                  <h3>{trend.title}</h3>
                  <p className="trend-excerpt">{trend.excerpt}</p>
                  <div className="trend-footer">
                    <div className="trend-author">
                      <img src={trend.authorImage} alt={trend.author} />
                      <span>{trend.author}</span>
                    </div>
                    <span className="trend-stats">
                      <i className="far fa-heart"></i> {trend.likes}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HRTrends;