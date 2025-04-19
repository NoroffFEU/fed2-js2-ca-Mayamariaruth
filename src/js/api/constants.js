// API Key from .env
export const API_KEY = import.meta.env.VITE_API_KEY;

// Base URL for the API
export const API_BASE = "https://v2.api.noroff.dev";

// Auth endpoints
export const API_AUTH = `${API_BASE}/auth`;

// Social API endpoints
export const API_SOCIAL = `${API_BASE}/social`;

// Full URLs
export const API_AUTH_LOGIN = `${API_AUTH}/login`;
export const API_AUTH_REGISTER = `${API_AUTH}/register`;
export const API_SOCIAL_POSTS = `${API_SOCIAL}/posts`;
export const API_SOCIAL_PROFILES = `${API_SOCIAL}/profiles`;
