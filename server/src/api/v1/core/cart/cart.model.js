import mongoose from 'mongoose';
import moment from 'moment';
const create = moment().format();

const CartSchema = mongoose.Schema(
    {
        userId: { type: String },
        products: Array,
        createdAt: { type: Date, default: create },
        updatedAt: { type: Date, default: create },
    },
    {
        collection: 'cart',
        timestamps: true,
    },
);

const CartModel = mongoose.model('Cart', CartSchema);
export default CartModel;
