import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    },
    img: {
        type: String,
    },
    dsc: {
        type: String,
    },
});

const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        items: [CartItemSchema],
        totalItems: {
            type: Number,
            default: 0,
        },
        totalPrice: {
            type: Number,
            default: 0,
        },
    },
    {
        collection: 'cart',
        timestamps: true,
    },
);

// Method to calculate totals
CartSchema.methods.calculateTotals = function () {
    this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.totalPrice = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const CartModel = mongoose.model('Cart', CartSchema);
export default CartModel;
