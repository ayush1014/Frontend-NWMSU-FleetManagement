import nwmsu_logo from './assets/nwmsu-logo.svg';
import { React } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const gridItems = [
        { name: "Analytics", path: "/analytics", icon: "📊" },
        { name: "Update Vehicle Details", path: "/update-vehicle", icon: "🚗" },
        { name: "Generate Reports", path: "/reports", icon: "📄" },
        { name: "Manage Users", path: "/manage-users", icon: "👥" },
        { name: "Dummy 1", path: "/maintenance", icon: "🛠️" },
        { name: "Dummy 2", path: "/billing", icon: "🛠️" },
        { name: "Dummy 3", path: "/notifications", icon: "🔔" },
        { name: "Dummy 4", path: "/support", icon: "🛠️" },
        { name: "Dummy 5", path: "/settings", icon: "⚙️" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center px-6 py-12">
            {/* Header */}
            <div className="w-full max-w-6xl flex items-center justify-between mb-10">
                <img src={nwmsu_logo} alt="NWMSU Logo" className="h-12 w-auto" />
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>

            {/* Grid Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {gridItems.map((item, index) => (
                    <Link 
                        key={index}
                        to={item.path}
                        className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition-all duration-200 ease-in-out hover:bg-green-100"
                    >
                        <div className="text-4xl">{item.icon}</div>
                        <h2 className="mt-4 text-lg font-semibold text-gray-900">{item.name}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
}
