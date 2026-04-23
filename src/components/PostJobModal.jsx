import React, { useState } from 'react';
import jobService from '../services/jobService';
import '../css/PostJobModal.css';

const PostJobModal = ({ onClose, onSubmit, employerId }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        jobType: 'permanent',
        sector: 'it',
        subSector: '',
        experienceRange: '',
        salaryRange: '',
        applicationDeadline: '',
        vacancyCount: 1,
        requirements: '',
        benefits: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error for this field
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validate = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) {
            newErrors.title = 'Job title is required';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Job description is required';
        }
        if (!formData.location.trim()) {
            newErrors.location = 'Location is required';
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
        
        const result = await jobService.postJob(formData, employerId);
        
        if (result.success) {
            onSubmit(result.data);
            onClose();
        } else {
            alert(result.message || 'Failed to post job');
        }
        
        setIsSubmitting(false);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content post-job-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Post New Job</h2>
                    <button className="modal-close-btn" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="post-job-form">
                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>Job Title <span className="required">*</span></label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Senior Full Stack Developer"
                                className={errors.title ? 'error' : ''}
                            />
                            {errors.title && <span className="error-message">{errors.title}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>Job Description <span className="required">*</span></label>
                            <textarea
                                name="description"
                                rows="5"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the role, responsibilities, and ideal candidate..."
                                className={errors.description ? 'error' : ''}
                            ></textarea>
                            {errors.description && <span className="error-message">{errors.description}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Location <span className="required">*</span></label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Pune, Mumbai, Bangalore"
                                className={errors.location ? 'error' : ''}
                            />
                            {errors.location && <span className="error-message">{errors.location}</span>}
                        </div>

                        <div className="form-group">
                            <label>Job Type</label>
                            <select name="jobType" value={formData.jobType} onChange={handleChange}>
                                <option value="permanent">Permanent</option>
                                <option value="contract">Contract</option>
                                <option value="intern">Internship</option>
                                <option value="bulk">Bulk Hiring</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Sector</label>
                            <select name="sector" value={formData.sector} onChange={handleChange}>
                                <option value="it">IT</option>
                                <option value="non_it">Non-IT</option>
                                <option value="international">International</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Sub-Sector</label>
                            <input
                                type="text"
                                name="subSector"
                                value={formData.subSector}
                                onChange={handleChange}
                                placeholder="e.g. Software Development, HR, Marketing"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Experience Range</label>
                            <input
                                type="text"
                                name="experienceRange"
                                value={formData.experienceRange}
                                onChange={handleChange}
                                placeholder="e.g. 3-5 years"
                            />
                        </div>

                        <div className="form-group">
                            <label>Salary Range</label>
                            <input
                                type="text"
                                name="salaryRange"
                                value={formData.salaryRange}
                                onChange={handleChange}
                                placeholder="e.g. ₹8-12 LPA"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Vacancy Count</label>
                            <input
                                type="number"
                                name="vacancyCount"
                                min="1"
                                value={formData.vacancyCount}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Application Deadline</label>
                            <input
                                type="date"
                                name="applicationDeadline"
                                value={formData.applicationDeadline}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>Requirements</label>
                            <textarea
                                name="requirements"
                                rows="3"
                                value={formData.requirements}
                                onChange={handleChange}
                                placeholder="List key requirements (comma separated)"
                            ></textarea>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>Benefits</label>
                            <textarea
                                name="benefits"
                                rows="3"
                                value={formData.benefits}
                                onChange={handleChange}
                                placeholder="List benefits (comma separated)"
                            ></textarea>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    Posting...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-plus-circle"></i>
                                    Post Job
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostJobModal;