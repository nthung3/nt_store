'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getProductById } from '@/lib/features/product/product-slice';
import { toast } from 'react-toastify';
import axiosInstance from '@/lib/axios-instance';

interface ProductFormProps {
    productId?: string;
}

interface FormData {
    name: string;
    dsc: string;
    price: string;
    country: string;
    categoryId: string;
}

export default function ProductForm({ productId }: ProductFormProps): JSX.Element {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const imageFileRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<FormData>({
        name: '',
        dsc: '',
        price: '',
        country: '',
        categoryId: '',
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<FormData>>({});

    useEffect(() => {
        if (productId) {
            dispatch(getProductById({ productId }))
                .unwrap()
                .then((product) => {
                    setFormData({
                        name: product.name || '',
                        dsc: product.dsc || '',
                        price: product.price?.toString() || '',
                        country: product.country || '',
                        categoryId: product.categoryId || '',
                    });
                })
                .catch(() => {
                    toast.error('Failed to load product');
                });
        }
    }, [productId, dispatch]);

    function handleChange({ field, value }: { field: keyof FormData; value: string }): void {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }));
        }
    }

    function validateForm(): boolean {
        const newErrors: Partial<FormData> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Product name is required';
        }

        if (!formData.dsc.trim()) {
            newErrors.dsc = 'Description is required';
        }

        if (!formData.price.trim()) {
            newErrors.price = 'Price is required';
        } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            newErrors.price = 'Price must be a positive number';
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

        setLoading(true);

        try {
            const formDataToSend = new FormData();

            if (imageFileRef.current?.files?.[0]) {
                formDataToSend.append('imageFile', imageFileRef.current.files[0]);
            }

            formDataToSend.append(
                'data',
                JSON.stringify({
                    name: formData.name,
                    dsc: formData.dsc,
                    price: Number(formData.price),
                    country: formData.country,
                    categoryId: formData.categoryId,
                }),
            );

            if (productId) {
                await axiosInstance.put(`/products/${productId}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success('Product updated successfully');
            } else {
                await axiosInstance.post('/products', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success('Product created successfully');
            }

            router.push('/admin/products');
        } catch (err) {
            toast.error(productId ? 'Failed to update product' : 'Failed to create product');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category ID */}
                <div>
                    <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
                        Category ID
                    </label>
                    <input
                        type="text"
                        id="categoryId"
                        value={formData.categoryId}
                        onChange={(e) => handleChange({ field: 'categoryId', value: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-gray-100 border border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
                        placeholder="category-id"
                    />
                </div>

                {/* Product Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange({ field: 'name', value: e.target.value })}
                        className={`w-full px-4 py-3 text-sm bg-gray-100 border rounded-md focus:border-gray-500 focus:bg-white focus:ring-0 ${
                            errors.name ? 'border-red-500' : 'border-transparent'
                        }`}
                        placeholder="Delicious Pizza"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                {/* Image File */}
                <div>
                    <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-2">
                        Product Image {!productId && <span className="text-red-500">*</span>}
                    </label>
                    <input
                        type="file"
                        id="imageFile"
                        ref={imageFileRef}
                        accept="image/*"
                        className="w-full px-4 py-3 text-sm bg-gray-100 border border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
                    />
                    {productId && <p className="mt-1 text-xs text-gray-500">Leave empty to keep existing image</p>}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="dsc" className="block text-sm font-medium text-gray-700 mb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="dsc"
                        value={formData.dsc}
                        onChange={(e) => handleChange({ field: 'dsc', value: e.target.value })}
                        rows={4}
                        className={`w-full px-4 py-3 text-sm bg-gray-100 border rounded-md focus:border-gray-500 focus:bg-white focus:ring-0 ${
                            errors.dsc ? 'border-red-500' : 'border-transparent'
                        }`}
                        placeholder="A delicious product description..."
                    />
                    {errors.dsc && <p className="mt-1 text-sm text-red-500">{errors.dsc}</p>}
                </div>

                {/* Price */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="price"
                        value={formData.price}
                        onChange={(e) => handleChange({ field: 'price', value: e.target.value })}
                        className={`w-full px-4 py-3 text-sm bg-gray-100 border rounded-md focus:border-gray-500 focus:bg-white focus:ring-0 ${
                            errors.price ? 'border-red-500' : 'border-transparent'
                        }`}
                        placeholder="19.99"
                    />
                    {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                </div>

                {/* Country */}
                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                    </label>
                    <input
                        type="text"
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleChange({ field: 'country', value: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-gray-100 border border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
                        placeholder="USA"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/products')}
                        className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        {loading ? 'Saving...' : productId ? 'Update Product' : 'Create Product'}
                    </button>
                </div>
            </form>
        </div>
    );
}
