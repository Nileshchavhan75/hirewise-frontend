import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import '../css/Resources.css';
import { faqs } from '../data/faqs';

const Resources = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showComingSoon, setShowComingSoon] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Load Lottie script once (preferably move to index.html later)
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Read query parameter to set active category (e.g., from "Back to Blog" links)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category && categories.some((c) => c.id === category)) {
      setActiveCategory(category);
    }
  }, [location]);

  const categories = [
    { id: 'all', name: 'All Resources', icon: '📚', count: 42, color: '#4158D0' },
    { id: 'blog', name: 'Blog & Insights', icon: '✍️', count: 18, color: '#FF6B4A' },
    { id: 'hr-trends', name: 'HR Trends', icon: '📈', count: 12, color: '#2A9D8F' },
    { id: 'faq', name: 'FAQs', icon: '❓', count: 8, color: '#9C89B8' },
    { id: 'compliance', name: 'Compliance', icon: '⚖️', count: 4, color: '#4A90E2' },
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Recruitment: AI and Human Touch',
      excerpt: 'How artificial intelligence is transforming talent acquisition while maintaining the human element.',
      author: 'Sarah Johnson',
      authorRole: 'HR Strategist',
      authorImage: 'https://i.pravatar.cc/150?img=32',
      date: 'Mar 15, 2026',
      readTime: '6 min read',
      category: 'blog',
      tags: ['AI in HR', 'Recruitment Tech', 'Future of Work'],
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: '#FF6B4A',
      likes: 234,
      comments: 45,
    },
    {
      id: 2,
      title: '10 Employee Retention Strategies That Actually Work',
      excerpt: 'Proven methods to keep your top talent engaged and committed to your organization.',
      author: 'Michael Chen',
      authorRole: 'Talent Management',
      authorImage: 'https://i.pravatar.cc/150?img=12',
      date: 'Mar 12, 2026',
      readTime: '8 min read',
      category: 'blog',
      tags: ['Retention', 'Employee Engagement', 'HR Strategy'],
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: '#2A9D8F',
      likes: 189,
      comments: 32,
    },
    {
      id: 3,
      title: 'Building a Strong Employer Brand in 2026',
      excerpt: 'Strategies to attract top talent by showcasing your company culture and values.',
      author: 'Priya Patel',
      authorRole: 'Brand Strategist',
      authorImage: 'https://i.pravatar.cc/150?img=45',
      date: 'Mar 10, 2026',
      readTime: '5 min read',
      category: 'blog',
      tags: ['Employer Branding', 'Talent Attraction', 'Culture'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: '#E76F51',
      likes: 156,
      comments: 28,
    },
  ];

  const hrTrends = [
    {
      id: 4,
      title: 'Remote Work Revolution: Statistics and Insights',
      excerpt: 'Latest data on remote work adoption and its impact on productivity.',
      author: 'David Williams',
      authorRole: 'Workplace Analyst',
      authorImage: 'https://i.pravatar.cc/150?img=7',
      date: 'Mar 8, 2026',
      readTime: '7 min read',
      category: 'hr-trends',
      tags: ['Remote Work', 'Workplace Trends', 'Data'],
      image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: '#9C89B8',
      likes: 145,
      comments: 23,
    },
    {
      id: 5,
      title: 'The Rise of Skills-Based Hiring',
      excerpt: 'Why companies are moving away from degree requirements to skills-based assessments.',
      author: 'Emily Rodriguez',
      authorRole: 'Recruitment Lead',
      authorImage: 'https://i.pravatar.cc/150?img=23',
      date: 'Mar 5, 2026',
      readTime: '6 min read',
      category: 'hr-trends',
      tags: ['Skills-Based', 'Hiring Trends', 'Assessment'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      color: '#4A90E2',
      likes: 167,
      comments: 31,
    },
  ];

  const faqs = [
    {
      id: 6,
      question: 'How do I create an effective job description?',
      answer: 'Start with a clear job title, outline key responsibilities, list required qualifications, and highlight your company culture. Include salary range and benefits to attract qualified candidates.',
      category: 'faq',
      icon: '📝',
      color: '#FF6B4A',
    },
    {
      id: 7,
      question: 'What are the best practices for conducting interviews?',
      answer: 'Prepare structured questions, use behavioral-based interviewing techniques, involve multiple team members, and provide timely feedback to candidates.',
      category: 'faq',
      icon: '🎯',
      color: '#2A9D8F',
    },
    {
      id: 8,
      question: 'How can I improve employee retention?',
      answer: 'Focus on competitive compensation, career development opportunities, work-life balance, recognition programs, and fostering a positive company culture.',
      category: 'faq',
      icon: '💪',
      color: '#E76F51',
    },
    {
      id: 9,
      question: 'What is the standard recruitment process timeline?',
      answer: 'A typical recruitment process takes 30-45 days from job posting to offer acceptance. This includes sourcing, screening, interviews, and negotiations.',
      category: 'faq',
      icon: '⏱️',
      color: '#9C89B8',
    },
  ];

  const complianceUpdates = [
    {
      id: 10,
      title: 'New Labor Law Changes for 2026',
      excerpt: 'Important updates to labor laws affecting hiring practices and employee rights.',
      date: 'Mar 1, 2026',
      category: 'compliance',
      tags: ['Labor Law', 'Compliance', 'Legal'],
      color: '#4A90E2',
      link: '/resources/compliance/labor-law-2026',
    },
    {
      id: 11,
      title: 'PF and ESI Contribution Rates Updated',
      excerpt: 'Latest changes in provident fund and ESI contribution rates effective April 2026.',
      date: 'Feb 28, 2026',
      category: 'compliance',
      tags: ['PF', 'ESI', 'Statutory'],
      color: '#F4A261',
      link: '/resources/compliance/pf-esi-update',
    },
    {
      id: 12,
      title: 'New Guidelines for Remote Work Compliance',
      excerpt: 'Understanding legal requirements for managing remote employees across states.',
      date: 'Feb 25, 2026',
      category: 'compliance',
      tags: ['Remote Work', 'Legal', 'HR Compliance'],
      color: '#FF6B4A',
      link: '/resources/compliance/remote-work-guidelines',
    },
  ];

  const allResources = [...blogPosts, ...hrTrends, ...faqs, ...complianceUpdates];
  const filteredResources =
    activeCategory === 'all'
      ? allResources
      : allResources.filter((r) => r.category === activeCategory);
  const featuredResource = blogPosts[0];

  const handleLoadMore = () => {
    setShowComingSoon(true);
    setTimeout(() => {
      setShowComingSoon(false);
    }, 3000);
  };

  return (
    <div className="resources-page">
      {showComingSoon && (
        <div className="coming-soon-modal">
          <div className="modal-content">
            <i className="fas fa-rocket"></i>
            <h3>Coming Soon!</h3>
            <p>More resources are being added. Stay tuned!</p>
            <button onClick={() => setShowComingSoon(false)} className="modal-close-btn">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="resources-image-hero">
        <div className="hero-image-container">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Resources and Insights"
            className="hero-bg-image"
          />
          <div className="hero-image-overlay"></div>
        </div>
        <div className="professional-hero-container">
          <div className="hero-left-content">
            <div className="hero-badge-modern">
              <span className="badge-dot" style={{ background: '#4158D0' }}></span>
              <span>Knowledge Center</span>
            </div>
            <h1 className="hero-title-modern">
              Resources & <span className="gradient-text-modern">Insights</span>
            </h1>
            <p className="hero-description-modern">
              Stay ahead with the latest HR trends, compliance updates, and expert advice to optimize your hiring and
              workforce management.
            </p>
            <div className="hero-search-modern">
              <i className="fas fa-search search-icon-modern"></i>
              <input type="text" placeholder="Search resources, articles, FAQs..." className="search-input-modern" />
              <button className="search-btn-modern">Search</button>
            </div>
            <div className="hero-stats-modern">
              <div className="stat-box-modern" style={{ borderLeftColor: '#4158D0' }}>
                <span className="stat-number-modern">42+</span>
                <span className="stat-label-modern">Resources</span>
              </div>
              <div className="stat-box-modern" style={{ borderLeftColor: '#FF6B4A' }}>
                <span className="stat-number-modern">18</span>
                <span className="stat-label-modern">Blog Posts</span>
              </div>
              <div className="stat-box-modern" style={{ borderLeftColor: '#2A9D8F' }}>
                <span className="stat-number-modern">12</span>
                <span className="stat-label-modern">HR Trends</span>
              </div>
            </div>
          </div>
          <div className="hero-right-visual">{/* Lottie animation removed */}</div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="category-filter-section">
        <div className="filter-container">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn-modern ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
              style={{ '--btn-color': category.color }}
            >
              <span className="filter-icon">{category.icon}</span>
              <span className="filter-name">{category.name}</span>
              <span className="filter-count" style={{ background: `${category.color}20`, color: category.color }}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Resource */}
      {activeCategory === 'all' && (
        <section className="featured-resource">
          <div className="featured-container">
            <div className="featured-content">
              <span className="featured-badge" style={{ background: featuredResource.color }}>
                Featured Article
              </span>
              <h2>{featuredResource.title}</h2>
              <p>{featuredResource.excerpt}</p>
              <div className="featured-meta">
                <div className="featured-author">
                  <img src={featuredResource.authorImage} alt={featuredResource.author} />
                  <div>
                    <strong>{featuredResource.author}</strong>
                    <span>{featuredResource.authorRole}</span>
                  </div>
                </div>
                <div className="featured-stats">
                  <span>
                    <i className="far fa-clock"></i> {featuredResource.readTime}
                  </span>
                  <span>
                    <i className="far fa-calendar"></i> {featuredResource.date}
                  </span>
                </div>
              </div>
              <div className="featured-tags">
                {featuredResource.tags.map((tag) => (
                  <span
                    key={tag}
                    className="featured-tag"
                    style={{ background: `${featuredResource.color}15`, color: featuredResource.color }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to={`/resources/blog/${featuredResource.id}`}
                className="featured-btn"
                style={{ background: featuredResource.color }}
              >
                Read Full Article <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            <div className="featured-image">
              <img src={featuredResource.image} alt={featuredResource.title} />
            </div>
          </div>
        </section>
      )}

      {/* Resources Grid */}
      <section className="resources-grid-section">
        <div className="resources-header">
          <h2>{activeCategory === 'all' ? 'All Resources' : categories.find((c) => c.id === activeCategory)?.name}</h2>
          <p>Curated content to help you make better hiring decisions</p>
        </div>

        <div className="resources-masonry">
          {filteredResources.map((resource, index) => (
            <div
              key={resource.id}
              className={`resource-card-modern ${resource.category}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {resource.category === 'faq' ? (
                // FAQ Card
                <div className="faq-card-modern" style={{ borderTopColor: resource.color }}>
                  <div className="faq-icon-modern" style={{ background: `${resource.color}15`, color: resource.color }}>
                    {resource.icon}
                  </div>
                  <h3>{resource.question}</h3>
                  <p>{resource.answer.substring(0, 100)}...</p>
                  <Link to={`/resources/faq/${resource.id}`} className="card-link-modern" style={{ color: resource.color }}>
                    Read More <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              ) : resource.category === 'compliance' ? (
                // Compliance Card
                <div className="compliance-card-modern" style={{ borderTopColor: resource.color }}>
                  <div className="compliance-header-modern">
                    <span className="compliance-icon" style={{ color: resource.color }}>
                      ⚖️
                    </span>
                    <span className="compliance-date" style={{ color: resource.color }}>
                      {resource.date}
                    </span>
                  </div>
                  <h3>{resource.title}</h3>
                  <p>{resource.excerpt}</p>
                  <div className="compliance-tags-modern">
                    {resource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="compliance-tag-modern"
                        style={{ background: `${resource.color}15`, color: resource.color }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link to={`/resources/compliance/${resource.id}`} className="card-link-modern" style={{ color: resource.color }}>
  Read Update <i className="fas fa-arrow-right"></i>
</Link>
                </div>
              ) : (
                // Blog or HR Trends Card
                <div className="blog-card-modern" style={{ borderTopColor: resource.color }}>
                  <div className="blog-image-modern">
                    <img src={resource.image} alt={resource.title} />
                    <div className="blog-category-modern" style={{ background: resource.color }}>
                      {resource.category === 'blog' ? 'Blog' : 'Trend'}
                    </div>
                  </div>
                  <div className="blog-content-modern">
                    <div className="blog-meta-modern">
                      <span>
                        <i className="far fa-clock"></i> {resource.readTime}
                      </span>
                      <span>
                        <i className="far fa-calendar"></i> {resource.date}
                      </span>
                    </div>
                    <h3>{resource.title}</h3>
                    <p className="blog-excerpt-modern">{resource.excerpt.substring(0, 80)}...</p>

                    <div className="blog-footer-modern">
                      <div className="blog-author-modern">
                        <img src={resource.authorImage} alt={resource.author} />
                        <div>
                          <strong>{resource.author}</strong>
                          <span>{resource.authorRole}</span>
                        </div>
                      </div>
                      <div className="blog-stats-modern">
                        <span>
                          <i className="far fa-heart"></i> {resource.likes}
                        </span>
                        <span>
                          <i className="far fa-comment"></i> {resource.comments}
                        </span>
                      </div>
                    </div>

                    {/* ✅ CRITICAL FIX: Conditional link for HR Trends */}
                    <Link
                      to={
                        resource.category === 'hr-trends'
                          ? `/hr-trends/${resource.id}`
                          : `/resources/${resource.category}/${resource.id}`
                      }
                      className="card-link-modern"
                      style={{ color: resource.color }}
                    >
                      Read Article <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="no-results">
            <i className="fas fa-search"></i>
            <h3>No resources found</h3>
            <p>Try selecting a different category</p>
          </div>
        )}

        {filteredResources.length > 0 && (
          <div className="load-more">
            <button className="load-more-btn-modern" onClick={handleLoadMore}>
              Load More Resources <i className="fas fa-arrow-down"></i>
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h2>Stay Updated with HR Insights</h2>
            <p>
              Subscribe to our newsletter and get the latest articles, trends, and compliance updates directly in your
              inbox.
            </p>
            <form className="newsletter-form">
              <div className="form-group-modern">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Enter your email address" />
                <button type="submit" className="subscribe-btn-modern">
                  Subscribe
                </button>
              </div>
              <p className="form-note">We respect your privacy. Unsubscribe at any time.</p>
            </form>
            <div className="newsletter-benefits">
              <div className="benefit">
                <i className="fas fa-check-circle" style={{ color: '#2A9D8F' }}></i>
                <span>Weekly insights</span>
              </div>
              <div className="benefit">
                <i className="fas fa-check-circle" style={{ color: '#FF6B4A' }}></i>
                <span>Free resources</span>
              </div>
              <div className="benefit">
                <i className="fas fa-check-circle" style={{ color: '#4158D0' }}></i>
                <span>No spam</span>
              </div>
            </div>
          </div>
          <div className="newsletter-visual">
            <lottie-player
              src="https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json"
              background="transparent"
              speed="1"
              style={{ width: '100%', height: '300px' }}
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="resources-cta">
        <div className="cta-background">
          <div className="cta-circle circle-1"></div>
          <div className="cta-circle circle-2"></div>
          <div className="cta-circle circle-3"></div>
        </div>
        <div className="cta-content">
          <h2>Have Questions? We're Here to Help</h2>
          <p>Our team of experts is ready to assist you with any HR or recruitment challenges</p>
          <div className="cta-actions">
            <Link to="/contact-us" className="cta-primary">
              <i className="fas fa-headset"></i>
              <span>Talk to an Expert</span>
            </Link>
            <Link to="/faq" className="cta-secondary">
              <i className="fas fa-question-circle"></i>
              <span>View FAQs</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;