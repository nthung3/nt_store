'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { CartProvider } from '@/components/cart/cart-provider';

export function StoreProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const storeRef = useRef<AppStore>();

    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    return (
        <Provider store={storeRef.current}>
            <CartProvider>{children}</CartProvider>
        </Provider>
    );
}
