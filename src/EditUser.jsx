import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Navigation from './Navigation'
import { useEffect, useState } from 'react';
import api from './Config/axios'
import { useParams } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';
import bearcat from './assets/bearcat.webp'
import { useUser } from './AppContext/userContext';

export default function EditUser() {
    const [selectedOption, setSelectedOption] = useState('');
    const [permission, setPermission] = useState('')
    const [permissionButton, setPermissionButton] = useState(false)
    const [permissonConfirm, setPermissionConfirm] = useState(false)
    const [permissionOption, setPermissionOption] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [title, setTitle] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [imagePreviewUrl, setImagePreviewUrl] = useState();
    const { user_email } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [open, setOpen] = useState(false)
    const [curPassword, setCurPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState();
    const [openPassChange, setOpenPassChange] = useState(false);
    const navigate = useNavigate();
    const {user} = useUser();


    useEffect(() => {
        const userData = async () => {
            const response = await api.get(`/userProfile/${user_email}`);
            console.log("Response Data", response)
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
            setDepartment(response.data.department);
            setSelectedFile(response.data.profile_pic);
            setImagePreviewUrl(response.data.profile_pic);
            setTitle(response.data.title);
            setSelectedOption(response.data.role);
        }

        userData()
    }, [])
    const handleCheckboxChange = (event) => {
        setPermission(event.target.id);
        setPermissionButton(true);
        setPermissionOption(event.target.id)
    };

    const handlePermissionChange = () => {
        console.log(permissionOption)
        setSelectedOption(permissionOption)
        setPermissionButton(false)
    }

    const handleCancelPermission = () => {
        setPermissionButton(false)
        setPermission(false)
    }

    const handleAddUserSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('role', selectedOption);
        formData.append('department', department);
        formData.append('title', title);

        if (selectedFile) {
            formData.append('profile_pic', selectedFile);
        } else {
            formData.append('profile_pic', '');
        }

        try {
            const response = await api.put(`/edit-user/${email}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('User Edited Successfully', response);
            if(response.status === 200){
                navigate('/user-temp')
            }
        } catch (error) {
            console.error('Technical error while submitting the add user form:', error);
        }
    };


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileSelect = () => {
        document.getElementById('file-input').click();
    };

    const handleRemovePhoto = () => {
        setSelectedFile(null);
        setImagePreviewUrl(null);
        document.getElementById('file-input').value = null;
    };

    const handleVerifyCurPassword = async () => {
        try {
            const response = await api.post(`/password-check/${user_email}`, {
                curPassword: curPassword
            });
            setPasswordMatch(response.data.passwordMatch);
            console.log('Password verification response:', response.data);
            if (response.data.passwordMatch === true) {
                setOpen(false)
                setOpenPassChange(true)
            }
            setPasswordMatch(false)

        } catch (error) {
            console.log('Password Verification Error: ', error);
        }
    }

    const handlePasswordChange = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const response = await api.put(`/change-password/${email}`, {
                password
            });
            console.log('Password Updated Successfully', response);
            if(response.status === 200){
                setOpenPassChange(false)
            }
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };


    return (
        <div className='min-h-screen bg-gray-100'>
            <Navigation />
            <main className='lg:pl-[22%] lg:pr-[5%] mt-[1%]'>
                <div className="divide-y divide-gray-900/10">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
                        <div className="px-4 sm:px-0">
                            <h2 className="text-base/7 font-semibold text-gray-900"><span className='text-green-700 font-semibold text-lg'>Edit</span> User Information</h2>
                            <p className="mt-1 text-sm/6 text-gray-600">Use the correct email address of the user to send correct login credentials on the user email.</p>
                        </div>

                        <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2" onSubmit={handleAddUserSubmit}>
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
                                                value={firstName}
                                                placeholder='Bobby'
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-900 sm:text-sm/6"
                                                onChange={(e) => setFirstName(e.target.value)}
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
                                                value={lastName}
                                                placeholder='Bearcat'
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                            Login Email Address
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex items-center rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-green-600 ">
                                                <input
                                                    id="username"
                                                    name="username"
                                                    type="text"
                                                    placeholder="bearcat@nwmissouri.edu"
                                                    className="border-hidden block min-w-0 grow text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 inline-block bg-white-100 dark:bg-white/10"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="department" className="block text-sm/6 font-medium text-gray-900">
                                            User Department
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex items-center rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-green-600 ">
                                                <input
                                                    id="department"
                                                    name="department"
                                                    type="text"
                                                    placeholder="Facility Services"
                                                    className="border-hidden block min-w-0 grow text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 inline-block bg-white-100 dark:bg-white/10"
                                                    value={department}
                                                    onChange={(e) => setDepartment(e.target.value)}

                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='sm:col-span-3'>
                                        <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">
                                            Photo
                                        </label>
                                        <div className="mt-2 flex items-center gap-x-3">
                                            {imagePreviewUrl ? (
                                                <img src={imagePreviewUrl} alt="Profile" className="size-24 rounded-full object-cover object-center" />
                                            ) : (
                                                <img src={bearcat} alt="Profile" className="size-24 rounded-full object-cover object-center" />
                                            )}
                                            <button
                                                type="button"
                                                onClick={triggerFileSelect}
                                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            >
                                                Change
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleRemovePhoto}
                                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            >
                                                Remove
                                            </button>
                                            <input
                                                type="file"
                                                id="file-input"
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                                            User Title
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex items-center rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-green-600 ">
                                                <input
                                                    id="title"
                                                    name="title"
                                                    type="text"
                                                    placeholder="Director Of Facility Services"
                                                    className="border-hidden block min-w-0 grow text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 inline-block bg-white-100 dark:bg-white/10"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="max-w-2xl space-y-10 md:col-span-2 mt-10">
                                    <fieldset>
                                    {user.role === 'Admin' ?(
                                        <><legend className="text-sm/6 font-semibold text-gray-900">User Access</legend>
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
                                                            value={selectedOption}
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
                                        </div></>):(<div> </div>)}
                                        <button
                                            type="button"
                                            className="rounded-md bg-green-50 px-3.5 py-2.5 text-sm font-semibold text-green-600 shadow-sm hover:bg-green-100 mt-8 ml-8"
                                            onClick={() => setOpen(true)}
                                        >
                                            Change Password
                                        </button>
                                    </fieldset>


                                    {permissionButton ? (<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
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
                                                        <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={handlePermissionChange}>Change user permission to {permission == 'Admin' ? 'Admin' : 'General'}</button>
                                                        <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={handleCancelPermission}>Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>) :
                                        (<div></div>)}
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                                <button type="button" className="text-sm/6 font-semibold text-gray-900" onClick={()=>navigate('/user-temp')}>
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
            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto lg:ml-[10%]">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:size-10">
                                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-yellow-600" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                        Password Change
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Please enter your current password for password change
                                        </p>
                                    </div>
                                    <hr></hr>
                                    <div className='my-4'>
                                        <label htmlFor="curPassword" className="ml-px block pl-4 text-sm/6 font-medium text-gray-900">
                                            Current Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="curPassword"
                                                name="curPassword"
                                                type="password"
                                                placeholder="Current Password"
                                                className="block w-full rounded-full bg-white px-4 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                                onChange={(e) => setCurPassword(e.target.value)}
                                            />
                                        </div>
                                        {passwordMatch === false ? (<p id="password-error" className="mt-2 text-sm text-red-600">
                                            Incorrect Password
                                        </p>) : (<div></div>)}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
                                <button
                                    type="button"
                                    onClick={handleVerifyCurPassword}
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                                >
                                    Change Password
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => (setOpen(false), setPasswordMatch())}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>

            <Dialog open={openPassChange} onClose={setOpenPassChange} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto lg:ml-[10%]">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:size-10">
                                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-yellow-600" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                        Password Change
                                    </DialogTitle>
                                    <div className="relative my-8 md:w-[150%] md:ml-6">
                                        <label
                                            htmlFor="name"
                                            className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
                                        >
                                            New Password
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="password"
                                            placeholder="New Password"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                            onChange={(e)=>setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="relative my-8 md:w-[150%] md:ml-6">
                                        <label
                                            htmlFor="name"
                                            className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
                                        >
                                            Confirm Password
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="password"
                                            placeholder="Confirm Password"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                            onChange={(e)=>setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
                                <button
                                    type="button"
                                    onClick={handlePasswordChange}
                                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:w-auto"
                                >
                                    Change Password
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setOpenPassChange(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
