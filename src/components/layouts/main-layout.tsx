'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { useScroll } from '@/hooks/use-scroll';
import { useEffect } from 'react';
import { useAuth } from '@/core/hooks/useAuth';


interface MainLayoutProps {
    children: React.ReactNode;
    showNavbar?: boolean;
    showFooter?: boolean;
}

export function MainLayout({ children, showNavbar = false, showFooter = false }: MainLayoutProps): JSX.Element {
    const [isSticky] = useScroll();
    const pathname = usePathname();

    const shouldShowNav = showNavbar || pathname === '/' || pathname === '/restaurant';

    if (!shouldShowNav) {
        return <main className="overflow-hidden main">{children}</main>;
    }
    const { getProfile } = useAuth();
    useEffect(() => {
        getProfile();
    }, []);
    return (
        <>
            <header className={`${isSticky ? 'shadow-sm' : ''} duration-200 w-full fixed z-50 ease-out bg-primary1`}>
                <Navbar />
            </header>
            <main className="overflow-hidden main">{children}</main>
            {shouldShowNav && showFooter && (
                <footer className="w-full text-center">
                    <Footer />
                </footer>
            )}
        </>
    );
}
