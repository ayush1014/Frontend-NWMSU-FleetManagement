
import { useState, useEffect } from 'react'
import {
    CheckCircleIcon,
    ChevronRightIcon,
    PlusCircleIcon,
    TruckIcon
} from '@heroicons/react/20/solid'
import Navigation from './Navigation'
import { HR } from 'flowbite-react'
import api from './Config/axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { FaGasPump } from 'react-icons/fa'
import { OrbitProgress } from 'react-loading-indicators'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useUser } from './AppContext/userContext';

export default function Refueling() {
    const [refuelings, setRefuelings] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState('');
    const { user } = useUser();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        setIsLoading(true)
        user ? setRole(user.role) : null;
        const fetchRefuelings = async () => {
            try {
                const response = await api.get('/showRefueling');
                setRefuelings(response.data);
                console.log('refueling data: ', response.data)
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch refuelings:', error);
                setIsLoading(false);
            }
        };

        fetchRefuelings();
    }, []);


    const handleAddRefuelingClick = () => {
        navigate('/add-refueling');
    };

    const indexOfLastRefueling = currentPage * itemsPerPage;
    const indexOfFirstRefueling = indexOfLastRefueling - itemsPerPage;
    const currentRefuelings = refuelings.slice(indexOfFirstRefueling, indexOfLastRefueling);
    const totalPages = Math.ceil(refuelings.length / itemsPerPage);

    return (
        <>
            <Navigation />
            <div className="min-h-full">
                <main className="pb-16 pt-8 lg:pl-[20%] lg:pr-[4%] mt-[1%]">
                    {isLoading ? (
                        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
                            <OrbitProgress color={["#031a03", "#094709", "#0e750e", "#13a313"]} />
                        </div>
                    ) : (
                        <div>
                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className='pb-12'>
                                    <button
                                        type="button"
                                        className="absolute right-[100px] rounded-md bg-green-100 px-3.5 py-2.5 text-base font-semibold text-green-800 shadow-sm hover:bg-green-100"
                                        onClick={handleAddRefuelingClick}
                                    >
                                        <div className='flex flex-row gap-2'>
                                            <div className='flex flex-row'>
                                                <FaGasPump className='w-6 h-6' />
                                                <PlusCircleIcon className='w-[20px] h-[20px] mt-[2px]' />
                                            </div>
                                            <span>
                                                Add Refueling
                                            </span>
                                        </div>
                                    </button>
                                </div>
                                <div className="px-4 sm:px-0">
                                    <h2 className="text-lg font-medium text-gray-900">Recent Refueling</h2>
                                </div>

                                <ul role="list" className="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0">
                                    {[...refuelings]
                                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                        .slice(0, 4)
                                        .map((refueling) => (
                                            <li key={refueling.refuelingId} >
                                                <div className="group block" onClick={() => navigate(`/vehicleRefueling/${refueling.NWVehicleNo}`)}>
                                                    <div className="flex items-center px-4 py-5 sm:px-0 sm:py-6 cursor-pointer">
                                                        <div className="flex min-w-0 flex-1 items-center">
                                                            <div className="shrink-0">
                                                                <img
                                                                    alt=""
                                                                    src={refueling.Vehicle.vehiclePic}
                                                                    className="size-16 object-contain object-center rounded-full group-hover:opacity-75"
                                                                />
                                                            </div>
                                                            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                                <div>
                                                                    <p className="truncate text-sm font-medium text-green-800">
                                                                        {refueling.NWVehicleNo}
                                                                    </p>
                                                                    <p className="mt-2 flex items-center text-sm text-gray-500">
                                                                        <span className="truncate">
                                                                            Refueled by - {refueling.User.firstName} {refueling.User.lastName}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                                <div className="hidden md:block">
                                                                    <div>
                                                                        <div className="">
                                                                            <p className="flex gap-2 text-sm text-gray-900">
                                                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                                    {refueling.Vehicle.modelYear} {refueling.Vehicle.make} {refueling.Vehicle.model}
                                                                                </span>
                                                                                <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                                                                    {refueling.Vehicle.vehicleDepartment}
                                                                                </span>
                                                                            </p>
                                                                            <p className="mt-2 flex gap-1 items-center text-sm text-gray-500">
                                                                                <FaGasPump aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-green-400" />
                                                                                Refueled on <time dateTime={refueling.date}>{new Date(refueling.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</time>
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div>
                                                            {role === 'Admin' ? (<div className="relative z-10 ml-4">
                                                                <Menu as="div" className="relative inline-block text-left">
                                                                    <Menu.Button
                                                                        onClick={(e) => e.stopPropagation()}
                                                                        className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100 focus:outline-none"
                                                                    >
                                                                        <svg className="h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h.01M12 12h.01M18 12h.01" />
                                                                        </svg>
                                                                    </Menu.Button>
                                                                    <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                        <div className="py-1">
                                                                            <Menu.Item>
                                                                                {({ active }) => (
                                                                                    <button
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            navigate(`/edit-refueling/${refueling.refuelingId}`);
                                                                                        }}
                                                                                        className={`${active ? 'bg-gray-100' : ''
                                                                                            } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                                                                                    >
                                                                                        Edit
                                                                                    </button>
                                                                                )}
                                                                            </Menu.Item>
                                                                            <Menu.Item>
                                                                                {({ active }) => (
                                                                                    <button
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            // Replace with your delete logic
                                                                                            console.log('Delete refueling:', refueling.refuelingId);
                                                                                        }}
                                                                                        className={`${active ? 'bg-gray-100' : ''
                                                                                            } flex w-full items-center px-4 py-2 text-sm text-red-600`}
                                                                                    >
                                                                                        Delete
                                                                                    </button>
                                                                                )}
                                                                            </Menu.Item>
                                                                        </div>
                                                                    </Menu.Items>
                                                                </Menu>
                                                            </div>) : (
                                                                <ChevronRightIcon
                                                                    aria-hidden="true"
                                                                    className="size-5 text-gray-400 group-hover:text-gray-700"
                                                                />)}
                                                        </div>
                                                    </div>

                                                </div>
                                            </li>
                                        ))}
                                </ul>

                                <HR />
                                <div className="px-4 sm:px-0">
                                    <h2 className="text-lg font-medium text-gray-900">All Refueling</h2>
                                </div>
                                <ul role="list" className="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0">
                                    {currentRefuelings.map((refueling) => (
                                        <li key={refueling.refuelingId}>
                                            <div className="group block" onClick={() => navigate(`/vehicleRefueling/${refueling.NWVehicleNo}`)}>
                                                <div className="flex items-center px-4 py-5 sm:px-0 sm:py-6 cursor-pointer">
                                                    <div className="flex min-w-0 flex-1 items-center">
                                                        <div className="shrink-0">
                                                            <img
                                                                alt=""
                                                                src={refueling.Vehicle.vehiclePic}
                                                                className="size-16 rounded-full object-contain object-center group-hover:opacity-75"
                                                            />
                                                        </div>
                                                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                            <div>
                                                                <p className="truncate text-sm font-medium text-green-600">
                                                                    {refueling.NWVehicleNo}
                                                                </p>
                                                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                                                    <span className="truncate">
                                                                        Refueled by - {refueling.User.firstName} {refueling.User.lastName}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div className="hidden md:block">
                                                                <div className="">
                                                                    <p className="flex gap-2 text-sm text-gray-900">
                                                                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                            {refueling.Vehicle.modelYear} {refueling.Vehicle.make} {refueling.Vehicle.model}
                                                                        </span>
                                                                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                                                            {refueling.Vehicle.vehicleDepartment}
                                                                        </span>
                                                                    </p>
                                                                    <p className="mt-2 flex gap-1 items-center text-sm text-gray-500">
                                                                        <FaGasPump aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-green-400" />
                                                                        Refueled on <time dateTime={refueling.date}>{new Date(refueling.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</time>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <div>
                                                                {role === 'Admin' ? (<div className="relative z-10 ml-4">
                                                                    <Menu as="div" className="relative inline-block text-left">
                                                                        <Menu.Button
                                                                            onClick={(e) => e.stopPropagation()}
                                                                            className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100 focus:outline-none"
                                                                        >
                                                                            <svg className="h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h.01M12 12h.01M18 12h.01" />
                                                                            </svg>
                                                                        </Menu.Button>
                                                                        <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                            <div className="py-1">
                                                                                <Menu.Item>
                                                                                    {({ active }) => (
                                                                                        <button
                                                                                            onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                navigate(`/edit-refueling/${refueling.refuelingId}`);
                                                                                            }}
                                                                                            className={`${active ? 'bg-gray-100' : ''
                                                                                                } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                                                                                        >
                                                                                            Edit
                                                                                        </button>
                                                                                    )}
                                                                                </Menu.Item>
                                                                                <Menu.Item>
                                                                                    {({ active }) => (
                                                                                        <button
                                                                                            onClick={(e) => {
                                                                                                e.stopPropagation();
                                                                                                // Replace with your delete logic
                                                                                                console.log('Delete refueling:', refueling.refuelingId);
                                                                                            }}
                                                                                            className={`${active ? 'bg-gray-100' : ''
                                                                                                } flex w-full items-center px-4 py-2 text-sm text-red-600`}
                                                                                        >
                                                                                            Delete
                                                                                        </button>
                                                                                    )}
                                                                                </Menu.Item>
                                                                            </div>
                                                                        </Menu.Items>
                                                                    </Menu>
                                                                </div>) : (
                                                                    <ChevronRightIcon
                                                                        aria-hidden="true"
                                                                        className="size-5 text-gray-400 group-hover:text-gray-700"
                                                                    />)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex justify-center mt-6 space-x-1 text-sm text-gray-700">
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 rounded-md hover:bg-gray-100 disabled:text-gray-400"
                                    >
                                        ← Previous
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`px-3 py-1 border-b-2 ${currentPage === i + 1
                                                ? 'border-green-600 text-green-600 font-semibold'
                                                : 'border-transparent text-gray-600'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1 rounded-md hover:bg-gray-100 disabled:text-gray-400"
                                    >
                                        Next →
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </>
    );
}