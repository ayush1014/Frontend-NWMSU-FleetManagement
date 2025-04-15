import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverBackdrop,
    PopoverButton,
    PopoverPanel,
} from '@headlessui/react'
import {
    ArrowLongLeftIcon,
    CheckIcon,
    HandThumbUpIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    PaperClipIcon,
    QuestionMarkCircleIcon,
    UserIcon,
} from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Navigation from './Navigation'
import api from './Config/axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CalendarDaysIcon, CreditCardIcon, UserCircleIcon, KeyIcon } from '@heroicons/react/20/solid'
import { FaGasPump } from 'react-icons/fa'

export default function VehicleMaintenence() {
    const { NWVehicleNo } = useParams();
    const [maintenences, setMaintenences] = useState([]);

    useEffect(() => {
        const fetchMaintenences = async () => {
            try {
                const response = await api.get(`/maintenence/${NWVehicleNo}`);
                setMaintenences(response.data);
            } catch (error) {
                console.error('Failed to fetch maintenences:', error);
            }
        };

        fetchMaintenences();
        console.log(maintenences)
    }, [NWVehicleNo]);

    return (
        <>
            <div className="min-h-full">
                <Navigation />
                <main className="lg:pl-[23%] lg:pr-[4%] mt-[2%] ">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                        <div className="flex items-center space-x-5">
                            <div className="shrink-0">
                                <div className="relative">
                                    <img
                                        alt=""
                                        src={maintenences.length > 0 ? maintenences[0].Vehicle.vehiclePic : ''}
                                        className="size-48 rounded-full object-cover object-center"
                                    />
                                    <span aria-hidden="true" className="absolute inset-0 rounded-full shadow-inner" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{maintenences.length > 0 ? maintenences[0].Vehicle.make : ' '} {maintenences.length > 0 ? maintenences[0].Vehicle.model : ' '} <span className='text-green-600'> {maintenences.length > 0 ? maintenences[0].Vehicle.modelYear : ' '} </span> </h1>
                                <p className="text-sm font-medium text-gray-500">
                                    <a href="#" className="text-green-900 font-semibold">
                                        {maintenences.length > 0 ? maintenences[0].Vehicle.vehicleDepartment : ' '}
                                    </a>{' '}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-2 lg:col-start-1">
                            <section aria-labelledby="applicant-information-title">
                                <div className="bg-white shadow sm:rounded-lg">
                                    <div className="px-4 py-5 sm:px-6">
                                        <h2 id="applicant-information-title" className="text-lg/6 font-medium text-gray-900">
                                            Vehicle Information
                                        </h2>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Vehicle Details and department information</p>
                                    </div>
                                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">NW Vehicle ID</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{maintenences.length > 0 ? maintenences[0].Vehicle.NWVehicleNo : ' '}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">VIN</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{maintenences.length > 0 ? maintenences[0].Vehicle.VIN : ' '}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">License Plate</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{maintenences.length > 0 ? maintenences[0].Vehicle.licensePlate : ' '}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Make</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{maintenences.length > 0 ? maintenences[0].Vehicle.make : ' '}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Model</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{maintenences.length > 0 ? maintenences[0].Vehicle.model : ' '}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Year</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{maintenences.length > 0 ? maintenences[0].Vehicle.modelYear : ' '}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Description</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{maintenences.length > 0 ? maintenences[0].Vehicle.vehDescription : ' '}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Type</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{maintenences.length > 0 ? maintenences[0].Vehicle.vehType : ' '}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Department</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{maintenences.length > 0 ? maintenences[0].Vehicle.vehicleDepartment : ' '}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Starting Mileage</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{maintenences.length > 0 ? maintenences[0].Vehicle.startingMileage : ' '}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Current Mileage</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{maintenences.length > 0 ? maintenences[0].Vehicle.currentMileage : ' '}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </section>
                            <ul
                                role="list"
                                className="mt-5 grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0 md:grid-cols-2 md:divide-y-0 md:gap-4"
                            >
                                {maintenences.map((maintenence) => (
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
                                                                src={maintenence.User.profile_pic}
                                                                className="size-8 object-cover object-center rounded-full ring-4 ring-white"
                                                            />
                                                        </div>
                                                    </dt>
                                                    <dd className="text-sm font-medium mt-1 text-gray-900">{maintenence.User.firstName} {maintenence.User.lastName}</dd>
                                                </div>
                                                <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                                    <dt className="flex-none">
                                                        <span className="sr-only">Due date</span>
                                                        <CalendarDaysIcon aria-hidden="true" className="h-6 w-6 text-gray-400" />
                                                    </dt>
                                                    <dd className="text-sm text-gray-500">
                                                        <time dateTime={maintenence.date}>{new Date(maintenence.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</time>
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
                                                        className="text-sm font-semibold text-gray-900"
                                                    >
                                                        Download receipt <span aria-hidden="true">&rarr;</span>
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

                        <section aria-labelledby="timeline-title" className="lg:col-span-1 lg:col-start-3">
                            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                                    Maintenence Timeline
                                </h2>

                                {/* Activity Feed */}
                                <div className="mt-6 flow-root">
                                    <ul role="list" className="-mb-8">
                                        {maintenences
                                            .slice()
                                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                                            .slice(0, 15)
                                            .map((maintenence, index) => (
                                                <li key={maintenence.maintenenceId}>
                                                    <div className="relative pb-8">
                                                        {index !== maintenence.length - 1 ? (
                                                            <span className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200" />
                                                        ) : null}
                                                        <div className="relative flex space-x-3">
                                                            <div>
                                                                <span className="h-14 w-14 flex items-center justify-center rounded-full bg-green-700">
                                                                    <img className="h-12 w-12 rounded-full object-cover object-center" src={maintenence.User.profile_pic} alt="" />
                                                                </span>
                                                            </div>
                                                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                                <div>
                                                                    <p className="text-sm text-gray-500">
                                                                        Refueled by {maintenence.User.firstName} {maintenence.User.lastName} -
                                                                        <span className="font-medium text-gray-900"> {maintenence.maintainenceDescription} gallons for ${maintenence.maintainenceCost}</span>
                                                                    </p>
                                                                </div>
                                                                <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                                                    <time dateTime={maintenence.date}>
                                                                        {new Date(maintenence.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                                                                    </time>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    )
}
