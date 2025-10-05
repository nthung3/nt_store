'use client';

export default function AdminFooter(): JSX.Element {
    return (
        <div className="mt-24">
            <p className="text-center text-gray-700 dark:text-gray-200">
                © {new Date().getFullYear()} Foods Craft Admin. All rights reserved.
            </p>
        </div>
    );
}
