import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import contactService from '../services/contactService';
import { validateEmail, validateRequired } from '../utils/validation';
import '../css/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [apiError, setApiError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
        if (apiError) setApiError('');
    };

    const validate = () => {
        const newErrors = {};
        if (!validateRequired(formData.name)) {
            newErrors.name = 'Name is required';
        }
        if (!validateRequired(formData.email)) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!validateRequired(formData.message)) {
            newErrors.message = 'Message is required';
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
        setApiError('');

        const result = await contactService.sendMessage(formData);
        
        if (result.success) {
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            setTimeout(() => setSubmitStatus(null), 5000);
        } else {
            setApiError(result.message || 'Failed to send message. Please try again.');
        }
        
        setIsSubmitting(false);
    };

    const contactInfo = [
        {
            icon: '📍',
            title: 'Visit Us',
            details: ['Pune, Maharashtra', 'India - 411001'],
            color: '#4158D0'
        },
        {
            icon: '📞',
            title: 'Call Us',
            details: ['+91 98765 43210', '+91 98765 43211'],
            color: '#FF6B4A'
        },
        {
            icon: '✉️',
            title: 'Email Us',
            details: ['support@hirewise.com', 'hr@hirewise.com'],
            color: '#2A9D8F'
        },
        {
            icon: '⏰',
            title: 'Business Hours',
            details: ['Mon - Sat: 9:00 AM - 7:00 PM', 'Sun: Closed'],
            color: '#9C89B8'
        }
    ];

    return (
        <div className="contact-page">
            {/* Hero Section - Keep your existing hero */}
            
            {/* Contact Info Cards - Keep your existing cards */}
            
            {/* Map & Form Section */}
            <section className="contact-main">
                <div className="contact-container">
                    <div className="map-wrapper">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.7090748699!2d73.69815040000001!3d18.52487045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1709876543210!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="HireWise Location"
                        ></iframe>
                    </div>

                    <div className="form-wrapper">
                        <h2>Send us a Message</h2>
                        
                        {submitStatus === 'success' && (
                            <div className="success-message">
                                <i className="fas fa-check-circle"></i>
                                <div>
                                    <h4>Message Sent!</h4>
                                    <p>We'll get back to you within 24 hours.</p>
                                </div>
                            </div>
                        )}

                        {apiError && (
                            <div className="error-message">
                                <i className="fas fa-exclamation-circle"></i>
                                <p>{apiError}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Your Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={errors.name ? 'error' : ''}
                                        placeholder="Enter your full name"
                                        disabled={isSubmitting}
                                    />
                                    {errors.name && <span className="error-message">{errors.name}</span>}
                                </div>
                                <div className="form-group">
                                    <label>Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={errors.email ? 'error' : ''}
                                        placeholder="you@example.com"
                                        disabled={isSubmitting}
                                    />
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="What is this about?"
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label>Your Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={errors.message ? 'error' : ''}
                                    placeholder="Write your message here..."
                                    rows="6"
                                    disabled={isSubmitting}
                                ></textarea>
                                {errors.message && <span className="error-message">{errors.message}</span>}
                            </div>

                            <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-paper-plane"></i>
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Keep your existing sections: Social Connect, FAQ Teaser, CTA */}
        </div>
    );
};

export default Contact;