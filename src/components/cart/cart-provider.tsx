'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { loadCartFromStorage } from '@/lib/features/cart/cart-slice';

export function CartProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                try {
                    const cartItems = JSON.parse(savedCart);
                    dispatch(loadCartFromStorage(cartItems));
                } catch (error) {
                    console.error('Failed to load cart from storage:', error);
                    localStorage.removeItem('cart');
                }
            }
        }
    }, [dispatch]);

    return <>{children}</>;
}
