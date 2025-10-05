import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
    login,
    signup,
    logout,
    getProfile,
    updateProfile,
    clearError,
} from '@/lib/features/auth/auth-slice';
import type { LoginRequest, SignupRequest, UpdateProfileRequest } from '../interfaces/auth';

/**
 * Modern authentication hook with full feature support
 * Aligned with new API documentation
 */
export function useAuth() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const auth = useAppSelector((state) => state.auth);

    /**
     * Login user with email and password
     */
    const handleLogin = useCallback(
        async (credentials: LoginRequest) => {
            await dispatch(login({ data: credentials, navigate: router.push }));
        },
        [dispatch, router],
    );

    /**
     * Register new user account
     */
    const handleSignup = useCallback(
        async (userData: SignupRequest) => {
            await dispatch(signup({ data: userData, navigate: router.push }));
        },
        [dispatch, router],
    );

    /**
     * Logout current user
     */
    const handleLogout = useCallback(() => {
        dispatch(logout());
        router.push('/');
    }, [dispatch, router]);

    /**
     * Fetch current user profile
     */
    const fetchProfile = useCallback(() => {
        dispatch(getProfile());
    }, [dispatch]);

    /**
     * Update user profile
     */
    const handleUpdateProfile = useCallback(
        async (data: UpdateProfileRequest) => {
            await dispatch(updateProfile(data));
        },
        [dispatch],
    );

    /**
     * Clear authentication error
     */
    const handleClearError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    /**
     * Check if user is admin
     */
    const isAdmin = auth.user?.role === 0;

    /**
     * Check if user is regular user
     */
    const isUser = auth.user?.role === 1;

    /**
     * Auto-fetch profile on mount if token exists
     */
    useEffect(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token && !auth.isAuthenticated && !auth.isLoading) {
            fetchProfile();
        }
    }, [auth.isAuthenticated, auth.isLoading, fetchProfile]);

    return {
        // State
        user: auth.user,
        token: auth.token,
        isAuthenticated: auth.isAuthenticated,
        isLoading: auth.isLoading,
        error: auth.error,
        isAdmin,
        isUser,

        // Actions
        login: handleLogin,
        signup: handleSignup,
        logout: handleLogout,
        getProfile: fetchProfile,
        updateProfile: handleUpdateProfile,
        clearError: handleClearError,
    };
}

/**
 * Hook to require authentication
 * Redirects to login if not authenticated
 */
export function useRequireAuth() {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!auth.isLoading && !auth.isAuthenticated) {
            router.push('/login');
        }
    }, [auth.isAuthenticated, auth.isLoading, router]);

    return auth;
}

/**
 * Hook to require admin role
 * Redirects to home if not admin
 */
export function useRequireAdmin() {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!auth.isLoading && (!auth.isAuthenticated || !auth.isAdmin)) {
            router.push('/');
        }
    }, [auth.isAuthenticated, auth.isAdmin, auth.isLoading, router]);

    return auth;
}
