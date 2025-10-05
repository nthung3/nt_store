'use client';

import { Menu } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAppDispatch } from '@/lib/hooks';
import { logout } from '@/lib/features/auth/auth-slice';
import HomeImage from '@/assets/images/Group 64.png';

interface UserData {
    name?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
}

interface ProfileProps {
    data?: UserData;
}

export default function Profile({ data }: ProfileProps): JSX.Element {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    };

    // Extract user info with fallbacks
    const userName = data?.name || `${data?.firstName || ''} ${data?.lastName || ''}`.trim() || 'User';
    const userEmail = data?.email || 'No email';

    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex-shrink-0 block group">
                <div className="flex items-center">
                    <div className="ml-3">
                        <h3 className="font-semibold text-gray-800 dark:text-white">{userName}</h3>
                        <p className="text-sm font-medium text-gray-400">{userEmail}</p>
                    </div>
                    <Image
                        className="flex-shrink-0 inline-block w-10 h-10 rounded-full"
                        src={HomeImage}
                        alt="Profile"
                        width={40}
                        height={40}
                    />
                </div>
            </Menu.Button>
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                className={`${
                                    active ? 'bg-primary text-white' : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                                href="/account-settings"
                            >
                                Account settings
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                className={`${
                                    active ? 'bg-primary text-white' : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                            >
                                Documentation
                            </a>
                        )}
                    </Menu.Item>
                </div>
                <div className="px-1 py-1">
                    <Menu.Item disabled>
                        <span className="items-center w-full px-2 py-2 text-sm rounded-md opacity-75">
                            Invite a friend (coming soon!)
                        </span>
                    </Menu.Item>
                </div>
                <div className="px-1 py-1">
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                className={`${
                                    active ? 'bg-primary text-white' : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        )}
                    </Menu.Item>
                </div>
            </Menu.Items>
        </Menu>
    );
}
