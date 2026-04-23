import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { complianceUpdates } from '../data/complianceUpdates';
import '../css/ComplianceDetail.css';

const ComplianceDetail = () => {
  const { id } = useParams();
  const update = complianceUpdates.find(u => u.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!update) {
    return (
      <div className="not-found">
        <h2>Update not found</h2>
        <Link to="/resources?category=compliance" className="back-link">← Back to Compliance</Link>
      </div>
    );
  }

  return (
    <div className="compliance-detail-page">
      <div className="compliance-detail-container">
        <Link to="/resources?category=compliance" className="back-to-compliance">
          <i className="fas fa-arrow-left"></i> Back to Compliance
        </Link>

        <div className="compliance-detail-card" style={{ borderTopColor: update.color }}>
          <div className="compliance-detail-header">
            <span className="compliance-date">{update.date}</span>
            <div className="compliance-tags">
              {update.tags.map(tag => (
                <span key={tag} className="tag" style={{ background: `${update.color}20`, color: update.color }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <h1>{update.title}</h1>
          <div 
            className="compliance-detail-content"
            dangerouslySetInnerHTML={{ __html: update.fullContent }}
          />
        </div>
      </div>
    </div>
  );
};

export default ComplianceDetail;