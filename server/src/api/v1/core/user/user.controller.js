import userModel from './user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createAccessToken } from '../../middleware/auth.js';
dotenv.config();

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await userModel.findOne({ email });
        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });
        const user = { email: oldUser.email, id: oldUser._id };

        const token = await createAccessToken(user);

        res.status(200).json({ result: oldUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
        console.log(error);
    }
};

export const signup = async (req, res) => {
    const { email, password, firstName, lastName, image } = req.body;
    try {
        const oldUser = await userModel.findOne({ email });

        if (oldUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await userModel.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
            image: image,
        });
        const user = { email: result.email, id: result._id };
        const token = await createAccessToken(user);
        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
        console.log(error);
    }
};

export const getAllProfile = async (req, res) => {
    const role = req.user.role;
    try {
        if (role === 0) {
            const allUsers = await userModel.find({ role: 1 });
            return res.status(200).json({ status: 'success', data: allUsers });
        }
        return res.status(404).json({ message: 'this is not admin' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
        console.log(error);
    }
};

export const getProfile = async (req, res) => {
    try {
        const { userId } = req;
        const account = await userModel.findById(userId);
        if (!account) return res.status(400).json({ message: 'no found account' });
        const user = {
            id: account._id,
            email: account.email,
        };

        const token = await createAccessToken(user);

        res.json({
            token,
            data: account,
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
        console.log(error);
    }
};
