'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchUsers, deleteUser } from '@/lib/features/users/user-slice';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

export default function UsersList(): JSX.Element {
    const dispatch = useAppDispatch();
    const { users, loading, error, page, totalPages } = useAppSelector((state) => state.users);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchUsers({ page: currentPage, limit: 10 }));
    }, [dispatch, currentPage]);

    const handleDelete = async (userId: string, email: string) => {
        if (window.confirm(`Are you sure you want to delete user: ${email}?`)) {
            try {
                await dispatch(deleteUser({ userId })).unwrap();
                toast.success('User deleted successfully');
            } catch (err) {
                toast.error('Failed to delete user');
            }
        }
    };

    const getRoleName = (role: number): string => {
        switch (role) {
            case 0:
                return 'Admin';
            case 1:
                return 'User';
            default:
                return 'Unknown';
        }
    };

    if (error) {
        return (
            <div className="p-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="mt-18 p-8">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold">User Management</h1>
                    <Link
                        href="/admin/users/create"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        <FiPlus />
                        <span>Add New User</span>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
                    </div>
                ) : (
                    <>
                        <div className="overflow-hidden overflow-x-auto border border-gray-200 rounded-lg">
                            <table className="min-w-full text-sm divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 font-medium text-left text-gray-900 whitespace-nowrap">
                                            Email
                                        </th>
                                        <th className="px-4 py-3 font-medium text-left text-gray-900 whitespace-nowrap">
                                            Name
                                        </th>
                                        <th className="px-4 py-3 font-medium text-left text-gray-900 whitespace-nowrap">
                                            Role
                                        </th>
                                        <th className="px-4 py-3 font-medium text-left text-gray-900 whitespace-nowrap">
                                            Phone
                                        </th>
                                        <th className="px-4 py-3 font-medium text-left text-gray-900 whitespace-nowrap">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {users.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                                No users found
                                            </td>
                                        </tr>
                                    ) : (
                                        users.map((user) => (
                                            <tr key={user._id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-gray-700">{user.email}</td>
                                                <td className="px-4 py-3 text-gray-700">
                                                    {user.firstName} {user.lastName}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                            user.role === 0
                                                                ? 'bg-purple-100 text-purple-800'
                                                                : 'bg-green-100 text-green-800'
                                                        }`}
                                                    >
                                                        {getRoleName(user.role)}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-700">{user.phoneNumber || '-'}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={`/admin/users/${user._id}`}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                                            title="Edit"
                                                        >
                                                            <FiEdit />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(user._id, user.email)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                                                            title="Delete"
                                                        >
                                                            <FiTrash2 />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-6">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
