import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const devEnv = process.env.NODE_ENV !== 'production';

const baseURL = 'http://localhost:8888/v1';

/**
 * Axios instance with interceptors for authentication
 * Automatically adds Bearer token and handles responses
 */
const HTTPS = axios.create({
    baseURL,
    timeout: 30000, // 30 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Request Interceptor
 * Automatically adds Authorization header with Bearer token
 */
HTTPS.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // Get token from localStorage
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        // Add Authorization header if token exists
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
    },
);

/**
 * Response Interceptor
 * Handles successful responses and errors
 */
HTTPS.interceptors.response.use(
    (response: AxiosResponse) => {
        // Return the response data directly
        // Backend returns: { status, message, data, token }
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error: AxiosError) => {
        // Handle error responses
        if (error.response) {
            // Server responded with error status
            const errorMessage = (error.response.data as { message?: string })?.message || 'An error occurred';

            // Handle 401 Unauthorized - clear token and redirect to login
            if (error.response.status === 401) {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');

                    // Only redirect if not already on login/signup page
                    const currentPath = window.location.pathname;
                    if (!currentPath.includes('/login') && !currentPath.includes('/signup')) {
                        window.location.href = '/login';
                    }
                }
            }

            // Handle 403 Forbidden
            if (error.response.status === 403) {
                console.error('[API Error 403]', errorMessage);
            }

            // Throw error with message for handling in components
            throw new Error(errorMessage);
        } else if (error.request) {
            // Request was made but no response received
            console.error('[API No Response]', error.request);
            throw new Error('No response from server. Please check your connection.');
        } else {
            // Something else happened
            console.error('[API Error]', error.message);
            throw new Error(error.message || 'An unexpected error occurred');
        }
    },
);

export default HTTPS;
