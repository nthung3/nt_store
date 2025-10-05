'use client';

import { RiContactsLine } from 'react-icons/ri';

export default function CustomersList(): JSX.Element {
    return (
        <div className="mt-18 p-8">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold">Customers Management</h1>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <RiContactsLine className="text-6xl text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Customer Management</h2>
                    <p className="text-gray-500 mb-6">
                        This section will display customer information and purchase history. Integration with customer
                        API endpoints is required.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
                        <h3 className="font-semibold text-green-900 mb-2">Implementation Required:</h3>
                        <ul className="text-left text-sm text-green-800 space-y-1">
                            <li>• Create customer Redux slice and API service</li>
                            <li>• Build customer list with filters</li>
                            <li>• Add customer detail view with order history</li>
                            <li>• Implement customer search functionality</li>
                            <li>• Add customer analytics dashboard</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
