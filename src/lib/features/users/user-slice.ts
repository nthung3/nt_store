import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserAPI, User, CreateUserPayload, UpdateUserPayload, UsersResponse } from '@/services/user';

interface UserState {
    users: User[];
    currentUser: User | null;
    total: number;
    page: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    currentUser: null,
    total: 0,
    page: 1,
    totalPages: 0,
    loading: false,
    error: null,
};

// Async thunks
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}) => {
        const response = await UserAPI.getUsers({ page, limit });
        return response;
    },
);

export const fetchUserById = createAsyncThunk('users/fetchUserById', async ({ userId }: { userId: string }) => {
    const response = await UserAPI.getUserById({ userId });
    return response;
});

export const createUser = createAsyncThunk('users/createUser', async ({ data }: { data: CreateUserPayload }) => {
    const response = await UserAPI.createUser({ data });
    return response;
});

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({ userId, data }: { userId: string; data: UpdateUserPayload }) => {
        const response = await UserAPI.updateUser({ userId, data });
        return response;
    },
);

export const deleteUser = createAsyncThunk('users/deleteUser', async ({ userId }: { userId: string }) => {
    await UserAPI.deleteUser({ userId });
    return userId;
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearCurrentUser: (state) => {
            state.currentUser = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch users
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UsersResponse>) => {
            state.loading = false;
            state.users = action.payload.users;
            state.total = action.payload.total;
            state.page = action.payload.page;
            state.totalPages = action.payload.totalPages;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch users';
        });

        // Fetch user by ID
        builder.addCase(fetchUserById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.currentUser = action.payload;
        });
        builder.addCase(fetchUserById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch user';
        });

        // Create user
        builder.addCase(createUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.users.push(action.payload);
        });
        builder.addCase(createUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to create user';
        });

        // Update user
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.loading = false;
            const index = state.users.findIndex((user) => user._id === action.payload._id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
            if (state.currentUser?._id === action.payload._id) {
                state.currentUser = action.payload;
            }
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to update user';
        });

        // Delete user
        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.users = state.users.filter((user) => user._id !== action.payload);
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to delete user';
        });
    },
});

export const { clearCurrentUser, clearError } = userSlice.actions;
export default userSlice.reducer;
