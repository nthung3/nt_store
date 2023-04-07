import mongoose from 'mongoose';
import moment from 'moment';
const create = moment().format();
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    image: { type: String, default: null },
    role: { type: Number, default: 1 },
    updatedAt: { type: Date, default: create },
    createdAt: { type: Date, default: create },
});

export default mongoose.model('User', userSchema);
