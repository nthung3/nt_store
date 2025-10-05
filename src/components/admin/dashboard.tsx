'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getProducts } from '@/lib/features/product/product-slice';
import { fetchUsers } from '@/lib/features/users/user-slice';
import { BsBoxSeam } from 'react-icons/bs';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { FiShoppingCart } from 'react-icons/fi';
import { HiOutlineRefresh } from 'react-icons/hi';

interface StatCardProps {
    icon: JSX.Element;
    amount: string;
    title: string;
    iconColor: string;
    iconBg: string;
    percentage?: string;
    pcColor?: string;
}

function StatCard({ icon, amount, title, iconColor, iconBg, percentage, pcColor }: StatCardProps): JSX.Element {
    return (
        <div className="p-4 bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 pt-9 rounded-2xl shadow-sm">
            <button
                type="button"
                style={{ color: iconColor, backgroundColor: iconBg }}
                className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
            >
                {icon}
            </button>
            <p className="mt-3">
                <span className="text-lg font-semibold">{amount}</span>
                {percentage && <span className={`text-sm text-${pcColor} ml-2`}>{percentage}</span>}
            </p>
            <p className="mt-1 text-sm text-gray-400">{title}</p>
        </div>
    );
}

export default function Dashboard(): JSX.Element {
    const dispatch = useAppDispatch();
    const { result: products } = useAppSelector((state) => state.product);
    const { total: totalUsers } = useAppSelector((state) => state.users);
    const { totalItems: cartItems } = useAppSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getProducts());
        dispatch(fetchUsers({ page: 1, limit: 10 }));
    }, [dispatch]);

    const stats = [
        {
            icon: <MdOutlineSupervisorAccount />,
            amount: totalUsers.toString(),
            title: 'Total Users',
            iconColor: '#03C9D7',
            iconBg: '#E5FAFB',
            percentage: '+12%',
            pcColor: 'green-600',
        },
        {
            icon: <BsBoxSeam />,
            amount: products?.length?.toString() || '0',
            title: 'Products',
            iconColor: 'rgb(255, 244, 229)',
            iconBg: 'rgb(254, 201, 15)',
            percentage: '+23%',
            pcColor: 'green-600',
        },
        {
            icon: <FiShoppingCart />,
            amount: '423',
            title: 'Total Orders',
            iconColor: 'rgb(228, 106, 118)',
            iconBg: 'rgb(255, 244, 229)',
            percentage: '+38%',
            pcColor: 'green-600',
        },
        {
            icon: <HiOutlineRefresh />,
            amount: '12',
            title: 'Pending Orders',
            iconColor: 'rgb(0, 194, 146)',
            iconBg: 'rgb(235, 250, 242)',
            percentage: '-5%',
            pcColor: 'red-600',
        },
    ];

    return (
        <div className="mt-24 p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Admin Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                {stats.map((item, index) => (
                    <StatCard key={index} {...item} />
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl shadow-sm p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                        href="/admin/products/create"
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center gap-3"
                    >
                        <BsBoxSeam className="text-2xl text-blue-600" />
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Add Product</p>
                            <p className="text-sm text-gray-500">Create new product</p>
                        </div>
                    </a>
                    <a
                        href="/admin/users/create"
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center gap-3"
                    >
                        <MdOutlineSupervisorAccount className="text-2xl text-green-600" />
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Add User</p>
                            <p className="text-sm text-gray-500">Create new user account</p>
                        </div>
                    </a>
                    <a
                        href="/admin/orders"
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center gap-3"
                    >
                        <FiShoppingCart className="text-2xl text-purple-600" />
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">View Orders</p>
                            <p className="text-sm text-gray-500">Manage customer orders</p>
                        </div>
                    </a>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-secondary-dark-bg rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Recent Activity</h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 border-b border-gray-100 dark:border-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-800 dark:text-gray-200">New user registered</p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 border-b border-gray-100 dark:border-gray-700">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-800 dark:text-gray-200">Product updated</p>
                            <p className="text-xs text-gray-500">5 hours ago</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-800 dark:text-gray-200">New order received</p>
                            <p className="text-xs text-gray-500">1 day ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
