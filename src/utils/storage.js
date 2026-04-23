import { STORAGE_KEYS } from '../config/constants';

class StorageUtil {
    // Token methods
    setToken(token) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    }

    getToken() {
        return localStorage.getItem(STORAGE_KEYS.TOKEN);
    }

    removeToken() {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
    }

    // User methods
    setUser(user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }

    getUser() {
        const user = localStorage.getItem(STORAGE_KEYS.USER);
        return user ? JSON.parse(user) : null;
    }

    removeUser() {
        localStorage.removeItem(STORAGE_KEYS.USER);
    }

    // Theme methods
    getTheme() {
        return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    }

    setTheme(theme) {
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
    }

    // Clear all
    clearAll() {
        this.removeToken();
        this.removeUser();
    }

    // Check if authenticated
    isAuthenticated() {
        return !!this.getToken();
    }
}

export default new StorageUtil();