import userModel from './user.model.js';
import bcrypt from 'bcryptjs';

class UserService {
    // Get all users with pagination
    static async getAllUsers({ page = 1, limit = 10, role = null }) {
        try {
            const skip = (page - 1) * limit;
            const query = role !== null ? { role } : {};
            
            const users = await userModel
                .find(query)
                .select('-password')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
            
            const total = await userModel.countDocuments(query);
            
            return {
                users,
                total,
                page: parseInt(page),
                totalPages: Math.ceil(total / limit),
            };
        } catch (error) {
            throw error;
        }
    }

    // Get user by ID
    static async getUserById({ userId }) {
        try {
            const user = await userModel.findById(userId).select('-password');
            return user;
        } catch (error) {
            throw error;
        }
    }

    // Get user by email
    static async getUserByEmail({ email }) {
        try {
            const user = await userModel.findOne({ email });
            return user;
        } catch (error) {
            throw error;
        }
    }

    // Create new user
    static async createUser({ email, password, firstName, lastName, role = 1, image = null, phoneNumber = null, address = null }) {
        try {
            // Check if user already exists
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists');
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create user
            const user = await userModel.create({
                email,
                password: hashedPassword,
                name: `${firstName} ${lastName}`,
                role,
                image,
                phoneNumber,
                address,
            });

            // Return user without password
            const userObject = user.toObject();
            delete userObject.password;
            
            return userObject;
        } catch (error) {
            throw error;
        }
    }

    // Update user
    static async updateUser({ userId, updateData }) {
        try {
            // If password is being updated, hash it
            if (updateData.password) {
                updateData.password = await bcrypt.hash(updateData.password, 12);
            }

            // If firstName and lastName provided, update name
            if (updateData.firstName && updateData.lastName) {
                updateData.name = `${updateData.firstName} ${updateData.lastName}`;
                delete updateData.firstName;
                delete updateData.lastName;
            }

            const user = await userModel.findByIdAndUpdate(
                userId,
                { $set: updateData },
                { new: true, runValidators: true }
            ).select('-password');

            return user;
        } catch (error) {
            throw error;
        }
    }

    // Delete user
    static async deleteUser({ userId }) {
        try {
            const user = await userModel.findByIdAndDelete(userId).select('-password');
            return user;
        } catch (error) {
            throw error;
        }
    }

    // Verify password
    static async verifyPassword({ password, hashedPassword }) {
        try {
            const isMatch = await bcrypt.compare(password, hashedPassword);
            return isMatch;
        } catch (error) {
            throw error;
        }
    }

    // Update user role (admin function)
    static async updateUserRole({ userId, role }) {
        try {
            const user = await userModel.findByIdAndUpdate(
                userId,
                { $set: { role } },
                { new: true, runValidators: true }
            ).select('-password');

            return user;
        } catch (error) {
            throw error;
        }
    }

    // Search users by name or email
    static async searchUsers({ query, page = 1, limit = 10 }) {
        try {
            const skip = (page - 1) * limit;
            
            const searchQuery = {
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { email: { $regex: query, $options: 'i' } },
                ],
            };

            const users = await userModel
                .find(searchQuery)
                .select('-password')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
            
            const total = await userModel.countDocuments(searchQuery);
            
            return {
                users,
                total,
                page: parseInt(page),
                totalPages: Math.ceil(total / limit),
            };
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;
