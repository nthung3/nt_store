import axiosInstance from '@/lib/axios-instance';

export interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: number; // 0 = admin, 1 = user
    phoneNumber?: string;
    address?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateUserPayload {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: number;
    phoneNumber?: string;
    address?: string;
}

export interface UpdateUserPayload {
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: number;
    phoneNumber?: string;
    address?: string;
}

export interface UsersResponse {
    users: User[];
    total: number;
    page: number;
    totalPages: number;
}

export const UserAPI = {
    // Get all users with pagination
    async getUsers({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}): Promise<UsersResponse> {
        const response = await axiosInstance.get(`/users?page=${page}&limit=${limit}`);
        return response.data;
    },

    // Get user by ID
    async getUserById({ userId }: { userId: string }): Promise<User> {
        const response = await axiosInstance.get(`/users/${userId}`);
        return response.data;
    },

    // Create new user
    async createUser({ data }: { data: CreateUserPayload }): Promise<User> {
        const response = await axiosInstance.post('/users', data);
        return response.data;
    },

    // Update user
    async updateUser({ userId, data }: { userId: string; data: UpdateUserPayload }): Promise<User> {
        const response = await axiosInstance.put(`/users/${userId}`, data);
        return response.data;
    },

    // Delete user
    async deleteUser({ userId }: { userId: string }): Promise<void> {
        await axiosInstance.delete(`/users/${userId}`);
    },
};
