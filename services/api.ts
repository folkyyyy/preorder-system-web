import axios from 'axios';
import { LoginFormValues } from '@/validation/auth-schema';

export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  login: async (data: LoginFormValues) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
};
