
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogPanel,
    Label,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import {
    Bars3Icon,
    CalendarDaysIcon,
    EllipsisVerticalIcon,
    FaceFrownIcon,
    FaceSmileIcon,
    FireIcon,
    HandThumbUpIcon,
    HeartIcon,
    PaperClipIcon,
    UserCircleIcon,
    XMarkIcon as XMarkIconMini,
    KeyIcon
} from '@heroicons/react/20/solid'
import { BellIcon, XMarkIcon as XMarkIconOutline } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { FaGasPump } from 'react-icons/fa'
import api from './Config/axios';
import Navigation from './Navigation';
import { OrbitProgress } from 'react-loading-indicators';

const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Invoices', href: '#' },
    { name: 'Clients', href: '#' },
    { name: 'Expenses', href: '#' },
]
const invoice = {
    subTotal: '$8,800.00',
    tax: '$1,760.00',
    total: '$10,560.00',
    items: [
        {
            id: 1,
            title: 'Logo redesign',
            description: 'New logo and digital asset playbook.',
            hours: '20.0',
            rate: '$100.00',
            price: '$2,000.00',
        },
        {
            id: 2,
            title: 'Website redesign',
            description: 'Design and program new company website.',
            hours: '52.0',
            rate: '$100.00',
            price: '$5,200.00',
        },
        {
            id: 3,
            title: 'Business cards',
            description: 'Design and production of 3.5" x 2.0" business cards.',
            hours: '12.0',
            rate: '$100.00',
            price: '$1,200.00',
        },
        {
            id: 4,
            title: 'T-shirt design',
            description: 'Three t-shirt design c                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               oncepts.',
            hours: '4.0',
            rate: '$100.00',
            price: '$400.00',
        },
    ],
}

const moods = [
    { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
    { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
    { name: 'Happy', value: 'happy', icon: FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
    { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
    { name: 'Thumbsy', value: 'thumbsy', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
    { name: 'I feel nothing', value: null, icon: XMarkIconMini, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const activity = [
    { id: 1, type: 'created', person: { name: 'Chelsea Hagon' }, date: '7d ago', dateTime: '2023-01-23T10:32' },
    { id: 2, type: 'edited', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:03' },
    { id: 3, type: 'sent', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:24' },
    {
        id: 4,
        type: 'commented',
        person: {
            name: 'Chelsea Hagon',
            imageUrl:
                'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
        date: '3d ago',
        dateTime: '2023-01-23T15:56',
    },
    { id: 5, type: 'viewed', person: { name: 'Alex Curren' }, date: '2d ago', dateTime: '2023-01-24T09:12' },
    { id: 6, type: 'paid', person: { name: 'Alex Curren' }, date: '1d ago', dateTime: '2023-01-24T09:20' },
]

export default function VehicleProfile() {
    const [vehicle, setVehicle] = useState(null);
    const [selected, setSelected] = useState(moods[5])
    const [loading, setLoading] = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    // const [activity, setActivity] = useState([]);
    const { NWVehicleNo } = useParams();
    const [maintenenceCost, setMaintenanceCost] = useState('')
    const [refuelingCost, setRefuelingCost] = useState('')
    const [curYear, setCurYear] = useState('')
    const [activity, setActivity] = useState([])
    const [downloadProgress, setDownloadProgress] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchVehicleProfile = async () => {
            setLoading(true)
            try {
                const response = await api.get(`/vehicle-profile/${NWVehicleNo}`);
                const data = response.data;
                setVehicle(data);
                const currentYear = new Date().getFullYear();
                setCurYear(currentYear);

                const maintenanceCost = data.Maintainences?.reduce((sum, m) => {
                    return new Date(m.date).getFullYear() === currentYear ? sum + m.maintainenceCost : sum;
                }, 0) || 0;
                console.log('maintenanceCost', maintenanceCost)
                setMaintenanceCost(maintenanceCost);

                const refuelingCost = data.Refuelings?.reduce((sum, r) => {
                    return new Date(r.date).getFullYear() === currentYear ? sum + r.fuelCost : sum;
                }, 0) || 0;
                setRefuelingCost(refuelingCost)

                setTotalCost(maintenanceCost + refuelingCost);

                const combinedActivities = [...(data.Maintainences || []), ...(data.Refuelings || [])];
                combinedActivities.sort((a, b) => new Date(b.date) - new Date(a.date));
                setActivity(combinedActivities);
                console.log('Activites', activity);

                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch vehicle profile:', err);
                setLoading(false);
            }
        };

        fetchVehicleProfile();
    }, [NWVehicleNo]);

    useEffect(() => {
        console.log('Vehicle Data: ', vehicle)
    }, [vehicle])



    if (loading) return <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
        <OrbitProgress color={["#031a03", "#094709", "#0e750e", "#13a313"]} />
    </div>;
    if (!vehicle) return <p>No vehicle data found.</p>;

    const handleDownload = async (NWVehicleNo) => {
        setDownloadProgress(true)
        const vehicleId = NWVehicleNo;
        console.log('VehicleId: ', vehicleId)

        try {
            const response = await api.get(`/receipt/${vehicleId}`, {
                responseType: 'blob'
            });

            console.log('Reciept Response', response)


            const fileURL = window.URL.createObjectURL(new Blob([response.data]));
            const fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', `receipts_${vehicleId}.zip`);
            document.body.appendChild(fileLink);

            fileLink.click();

            fileLink.parentNode.removeChild(fileLink);
            window.URL.revokeObjectURL(fileURL);
            setDownloadProgress(false)
        } catch (error) {
            console.error('Error downloading the file:', error);
            alert('Failed to download file.');
            setDownloadProgress(false)
        }
    };

    return (
        <>
            <Navigation />
            <main className='lg:pl-[18%]'>
                <header className="relative isolate pt-2">
                    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
                        <div className="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
                            <div
                                style={{
                                    clipPath:
                                        'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
                                }}
                                className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#006400] to-[#006400]"
                            />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
                    </div>

                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                        <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
                            <div className="flex items-center gap-x-6 pl-12">
                                <img
                                    alt=""
                                    src={vehicle.vehiclePic}
                                    className="h-[8%] w-[30%] object-center object-cover flex-none rounded-md ring-1 ring-gray-900/10"
                                />
                                <h1>
                                    <div className="text-sm/6 text-gray-500">
                                        NW ID: <span className="text-gray-700">{vehicle.NWVehicleNo}</span>
                                    </div>
                                    <div className="mt-1 text-xl font-semibold text-gray-900"> <span className='text-green-900 text-bold text-2xl'>{vehicle.make} {vehicle.model}</span> <span className='text-green-600 text-bold text-4xl'>{vehicle.modelYear}</span></div>
                                </h1>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        <div className="lg:col-start-3 lg:row-end-1">
                            <h2 className="sr-only">Summary</h2>
                            <div className="rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                                <dl className="flex flex-wrap">
                                    <div className="flex-auto pl-6 pt-6">
                                        <dt className="text-sm/6 font-semibold text-gray-900">Total Amount spent in <span className='text-green-600 text-base font-bold'>{curYear}</span></dt>
                                        <dd className="mt-1 text-base font-bold text-green-900 ">${totalCost}</dd>
                                    </div>
                                    <div className="flex-none self-end px-6 pt-4">
                                        <dt className="sr-only">Status</dt>
                                        <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
                                            Paid
                                        </dd>
                                    </div>
                                </dl>
                                <div className='mt-6'>
                                    <span className="flex-inline items-center rounded-md bg-gray-50 ml-6 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                        Total Amount spent in Refueling: <span className='text-green-600 font-semibold'>${refuelingCost}</span>
                                    </span>
                                </div>
                                <div className='mt-6'>
                                    <span className="flex-inline items-center rounded-md bg-gray-50 ml-6 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                        Total Amount spent in Maintenence: <span className='text-green-600 font-semibold'>${maintenenceCost}</span>
                                    </span>
                                </div>
                                {vehicle.Refuelings > [0] || vehicle.Maintainences > [0] ? (<div className="mt-6 border-t border-gray-900/5 px-6 py-6 hover-action-div">
                                    <a onClick={() => handleDownload(NWVehicleNo)} className="text-sm font-semibold text-gray-900">
                                        Download Receipts for {curYear}
                                        <span
                                            className='download-link-arrow'
                                            aria-hidden="true"
                                        >&rarr;</span>
                                    </a>
                                </div>
                                ) : (<div className="px-6 py-4"></div>)}
                            </div>
                            {activity > [0] ? (
                                <h2 className="text-lg font-semibold text-gray-900 mt-12">
                                    Activity
                                </h2>) :
                                (<h2 className="text-sm font-semibold text-gray-900 mt-12">
                                    No Refueling & Maintenence recorded on <span className='text-green-900 text-bold text-xl'>{vehicle.make} {vehicle.model}</span>
                                </h2>)}
                            <ul role="list" className="mt-6 space-y-6">
                                {activity.map((item, idx) => (
                                    <li key={idx} className="relative flex gap-x-4">
                                        <div
                                            className={`absolute left-0 top-0 flex w-6 justify-center ${idx === activity.length - 1 ? 'h-6' : '-bottom-6'
                                                }`}
                                        >
                                            <div className="w-px bg-gray-200" />
                                        </div>
                                        <img
                                            alt=""
                                            src={item.User?.profile_pic}
                                            className="relative mt-3 h-12 w-12 flex-none rounded-full bg-gray-50 object-cover object-center"
                                        />
                                        <div className="flex-auto rounded-md p-3 ring-gray-200">
                                            <div className="flex justify-between gap-x-4">
                                                <div className="py-0.5 text-xs text-gray-500">
                                                    <span className="font-medium text-gray-900">{item.User?.firstName} {item.User?.lastName}</span>{' '}
                                                    {item.maintainenceDescription ? `performed maintenance (${item.maintainenceDescription})` : 'added fuel'}
                                                </div>
                                                <time dateTime={item.date} className="flex-none py-0.5 text-xs text-gray-500">
                                                    {new Date(item.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                                                </time>
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {item.maintainenceDescription ? `Maintenance cost: $${item.maintainenceCost}` : `Fuel cost: $${item.fuelCost}`}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Invoice */}
                        <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
                            <section aria-labelledby="applicant-information-title">
                                <div className="bg-white sm:rounded-lg">
                                    <div className="">
                                        <h2 id="applicant-information-title" className="text-lg/6 font-medium text-gray-900">
                                            Vehicle Information
                                        </h2>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Vehicle Details and department information</p>
                                    </div>
                                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">NW Vehicle ID</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{vehicle.NWVehicleNo}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">VIN</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{vehicle.VIN}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">License Plate</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{vehicle.licensePlate}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Make</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{vehicle.make}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Model</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{vehicle.model}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Year</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{vehicle.modelYear}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Description</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{vehicle.vehDescription}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Type</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{vehicle.vehType}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Department</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{vehicle.vehicleDepartment}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Weight</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{vehicle.weight}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Purchase Date</dt>
                                                {/* <dd className="mt-1 text-sm text-gray-900">{vehicle.purchaseDate}</dd> */}
                                                <dd className="text-sm whitespace-nowrap text-gray-900">
                                                    <time dateTime={vehicle.purchaseDate}>{new Date(vehicle.purchaseDate).toLocaleDateString()}</time>
                                                </dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Starting Mileage</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{vehicle.startingMileage}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Current Mileage</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{vehicle.currentMileage}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </section>
                            {vehicle.Refuelings > [0] ? (<div className="relative flex justify-center">
                                <span className="bg-white px-3 my-8 text-base font-semibold text-gray-900">Refueling Recents Updates</span>
                            </div>) : (<div className="relative flex justify-center">
                                <span className="bg-white px-3 my-8 text-base font-semibold text-gray-900">No Refueling & Maintenence Updates</span>
                            </div>)}
                            <ul
                                role="list"
                                className="mt-5 grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0 md:grid-cols-2 md:divide-y-0 md:gap-1"
                            >
                                {vehicle.Refuelings
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
                                                                    src={refueling.User.profile_pic}
                                                                    className="size-8 object-cover object-center rounded-full ring-4 ring-white"
                                                                />
                                                            </div>
                                                        </dt>
                                                        <dd className="text-sm font-medium mt-1 text-gray-900">{refueling.User.firstName} {refueling.User.lastName}</dd>
                                                    </div>
                                                    <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                                        <dt className="flex-none">
                                                            <span className="sr-only">Due date</span>
                                                            <CalendarDaysIcon aria-hidden="true" className="h-6 w-6 text-gray-400" />
                                                        </dt>
                                                        <dd className="text-sm text-gray-500">
                                                            <time dateTime={refueling.date}>{new Date(refueling.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</time>
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

                            {vehicle.Maintainences > [0] ? (<div className="relative flex justify-center">
                                <span className="bg-white px-3 my-8 text-base font-semibold text-gray-900">Maintenence Recents Updates</span>
                            </div>) : (" ")}
                            <ul
                                role="list"
                                className="mt-5 grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0 md:grid-cols-2 md:divide-y-0 md:gap-4"
                            >
                                {vehicle.Maintainences
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
                </div>
            </main>
            {downloadProgress ? (<div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
                <OrbitProgress color={["#031a03", "#094709", "#0e750e", "#13a313"]} />
                <div className='font-semibold'>Downloading Reciepts for {vehicle.make} {vehicle.model}...</div>
            </div>) : (<div></div>)}
        </>
    )
}
