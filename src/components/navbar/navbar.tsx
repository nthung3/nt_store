'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiOutlineMenu } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { toggleCart } from '@/lib/features/cart/cart-slice';
import { useScroll } from '@/hooks/use-scroll';
import { CartIcon, SearchIcon } from '@/components/icons';
import PrimaryButton from '@/components/buttons/primary-button';
import Profile from '@/components/profile/profile';

export default function Navbar(): JSX.Element {
    const [isSticky] = useScroll();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { token, user } = useAppSelector((state) => state.auth);
    const { totalItems } = useAppSelector((state) => state.cart);

    const handleCartClick = () => {
        dispatch(toggleCart());
    };

    return (
        <div className="container mx-auto">
            <div className={`${isSticky ? 'py-2' : 'py-5'} duration-75 navbar flex items-center justify-between`}>
                <div className="flex items-center">
                    <div className="p-3 text-2xl italic font-bold cursor-pointer hover:text-red-600 logo text-primary">
                        Food Craft
                    </div>
                </div>
                <nav className="navbar__menu">
                    <ul className="flex justify-between gap-y-8 flex-col text-center md:flex-row items-center gap-2">
                        <li className="list-none">
                            <Link
                                href="/"
                                className="cursor-pointer duration-75 text-center text-[20px] font-normal hover:text-primary hover:font-semibold px-5 py-2"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link
                                href="/restaurant"
                                className="cursor-pointer duration-75 text-center text-[20px] font-normal hover:text-primary hover:font-semibold px-5 py-2"
                            >
                                Restaurant
                            </Link>
                        </li>
                        <li className="list-none">
                            <Link
                                href="/about"
                                className="cursor-pointer duration-75 text-center text-[20px] font-normal hover:text-primary hover:font-semibold px-5 py-2"
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="flex items-center gap-2">
                    <div className="p-2">
                        <SearchIcon />
                    </div>
                    <button onClick={handleCartClick} className="relative p-2 hover:opacity-80">
                        <CartIcon />
                        {totalItems > 0 && (
                            <div className="absolute top-[-5px] right-[-10px] flex items-center justify-center min-w-[24px] bg-red-500 border-2 border-white rounded-full">
                                <span className="px-1 text-xs text-white font-semibold">{totalItems}</span>
                            </div>
                        )}
                    </button>
                    {token ? (
                        <Profile data={user ?? undefined} />
                    ) : (
                        <PrimaryButton
                            onClick={() => {
                                router.push('/login');
                            }}
                        >
                            Log In
                        </PrimaryButton>
                    )}
                </div>
            </div>
        </div>
    );
}
