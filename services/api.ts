import axios from 'axios';
import { LoginFormValues } from '@/validation/auth-schema';

export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    let token = null;
    
    // 1. Try to get token from Zustand's auth-storage
    try {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        token = parsed?.state?.token;
      }
    } catch (e) {
      console.error("Error parsing auth-storage", e);
    }
    
    // 2. Fallback to cookie if not found in auth-storage
    if (!token) {
      const match = document.cookie.match(/(^|;)\s*token\s*=\s*([^;]+)/);
      if (match) {
        token = match[2];
      }
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
});

export const authService = {
  login: async (data: LoginFormValues) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
};

export const listMenuService = {
  getListMenu: async () => {
    const response = await api.get('/menu');
    return response.data;
  }
}
