import useScroll from '@/core/hooks/useScroll';
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Footer from '../footer';
import Navbar from '../navbar';

interface Props {
    children: JSX.Element;
}
function Layout({ children }: Props): JSX.Element {
    const [Sticky] = useScroll();

    const location = useLocation();
    const checks = location.pathname === '/' || location.pathname === '/restaurant';
    if (!checks)
        return (
            <>
                <main className="overflow-hidden main">{children} </main>
            </>
        );

    return (
        <>
            <header
                className={`${Sticky ? 'shadow-sm' : ''} duration-200 w-full  fixed  z-50 ease-out bg-primary1`}
            >
                <Navbar />
            </header>
            <main className="overflow-hidden main">{children}</main>
            <footer className="w-full text-center">
                <Footer />
            </footer>
        </>
    );
}

export default Layout;
