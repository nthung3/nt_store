/**
 * API Response format from backend
 */
export interface ApiResponse<T = unknown> {
    status: 'success' | 'error';
    message?: string;
    token?: string;
    data?: T;
}

/**
 * User data structure
 */
export interface User {
    _id: string;
    name: string;
    email: string;
    role: number; // 0 = Admin, 1 = User
    image?: string;
    phoneNumber?: string;
    address?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

/**
 * Auth state in Redux store
 */
export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

/**
 * Login request payload
 */
export interface LoginRequest {
    email: string;
    password: string;
}

/**
 * Signup request payload
 */
export interface SignupRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    image?: string;
    phoneNumber?: string;
    address?: string;
}

/**
 * Update profile request payload
 */
export interface UpdateProfileRequest {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    address?: string;
    image?: string;
}
