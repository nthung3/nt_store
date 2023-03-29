import useScroll from '@/core/hooks/useScroll';
import React, { useState } from 'react';
import Footer from '../footer';
import Navbar from '../navbar';

interface Props {
    children: JSX.Element;
}
function Layout({ children }: Props): JSX.Element {
    const [Sticky] = useScroll();
    const [HasHeader, setHasHeader] = useState(true);
    return (
        <>
            <header
                className={`${Sticky ? 'shadow-sm' : ''} ${
                    HasHeader ? 'block' : 'hidden'
                } duration-200 w-full m-0 p-0 fixed top-0 right-0 z-50 ease-out bg-primary1`}
            >
                <Navbar />
            </header>
            <main className="main overflow-hidden">{children}</main>
            <footer className="text-center w-full">
                <Footer />
            </footer>
        </>
    );
}

export default Layout;
