import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { getValidationErrors } from '../utils/validation';
import '../css/Auth.css';

const Register = () => {
    const navigate = useNavigate();
    const { register, loading } = useAuthContext();
    const [userType, setUserType] = useState('candidate');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        location: '',
        companyName: '',
        acceptTerms: false
    });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
        if (apiError) setApiError('');
    };

    const handleUserTypeChange = (type) => {
        setUserType(type);
        if (type === 'candidate') {
            setFormData({ ...formData, companyName: '' });
        }
    };

    const validate = () => {
        const rules = {
            fullName: { required: true, minLength: 2 },
            email: { required: true, email: true },
            password: { required: true, minLength: 6 },
            confirmPassword: { required: true, match: 'password' },
            acceptTerms: { required: true }
        };
        
        if (userType === 'employer') {
            rules.companyName = { required: true };
        }
        
        return getValidationErrors(formData, rules);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Prepare data for API
        const userData = {
            email: formData.email,
            password: formData.password,
            fullName: formData.fullName,
            phone: formData.phone || undefined,
            location: formData.location || undefined,
            role: userType,
            companyName: userType === 'employer' ? formData.companyName : undefined
        };

        const result = await register(userData);
        
        if (result.success) {
            navigate('/login?registered=true');
        } else {
            setApiError(result.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h2>Create Account</h2>
                        <p>Join HireWise today</p>
                    </div>

                    {apiError && (
                        <div className="alert alert-error">
                            <i className="fas fa-exclamation-circle"></i>
                            {apiError}
                        </div>
                    )}

                    <div className="user-type-toggle">
                        <button
                            type="button"
                            className={userType === 'candidate' ? 'active' : ''}
                            onClick={() => handleUserTypeChange('candidate')}
                            disabled={loading}
                        >
                            <i className="fas fa-user-graduate"></i>
                            Candidate
                        </button>
                        <button
                            type="button"
                            className={userType === 'employer' ? 'active' : ''}
                            onClick={() => handleUserTypeChange('employer')}
                            disabled={loading}
                        >
                            <i className="fas fa-building"></i>
                            Employer
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name *</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className={errors.fullName ? 'error' : ''}
                                disabled={loading}
                            />
                            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className={errors.email ? 'error' : ''}
                                disabled={loading}
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="9876543210"
                                    className={errors.phone ? 'error' : ''}
                                    disabled={loading}
                                />
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Pune, India"
                                    className={errors.location ? 'error' : ''}
                                    disabled={loading}
                                />
                                {errors.location && <span className="error-message">{errors.location}</span>}
                            </div>
                        </div>

                        {userType === 'employer' && (
                            <div className="form-group">
                                <label htmlFor="companyName">Company Name *</label>
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="Your Company Name"
                                    className={errors.companyName ? 'error' : ''}
                                    disabled={loading}
                                />
                                {errors.companyName && <span className="error-message">{errors.companyName}</span>}
                            </div>
                        )}

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="password">Password *</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className={errors.password ? 'error' : ''}
                                    disabled={loading}
                                />
                                {errors.password && <span className="error-message">{errors.password}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password *</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className={errors.confirmPassword ? 'error' : ''}
                                    disabled={loading}
                                />
                                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                            </div>
                        </div>

                        <div className="form-group terms">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    name="acceptTerms"
                                    checked={formData.acceptTerms}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                <span>I accept the <Link to="/terms">Terms and Conditions</Link> *</span>
                            </label>
                            {errors.acceptTerms && <span className="error-message">{errors.acceptTerms}</span>}
                        </div>

                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    Creating Account...
                                </>
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>or sign up with</span>
                    </div>

                    <div className="social-login">
                        <button className="social-btn google" disabled={loading}>
                            <i className="fab fa-google"></i>
                            Google
                        </button>
                        <button className="social-btn linkedin" disabled={loading}>
                            <i className="fab fa-linkedin-in"></i>
                            LinkedIn
                        </button>
                    </div>

                    <p className="auth-footer">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;