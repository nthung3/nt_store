'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { closeCart, removeFromCart, updateQuantity } from '@/lib/features/cart/cart-slice';
import Link from 'next/link';
import Image from 'next/image';

export default function CartDrawer(): JSX.Element {
    const dispatch = useAppDispatch();
    const { items, totalItems, totalPrice, isOpen } = useAppSelector((state) => state.cart);

    const handleClose = () => {
        dispatch(closeCart());
    };

    const handleRemove = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const handleUpdateQuantity = ({ id, quantity }: { id: string; quantity: number }) => {
        dispatch(updateQuantity({ id, quantity }));
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-300"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-300"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        {/* Header */}
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">
                                                    Shopping Cart
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={handleClose}
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <svg
                                                            className="h-6 w-6"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    {items.length === 0 ? (
                                                        <div className="text-center py-12">
                                                            <p className="text-gray-500">Your cart is empty</p>
                                                            <Link
                                                                href="/restaurant"
                                                                onClick={handleClose}
                                                                className="mt-4 inline-block text-primary hover:text-red-600"
                                                            >
                                                                Continue Shopping
                                                            </Link>
                                                        </div>
                                                    ) : (
                                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                            {items.map((item) => (
                                                                <li key={item._id} className="flex py-6">
                                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                        <img
                                                                            src={item.img}
                                                                            alt={item.name}
                                                                            className="h-full w-full object-cover object-center"
                                                                        />
                                                                    </div>

                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div>
                                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                <h3>
                                                                                    <Link
                                                                                        href={`/restaurant/${item._id}`}
                                                                                        onClick={handleClose}
                                                                                    >
                                                                                        {item.name}
                                                                                    </Link>
                                                                                </h3>
                                                                                <p className="ml-4">
                                                                                    ${item.price.toFixed(2)}
                                                                                </p>
                                                                            </div>
                                                                            {item.dsc && (
                                                                                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                                                                                    {item.dsc}
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                                            <div className="flex items-center gap-2">
                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleUpdateQuantity({
                                                                                            id: item._id,
                                                                                            quantity: item.quantity - 1,
                                                                                        })
                                                                                    }
                                                                                    className="h-8 w-8 rounded border border-gray-300 hover:bg-gray-100"
                                                                                >
                                                                                    -
                                                                                </button>
                                                                                <span className="w-8 text-center">
                                                                                    {item.quantity}
                                                                                </span>
                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleUpdateQuantity({
                                                                                            id: item._id,
                                                                                            quantity: item.quantity + 1,
                                                                                        })
                                                                                    }
                                                                                    className="h-8 w-8 rounded border border-gray-300 hover:bg-gray-100"
                                                                                >
                                                                                    +
                                                                                </button>
                                                                            </div>

                                                                            <div className="flex">
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        handleRemove(item._id)
                                                                                    }
                                                                                    className="font-medium text-primary hover:text-red-600"
                                                                                >
                                                                                    Remove
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        {items.length > 0 && (
                                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <p>Subtotal</p>
                                                    <p>${totalPrice.toFixed(2)}</p>
                                                </div>
                                                <p className="mt-0.5 text-sm text-gray-500">
                                                    Shipping and taxes calculated at checkout.
                                                </p>
                                                <div className="mt-6">
                                                    <Link
                                                        href="/checkout"
                                                        onClick={handleClose}
                                                        className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-600"
                                                    >
                                                        Checkout
                                                    </Link>
                                                </div>
                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    <p>
                                                        or{' '}
                                                        <button
                                                            type="button"
                                                            className="font-medium text-primary hover:text-red-600"
                                                            onClick={handleClose}
                                                        >
                                                            Continue Shopping
                                                            <span aria-hidden="true"> &rarr;</span>
                                                        </button>
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
