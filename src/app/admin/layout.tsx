import { ProtectedRoute } from '@/components/auth/protected-route';
import AdminLayoutWrapper from '@/components/admin/admin-layout-wrapper';

export default function AdminLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <ProtectedRoute redirectTo="/login">
            <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
        </ProtectedRoute>
    );
}
