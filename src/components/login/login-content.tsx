'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/core/hooks/useAuth';
import { FormInput } from '@/components/auth/shared/form-input';
import { LoadingSpinner } from '@/components/auth/shared/loading-spinner';
import HomeImage from '@/assets/images/Group 18.png';

/**
 * Optimized Login Page Component
 * - Performance: Memoized callbacks, auto-focus
 * - UX: Password visibility toggle, better accessibility
 * - Code: Reusable components, cleaner structure
 */
export default function LoginContent(): JSX.Element {
    const router = useRouter();
    const { login, isAuthenticated, isLoading, error, clearError } = useAuth();
    const emailInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [validationErrors, setValidationErrors] = useState({
        email: '',
        password: '',
    });

    // Auto-focus email input on mount
    useEffect(() => {
        emailInputRef.current?.focus();
    }, []);

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    // Clear auth error when component unmounts
    useEffect(() => {
        return () => {
            if (error) clearError();
        };
    }, [error, clearError]);

    /**
     * Memoized email validation regex
     */
    const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

    /**
     * Validate email format (memoized)
     */
    const validateEmail = useCallback(
        (email: string): boolean => {
            return emailRegex.test(email);
        },
        [emailRegex],
    );

    /**
     * Validate form before submission (memoized)
     */
    const validateForm = useCallback(() => {
        const errors = {
            email: '',
            password: '',
        };
        let isValid = true;

        // Email validation
        if (!formData.email) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!validateEmail(formData.email)) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // Password validation
        if (!formData.password) {
            errors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    }, [formData, validateEmail]);

    /**
     * Handle input field changes (memoized)
     */
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));

        // Clear validation error when user starts typing
        if (validationErrors[id as keyof typeof validationErrors]) {
            setValidationErrors((prev) => ({
                ...prev,
                [id]: '',
            }));
        }

        // Clear auth error
        if (error) clearError();
    }, [validationErrors, error, clearError]);

    /**
     * Handle form submission (memoized)
     */
    const handleSubmit = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            if (!validateForm()) {
                return;
            }

            await login({
                email: formData.email.trim(),
                password: formData.password,
            });
        },
        [validateForm, login, formData],
    );

    return (
        <section className="login bg-zinc-50 min-h-screen flex items-center">
            <div className="mx-auto w-full px-4 md:px-8 xl:px-[75px] max-w-7xl">
                <div className="p-4 md:p-8 mx-auto md:bg-white rounded-lg md:shadow-lg">
                    <div className="flex items-center justify-center gap-8">
                        {/* Image Section */}
                        <div className="hidden w-full md:flex md:w-1/2 items-center justify-center">
                            <Image
                                src={HomeImage}
                                alt="Login"
                                width={400}
                                height={300}
                                className="object-contain h-[300px] w-full"
                                priority
                            />
                        </div>

                        {/* Form Section */}
                        <div className="w-full md:w-1/2 max-w-md">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Welcome Back
                                </h2>
                                <p className="text-gray-600">
                                    Don&apos;t have an account?{' '}
                                    <Link
                                        href="/signup"
                                        className="font-semibold text-primary hover:text-red-600 transition-colors"
                                    >
                                        Create an account
                                    </Link>
                                </p>
                            </div>

                            {/* Global Error Message */}
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                                <FormInput
                                    ref={emailInputRef}
                                    id="email"
                                    type="email"
                                    label="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    error={validationErrors.email}
                                    disabled={isLoading}
                                    required
                                    autoComplete="email"
                                />

                                <FormInput
                                    id="password"
                                    type="password"
                                    label="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    error={validationErrors.password}
                                    disabled={isLoading}
                                    required
                                    autoComplete="current-password"
                                    showPasswordToggle
                                />

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 mt-2 text-base font-semibold text-white rounded-lg bg-primary hover:bg-red-600 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                    aria-busy={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <LoadingSpinner />
                                            <span>Logging in...</span>
                                        </>
                                    ) : (
                                        'Login'
                                    )}
                                </button>
                            </form>

                            {/* Additional Links */}
                            <div className="mt-6 text-center">
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
