import type {
    ApiResponse,
    User,
    LoginRequest,
    SignupRequest,
    UpdateProfileRequest,
} from '@/core/interfaces/auth';
import HTTPS from './base';

/**
 * Authentication API Service
 * Aligned with backend API documentation endpoints
 */
export class AuthAPI {
    /**
     * User login
     * POST /v1/auth/login
     */
    static login({ email, password }: LoginRequest): Promise<ApiResponse<User>> {
        return HTTPS.post('/auth/login', { email, password });
    }

    /**
     * User signup/registration
     * POST /v1/auth/signup
     */
    static signup(data: SignupRequest): Promise<ApiResponse<User>> {
        return HTTPS.post('/auth/signup', data);
    }

    /**
     * Get current user profile
     * GET /v1/auth/profile
     * Returns refreshed token
     */
    static getProfile(): Promise<ApiResponse<User>> {
        return HTTPS.get('/auth/profile');
    }

    /**
     * Update current user profile
     * PUT /v1/auth/profile
     */
    static updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<User>> {
        return HTTPS.put('/auth/profile', data);
    }
}

// Backward compatibility exports
export const Auth = AuthAPI;
