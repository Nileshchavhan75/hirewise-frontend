import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { validateEmail, validateRequired } from '../utils/validation';
import '../css/Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const { login, loading } = useAuthContext();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
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

    const validate = () => {
        const newErrors = {};
        if (!validateRequired(formData.email)) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!validateRequired(formData.password)) {
            newErrors.password = 'Password is required';
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

        const result = await login(formData.email, formData.password);
        
        if (result.success) {
            // Redirect based on role
            const { role } = result.user;
            if (role === 'candidate') {
                navigate('/candidates');
            } else if (role === 'employer') {
                navigate('/employers');
            } else if (role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/');
            }
        } else {
            setApiError(result.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h2>Welcome Back</h2>
                        <p>Sign in to your account</p>
                    </div>

                    {apiError && (
                        <div className="alert alert-error">
                            <i className="fas fa-exclamation-circle"></i>
                            {apiError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
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

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
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

                        <div className="form-options">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                <span>Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
                        </div>

                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>or continue with</span>
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
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;