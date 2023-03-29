import React from 'react';
import PrimaryButton from '../buttons/primaryButton';
import { Link } from 'react-router-dom';
import useScroll from '@/core/hooks/useScroll';
import useCheckMobile from '@/core/hooks/useMobile';
import '@/App.css';

export default function Navbar() {
    const [Sticky] = useScroll();
    const mobile = useCheckMobile();

    return (
        <div className="relative container mx-auto">
            <div className={`${Sticky ? 'py-2' : 'py-5'} duration-75 navbar flex items-center justify-between `}>
                <div className="flex items-center">
                    <div className="cursor-pointer hover:text-red-600 logo p-3 text-2xl italic font-bold text-primary">
                        Food Craft
                    </div>
                </div>
                <nav className="navbar__menu">
                    <ul className={`flex justify-between gap-y-8 flex-col text-center md:flex-row items-center gap-2`}>
                        <li className="list-none">
                            <Link
                                to="/"
                                className="cursor-pointer duration-75 text-center text-[20px] font-normal hover:text-primary hover:font-semibold px-5 py-2"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link
                                to="/restaurant"
                                className="cursor-pointer duration-75 text-center text-[20px] font-normal hover:text-primary hover:font-semibold px-5 py-2"
                            >
                                Restaurant
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link
                                to="/about"
                                className="cursor-pointer duration-75 text-center text-[20px] font-normal hover:text-primary hover:font-semibold px-5 py-2"
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="flex items-center gap-1">
                    <div className="p-2">Search</div>
                    <div className="p-2">Cart</div>
                    <PrimaryButton>Log In</PrimaryButton>
                    <div className="md:hidden block">toggle</div>
                </div>
            </div>
        </div>
    );
}
