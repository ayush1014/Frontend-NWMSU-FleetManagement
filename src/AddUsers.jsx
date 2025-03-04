import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import Navigation from './Navigation'
import { useState } from 'react';

export default function AddUsers() {
    const [selectedOption, setSelectedOption] = useState('General');
    const [permission, setPermission] = useState('General')
    const [permissionButton, setPermissionButton] = useState(false)
    const [permissonConfirm, setPermissionConfirm] = useState(false)
    const [permissionOption, setPermissionOption] = useState('')

    const handleCheckboxChange = (event) => {
        setPermission(event.target.id);
        setPermissionButton(true);
        setPermissionOption(event.target.id)
    };

    const handlePermissionChange = ()=>{
        console.log(permissionOption)
        setSelectedOption(permissionOption)
        setPermissionButton(false)
    }

    const handleCancelPermission = ()=>{
        setPermissionButton(false)
        setPermission(false)
    }
    return (
        <div className='min-h-screen bg-gray-100'>
            <Navigation />
            <main className='lg:pl-[22%] lg:pr-[5%] mt-[1%]'>
                <div className="divide-y divide-gray-900/10">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
                        <div className="px-4 sm:px-0">
                            <h2 className="text-base/7 font-semibold text-gray-900">User Information</h2>
                            <p className="mt-1 text-sm/6 text-gray-600">Use the correct email address of the user to send correct login credentials on the user email.</p>
                        </div>

                        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                            <div className="px-4 py-6 sm:p-8">
                                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                            First name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="first-name"
                                                name="first-name"
                                                type="text"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-900 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                                            Last name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="last-name"
                                                name="last-name"
                                                type="text"
                                                autoComplete="family-name"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                            Login Email Address
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex items-center rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-green-600 ">
                                                <input
                                                    id="username"
                                                    name="username"
                                                    type="text"
                                                    placeholder="S534709"
                                                    className="border-hidden block min-w-0 grow text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 inline-block bg-neutral-100 dark:bg-white/10"
                                                />
                                                <div className="shrink-0 select-none p-2 text-base text-gray-500 sm:text-sm/6">@nwmissouri.edu</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                            Country
                                        </label>
                                        <div className="mt-2 grid grid-cols-1">
                                            <select
                                                id="country"
                                                name="country"
                                                autoComplete="country-name"
                                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                            >
                                                <option>United States</option>
                                                <option>Canada</option>
                                                <option>Mexico</option>
                                            </select>
                                            <ChevronDownIcon
                                                aria-hidden="true"
                                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                                            Street address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="street-address"
                                                name="street-address"
                                                type="text"
                                                autoComplete="street-address"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                                            City
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="city"
                                                name="city"
                                                type="text"
                                                autoComplete="address-level2"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                                            State / Province
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="region"
                                                name="region"
                                                type="text"
                                                autoComplete="address-level1"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
                                            ZIP / Postal code
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="postal-code"
                                                name="postal-code"
                                                type="text"
                                                autoComplete="postal-code"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">
                                            Photo
                                        </label>
                                        <div className="mt-2 flex items-center gap-x-3">
                                            <UserCircleIcon aria-hidden="true" className="size-12 text-gray-300" />
                                            <button
                                                type="button"
                                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            >
                                                Change
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                                            Notes
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="about"
                                                name="about"
                                                rows={3}
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                                defaultValue={''}
                                            />
                                        </div>
                                        <p className="mt-3 text-sm/6 text-gray-600">Add notes about this user, it can only be seen by all admins.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                                <button type="button" className="text-sm/6 font-semibold text-gray-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
                        <div className="px-4 sm:px-0">
                            <h2 className="text-base/7 font-semibold text-gray-900">User Permissions</h2>
                            <p className="mt-1 text-sm/6 text-gray-600">
                                Please choose user permissions carefully to give user either an admin access or general access.
                            </p>
                        </div>

                        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                            <div className="px-4 py-6 sm:p-8">
                                <div className="max-w-2xl space-y-10 md:col-span-2">
                                    <fieldset>
                                        <legend className="text-sm/6 font-semibold text-gray-900">User Access</legend>
                                        <div className="mt-6 space-y-6">
                                            {/* Admin Checkbox */}
                                            <div className="flex gap-3">
                                                <div className="flex h-6 shrink-0 items-center">
                                                    <div className="group grid size-4 grid-cols-1">
                                                        <input
                                                            id="Admin"
                                                            name="notifications"
                                                            type="checkbox"
                                                            checked={selectedOption === 'Admin'}
                                                            onChange={handleCheckboxChange}
                                                            className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-green-600 checked:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                                        />
                                                        <svg
                                                            fill="none"
                                                            viewBox="0 0 14 14"
                                                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white"
                                                        >
                                                            <path
                                                                d="M3 8L6 11L11 3.5"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className={selectedOption === 'Admin' ? 'opacity-100' : 'opacity-0'}
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="text-sm/6">
                                                    <label htmlFor="Admin" className="font-medium text-gray-900">
                                                        Admin
                                                    </label>
                                                    <p id="Admin-description" className="text-gray-500">
                                                        Granting Admin access to user will allow user to Add/Delete/Edit/View car informations, user informations, reports and more.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <div className="flex h-6 shrink-0 items-center">
                                                    <div className="group grid size-4 grid-cols-1">
                                                        <input
                                                            id="General"
                                                            name="notifications"
                                                            type="checkbox"
                                                            checked={selectedOption === 'General'}
                                                            onChange={handleCheckboxChange}
                                                            className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-green-600 checked:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                                        />
                                                        <svg
                                                            fill="none"
                                                            viewBox="0 0 14 14"
                                                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white"
                                                        >
                                                            <path
                                                                d="M3 8L6 11L11 3.5"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className={selectedOption === 'General' ? 'opacity-100' : 'opacity-0'}
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="text-sm/6">
                                                    <label htmlFor="General" className="font-medium text-gray-900">
                                                        General
                                                    </label>
                                                    <p id="General-description" className="text-gray-500">
                                                        Granting General access to user will allow user to only update fuel information, vehicle maintainance information and view other vehicles updates.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>


                                    {permissionButton?(<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                                        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
                                        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                                            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                        <div class="sm:flex sm:items-start">
                                                            <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                                                <svg class="size-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                                                </svg>
                                                            </div>
                                                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                                <h3 class="text-base font-semibold text-gray-900" id="modal-title">Account Permission</h3>
                                                                <div class="mt-2">
                                                                    <p class="text-sm text-gray-500">Are you sure you want to change the user permission of this user ?</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                        <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={handlePermissionChange}>Change user permission to {permission == 'Admin'?'Admin':'General'}</button>
                                                        <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={handleCancelPermission}>Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>):
                                    (<div></div>)}
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                                <button type="button" className="text-sm/6 font-semibold text-gray-900">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}
