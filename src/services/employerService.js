import api from './api';
import { API_ENDPOINTS } from '../config/constants';

class EmployerService {
    async submitRequirement(requirementData) {
        try {
            const response = await api.post(API_ENDPOINTS.SUBMIT_REQUIREMENT, requirementData);
            
            if (response.data.success) {
                return {
                    success: true,
                    data: response.data.data,
                    message: response.data.message || 'Requirement submitted successfully'
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Failed to submit requirement'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to submit requirement'
            };
        }
    }
}

export default new EmployerService();