import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import userService from '../services/userService';
import '../css/CandidateProfile.css';

const CandidateProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState({
        fullName: '',
        phone: '',
        location: '',
        bio: '',
        resumeUrl: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

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
        loadProfile(currentUser.userId);
    }, []);

    const loadProfile = async (userId) => {
        const result = await userService.getUserProfile(userId);
        if (result.success && result.data) {
            setProfile({
                fullName: result.data.fullName || user?.name || '',
                phone: result.data.phone || '',
                location: result.data.location || '',
                bio: result.data.bio || '',
                resumeUrl: result.data.resumeUrl || ''
            });
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        // Ensure fullName is never empty (backend requires it)
        const profileData = {
            fullName: profile.fullName || user?.name || 'Candidate',
            phone: profile.phone || '',
            location: profile.location || '',
            bio: profile.bio || '',
            resumeUrl: profile.resumeUrl || ''
        };

        console.log('Sending to backend:', profileData);
        
        const result = await userService.updateProfile(user.userId, profileData);
        
        if (result.success) {
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            loadProfile(user.userId);
        } else {
            setMessage({ type: 'error', text: result.message || 'Failed to update profile' });
        }
        
        setSaving(false);
        setTimeout(() => setMessage(''), 3000);
    };

    if (loading) {
        return (
            <div className="profile-page">
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <h1>
                        <i className="fas fa-user-circle"></i>
                        My Profile
                    </h1>
                    <p>Update your personal and professional information</p>
                </div>

                {message && (
                    <div className={`message ${message.type}`}>
                        <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-section">
                        <h2>Personal Information</h2>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={profile.fullName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={profile.location}
                                    onChange={handleChange}
                                    placeholder="Pune, India"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Professional Information</h2>
                        <div className="form-group">
                            <label>Bio / About Me</label>
                            <textarea
                                name="bio"
                                rows="4"
                                value={profile.bio}
                                onChange={handleChange}
                                placeholder="Tell us about yourself, your skills, and career goals..."
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h2>Resume</h2>
                        <div className="form-group">
                            <label>Resume URL (Google Drive/Dropbox link)</label>
                            <input
                                type="url"
                                name="resumeUrl"
                                value={profile.resumeUrl}
                                onChange={handleChange}
                                placeholder="https://drive.google.com/your-resume.pdf"
                            />
                        </div>
                        {profile.resumeUrl && (
                            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="resume-link">
                                <i className="fas fa-file-pdf"></i> View Current Resume
                            </a>
                        )}
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="save-btn" disabled={saving}>
                            {saving ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-save"></i>
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CandidateProfile;