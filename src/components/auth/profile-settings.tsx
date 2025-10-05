'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/core/hooks/useAuth';
import type { UpdateProfileRequest } from '@/core/interfaces/auth';

export default function ProfileSettings(): JSX.Element {
    const { user, updateProfile, isLoading, error, clearError } = useAuth();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
    });

    const [validationErrors, setValidationErrors] = useState({
        firstName: '',
        lastName: '',
    });

    const [hasChanges, setHasChanges] = useState(false);

    // Initialize form with user data
    useEffect(() => {
        if (user) {
            const nameParts = user.name.split(' ');
            setFormData({
                firstName: nameParts[0] || '',
                lastName: nameParts.slice(1).join(' ') || '',
                phoneNumber: user.phoneNumber || '',
                address: user.address || '',
            });
        }
    }, [user]);

    // Track changes
    useEffect(() => {
        if (user) {
            const nameParts = user.name.split(' ');
            const originalFirstName = nameParts[0] || '';
            const originalLastName = nameParts.slice(1).join(' ') || '';

            const changed =
                formData.firstName !== originalFirstName ||
                formData.lastName !== originalLastName ||
                formData.phoneNumber !== (user.phoneNumber || '') ||
                formData.address !== (user.address || '');

            setHasChanges(changed);
        }
    }, [formData, user]);

    /**
     * Validate form before submission
     */
    function validateForm(): boolean {
        const errors = {
            firstName: '',
            lastName: '',
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

        setValidationErrors(errors);
        return isValid;
    }

    /**
     * Handle input field changes
     */
    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
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
    }

    /**
     * Handle form submission
     */
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const updateData: UpdateProfileRequest = {
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
        };

        // Only include optional fields if they have values
        if (formData.phoneNumber.trim()) {
            updateData.phoneNumber = formData.phoneNumber.trim();
        }

        if (formData.address.trim()) {
            updateData.address = formData.address.trim();
        }

        await updateProfile(updateData);
    }

    /**
     * Reset form to original values
     */
    function handleReset(): void {
        if (user) {
            const nameParts = user.name.split(' ');
            setFormData({
                firstName: nameParts[0] || '',
                lastName: nameParts.slice(1).join(' ') || '',
                phoneNumber: user.phoneNumber || '',
                address: user.address || '',
            });
            setValidationErrors({
                firstName: '',
                lastName: '',
            });
            if (error) clearError();
        }
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="text-center">
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Settings</h2>
                    <p className="text-gray-600">Update your personal information</p>
                </div>

                {/* User Info (Read-only) */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium text-gray-900">{user.email}</p>
                        </div>
                        <div>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${user.role === 0 ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                {user.role === 0 ? 'Admin' : 'User'}
                            </span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Email cannot be changed. Contact support if you need to update your email address.
                    </p>
                </div>

                {/* Global Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {/* Form */}
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

                    {/* Phone Number */}
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

                    {/* Address */}
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Address <span className="text-gray-400">(Optional)</span>
                        </label>
                        <textarea
                            id="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="123 Main St, City, State, ZIP"
                            rows={3}
                            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg outline-none transition-colors bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                            disabled={isLoading}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={handleReset}
                            disabled={isLoading || !hasChanges}
                            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !hasChanges}
                            className="px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-primary hover:bg-red-600 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Saving...</span>
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                </form>

                {/* Account Info */}
                <div className="mt-6 pt-6 border-t">
                    <p className="text-xs text-gray-500">
                        Account Status: <span className={`font-semibold ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>{user.isActive ? 'Active' : 'Inactive'}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Member since: {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>
        </div>
    );
}
