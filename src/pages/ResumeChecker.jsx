import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jobService from '../services/jobService';
import resumeService from '../services/resumeService';
import '../css/ResumeChecker.css';

const ResumeChecker = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        const response = await jobService.getAllJobs(0, 50);
        if (response.success) {
            setJobs(response.data?.content || []);
        }
    };

    const handleJobSelect = (e) => {
        setSelectedJobId(e.target.value);
        setResult(null);
        setError('');
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
            setError('Please upload PDF or DOC/DOCX files only');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('File size should be less than 5MB');
            return;
        }

        setError('');
        setSelectedFile(file);
        setFileName(file.name);
        setResult(null);
    };

    const handleCheck = async () => {
        if (!selectedJobId) {
            setError('Please select a job');
            return;
        }
        if (!selectedFile) {
            setError('Please select a resume file');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        const response = await resumeService.checkResume(selectedFile, selectedJobId);

        if (response.success) {
            setResult(response.data);
        } else {
            setError(response.message || 'Failed to check resume');
        }

        setLoading(false);
    };

    const getScoreColor = (score) => {
        if (score >= 80) return '#2ecc71';
        if (score >= 60) return '#f1c40f';
        if (score >= 40) return '#e67e22';
        return '#e74c3c';
    };

    const getScoreMessage = (score) => {
        if (score >= 80) return 'Excellent Match!';
        if (score >= 60) return 'Good Match';
        if (score >= 40) return 'Average Match';
        return 'Low Match';
    };

    return (
        <div className="resume-checker-page">
            <div className="checker-container">
                <div className="checker-header">
                    <h1>
                        <i className="fas fa-file-alt"></i>
                        Resume ATS Checker
                    </h1>
                    <p>Upload your resume and check how well it matches with job requirements</p>
                </div>

                <div className="checker-form">
                    {/* Job Selection */}
                    <div className="form-group">
                        <label>Select Job Position</label>
                        <select value={selectedJobId} onChange={handleJobSelect}>
                            <option value="">-- Select a job --</option>
                            {jobs.map(job => (
                                <option key={job.id} value={job.id}>
                                    {job.title} - {job.location}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* File Upload */}
                    <div className="form-group">
                        <label>Upload Resume</label>
                        <div className="file-input-wrapper">
                            <input
                                type="file"
                                id="resume-file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileSelect}
                            />
                            <label htmlFor="resume-file" className="file-label">
                                <i className="fas fa-cloud-upload-alt"></i>
                                {fileName || 'Choose your resume file'}
                            </label>
                        </div>
                        <small>Supported formats: PDF, DOC, DOCX (Max 5MB)</small>
                    </div>

                    {error && (
                        <div className="error-message">
                            <i className="fas fa-exclamation-circle"></i>
                            {error}
                        </div>
                    )}

                    <button 
                        className="check-btn"
                        onClick={handleCheck}
                        disabled={!selectedJobId || !selectedFile || loading}
                    >
                        {loading ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i>
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-chart-line"></i>
                                Check Match
                            </>
                        )}
                    </button>

                    {/* Results */}
                    {result && (
                        <div className="results-card">
                            <div className="score-section">
                                <div className="score-circle">
                                    <svg viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" />
                                        <circle 
                                            cx="50" 
                                            cy="50" 
                                            r="45" 
                                            stroke={getScoreColor(result.score)}
                                            strokeDasharray={`${(result.score / 100) * 283} 283`}
                                        />
                                    </svg>
                                    <div className="score-text">
                                        <span className="score-value">{result.score}%</span>
                                        <span className="score-label">{getScoreMessage(result.score)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="suggestion-box">
                                <i className="fas fa-lightbulb"></i>
                                <p>{result.suggestion}</p>
                            </div>

                            {result.matchedKeywords && result.matchedKeywords.length > 0 && (
                                <div className="keywords-section">
                                    <h4>Keywords Found:</h4>
                                    <div className="keywords-list">
                                        {result.matchedKeywords.map((keyword, index) => (
                                            <span key={index} className="keyword-badge">
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeChecker;