import UserForm from '@/components/admin/user-form';

interface EditUserPageProps {
    params: {
        id: string;
    };
}

export default function EditUserPage({ params }: EditUserPageProps): JSX.Element {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Edit User</h1>
            <UserForm userId={params.id} />
        </div>
    );
}
