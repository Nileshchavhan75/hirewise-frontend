import axios from 'axios';
import { API_BASE_URL } from '../config/constants';
import storage from '../utils/storage';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds
});

// Request interceptor - add token
api.interceptors.request.use(
    (config) => {
        const token = storage.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Server responded with error
            const { status, data } = error.response;
            
            // Handle 401 Unauthorized
            if (status === 401) {
                storage.clearAll();
                window.location.href = '/login';
            }
            
            // Handle 403 Forbidden
            if (status === 403) {
                console.error('Access denied');
            }
            
            // Handle 404 Not Found
            if (status === 404) {
                console.error('Resource not found');
            }
            
            // Handle 409 Conflict
            if (status === 409) {
                console.error('Duplicate entry');
            }
            
            // Handle 500 Server Error
            if (status >= 500) {
                console.error('Server error');
            }
            
            // Return error with message
            return Promise.reject({
                status,
                message: data?.message || 'An error occurred',
                errors: data?.errors,
                data: data?.data
            });
        } else if (error.request) {
            // Request made but no response
            return Promise.reject({
                message: 'Cannot connect to server. Please check your internet connection.'
            });
        } else {
            // Something else happened
            return Promise.reject({
                message: error.message || 'An unexpected error occurred'
            });
        }
    }
);

export default api;