'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineCancel } from 'react-icons/md';
import { FiShoppingBag } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine } from 'react-icons/ri';
import { BsBoxSeam } from 'react-icons/bs';

interface SidebarLink {
    name: string;
    url: string;
    icon: JSX.Element;
}

interface SidebarSection {
    title: string;
    links: SidebarLink[];
}

const links: SidebarSection[] = [
    {
        title: 'Dashboard',
        links: [
            {
                name: 'Dashboard',
                url: '/admin',
                icon: <FiShoppingBag />,
            },
        ],
    },
    {
        title: 'Pages',
        links: [
            {
                name: 'Orders',
                url: '/admin/orders',
                icon: <AiOutlineShoppingCart />,
            },
            {
                name: 'Users',
                url: '/admin/users',
                icon: <IoMdContacts />,
            },
            {
                name: 'Customers',
                url: '/admin/customers',
                icon: <RiContactsLine />,
            },
            {
                name: 'Products',
                url: '/admin/products',
                icon: <BsBoxSeam />,
            },
        ],
    },
];

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    currentColor?: string;
}

export default function AdminSidebar({ isOpen, onClose, currentColor = '#03C9D7' }: AdminSidebarProps): JSX.Element {
    const pathname = usePathname();

    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
    const normalLink =
        'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

    return (
        <div className="h-screen pb-10 ml-3 overflow-auto md:overflow-hidden md:hover:overflow-auto">
            {isOpen && (
                <>
                    <div className="flex items-center justify-between">
                        <Link
                            href="/admin"
                            className="flex items-center gap-3 mt-4 ml-3 text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
                        >
                            <span>Foods Craft Admin</span>
                        </Link>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-3 mt-4 mr-3 text-xl rounded-full hover:bg-light-gray md:hidden"
                        >
                            <MdOutlineCancel />
                        </button>
                    </div>
                    <div className="mt-10">
                        {links.map((item) => (
                            <div key={item.title}>
                                <p className="m-3 mt-4 text-gray-400 uppercase dark:text-gray-400">{item.title}</p>
                                {item.links.map((link) => {
                                    const isActive = pathname === link.url;
                                    return (
                                        <Link
                                            href={link.url}
                                            key={link.name}
                                            style={{
                                                backgroundColor: isActive ? currentColor : '',
                                            }}
                                            className={isActive ? activeLink : normalLink}
                                            onClick={() => {
                                                if (window.innerWidth <= 900) {
                                                    onClose();
                                                }
                                            }}
                                        >
                                            {link.icon}
                                            <span className="capitalize">{link.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
