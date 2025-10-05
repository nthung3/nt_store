import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    _id: string;
    name: string;
    price: number;
    img: string;
    quantity: number;
    dsc?: string;
}

interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    isOpen: boolean;
}

const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    isOpen: false,
};

const calculateTotals = (items: CartItem[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { totalItems, totalPrice };
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
            const existingItem = state.items.find((item) => item._id === action.payload._id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }

            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;

            if (typeof window !== 'undefined') {
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item._id !== action.payload);

            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;

            if (typeof window !== 'undefined') {
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const item = state.items.find((item) => item._id === action.payload.id);

            if (item) {
                if (action.payload.quantity <= 0) {
                    state.items = state.items.filter((item) => item._id !== action.payload.id);
                } else {
                    item.quantity = action.payload.quantity;
                }
            }

            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;

            if (typeof window !== 'undefined') {
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;

            if (typeof window !== 'undefined') {
                localStorage.removeItem('cart');
            }
        },
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },
        openCart: (state) => {
            state.isOpen = true;
        },
        closeCart: (state) => {
            state.isOpen = false;
        },
        loadCartFromStorage: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
            const totals = calculateTotals(action.payload);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    loadCartFromStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
