import { PhotoIcon, UserCircleIcon, PlusCircleIcon, TruckIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import Navigation from './Navigation'
import { useState, useEffect } from 'react';
import { Datepicker } from "flowbite-react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import api from './Config/axios';
import { OrbitProgress } from 'react-loading-indicators';
import SavedNotification from './SavedNotification';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const vehicleMakes = [
    'Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'Jeep', 'Hyundai', 'Kia',
    'Subaru', 'GMC', 'Ram', 'Dodge', 'Mercedes-Benz', 'BMW', 'Volkswagen', 'Audi',
    'Lexus', 'Tesla', 'Mazda', 'Volvo', 'Porsche', 'Cadillac', 'Buick', 'Chrysler',
    'Lincoln', 'Acura', 'Infiniti', 'Land Rover', 'Jaguar', 'Mitsubishi', 'Mini',
    'Fiat', 'Alfa Romeo', 'Genesis', 'Rivian', 'Lucid', 'Fisker', 'Polestar', 'Suzuki'
];

const vehicleDescriptions = {
    Gasoline: [
        "Cars and Station Wagons (Nonhybrid Vehicles)",
        "LDTs, Vans, SUVs (Nonhybrid Vehicles)",
        "Exempt Vehicles (Nonhybrid Vehicles)"
    ],
    Hybrid: [
        "Cars and Station Wagons",
        "LDTs, Vans, SUVs",
        "Exempt Vehicles"
    ],
    Diesel: [
        "Cars and Station Wagons (Enter B100 as an alternative fuel.)",
        "LDTs, Vans, SUVs (Enter B100 as an alternative fuel.)",
        "Exempt Vehicles (Enter B100 as an alternative fuel.)"
    ],
    E85: [
        "Cars and Station Wagons",
        "LDTs, Vans, SUVs",
        "Exempt Vehicles (Law Enforcement or > 8500 lbs)"
    ],
    CNG: [
        "Cars and Station Wagons",
        "LDTs, Vans, SUVs",
        "Exempt Vehicles (Law Enforcement or > 8500 lbs)"
    ],
    Propane: [
        "Cars and Station Wagons",
        "LDTs, Vans, SUVs",
        "Exempt Vehicles (Law Enforcement or > 8500 lbs)"
    ],
    Electric: [
        "Cars and Station Wagons",
        "LDTs, Vans, SUVs",
        "Exempt Vehicles"
    ]
};

export default function EditVehicles() {
    // const [year, setYear] = useState(new Date());
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [NWVehicleNo, setNWVehicleNo] = useState('');
    const [VIN, setVIN] = useState('');
    const [modelYear, setModelYear] = useState(new Date().getFullYear());
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [purchaseDate, setPurchaseDate] = useState(new Date());
    const [startingMileage, setStartingMileage] = useState('');
    const [weight, setWeight] = useState('');
    const [vehType, setVehType] = useState('');
    const [vehDescription, setVehDescription] = useState('');
    const [isExempt, setIsExempt] = useState('');
    const [vehicle_pic, setVehicle_pic] = useState('');
    const [color, setColor] = useState('');
    const [vehicleDepartment, setVehicleDepartment] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [noti, setNoti] = useState(false)
    const [data, setData] = useState([])
    const navigate = useNavigate();
    const { NWVehicleNo: routeVehicleId } = useParams();


    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const res = await api.get(`/vehicle-profile/${routeVehicleId}`);
                console.log(res.data)
                const data = res.data;

                setNWVehicleNo(data.NWVehicleNo || '');
                setVIN(data.VIN || '');
                setModelYear(data.modelYear || new Date().getFullYear());
                setMake(data.make || '');
                setModel(data.model || '');
                const correctDate = new Date(data.purchaseDate);
                correctDate.setMinutes(correctDate.getMinutes() + correctDate.getTimezoneOffset());
                setPurchaseDate(correctDate);
                setStartingMileage(data.startingMileage || '');
                setWeight(data.weight || '');
                setVehType(data.vehType || '');
                setVehDescription(data.vehDescription || '');
                setIsExempt(data.isExempt || '');
                setColor(data.color || '');
                setVehicleDepartment(data.vehicleDepartment || '');
                setLicensePlate(data.licensePlate || '');
                setVehicle_pic(data.vehiclePic || '');
                setImagePreviewUrl(data.vehiclePic || '');
            } catch (error) {
                console.error('Error fetching vehicle:', error);
            }
        };

        fetchVehicle();
    }, [routeVehicleId]);



    const handleUpdateVehicle = async () => {
        const userDataString = localStorage.getItem('userData');
        const userData = userDataString ? JSON.parse(userDataString) : null;
        const userName = userData.email;

        const form = new FormData();
        form.append('VIN', VIN);
        form.append('modelYear', modelYear);
        form.append('make', make);
        form.append('model', model);
        form.append('purchaseDate', purchaseDate);
        form.append('startingMileage', startingMileage);
        form.append('weight', weight);
        form.append('vehType', vehType);
        form.append('vehDescription', vehDescription);
        form.append('isExempt', isExempt);
        form.append('color', color);
        form.append('vehicleDepartment', vehicleDepartment);
        form.append('licensePlate', licensePlate);
        form.append('addBy', userName);
        if (selectedFile) form.append('vehiclePic', selectedFile);

        try {
            setIsLoading(true);
            await api.put(`/vehicles/${routeVehicleId}`, form, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setIsLoading(false);
            setNoti(true);
        } catch (error) {
            console.error('Error updating vehicle:', error);
            setIsLoading(false);
            alert('Failed to update vehicle');
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

    const handleVehicleTypeChange = (event) => {
        setVehType(event.target.value);
        setVehDescription('Null');
    };

    const handleVehicleDescriptionChange = (event) => {
        setVehDescription(event.target.value);
    };

    const handleYearChange = (date) => {
        setModelYear(date.getFullYear());
    }

    const handlePurchaseDateChange = (date) => {
        setPurchaseDate(date);
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navigation />
            <main className='p-[2%] lg:pl-[25%] lg:pr-[5%] mt-[5%] md:pl-[10%] md:pr-[10%]'>
                {isLoading ? (
                    <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
                        <OrbitProgress color={["#031a03", "#094709", "#0e750e", "#13a313"]} />
                    </div>
                ) : (
                    <form>
                        {noti ? (<div><SavedNotification data={data} type="Vehicle" /></div>) : (<></>)}
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base/7 font-semibold text-gray-900">Vehicle Information</h2>
                                <p className="mt-1 text-sm/6 text-gray-600">Please enter all the vehicle information.</p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-3 lg:col-span-2">
                                        <label htmlFor="nwId" className="block text-sm/6 font-medium text-gray-900">
                                            Northwest Vehicle ID Number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="nwId"
                                                name="nwId"
                                                type="text"
                                                autoComplete="nwId"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                                value={NWVehicleNo}
                                                onChange={(e) => setNWVehicleNo(e.target.value)}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-3 lg:col-span-2">
                                        <label htmlFor="vin" className="block text-sm/6 font-medium text-gray-900">
                                            Vehicle Vin Number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="vin"
                                                name="vin"
                                                type="text"
                                                autoComplete="vin"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                                value={VIN}
                                                onChange={(e) => setVIN(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-3 lg:col-span-2">
                                        <label htmlFor="vehicle-type" className="block text-sm font-medium text-gray-900">Vehicle Type</label>
                                        <select id="vehicle-type" name="vehicle-type" value={vehType} onChange={handleVehicleTypeChange} className="mt-3 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6">
                                            <option value="Null">Select vehicle type</option>
                                            <option value="Gasoline">Gasoline</option>
                                            <option value="Hybrid">Hybrid</option>
                                            <option value="Diesel">Diesel</option>
                                            <option value="E85">E85</option>
                                            <option value="CNG">CNG</option>
                                            <option value="Propane">Propane</option>
                                            <option value="Electric">Electric</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="vehicle-description" className="block text-sm font-medium text-gray-900">Vehicle Description</label>
                                        <select id="vehicle-description" name="vehicle-description" value={vehDescription} onChange={handleVehicleDescriptionChange} className="mt-3 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6">
                                            <option value="Null">Select vehicle description</option>
                                            {vehType && vehicleDescriptions[vehType]?.map(description => (
                                                <option key={description} value={description}>{description}</option>
                                            ))}
                                        </select>

                                    </div>
                                    <div className="col-span-3 lg:col-span-2">
                                        <label htmlFor="exempt" className="block text-sm font-medium text-gray-900">
                                            Vehicle Weight
                                        </label>
                                        <div className="mt-3">
                                            <select
                                                id="exempt"
                                                name="exempt"
                                                autoComplete="exempt"
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm"
                                                defaultValue="Null"
                                                value={weight}
                                                onChange={(e) => setWeight(e.target.value)}
                                            >
                                                <option value="Null">Select the vehicle weight options</option>
                                                <option value="<= 8500 lbs ">&lt;= 8500 lbs</option>
                                                <option value=">8500 lbs">&gt; 8500 lbs</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-span-3 lg:col-span-2">
                                        <label htmlFor="Make" className="block text-sm/6 font-medium text-gray-900">
                                            Vehicle Make
                                        </label>
                                        <div className="mt-2 grid grid-cols-1">
                                            <select
                                                id="Make"
                                                name="Make"
                                                value={make}
                                                onChange={(e) => setMake(e.target.value)}
                                                autoComplete="Make-name"
                                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"

                                            >
                                                <option value="">Select a Make</option>
                                                {vehicleMakes.map((Make) => (
                                                    <option key={Make} value={Make}>
                                                        {Make}
                                                    </option>))}
                                            </select>
                                            <ChevronDownIcon
                                                aria-hidden="true"
                                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-3 lg:col-span-2">
                                        <label htmlFor="vehicle-model" className="block text-sm/6 font-medium text-gray-900">
                                            Vehicle Model
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="vehicle-model"
                                                name="vehicle-model"
                                                type="text"
                                                autoComplete="car-name"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                                value={model}
                                                onChange={(e) => setModel(e.target.value)}
                                            />
                                        </div>
                                    </div>



                                    <div className='col-span-3 lg:col-span-2'>
                                        <label htmlFor="model-year" className="block text-sm/6 font-medium text-gray-900">
                                            Model Year
                                        </label>
                                        <div className='mt-2 w-full'>
                                            <DatePicker
                                                selected={new Date(modelYear, 0)}
                                                onChange={handleYearChange}
                                                showYearPicker
                                                dateFormat="yyyy"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-3 lg:col-span-2">
                                        <label htmlFor="vehicle-purchase-date" className="block text-sm/6 font-medium text-gray-900">
                                            Vehicle Purchase Date
                                        </label>
                                        <div className="mt-2">
                                            <Datepicker
                                                id='vehicle-purchase-date'
                                                name='vehicle-purchase-date'
                                                type='vehicle-purchase-date'
                                                onChange={handlePurchaseDateChange}
                                                value={purchaseDate}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-3 lg:col-span-2">
                                        <label htmlFor="vehicle-color" className="block text-sm/6 font-medium text-gray-900">
                                            Vehicle Color
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="vehicle-color"
                                                name="vehicle-color"
                                                type="text"
                                                autoComplete="vehicle-color"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                                onChange={(e) => setColor(e.target.value)}
                                                value={color}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-3 lg:col-span-2">
                                        <label htmlFor="miles" className="block text-sm/6 font-medium text-gray-900">
                                            Miles on Vehicle
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="miles"
                                                name="miles"
                                                type="text"
                                                autoComplete="address-level2"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                                onChange={(e) => setStartingMileage(e.target.value)}
                                                value={startingMileage}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <label htmlFor="vehicle-license" className="block text-sm/6 font-medium text-gray-900">
                                            License Plate Number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="vehicle-license"
                                                name="vehicle-license"
                                                type="text"
                                                autoComplete="vehicle-license"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                                                onChange={(e) => setLicensePlate(e.target.value)}
                                                value={licensePlate}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-3 lg:col-span-2">
                                        <label htmlFor="exempt" className="block text-sm font-medium text-gray-900">
                                            Exempt Status
                                        </label>
                                        <div className="mt-3">
                                            <select
                                                id="exempt"
                                                name="exempt"
                                                autoComplete="exempt"
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm"
                                                defaultValue="Null"
                                                onChange={(e) => setIsExempt(e.target.value)}
                                                value={isExempt}
                                            >
                                                <option value="Null">Select the exempt status</option>
                                                <option value="Exempt">Exempt</option>
                                                <option value="Not Exempt">Not Exempt</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-span-3 lg:col-span-2">
                                        <label htmlFor="exempt" className="block text-sm font-medium text-gray-900">
                                            Department
                                        </label>
                                        <div className="mt-3">
                                            <select
                                                id="exempt"
                                                name="exempt"
                                                autoComplete="exempt"
                                                className="block w-full overflow-hidden rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm"
                                                defaultValue="Null"
                                                onChange={(e) => setVehicleDepartment(e.target.value)}
                                                value={vehicleDepartment}
                                            >
                                                <option value="Null">Select the exempt status</option>
                                                <option value="Admissions">Admissions</option>
                                                <option value="Agricultural Learning Center">Agricultural Learning Center</option>
                                                <option value="Assessment Office">Assessment Office</option>
                                                <option value="B.D. Owens Library">B.D. Owens Library</option>
                                                <option value="Bearcat Baseball Field">Bearcat Baseball Field</option>
                                                <option value="Bearcat Pitch">Bearcat Pitch</option>
                                                <option value="Bearcat Softball Field">Bearcat Softball Field</option>
                                                <option value="Bearcat Stadium">Bearcat Stadium</option>
                                                <option value="Carl and Cheryl Hughes Fieldhouse">Carl and Cheryl Hughes Fieldhouse</option>
                                                <option value="Lamkin Activity Center">Lamkin Activity Center</option>
                                                <option value="Bearcat Arena">Bearcat Arena</option>
                                                <option value="Bearcat Stadium">Bearcat Stadium</option>
                                                <option value="Career Services">Career Services</option>
                                                <option value="Campus Dining">Campus Dining</option>
                                                <option value="Controller's Office">Controller's Office</option>
                                                <option value="Custodial Services Center">Custodial Services Center</option>
                                                <option value="Department of Athletics">Department of Athletics</option>
                                                <option value="Department of Fine and Performing Arts">Department of Fine and Performing Arts</option>
                                                <option value="Department of Humanities and Social Sciences">Department of Humanities and Social Sciences</option>
                                                <option value="Department of Language, Literature and Writing">Department of Language, Literature and Writing</option>
                                                <option value="Department of Mathematics and Statistics">Department of Mathematics and Statistics</option>
                                                <option value="Department of Natural Sciences">Department of Natural Sciences</option>
                                                <option value="Facility Services">Facility Services</option>
                                                <option value="Facility Services Building, south">Facility Services Building, south</option>
                                                <option value="Facility Services Building, north">Facility Services Building, north</option>
                                                <option value="Facility Services East">Facility Services East</option>
                                                <option value="Financial Aid Office">Financial Aid Office</option>
                                                <option value="Grants and Special Programs Office">Grants and Special Programs Office</option>
                                                <option value="Human Resources">Human Resources</option>
                                                <option value="Horace Mann Laboratory School">Horace Mann Laboratory School</option>
                                                <option value="International Involvement Center">International Involvement Center</option>
                                                <option value="Institutional Research and Effectiveness">Institutional Research and Effectiveness</option>
                                                <option value="Information Technology">Information Technology</option>
                                                <option value="John C. Redden Jr. Power Plant">John C. Redden Jr. Power Plant</option>
                                                <option value="KZLX radio">KZLX radio</option>
                                                <option value="KNWT TV">KNWT TV</option>
                                                <option value="Mail and Printing Services">Mail and Printing Services</option>
                                                <option value="Mark Rosewell Tennis Center">Mark Rosewell Tennis Center</option>
                                                <option value="Melvin D. & Valorie G. Booth School of Business">Melvin D. & Valorie G. Booth School of Business</option>
                                                <option value="Michael L. Faust Center for Alumni and Friends">Michael L. Faust Center for Alumni and Friends</option>
                                                <option value="Missouri Army National Guard Officer Leadership Development">Missouri Army National Guard Officer Leadership Development</option>
                                                <option value="Mozingo Outdoor Education Recreation Area (MOERA)">Mozingo Outdoor Education Recreation Area (MOERA)</option>
                                                <option value="Office of University Advancement">Office of University Advancement</option>
                                                <option value="Office of Purchasing">Office of Purchasing</option>
                                                <option value="Olive DeLuce Art Gallery">Olive DeLuce Art Gallery</option>
                                                <option value="Personal Development and Counseling Services and Wellness Services">Personal Development and Counseling Services and Wellness Services</option>
                                                <option value="President Office">President Office</option>
                                                <option value="Purchasing">Purchasing</option>
                                                <option value="Provost Office">Provost Office</option>
                                                <option value="Registrar's Office">Registrar's Office</option>
                                                <option value="Residential Life">Residential Life</option>
                                                <option value="Recycling Center">Recycling Center</option>
                                                <option value="Richard Leet Center for Children and Families">Richard Leet Center for Children and Families</option>
                                                <option value="Robert and Virginia Foster Fitness Center">Robert and Virginia Foster Fitness Center</option>
                                                <option value="Ron Houston Center for the Performing Arts">Ron Houston Center for the Performing Arts</option>
                                                <option value="R.T. Wright Farm">R.T. Wright Farm</option>
                                                <option value="Special Collections">Special Collections</option>
                                                <option value="Student Success Center">Student Success Center</option>
                                                <option value="Student Account Services">Student Account Services</option>
                                                <option value="Student Involvement">Student Involvement</option>
                                                <option value="Student Affairs">Student Affairs</option>
                                                <option value="School of Agricultural Sciences">School of Agricultural Sciences</option>
                                                <option value="School of Communication and Mass Media">School of Communication and Mass Media</option>
                                                <option value="School of Computer Science and Information Systems">School of Computer Science and Information Systems</option>
                                                <option value="School of Education">School of Education</option>
                                                <option value="School of Health Science and Wellness">School of Health Science and Wellness</option>
                                                <option value="Scholarships and Financial Assistance">Scholarships and Financial Assistance</option>
                                                <option value="Student Recreation Center">Student Recreation Center</option>
                                                <option value="Textbook Services">Textbook Services</option>
                                                <option value="The Northwest Missourian newspaper">The Northwest Missourian newspaper</option>
                                                <option value="Tower yearbook">Tower yearbook</option>
                                                <option value="University Archives">University Archives</option>
                                                <option value="University Police Department">University Police Department</option>
                                                <option value="University Marketing & Communication">University Marketing & Communication</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='col-span-3'>
                                        <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">
                                            Photo
                                        </label>
                                        <div className="mt-2 flex items-center gap-x-3">
                                            {imagePreviewUrl ? (
                                                <img src={imagePreviewUrl} alt="Profile" className="size-24 object-cover object-center" />
                                            ) : (
                                                <UserCircleIcon aria-hidden="true" className="size-48 text-gray-300" />
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
                        </div>

                        <div className="mt-6 pb-6 flex items-center justify-end gap-x-[5%] md:gap-x-[35%] lg:gap-x-[23%] ">
                            <button onClick={() => navigate('/Vehicles')} type="button" className="text-sm/6 font-semibold text-gray-900 mt-4">
                                Cancel
                            </button>
                            <div className='mb-6'>
                                <button
                                    type="button"
                                    className="absolute right-[100px] rounded-md bg-green-100 px-3.5 py-2.5 text-base font-semibold text-green-800 shadow-sm hover:bg-green-100"
                                    onClick={handleUpdateVehicle}
                                >
                                    <div className='flex flex-row gap-2'>
                                        <div className='flex flex-row'>
                                            <TruckIcon className='w-6 h-6 -mr-[2px]' />
                                            <PlusCircleIcon className='w-[15px] h-[15px] mt-[2px]' />
                                        </div>
                                        <span>
                                            Save Edits
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </form>)}
            </main>
        </div>
    )
}
