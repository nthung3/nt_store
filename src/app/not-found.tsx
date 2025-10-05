import Link from 'next/link';

export default function NotFound(): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-8">The page you are looking for does not exist.</p>
            <Link href="/" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90">
                Go Home
            </Link>
        </div>
    );
}
