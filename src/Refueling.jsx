
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

export default function Refueling() {
    const [refuelings, setRefuelings] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchRefuelings = async () => {
            try {
                const response = await api.get('/showRefueling');
                setRefuelings(response.data);
            } catch (error) {
                console.error('Failed to fetch refuelings:', error);
            }
        };

        fetchRefuelings();
    }, []);


    const handleAddRefuelingClick = () => {
        navigate('/add-refueling');
    };
    return (
        <>
            <Navigation />
            <div className="min-h-full">
                <main className="pb-16 pt-8 lg:pl-[22%] lg:pr-[5%] mt-[1%]">
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
                                        <PlusCircleIcon className='w-[15px] h-[15px] mt-[2px]' />
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
                            {refuelings.slice(0, 4).map((refueling) => (
                                <li key={refueling.refuelingId} >
                                    <div className="group block" onClick={() => navigate(`/vehicleRefueling/${refueling.NWVehicleNo}`)}>
                                        <div className="flex items-center px-4 py-5 sm:px-0 sm:py-6 cursor-pointer">
                                            <div className="flex min-w-0 flex-1 items-center">
                                                <div className="shrink-0">
                                                    <img
                                                        alt=""
                                                        src={refueling.Vehicle.vehiclePic}
                                                        className="size-12 rounded-full group-hover:opacity-75"
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
                                                                    <CheckCircleIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-green-400" />
                                                                    Refueled on <time dateTime={refueling.date}>{new Date(refueling.date).toLocaleDateString()}</time>
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
                            <h2 className="text-lg font-medium text-gray-900">All Refueling</h2>
                        </div>
                        <ul role="list" className="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0">
                            {refuelings.map((refueling) => (
                                <li key={refueling.refuelingId}>
                                    <div className="group block" onClick={() => navigate(`/vehicleRefueling/${refueling.NWVehicleNo}`)}>
                                        <div className="flex items-center px-4 py-5 sm:px-0 sm:py-6 cursor-pointer">
                                            <div className="flex min-w-0 flex-1 items-center">
                                                <div className="shrink-0">
                                                    <img
                                                        alt=""
                                                        src={refueling.Vehicle.vehiclePic}
                                                        className="size-12 rounded-full group-hover:opacity-75"
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
                                                                <CheckCircleIcon aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-green-400" />
                                                                Refueled on <time dateTime={refueling.date}>{new Date(refueling.date).toLocaleDateString()}</time>
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
                    </div>
                </main>
            </div>
        </>
    );
}

{/* <nav
                            aria-label="Pagination"
                            className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0"
                        >
                            <div className="-mt-px flex w-0 flex-1">
                                <a
                                    href="#"
                                    className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                                >
                                    <ArrowLongLeftIcon aria-hidden="true" className="mr-3 size-5 text-gray-400" />
                                    Previous
                                </a>
                            </div>
                            <div className="hidden md:-mt-px md:flex">
                                <a
                                    href="#"
                                    className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                                >
                                    1
                                </a>
                                <a
                                    href="#"
                                    aria-current="page"
                                    className="inline-flex items-center border-t-2 border-purple-500 px-4 pt-4 text-sm font-medium text-purple-600"
                                >
                                    2
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                                >
                                    3
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                                >
                                    4
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                                >
                                    5
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                                >
                                    6
                                </a>
                            </div>
                            <div className="-mt-px flex w-0 flex-1 justify-end">
                                <a
                                    href="#"
                                    className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700"
                                >
                                    Next
                                    <ArrowLongRightIcon aria-hidden="true" className="ml-3 size-5 text-gray-400" />
                                </a>
                            </div>
                        </nav> */}