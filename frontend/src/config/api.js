import axios from 'axios';

// API Configuration
export const API_BASE_URL = "http://localhost:9000";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding the bearer token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors (optional but good practice)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `/api/auth/login`,
  REGISTER: `/api/auth/register`,

  // Event endpoints
  EVENTS: `/api/events`,
  EVENTS_FEATURED: `/api/events/featured`,
  EVENT_BY_ID: (id) => `/api/events/${id}`,
  ADD_EVENT: `/api/events/add`,
  UPDATE_EVENT: (id) => `/api/events/${id}`,
  DELETE_EVENT: (id) => `/api/events/${id}`,

  // User endpoints
  USER_ME: `/api/user/me`,
  USER_UPDATE: `/api/user/me/update`,

  // Health check
  HEALTH: `/api/health`,
};

// Auth API calls
export const authAPI = {
  login: (email, password) => {
    return axiosInstance.post(API_ENDPOINTS.LOGIN, { email, password });
  },

  register: (username, email, password) => {
    return axiosInstance.post(API_ENDPOINTS.REGISTER, { username, email, password });
  },
};

// Events API calls
export const eventsAPI = {
  getAllEvents: (params = {}) => {
    return axiosInstance.get(API_ENDPOINTS.EVENTS, { params });
  },

  getFeaturedEvents: () => {
    return axiosInstance.get(API_ENDPOINTS.EVENTS_FEATURED);
  },

  getEventById: (id) => {
    return axiosInstance.get(API_ENDPOINTS.EVENT_BY_ID(id));
  },

  addEvent: (eventData) => {
    return axiosInstance.post(API_ENDPOINTS.ADD_EVENT, eventData);
  },

  updateEvent: (id, eventData) => {
    return axiosInstance.put(API_ENDPOINTS.UPDATE_EVENT(id), eventData);
  },

  deleteEvent: (id) => axiosInstance.delete(`/events/${id}`),

  registerEvent: (id) => axiosInstance.post(`/api/events/${id}/register`),
};

// User API calls
export const userAPI = {
  getProfile: () => {
    return axiosInstance.get(API_ENDPOINTS.USER_ME);
  },

  updateProfile: (userData) => {
    return axiosInstance.put(API_ENDPOINTS.USER_UPDATE, userData);
  },

  getRegistrations: () => axiosInstance.get("/api/user/me/registrations"),
};

export default axiosInstance;
