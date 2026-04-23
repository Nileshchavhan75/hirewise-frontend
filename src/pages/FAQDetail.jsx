import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { faqs } from '../data/faqs';
import '../css/FAQDetail.css';

const FAQDetail = () => {
  const { id } = useParams();
  const faq = faqs.find(f => f.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!faq) {
    return (
      <div className="not-found">
        <h2>FAQ not found</h2>
        <Link to="/resources?category=faq" className="back-link">← Back to FAQs</Link>
      </div>
    );
  }

  return (
    <div className="faq-detail-page">
      <div className="faq-detail-container">
        <Link to="/resources?category=faq" className="back-to-faqs">
          <i className="fas fa-arrow-left"></i> Back to FAQs
        </Link>

        <div className="faq-detail-card" style={{ borderTopColor: faq.color }}>
          <div className="faq-detail-icon" style={{ background: `${faq.color}15`, color: faq.color }}>
            {faq.icon}
          </div>
          <h1>{faq.question}</h1>
          <div 
            className="faq-detail-answer"
            dangerouslySetInnerHTML={{ __html: faq.fullAnswer }}
          />
        </div>
      </div>
    </div>
  );
};

export default FAQDetail;