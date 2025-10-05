'use client';

import { useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getProducts } from '@/lib/features/product/product-slice';
import ProductItems from '@/components/product/product-item';

export default function ShopContent(): JSX.Element {
    const dispatch = useAppDispatch();
    const product = useAppSelector((state) => state.product);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    return (
        <section className="relative py-10 mt-10">
            <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
                <header>
                    <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Product Collection</h2>
                    <p className="max-w-md mt-4 text-gray-500">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure dicta
                        incidunt est ipsam, officia dolor fugit natus?
                    </p>
                </header>
                <div className="block mt-8 lg:hidden">
                    <button className="flex items-center gap-2 pb-1 text-gray-900 transition border-b border-gray-400 cursor-pointer hover:border-gray-600">
                        <span className="text-sm font-medium"> Filters &amp; Sorting </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
                <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
                    <div className="hidden space-y-4 lg:block">
                        <div>
                            <p className="block text-xs font-medium text-gray-700">Filters</p>
                            <div className="mt-1 space-y-2">
                                <Disclosure as="div" defaultOpen={true} className="mt-2 border rounded-md">
                                    <Disclosure.Button className="p-2 w-full">Availability</Disclosure.Button>
                                    <Disclosure.Panel as="ul" className="p-4 space-y-1 border-t border-gray-200">
                                        <li>
                                            <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id="FilterInStock"
                                                    className="w-5 h-5 border-gray-300 rounded"
                                                />
                                                <span className="text-sm font-medium text-gray-700">In Stock (5+)</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id="FilterPreOrder"
                                                    className="w-5 h-5 border-gray-300 rounded"
                                                />
                                                <span className="text-sm font-medium text-gray-700">
                                                    Pre Order (3+)
                                                </span>
                                            </label>
                                        </li>
                                        <li>
                                            <label
                                                htmlFor="FilterOutOfStock"
                                                className="inline-flex items-center gap-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id="FilterOutOfStock"
                                                    className="w-5 h-5 border-gray-300 rounded"
                                                />
                                                <span className="text-sm font-medium text-gray-700">
                                                    Out of Stock (10+)
                                                </span>
                                            </label>
                                        </li>
                                    </Disclosure.Panel>
                                </Disclosure>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-3">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {product.loading ? (
                                <p>Loading...</p>
                            ) : (
                                product.result.map((value, index) => <ProductItems key={index} data={value} />)
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
