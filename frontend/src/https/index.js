import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});

// Add request interceptor to include authorization token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle authentication errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle authentication errors
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Clear authentication data
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userData');

            // Let the component handle the redirect instead of forcing it here
            console.log('Authentication failed - token invalid');
        }
        return Promise.reject(error);
    }
);

export const login =(data) => api.post("/api/user/login", data);
export const register = (data) => api.post("/api/user/register", data);
export const getUserData = () => api.get("/api/user/");
export const logout = () => api.post("/api/user/logout");
export const addTable = (data) => api.post("/api/table", data);
export const getTables = () => api.get("/api/table");