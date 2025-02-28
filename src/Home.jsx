import { UserCircleIcon, TruckIcon, WrenchScrewdriverIcon } from '@heroicons/react/20/solid'
import { FaGasPump } from 'react-icons/fa';
import { HiDocumentReport } from "react-icons/hi";
import { FcSettings } from "react-icons/fc";
import Navigation from './Navigation';
import { useNavigate } from 'react-router-dom';

const Content = [
    {
        name: 'User Accounts',
        title: 'Add/Edit Users',
        role: 'Admin',
        imageUrl: UserCircleIcon,
        href:'/Users'
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
        href:'#'
    },
    {
        name: 'Maintainence Events',
        title: 'Fleece Maintainence update/edit',
        role: 'Admin',
        imageUrl: WrenchScrewdriverIcon,
        href:'#'
    },
    {
        name: 'Reports',
        title: 'Generate, Update & Report Analytics',
        role: 'Admin',
        imageUrl: HiDocumentReport,
        href:'#'
    },
    {
        name: 'Settings',
        title: 'Update Password, User permissions & more',
        role: 'Admin',
        imageUrl: FcSettings,
        href:'#'
    },
]

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className='min-h-screen bg-gray-200'>
            <Navigation />
            <main className='lg:pl-[25%] lg:pr-[5%] mt-[6%]'>
                <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-10 cursor-pointer">
                    {Content.map((grid) => (
                        <li
                            key={grid.email}
                            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                            onClick={()=>navigate(grid.href)}
                        >
                            <div className="flex flex-1 flex-col p-8">
                                <div className="mx-auto size-32 shrink-0 rounded-full">
                                    <grid.imageUrl
                                        className="size-32 text-gray-400"
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
                </ul>
            </main>
        </div>
    )
}
