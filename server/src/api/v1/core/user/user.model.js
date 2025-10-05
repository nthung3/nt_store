import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            default: null,
        },
        phoneNumber: {
            type: String,
            default: null,
        },
        address: {
            type: String,
            default: null,
        },
        role: {
            type: Number,
            default: 1,
            enum: [0, 1], // 0 = admin, 1 = user
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        lastLogin: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    },
);

// Index for performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ name: 'text', email: 'text' }); // Text search

export default mongoose.model('User', userSchema);
