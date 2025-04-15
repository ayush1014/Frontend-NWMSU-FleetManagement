import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import {
    Bars3Icon,
    CalendarIcon,
    CogIcon,
    HomeIcon,
    MagnifyingGlassCircleIcon,
    MapIcon,
    MegaphoneIcon,
    SquaresPlusIcon,
    UserGroupIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronLeftIcon, EnvelopeIcon, FunnelIcon, MagnifyingGlassIcon, PhoneIcon, EllipsisVerticalIcon, PencilIcon, TrashIcon, UserPlusIcon, CalendarDaysIcon, KeyIcon } from '@heroicons/react/20/solid'
import Navigation from './Navigation'
import api from './Config/axios'
import { useNavigate } from 'react-router-dom'
import noImg from './assets/noImg.png'
import bearcat from './assets/bearcat.webp'
import { FaGasPump } from 'react-icons/fa'
import { OrbitProgress } from 'react-loading-indicators'

const user = {
    name: 'Tom Cook',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const tabs = [
    { name: 'Profile', href: '#', current: true },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Recognition', href: '#', current: false },
]


const team = [
    {
        name: 'Leslie Alexander',
        handle: 'lesliealexander',
        role: 'Co-Founder / CEO',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Michael Foster',
        handle: 'michaelfoster',
        role: 'Co-Founder / CTO',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Dries Vincent',
        handle: 'driesvincent',
        role: 'Business Relations',
        imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Lindsay Walton',
        handle: 'lindsaywalton',
        role: 'Front-end Developer',
        imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function UserTemp() {
    const [people, setPeople] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState();
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [activity, setActivity] = useState([])
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true)
        const fetchUsers = async () => {
            try {
                const response = await api.get('/showUsers');
                console.log(response.data);
                setPeople(response.data);
                setIsLoading(false)
            } catch (error) {
                console.log('Error fetching users:', error);
                setIsLoading(false)
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setOpenDropdown(null);
            }
        };

        // Add event listeners
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            // Clean up
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const toggleDropdown = (email, event) => {
        event.stopPropagation();
        event.preventDefault();
        setOpenDropdown(currentEmail => {
            if (currentEmail === email) {
                console.log('Closing dropdown because it is already open for:', email);
                return null;
            } else {
                console.log('Opening dropdown for:', email);
                return email;
            }
        });
    };


    const handleSelectEmail = (email) => {
        console.log('clicked', email)
        setSelectedEmail(email);
        const selectedUser = people.find(person => person.email === email);
        const combinedActivities = [...(selectedUser.Maintainences || []), ...(selectedUser.Refuelings || [])];
        combinedActivities.sort((a, b) => new Date(b.date) - new Date(a.date));
        setActivity(combinedActivities);

    }
    console.log(activity)

    const selectedUser = people.find(person => person.email === selectedEmail);

    const profile = {
        imageUrl:
            'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
        coverImageUrl:
            'https://secure.touchnet.com/C21165_ustores/web/uploaded_images/mall/northwestmissouri.jpg',
        about: `
        <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
        <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
        `,
        fields: {
            Role: selectedUser?.role || 'No Role',
            Email: selectedUser?.email || 'No Email',
            Title: selectedUser?.title || 'No Title',
            Department: selectedUser?.department || 'No Department',
        },
    };

    const handleAddUsersClick = () => {
        navigate('/add-users');
    };


    return (
        <>
            {isLoading ? (
                <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
                    <OrbitProgress color={["#031a03", "#094709", "#0e750e", "#13a313"]} />
                </div>
            ) : (
                <div>
                </div>
            )}
            <Navigation />
            <div className="flex h-full lg:pl-72" >
                {/* Static sidebar for desktop */}
                <div className="layout flex min-w-0 flex-1 flex-col overflow-hidden ">
                    <div className="relative z-0 flex flex-1 overflow-hidden ">
                        <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
                            {/* Breadcrumb */}
                            {selectedUser ? (<nav aria-label="Breadcrumb" className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden">
                                <a href="#" onClick={() => setSelectedEmail(null)} className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900">
                                    <ChevronLeftIcon aria-hidden="true" className="-ml-2 size-5 text-gray-400" />
                                    <span>User Directory</span>
                                </a>
                            </nav>) : (<></>)}
                            {selectedUser ? (<article className='overflow-hidden overflow-y-auto'>
                                {/* Profile header */}
                                <div>
                                    <div>
                                        <img alt="" src={profile.coverImageUrl} className="h-32 w-full object-cover object-center lg:h-48" />
                                    </div>
                                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                                        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                                            <div className="flex">
                                                <img
                                                    alt=""
                                                    src={selectedUser.profile_pic || bearcat}
                                                    className="size-24 object-cover object-center rounded-full ring-4 ring-white sm:size-32"
                                                />
                                            </div>
                                            <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                                                <div className="mt-6 min-w-0 flex-1 2xl:block">
                                                </div>
                                                <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                    >
                                                        <EnvelopeIcon aria-hidden="true" className="-ml-0.5 size-5 text-gray-400" />
                                                        Message
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                    >
                                                        <PhoneIcon aria-hidden="true" className="-ml-0.5 size-5 text-gray-400" />
                                                        Call
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                                            <h1 className="truncate text-2xl font-bold text-gray-900">{selectedUser.firstName} {selectedUser.lastName}</h1>
                                        </div>
                                    </div>
                                </div>

                                {/* Description list */}
                                <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8 ">
                                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                        {Object.keys(profile.fields).map((field) => (
                                            <div key={field} className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">{field}</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{profile.fields[field]}</dd>
                                            </div>
                                        ))}
                                    </dl>

                                    <div>
                                        {activity > [0] ? (
                                            <h2 className="text-lg font-semibold text-gray-900 mt-12">
                                                Activity
                                            </h2>) :
                                            (<h2 className="text-sm font-semibold text-gray-900 mt-12">
                                                No Refueling & Maintenence recorded on <span className='text-green-900 text-bold text-xl'>{selectedUser.firstName} {selectedUser.lastName}</span>
                                            </h2>)}
                                        <ul role="list" className="mt-6 space-y-6">
                                            {activity.map((item, idx) => (
                                                <li key={idx} className="relative flex gap-x-4 lg:px-24">
                                                    <div
                                                        className={`absolute left-4 lg:left-28 top-0 flex w-6 justify-center ${idx === activity.length - 1 ? 'h-6' : '-bottom-6'
                                                            }`}
                                                    >
                                                        <div className="w-px bg-gray-200" />
                                                    </div>
                                                    <img
                                                        alt=""
                                                        src={item.Vehicle?.vehiclePic}
                                                        className="relative mt-3 h-12 w-12 flex-none rounded-full bg-gray-50 object-cover object-center"
                                                    />
                                                    <div className="flex-auto rounded-md p-3 ring-gray-200">
                                                        <div className="flex justify-between gap-x-4">
                                                            <div className="py-0.5 text-xs text-gray-500">

                                                                {item.maintainenceDescription ? `performed maintenance (${item.maintainenceDescription})` : 'added fuel'}

                                                            </div>
                                                            <time dateTime={item.date} className="flex-none py-0.5 text-xs text-gray-500">
                                                                {new Date(item.date).toLocaleDateString()}
                                                            </time>
                                                        </div>
                                                        <p className='py-0.5 text-xs text-gray-500'>on <span className='text-green-800 font-semibold text-base'>{item.Vehicle?.make} {item.Vehicle?.model}</span>  {item.Vehicle?.modelYear} <span className='text-green-800 font-semibold text-base'>({item.Vehicle?.NWVehicleNo})</span></p>
                                                        <p className="text-sm text-gray-500">
                                                            {item.maintainenceDescription ? `Maintenance cost: $${item.maintainenceCost}` : `Fuel cost: $${item.fuelCost}`}
                                                        </p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                        {selectedUser.Refuelings > [0] ? (<div className="relative flex justify-center">
                                            <span className="bg-white px-3 my-8 text-base font-semibold text-gray-900"><span className='text-base font-green-700 text-semibold'>{selectedUser.firstName} Refuelings in 2025</span> </span>
                                        </div>) : (<div className="relative flex justify-center">
                                            <span className="bg-white px-3 my-8 text-base font-semibold text-gray-900">No Refueling & Maintenence Updates for {selectedUser.firstName}</span>
                                        </div>)}
                                        <ul
                                            role="list"
                                            className="mt-5 grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0 md:grid-cols-2 md:divide-y-0 md:gap-1"
                                        >
                                            {selectedUser.Refuelings
                                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                                .slice(0, 4)
                                                .map((refueling) => (
                                                    <li key={refueling.refuelingId} className="p-2">
                                                        <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                                                            <dl className="flex flex-wrap">
                                                                <div className="flex-auto pl-6 pt-6">
                                                                    <dt className="text-sm font-semibold text-gray-900">Amount</dt>
                                                                    <dd className="mt-1 text-base font-semibold text-gray-900">${refueling.fuelCost}</dd>
                                                                </div>
                                                                <div className="flex-none self-end px-6 pt-4">
                                                                    <dt className="sr-only">Status</dt>
                                                                    <dd className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                        Paid
                                                                    </dd>
                                                                </div>
                                                                <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                                                                    <dt className="flex-none">
                                                                        <span className="sr-only">Client</span>
                                                                        <div className="">
                                                                            <img
                                                                                alt=""
                                                                                src={refueling.Vehicle.vehiclePic}
                                                                                className="size-8 object-cover object-center rounded-full ring-4 ring-white"
                                                                            />
                                                                        </div>
                                                                    </dt>
                                                                    <dd className="text-sm font-medium mt-1 text-gray-900">{refueling.Vehicle.make} {refueling.Vehicle.model}</dd>
                                                                </div>
                                                                <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                                                    <dt className="flex-none">
                                                                        <span className="sr-only">Due date</span>
                                                                        <CalendarDaysIcon aria-hidden="true" className="h-6 w-6 text-gray-400" />
                                                                    </dt>
                                                                    <dd className="text-sm text-gray-500">
                                                                        <time dateTime={refueling.date}>{new Date(refueling.date).toLocaleDateString()}</time>
                                                                    </dd>
                                                                </div>
                                                                <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                                                    <dt className="flex-none">
                                                                        <span className="sr-only">Status</span>
                                                                        <KeyIcon aria-hidden="true" className="h-6 w-6 text-gray-400" />
                                                                    </dt>
                                                                    <dd className="text-sm text-gray-500"><span className='text-green-800 font-semibold'>Current Miles</span> {refueling.currentMileage} Miles</dd>
                                                                </div>
                                                                <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                                                    <dt className="flex-none">
                                                                        <span className="sr-only">Status</span>
                                                                        <FaGasPump aria-hidden="true" className="h-6 w-6 text-gray-400" />
                                                                    </dt>
                                                                    <dd className="text-sm text-gray-500"><span className='text-green-800 font-semibold'>Fuel Added</span> {refueling.fuelAdded} Gallons</dd>
                                                                </div>
                                                            </dl>
                                                            <div className="mt-6 border-t border-gray-900/5 px-6 py-6 hover-action-div ">
                                                                {refueling.receiptImage ? (
                                                                    <a
                                                                        href={refueling.receiptImage}
                                                                        download
                                                                        className="text-sm font-semibold text-gray-900"
                                                                    >
                                                                        Download receipt <span className="download-link-arrow" aria-hidden="true">&rarr;</span>
                                                                    </a>
                                                                ) : (
                                                                    <p className="text-sm font-semibold text-gray-500">No receipt available</p>
                                                                )}
                                                            </div>

                                                        </div>
                                                    </li>
                                                ))}
                                        </ul>

                                        {selectedUser.Maintainences > [0] ? (<div className="relative flex justify-center">
                                            <span className="bg-white px-3 my-8 text-base font-semibold text-gray-900"><span className='text-base font-green-700 text-semibold'>{selectedUser.firstName} Maintenence in 202</span>5</span>
                                        </div>) : (" ")}
                                        <ul
                                            role="list"
                                            className="mt-5 grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0 md:grid-cols-2 md:divide-y-0 md:gap-4"
                                        >
                                            {selectedUser.Maintainences
                                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                                .slice(0, 4)
                                                .map((maintenence) => (
                                                    <li key={maintenence.maintainenceId} className="p-4">
                                                        <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                                                            <dl className="flex flex-wrap">
                                                                <div className="flex-auto pl-6 pt-6">
                                                                    <dt className="text-sm font-semibold text-gray-900">Amount</dt>
                                                                    <dd className="mt-1 text-base font-semibold text-gray-900">${maintenence.maintainenceCost}</dd>
                                                                </div>
                                                                <div className="flex-none self-end px-6 pt-4">
                                                                    <dt className="sr-only">Status</dt>
                                                                    <dd className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                        Paid
                                                                    </dd>
                                                                </div>
                                                                <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                                                                    <dt className="flex-none">
                                                                        <span className="sr-only">Client</span>
                                                                        <div className="">
                                                                            <img
                                                                                alt=""
                                                                                src={maintenence.Vehicle.vehiclePic}
                                                                                className="size-8 object-cover object-center rounded-full ring-4 ring-white"
                                                                            />
                                                                        </div>
                                                                    </dt>
                                                                    <dd className="text-sm font-medium mt-1 text-gray-900">{maintenence.Vehicle.make} {maintenence.Vehicle.model}</dd>
                                                                </div>
                                                                <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                                                    <dt className="flex-none">
                                                                        <span className="sr-only">Due date</span>
                                                                        <CalendarDaysIcon aria-hidden="true" className="h-6 w-6 text-gray-400" />
                                                                    </dt>
                                                                    <dd className="text-sm text-gray-500">
                                                                        <time dateTime={maintenence.date}>{new Date(maintenence.date).toLocaleDateString()}</time>
                                                                    </dd>
                                                                </div>
                                                                <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                                                    <dt className="flex-none">
                                                                        <span className="sr-only">Status</span>
                                                                        <KeyIcon aria-hidden="true" className="h-6 w-6 text-gray-400" />
                                                                    </dt>
                                                                    <dd className="text-sm text-gray-500"><span className='text-green-800 font-semibold'>Current Miles</span> {maintenence.currentMileage} Miles</dd>
                                                                </div>
                                                                <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                                                    <dt className="flex-none">
                                                                        <span className="sr-only">Status</span>
                                                                        <FaGasPump aria-hidden="true" className="h-6 w-6 text-gray-400" />
                                                                    </dt>
                                                                    <dd className="text-sm text-gray-500"><span className='text-green-800 font-semibold'>Fuel Added</span> {maintenence.fuelAdded} Gallons</dd>
                                                                </div>
                                                            </dl>
                                                            <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                                                                {maintenence.receiptImage ? (
                                                                    <a
                                                                        href={maintenence.receiptImage}
                                                                        download
                                                                        className="text-sm font-semibold text-gray-900 hover-action-div"
                                                                    >
                                                                        Download receipt <span className="download-link-arrow" aria-hidden="true">&rarr;</span>
                                                                    </a>
                                                                ) : (
                                                                    <p className="text-sm font-semibold text-gray-500">No receipt available</p>
                                                                )}
                                                            </div>

                                                        </div>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                            </article>) : (<div className='lg:hidden user-directory-event'>
                                <div className="px-6 pb-4 pt-6">
                                    <h2 className="text-lg font-medium text-gray-900 ">User Directory</h2>
                                    <p className="mt-1 text-sm text-gray-600">Search directory of {people.length} users</p>
                                    <form action="#" className="mt-6 flex gap-x-4">
                                        <div className="grid min-w-0 flex-1 grid-cols-1">
                                            <input
                                                name="search"
                                                type="search"
                                                placeholder="Search"
                                                className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6"
                                            />
                                            <MagnifyingGlassIcon
                                                aria-hidden="true"
                                                className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
                                            />

                                        </div>
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        >
                                            <FunnelIcon aria-hidden="true" className="size-5" />
                                            <span className="sr-only">Search</span>
                                        </button>

                                    </form>
                                    <div className='mb-[20%] mt-6'>
                                        <button
                                            type="button"
                                            className="absolute left-[10%] rounded-md bg-green-100 px-3.5 py-2.5 text-base font-semibold text-green-800 shadow-sm hover:bg-green-100"
                                            onClick={handleAddUsersClick}
                                        >
                                            <div className='flex flex-row gap-2'><UserPlusIcon className='w-6 h-6' /> <span>Add Users</span></div>
                                        </button>
                                    </div>
                                </div>

                                {/* Directory list */}
                                <aside className='lg:hidden '>
                                    <nav aria-label="Directory" className="min-h-0 flex-1 overflow-hidden overflow-y-auto ">
                                        {people.map((person) => (
                                            <div key={person.email} className="relative">
                                                <div className="sticky top-0 border-b border-t border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
                                                </div>
                                                <ul role="list" className="relative divide-y divide-gray-200 ">
                                                    <li key={person.email}>
                                                        <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-500 hover:bg-gray-50 ">
                                                            <div className="shrink-0">
                                                                <img alt="" src={person.profile_pic || bearcat} className="size-10 rounded-full object-cover object-center" />
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <a onClick={() => handleSelectEmail(person.email)} className="focus:outline-none">
                                                                    {/* Extend touch target to entire panel */}
                                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                                    <p className="text-sm font-medium text-gray-900">{person.firstName} {person.lastName}</p>
                                                                    <span className={`inline-flex mt-1 items-center rounded-full px-2 py-0.5 text-xs font-medium ${person.role === 'Admin' ? 'text-green-700 bg-green-50 ring-green-600/20 max-w-[25%] md:max-w-[30%] lg:max-w-[40%]  [1366px]:max-w-[100%]' : 'text-red-700 bg-red-50 ring-red-600/20 max-w-[30%] md:max-w-[35%] lg:max-w-[45%]'}  ring-1 ring-inset `}>
                                                                        {person.role}
                                                                    </span>
                                                                </a>
                                                            </div>
                                                            <button onClick={(event) => { toggleDropdown(person.email, event) }} className="p-2 z-10 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                                                <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />
                                                            </button>
                                                            {openDropdown === person.email && (
                                                                <div ref={dropdownRef} className="absolute z-0 right-0 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                                                    <div className="py-1">
                                                                        <a href={`/edit-user/${person.email}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => navigate(`/edit-user/${person.email}`)}>
                                                                            <PencilIcon className="size-5 inline mr-3 text-gray-400" />
                                                                            Edit
                                                                        </a>
                                                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => console.log('Remove')}>
                                                                            <TrashIcon className="size-5 inline mr-3 text-gray-400" />
                                                                            Remove
                                                                        </a>
                                                                    </div>
                                                                </div>)}
                                                        </div>


                                                    </li>
                                                </ul>
                                            </div>
                                        ))}
                                    </nav>
                                </aside>
                            </div>)}
                        </main>
                        <aside className="hidden w-96 min-h-fit shrink-0 border-r border-gray-200 xl:order-first xl:flex xl:flex-col pb-24 sidebar">
                            <div className="px-6 pb-4 pt-6">
                                <h2 className="text-lg font-medium text-gray-900">User Directory</h2>
                                <p className="mt-1 text-sm text-gray-600">Search directory of {people.length} users</p>
                                <form action="#" className="mt-6 flex gap-x-4">
                                    <div className="grid min-w-0 flex-1 grid-cols-1">
                                        <input
                                            name="search"
                                            type="search"
                                            placeholder="Search"
                                            className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6"
                                        />
                                        <MagnifyingGlassIcon
                                            aria-hidden="true"
                                            className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
                                        />

                                    </div>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        <FunnelIcon aria-hidden="true" className="size-5" />
                                        <span className="sr-only">Search</span>
                                    </button>

                                </form>
                                <div className='mb-[20%] mt-6'>
                                    <button
                                        type="button"
                                        className="absolute left-[10%] rounded-md bg-green-100 px-3.5 py-2.5 text-base font-semibold text-green-800 shadow-sm hover:bg-green-100"
                                        onClick={handleAddUsersClick}
                                    >
                                        <div className='flex flex-row gap-2'><UserPlusIcon className='w-6 h-6' /> <span>Add Users</span></div>
                                    </button>
                                </div>
                            </div>
                            {/* Directory list */}
                            <nav aria-label="Directory" className="min-h-0 flex-1 overflow-hidden overflow-y-auto">
                                {people.map((person) => (
                                    <div key={person.email} className="relative">
                                        <div className="sticky top-0 border-b border-t border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
                                        </div>
                                        <ul role="list" className="relative divide-y divide-gray-200">
                                            <li key={person.email}>
                                                <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-500 hover:bg-gray-50">
                                                    <div className="shrink-0">
                                                        <img alt="" src={person.profile_pic || bearcat} className="size-10 rounded-full object-cover object-center" />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <a onClick={() => handleSelectEmail(person.email)} className="focus:outline-none">
                                                            {/* Extend touch target to entire panel */}
                                                            <span aria-hidden="true" className="absolute inset-0" />
                                                            <p className="text-sm font-medium text-gray-900">{person.firstName} {person.lastName}</p>
                                                            <span className={`inline-flex mt-1 items-center rounded-full px-2 py-0.5 text-xs font-medium ${person.role === 'Admin' ? 'text-green-700 bg-green-50 ring-green-600/20 max-w-[25%] md:max-w-[30%] lg:max-w-[40%]  [1366px]:max-w-[100%]' : 'text-red-700 bg-red-50 ring-red-600/20 max-w-[30%] md:max-w-[35%] lg:max-w-[45%]'}  ring-1 ring-inset `}>
                                                                {person.role}
                                                            </span>
                                                        </a>
                                                    </div>
                                                    <button onClick={(event) => { toggleDropdown(person.email, event) }} className="p-2 z-10 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                                        <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />
                                                    </button>
                                                    {openDropdown === person.email && (
                                                        <div ref={dropdownRef} className="absolute z-0 right-0 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                                            <div className="py-1">
                                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => navigate(`/edit-user/${person.email}`)}>
                                                                    <PencilIcon className="size-5 inline mr-3 text-gray-400" />
                                                                    Edit
                                                                </a>
                                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => console.log('Remove')}>
                                                                    <TrashIcon className="size-5 inline mr-3 text-gray-400" />
                                                                    Remove
                                                                </a>
                                                            </div>
                                                        </div>)}
                                                </div>


                                            </li>
                                        </ul>
                                    </div>
                                ))}
                            </nav>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    )
}
