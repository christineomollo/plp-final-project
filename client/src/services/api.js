import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const authAPI = {
  register: async (phone, username, password) => {
    const response = await api.post('/api/auth/register', { phone, username, password });
    return response.data;
  },

  verifyOTP: async (phone, otp, tempToken) => {
    const response = await api.post('/api/auth/verify-otp', { phone, otp, tempToken });
    return response.data;
  },

  login: async (phone, password) => {
    const response = await api.post('/api/auth/login', { phone, password });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  updateProfile: async (updates) => {
    const response = await api.put('/api/auth/profile', updates);
    return response.data;
  },
};

// Chat API
export const chatAPI = {
  getMessages: async (limit = 50, before = null) => {
    const params = new URLSearchParams({ limit });
    if (before) params.append('before', before);
    const response = await api.get(`/api/chat/messages?${params}`);
    return response.data;
  },

  sendMessage: async (message, isAnonymous = false) => {
    const response = await api.post('/api/chat/messages', { message, isAnonymous });
    return response.data;
  },

  deleteMessage: async (messageId) => {
    const response = await api.delete(`/api/chat/messages/${messageId}`);
    return response.data;
  },

  reportMessage: async (messageId) => {
    const response = await api.post(`/api/chat/messages/${messageId}/report`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/api/chat/stats');
    return response.data;
  },
};

// Content API
export const contentAPI = {
  getArticles: async (category = null, limit = 20, skip = 0) => {
    const params = new URLSearchParams({ limit, skip });
    if (category) params.append('category', category);
    const response = await api.get(`/api/content/articles?${params}`);
    return response.data;
  },

  getArticle: async (id) => {
    const response = await api.get(`/api/content/articles/${id}`);
    return response.data;
  },

  getAffirmations: async () => {
    const response = await api.get('/api/content/affirmations');
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/api/content/categories');
    return response.data;
  },
};

// SOS API
export const sosAPI = {
  createAlert: async (alertData) => {
    const response = await api.post('/api/sos/alert', alertData);
    return response.data;
  },

  getMyAlerts: async () => {
    const response = await api.get('/api/sos/my-alerts');
    return response.data;
  },

  getAlert: async (id) => {
    const response = await api.get(`/api/sos/alert/${id}`);
    return response.data;
  },

  resolveAlert: async (id) => {
    const response = await api.put(`/api/sos/alert/${id}/resolve`);
    return response.data;
  },

  getResources: async () => {
    const response = await api.get('/api/sos/resources');
    return response.data;
  },
};

export default api;