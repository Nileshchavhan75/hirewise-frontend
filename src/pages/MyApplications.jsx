import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import applicationService from '../services/applicationService';
import authService from '../services/authService';
import '../css/MyApplications.css';

const MyApplications = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser) {
            navigate('/login');
            return;
        }
        if (currentUser.role !== 'candidate') {
            navigate('/');
            return;
        }
        setUser(currentUser);
        fetchApplications(currentUser.userId);
    }, []);

    const fetchApplications = async (userId) => {
        setLoading(true);
        
        const result = await applicationService.getCandidateApplications(userId);
        
        if (result.success) {
            setApplications(result.data || []);
        } else {
            setError(result.message || 'Failed to load applications');
        }
        
        setLoading(false);
    };

    const handleWithdraw = async (applicationId) => {
        if (!window.confirm('Are you sure you want to withdraw this application?')) {
            return;
        }
        
        const result = await applicationService.withdrawApplication(applicationId, user.userId);
        
        if (result.success) {
            setApplications(applications.filter(app => app.id !== applicationId));
        } else {
            alert(result.message || 'Failed to withdraw application');
        }
    };

    // ✅ NEW FUNCTION ADDED HERE - Handle viewing resume
    const handleViewResume = (resumeUrl) => {
        if (!resumeUrl) return;
        
        // Check if it's a full URL or local path
        if (resumeUrl.startsWith('http')) {
            // External URL (Google Drive, Dropbox, etc.)
            window.open(resumeUrl, '_blank');
        } else {
            // Local file - need to construct full URL
            const baseUrl = 'https://web-production-44bcb.up.railway.app';;
            const fullUrl = baseUrl + resumeUrl;
            window.open(fullUrl, '_blank');
        }
    };

    const getStatusBadgeClass = (status) => {
        const classes = {
            'pending': 'pending',
            'reviewed': 'reviewed',
            'shortlisted': 'shortlisted',
            'rejected': 'rejected',
            'accepted': 'accepted'
        };
        return classes[status?.toLowerCase()] || 'pending';
    };

    const getStatusIcon = (status) => {
        const icons = {
            'pending': '⏳',
            'reviewed': '👀',
            'shortlisted': '⭐',
            'rejected': '❌',
            'accepted': '✅'
        };
        return icons[status?.toLowerCase()] || '📝';
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

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    if (loading) {
        return (
            <div className="my-applications-page">
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>Loading your applications...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-applications-page">
                <div className="error-container">
                    <i className="fas fa-exclamation-circle"></i>
                    <h2>Error</h2>
                    <p>{error}</p>
                    <button onClick={() => fetchApplications(user.userId)} className="browse-btn">
                        <i className="fas fa-redo"></i> Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="my-applications-page">
            {/* User Profile Header */}
            <div className="user-profile-header">
                <div className="user-avatar">
                    {getInitials(user?.name || user?.email)}
                </div>
                <div className="user-info">
                    <h2>{user?.name || 'Candidate'}</h2>
                    <p className="user-email">{user?.email}</p>
                    <span className="user-badge">
                        <i className="fas fa-user-check"></i>
                        Active Candidate
                    </span>
                </div>
                <div className="user-stats-mini">
                    <div className="mini-stat">
                        <span className="mini-stat-value">{applications.length}</span>
                        <span className="mini-stat-label">Applications</span>
                    </div>
                    <div className="mini-stat">
                        <span className="mini-stat-value">
                            {applications.filter(a => a.status === 'pending').length}
                        </span>
                        <span className="mini-stat-label">Pending</span>
                    </div>
                    <div className="mini-stat">
                        <span className="mini-stat-value">
                            {applications.filter(a => a.status === 'shortlisted' || a.status === 'accepted').length}
                        </span>
                        <span className="mini-stat-label">Active</span>
                    </div>
                </div>
            </div>

            <div className="applications-header">
                <h1>
                    <i className="fas fa-file-alt"></i>
                    My Applications
                </h1>
                <p>Track and manage your job applications</p>
            </div>

            {applications.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">
                        <i className="fas fa-file-upload"></i>
                    </div>
                    <h2>No Applications Yet</h2>
                    <p>You haven't applied for any jobs yet, {user?.name?.split(' ')[0] || 'Candidate'}. Start exploring opportunities and take the next step in your career!</p>
                    <Link to="/candidates" className="browse-btn">
                        <i className="fas fa-search"></i>
                        Browse Jobs
                    </Link>
                </div>
            ) : (
                <>
                    <div className="applications-stats">
                        <div className="stat-card">
                            <span className="stat-value">{applications.length}</span>
                            <span className="stat-label">Total Applications</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-value">
                                {applications.filter(a => a.status === 'pending').length}
                            </span>
                            <span className="stat-label">Pending Review</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-value">
                                {applications.filter(a => a.status === 'shortlisted' || a.status === 'accepted').length}
                            </span>
                            <span className="stat-label">Active Applications</span>
                        </div>
                    </div>

                    <div className="applications-grid">
                        {applications.map((app) => (
                            <div key={app.id} className="application-card">
                                <div className="application-header">
                                    <div className="company-info">
                                        <div className="company-logo">
                                            {app.companyName?.charAt(0) || app.jobTitle?.charAt(0) || 'J'}
                                        </div>
                                        <div className="company-details">
                                            <h3>{app.jobTitle}</h3>
                                            <p>
                                                <i className="fas fa-building"></i>
                                                {app.companyName || 'Company'}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`status-badge ${getStatusBadgeClass(app.status)}`}>
                                        {getStatusIcon(app.status)} {app.status}
                                    </span>
                                </div>

                                <div className="application-body">
                                    <div className="details-grid">
                                        <div className="detail-item">
                                            <i className="fas fa-calendar-alt"></i>
                                            <span>Applied: {formatDate(app.appliedAt)}</span>
                                        </div>
                                        {app.job?.location && (
                                            <div className="detail-item">
                                                <i className="fas fa-map-marker-alt"></i>
                                                <span>{app.job.location}</span>
                                            </div>
                                        )}
                                        {app.job?.jobType && (
                                            <div className="detail-item">
                                                <i className="fas fa-briefcase"></i>
                                                <span>{app.job.jobType}</span>
                                            </div>
                                        )}
                                    </div>

                                    {app.notes && (
                                        <div className="notes-section">
                                            <i className="fas fa-sticky-note"></i>
                                            <p>{app.notes}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="application-footer">
                                    <Link to={`/job/${app.jobId}`} className="action-btn primary">
                                        <i className="fas fa-eye"></i>
                                        View Job
                                    </Link>
                                    
                                    {app.resumeUrl && (
                                        <button 
                                            className="action-btn secondary"
                                            onClick={() => handleViewResume(app.resumeUrl)}
                                        >
                                            <i className="fas fa-file-pdf"></i>
                                            Resume
                                        </button>
                                    )}
                                    
                                    {app.status === 'pending' && (
                                        <button 
                                            className="action-btn danger"
                                            onClick={() => handleWithdraw(app.id)}
                                        >
                                            <i className="fas fa-times"></i>
                                            Withdraw
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default MyApplications;