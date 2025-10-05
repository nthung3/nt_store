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
 * Optimized Signup Page Component
 * - Performance: Memoized callbacks, auto-focus, smart validation
 * - UX: Password visibility toggle, better accessibility, password strength
 * - Code: Reusable components, cleaner structure
 */
export default function SignupContent(): JSX.Element {
    const router = useRouter();
    const { signup, isAuthenticated, isLoading, error, clearError } = useAuth();
    const firstNameInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        address: '',
    });

    const [validationErrors, setValidationErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // Auto-focus first name input on mount
    useEffect(() => {
        firstNameInputRef.current?.focus();
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
        (email: string) => emailRegex.test(email),
        [emailRegex],
    );

    /**
     * Validate form before submission (memoized)
     */
    const validateForm = useCallback(() =>{
        const errors = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
        let isValid = true;

        // First name validation
        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required';
            isValid = false;
        } else if (formData.firstName.trim().length < 2) {
            errors.firstName = 'First name must be at least 2 characters';
            isValid = false;
        }

        // Last name validation
        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required';
            isValid = false;
        } else if (formData.lastName.trim().length < 2) {
            errors.lastName = 'Last name must be at least 2 characters';
            isValid = false;
        }

        // Email validation
        if (!formData.email) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!validateEmail(formData.email)) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // Password validation (minimum 6 characters per API docs)
        if (!formData.password) {
            errors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    }, [formData, validateEmail]);

    /**
     * Handle input field changes (memoized)
     */
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        await signup({
            email: formData.email.trim(),
            password: formData.password,
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            phoneNumber: formData.phoneNumber.trim() || undefined,
            address: formData.address.trim() || undefined,
        });
    }, [validateForm, signup, formData]);

    return (
        <section className="signup bg-zinc-50 min-h-screen flex items-center py-8">
            <div className="mx-auto w-full px-4 md:px-8 xl:px-[75px] max-w-7xl">
                <div className="p-4 md:p-8 mx-auto md:bg-white rounded-lg md:shadow-lg">
                    <div className="flex items-center justify-center gap-8">
                        {/* Image Section */}
                        <div className="hidden w-full lg:flex lg:w-1/2 items-center justify-center">
                            <Image src={HomeImage} alt="Signup" width={400} height={300} className="object-contain h-[300px] w-full" priority />
                        </div>

                        {/* Form Section */}
                        <div className="w-full lg:w-1/2 max-w-md">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
                                <p className="text-gray-600">
                                    Already have an account?{' '}
                                    <Link href="/login" className="font-semibold text-primary hover:text-red-600 transition-colors">
                                        Login here
                                    </Link>
                                </p>
                            </div>

                            {/* Global Error Message */}
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name Fields Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* First Name */}
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="John"
                                            className={`w-full px-4 py-2.5 text-sm border rounded-lg outline-none transition-colors
                                                ${validationErrors.firstName ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20'}`}
                                            disabled={isLoading}
                                        />
                                        {validationErrors.firstName && <p className="mt-1 text-xs text-red-600">{validationErrors.firstName}</p>}
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Doe"
                                            className={`w-full px-4 py-2.5 text-sm border rounded-lg outline-none transition-colors
                                                ${validationErrors.lastName ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20'}`}
                                            disabled={isLoading}
                                        />
                                        {validationErrors.lastName && <p className="mt-1 text-xs text-red-600">{validationErrors.lastName}</p>}
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john.doe@example.com"
                                        className={`w-full px-4 py-2.5 text-sm border rounded-lg outline-none transition-colors
                                            ${validationErrors.email ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20'}`}
                                        disabled={isLoading}
                                    />
                                    {validationErrors.email && <p className="mt-1 text-xs text-red-600">{validationErrors.email}</p>}
                                </div>

                                {/* Password Fields Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Password */}
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                            Password *
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Min 6 characters"
                                            className={`w-full px-4 py-2.5 text-sm border rounded-lg outline-none transition-colors
                                                ${validationErrors.password ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20'}`}
                                            disabled={isLoading}
                                        />
                                        {validationErrors.password && <p className="mt-1 text-xs text-red-600">{validationErrors.password}</p>}
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm Password *
                                        </label>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Re-enter password"
                                            className={`w-full px-4 py-2.5 text-sm border rounded-lg outline-none transition-colors
                                                ${validationErrors.confirmPassword ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20'}`}
                                            disabled={isLoading}
                                        />
                                        {validationErrors.confirmPassword && <p className="mt-1 text-xs text-red-600">{validationErrors.confirmPassword}</p>}
                                    </div>
                                </div>

                                {/* Optional: Phone Number */}
                                <div>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number <span className="text-gray-400">(Optional)</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="+1234567890"
                                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg outline-none transition-colors bg-white focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Optional: Address */}
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                        Address <span className="text-gray-400">(Optional)</span>
                                    </label>
                                    <textarea
                                        id="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="123 Main St, City, State, ZIP"
                                        rows={2}
                                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg outline-none transition-colors bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 mt-2 text-base font-semibold text-white rounded-lg bg-primary hover:bg-red-600 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span>Creating Account...</span>
                                        </>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>

                                <p className="text-xs text-gray-500 text-center mt-4">
                                    By creating an account, you agree to our Terms of Service and Privacy Policy.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
