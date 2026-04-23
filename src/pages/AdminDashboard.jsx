import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import adminService from '../services/adminService';
import CandidateDetailsModal from '../components/CandidateDetailsModal';
import '../css/AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalCandidates: 0,
        totalEmployers: 0,
        totalJobs: 0,
        totalApplications: 0,
        activeJobs: 0
    });
    const [users, setUsers] = useState([]);
    const [applications, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [jobFilter, setJobFilter] = useState('all');
    const [activeTab, setActiveTab] = useState('overview');
    const [error, setError] = useState('');
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [showCandidateModal, setShowCandidateModal] = useState(false);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser) {
            navigate('/login');
            return;
        }
        if (currentUser.role !== 'admin') {
            navigate('/');
            return;
        }
        setUser(currentUser);
        loadAdminData();
    }, []);

    const loadAdminData = async () => {
        setLoading(true);
        setError('');
        
        // Load stats
        const statsResult = await adminService.getStats();
        if (statsResult.success) {
            setStats(statsResult.data);
        } else {
            setError('Failed to load stats: ' + statsResult.message);
        }
        
        // Load users
        const usersResult = await adminService.getAllUsers();
        if (usersResult.success) {
            setUsers(usersResult.data || []);
        }
        
        // Load applications
        const appsResult = await adminService.getAllApplications();
        if (appsResult.success) {
            setApplications(appsResult.data || []);
        }
        
        setLoading(false);
    };

    // Fetch jobs for approval
    const fetchJobs = async () => {
        const result = await adminService.getAllJobs();
        if (result.success) {
            setJobs(result.data || []);
        }
    };

    // Approve or reject job
    const handleJobApproval = async (jobId, status) => {
        const action = status === 'approved' ? 'approve' : 'reject';
        if (!window.confirm(`Are you sure you want to ${action} this job?`)) return;
        
        const result = await adminService.updateJobApproval(jobId, status);
        if (result.success) {
            setJobs(jobs.map(j => j.id === jobId ? { ...j, approvalStatus: status } : j));
            alert(`Job ${status} successfully`);
            // Refresh stats after approval/rejection
            loadAdminData();
        } else {
            alert(result.message || 'Failed to update job status');
        }
    };

    const handleBlockUser = async (userId) => {
        if (!window.confirm('Are you sure you want to block this user?')) return;
        const result = await adminService.updateUserStatus(userId, false);
        if (result.success) {
            setUsers(users.map(u => u.id === userId ? { ...u, isActive: false } : u));
            alert('User blocked successfully');
        } else {
            alert(result.message || 'Failed to block user');
        }
    };

    const handleActivateUser = async (userId) => {
        if (!window.confirm('Are you sure you want to activate this user?')) return;
        const result = await adminService.updateUserStatus(userId, true);
        if (result.success) {
            setUsers(users.map(u => u.id === userId ? { ...u, isActive: true } : u));
            alert('User activated successfully');
        } else {
            alert(result.message || 'Failed to activate user');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to permanently delete this user?')) return;
        const result = await adminService.deleteUser(userId);
        if (result.success) {
            setUsers(users.filter(u => u.id !== userId));
            alert('User deleted successfully');
        } else {
            alert(result.message || 'Failed to delete user');
        }
    };

    const handleViewCandidate = async (candidate) => {
        // Fetch additional candidate details (applications, etc.)
        // For now, use the data we have
        setSelectedCandidate(candidate);
        setShowCandidateModal(true);
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
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
            <div className="admin-dashboard">
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <div className="admin-header-left">
                    <div className="admin-avatar">
                        {getInitials(user?.name || user?.email)}
                    </div>
                    <div className="admin-welcome">
                        <h1>Admin Dashboard</h1>
                        <p>Welcome back, {user?.name || 'Admin'}!</p>
                    </div>
                </div>
                <div className="admin-header-right">
                    <span className="admin-badge">Super Admin</span>
                </div>
            </div>

            {error && (
                <div className="error-banner">
                    <i className="fas fa-exclamation-circle"></i>
                    {error}
                    <button onClick={loadAdminData}>Retry</button>
                </div>
            )}

            {/* Stats Cards */}
            <div className="admin-stats-grid">
                <div className="admin-stat-card">
                    <div className="stat-icon" style={{ background: '#4158D0' }}>
                        <i className="fas fa-users"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.totalUsers}</h3>
                        <p>Total Users</p>
                    </div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-icon" style={{ background: '#11998e' }}>
                        <i className="fas fa-user-graduate"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.totalCandidates}</h3>
                        <p>Candidates</p>
                    </div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-icon" style={{ background: '#FF512F' }}>
                        <i className="fas fa-building"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.totalEmployers}</h3>
                        <p>Employers</p>
                    </div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-icon" style={{ background: '#f1c40f' }}>
                        <i className="fas fa-briefcase"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.totalJobs}</h3>
                        <p>Total Jobs</p>
                    </div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-icon" style={{ background: '#e67e22' }}>
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.activeJobs}</h3>
                        <p>Active Jobs</p>
                    </div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-icon" style={{ background: '#9b59b6' }}>
                        <i className="fas fa-file-alt"></i>
                    </div>
                    <div className="stat-info">
                        <h3>{stats.totalApplications}</h3>
                        <p>Applications</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="admin-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    <i className="fas fa-chart-line"></i> Overview
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    <i className="fas fa-users"></i> Users ({users.length})
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
                    onClick={() => setActiveTab('applications')}
                >
                    <i className="fas fa-file-alt"></i> Applications ({applications.length})
                </button>
                {/* ✅ NEW: Jobs Approval Tab */}
                <button 
                    className={`tab-btn ${activeTab === 'jobsApproval' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('jobsApproval'); fetchJobs(); }}
                >
                    <i className="fas fa-check-double"></i> Jobs Approval
                </button>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
                <div className="admin-overview">
                    <div className="coming-soon">
                        <i className="fas fa-chart-pie"></i>
                        <h3>Analytics Dashboard Coming Soon</h3>
                        <p>Charts, graphs, and insights will appear here</p>
                    </div>
                </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
                <div className="admin-users-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(userItem => (
                                <tr key={userItem.id}>
                                    <td>{userItem.id}</td>
                                    <td>
                                        <button 
                                            className="candidate-name-link"
                                            onClick={() => handleViewCandidate(userItem)}
                                        >
                                            <strong>{userItem.name}</strong>
                                        </button>
                                    </td>
                                    <td>{userItem.email}</td>
                                    <td>
                                        <span className={`role-badge ${userItem.role}`}>
                                            {userItem.role === 'candidate' ? '👤 Candidate' : 
                                             userItem.role === 'employer' ? '🏢 Employer' : '👑 Admin'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${userItem.isActive ? 'active' : 'blocked'}`}>
                                            {userItem.isActive ? 'Active' : 'Blocked'}
                                        </span>
                                    </td>
                                    <td>{formatDate(userItem.createdAt)}</td>
                                    <td>
                                        {userItem.isActive ? (
                                            <button 
                                                className="action-btn block"
                                                onClick={() => handleBlockUser(userItem.id)}
                                                title="Block User"
                                            >
                                                <i className="fas fa-ban"></i>
                                            </button>
                                        ) : (
                                            <button 
                                                className="action-btn activate"
                                                onClick={() => handleActivateUser(userItem.id)}
                                                title="Activate User"
                                            >
                                                <i className="fas fa-check-circle"></i>
                                            </button>
                                        )}
                                        {userItem.role !== 'admin' && (
                                            <button 
                                                className="action-btn delete"
                                                onClick={() => handleDeleteUser(userItem.id)}
                                                title="Delete User"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {users.length === 0 && (
                        <div className="empty-state">
                            <p>No users found</p>
                        </div>
                    )}
                </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
                <div className="admin-applications-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Job Title</th>
                                <th>Candidate</th>
                                <th>Employer</th>
                                <th>Status</th>
                                <th>Applied</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map(app => (
                                <tr key={app.id}>
                                    <td>{app.id}</td>
                                    <td><strong>{app.jobTitle}</strong></td>
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
                                    <td>{app.employerName}</td>
                                    <td>
                                        <span className={`status-badge ${app.status}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td>{formatDate(app.appliedAt)}</td>
                                    <td>
                                        <button 
                                            className="action-btn view"
                                            onClick={() => window.open(`/job/${app.jobId}`, '_blank')}
                                            title="View Job"
                                        >
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        {app.resumeUrl && (
                                            <button 
                                                className="action-btn view"
                                                onClick={() => {
                                                    const resumeUrl = app.resumeUrl.startsWith('http') 
                                                        ? app.resumeUrl 
                                                        : `https://web-production-44bcb.up.railway.app${app.resumeUrl}`;
                                                    window.open(resumeUrl, '_blank');
                                                }}
                                                title="View Resume"
                                            >
                                                <i className="fas fa-file-pdf"></i>
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {applications.length === 0 && (
                        <div className="empty-state">
                            <p>No applications found</p>
                        </div>
                    )}
                </div>
            )}

            {/* ✅ Jobs Approval Tab */}
            {activeTab === 'jobsApproval' && (
                <div className="admin-jobs-table">
                    <div className="filter-bar">
                        <label>Filter by Status: </label>
                        <select value={jobFilter} onChange={(e) => setJobFilter(e.target.value)}>
                            <option value="all">All Jobs</option>
                            <option value="pending">Pending Approval</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                    
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Employer</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Approval</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs
                                .filter(job => jobFilter === 'all' || job.approvalStatus === jobFilter)
                                .map(job => (
                                    <tr key={job.id}>
                                        <td>{job.id}</td>
                                        <td><strong>{job.title}</strong></td>
                                        <td>{job.employerName}</td>
                                        <td>{job.location}</td>
                                        <td>
                                            <span className={`status-badge ${job.isActive ? 'active' : 'inactive'}`}>
                                                {job.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`approval-badge ${job.approvalStatus}`}>
                                                {job.approvalStatus === 'pending' ? '⏳ Pending' : 
                                                 job.approvalStatus === 'approved' ? '✅ Approved' : '❌ Rejected'}
                                            </span>
                                        </td>
                                        <td>
                                            {job.approvalStatus === 'pending' && (
                                                <>
                                                    <button 
                                                        className="action-btn approve"
                                                        onClick={() => handleJobApproval(job.id, 'approved')}
                                                        title="Approve Job"
                                                    >
                                                        <i className="fas fa-check"></i>
                                                    </button>
                                                    <button 
                                                        className="action-btn reject"
                                                        onClick={() => handleJobApproval(job.id, 'rejected')}
                                                        title="Reject Job"
                                                    >
                                                        <i className="fas fa-times"></i>
                                                    </button>
                                                </>
                                            )}
                                            <button 
                                                className="action-btn view"
                                                onClick={() => window.open(`/job/${job.id}`, '_blank')}
                                                title="View Job"
                                            >
                                                <i className="fas fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {jobs.length === 0 && (
                        <div className="empty-state">
                            <p>No jobs found</p>
                        </div>
                    )}
                </div>
            )}

            {/* Candidate Details Modal */}
            {showCandidateModal && selectedCandidate && (
                <CandidateDetailsModal
                    candidate={selectedCandidate}
                    onClose={() => setShowCandidateModal(false)}
                />
            )}
        </div>
    );
};

export default AdminDashboard;