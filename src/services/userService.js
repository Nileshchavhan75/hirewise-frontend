import api from './api';
import { API_ENDPOINTS } from '../config/constants';

class UserService {
    async getUserProfile(userId) {
        try {
            const response = await api.get(API_ENDPOINTS.USER_PROFILE(userId));
            
            if (response.data.success) {
                return {
                    success: true,
                    data: response.data.data
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Failed to fetch profile'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to fetch profile'
            };
        }
    }

    async getUserByEmail(email) {
        try {
            const response = await api.get(API_ENDPOINTS.USER_BY_EMAIL(email));
            
            if (response.data.success) {
                return {
                    success: true,
                    data: response.data.data
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Failed to fetch user'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to fetch user'
            };
        }
    }

    async updateProfile(userId, profileData) {
        try {
            const response = await api.put(API_ENDPOINTS.UPDATE_PROFILE(userId), profileData);
            
            if (response.data.success) {
                return {
                    success: true,
                    data: response.data.data,
                    message: response.data.message || 'Profile updated successfully'
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Failed to update profile'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to update profile'
            };
        }
    }

    async userExists(userId) {
        try {
            const response = await api.get(`${API_ENDPOINTS.USERS}/${userId}/exists`);
            
            if (response.data.success) {
                return {
                    success: true,
                    data: response.data.data
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Failed to check user'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to check user'
            };
        }
    }
}

export default new UserService();