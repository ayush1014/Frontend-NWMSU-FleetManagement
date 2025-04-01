import { EnvelopeIcon, PhoneIcon, MagnifyingGlassIcon, UserPlusIcon, EllipsisVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/react/20/solid'
import Navigation from './Navigation'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import api from './Config/axios';

export default function Users() {
    const [people, setPeople] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);

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


    const toggleDropdown = (email) => {
        if (openDropdown === email) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(email);
        }
    };

    const navigate = useNavigate();

    const handleAddUsersClick = () => {
        navigate('/add-users');
    };
    return (
        <div className='min-h-screen bg-gray-200'>
            <Navigation />

            <main className='lg:pl-[23%] lg:pr-[4%] mt-[2%] '>
                <div className="mb-6">
                    <div className="relative rounded-full shadow-sm">
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
                            placeholder="Search users..."
                        />
                    </div>
                </div>
                <div className='mb-6'>
                    <button
                        type="button"
                        className="absolute right-[100px] rounded-md bg-green-100 px-3.5 py-2.5 text-base font-semibold text-green-800 shadow-sm hover:bg-green-100"
                        onClick={handleAddUsersClick}
                    >
                        <div className='flex flex-row gap-2'><UserPlusIcon className='w-6 h-6' /> <span>Add Users</span></div>
                    </button>
                </div>
                <ul role="list" className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {people.map((person) => (
                        <li key={person.email} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow relative"> 
                            <div className="flex w-full items-center justify-between space-x-6 p-6">
                                <img alt="" src={person.profile_pic} className="size-16 shrink-0 rounded-full bg-gray-300 object-cover" />
                                <div className="flex-1">
                                    <div className="flex flex-col">
                                        <h3 className="text-md font-medium text-gray-900">{person.firstName} {person.lastName}</h3>
                                        <span className={`inline-flex mt-1 items-center rounded-full px-2 py-0.5 text-xs font-medium ${person.role === 'Admin' ? 'text-green-700 bg-green-50 ring-green-600/20 max-w-[25%] md:max-w-[30%] lg:max-w-[40%]  [1366px]:max-w-[100%]' : 'text-red-700 bg-red-50 ring-red-600/20 max-w-[30%] md:max-w-[35%] lg:max-w-[45%]'}  ring-1 ring-inset `}>
                                            {person.role}
                                        </span>
                                    </div>
                                    <p className="mt-1 truncate text-sm text-gray-500">{person.title}</p>
                                </div>
                                <button onClick={() => toggleDropdown(person.email)} className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />
                                </button>
                                {openDropdown === person.email && (
                                    <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"> 
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
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="-mt-px flex divide-x divide-gray-200">
                                    <div className="flex w-0 flex-1">
                                        <a href={`mailto:${person.email}`} className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                                            <EnvelopeIcon className="size-5 text-gray-400" aria-hidden="true" />
                                            Email
                                        </a>
                                    </div>
                                    <div className="-ml-px flex w-0 flex-1">
                                        <a href={`tel:${person.telephone}`} className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                                            <PhoneIcon className="size-5 text-gray-400" aria-hidden="true" />
                                            Call
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

            </main>
        </div>
    )
}
