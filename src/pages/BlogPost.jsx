import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import '../css/BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id));
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!post) {
    return (
      <div className="not-found">
        <h2>Article not found</h2>
        <Link to="/resources" className="back-link">← Back to Resources</Link>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && !subscribed) {
      // Simulate subscription
      setSubscribed(true);
      setEmail('');
      // Optionally reset after a few seconds
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="blog-post-page">
      {/* Hero Section */}
      <section className="post-hero" style={{ backgroundImage: `url(${post.image})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          
<Link to="/resources?category=blog" className="back-to-resources">
  <i className="fas fa-arrow-left"></i> Back to Blog & Insights
</Link>
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span className="post-date"><i className="far fa-calendar-alt"></i> {post.date}</span>
            <span className="post-read-time"><i className="far fa-clock"></i> {post.readTime}</span>
          </div>
          <div className="post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag" style={{ background: `${post.color}20`, color: post.color }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="post-content-section">
        <div className="container">
          <div className="post-grid">
            {/* Main Content */}
            <article className="post-main">
              <div 
                className="post-body"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Author Card */}
              <div className="author-card" style={{ borderLeftColor: post.color }}>
                <img src={post.authorImage} alt={post.author} className="author-image" />
                <div className="author-info">
                  <h4>{post.author}</h4>
                  <p className="author-role">{post.authorRole}</p>
                  <p className="author-bio">
                    {post.author} has over 15 years of experience in HR and talent management, 
                    helping companies build high‑performing teams.
                  </p>
                  <div className="author-social">
                    <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                  </div>
                </div>
              </div>

              {/* Share & Engagement */}
              <div className="post-engagement">
                <div className="post-stats">
                  <span><i className="far fa-heart"></i> {post.likes} likes</span>
                  <span><i className="far fa-comment"></i> {post.comments} comments</span>
                </div>
                <div className="post-share">
                  <span>Share:</span>
                  <a href="#" className="share-icon" style={{ background: '#3b5998' }}><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="share-icon" style={{ background: '#1da1f2' }}><i className="fab fa-twitter"></i></a>
                  <a href="#" className="share-icon" style={{ background: '#0077b5' }}><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="post-sidebar">
              {/* Table of Contents */}
              <div className="sidebar-widget toc-widget" style={{ borderTopColor: post.color }}>
                <h3>In this article</h3>
                <ul>
                  <li><a href="#">The Rise of AI in Recruitment</a></li>
                  <li><a href="#">Key Benefits</a></li>
                  <li><a href="#">Maintaining the Human Element</a></li>
                </ul>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="sidebar-widget related-widget" style={{ borderTopColor: post.color }}>
                  <h3>Related Articles</h3>
                  {relatedPosts.map(rel => (
                    <Link to={`/resources/blog/${rel.id}`} key={rel.id} className="related-item">
                      <img src={rel.image} alt={rel.title} />
                      <div>
                        <h4>{rel.title}</h4>
                        <span className="related-date">{rel.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Newsletter Widget - Enhanced */}
              <div className="sidebar-widget newsletter-widget" style={{ background: `${post.color}08` }}>
                <h3>Get the latest insights</h3>
                <p>Subscribe to our newsletter and never miss an article.</p>
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
                    <button type="submit" style={{ background: post.color }} disabled={subscribed}>
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

export default BlogPost;