import CartModel from './cart.model.js';
import ProductModel from '../product/product.model.js';

class CartService {
    // Get cart by userId
    static async getCartByUserId({ userId }) {
        try {
            let cart = await CartModel.findOne({ userId }).populate('items.productId', 'name price img dsc');
            
            if (!cart) {
                // Create empty cart if none exists
                cart = await CartModel.create({ userId, items: [], totalItems: 0, totalPrice: 0 });
            }
            
            return cart;
        } catch (error) {
            throw error;
        }
    }

    // Add item to cart
    static async addItemToCart({ userId, productId, quantity = 1 }) {
        try {
            // Verify product exists
            const product = await ProductModel.findById(productId);
            if (!product) {
                throw new Error('Product not found');
            }

            let cart = await CartModel.findOne({ userId });
            
            if (!cart) {
                // Create new cart with the item
                cart = new CartModel({
                    userId,
                    items: [{
                        productId: product._id,
                        name: product.name,
                        price: product.price,
                        quantity,
                        img: product.img,
                        dsc: product.dsc,
                    }],
                });
            } else {
                // Check if item already exists
                const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
                
                if (itemIndex > -1) {
                    // Update quantity if item exists
                    cart.items[itemIndex].quantity += quantity;
                } else {
                    // Add new item
                    cart.items.push({
                        productId: product._id,
                        name: product.name,
                        price: product.price,
                        quantity,
                        img: product.img,
                        dsc: product.dsc,
                    });
                }
            }
            
            // Calculate totals
            cart.calculateTotals();
            await cart.save();
            
            return cart;
        } catch (error) {
            throw error;
        }
    }

    // Update item quantity
    static async updateItemQuantity({ userId, productId, quantity }) {
        try {
            const cart = await CartModel.findOne({ userId });
            
            if (!cart) {
                throw new Error('Cart not found');
            }

            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            
            if (itemIndex === -1) {
                throw new Error('Item not found in cart');
            }

            if (quantity <= 0) {
                // Remove item if quantity is 0 or less
                cart.items.splice(itemIndex, 1);
            } else {
                // Update quantity
                cart.items[itemIndex].quantity = quantity;
            }

            cart.calculateTotals();
            await cart.save();
            
            return cart;
        } catch (error) {
            throw error;
        }
    }

    // Remove item from cart
    static async removeItemFromCart({ userId, productId }) {
        try {
            const cart = await CartModel.findOne({ userId });
            
            if (!cart) {
                throw new Error('Cart not found');
            }

            cart.items = cart.items.filter(item => item.productId.toString() !== productId);
            
            cart.calculateTotals();
            await cart.save();
            
            return cart;
        } catch (error) {
            throw error;
        }
    }

    // Clear entire cart
    static async clearCart({ userId }) {
        try {
            const cart = await CartModel.findOne({ userId });
            
            if (!cart) {
                throw new Error('Cart not found');
            }

            cart.items = [];
            cart.totalItems = 0;
            cart.totalPrice = 0;
            await cart.save();
            
            return cart;
        } catch (error) {
            throw error;
        }
    }

    // Delete cart (admin only)
    static async deleteCart({ userId }) {
        try {
            const cart = await CartModel.findOneAndDelete({ userId });
            return cart;
        } catch (error) {
            throw error;
        }
    }

    // Get all carts (admin only)
    static async getAllCarts({ page = 1, limit = 10 }) {
        try {
            const skip = (page - 1) * limit;
            const carts = await CartModel.find()
                .populate('userId', 'name email')
                .skip(skip)
                .limit(limit)
                .sort({ updatedAt: -1 });
            
            const total = await CartModel.countDocuments();
            
            return {
                carts,
                total,
                page: parseInt(page),
                totalPages: Math.ceil(total / limit),
            };
        } catch (error) {
            throw error;
        }
    }
}

export default CartService;
