import UserForm from '@/components/admin/user-form';

export default function CreateUserPage(): JSX.Element {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Create New User</h1>
            <UserForm />
        </div>
    );
}
