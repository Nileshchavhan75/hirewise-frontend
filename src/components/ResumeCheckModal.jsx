import React, { useState } from 'react';
import resumeService from '../services/resumeService';
import '../css/ResumeChecker.css';

const ResumeCheckModal = ({ job, onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
            setError('Please upload PDF or DOC/DOCX files only');
            setSelectedFile(null);
            setFileName('');
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            setError('File size should be less than 5MB');
            setSelectedFile(null);
            setFileName('');
            return;
        }

        setError('');
        setSelectedFile(file);
        setFileName(file.name);
        setResult(null);
    };

    const handleCheck = async () => {
        if (!selectedFile) {
            setError('Please select a resume file');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        const response = await resumeService.checkResume(selectedFile, job.id);

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
        <div className="resume-modal-overlay" onClick={onClose}>
            <div className="resume-modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>

                <div className="resume-modal-header">
                    <h2>
                        <i className="fas fa-file-alt"></i>
                        Check Resume Match
                    </h2>
                    <p>Upload your resume to see how well it matches <strong>{job?.title}</strong></p>
                </div>

                <div className="resume-modal-body">
                    {/* File Upload Area */}
                    <div className="file-upload-area">
                        <input
                            type="file"
                            id="resume-file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="resume-file" className="file-upload-label">
                            <i className="fas fa-cloud-upload-alt"></i>
                            <span>{fileName || 'Click to upload resume'}</span>
                            <small>PDF or DOC/DOCX (Max 5MB)</small>
                        </label>
                    </div>

                    {error && (
                        <div className="error-message">
                            <i className="fas fa-exclamation-circle"></i>
                            {error}
                        </div>
                    )}

                    {/* Check Button */}
                    <button 
                        className="check-btn"
                        onClick={handleCheck}
                        disabled={!selectedFile || loading}
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

                    {/* Results Section */}
                    {result && (
                        <div className="results-section">
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

                            <div className="suggestion-box">
                                <i className="fas fa-lightbulb"></i>
                                <p>{result.suggestion}</p>
                            </div>

                            {result.matchedKeywords && result.matchedKeywords.length > 0 && (
                                <div className="matched-keywords">
                                    <h4>Matched Keywords:</h4>
                                    <div className="keywords-list">
                                        {result.matchedKeywords.map((keyword, index) => (
                                            <span key={index} className="keyword-tag">
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="resume-modal-footer">
                    <button className="close-btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResumeCheckModal;