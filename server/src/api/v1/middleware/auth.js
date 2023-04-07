import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import createError from 'http-errors';
import userModel from '../core/user/user.model.js';
dotenv.config();
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const auth = async (req, res, next) => {
    try {
        if (!req.headers['authorization']) return next(createError.Unauthorized());
        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader.split(' ')[1];

        jwt.verify(bearerToken, ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
                return next(createError.Unauthorized(message));
            }
            req.userId = decoded?.id;
            next();
        });
    } catch (error) {
        console.log(error);
    }
};
export const isAdmin = async (req, res, next) => {
    function checkAdmin(role) {
        return role === 1;
    }
    try {
        const User = await userModel.findById(req.userId);
        if (checkAdmin(User.role)) return res.status(401).json({ status: 'error', message: 'This is not admin' });
        req.user = User;
        next();
    } catch (error) {
        console.log(error);
    }
};

export const createAccessToken = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '1d' }, (err, accessToken) => {
            if (err) reject(createError.InternalServerError());
            resolve(accessToken);
        });
    });
};

export const createRefreshToken = (user) => {
    return new Promise((resolve, reject) => {
        jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: '1d' }, (err, refreshTToken) => {
            if (err) reject(createError.InternalServerError());
            resolve(refreshTToken);
        });
    });
};
