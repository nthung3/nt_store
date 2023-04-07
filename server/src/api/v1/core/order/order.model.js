import mongoose from 'mongoose';
import moment from 'moment';
const create = moment().format();

const OrderSchema = mongoose.Schema(
    {
        userId: { type: String },
        cartId: String,
        createdAt: { type: Date, default: create },
        updatedAt: { type: Date, default: create },
    },
    {
        collection: 'order',
        timestamps: true,
    },
);

const OrderModel = mongoose.model('Order', OrderSchema);
export default OrderModel;
