import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
} from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
    UserCircleIcon, TruckIcon, WrenchScrewdriverIcon
} from '@heroicons/react/24/outline'
import { FaGasPump } from 'react-icons/fa';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Home from './Home'
import nwmsu_logo from './assets/nwmsu-logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from './AppContext/userContext'

export default function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useUser();

    const navigation = [
        { name: 'Dashboard', href: '/home', icon: HomeIcon, current: location.pathname ==='/home' },
        { name: 'Users', href: '/user-temp', icon: UsersIcon, current: location.pathname === '/user-temp' },
        { name: 'Vehicles', href: '/Vehicles', icon: TruckIcon, current: location.pathname === '/Vehicles' },
        { name: 'Refueling', href: '/refueling', icon: FaGasPump, current: location.pathname === '/refueling' },
        { name: 'Maintainence', href: '/maintenance', icon: WrenchScrewdriverIcon, current: location.pathname === '/maintenance' },
        { name: 'Reports', href: '/reports', icon: ChartPieIcon, current: location.pathname === '/reports' },
    ];

    const userNavigation = [
        { name: 'Your profile', href: '/user-profile' },
        { name: 'Sign out', action: 'logout', href: '/' },
    ];

    const handleUserNavClick = (item) => {
        if (item.action === 'logout'){
            logout();
            navigate(item.href);
        } else {
            navigate(item.href);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth === 1024 && window.innerHeight === 1366) {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <>
            <div className='bg-gray-200'>
                <div className=''>
                    <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                        <DialogBackdrop
                            transition
                            className="fixed inset-0 bg-green-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                        />

                        <div className="fixed inset-0 flex">
                            <DialogPanel
                                transition
                                className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                            >
                                <TransitionChild>
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                        <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                                        </button>
                                    </div>
                                </TransitionChild>
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-green-900 px-6 pb-4 ring-1 ring-white/10">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <img
                                            alt="Your Company"
                                            src={nwmsu_logo}
                                            className="h-8 w-auto cursor-pointer"
                                            onClick={() => navigate('/home')}
                                        />
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                            <li>
                                                <ul role="list" className="-mx-2 space-y-1">
                                                    {navigation.map((item) => (
                                                        <li key={item.name}>
                                                            <a
                                                                href={item.href}
                                                                className={classNames(
                                                                    item.current
                                                                        ? 'bg-green-800 text-white'
                                                                        : 'text-green-400 hover:bg-green-800 hover:text-white',
                                                                    'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                                )}
                                                            >
                                                                <item.icon aria-hidden="true" className="size-6 shrink-0" />
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                            <li className="mt-auto">
                                                <a
                                                    href="#"
                                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                                                >
                                                    <Cog6ToothIcon aria-hidden="true" className="size-6 shrink-0" />
                                                    Settings
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </DialogPanel>
                        </div>
                    </Dialog>
 
                    {/* Static sidebar for desktop */}
                    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                        {/* Sidebar component*/}
                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-green-900 px-6 pb-4">
                            <div className="flex h-16 shrink-0 items-center">
                                <img
                                    alt="Your Company"
                                    src={nwmsu_logo}
                                    className="h-8 w-auto"
                                />
                            </div>
                            <nav className="flex flex-1 flex-col">
                                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                    <li>
                                        <ul role="list" className="-mx-2 space-y-1">
                                            {navigation.map((item) => (
                                                <li key={item.name}>
                                                    <a
                                                        href={item.href}
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-green-800 text-white'
                                                                : 'text-green-400 hover:bg-green-800 hover:text-white',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                        )}
                                                    >
                                                        <item.icon aria-hidden="true" className="size-6 shrink-0" />
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="mt-auto">
                                        <a
                                            href="#"
                                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                                        >
                                            <Cog6ToothIcon aria-hidden="true" className="size-6 shrink-0" />
                                            Settings
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
 
                    <div className="lg:pl-72">
                        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                            <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                                <span className="sr-only">Open sidebar</span>
                                <Bars3Icon aria-hidden="true" className="size-6" />
                            </button>
 
                            {/* Separator */}
                            <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />
 
                            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                                <div className="flex items-center gap-x-4 lg:gap-x-6">
                                    <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon aria-hidden="true" className="size-6" />
                                    </button>
 
                                    {/* Separator */}
                                    <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" />
 
                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative">
                                        <MenuButton className="-m-1.5 flex items-center p-1.5">
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                alt=""
                                                src = {user.profile_pic}
                                                className="size-8 rounded-full bg-gray-50 object-cover object-center"
                                            />
                                            <span className="hidden lg:flex lg:items-center">
                                                <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-900">
                                                    {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
                                                </span>
                                                <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-400" />
                                            </span>
                                        </MenuButton>
                                        <MenuItems
                                            transition
                                            className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                        >
                                            {userNavigation.map((item) => (
                                                <MenuItem key={item.name} onClick={()=> handleUserNavClick(item)}>
                                                    <a
                                                        href={item.href}
                                                        className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                                                    >
                                                        {item.name}
                                                    </a>
                                                </MenuItem>
                                            ))}
                                        </MenuItems>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}