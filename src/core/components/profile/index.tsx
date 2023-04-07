import React from 'react';
import { Menu, Popover } from '@headlessui/react';
import HomeImage from '@/utils/assets/images/Group 64.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Logout } from '@/core/services/auth';
export default function Profile(result) {
    const { data } = result;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(Logout());
        navigate('/');
    };
    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex-shrink-0 block group">
                <div className="flex items-center">
                    <div className="ml-3">
                        <h3 className="font-semibold text-gray-800 dark:text-white">{data.name}</h3>
                        <p className="text-sm font-medium text-gray-400">{data.email}</p>
                    </div>
                    <img
                        className="flex-shrink-0 inline-block w-10 h-10 rounded-full"
                        src={HomeImage}
                        alt="Image Description"
                    />
                </div>
            </Menu.Button>
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                className={`${active ? 'bg-primary text-white' : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                href="/account-settings"
                            >
                                Account settings
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                className={`${active ? 'bg-primary text-white' : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
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
                            <a
                                className={`${active ? 'bg-primary text-white' : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                onClick={handleLogout}
                            >
                                Logout
                            </a>
                        )}
                    </Menu.Item>
                </div>
            </Menu.Items>
        </Menu>
    );
}
