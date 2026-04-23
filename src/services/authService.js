import api from './api';
import { API_ENDPOINTS } from '../config/constants';
import storage from '../utils/storage';

class AuthService {
    async login(email, password) {
        try {
            const response = await api.post(API_ENDPOINTS.LOGIN, { email, password });
            
            if (response.data.success && response.data.data) {
                const { token, userId, email: userEmail, role, fullName } = response.data.data;
                
                // Store token and user data
                storage.setToken(token);
                storage.setUser({ userId, email: userEmail, role, fullName });
                
                return {
                    success: true,
                    user: { userId, email: userEmail, role, fullName }
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Login failed'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Login failed'
            };
        }
    }

    async register(userData) {
        try {
            const response = await api.post(API_ENDPOINTS.REGISTER, userData);
            
            if (response.data.success && response.data.data) {
                const { token, userId, email, role, fullName } = response.data.data;
                
                // Store token and user data
                storage.setToken(token);
                storage.setUser({ userId, email, role, fullName });
                
                return {
                    success: true,
                    user: { userId, email, role, fullName }
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Registration failed'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Registration failed'
            };
        }
    }

    logout() {
        storage.clearAll();
        window.location.href = '/';
    }

    getCurrentUser() {
        return storage.getUser();
    }

    isAuthenticated() {
        return storage.isAuthenticated();
    }
}

export default new AuthService();