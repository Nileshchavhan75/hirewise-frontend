import React from 'react';
import '../css/CandidateDetailsModal.css';

const CandidateDetailsModal = ({ candidate, onClose }) => {
    if (!candidate) return null;

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const getInitials = (name) => {
        if (!name) return 'C';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className="candidate-modal-overlay" onClick={onClose}>
            <div className="candidate-modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>

                <div className="candidate-modal-header">
                    <div className="candidate-avatar-large">
                        {getInitials(candidate.name)}
                    </div>
                    <div className="candidate-title-info">
                        <h2>{candidate.name}</h2>
                        <span className={`role-badge ${candidate.role}`}>
                            {candidate.role === 'candidate' ? '👤 Candidate' : '🏢 Employer'}
                        </span>
                    </div>
                </div>

                <div className="candidate-modal-body">
                    {/* Contact Information */}
                    <div className="info-section">
                        <h3>
                            <i className="fas fa-address-card"></i>
                            Contact Information
                        </h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <label>📧 Email</label>
                                <p>{candidate.email}</p>
                            </div>
                            <div className="info-item">
                                <label>📞 Phone</label>
                                <p>{candidate.phone || 'Not provided'}</p>
                            </div>
                            <div className="info-item">
                                <label>📍 Location</label>
                                <p>{candidate.location || 'Not provided'}</p>
                            </div>
                            <div className="info-item">
                                <label>📅 Joined</label>
                                <p>{formatDate(candidate.joined)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Professional Information */}
                    <div className="info-section">
                        <h3>
                            <i className="fas fa-briefcase"></i>
                            Professional Information
                        </h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <label>💼 Current Role</label>
                                <p>{candidate.currentRole || 'Not specified'}</p>
                            </div>
                            <div className="info-item">
                                <label>📊 Experience</label>
                                <p>{candidate.experienceYears ? `${candidate.experienceYears} years` : 'Not specified'}</p>
                            </div>
                            <div className="info-item">
                                <label>🎯 Job Interest</label>
                                <p>{candidate.jobInterest || 'Not specified'}</p>
                            </div>
                            <div className="info-item">
                                <label>📄 Resume</label>
                                {candidate.resumeUrl ? (
                                    <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer" className="resume-link">
                                        <i className="fas fa-file-pdf"></i> View Resume
                                    </a>
                                ) : (
                                    <p>Not uploaded</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Application History */}
                    {candidate.applications && candidate.applications.length > 0 && (
                        <div className="info-section">
                            <h3>
                                <i className="fas fa-file-alt"></i>
                                Application History
                            </h3>
                            <div className="applications-history">
                                {candidate.applications.map((app, index) => (
                                    <div key={index} className="application-history-item">
                                        <div className="app-header">
                                            <strong>{app.jobTitle}</strong>
                                            <span className={`status-badge-small ${app.status}`}>
                                                {app.status}
                                            </span>
                                        </div>
                                        <div className="app-details">
                                            <span><i className="fas fa-building"></i> {app.employerName}</span>
                                            <span><i className="fas fa-calendar"></i> Applied: {formatDate(app.appliedAt)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Account Status */}
                    <div className="info-section">
                        <h3>
                            <i className="fas fa-shield-alt"></i>
                            Account Status
                        </h3>
                        <div className="status-info">
                            <span className={`status-badge ${candidate.isActive ? 'active' : 'inactive'}`}>
                                {candidate.isActive ? 'Active Account' : 'Blocked Account'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="candidate-modal-footer">
                    <button className="close-btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CandidateDetailsModal;