import UserService from './user.service.js';
import { createAccessToken } from '../../middleware/auth.js';

// Authentication: Sign In
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Email and password are required',
            });
        }

        // Get user by email
        const user = await UserService.getUserByEmail({ email });
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        // Verify password
        const isPasswordCorrect = await UserService.verifyPassword({
            password,
            hashedPassword: user.password,
        });

        if (!isPasswordCorrect) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials',
            });
        }

        // Create token
        const tokenPayload = { email: user.email, id: user._id };
        const token = await createAccessToken(tokenPayload);

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(200).json({
            status: 'success',
            message: 'Login successful',
            token,
            data: userResponse,
        });
    } catch (error) {
        console.error('Sign in error:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong',
        });
    }
};

// Authentication: Sign Up
export const signup = async (req, res) => {
    try {
        const { email, password, firstName, lastName, image, phoneNumber, address } = req.body;

        // Validate input
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({
                status: 'error',
                message: 'Email, password, first name, and last name are required',
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid email format',
            });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({
                status: 'error',
                message: 'Password must be at least 6 characters',
            });
        }

        // Create user
        const user = await UserService.createUser({
            email,
            password,
            firstName,
            lastName,
            image,
            phoneNumber,
            address,
        });

        // Create token
        const tokenPayload = { email: user.email, id: user._id };
        const token = await createAccessToken(tokenPayload);

        return res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            token,
            data: user,
        });
    } catch (error) {
        console.error('Sign up error:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong',
        });
    }
};

// Get current user profile
export const getProfile = async (req, res) => {
    try {
        const { userId } = req;

        const user = await UserService.getUserById({ userId });
        
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        // Create fresh token
        const tokenPayload = { email: user.email, id: user._id };
        const token = await createAccessToken(tokenPayload);

        return res.status(200).json({
            status: 'success',
            token,
            data: user,
        });
    } catch (error) {
        console.error('Get profile error:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong',
        });
    }
};

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, role } = req.query;

        const result = await UserService.getAllUsers({
            page: parseInt(page),
            limit: parseInt(limit),
            role: role ? parseInt(role) : null,
        });

        return res.status(200).json({
            status: 'success',
            ...result,
        });
    } catch (error) {
        console.error('Get all users error:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong',
        });
    }
};

// Get user by ID (Admin only)
export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                status: 'error',
                message: 'User ID is required',
            });
        }

        const user = await UserService.getUserById({ userId });

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        return res.status(200).json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        console.error('Get user by ID error:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong',
        });
    }
};

// Create user (Admin only)
export const createUser = async (req, res) => {
    try {
        const { email, password, firstName, lastName, role = 1, image, phoneNumber, address } = req.body;

        // Validate input
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({
                status: 'error',
                message: 'Email, password, first name, and last name are required',
            });
        }

        const user = await UserService.createUser({
            email,
            password,
            firstName,
            lastName,
            role,
            image,
            phoneNumber,
            address,
        });

        return res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: user,
        });
    } catch (error) {
        console.error('Create user error:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong',
        });
    }
};

// Update user (Admin or own profile)
export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updateData = req.body;
        const requestingUserId = req.userId;
        const requestingUserRole = req.user?.role;

        if (!userId) {
            return res.status(400).json({
                status: 'error',
                message: 'User ID is required',
            });
        }

        // Check if user exists
        const existingUser = await UserService.getUserById({ userId });
        if (!existingUser) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        // Check permissions: user can only update their own profile unless they're admin
        if (requestingUserId !== userId && requestingUserRole !== 0) {
            return res.status(403).json({
                status: 'error',
                message: 'You can only update your own profile',
            });
        }

        // Non-admin users cannot change role
        if (requestingUserRole !== 0 && updateData.role !== undefined) {
            delete updateData.role;
        }

        const user = await UserService.updateUser({ userId, updateData });

        return res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            data: user,
        });
    } catch (error) {
        console.error('Update user error:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong',
        });
    }
};

// Delete user (Admin only)
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                status: 'error',
                message: 'User ID is required',
            });
        }

        // Check if user exists
        const existingUser = await UserService.getUserById({ userId });
        if (!existingUser) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        // Prevent deleting yourself
        if (req.userId === userId) {
            return res.status(400).json({
                status: 'error',
                message: 'You cannot delete your own account',
            });
        }

        await UserService.deleteUser({ userId });

        return res.status(200).json({
            status: 'success',
            message: 'User deleted successfully',
            data: existingUser,
        });
    } catch (error) {
        console.error('Delete user error:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong',
        });
    }
};

// Search users (Admin only)
export const searchUsers = async (req, res) => {
    try {
        const { query, page = 1, limit = 10 } = req.query;

        if (!query) {
            return res.status(400).json({
                status: 'error',
                message: 'Search query is required',
            });
        }

        const result = await UserService.searchUsers({
            query,
            page: parseInt(page),
            limit: parseInt(limit),
        });

        return res.status(200).json({
            status: 'success',
            ...result,
        });
    } catch (error) {
        console.error('Search users error:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong',
        });
    }
};

// Update user role (Admin only)
export const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        if (!userId) {
            return res.status(400).json({
                status: 'error',
                message: 'User ID is required',
            });
        }

        if (role === undefined || ![0, 1].includes(role)) {
            return res.status(400).json({
                status: 'error',
                message: 'Valid role is required (0 for admin, 1 for user)',
            });
        }

        // Check if user exists
        const existingUser = await UserService.getUserById({ userId });
        if (!existingUser) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        // Prevent changing your own role
        if (req.userId === userId) {
            return res.status(400).json({
                status: 'error',
                message: 'You cannot change your own role',
            });
        }

        const user = await UserService.updateUserRole({ userId, role });

        return res.status(200).json({
            status: 'success',
            message: 'User role updated successfully',
            data: user,
        });
    } catch (error) {
        console.error('Update user role error:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong',
        });
    }
};

// Create admin (Super Admin only)
export const createAdmin = async (req, res) => {
    try {
        const { email, password, firstName, lastName, image, phoneNumber, address } = req.body;
        const requestingUserId = req.userId;

        // Validate input
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({
                status: 'error',
                message: 'Email, password, first name, and last name are required',
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid email format',
            });
        }

        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({
                status: 'error',
                message: 'Admin password must be at least 8 characters',
            });
        }

        // Verify requesting user is admin
        const requestingUser = await UserService.getUserById({ userId: requestingUserId });
        if (!requestingUser || requestingUser.role !== 0) {
            return res.status(403).json({
                status: 'error',
                message: 'Only administrators can create admin accounts',
            });
        }

        // Create admin user with role 0
        const adminUser = await UserService.createUser({
            email,
            password,
            firstName,
            lastName,
            role: 0, // Admin role
            image,
            phoneNumber,
            address,
        });

        // Log admin creation for audit purposes
        console.info(`[ADMIN CREATION] New admin created: ${adminUser.email} by admin: ${requestingUser.email}`);

        return res.status(201).json({
            status: 'success',
            message: 'Admin account created successfully',
            data: adminUser,
        });
    } catch (error) {
        console.error('Create admin error:', error);
        
        // Handle duplicate email error
        if (error.message === 'User already exists') {
            return res.status(409).json({
                status: 'error',
                message: 'An account with this email already exists',
            });
        }

        return res.status(500).json({
            status: 'error',
            message: error.message || 'Something went wrong',
        });
    }
};
