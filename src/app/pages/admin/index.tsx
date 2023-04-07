import { ThemeProvider } from '@/utils/contexts/ThemeProvider';
import React, { useEffect } from 'react';

import Footer from './components/footer';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Router from './router';

function Admin() {
    const { setCurrentColor, setCurrentMode, currentMode, activeMenu } = ThemeProvider();

    useEffect(() => {
        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, []);

    return (
        <div className={currentMode === 'Dark' ? 'dark' : ''}>
            <div className="relative flex dark:bg-main-dark-bg">
                {activeMenu ? (
                    <div className="fixed bg-white w-72 sidebar dark:bg-secondary-dark-bg ">
                        <Sidebar />
                    </div>
                ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                        <Sidebar />
                    </div>
                )}
                <div
                    className={
                        activeMenu
                            ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                            : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                    }
                >
                    <div className="fixed w-full md:static bg-main-bg dark:bg-main-dark-bg navbar ">
                        <Navbar />
                    </div>
                    <div>
                        <Router />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Admin;
