import CartService from './cart.service.js';

// Get user's cart
export const getCart = async (req, res) => {
    try {
        const userId = req.userId;
        const cart = await CartService.getCartByUserId({ userId });
        
        return res.status(200).json({
            status: 'success',
            data: cart,
        });
    } catch (error) {
        console.error('Get cart error:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || '500 Internal Server Error',
        });
    }
};

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId, quantity = 1 } = req.body;

        if (!productId) {
            return res.status(400).json({
                status: 'error',
                message: 'Product ID is required',
            });
        }

        if (quantity < 1) {
            return res.status(400).json({
                status: 'error',
                message: 'Quantity must be at least 1',
            });
        }

        const cart = await CartService.addItemToCart({ userId, productId, quantity });
        
        return res.status(201).json({
            status: 'success',
            message: 'Item added to cart',
            data: cart,
        });
    } catch (error) {
        console.error('Add to cart error:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || '500 Internal Server Error',
        });
    }
};

// Update item quantity in cart
export const updateCartItem = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId, quantity } = req.body;

        if (!productId) {
            return res.status(400).json({
                status: 'error',
                message: 'Product ID is required',
            });
        }

        if (quantity === undefined || quantity < 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Valid quantity is required',
            });
        }

        const cart = await CartService.updateItemQuantity({ userId, productId, quantity });
        
        return res.status(200).json({
            status: 'success',
            message: 'Cart item updated',
            data: cart,
        });
    } catch (error) {
        console.error('Update cart item error:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || '500 Internal Server Error',
        });
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({
                status: 'error',
                message: 'Product ID is required',
            });
        }

        const cart = await CartService.removeItemFromCart({ userId, productId });
        
        return res.status(200).json({
            status: 'success',
            message: 'Item removed from cart',
            data: cart,
        });
    } catch (error) {
        console.error('Remove from cart error:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || '500 Internal Server Error',
        });
    }
};

// Clear entire cart
export const clearCart = async (req, res) => {
    try {
        const userId = req.userId;
        const cart = await CartService.clearCart({ userId });
        
        return res.status(200).json({
            status: 'success',
            message: 'Cart cleared',
            data: cart,
        });
    } catch (error) {
        console.error('Clear cart error:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || '500 Internal Server Error',
        });
    }
};

// Get all carts (Admin only)
export const getAllCarts = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const result = await CartService.getAllCarts({ page, limit });
        
        return res.status(200).json({
            status: 'success',
            ...result,
        });
    } catch (error) {
        console.error('Get all carts error:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || '500 Internal Server Error',
        });
    }
};

// Delete cart by userId (Admin only)
export const deleteCart = async (req, res) => {
    try {
        const { userId } = req.params;
        
        if (!userId) {
            return res.status(400).json({
                status: 'error',
                message: 'User ID is required',
            });
        }

        const cart = await CartService.deleteCart({ userId });
        
        if (!cart) {
            return res.status(404).json({
                status: 'error',
                message: 'Cart not found',
            });
        }
        
        return res.status(200).json({
            status: 'success',
            message: 'Cart deleted successfully',
            data: cart,
        });
    } catch (error) {
        console.error('Delete cart error:', error);
        return res.status(500).json({
            status: 'error',
            message: error.message || '500 Internal Server Error',
        });
    }
};
