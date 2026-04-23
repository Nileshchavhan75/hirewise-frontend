import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import jobService from '../services/jobService';
import applicationService from '../services/applicationService';
import authService from '../services/authService';
import ApplyModal from '../components/ApplyModal';
// Import the ResumeCheckModal component
import ResumeCheckModal from '../components/ResumeCheckModal'; 
import '../css/JobDetails.css';

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [hasApplied, setHasApplied] = useState(false);
    const [showApplyModal, setShowApplyModal] = useState(false);
    // State for Resume Match Modal
    const [showResumeModal, setShowResumeModal] = useState(false);

    useEffect(() => {
        fetchJobDetails();
    }, [id]);

    const fetchJobDetails = async () => {
        setLoading(true);
        const result = await jobService.getJobById(id);
        
        if (result.success) {
            setJob(result.data);
            
            // Check if user already applied
            const user = authService.getCurrentUser();
            if (user && user.role === 'candidate') {
                const appliedResult = await applicationService.hasApplied(id, user.userId);
                if (appliedResult.success) {
                    setHasApplied(appliedResult.data);
                }
            }
        } else {
            setError(result.message || 'Failed to load job details');
        }
        
        setLoading(false);
    };

    const handleApplySubmit = async (applicationData) => {
        const user = authService.getCurrentUser();
        if (!user) {
            navigate('/login', { state: { from: `/job/${id}` } });
            return;
        }

        const result = await applicationService.applyForJob(user.userId, {
            jobId: id,
            resumeUrl: applicationData.resumeUrl,
            coverLetter: applicationData.coverLetter
        });

        if (result.success) {
            setShowApplyModal(false);
            setHasApplied(true);
            alert('Application submitted successfully!');
        } else {
            alert(result.message || 'Failed to submit application');
        }
    };

    const handleApply = () => {
        const user = authService.getCurrentUser();
        if (!user) {
            navigate('/login', { state: { from: `/job/${id}` } });
            return;
        }
        
        if (user.role !== 'candidate') {
            alert('Only candidates can apply for jobs');
            return;
        }
        
        setShowApplyModal(true);
    };

    const getJobTypeColor = (type) => {
        const colors = {
            permanent: '#4158D0',
            contract: '#FF6B4A',
            intern: '#2A9D8F',
            bulk: '#9C89B8'
        };
        return colors[type?.toLowerCase()] || '#4158D0';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="loading-container">
                <i className="fas fa-spinner fa-spin"></i>
                <p>Loading job details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <i className="fas fa-exclamation-circle"></i>
                <h2>Error</h2>
                <p>{error}</p>
                <Link to="/candidates" className="back-btn">Back to Jobs</Link>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="not-found-container">
                <i className="fas fa-search"></i>
                <h2>Job Not Found</h2>
                <p>The job you're looking for doesn't exist.</p>
                <Link to="/candidates" className="back-btn">Browse Jobs</Link>
            </div>
        );
    }

    return (
        <div className="job-details-page">
            <div className="details-container">
                <button onClick={() => navigate(-1)} className="back-button">
                    <i className="fas fa-arrow-left"></i> Back to Jobs
                </button>

                <div className="job-header" style={{ borderTopColor: getJobTypeColor(job.jobType) }}>
                    <div className="job-title-section">
                        <h1>{job.title}</h1>
                        <p className="company-name">{job.companyName || job.postedByName || 'HireWise Solutions'}</p>
                    </div>
                    
                    {job.sector === 'international' && (
                        <span className="international-badge">
                            <i className="fas fa-globe"></i> International
                        </span>
                    )}
                </div>

                <div className="job-quick-info">
                    <span className="info-tag">
                        <i className="fas fa-map-marker-alt"></i> {job.location}
                    </span>
                    <span className="info-tag">
                        <i className="fas fa-briefcase"></i> {job.jobType?.charAt(0).toUpperCase() + job.jobType?.slice(1) || 'Permanent'}
                    </span>
                    {job.experienceRange && (
                        <span className="info-tag">
                            <i className="fas fa-clock"></i> {job.experienceRange}
                        </span>
                    )}
                    {job.salaryRange && (
                        <span className="info-tag">
                            <i className="fas fa-money-bill-wave"></i> {job.salaryRange}
                        </span>
                    )}
                    <span className="info-tag">
                        <i className="fas fa-users"></i> {job.vacancyCount || 1} Vacancies
                    </span>
                </div>

                <div className="posted-date">
                    <i className="far fa-calendar-alt"></i> 
                    Posted: {formatDate(job.createdAt)}
                    {job.applicationDeadline && (
                        <span className="deadline">
                            | Apply by: {formatDate(job.applicationDeadline)}
                        </span>
                    )}
                </div>

                <div className="job-section">
                    <h2>Job Description</h2>
                    <p className="job-description">{job.description}</p>
                </div>

                {job.requirements && (
                    <div className="job-section">
                        <h2>Requirements</h2>
                        <div className="requirements-list">
                            {job.requirements.split(',').map((req, index) => (
                                <div key={index} className="requirement-item">
                                    <i className="fas fa-check-circle"></i>
                                    <span>{req.trim()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {job.benefits && (
                    <div className="job-section">
                        <h2>Benefits</h2>
                        <div className="benefits-list">
                            {job.benefits.split(',').map((benefit, index) => (
                                <div key={index} className="benefit-item">
                                    <i className="fas fa-gift"></i>
                                    <span>{benefit.trim()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Combined Action Section */}
                <div className="apply-section">
                    {(() => {
                        const user = authService.getCurrentUser();
                        
                        if (!user) {
                            return (
                                <Link to="/login" className="login-to-apply">
                                    <i className="fas fa-sign-in-alt"></i>
                                    Login to Apply
                                </Link>
                            );
                        }
                        
                        if (user.role !== 'candidate') {
                            return (
                                <div className="already-applied">
                                    <i className="fas fa-info-circle"></i>
                                    Only candidates can apply for jobs
                                </div>
                            );
                        }
                        
                        return (
                            <div className="action-buttons">
                                {/* Resume Match Button - Visible to all candidates */}
                                <button 
                                    onClick={() => setShowResumeModal(true)} 
                                    className="check-match-btn"
                                    style={{ marginRight: '10px', backgroundColor: '#2A9D8F', color: 'white', padding: '12px 25px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                                >
                                    <i className="fas fa-chart-line"></i> Check Resume Match
                                </button>

                                {hasApplied ? (
                                    <div className="already-applied" style={{ display: 'inline-block' }}>
                                        <i className="fas fa-check-circle"></i>
                                        You have already applied
                                    </div>
                                ) : (
                                    <button 
                                        className="apply-btn"
                                        onClick={handleApply}
                                    >
                                        <i className="fas fa-paper-plane"></i>
                                        Apply for this Job
                                    </button>
                                )}
                            </div>
                        );
                    })()}
                </div>
            </div>

            {/* Modals */}
            {showApplyModal && (
                <ApplyModal 
                    job={job}
                    onClose={() => setShowApplyModal(false)}
                    onSubmit={handleApplySubmit}
                />
            )}

            {showResumeModal && (
                <ResumeCheckModal 
                    job={job} 
                    onClose={() => setShowResumeModal(false)} 
                />
            )}
        </div>
    );
};

export default JobDetails;