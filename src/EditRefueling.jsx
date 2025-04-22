import { PhotoIcon, UserCircleIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import Navigation from './Navigation'
import { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import api from './Config/axios'
import { Datepicker } from "flowbite-react";
import { useUser } from './AppContext/userContext';
import { OrbitProgress } from 'react-loading-indicators';
import SavedNotification from './SavedNotification';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaFileImage } from "react-icons/fa";

export default function EditRefueling() {
    const [NWVehicleNo, setNWVehicleNo] = useState('');
    const [currentMileage, setCurrentMileage] = useState('');
    const [fuelAdded, setFuelAdded] = useState('');
    const [fuelCost, setFuelCost] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [date, setDate] = useState(new Date());
    const { User } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [noti, setNoti] = useState(false)
    const [data, setData] = useState([])
    const [refueledBy, setRefueledBy] = useState('');
    const navigate = useNavigate();
    const { refuelingId } = useParams();

    useEffect(() => {
        const fetchRefueling = async () => {
            try {
                const res = await api.get(`/refueling/${refuelingId}`);
                console.log(res.data);
                const data = res.data;
                setNWVehicleNo(data.NWVehicleNo || '');
                setCurrentMileage(data.currentMileage || '');
                setFuelAdded(data.fuelAdded || '');
                setFuelCost(data.fuelCost || '');
                setImagePreviewUrl(data.receiptImage || '');
                setRefueledBy(data.refueledBy);
                const correctDate = new Date(data.date);
                correctDate.setMinutes(correctDate.getMinutes() + correctDate.getTimezoneOffset());
                setDate(correctDate);

            } catch (error) {
                console.error('Error fetching refueling details:', error);
            }
        };

        fetchRefueling();
    }, [refuelingId]);


    const handleAddRefuelingSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('NWVehicleNo', NWVehicleNo);
        formData.append('currentMileage', currentMileage);
        formData.append('fuelAdded', fuelAdded);
        formData.append('fuelCost', fuelCost);
        formData.append('date', date.toISOString().split('T')[0]);
        formData.append('refueledBy', refueledBy);

        if (selectedFile) {
            formData.append('receiptImage', selectedFile);
        }

        try {
            const res = await api.put(`/editRefueling/${refuelingId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Refueling updated:', res.data);
            setData(res.data);
            setIsLoading(false);
            setNoti(true);
        } catch (error) {
            console.error('Error updating refueling:', error);
            setIsLoading(false);
            alert('Failed to update refueling');
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

    const handleRefuelingDate = (date) => {
        setDate(date);
    }


    return (
        <div className='min-h-screen bg-gray-100'>
            <Navigation />
            <main className='lg:pl-[22%] lg:pr-[5%] mt-[1%]'>
                {isLoading ? (
                    <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
                        <OrbitProgress color={["#031a03", "#094709", "#0e750e", "#13a313"]} />
                    </div>
                ) : (
                    <div className="divide-y divide-gray-900/10">
                        {noti ? (<div><SavedNotification data={data} type="Refueling" /></div>) : (<></>)}
                        <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
                            <div className="px-4 sm:px-0">
                                <h2 className="text-base/7 font-semibold text-gray-900">Refueling Information</h2>
                                <p className="mt-1 text-sm/6 text-gray-600">Use the correct NW Vehicle ID of the vehicle to send correct refueling events on the specific NW Vehiclel.</p>
                            </div>

                            <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2" onSubmit={handleAddRefuelingSubmit}>
                                <div className="px-4 py-6 sm:p-8">
                                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="col-span-2 lg:col-span-3">
                                            <label htmlFor="NWVehicleNo" className="block text-sm/6 font-medium text-gray-900">
                                                NW Vehicle No
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="NWVehicleNo"
                                                    name="NWVehicleNo"
                                                    type="text"
                                                    autoComplete="given-name"
                                                    placeholder='15-3'
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-900 sm:text-sm/6"
                                                    value={NWVehicleNo}
                                                    onChange={(e) => setNWVehicleNo(e.target.value)}
                                                    readOnly
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-2 lg:col-span-3">
                                            <label htmlFor="currentMileage" className="block text-sm/6 font-medium text-gray-900">
                                                Current Mileage
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="currentMileage"
                                                    name="currentMileage"
                                                    type="text"
                                                    autoComplete="family-name"
                                                    placeholder='32949'
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                                    value={currentMileage}
                                                    onChange={(e) => setCurrentMileage(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="fuelAdded" className="block text-sm/6 font-medium text-gray-900">
                                                Fuel Added
                                            </label>
                                            <div className="mt-2">
                                                <div className="flex items-center rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-green-600 ">
                                                    <input
                                                        id="fuelAdded"
                                                        name="fuelAdded"
                                                        type="text"
                                                        placeholder="12"
                                                        className="border-hidden block min-w-0 grow text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 inline-block bg-white-100 dark:bg-white/10"
                                                        value={fuelAdded}
                                                        onChange={(e) => setFuelAdded(e.target.value)}
                                                    />
                                                    <span className="px-3 text-gray-500 text-sm">Gallons</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-3">
                                            <label htmlFor="fuelCost" className="block text-sm/6 font-medium text-gray-900">
                                                Fuel Cost
                                            </label>
                                            <div className="mt-2">
                                                <div className="flex items-center rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-green-600 ">
                                                    <span className="px-3 text-gray-500 text-sm">$</span>
                                                    <input
                                                        id="fuelCost"
                                                        name="fuelCost"
                                                        type="text"
                                                        placeholder="23"
                                                        className="border-hidden block min-w-0 grow text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 inline-block bg-white-100 dark:bg-white/10"
                                                        value={fuelCost}
                                                        onChange={(e) => setFuelCost(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-3 lg:col-span-2">
                                            <label htmlFor="vehicle-purchase-date" className="block text-sm/6 font-medium text-gray-900">
                                                Refueling Date
                                            </label>
                                            <div className="mt-2">
                                                <Datepicker
                                                    id='vehicle-purchase-date'
                                                    name='vehicle-purchase-date'
                                                    type='vehicle-purchase-date'
                                                    value={date}
                                                    onChange={handleRefuelingDate}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-span-full'>
                                            <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">
                                                Photo
                                            </label>
                                            <div className="mt-2 flex items-center gap-x-3">
                                                {imagePreviewUrl ? (
                                                    <img src={imagePreviewUrl} alt="Profile" className="size-24 rounded-full object-cover object-center" />
                                                ) : (
                                                    <FaFileImage aria-hidden="true" className="size-24 text-gray-300" />
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
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                                    <button onClick={() => navigate('/refueling')} type="button" className="text-sm/6 font-semibold text-gray-900">
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
                    </div>)}
            </main>
        </div>
    )
}
