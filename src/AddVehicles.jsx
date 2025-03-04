import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TruckIcon, PlusCircleIcon } from '@heroicons/react/20/solid';

const AddVehicles = () => {
  const navigate = useNavigate();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    northwestVehicleNo: '',
    vehicleIdentificationNo: '',
    modelYear: '',
    make: '',
    model: '',
    purchaseDate: '',
    startingMileage: '',
    vehicleWeight: '',
    fuelType: '',
    vehicleDescription: '',
    exempt: 'No', // Default value
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can add logic to save the new vehicle (e.g., send data to an API or update state)
    console.log('New Vehicle Data:', formData);

    // Redirect back to the Vehicles page after submission
    navigate('/vehicles');
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Vehicle</h1>
        <form onSubmit={handleSubmit}>
          {/* Northwest Vehicle No. Field */}
          <div className="mb-4">
            <label htmlFor="northwestVehicleNo" className="block text-sm font-medium text-gray-700">
              Northwest Vehicle No.
            </label>
            <input
              type="text"
              name="northwestVehicleNo"
              id="northwestVehicleNo"
              value={formData.northwestVehicleNo}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="Enter Northwest Vehicle No."
              required
            />
          </div>

          {/* Vehicle Identification No. Field */}
          <div className="mb-4">
            <label htmlFor="vehicleIdentificationNo" className="block text-sm font-medium text-gray-700">
              Vehicle Identification No.
            </label>
            <input
              type="text"
              name="vehicleIdentificationNo"
              id="vehicleIdentificationNo"
              value={formData.vehicleIdentificationNo}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="Enter Vehicle Identification No."
              required
            />
          </div>

          {/* Model Year Field */}
          <div className="mb-4">
            <label htmlFor="modelYear" className="block text-sm font-medium text-gray-700">
              Model Year
            </label>
            <input
              type="number"
              name="modelYear"
              id="modelYear"
              value={formData.modelYear}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="Enter Model Year"
              required
            />
          </div>

          {/* Make Field */}
          <div className="mb-4">
            <label htmlFor="make" className="block text-sm font-medium text-gray-700">
              Make
            </label>
            <input
              type="text"
              name="make"
              id="make"
              value={formData.make}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="Enter Make"
              required
            />
          </div>

          {/* Model Field */}
          <div className="mb-4">
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">
              Model
            </label>
            <input
              type="text"
              name="model"
              id="model"
              value={formData.model}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="Enter Model"
              required
            />
          </div>

          {/* Purchase Date Field */}
          <div className="mb-4">
            <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700">
              Purchase Date
            </label>
            <input
              type="date"
              name="purchaseDate"
              id="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              required
            />
          </div>

          {/* Starting Mileage Field */}
          <div className="mb-4">
            <label htmlFor="startingMileage" className="block text-sm font-medium text-gray-700">
              Starting Mileage
            </label>
            <input
              type="number"
              name="startingMileage"
              id="startingMileage"
              value={formData.startingMileage}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="Enter Starting Mileage"
              required
            />
          </div>

          {/* Vehicle Weight Field */}
          <div className="mb-4">
            <label htmlFor="vehicleWeight" className="block text-sm font-medium text-gray-700">
              Vehicle Weight
            </label>
            <select
              name="vehicleWeight"
              id="vehicleWeight"
              value={formData.vehicleWeight}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              required
            >
              <option value="">Select Vehicle Weight</option>
              <option value="<= 8,500 pounds">&lt;= 8,500 pounds</option>
              <option value="> 8,500 pounds">&gt; 8,500 pounds</option>
            </select>
          </div>

          {/* Fuel Type Field */}
          <div className="mb-4">
            <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700">
              Fuel Type
            </label>
            <select
              name="fuelType"
              id="fuelType"
              value={formData.fuelType}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              required
            >
              <option value="">Select Fuel Type</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="E85">E85</option>
              <option value="CNG">CNG</option>
              <option value="Propane">Propane</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          {/* Vehicle Description Field */}
          <div className="mb-4">
            <label htmlFor="vehicleDescription" className="block text-sm font-medium text-gray-700">
              Vehicle Description
            </label>
            <select
              name="vehicleDescription"
              id="vehicleDescription"
              value={formData.vehicleDescription}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              required
            >
              <option value="">Select Vehicle Description</option>
              <option value="Cars and Station Wagons">Cars and Station Wagons</option>
              <option value="LDTs, Vans, SUVs">LDTs, Vans, SUVs</option>
            </select>
          </div>

          {/* Exempt Field */}
          <div className="mb-6">
            <label htmlFor="exempt" className="block text-sm font-medium text-gray-700">
              Exempt (Law Enforcement or &gt; 8,500 pounds)
            </label>
            <select
              name="exempt"
              id="exempt"
              value={formData.exempt}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              required
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <TruckIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              <PlusCircleIcon className="h-4 w-4 mr-2" aria-hidden="true" />
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicles;