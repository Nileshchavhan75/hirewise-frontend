import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jobService from '../services/jobService';
import applicationService from '../services/applicationService';
import authService from '../services/authService';
import '../css/EmployerDashboard.css';
import PostJobModal from '../components/PostJobModal';

const EmployerDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('jobs');
    const [selectedJob, setSelectedJob] = useState(null);
    const [showPostJobModal, setShowPostJobModal] = useState(false);
    const [showApplicantsModal, setShowApplicantsModal] = useState(false);
    const [currentJobApplicants, setCurrentJobApplicants] = useState([]);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser) {
            navigate('/login');
            return;
        }
        if (currentUser.role !== 'employer') {
            navigate('/');
            return;
        }
        setUser(currentUser);
        loadDashboardData(currentUser.userId);
    }, []);
            const loadDashboardData = async (employerId) => {
    setLoading(true);
    console.log('========== DASHBOARD DATA LOADING ==========');
    console.log('Loading data for employer ID:', employerId);
    
    // Load jobs posted by this employer
    console.log('Calling jobService.getJobsByEmployer with ID:', employerId);
    const jobsResult = await jobService.getJobsByEmployer(employerId);
    console.log('Jobs API Response:', jobsResult);
    
    if (jobsResult.success) {
        console.log('Jobs data received:', jobsResult.data);
        console.log('Number of jobs:', jobsResult.data?.length || 0);
        setJobs(jobsResult.data || []);
        
        // Load all applications for these jobs
        const allApplications = [];
        console.log('Fetching applications for each job...');
        
        for (const job of jobsResult.data) {
            console.log(`Fetching applications for job ID ${job.id} - "${job.title}"`);
            const appsResult = await applicationService.getJobApplications(job.id, employerId);
            console.log(`Applications for job ${job.id}:`, appsResult);
            
            if (appsResult.success) {
                console.log(`Found ${appsResult.data?.length || 0} applications for job ${job.id}`);
                allApplications.push(...appsResult.data.map(app => ({
                    ...app,
                    jobTitle: job.title,
                    jobId: job.id
                })));
            } else {
                console.log(`Failed to fetch applications for job ${job.id}:`, appsResult.message);
            }
        }
        
        console.log('Total applications collected:', allApplications.length);
        console.log('All applications data:', allApplications);
        setApplications(allApplications);
    } else {
        console.log('Failed to fetch jobs:', jobsResult.message);
        setError(jobsResult.message || 'Failed to load dashboard data');
    }
    
    setLoading(false);
    console.log('========== DASHBOARD DATA LOADING COMPLETE ==========');
};

    const handleStatusUpdate = async (applicationId, newStatus) => {
        const result = await applicationService.updateApplicationStatus(applicationId, user.userId, {
            status: newStatus
        });
        
        if (result.success) {
            // Update local state
            setApplications(applications.map(app => 
                app.id === applicationId ? { ...app, status: newStatus } : app
            ));
            if (currentJobApplicants.length > 0) {
                setCurrentJobApplicants(currentJobApplicants.map(app => 
                    app.id === applicationId ? { ...app, status: newStatus } : app
                ));
            }
        } else {
            alert(result.message || 'Failed to update status');
        }
    };

    const handleDeleteJob = async (jobId) => {
        if (!window.confirm('Are you sure you want to delete this job?')) {
            return;
        }
        
        const result = await jobService.deleteJob(jobId, user.userId);
        
        if (result.success) {
            setJobs(jobs.filter(job => job.id !== jobId));
            setApplications(applications.filter(app => app.jobId !== jobId));
        } else {
            alert(result.message || 'Failed to delete job');
        }
    };
    const handleJobPosted = (newJob) => {
    // Add the new job to the jobs list
    setJobs([...jobs, newJob]);
    // Show success message
    alert('Job posted successfully!');
};

    const viewApplicants = (job) => {
        setSelectedJob(job);
        const jobApps = applications.filter(app => app.jobId === job.id);
        setCurrentJobApplicants(jobApps);
        setShowApplicantsModal(true);
    };

    const getStatusBadgeClass = (status) => {
        const classes = {
            'pending': 'status-pending',
            'reviewed': 'status-reviewed',
            'shortlisted': 'status-shortlisted',
            'rejected': 'status-rejected',
            'accepted': 'status-accepted'
        };
        return classes[status?.toLowerCase()] || 'status-pending';
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
        if (!name) return 'E';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const stats = {
        totalJobs: jobs.length,
        activeJobs: jobs.filter(j => j.isActive !== false).length,
        totalApplications: applications.length,
        pendingApplications: applications.filter(a => a.status === 'pending').length
    };

    if (loading) {
        return (
            <div className="employer-dashboard">
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="employer-dashboard">
            {/* Header with User Info */}
            <div className="dashboard-header">
                <div className="user-info-large">
                    <div className="user-avatar-large">
                        {getInitials(user?.name || user?.email)}
                    </div>
                    <div>
                        <h1>Welcome, {user?.name || 'Employer'}!</h1>
                        <p className="company-badge">
                            <i className="fas fa-building"></i>
                            {user?.companyName || 'Your Company'}
                        </p>
                    </div>
                </div>
                <button 
                    className="post-job-btn"
                    onClick={() => setShowPostJobModal(true)}
                >
                    <i className="fas fa-plus"></i>
                    Post New Job
                </button>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card-large">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}>
                        <i className="fas fa-briefcase"></i>
                    </div>
                    <div className="stat-details">
                        <span className="stat-value">{stats.totalJobs}</span>
                        <span className="stat-label">Total Jobs Posted</span>
                    </div>
                </div>
                <div className="stat-card-large">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #11998e, #38ef7d)' }}>
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <div className="stat-details">
                        <span className="stat-value">{stats.activeJobs}</span>
                        <span className="stat-label">Active Jobs</span>
                    </div>
                </div>
                <div className="stat-card-large">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #FF512F, #DD2476)' }}>
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="stat-details">
                        <span className="stat-value">{stats.totalApplications}</span>
                        <span className="stat-label">Total Applications</span>
                    </div>
                </div>
                <div className="stat-card-large">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f1c40f, #e67e22)' }}>
                        <i className="fas fa-clock"></i>
                    </div>
                    <div className="stat-details">
                        <span className="stat-value">{stats.pendingApplications}</span>
                        <span className="stat-label">Pending Review</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="dashboard-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('jobs')}
                >
                    <i className="fas fa-briefcase"></i>
                    My Jobs ({jobs.length})
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
                    onClick={() => setActiveTab('applications')}
                >
                    <i className="fas fa-users"></i>
                    All Applications ({applications.length})
                </button>
            </div>

            {/* Jobs Tab */}
            {activeTab === 'jobs' && (
                <div className="jobs-section">
                    {jobs.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">
                                <i className="fas fa-briefcase"></i>
                            </div>
                            <h3>No Jobs Posted Yet</h3>
                            <p>Post your first job to start receiving applications</p>
                            <button 
                                className="post-job-btn-large"
                                onClick={() => setShowPostJobModal(true)}
                            >
                                <i className="fas fa-plus"></i>
                                Post a Job
                            </button>
                        </div>
                    ) : (
                        <div className="jobs-grid">
                            {jobs.map(job => (
                                <div key={job.id} className="job-card-dashboard">
                                    <div className="job-card-header">
                                        <h3>{job.title}</h3>
                                        <span className={`job-status ${job.isActive ? 'active' : 'inactive'}`}>
                                            {job.isActive ? 'Active' : 'Closed'}
                                        </span>
                                    </div>
                                    <p className="job-location">
                                        <i className="fas fa-map-marker-alt"></i>
                                        {job.location}
                                    </p>
                                    <div className="job-meta">
                                        <span>
                                            <i className="fas fa-clock"></i>
                                            Posted: {formatDate(job.createdAt)}
                                        </span>
                                        <span className="applications-count">
                                            <i className="fas fa-users"></i>
                                            {applications.filter(a => a.jobId === job.id).length} Applicants
                                        </span>
                                    </div>
                                    <div className="job-card-actions">
                                        <button 
                                            className="view-applicants-btn"
                                            onClick={() => viewApplicants(job)}
                                        >
                                            <i className="fas fa-eye"></i>
                                            View Applicants
                                        </button>
                                        <button 
                                            className="delete-job-btn"
                                            onClick={() => handleDeleteJob(job.id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
                <div className="applications-section">
                    {applications.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">
                                <i className="fas fa-users"></i>
                            </div>
                            <h3>No Applications Yet</h3>
                            <p>When candidates apply for your jobs, they'll appear here</p>
                        </div>
                    ) : (
                        <div className="applications-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Candidate</th>
                                        <th>Job Title</th>
                                        <th>Applied On</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applications.map(app => (
                                        <tr key={app.id}>
                                            <td>
                                                <div className="candidate-info">
                                                    <div className="candidate-avatar">
                                                        {getInitials(app.candidateName)}
                                                    </div>
                                                    <div>
                                                        <div className="candidate-name">{app.candidateName}</div>
                                                        <div className="candidate-email">{app.candidateEmail}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{app.jobTitle}</td>
                                            <td>{formatDate(app.appliedAt)}</td>
                                            <td>
                                                <span className={`status-badge ${getStatusBadgeClass(app.status)}`}>
                                                    {getStatusIcon(app.status)} {app.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <select 
                                                        className="status-select"
                                                        value={app.status}
                                                        onChange={(e) => handleStatusUpdate(app.id, e.target.value)}
                                                    >
                                                        <option value="pending">⏳ Pending</option>
                                                        <option value="reviewed">👀 Reviewed</option>
                                                        <option value="shortlisted">⭐ Shortlist</option>
                                                        <option value="rejected">❌ Reject</option>
                                                        <option value="accepted">✅ Accept</option>
                                                    </select>
                                                    {app.resumeUrl && (
                                                        <button 
                                                            className="view-resume-btn-small"
                                                            onClick={() => window.open(app.resumeUrl, '_blank')}
                                                        >
                                                            <i className="fas fa-file-pdf"></i>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* Applicants Modal */}
            {showApplicantsModal && selectedJob && (
                <div className="modal-overlay" onClick={() => setShowApplicantsModal(false)}>
                    <div className="modal-content large" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowApplicantsModal(false)}>
                            <i className="fas fa-times"></i>
                        </button>
                        <h2>Applicants for {selectedJob.title}</h2>
                        <p className="job-location-modal">
                            <i className="fas fa-map-marker-alt"></i> {selectedJob.location}
                        </p>
                        
                        {currentJobApplicants.length === 0 ? (
                            <div className="empty-state small">
                                <p>No applicants yet for this position</p>
                            </div>
                        ) : (
                            <div className="applicants-list">
                                {currentJobApplicants.map(app => (
                                    <div key={app.id} className="applicant-card">
                                        <div className="applicant-header">
                                            <div className="applicant-avatar">
                                                {getInitials(app.candidateName)}
                                            </div>
                                            <div className="applicant-info">
                                                <h4>{app.candidateName}</h4>
                                                <p>{app.candidateEmail}</p>
                                            </div>
                                            <span className={`status-badge ${getStatusBadgeClass(app.status)}`}>
                                                {getStatusIcon(app.status)} {app.status}
                                            </span>
                                        </div>
                                        <div className="applicant-meta">
                                            <span>
                                                <i className="fas fa-calendar-alt"></i>
                                                Applied: {formatDate(app.appliedAt)}
                                            </span>
                                        </div>
                                        {app.notes && (
                                            <div className="applicant-notes">
                                                <i className="fas fa-sticky-note"></i>
                                                {app.notes}
                                            </div>
                                        )}
                                        <div className="applicant-actions">
                                            <select 
                                                className="status-select-small"
                                                value={app.status}
                                                onChange={(e) => handleStatusUpdate(app.id, e.target.value)}
                                            >
                                                <option value="pending">⏳ Pending</option>
                                                <option value="reviewed">👀 Reviewed</option>
                                                <option value="shortlisted">⭐ Shortlist</option>
                                                <option value="rejected">❌ Reject</option>
                                                <option value="accepted">✅ Accept</option>
                                            </select>
                                            {app.resumeUrl && (
                                                <button 
                                                    className="view-resume-btn"
                                                    onClick={() => window.open(app.resumeUrl, '_blank')}
                                                >
                                                    <i className="fas fa-file-pdf"></i>
                                                    Resume
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
                        {/* Post Job Modal */}
            {showPostJobModal && (
                <PostJobModal
                    onClose={() => setShowPostJobModal(false)}
                    onSubmit={handleJobPosted}
                    employerId={user?.userId}
                />
            )}
        </div>
    );
};

export default EmployerDashboard;