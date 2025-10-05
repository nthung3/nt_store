import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthAPI } from '@/app/api/auth.api';
import type {
    AuthState,
    User,
    LoginRequest,
    SignupRequest,
    UpdateProfileRequest,
} from '@/core/interfaces/auth';
import { toast } from 'react-toastify';

/**
 * Initial authentication state
 */
const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

/**
 * Login user
 * POST /v1/auth/login
 */
export const login = createAsyncThunk(
    'auth/login',
    async (
        { data, navigate }: { data: LoginRequest; navigate?: (path: string) => void },
        { rejectWithValue },
    ) => {
        try {
            const response = await AuthAPI.login(data);

            if (response.status === 'success' && response.data && response.token) {
                // Store token in localStorage
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('role', response.data.role.toString());
                }

                // Navigate based on role
                if (navigate) {
                    navigate(response.data.role === 0 ? '/admin' : '/');
                }

                toast.success(response.message || 'Login successful!');

                return {
                    user: response.data,
                    token: response.token,
                };
            }

            throw new Error('Invalid response format');
        } catch (error: unknown) {
            const message = (error as Error).message || 'Login failed';
            toast.error(message);
            return rejectWithValue(message);
        }
    },
);

/**
 * Register new user
 * POST /v1/auth/signup
 */
export const signup = createAsyncThunk(
    'auth/signup',
    async (
        { data, navigate }: { data: SignupRequest; navigate?: (path: string) => void },
        { rejectWithValue },
    ) => {
        try {
            const response = await AuthAPI.signup(data);

            if (response.status === 'success' && response.data && response.token) {
                // Store token in localStorage
                if (typeof window !== 'undefined') {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('role', response.data.role.toString());
                }

                // Navigate to home
                if (navigate) {
                    navigate('/');
                }

                toast.success(response.message || 'Account created successfully!');

                return {
                    user: response.data,
                    token: response.token,
                };
            }

            throw new Error('Invalid response format');
        } catch (error: unknown) {
            const message = (error as Error).message || 'Signup failed';
            toast.error(message);
            return rejectWithValue(message);
        }
    },
);

/**
 * Get current user profile
 * GET /v1/auth/profile
 * Automatically refreshes token
 */
export const getProfile = createAsyncThunk('auth/getProfile', async (_, { rejectWithValue }) => {
    try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        if (!token) {
            return rejectWithValue('No authentication token found');
        }

        const response = await AuthAPI.getProfile();

        if (response.status === 'success' && response.data) {
            // Update token if refreshed
            if (response.token && typeof window !== 'undefined') {
                localStorage.setItem('token', response.token);
            }

            return {
                user: response.data,
                token: response.token || token,
            };
        }

        throw new Error('Invalid response format');
    } catch (error: unknown) {
        // Clear invalid token
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        }
        const message = (error as Error).message || 'Failed to get profile';
        return rejectWithValue(message);
    }
});

/**
 * Update user profile
 * PUT /v1/auth/profile
 */
export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (data: UpdateProfileRequest, { rejectWithValue }) => {
        try {
            const response = await AuthAPI.updateProfile(data);

            if (response.status === 'success' && response.data) {
                toast.success(response.message || 'Profile updated successfully!');

                return response.data;
            }

            throw new Error('Invalid response format');
        } catch (error: unknown) {
            const message = (error as Error).message || 'Failed to update profile';
            toast.error(message);
            return rejectWithValue(message);
        }
    },
);

/**
 * Auth slice with reducers and actions
 */
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        /**
         * Logout user and clear state
         */
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;

            // Clear localStorage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
            }

            toast.info('You have been logged out');
        },

        /**
         * Clear error message
         */
        clearError: (state) => {
            state.error = null;
        },

        /**
         * Set authentication from stored token (for app initialization)
         */
        setAuthFromStorage: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Signup
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(signup.rejected, (state, action) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Get Profile
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, clearError, setAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;
