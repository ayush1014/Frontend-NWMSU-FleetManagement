import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon, MagnifyingGlassIcon, PlusCircleIcon, TruckIcon } from '@heroicons/react/20/solid'
import Navigation from './Navigation'
import { useNavigate } from 'react-router-dom';
import { FaTruckPickup, FaShuttleVan, FaCarSide } from "react-icons/fa";
import { GiSurferVan } from "react-icons/gi";
import { useState } from 'react';

const Fleece = [
    {
        name: 'Pickup Truck',
        vin: 12345678903,
        role: 'Library',
        imageUrl: FaTruckPickup,
        href: '#',
        condition: 'new',
    },
    {
        name: 'Car',
        vin: 12345678903,
        role: 'International Office',
        imageUrl: FaCarSide,
        href: '#',
        condition: 'old',
    },
    {
        name: 'Shuttle',
        vin: 12345678903,
        role: 'University Police Department',
        imageUrl: FaShuttleVan,
        href: '#',
        condition: 'new',
    },
    {
        name: 'Van',
        vin: 12345678903,
        role: 'Career Services',
        imageUrl: GiSurferVan,
        href: '#',
        condition: 'old',
    },
    {
        name: 'Car',
        vin: 12345678903,
        role: 'Alumni Services',
        imageUrl: FaCarSide,
        href: '#',
        condition: 'new',
    },
    {
        name: 'Pickup Truck',
        vin: 12345678903,
        role: 'Reclycling Center',
        imageUrl: FaTruckPickup,
        href: '#',
        condition: 'old',
    },
    {
        name: 'Van',
        vin: 12345678903,
        role: 'International Office',
        imageUrl: GiSurferVan,
        href: '#',
        condition: 'new',
    },
]

export default function Vehicle() {
    const navigate = useNavigate();
    const [conditionFilter, setConditionFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');

    const handleAddVehicleClick = () => {
        navigate('/add-vehicles');
    };

    const filteredVehicles = Fleece.filter(vehicle => {
        const matchesCondition = conditionFilter === 'all' || vehicle.condition === conditionFilter;
        const matchesType = typeFilter === 'all' || vehicle.name.toLowerCase() === typeFilter;
        return matchesCondition && matchesType;
    });

    return (
        <div className='min-h-screen'>
            <Navigation />
            <main className='lg:pl-[23%] lg:pr-[4%] mt-[2%] flex'>
                {/* Filter Sidebar */}
                <div className="w-64 mr-6">
                    <div className="bg-white rounded-lg shadow p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
                        
                        {/* Condition Filter */}
                        <div className="mb-6">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Condition</h4>
                            <select
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-600 sm:text-sm"
                                value={conditionFilter}
                                onChange={(e) => setConditionFilter(e.target.value)}
                            >
                                <option value="all">All Conditions</option>
                                <option value="new">New Vehicles</option>
                                <option value="old">Old Vehicles</option>
                            </select>
                        </div>

                        {/* Type Filter */}
                        <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Vehicle Type</h4>
                            <select
                                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-600 sm:text-sm"
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                            >
                                <option value="all">All Types</option>
                                <option value="pickup truck">Pickup Truck</option>
                                <option value="car">Car</option>
                                <option value="shuttle">Shuttle</option>
                                <option value="van">Van</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="relative rounded-full shadow-sm mb-4">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </div>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            className="block w-full rounded-full border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                            placeholder="Search vehicles..."
                        />
                    </div>
                    <div className='mb-6'>
                        <button
                            type="button"
                            className="absolute right-[100px] rounded-md bg-green-100 px-3.5 py-2.5 text-base font-semibold text-green-800 shadow-sm hover:bg-green-100"
                            onClick={handleAddVehicleClick}
                        >
                            <div className='flex flex-row gap-2'>
                                <div className='flex flex-row'>
                                    <TruckIcon className='w-6 h-6 -mr-[2px]' />
                                    <PlusCircleIcon className='w-[15px] h-[15px] mt-[2px]' />
                                </div>
                                <span>
                                    Add Vehicles
                                </span>
                            </div>
                        </button>
                    </div>
                    <ul role="list" className="divide-y divide-gray-100 mt-16">
                        {filteredVehicles.map((vehicle) => (
                            <li key={vehicle.vin} className="flex justify-between gap-x-6 py-5">
                                <div className="flex min-w-0 gap-x-4">
                                    <vehicle.imageUrl className="size-12 flex-none" />
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm/6 font-semibold text-gray-900">
                                            <a href={vehicle.href} className="hover:underline">
                                                {vehicle.name}
                                            </a>
                                        </p>
                                        <p className="mt-1 flex text-xs/5 text-gray-500">
                                            <a href={`mailto:${vehicle.vin}`} className="truncate hover:underline">
                                                {vehicle.vin}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-x-6">
                                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm/6 text-gray-900">{vehicle.role}</p>
                                    </div>
                                    <Menu as="div" className="relative flex-none">
                                        <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                            <span className="sr-only">Open options</span>
                                            <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                                        </MenuButton>
                                        <MenuItems
                                            transition
                                            className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                        >
                                            <MenuItem>
                                                <a
                                                    href="#"
                                                    className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                                                >
                                                    View profile<span className="sr-only">, {vehicle.name}</span>
                                                </a>
                                            </MenuItem>
                                            <MenuItem>
                                                <a
                                                    href="#"
                                                    className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                                                >
                                                    Message<span className="sr-only">, {vehicle.name}</span>
                                                </a>
                                            </MenuItem>
                                        </MenuItems>
                                    </Menu>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    )
}