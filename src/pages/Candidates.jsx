import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jobService from '../services/jobService';
import { formatDate, formatSalary, getJobTypeColor, truncateText } from '../utils/helpers';
import '../css/Candidates.css';

const Candidates = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [selectedExperience, setSelectedExperience] = useState('all');
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    // Helper to determine job category for corner badge
    const getJobCategory = (job) => {
        // Use job.sector if available, otherwise infer from location/jobType
        if (job.sector) {
            if (job.sector === 'it') return { label: 'IT', color: '#4158D0' };
            if (job.sector === 'non_it') return { label: 'Non-IT', color: '#11998e' };
            if (job.sector === 'international') return { label: 'International', color: '#FF512F' };
        }
        // Fallback: check location
        if (job.location?.toLowerCase().includes('international')) 
            return { label: 'International', color: '#FF512F' };
        if (job.jobType?.toLowerCase().includes('it')) 
            return { label: 'IT', color: '#4158D0' };
        return { label: 'General', color: '#999' };
    };

    // Load unfiltered jobs (pagination)
    const loadJobs = async () => {
        setLoading(true);
        const result = await jobService.getAllJobs(page, 10);
        if (result.success) {
            if (page === 0) setJobs(result.data.content || []);
            else setJobs(prev => [...prev, ...(result.data.content || [])]);
            setHasMore(!result.data.last);
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    // Search jobs with filters
    const handleSearch = async () => {
        setPage(0);
        setLoading(true);
        const searchParams = {
            keyword: searchTerm,
            sector: activeTab !== 'all' ? activeTab : undefined,
            location: selectedLocation !== 'all' ? selectedLocation : undefined,
            experience: selectedExperience !== 'all' ? selectedExperience : undefined
        };
        const result = await jobService.searchJobs(searchParams);
        if (result.success) {
            setJobs(result.data || []);
            setHasMore(false);
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    // Reset everything and load all jobs (for "All Jobs" button)
    const resetToAllJobs = () => {
        setSearchTerm('');
        setActiveTab('all');
        setSelectedLocation('all');
        setSelectedExperience('all');
        setPage(0);
        // Clear any existing search results and reload from scratch
        setJobs([]);
        loadJobs();
    };

    // Decide whether to use search or paginated load
    useEffect(() => {
        const isFilterActive = 
            searchTerm !== '' || 
            activeTab !== 'all' || 
            selectedLocation !== 'all' || 
            selectedExperience !== 'all';
        
        if (isFilterActive) {
            const delay = setTimeout(() => {
                handleSearch();
            }, 500);
            return () => clearTimeout(delay);
        } else {
            // No filters: use paginated load (only on page change)
            loadJobs();
        }
    }, [searchTerm, activeTab, selectedLocation, selectedExperience, page]);

    // When page changes while filters are active, do not call loadJobs (search has no pagination)
    // But we keep the useEffect as above – it will call handleSearch if filters active, else loadJobs.

    const loadMore = () => {
        if (hasMore && !loading && activeTab === 'all' && !searchTerm && selectedLocation === 'all' && selectedExperience === 'all') {
            setPage(prev => prev + 1);
        }
    };

    const jobCategories = [
        { id: 'all', name: 'All Jobs', icon: '📋' },
        { id: 'it', name: 'IT Jobs', icon: '💻' },
        { id: 'non_it', name: 'Non-IT Jobs', icon: '📊' },
        { id: 'international', name: 'International', icon: '🌍' }
    ];

    return (
        <div className="candidates-page">
            {/* Hero Section - Keep your existing hero code */}

            {/* Quick Actions - Keep your existing actions */}

            {/* Job Search Section */}
            <section className="job-search-section">
                <div className="search-container">
                    <div className="section-header">
                        <h2>Find Your Perfect Job</h2>
                        <p>Search through thousands of opportunities</p>
                    </div>

                    {/* Search Bar */}
                    <div className="search-bar">
                        <i className="fas fa-search search-icon"></i>
                        <input 
                            type="text" 
                            placeholder="Search by job title or company..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Filters */}
                    <div className="filters-section">
                        <div className="category-tabs">
                            {jobCategories.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`cat-tab ${activeTab === cat.id ? 'active' : ''}`}
                                    onClick={() => {
                                        if (cat.id === 'all') {
                                            resetToAllJobs();   // ✅ FIX: properly reset everything
                                        } else {
                                            setActiveTab(cat.id);
                                        }
                                    }}
                                >
                                    <span className="cat-icon">{cat.icon}</span>
                                    <span className="cat-name">{cat.name}</span>
                                </button>
                            ))}
                        </div>

                        <div className="filter-options">
                            <select 
                                className="filter-select"
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                            >
                                <option value="all">All Locations</option>
                                <option value="India">India</option>
                                <option value="international">International</option>
                            </select>

                            <select 
                                className="filter-select"
                                value={selectedExperience}
                                onChange={(e) => setSelectedExperience(e.target.value)}
                            >
                                <option value="all">All Experience</option>
                                <option value="fresher">Fresher (0-1 years)</option>
                                <option value="experienced">Experienced (2+ years)</option>
                            </select>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="error-message">
                            <i className="fas fa-exclamation-circle"></i>
                            {error}
                        </div>
                    )}

                    {/* Jobs Grid */}
                    <div className="jobs-grid">
                        {jobs.map(job => {
                            const category = getJobCategory(job);
                            return (
                                <div key={job.id} className="job-card" style={{ borderTop: `4px solid ${getJobTypeColor(job.jobType)}`, position: 'relative' }}>
                                    {/* ✅ Corner Badge */}
                                    <div className="corner-badge" style={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        background: category.color,
                                        color: 'white',
                                        padding: '4px 10px',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        zIndex: 1,
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}>
                                        {category.label}
                                    </div>

                                    <div className="job-header">
                                        <div className="job-title-section">
                                            <h3>{job.title}</h3>
                                            <p className="job-company">{job.companyName || job.postedByName}</p>
                                        </div>
                                    </div>

                                    <div className="job-tags">
                                        <span className="job-tag">
                                            <i className="fas fa-map-marker-alt"></i>
                                            {job.location}
                                        </span>
                                        <span className="job-tag">
                                            <i className="fas fa-briefcase"></i>
                                            {job.jobType}
                                        </span>
                                        {job.experienceRange && (
                                            <span className="job-tag">
                                                <i className="fas fa-clock"></i>
                                                {job.experienceRange}
                                            </span>
                                        )}
                                        {job.salaryRange && (
                                            <span className="job-tag">
                                                <i className="fas fa-money-bill-wave"></i>
                                                {job.salaryRange}
                                            </span>
                                        )}
                                    </div>

                                    <p className="job-description">{truncateText(job.description, 120)}</p>

                                    {job.requirements && (
                                        <div className="job-requirements">
                                            <span className="requirement-tag">
                                                {truncateText(job.requirements, 50)}
                                            </span>
                                        </div>
                                    )}

                                    <div className="job-footer">
                                        <div className="job-meta">
                                            <span className="posted-date">
                                                <i className="far fa-clock"></i>
                                                Posted: {formatDate(job.createdAt)}
                                            </span>
                                            {job.applicationCount > 0 && (
                                                <span className="applicants">
                                                    <i className="fas fa-users"></i>
                                                    {job.applicationCount} applicants
                                                </span>
                                            )}
                                        </div>
                                        <Link to={`/job/${job.id}`} className="apply-btn">
                                            View Details
                                            <i className="fas fa-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {!loading && jobs.length === 0 && (
                        <div className="no-jobs">
                            <i className="fas fa-search"></i>
                            <h3>No jobs found</h3>
                            <p>Try adjusting your search criteria</p>
                        </div>
                    )}

                    {loading && (
                        <div className="loading-spinner">
                            <i className="fas fa-spinner fa-spin"></i>
                            Loading jobs...
                        </div>
                    )}

                    {hasMore && !loading && jobs.length > 0 && activeTab === 'all' && !searchTerm && selectedLocation === 'all' && selectedExperience === 'all' && (
                        <div className="load-more">
                            <button className="load-more-btn" onClick={loadMore}>
                                Load More Jobs
                                <i className="fas fa-arrow-down"></i>
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Keep your existing sections: Career Resources, International Spotlight, Success Stories, CTA */}
        </div>
    );
};

export default Candidates;