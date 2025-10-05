'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getProducts } from '@/lib/features/product/product-slice';
import { FiEdit, FiPlus } from 'react-icons/fi';

export default function ProductsList(): JSX.Element {
    const dispatch = useAppDispatch();
    const { result: products, loading, error } = useAppSelector((state) => state.product);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

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
                    <h1 className="text-3xl font-semibold">Product Management</h1>
                    <Link
                        href="/admin/products/create"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        <FiPlus />
                        <span>Add New Product</span>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
                    </div>
                ) : (
                    <div className="overflow-hidden overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="min-w-full text-sm divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3 font-medium text-left text-gray-900 whitespace-nowrap">
                                        Image
                                    </th>
                                    <th className="px-4 py-3 font-medium text-left text-gray-900 whitespace-nowrap">
                                        Name
                                    </th>
                                    <th className="px-4 py-3 font-medium text-left text-gray-900 whitespace-nowrap">
                                        Description
                                    </th>
                                    <th className="px-4 py-3 font-medium text-left text-gray-900 whitespace-nowrap">
                                        Price
                                    </th>
                                    <th className="px-4 py-3 font-medium text-left text-gray-900 whitespace-nowrap">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {products?.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                            No products found
                                        </td>
                                    </tr>
                                ) : (
                                    products?.map((product) => (
                                        <tr key={product._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                <div className="relative w-16 h-16">
                                                    <Image
                                                        src={product.img}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover rounded"
                                                        sizes="64px"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900">{product.name}</td>
                                            <td className="px-4 py-3 text-gray-700 max-w-xs truncate">{product.dsc}</td>
                                            <td className="px-4 py-3 text-gray-700">${product.price}</td>
                                            <td className="px-4 py-3">
                                                <Link
                                                    href={`/admin/products/${product._id}`}
                                                    className="inline-flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                                >
                                                    <FiEdit />
                                                    <span>Edit</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
