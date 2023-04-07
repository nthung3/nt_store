import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { MdOutlineCancel } from 'react-icons/md';

import { links } from '@/constants/admin';
import { ThemeProvider } from '@/utils/contexts/ThemeProvider';

const Sidebar = () => {
    const { currentColor, activeMenu, setActiveMenu, screenSize } = ThemeProvider();

    const handleCloseSideBar = () => {
        if (activeMenu !== undefined && screenSize <= 900) {
            setActiveMenu(false);
        }
    };
    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white  text-md m-2';
    const normalLink =
        'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

    return (
        <div className="h-screen pb-10 ml-3 overflow-auto md:overflow-hidden md:hover:overflow-auto ">
            {activeMenu && (
                <>
                    <div className="flex items-center justify-between">
                        <Link
                            to="/admin"
                            className="flex items-center gap-3 mt-4 ml-3 text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
                        >
                            <span>Foods Craft</span>
                        </Link>
                    </div>
                    <div className="mt-10 ">
                        {links.map((item) => (
                            <div key={item.title}>
                                <p className="m-3 mt-4 text-gray-400 uppercase dark:text-gray-400 ">{item.title}</p>
                                {item.links.map((link) => (
                                    <NavLink
                                        to={`/${link.url}`}
                                        key={link.name}
                                        style={({ isActive }) => ({
                                            backgroundColor: isActive ? currentColor : '',
                                        })}
                                        className={({ isActive }) => (isActive ? activeLink : normalLink)}
                                    >
                                        {link.icon}
                                        <span className="capitalize ">{link.name}</span>
                                    </NavLink>
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Sidebar;
