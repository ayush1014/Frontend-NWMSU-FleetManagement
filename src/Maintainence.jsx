
import { useState, useEffect } from 'react'
import {
    CheckCircleIcon,
    ChevronRightIcon,
} from '@heroicons/react/20/solid'
import Navigation from './Navigation'
import { HR } from 'flowbite-react'
import api from './Config/axios';
import { useNavigate } from 'react-router-dom';
import { OrbitProgress } from 'react-loading-indicators'
import { UserCircleIcon, TruckIcon, PlusCircleIcon, WrenchScrewdriverIcon } from '@heroicons/react/20/solid'

export default function Maintenance() {
    const [maintenance, setMaintenance] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        const fetchMaintenance = async () => {
            try {
                const response = await api.get('/showMaintainence');
                setMaintenance(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch maintenance:', error);
                setIsLoading(false);
            }
        };

        fetchMaintenance();
    }, []);

    const handleAddMaintenenceClick = () => {
        navigate('/add-maintainence');
    };
    return (
        <>
            <Navigation />
            <div className="min-h-full">
                <main className="pb-16 pt-8 lg:pl-[22%] lg:pr-[5%] mt-[1%]">
                    {isLoading ? (
                        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
                            <OrbitProgress color={["#031a03", "#094709", "#0e750e", "#13a313"]} />
                        </div>
                    ) : (
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className='pb-12'>
                                <button
                                    type="button"
                                    className="absolute right-[100px] rounded-md bg-green-100 px-3.5 py-2.5 text-base font-semibold text-green-800 shadow-sm hover:bg-green-100"
                                    onClick={handleAddMaintenenceClick}
                                >
                                    <div className='flex flex-row gap-2'>
                                        <div className='flex flex-row'>
                                            <WrenchScrewdriverIcon className='w-6 h-6' />
                                            <PlusCircleIcon className='w-[20px] h-[20px] mt-[2px]' />
                                        </div>
                                        <span>
                                            Add Maintenence
                                        </span>
                                    </div>
                                </button>
                            </div>
                            <div className="px-4 sm:px-0">
                                <h2 className="text-lg font-medium text-gray-900">Recent Maintenance</h2>
                            </div>

                            <ul role="list" className="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0">
                                {maintenance.slice(0, 4).map((maintenance) => (
                                    <li key={maintenance.maintainenceId}>
                                        <div className="group block" onClick={() => navigate(`/vehicleMaintence/${maintenance.NWVehicleNo}`)}>
                                            <div className="flex items-center px-4 py-5 sm:px-0 sm:py-6 cursor-pointer">
                                                <div className="flex min-w-0 flex-1 items-center">
                                                    <div className="shrink-0">
                                                        <img
                                                            alt=""
                                                            src={maintenance.Vehicle.vehiclePic}
                                                            className="size-16 rounded-full object-contain object-center group-hover:opacity-75"
                                                        />
                                                    </div>
                                                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                        <div>
                                                            <p className="truncate text-sm font-medium text-green-800">
                                                                {maintenance.NWVehicleNo}
                                                            </p>
                                                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                                                <span className="truncate">
                                                                    Maintenance by - {maintenance.User.firstName} {maintenance.User.lastName}
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div className="hidden md:block">
                                                            <div>
                                                                <div className="">
                                                                    <p className="flex gap-2 text-sm text-gray-900">
                                                                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                            {maintenance.Vehicle.modelYear} {maintenance.Vehicle.make} {maintenance.Vehicle.model}
                                                                        </span>
                                                                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                                                            {maintenance.Vehicle.vehicleDepartment}
                                                                        </span>
                                                                    </p>
                                                                    <p className="mt-2 flex gap-1 items-center text-sm text-gray-500">
                                                                        <WrenchScrewdriverIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-green-400" />
                                                                        Maintenance on <time dateTime={maintenance.date}>{new Date(maintenance.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</time>
                                                                    </p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>

                                                <div>
                                                    <ChevronRightIcon
                                                        aria-hidden="true"
                                                        className="size-5 text-gray-400 group-hover:text-gray-700"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <HR />
                            <div className="px-4 sm:px-0">
                                <h2 className="text-lg font-medium text-gray-900">All Maintenance</h2>
                            </div>
                            <ul role="list" className="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0">
                                {maintenance.map((maintenance) => (
                                    <li key={maintenance.maintenanceId}>
                                        <div className="group block" onClick={() => navigate(`/vehicleMaintence/${maintenance.NWVehicleNo}`)}>
                                            <div className="flex items-center px-4 py-5 sm:px-0 sm:py-6 cursor-pointer">
                                                <div className="flex min-w-0 flex-1 items-center">
                                                    <div className="shrink-0">
                                                        <img
                                                            alt=""
                                                            src={maintenance.Vehicle.vehiclePic}
                                                            className="size-16 rounded-full object-contain object-center group-hover:opacity-75"
                                                        />
                                                    </div>
                                                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                        <div>
                                                            <p className="truncate text-sm font-medium text-green-600">
                                                                {maintenance.NWVehicleNo}
                                                            </p>
                                                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                                                <span className="truncate">
                                                                    Maintenance by - {maintenance.User.firstName} {maintenance.User.lastName}
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div className="hidden md:block">
                                                            <div className="">
                                                                <p className="flex gap-2 text-sm text-gray-900">
                                                                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                        {maintenance.Vehicle.modelYear} {maintenance.Vehicle.make} {maintenance.Vehicle.model}
                                                                    </span>
                                                                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                                                        {maintenance.Vehicle.vehicleDepartment}
                                                                    </span>
                                                                </p>
                                                                <p className="mt-2 flex gap-1 items-center text-sm text-gray-500">
                                                                    <WrenchScrewdriverIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-green-400" />
                                                                    Maintenance on <time dateTime={maintenance.date}>{new Date(maintenance.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</time>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <ChevronRightIcon
                                                        aria-hidden="true"
                                                        className="size-5 text-gray-400 group-hover:text-gray-700"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>)}
                </main>
            </div>
        </>
    );
}
