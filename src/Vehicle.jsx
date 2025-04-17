import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon, MagnifyingGlassIcon, PlusCircleIcon, TruckIcon, PencilIcon, TrashIcon } from '@heroicons/react/20/solid'
import Navigation from './Navigation'
import { useNavigate } from 'react-router-dom';
import { FaTruckPickup, FaShuttleVan, FaCarSide } from "react-icons/fa";
import { GiSurferVan } from "react-icons/gi";
import { useState, useEffect } from 'react';
import api from './Config/axios';
import { HR } from 'flowbite-react';
import noPreview from './assets/noPreview.png'
import { OrbitProgress } from 'react-loading-indicators'


const departmentOptions = [
    { id: 'All', title: 'All' },
    { id: 'Admissions - Recruiters', title: 'Admissions - Recruiters' },
    { id: 'Ag Transportation', title: 'Ag Transportation' },
    { id: 'Alternative Crops', title: 'Alternative Crops' },
    { id: 'Athletic Grounds', title: 'Athletic Grounds' },
    { id: 'Athletics', title: 'Athletics' },
    { id: 'Auxiliary Services', title: 'Auxiliary Services' },
    { id: 'Biology', title: 'Biology' },
    { id: 'Campus Dining', title: 'Campus Dining' },
    { id: 'Campus Rec', title: 'Campus Rec' },
    { id: 'Campus Safety', title: 'Campus Safety' },
    { id: 'Capital Programs', title: 'Capital Programs' },
    { id: 'Central Plant', title: 'Central Plant' },
    { id: 'Central Receiving', title: 'Central Receiving' },
    { id: 'Communication & Mass Media', title: 'Communication & Mass Media' },
    { id: 'Computer Services', title: 'Computer Services' },
    { id: 'Custodial', title: 'Custodial' },
    { id: 'Facilities Services', title: 'Facilities Services' },
    { id: 'Farm', title: 'Farm' },
    { id: 'Health & Safety', title: 'Health & Safety' },
    { id: 'Humanities & Social Sciences', title: 'Humanities & Social Sciences' },
    { id: 'Landscape Services', title: 'Landscape Services' },
    { id: 'Mail Room', title: 'Mail Room' },
    { id: 'Maintenance', title: 'Maintenance' },
    { id: 'Radio Station', title: 'Radio Station' },
    { id: 'Recycling', title: 'Recycling' },
    { id: 'Residential Life', title: 'Residential Life' },
    { id: 'Streets & Parking Lots', title: 'Streets & Parking Lots' },
    { id: 'Sustainability', title: 'Sustainability' },
    { id: 'Transportation', title: 'Transportation' },
    { id: 'Trash', title: 'Trash' },
    { id: 'Wellness Services', title: 'Wellness Services' }

];

// const departmentOptions = [
//     { id: 'All', title: 'All' },
//     { id: 'Admissions', title: 'Admissions' },
//     { id: 'Agricultural Learning Center', title: 'Agricultural Learning Center' },
//     { id: 'Assessment Office', title: 'Assessment Office' },
//     { id: 'B.D. Owens Library', title: 'B.D. Owens Library' },
//     { id: 'Bearcat Baseball Field', title: 'Bearcat Baseball Field' },
//     { id: 'Bearcat Pitch', title: 'Bearcat Pitch' },
//     { id: 'Bearcat Softball Field', title: 'Bearcat Softball Field' },
//     { id: 'Bearcat Stadium', title: 'Bearcat Stadium' },
//     { id: 'Carl and Cheryl Hughes Fieldhouse', title: 'Carl and Cheryl Hughes Fieldhouse' },
//     { id: 'Lamkin Activity Center', title: 'Lamkin Activity Center' },
//     { id: 'Career Services', title: 'Career Services' },
//     { id: 'Campus Dining', title: 'Campus Dining' },
//     { id: 'Controller\'s Office', title: 'Controller\'s Office' },
//     { id: 'Custodial Services Center', title: 'Custodial Services Center' },
//     { id: 'Department of Athletics', title: 'Department of Athletics' },
//     { id: 'Department of Fine and Performing Arts', title: 'Department of Fine and Performing Arts' },
//     { id: 'Department of Humanities and Social Sciences', title: 'Department of Humanities and Social Sciences' },
//     { id: 'Department of Language, Literature and Writing', title: 'Department of Language, Literature and Writing' },
//     { id: 'Department of Mathematics and Statistics', title: 'Department of Mathematics and Statistics' },
//     { id: 'Department of Natural Sciences', title: 'Department of Natural Sciences' },
//     { id: 'Facility Services', title: 'Facility Services' },
//     { id: 'Facility Services Building, south', title: 'Facility Services Building, south' },
//     { id: 'Facility Services Building, north', title: 'Facility Services Building, north' },
//     { id: 'Facility Services East', title: 'Facility Services East' },
//     { id: 'Financial Aid Office', title: 'Financial Aid Office' },
//     { id: 'Grants and Special Programs Office', title: 'Grants and Special Programs Office' },
//     { id: 'Human Resources', title: 'Human Resources' },
//     { id: 'Horace Mann Laboratory School', title: 'Horace Mann Laboratory School' },
//     { id: 'International Involvement Center', title: 'International Involvement Center' },
//     { id: 'Institutional Research and Effectiveness', title: 'Institutional Research and Effectiveness' },
//     { id: 'Information Technology', title: 'Information Technology' },
//     { id: 'John C. Redden Jr. Power Plant', title: 'John C. Redden Jr. Power Plant' },
//     { id: 'KZLX radio', title: 'KZLX radio' },
//     { id: 'KNWT TV', title: 'KNWT TV' },
//     { id: 'Mail and Printing Services', title: 'Mail and Printing Services' },
//     { id: 'Mark Rosewell Tennis Center', title: 'Mark Rosewell Tennis Center' },
//     { id: 'Melvin D. & Valorie G. Booth School of Business', title: 'Melvin D. & Valorie G. Booth School of Business' },
//     { id: 'Michael L. Faust Center for Alumni and Friends', title: 'Michael L. Faust Center for Alumni and Friends' },
//     { id: 'Missouri Army National Guard Officer Leadership Development', title: 'Missouri Army National Guard Officer Leadership Development' },
//     { id: 'Mozingo Outdoor Education Recreation Area (MOERA)', title: 'Mozingo Outdoor Education Recreation Area (MOERA)' },
//     { id: 'Office of University Advancement', title: 'Office of University Advancement' },
//     { id: 'Office of Purchasing', title: 'Office of Purchasing' },
//     { id: 'Olive DeLuce Art Gallery', title: 'Olive DeLuce Art Gallery' },
//     { id: 'Personal Development and Counseling Services and Wellness Services', title: 'Personal Development and Counseling Services and Wellness Services' },
//     { id: 'President Office', title: 'President Office' },
//     { id: 'Purchasing', title: 'Purchasing' },
//     { id: 'Provost Office', title: 'Provost Office' },
//     { id: 'Registrar\'s Office', title: 'Registrar\'s Office' },
//     { id: 'Residential Life', title: 'Residential Life' },
//     { id: 'Recycling Center', title: 'Recycling Center' },
//     { id: 'Richard Leet Center for Children and Families', title: 'Richard Leet Center for Children and Families' },
//     { id: 'Robert and Virginia Foster Fitness Center', title: 'Robert and Virginia Foster Fitness Center' },
//     { id: 'Ron Houston Center for the Performing Arts', title: 'Ron Houston Center for the Performing Arts' },
//     { id: 'R.T. Wright Farm', title: 'R.T. Wright Farm' },
//     { id: 'Special Collections', title: 'Special Collections' },
//     { id: 'Student Success Center', title: 'Student Success Center' },
//     { id: 'Student Account Services', title: 'Student Account Services' },
//     { id: 'Student Involvement', title: 'Student Involvement' },
//     { id: 'Student Affairs', title: 'Student Affairs' },
//     { id: 'School of Agricultural Sciences', title: 'School of Agricultural Sciences' },
//     { id: 'School of Communication and Mass Media', title: 'School of Communication and Mass Media' },
//     { id: 'School of Computer Science and Information Systems', title: 'School of Computer Science and Information Systems' },
//     { id: 'School of Education', title: 'School of Education' },
//     { id: 'School of Health Science and Wellness', title: 'School of Health Science and Wellness' },
//     { id: 'Scholarships and Financial Assistance', title: 'Scholarships and Financial Assistance' },
//     { id: 'Student Recreation Center', title: 'Student Recreation Center' },
//     { id: 'Textbook Services', title: 'Textbook Services' },
//     { id: 'The Northwest Missourian newspaper', title: 'The Northwest Missourian newspaper' },
//     { id: 'Tower yearbook', title: 'Tower yearbook' },
//     { id: 'University Archives', title: 'University Archives' },
//     { id: 'University Police Department', title: 'University Police Department' },
//     { id: 'University Marketing & Communication', title: 'University Marketing & Communication' }
// ];



export default function Vehicle() {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [recentVehicles, setRecentVehicles] = useState([]);
    const [selectedDepartments, setSelectedDepartments] = useState('All');
    const [filterSelected, setFilterSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const handleAddVehicleClick = () => {
        navigate('/add-vehicles');
    };

    useEffect(() => {
        const fetchVehicles = async () => {
            setIsLoading(true)
            try {
                const response = await api.get('/vehicles');
                setVehicles(response.data);
                setIsLoading(false)
            } catch (error) {
                console.error('Error fetching vehicles:', error);
                setIsLoading(false)
            }
        };

        fetchVehicles();
    }, []);

    useEffect(() => {
        const fetchRecentVehicles = async () => {
            setIsLoading(true)
            try {
                const response = await api.get('/recentVehicles');
                setRecentVehicles(response.data);
                setIsLoading(false)
            } catch (error) {
                console.error('Error Fetching Recent Vehicles: ', error);
                setIsLoading(false)
            }
        }

        fetchRecentVehicles()
    }, []);

    const filteredVehicles = vehicles.filter(vehicle =>
        selectedDepartments.includes('All') || selectedDepartments.includes(vehicle.vehicleDepartment)
    );

    const handleDepartmentChange = (id) => {
        if (id === 'All') {
            setSelectedDepartments(['All']);
        } else {
            if (selectedDepartments.includes('All')) {
                setSelectedDepartments([id]);
            } else if (selectedDepartments.includes(id)) {
                setSelectedDepartments(selectedDepartments.filter(item => item !== id));
            } else {
                setSelectedDepartments([...selectedDepartments, id]);
            }
        }
    };

    const handleDepartmentFilterClick = () => {
        setFilterSelected(prevState => !prevState);
    }

    return (

        <div className='min-h-screen'>
            <Navigation />
            <main className='lg:pl-[20%] lg:pr-[4%] mt-[2%]'>
                <div className="relative rounded-full shadow-sm mb-4">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </div>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="block w-full rounded-full border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        placeholder="Search vehicles..."
                    />
                </div>
                <div className='mb-6'>
                    <button
                        type="button"
                        className="absolute right-[100px] rounded-md bg-green-100 px-3.5 py-2.5 text-base font-semibold text-green-800 shadow-sm hover:bg-green-100"
                        onClick={handleAddVehicleClick}
                    >
                        <div className='flex flex-row gap-2'>
                            <div className='flex flex-row'>
                                <TruckIcon className='w-6 h-6 -mr-[2px]' />
                                <PlusCircleIcon className='w-[15px] h-[15px] mt-[2px]' />
                            </div>
                            <span>
                                Add Vehicles
                            </span>
                        </div>
                    </button>
                </div>
                <div className="relative mt-24">
                    <div aria-hidden="true" className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-3 text-base font-semibold text-gray-900">Recently Added Vehicle</span>
                    </div>
                </div>

                {isLoading ? (
                    <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
                        <OrbitProgress color={["#031a03", "#094709", "#0e750e", "#13a313"]} />
                    </div>
                ) : (<ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 p-2 pt-8">
                    {recentVehicles.map((vehicle) => (
                        <li key={vehicle.NWVehicleNo} className="relative">
                            <div className="group relative overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100" onClick={() => navigate(`/vehicle-profile/${vehicle.NWVehicleNo}`)}>

                                {/* Three-dot Menu */}
                                <Menu as="div" className="absolute top-2 right-2 z-10 text-left">
                                    <MenuButton
                                        className="inline-flex justify-center w-8 h-8 items-center bg-white bg-opacity-70 rounded-full shadow hover:bg-opacity-100 focus:outline-none"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <EllipsisVerticalIcon className="h-5 w-5 text-gray-700" />
                                    </MenuButton>
                                    <MenuItems className="absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                                        <div className="py-1">
                                            <MenuItem as="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    console.log('vehicle id: ', vehicle.NWVehicleNo)
                                                    navigate(`/edit-vehicle/${vehicle.NWVehicleNo}`);
                                                }}
                                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 data-[active]:bg-gray-100"
                                            >
                                                <PencilIcon className="mr-2 h-4 w-4 text-gray-500" />
                                                Edit
                                            </MenuItem>
                                            <MenuItem as="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    console.log('Delete vehicle', vehicle.NWVehicleNo);
                                                }}
                                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 data-[active]:bg-gray-100"
                                            >
                                                <TrashIcon className="mr-2 h-4 w-4 text-red-500" />
                                                Delete
                                            </MenuItem>
                                        </div>
                                    </MenuItems>
                                </Menu>


                                {/* Vehicle Image */}
                                <img
                                    alt={`Vehicle: ${vehicle.make} ${vehicle.model}`}
                                    src={vehicle.vehiclePic || noPreview}
                                    className="pointer-events-none aspect-[10/7] object-cover group-hover:opacity-75"
                                />
                                <button type="button" className="absolute inset-0 focus:outline-none">
                                    <span className="sr-only">View details for {vehicle.make} {vehicle.model}</span>
                                </button>
                            </div>

                            {/* Card Details */}
                            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-[10px] font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                {vehicle.vehDescription}
                            </span>
                            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{vehicle.make} {vehicle.model}</p>
                            <p className="pointer-events-none block text-sm font-medium text-gray-500">{vehicle.vehicleDepartment}</p>
                        </li>

                    ))}
                </ul>)}

                <div className="relative mt-8">
                    <div aria-hidden="true" className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-3 text-base font-semibold text-gray-900">All Vehicle</span>
                    </div>
                </div>

                <fieldset>
                    <legend className="text-sm/6 font-semibold text-gray-900">Filters</legend>
                    <p className="mt-1 text-sm/6 text-gray-600">Select any filter to filter by department</p>
                    <span className="inline-flex cursor-pointer items-center rounded-md bg-green-50 mt-4 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20" onClick={handleDepartmentFilterClick}>
                        Filter by Department
                    </span>
                    {filterSelected ? (<div className="mt-6 flex flex-wrap justify-start gap-4">
                        {departmentOptions.map((departmentMethod) => (
                            <div key={departmentMethod.id} className="flex items-center">
                                <input
                                    id={departmentMethod.id}
                                    name="notification-method"
                                    type="checkbox"
                                    checked={selectedDepartments.includes(departmentMethod.id)}
                                    onChange={() => handleDepartmentChange(departmentMethod.id)}
                                    className="size-4 appearance-none rounded-full border border-gray-300 bg-white checked:border-green-700 checked:bg-green-700"
                                />

                                <label htmlFor={departmentMethod.id} className="ml-3 block text-sm/6 font-medium text-gray-900">
                                    {departmentMethod.title}
                                </label>
                            </div>
                        ))}
                    </div>) : (<div></div>)}
                </fieldset>


                {isLoading ? (
                    <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
                        <OrbitProgress color={["#031a03", "#094709", "#0e750e", "#13a313"]} />
                    </div>
                ) : (<ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 p-2 pt-8">
                    {filteredVehicles.map((vehicle) => (
                        <li key={vehicle.NWVehicleNo} className="relative">
                            <div className="group relative overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100" onClick={() => navigate(`/vehicle-profile/${vehicle.NWVehicleNo}`)}>

                                {/* Three-dot Menu */}
                                <Menu as="div" className="absolute top-2 right-2 z-10 text-left">
                                    <MenuButton
                                        className="inline-flex justify-center w-8 h-8 items-center bg-white bg-opacity-70 rounded-full shadow hover:bg-opacity-100 focus:outline-none"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <EllipsisVerticalIcon className="h-5 w-5 text-gray-700" />
                                    </MenuButton>
                                    <MenuItems className="absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                                        <div className="py-1">
                                            <MenuItem as="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    console.log('vehicle id: ', vehicle.NWVehicleNo)
                                                    navigate(`/edit-vehicle/${vehicle.NWVehicleNo}`);
                                                }}
                                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 data-[active]:bg-gray-100"
                                            >
                                                <PencilIcon className="mr-2 h-4 w-4 text-gray-500" />
                                                Edit
                                            </MenuItem>
                                            <MenuItem as="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    console.log('Delete vehicle', vehicle.NWVehicleNo);
                                                }}
                                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 data-[active]:bg-gray-100"
                                            >
                                                <TrashIcon className="mr-2 h-4 w-4 text-red-500" />
                                                Delete
                                            </MenuItem>
                                        </div>
                                    </MenuItems>
                                </Menu>


                                {/* Vehicle Image */}
                                <img
                                    alt={`Vehicle: ${vehicle.make} ${vehicle.model}`}
                                    src={vehicle.vehiclePic || noPreview}
                                    className="pointer-events-none aspect-[10/7] object-cover group-hover:opacity-75"
                                />
                                <button type="button" className="absolute inset-0 focus:outline-none">
                                    <span className="sr-only">View details for {vehicle.make} {vehicle.model}</span>
                                </button>
                            </div>

                            {/* Card Details */}
                            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-[10px] font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                {vehicle.vehDescription}
                            </span>
                            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{vehicle.make} {vehicle.model}</p>
                            <p className="pointer-events-none block text-sm font-medium text-gray-500">{vehicle.vehicleDepartment}</p>
                        </li>
                    ))}
                </ul>)}

                <HR />
            </main>
        </div>
    )
}
