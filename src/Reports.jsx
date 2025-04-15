import React from 'react';
import Navigation from './Navigation';

export default function Reports() {
    return (
        <div className="min-h-screen bg-gray-200">
            {/* Sidebar */}
            <Navigation />

            {/* Main Content Area */}
            <main className="lg:pl-[25%] lg:pr-[5%] mt-[6%]">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800">Reports Page</h1>
                    <p className="mt-4 text-gray-600">
                        This is where you can generate and view reports.
                    </p>
                </div>
            </main>
        </div>
    );
}