console.log('ENV VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('All env vars:', import.meta.env);
// API Base URL
export const API_BASE_URL = 'https://web-production-44bcb.up.railway.app/api';

// API Endpoints
export const API_ENDPOINTS = {
    // Auth
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    
    // Jobs
    JOBS: '/jobs',
    JOB_BY_ID: (id) => `/jobs/${id}`,
    JOBS_SEARCH: '/jobs/search',
    JOBS_BY_EMPLOYER: (id) => `/jobs/employer/${id}`,
    
    // Applications
    APPLICATIONS: '/applications',
    APPLY_JOB: '/applications/apply',
    CANDIDATE_APPLICATIONS: (id) => `/applications/candidate/${id}`,
    JOB_APPLICATIONS: (id) => `/applications/job/${id}`,
    EMPLOYER_APPLICATIONS: (id) => `/applications/employer/${id}`,
    UPDATE_APPLICATION_STATUS: (id) => `/applications/${id}/status`,
    
    // Users
    USER_PROFILE: (id) => `/users/${id}`,
    USER_BY_EMAIL: (email) => `/users/email/${email}`,
    UPDATE_PROFILE: (id) => `/users/${id}`,
    
    // Employer Requirements
    SUBMIT_REQUIREMENT: '/employer-requirements/submit',
    
    // Resume Submissions
    SUBMIT_RESUME: '/resume-submissions/submit',
    
    // Contact
    CONTACT: '/contact',
    
    // Dashboard
    ADMIN_DASHBOARD: '/dashboard/admin',
    EMPLOYER_DASHBOARD: (id) => `/dashboard/employer/${id}`,
    CANDIDATE_DASHBOARD: (id) => `/dashboard/candidate/${id}`,
    
    // Health
    HEALTH: '/health'
};

// Local Storage Keys
export const STORAGE_KEYS = {
    TOKEN: 'hirewise_token',
    USER: 'hirewise_user',
    THEME: 'hirewise_theme'
};

// HTTP Status Codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500
};