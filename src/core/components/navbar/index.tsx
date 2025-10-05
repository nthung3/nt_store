import React from 'react';
import PrimaryButton from '../buttons/primaryButton';
import { Link, useNavigate } from 'react-router-dom';
import useScroll from '@/core/hooks/useScroll';
import { CartIcon, SearchIcon } from '@/constants/icon';
import Profile from '../profile';
import { UseAuthentication } from '@/core/hooks/useAuth';
import { AiOutlineMenu } from 'react-icons/ai';
import { ThemeProvider } from '@/utils/contexts/ThemeProvider';

export default function Navbar() {
    const [Sticky] = useScroll();
    const navigate = useNavigate();
    const { activeMenu, setActiveMenu } = ThemeProvider();
    const handleActiveMenu = () => setActiveMenu(!activeMenu);
    const { resultAccount } = UseAuthentication();
    const { token, result } = resultAccount;
    return (
        <div className="container mx-auto">
            <div className={`${Sticky ? 'py-2' : 'py-5'} duration-75 navbar flex items-center justify-between `}>
                <div className="flex items-center">
                    <div className="p-3 text-2xl italic font-bold cursor-pointer hover:text-red-600 logo text-primary">
                        Food Craft
                    </div>
                </div>
                <nav className={`${activeMenu ? '' : 'active'} navbar__menu`}>
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
                    <div className="block md:hidden absolute top-0 right-0 p-4">
                        <AiOutlineMenu onClick={handleActiveMenu} />
                    </div>
                </nav>
                <div className="flex items-center gap-2">
                    <div className="p-2">
                        <SearchIcon />
                    </div>
                    <div className="relative p-2">
                        <CartIcon />
                        <div className="absolute top-[-5px] right-[-10px] flex items-center justify-center mr-1 bg-red-500 border-2 border-white rounded-full">
                            <span className="w-full p-1 text-xs text-white">99</span>
                        </div>
                    </div>
                    {token ? (
                        <Profile data={result} />
                    ) : (
                        <PrimaryButton
                            onClick={() => {
                                navigate('/login');
                            }}
                        >
                            Log In
                        </PrimaryButton>
                    )}

                    <div className="block md:hidden">
                        <AiOutlineMenu onClick={handleActiveMenu} />
                    </div>
                </div>
            </div>
        </div>
    );
}
