/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useDeferredValue } from 'react';
import HomeImage from '@/utils/assets/images/Group 18.png';
import LoadedImage from '@/utils/helpers/imageLoading';
import { UseAuthentication } from '@/core/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { handlePostLogin, token } = UseAuthentication();
    const [fields, setFields] = useState({
        email: '',
        password: '',
    });
    const accessToken = localStorage.getItem('token');
    const navigate = useNavigate();
    const debounce = useDeferredValue(fields)
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const id = target.id;
        const value = target.value;
        setFields((prev: any) => ({
            ...prev,
            ...{
                [id]: value,
            },
        }));
    };


    useEffect(() => {
        if (token && accessToken) return navigate('/');
    }, [token, accessToken]);


    const handleOnsubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handlePostLogin(debounce, navigate);

        setFields({ email: '', password: '' });
    };

    return (
        <section className="login bg-zinc-50">
            <div className="mx-auto md:px-8 xl:px-[75px] max-w-7xl">
                <div className="p-4 my-[150px] mx-auto md:bg-white rounded-md md:shadow-sm h-3/4 ">
                    <div className="flex items-center justify-center">
                        <div className="hidden w-full md:block md:w-1/2">
                            <img src={LoadedImage(HomeImage)} alt="" className="object-contain h-[300px] w-full" />
                        </div>
                        <div className=" md:w-1/2 py-[60px] px-[50px]">
                            <div className="mb-4">
                                <h2 className="my-1 text-lg font-semibold text-black">JOIN WITH US</h2>
                                <div className="flex gap-1">
                                    <span className="text-textGray">Don't have an account?</span>
                                    <span className="cursor-pointer text-primary">
                                        <strong>Create an account</strong>{' '}
                                    </span>
                                </div>
                            </div>
                            <form onSubmit={handleOnsubmit} className="mt-4">
                                <div>
                                    <label
                                        className="block text-sm font-medium text-gray-800 dark:text-gray-400"

                                    >
                                        {' '}
                                        Email{' '}
                                    </label>
                                    <input
                                        className="inline-block w-full px-4 py-2 mt-1 text-sm bg-gray-100 border-transparent rounded-md outline-none dark:text-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:hover:border-gray-700 dark:hover:focus:border-gray-700 focus:border-gray-300 hover:focus:border-gray-700 hover:border-gray-300 hover:focus:border-gray-300 focus:ring-0"
                                        type="email"
                                        id="email"
                                        value={fields.email}
                                        onChange={handleOnChange}
                                        placeholder="Your email address"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label
                                        className="block text-sm font-medium text-gray-800 dark:text-gray-400"

                                    >
                                        {' '}
                                        Password{' '}
                                    </label>
                                    <input
                                        className="inline-block w-full px-4 py-2 mt-1 text-sm bg-gray-100 border-transparent rounded-md outline-none dark:text-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:hover:border-gray-700 dark:hover:focus:border-gray-700 focus:border-gray-300 hover:focus:border-gray-700 hover:border-gray-300 hover:focus:border-gray-300 focus:ring-0"
                                        type="password"
                                        id="password"
                                        value={fields.password}
                                        onChange={handleOnChange}
                                        placeholder="Your password"
                                    />
                                </div>
                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="w-full p-2 overflow-hidden text-lg font-semibold text-center text-white delay-100 rounded-lg bg-primary hover:bg-red-500 active:scale-95"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
