import { useState, useEffect } from 'react';
import authService from '../services/authService';
import storage from '../utils/storage';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Load user from storage on mount
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        
        const result = await authService.login(email, password);
        
        if (result.success) {
            setUser(result.user);
        } else {
            setError(result.message);
        }
        
        setLoading(false);
        return result;
    };

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        
        const result = await authService.register(userData);
        
        if (result.success) {
            setUser(result.user);
        } else {
            setError(result.message);
        }
        
        setLoading(false);
        return result;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const isAuthenticated = () => {
        return !!user && storage.isAuthenticated();
    };

    const hasRole = (role) => {
        return user?.role === role;
    };

    return {
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated,
        hasRole
    };
};