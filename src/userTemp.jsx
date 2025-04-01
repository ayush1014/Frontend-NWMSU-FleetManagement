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
import { ChevronLeftIcon, EnvelopeIcon, FunnelIcon, MagnifyingGlassIcon, PhoneIcon, EllipsisVerticalIcon, PencilIcon, TrashIcon, UserPlusIcon } from '@heroicons/react/20/solid'
import Navigation from './Navigation'
import api from './Config/axios'
import { useNavigate } from 'react-router-dom'

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


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/showUsers');
                console.log(response.data);
                setPeople(response.data);

            } catch (error) {
                console.log('Error fetching users:', error);
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

    }
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
            Role: selectedUser?.role || 'No Email',
            Email: selectedUser?.email || 'No Email',
            Title: '',
            Office: '',
        },
    };

    const handleAddUsersClick = () => {
        navigate('/add-users');
    };


    return (
        <>
            <Navigation />
            <div className="flex h-full lg:pl-72">
                {/* Static sidebar for desktop */}
                <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                    <div className="lg:hidden">
                        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-1.5">
                            <div>
                                <img
                                    alt="Your Company"
                                    src="https://cdnsm5-ss11.sharpschool.com/UserFiles/Servers/Server_125464/Image/055.png"
                                    className="h-8 w-auto"
                                />
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setSidebarOpen(true)}
                                    className="-mr-3 inline-flex size-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
                                >
                                    <span className="sr-only">Open sidebar</span>
                                    <Bars3Icon aria-hidden="true" className="size-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-0 flex flex-1 overflow-hidden">
                        <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
                            {/* Breadcrumb */}
                            <nav aria-label="Breadcrumb" className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden">
                                <a href="#" className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900">
                                    <ChevronLeftIcon aria-hidden="true" className="-ml-2 size-5 text-gray-400" />
                                    <span>User Directory</span>
                                </a>
                            </nav>

                            {selectedUser ? (<article>
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
                                                    src={selectedUser.profile_pic}
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

                                {/* Tabs */}
                                {/* <div className="mt-6 sm:mt-2 2xl:mt-5">
                                    <div className="border-b border-gray-200">
                                        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                                            <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                                                {tabs.map((tab) => (
                                                    <a
                                                        key={tab.name}
                                                        href={tab.href}
                                                        aria-current={tab.current ? 'page' : undefined}
                                                        className={classNames(
                                                            tab.current
                                                                ? 'border-pink-500 text-gray-900'
                                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                                            'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium',
                                                        )}
                                                    >
                                                        {tab.name}
                                                    </a>
                                                ))}
                                            </nav>
                                        </div>
                                    </div>
                                </div> */}

                                {/* Description list */}
                                <div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
                                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                        {Object.keys(profile.fields).map((field) => (
                                            <div key={field} className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">{field}</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{profile.fields[field]}</dd>
                                            </div>
                                        ))}
                                        {/* <div className="sm:col-span-2">
                                            <dt className="text-sm font-medium text-gray-500">About</dt>
                                            <dd
                                                dangerouslySetInnerHTML={{ __html: profile.about }}
                                                className="mt-1 max-w-prose space-y-5 text-sm text-gray-900"
                                            />
                                        </div> */}
                                    </dl>
                                </div>

                                {/* Team member list */}
                                {/* <div className="mx-auto mt-8 max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
                                    <h2 className="text-sm font-medium text-gray-500">Team members</h2>
                                    <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {team.map((person) => (
                                            <div
                                                key={person.handle}
                                                className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2 hover:border-gray-400"
                                            >
                                                <div className="shrink-0">
                                                    <img alt="" src={person.imageUrl} className="size-10 rounded-full" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <a href="#" className="focus:outline-none">
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        <p className="text-sm font-medium text-gray-900">{person.name}</p>
                                                        <p className="truncate text-sm text-gray-500">{person.role}</p>
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div> */}
                            </article>) : (<></>)}
                        </main>
                        <aside className="hidden w-96 shrink-0 border-r border-gray-200 xl:order-first xl:flex xl:flex-col">
                            <div className="px-6 pb-4 pt-6">
                                <h2 className="text-lg font-medium text-gray-900">User Directory</h2>
                                <p className="mt-1 text-sm text-gray-600">Search directory of {people.length} users</p>
                                <form action="#" className="mt-6 flex gap-x-4">
                                    <div className="grid min-w-0 flex-1 grid-cols-1">
                                        <input
                                            name="search"
                                            type="search"
                                            placeholder="Search"
                                            className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-pink-500 sm:text-sm/6"
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
                                                <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 hover:bg-gray-50">
                                                    <div className="shrink-0">
                                                        <img alt="" src={person.profile_pic} className="size-10 rounded-full object-cover object-center" />
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
                                                    <button onClick={(event) => { toggleDropdown(person.email, event) }} className="p-2 z-10 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                        <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />
                                                    </button>
                                                    {openDropdown === person.email && (
                                                        <div ref={dropdownRef} className="absolute z-0 right-0 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                                            <div className="py-1">
                                                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => console.log('Edit')}>
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
