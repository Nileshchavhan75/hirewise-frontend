import React, { useState, useRef } from 'react';
import uploadService from '../services/uploadService';
import '../css/ApplyModal.css';

const ApplyModal = ({ job, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        coverLetter: '',
        resumeUrl: '',
        agreeTerms: false
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        // If user enters URL, clear selected file
        if (name === 'resumeUrl' && value) {
            setSelectedFile(null);
            setFileName('');
        }
        
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        
        // Clear error for this field
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
        // Clear resume error if any
        if (errors.resume) {
            setErrors({ ...errors, resume: '' });
        }
    };

   const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
        setErrors({
            ...errors,
            file: 'Please upload PDF or DOC/DOCX files only'
        });
        return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        setErrors({
            ...errors,
            file: 'File size should be less than 5MB'
        });
        return;
    }

    setSelectedFile(file);
    setFileName(file.name);
    setErrors({ ...errors, file: '', resume: '' });
    
    // AUTO UPLOAD - Start uploading immediately
    setUploading(true);
    setUploadProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
        setUploadProgress(prev => {
            if (prev >= 90) {
                clearInterval(interval);
                return 90;
            }
            return prev + 10;
        });
    }, 300);

    const result = await uploadService.uploadResume(file);
    
    clearInterval(interval);
    
    if (result.success) {
        setUploadProgress(100);
        setFormData({
            ...formData,
            resumeUrl: result.url
        });
        setTimeout(() => {
            setUploading(false);
            setUploadProgress(0);
        }, 500);
    } else {
        setUploadProgress(0);
        setUploading(false);
        setErrors({
            ...errors,
            file: result.message || 'Upload failed'
        });
    }
};

    const handleUpload = async () => {
        if (!selectedFile) {
            setErrors({ ...errors, file: 'Please select a file first' });
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        // Simulate progress
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 90) {
                    clearInterval(interval);
                    return 90;
                }
                return prev + 10;
            });
        }, 300);

        const result = await uploadService.uploadResume(selectedFile);
        
        clearInterval(interval);
        
        if (result.success) {
            setUploadProgress(100);
            setFormData({
                ...formData,
                resumeUrl: result.url
            });
            setTimeout(() => {
                setUploading(false);
                setUploadProgress(0);
            }, 500);
        } else {
            setUploadProgress(0);
            setUploading(false);
            setErrors({
                ...errors,
                file: result.message || 'Upload failed'
            });
        }
    };

    const validate = () => {
    const newErrors = {};
    
    // Check cover letter
    if (!formData.coverLetter.trim()) {
        newErrors.coverLetter = 'Cover letter is required';
    }
    
    // Check if file is uploaded (resumeUrl exists) OR URL is provided
    const hasResume = formData.resumeUrl.trim() !== '';
    if (!hasResume) {
        newErrors.resume = 'Please upload file or provide a link';
    }
    
    // Check terms
    if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'You must agree to the terms';
    }
    
    return newErrors;
};

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

    setIsSubmitting(true);
    
    // If file is selected but not uploaded yet, wait for upload
    if (selectedFile && !formData.resumeUrl) {
        await handleUpload();
    }
    
    // Double check we have resume URL before submitting
    if (formData.resumeUrl) {
        onSubmit(formData);
    } else {
        setErrors({
            ...errors,
            resume: 'Please wait for upload to complete'
        });
        setIsSubmitting(false);
    }
};

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const removeFile = () => {
        setSelectedFile(null);
        setFileName('');
        setFormData({
            ...formData,
            resumeUrl: ''
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        // Clear resume error
        if (errors.resume) {
            setErrors({ ...errors, resume: '' });
        }
    };

    return (
        <div className="apply-modal-overlay" onClick={onClose}>
            <div className="apply-modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>

                <div className="modal-header">
                    <h2>Apply for Position</h2>
                    <p className="job-title-preview">
                        Applying for: <strong>{job?.title}</strong>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="apply-form">
                    {/* Cover Letter */}
                    <div className="form-group">
                        <label htmlFor="coverLetter">
                            Cover Letter <span className="required">*</span>
                        </label>
                        <textarea
                            id="coverLetter"
                            name="coverLetter"
                            rows="6"
                            placeholder="Explain why you're the best candidate for this position..."
                            value={formData.coverLetter}
                            onChange={handleChange}
                            className={errors.coverLetter ? 'error' : ''}
                            disabled={isSubmitting || uploading}
                        ></textarea>
                        {errors.coverLetter && (
                            <span className="error-message">
                                <i className="fas fa-exclamation-circle"></i>
                                {errors.coverLetter}
                            </span>
                        )}
                    </div>

                    {/* File Upload Section */}
                    <div className="form-group">
                        <label>
                            Resume <span className="required">*</span>
                        </label>
                        
                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            style={{ display: 'none' }}
                        />

                        {/* Upload Button */}
                        {!selectedFile && !formData.resumeUrl && (
                            <button 
                                type="button" 
                                className="upload-btn"
                                onClick={triggerFileInput}
                                disabled={uploading}
                            >
                                <i className="fas fa-cloud-upload-alt"></i>
                                Choose Resume File
                            </button>
                        )}

                        {/* Selected File Info */}
                        {selectedFile && !formData.resumeUrl && (
                            <div className="file-info">
                                <div className="file-details">
                                    <i className="fas fa-file-pdf"></i>
                                    <span className="file-name">{fileName}</span>
                                    <span className="file-size">
                                        ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                                    </span>
                                </div>
                                
                                {uploadProgress > 0 && uploadProgress < 100 && (
                                    <div className="upload-progress">
                                        <div 
                                            className="progress-bar" 
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                        <span className="progress-text">{uploadProgress}%</span>
                                    </div>
                                )}
                                
                                <div className="file-actions">
                                    {!uploading && (
                                        <>
                                            <button 
                                                type="button" 
                                                className="upload-file-btn"
                                                onClick={handleUpload}
                                            >
                                                <i className="fas fa-upload"></i>
                                                Upload
                                            </button>
                                            <button 
                                                type="button" 
                                                className="remove-file-btn"
                                                onClick={removeFile}
                                            >
                                                <i className="fas fa-times"></i>
                                                Remove
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Uploaded File URL */}
                        {formData.resumeUrl && (
                            <div className="uploaded-file-info">
                                <i className="fas fa-check-circle"></i>
                                <span>File uploaded successfully!</span>
                                <a 
                                    href={formData.resumeUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="view-file-link"
                                >
                                    View File
                                </a>
                                <button 
                                    type="button" 
                                    className="remove-file-btn small"
                                    onClick={removeFile}
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        )}

                        {/* OR Divider */}
                        {!selectedFile && !formData.resumeUrl && (
                            <div className="or-divider">
                                <span>OR</span>
                            </div>
                        )}

                        {/* Resume URL Input */}
                        {!selectedFile && !formData.resumeUrl && (
                            <div className="url-input-group">
                                <i className="fas fa-link input-icon"></i>
                                <input
                                    type="url"
                                    name="resumeUrl"
                                    placeholder="Paste Google Drive/Dropbox link"
                                    value={formData.resumeUrl}
                                    onChange={handleChange}
                                    className={errors.resume ? 'error' : ''}
                                    disabled={isSubmitting}
                                />
                            </div>
                        )}

                        {errors.resume && (
                            <span className="error-message">
                                <i className="fas fa-exclamation-circle"></i>
                                {errors.resume}
                            </span>
                        )}
                        
                        <small className="hint">
                            <i className="fas fa-info-circle"></i>
                            Max file size: 5MB (PDF, DOC, DOCX) or provide a cloud storage link
                        </small>
                    </div>

                    {/* Terms Agreement */}
                    <div className="form-group terms-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="agreeTerms"
                                checked={formData.agreeTerms}
                                onChange={handleChange}
                                disabled={isSubmitting || uploading}
                            />
                            <span>
                                I confirm that the information provided is accurate and I agree to the 
                                <a href="/terms" target="_blank"> Terms of Service </a> 
                                and <a href="/privacy" target="_blank"> Privacy Policy </a>
                                <span className="required">*</span>
                            </span>
                        </label>
                        {errors.agreeTerms && (
                            <span className="error-message">
                                <i className="fas fa-exclamation-circle"></i>
                                {errors.agreeTerms}
                            </span>
                        )}
                    </div>

                    {/* Submit Buttons */}
                    <div className="modal-actions">
                        <button 
                            type="button" 
                            className="cancel-btn" 
                            onClick={onClose}
                            disabled={isSubmitting || uploading}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="submit-btn"
                            disabled={isSubmitting || uploading}
                        >
                            {isSubmitting || uploading ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    {uploading ? 'Uploading...' : 'Submitting...'}
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-paper-plane"></i>
                                    Submit Application
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyModal;