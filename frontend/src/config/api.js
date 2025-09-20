// API Configuration
export const API_BASE_URL = "https://eventra-backend-lsy8.onrender.com";

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  
  // Event endpoints
  EVENTS: `${API_BASE_URL}/api/events`,
  EVENTS_FEATURED: `${API_BASE_URL}/api/events/featured`,
  EVENT_BY_ID: (id) => `${API_BASE_URL}/api/events/${id}`,
  ADD_EVENT: `${API_BASE_URL}/api/events/add`,
  UPDATE_EVENT: (id) => `${API_BASE_URL}/api/events/${id}`,
  DELETE_EVENT: (id) => `${API_BASE_URL}/api/events/${id}`,
  
  // User endpoints
  USER_ME: `${API_BASE_URL}/api/user/me`,
  USER_UPDATE: `${API_BASE_URL}/api/user/me/update`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/api/health`,
};

// API Helper Functions
export const apiRequest = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (error) {
    console.error('API Request Error:', error);
    return {
      ok: false,
      status: 500,
      data: { success: false, message: 'Network error' },
    };
  }
};

// Auth API calls
export const authAPI = {
  login: async (email, password) => {
    return apiRequest(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  register: async (username, email, password) => {
    return apiRequest(API_ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
  },
};

// Events API calls
export const eventsAPI = {
  getAllEvents: async (token, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${API_ENDPOINTS.EVENTS}?${queryString}` : API_ENDPOINTS.EVENTS;
    
    return apiRequest(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  
  getFeaturedEvents: async () => {
    return apiRequest(API_ENDPOINTS.EVENTS_FEATURED);
  },
  
  getEventById: async (id) => {
    return apiRequest(API_ENDPOINTS.EVENT_BY_ID(id));
  },
  
  addEvent: async (eventData, token) => {
    return apiRequest(API_ENDPOINTS.ADD_EVENT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });
  },
  
  updateEvent: async (id, eventData, token) => {
    return apiRequest(API_ENDPOINTS.UPDATE_EVENT(id), {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });
  },
  
  deleteEvent: async (id, token) => {
    return apiRequest(API_ENDPOINTS.DELETE_EVENT(id), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

// User API calls
export const userAPI = {
  getProfile: async (token) => {
    return apiRequest(API_ENDPOINTS.USER_ME, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  
  updateProfile: async (userData, token) => {
    return apiRequest(API_ENDPOINTS.USER_UPDATE, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
  },
};
