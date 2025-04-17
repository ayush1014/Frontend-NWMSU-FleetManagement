import { UserCircleIcon, TruckIcon, WrenchScrewdriverIcon } from '@heroicons/react/20/solid'
import { FaGasPump } from 'react-icons/fa';
import { HiDocumentReport } from "react-icons/hi";
import { FcSettings } from "react-icons/fc";
import Navigation from './Navigation';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react'
import { useUser } from './AppContext/userContext'




export default function Home() {
    const navigate = useNavigate();
    const { user } = useUser()
    const [role, setRole] = useState('');
    const [content, setContent] = useState([]);

    useEffect(() => {
        if (user) {
            setRole(user.role);
        }
    }, [user]);


    useEffect(() => {
        if (role === 'Admin') {
            setContent([
                {
                    name: 'User Accounts',
                    title: 'Add/Edit Users',
                    role: 'Admin',
                    imageUrl: UserCircleIcon,
                    href: '/user-temp'
                },
                {
                    name: 'Vehicle Records',
                    title: 'View, Add/Edit Vehicle Details',
                    role: 'Admin',
                    imageUrl: TruckIcon,
                    href: '/Vehicles'
                },
                {
                    name: 'Refueling Events',
                    title: 'Update/ Edit fleece refueling ',
                    role: 'Admin',
                    imageUrl: FaGasPump,
                    href: '/refueling'
                },
                {
                    name: 'Maintainence Events',
                    title: 'Fleece Maintainence update/edit',
                    role: 'Admin',
                    imageUrl: WrenchScrewdriverIcon,
                    href: '/maintenance'
                },
                {
                    name: 'Reports',
                    title: 'Generate, Update & Report Analytics',
                    role: 'Admin',
                    imageUrl: HiDocumentReport,
                    href: '#'
                },
                {
                    name: 'Settings',
                    title: 'Update Password, User permissions & more',
                    role: 'Admin',
                    imageUrl: FcSettings,
                    href: '#'
                },
            ]);
        } else {
            setContent([
                {
                    name: 'User Accounts',
                    title: 'Access All User Profile & Directories',
                    role: 'User',
                    imageUrl: UserCircleIcon,
                    href: '/user-temp'
                },
                {
                    name: 'Vehicle Records',
                    title: 'View Vehicle Details',
                    role: 'User',
                    imageUrl: TruckIcon,
                    href: '/Vehicles'
                },
                {
                    name: 'Refueling Events',
                    title: 'Add Update/ Edit fleece refueling ',
                    role: 'User',
                    imageUrl: FaGasPump,
                    href: '/refueling'
                },
                {
                    name: 'Maintainence Events',
                    title: 'Add Fleet Maintainence update/edit',
                    role: 'User',
                    imageUrl: WrenchScrewdriverIcon,
                    href: '/maintenance'
                }
            ]);
        }
    }, [role]);

    // useEffect(() => {
    //     try {
    //         const data = sessionStorage.getItem('userData');
    //         const userData = JSON.parse(data)

    //         if (userData) {

    //         } else {
    //             console.log('Internal Server Error, Error fetching user information')
    //         }

    //     } catch (error) {
    //         console.log('error fetching data from the session storage: ', error)
    //     }
    // })

    return (
        <div className='min-h-screen bg-gray-200'>
            <Navigation />
            <main className='lg:pl-[25%] lg:pr-[4%] mt-[6%] pb-[5%]'>
                {role === 'Admin' ?(<ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-10 cursor-pointer">
                    {content.map((grid) => (
                        <li
                            key={grid.name}
                            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                            onClick={() => navigate(grid.href)}
                        >
                            <div className="flex flex-1 flex-col p-8 ">
                                <div className="mx-auto size-28 shrink-0 rounded-full">
                                    <grid.imageUrl
                                        className="size-28 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </div>
                                <h3 className="mt-6 text-xl font-semibold text-gray-900">{grid.name}</h3>
                                <dl className="mt-1 flex grow flex-col justify-between">
                                    <dt className="sr-only">Title</dt>
                                    <dd className="text-sm text-gray-500">{grid.title}</dd>
                                    <dt className="sr-only">Role</dt>
                                </dl>
                            </div>
                        </li>
                    ))}
                </ul>):(<ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mt-10 cursor-pointer">
                    {content.map((grid) => (
                        <li
                            key={grid.name}
                            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                            onClick={() => navigate(grid.href)}
                        >
                            <div className="flex flex-1 flex-col p-8">
                                <div className="mx-auto size-28 shrink-0 rounded-full">
                                    <grid.imageUrl
                                        className="size-28 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </div>
                                <h3 className="mt-6 text-xl font-semibold text-gray-900">{grid.name}</h3>
                                <dl className="mt-1 flex grow flex-col justify-between">
                                    <dt className="sr-only">Title</dt>
                                    <dd className="text-sm text-gray-500">{grid.title}</dd>
                                    <dt className="sr-only">Role</dt>
                                </dl>
                            </div>
                        </li>
                    ))}
                </ul>)}
            </main>
        </div>
    )
}
