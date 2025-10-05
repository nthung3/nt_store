import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

export function formatPrice({ amount, currency = 'USD' }: { amount: number; currency?: string }): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);
}

export function formatDate({ date, format = 'short' }: { date: Date | string; format?: 'short' | 'long' }): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (format === 'long') {
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    return dateObj.toLocaleDateString('en-US');
}
