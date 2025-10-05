import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/lib/store-provider';
import { ToastContainer } from 'react-toastify';
import CartDrawer from '@/components/cart/cart-drawer';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'NT Store',
    description: 'Restaurant ordering and management system',
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <html lang="en">
            <body className={`${inter.variable} font-inter bg-zinc-50`}>
                <StoreProvider>
                    {children}
                    <CartDrawer />
                    <ToastContainer />
                </StoreProvider>
            </body>
        </html>
    );
}
