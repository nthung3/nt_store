import express from 'express';

import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import apiV1 from './api/v1/index.js';
// const redis = require('redis');
// const jwt = require('jsonwebtoken');
// const cloudinary = require('cloudinary');
// const moment = require('moment');

// const multer = require('multer');
// const bcryptjs = require('bcryptjs');

const app = express();
dotenv.config();

app.use(morgan('dev'));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/v1', apiV1);

export default app;
