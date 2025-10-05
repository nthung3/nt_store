import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/auth-slice';
import productReducer from './features/product/product-slice';
import cartReducer from './features/cart/cart-slice';
import userReducer from './features/users/user-slice';

export function makeStore() {
    return configureStore({
        reducer: {
            auth: authReducer,
            product: productReducer,
            cart: cartReducer,
            users: userReducer,
        },
        devTools: process.env.NODE_ENV !== 'production',
    });
}

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
