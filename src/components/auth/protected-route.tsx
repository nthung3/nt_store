'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

export function ProtectedRoute({ children, redirectTo = '/login' }: ProtectedRouteProps): JSX.Element | null {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            if (typeof window === 'undefined') return;

            const role = localStorage.getItem('role');
            const accessToken = localStorage.getItem('token');
            const isAdmin = role !== '1' && accessToken && role;

            if (!isAdmin) {
                router.push(redirectTo);
            }
        };

        checkAuth();
    }, [router, redirectTo]);

    const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const isAdmin = role !== '1' && accessToken && role;

    if (!isAdmin) {
        return null;
    }

    return <>{children}</>;
}
