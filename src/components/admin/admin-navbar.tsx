'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { useAppSelector } from '@/lib/hooks';
import Profile from '@/components/profile/profile';

interface NavButtonProps {
    title: string;
    customFunc: () => void;
    icon: JSX.Element;
    color: string;
    dotColor?: string;
}

function NavButton({ title, customFunc, icon, color, dotColor }: NavButtonProps): JSX.Element {
    return (
        <button
            type="button"
            onClick={() => customFunc()}
            name={title}
            style={{ color }}
            className="relative p-3 text-xl rounded-full hover:bg-light-gray"
        >
            {dotColor && (
                <span
                    style={{ background: dotColor }}
                    className="absolute inline-flex w-2 h-2 rounded-full right-2 top-2"
                />
            )}
            {icon}
        </button>
    );
}

interface AdminNavbarProps {
    onMenuClick: () => void;
    currentColor?: string;
}

export default function AdminNavbar({ onMenuClick, currentColor = '#03C9D7' }: AdminNavbarProps): JSX.Element {
    const { token, user } = useAppSelector((state) => state.auth);

    const handleClick = (action: string) => {
        console.log(`Clicked: ${action}`);
        // Implement notification, cart, chat functionality later
    };

    return (
        <div className="relative flex justify-between p-2 md:ml-6 md:mr-6">
            <NavButton title="Menu" customFunc={onMenuClick} color={currentColor} icon={<AiOutlineMenu />} />
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
                {token && user && <Profile data={user} />}
            </div>
        </div>
    );
}
