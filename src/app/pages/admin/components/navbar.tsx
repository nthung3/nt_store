import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';

import { ThemeProvider } from '@/utils/contexts/ThemeProvider';

import { UseAuthentication } from '@/core/hooks/useAuth';
import Profile from '@/core/components/profile';

import { getProfile } from '@/core/services/auth';
import { useDispatch } from 'react-redux';

interface NavButtonProps {
    title: string;
    customFunc: () => void;
    icon: JSX.Element;
    color: string;
    dotColor?: string;
}
const NavButton = ({ title, customFunc, icon, color, dotColor }: NavButtonProps) => (
    <button
        type="button"
        onClick={() => customFunc()}
        name={title}
        style={{ color }}
        className="relative p-3 text-xl rounded-full hover:bg-light-gray"
    >
        <span style={{ background: dotColor }} className="absolute inline-flex w-2 h-2 rounded-full right-2 top-2" />
        {icon}
    </button>
);

const Navbar = () => {
    const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } =
        ThemeProvider();

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);

        handleResize();

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

    const { resultAccount, getProfileAPI } = UseAuthentication();
    const { token, result } = resultAccount;

    useEffect(() => {
        getProfileAPI();
    }, [getProfileAPI]);

    return (
        <div className="relative flex justify-between p-2 md:ml-6 md:mr-6">
            <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
            <div className="flex">
                <NavButton
                    title="Cart"
                    customFunc={() => handleClick('cart')}
                    color={currentColor}
                    icon={<FiShoppingCart />}
                />
                <NavButton
                    title="Chat"
                    dotColor="#03C9D7"
                    customFunc={() => handleClick('chat')}
                    color={currentColor}
                    icon={<BsChatLeft />}
                />
                <NavButton
                    title="Notification"
                    dotColor="rgb(254, 201, 15)"
                    customFunc={() => handleClick('notification')}
                    color={currentColor}
                    icon={<RiNotification3Line />}
                />
                {token && <Profile data={result} />}
            </div>
        </div>
    );
};

export default Navbar;
