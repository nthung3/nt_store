'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { createUser, updateUser, fetchUserById, clearCurrentUser } from '@/lib/features/users/user-slice';
import { toast } from 'react-toastify';

interface UserFormProps {
    userId?: string;
}

interface FormData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: number;
    phoneNumber: string;
    address: string;
}

export default function UserForm({ userId }: UserFormProps): JSX.Element {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { currentUser, loading } = useAppSelector((state) => state.users);

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        role: 1,
        phoneNumber: '',
        address: '',
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserById({ userId }));
        }
        return () => {
            dispatch(clearCurrentUser());
        };
    }, [userId, dispatch]);

    useEffect(() => {
        if (currentUser && userId) {
            setFormData({
                email: currentUser.email || '',
                password: '',
                firstName: currentUser.firstName || '',
                lastName: currentUser.lastName || '',
                role: currentUser.role ?? 1,
                phoneNumber: currentUser.phoneNumber || '',
                address: currentUser.address || '',
            });
        }
    }, [currentUser, userId]);

    function handleChange({ field, value }: { field: keyof FormData; value: string | number }): void {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        // Clear error for this field
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }));
        }
    }

    function validateForm(): boolean {
        const newErrors: Partial<FormData> = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!userId && !formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (!userId && formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fix the form errors');
            return;
        }

        try {
            if (userId) {
                // Update user
                const updateData = {
                    email: formData.email,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    role: formData.role,
                    phoneNumber: formData.phoneNumber || undefined,
                    address: formData.address || undefined,
                };
                await dispatch(updateUser({ userId, data: updateData })).unwrap();
                toast.success('User updated successfully');
            } else {
                // Create user
                const createData = {
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    role: formData.role,
                    phoneNumber: formData.phoneNumber || undefined,
                    address: formData.address || undefined,
                };
                await dispatch(createUser({ data: createData })).unwrap();
                toast.success('User created successfully');
            }
            router.push('/admin/users');
        } catch (err) {
            toast.error(userId ? 'Failed to update user' : 'Failed to create user');
        }
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleChange({ field: 'email', value: e.target.value })}
                        className={`w-full px-4 py-3 text-sm bg-gray-100 border rounded-md focus:border-gray-500 focus:bg-white focus:ring-0 ${
                            errors.email ? 'border-red-500' : 'border-transparent'
                        }`}
                        placeholder="user@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* Password (only for create) */}
                {!userId && (
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={(e) => handleChange({ field: 'password', value: e.target.value })}
                            className={`w-full px-4 py-3 text-sm bg-gray-100 border rounded-md focus:border-gray-500 focus:bg-white focus:ring-0 ${
                                errors.password ? 'border-red-500' : 'border-transparent'
                            }`}
                            placeholder="Minimum 6 characters"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                    </div>
                )}

                {/* First Name */}
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleChange({ field: 'firstName', value: e.target.value })}
                        className={`w-full px-4 py-3 text-sm bg-gray-100 border rounded-md focus:border-gray-500 focus:bg-white focus:ring-0 ${
                            errors.firstName ? 'border-red-500' : 'border-transparent'
                        }`}
                        placeholder="John"
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleChange({ field: 'lastName', value: e.target.value })}
                        className={`w-full px-4 py-3 text-sm bg-gray-100 border rounded-md focus:border-gray-500 focus:bg-white focus:ring-0 ${
                            errors.lastName ? 'border-red-500' : 'border-transparent'
                        }`}
                        placeholder="Doe"
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                </div>

                {/* Role */}
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                        Role <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="role"
                        value={formData.role}
                        onChange={(e) => handleChange({ field: 'role', value: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 text-sm bg-gray-100 border border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
                    >
                        <option value={1}>User</option>
                        <option value={0}>Admin</option>
                    </select>
                </div>

                {/* Phone Number */}
                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => handleChange({ field: 'phoneNumber', value: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-gray-100 border border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
                        placeholder="+1234567890"
                    />
                </div>

                {/* Address */}
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                    </label>
                    <textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleChange({ field: 'address', value: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 text-sm bg-gray-100 border border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
                        placeholder="123 Main St, City, Country"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/users')}
                        className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        {loading ? 'Saving...' : userId ? 'Update User' : 'Create User'}
                    </button>
                </div>
            </form>
        </div>
    );
}
