import Navigation from './Navigation'
import api from './Config/axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CalendarDaysIcon, CreditCardIcon, UserCircleIcon, KeyIcon } from '@heroicons/react/20/solid'
import { FaGasPump } from 'react-icons/fa'
import QRCode from "react-qr-code";


export default function VehicleRefueling() {
    const { NWVehicleNo } = useParams();
    const [refuelings, setRefuelings] = useState([]);
    const [qrVisibleForId, setQrVisibleForId] = useState(null);


    useEffect(() => {
        const fetchRefuelings = async () => {
            try {
                const response = await api.get(`/refuelings/${NWVehicleNo}`);
                setRefuelings(response.data);
            } catch (error) {
                console.error('Failed to fetch refuelings:', error);
            }
        };

        fetchRefuelings();
    }, [NWVehicleNo]);

    console.log('refuelings', refuelings)
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
                                        src={refuelings.length > 0 ? refuelings[0].Vehicle.vehiclePic : ''}
                                        className="size-48 rounded-full object-cover object-center"
                                    />
                                    <span aria-hidden="true" className="absolute inset-0 rounded-full shadow-inner" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{refuelings.length > 0 ? refuelings[0].Vehicle.make : ' '} {refuelings.length > 0 ? refuelings[0].Vehicle.model : ' '} <span className='text-green-600'> {refuelings.length > 0 ? refuelings[0].Vehicle.modelYear : ' '} </span> </h1>
                                <p className="text-sm font-medium text-gray-500">
                                    <a href="#" className="text-green-900 font-semibold">
                                        {refuelings.length > 0 ? refuelings[0].Vehicle.vehicleDepartment : ' '}
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
                                                <dd className="mt-1 text-sm text-gray-900">{refuelings.length > 0 ? refuelings[0].Vehicle.NWVehicleNo : ' '}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">VIN</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{refuelings.length > 0 ? refuelings[0].Vehicle.VIN : ' '}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">License Plate</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{refuelings.length > 0 ? refuelings[0].Vehicle.licensePlate : ' '}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Make</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{refuelings.length > 0 ? refuelings[0].Vehicle.make : ' '}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Model</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{refuelings.length > 0 ? refuelings[0].Vehicle.model : ' '}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Year</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{refuelings.length > 0 ? refuelings[0].Vehicle.modelYear : ' '}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Description</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{refuelings.length > 0 ? refuelings[0].Vehicle.vehDescription : ' '}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Type</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{refuelings.length > 0 ? refuelings[0].Vehicle.vehType : ' '}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Department</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{refuelings.length > 0 ? refuelings[0].Vehicle.vehicleDepartment : ' '}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Starting Mileage</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{refuelings.length > 0 ? refuelings[0].Vehicle.startingMileage : ' '}</dd>
                                            </div>
                                            <div className="sm:col-span-1">
                                                <dt className="text-sm font-medium text-gray-500">Current Mileage</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{refuelings.length > 0 ? refuelings[0].Vehicle.currentMileage : ' '}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </section>
                            <ul
                                role="list"
                                className="mt-5 grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0 md:grid-cols-2 md:divide-y-0 md:gap-4"
                            >
                                {refuelings.map((refueling) => (
                                    <li key={refueling.refuelingId} className="p-4">
                                        <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                                            {qrVisibleForId === refueling.refuelingId ? (
                                                <div className="flex flex-col items-center justify-center p-8">
                                                    <QRCode value={refueling.receiptImage} size={179} />
                                                    <p className="mt-4 text-sm text-gray-700">Scan to view receipt</p>
                                                    <button
                                                        onClick={() => setQrVisibleForId(null)}
                                                        className="mt-4 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
                                                    >
                                                        Done
                                                    </button>
                                                </div>
                                            ) : (<dl className="flex flex-wrap">
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
                                                        <time dateTime={refueling.createdAt}>
                                                            {new Date(refueling.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                                                        </time>

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
                                                {refueling.receiptImage ? (<div className='px-8 pt-8'>
                                                    <button
                                                        onClick={() => setQrVisibleForId(refueling.refuelingId)}
                                                        className="text-sm font-semibold text-green-700 underline hover:text-green-900"
                                                    >
                                                        Get receipt on phone
                                                    </button>
                                                </div>) : (<div></div>)}
                                            </dl>)}
                                            <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                                                {refueling.receiptImage ? (
                                                    <>
                                                        <div className="flex justify-between items-center">
                                                            <a
                                                                href={refueling.receiptImage}
                                                                download
                                                                className="text-sm font-semibold text-gray-900"
                                                            >
                                                                Download receipt <span aria-hidden="true">&rarr;</span>
                                                            </a>
                                                        </div>
                                                    </>
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
                                    Refueling Timeline
                                </h2>

                                {/* Activity Feed */}
                                <div className="mt-6 flow-root">
                                    <ul role="list" className="-mb-8">
                                        {refuelings
                                            .slice()
                                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                                            .slice(0, 15)
                                            .map((refueling, index) => (
                                                <li key={refueling.refuelingId}>
                                                    <div className="relative pb-8">
                                                        {index !== refuelings.length - 1 ? (
                                                            <span className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200" />
                                                        ) : null}
                                                        <div className="relative flex space-x-3">
                                                            <div>
                                                                <span className="h-14 w-14 flex items-center justify-center rounded-full bg-green-700">
                                                                    <img className="h-12 w-12 rounded-full object-cover object-center" src={refueling.User.profile_pic} alt="" />
                                                                </span>
                                                            </div>
                                                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                                                <div>
                                                                    <p className="text-sm text-gray-500">
                                                                        Refueled by {refueling.User.firstName} {refueling.User.lastName} -
                                                                        <span className="font-medium text-gray-900"> {refueling.fuelAdded} gallons for ${refueling.fuelCost}</span>
                                                                    </p>
                                                                </div>
                                                                <div className='text-sm text-gray-500'>
                                                                    <time dateTime={refueling.createdAt}>
                                                                        {new Date(refueling.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}
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
