import api from './api';

class ContactService {
    async sendMessage(contactData) {
        try {
            // Note: You need to create this endpoint in backend
            const response = await api.post('/contact', contactData);
            
            if (response.data.success) {
                return {
                    success: true,
                    message: response.data.message || 'Message sent successfully'
                };
            }
            
            return {
                success: false,
                message: response.data.message || 'Failed to send message'
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Failed to send message'
            };
        }
    }
}

export default new ContactService();