import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon, MagnifyingGlassIcon, PlusCircleIcon, TruckIcon } from '@heroicons/react/20/solid'
import Navigation from './Navigation'
import { FaTruckPickup, FaShuttleVan, FaCarSide } from "react-icons/fa";
import { GiSurferVan } from "react-icons/gi";


const Fleece = [
    {
        name: 'Pickup Truck',
        vin:12345678903,
        role: 'Library',
        imageUrl: FaTruckPickup,
        href: '#',
    },
    {
        name: 'Car',
        vin:12345678903,
        role: 'International Office',
        imageUrl:FaCarSide,
        href: '#',
    },
    {
        name: 'Shuttle',
        vin: 12345678903,
        role: 'University Police Department',
        imageUrl:FaShuttleVan,
        href: '#',
    },
    {
        name: 'Van',
        vin:12345678903,
        role: 'Career Services',
        imageUrl:GiSurferVan,
        href: '#',
    },
    {
        name: 'Car',
        vin:12345678903,
        role: 'Alumni Services',
        imageUrl:FaCarSide,
        href: '#',
    },
    {
        name: 'Pickup Truck',
        vin:12345678903,
        role: 'Reclycling Center',
        imageUrl:FaTruckPickup,
        href: '#',
    },
    {
        name: 'Van',
        vin:12345678903,
        role: 'International Office',
        imageUrl:GiSurferVan,
        href: '#',
    },
]

export default function Vehicle() {
    return (
        <div className='min-h-screen'>
            <Navigation />
            <main className='lg:pl-[23%] lg:pr-[4%] mt-[2%] '>
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
                    {Fleece.map((vehicle) => (
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
            </main>
        </div>
    )
}
