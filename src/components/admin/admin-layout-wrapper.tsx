'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from './admin-sidebar';
import AdminNavbar from './admin-navbar';
import AdminFooter from './admin-footer';

interface AdminLayoutWrapperProps {
    children: React.ReactNode;
}

export default function AdminLayoutWrapper({ children }: AdminLayoutWrapperProps): JSX.Element {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState<number>(0);
    const currentColor = '#03C9D7';

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (screenSize <= 900) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);

    const handleActiveMenu = () => setActiveMenu(!activeMenu);

    return (
        <div className="relative flex dark:bg-main-dark-bg">
            {activeMenu ? (
                <div className="fixed bg-white w-72 sidebar dark:bg-secondary-dark-bg z-10">
                    <AdminSidebar
                        isOpen={activeMenu}
                        onClose={() => setActiveMenu(false)}
                        currentColor={currentColor}
                    />
                </div>
            ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                    <AdminSidebar
                        isOpen={activeMenu}
                        onClose={() => setActiveMenu(false)}
                        currentColor={currentColor}
                    />
                </div>
            )}
            <div
                className={
                    activeMenu
                        ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full'
                        : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'
                }
            >
                <div className="fixed w-full md:static bg-main-bg dark:bg-main-dark-bg navbar z-10">
                    <AdminNavbar onMenuClick={handleActiveMenu} currentColor={currentColor} />
                </div>
                <div>{children}</div>
                <AdminFooter />
            </div>
        </div>
    );
}
