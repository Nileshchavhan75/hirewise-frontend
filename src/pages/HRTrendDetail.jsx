import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { hrTrends } from '../data/hrTrends';
import '../css/HRTrendDetail.css';

const HRTrendDetail = () => {
  const { id } = useParams();
  const trend = hrTrends.find(t => t.id === parseInt(id));
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!trend) {
    return (
      <div className="not-found">
        <h2>Trend not found</h2>
        <Link to="/hr-trends" className="back-link">← Back to HR Trends</Link>
      </div>
    );
  }

  const relatedTrends = hrTrends.filter(t => t.id !== trend.id).slice(0, 2);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && !subscribed) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="trend-detail-page">
      <section className="trend-hero" style={{ backgroundImage: `url(${trend.image})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <Link to="/resources?category=hr-trends" className="back-to-trends">
            <i className="fas fa-arrow-left"></i> Back to HR Trends
          </Link>
          <h1>{trend.title}</h1>
          <div className="trend-meta">
            <span><i className="far fa-calendar-alt"></i> {trend.date}</span>
            <span><i className="far fa-clock"></i> {trend.readTime}</span>
          </div>
          <div className="trend-tags">
            {trend.tags.map(tag => (
              <span key={tag} className="tag" style={{ background: `${trend.color}20`, color: trend.color }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="trend-content-section">
        <div className="container">
          <div className="trend-grid">
            <article className="trend-main">
              <div className="trend-body" dangerouslySetInnerHTML={{ __html: trend.content }} />

              <div className="author-card" style={{ borderLeftColor: trend.color }}>
                <img src={trend.authorImage} alt={trend.author} className="author-image" />
                <div className="author-info">
                  <h4>{trend.author}</h4>
                  <p className="author-role">{trend.authorRole}</p>
                  <p className="author-bio">
                    {trend.author} specializes in workforce analytics and future-of-work trends.
                  </p>
                  <div className="author-social">
                    <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                  </div>
                </div>
              </div>

              <div className="trend-engagement">
                <div className="trend-stats">
                  <span><i className="far fa-heart"></i> {trend.likes} likes</span>
                  <span><i className="far fa-comment"></i> {trend.comments} comments</span>
                </div>
                <div className="trend-share">
                  <span>Share:</span>
                  <a href="#" className="share-icon" style={{ background: '#3b5998' }}><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="share-icon" style={{ background: '#1da1f2' }}><i className="fab fa-twitter"></i></a>
                  <a href="#" className="share-icon" style={{ background: '#0077b5' }}><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </article>

            <aside className="trend-sidebar">
              {relatedTrends.length > 0 && (
                <div className="sidebar-widget related-widget" style={{ borderTopColor: trend.color }}>
                  <h3>Related Trends</h3>
                  {relatedTrends.map(rel => (
                    <Link to={`/hr-trends/${rel.id}`} key={rel.id} className="related-item">
                      <img src={rel.image} alt={rel.title} />
                      <div>
                        <h4>{rel.title}</h4>
                        <span className="related-date">{rel.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <div className="sidebar-widget newsletter-widget" style={{ background: `${trend.color}08` }}>
                <h3>Get the latest trends</h3>
                <p>Subscribe to our newsletter and never miss an update.</p>
                <form onSubmit={handleSubscribe} className="sidebar-newsletter">
                  <div className="input-group">
                    <input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={subscribed}
                    />
                    <button type="submit" style={{ background: trend.color }} disabled={subscribed}>
                      {subscribed ? 'Subscribed!' : 'Subscribe'}
                    </button>
                  </div>
                </form>
                {subscribed && (
                  <div className="success-message">
                    <i className="fas fa-check-circle"></i> Thank you for subscribing!
                  </div>
                )}
                <p className="privacy-note">We respect your privacy. Unsubscribe anytime.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HRTrendDetail;