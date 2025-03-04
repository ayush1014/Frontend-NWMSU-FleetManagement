import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TruckIcon, PlusCircleIcon } from '@heroicons/react/20/solid'; // Updated import

const AddFuelingEvent = () => {
  const navigate = useNavigate();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    northwestVehicleNo: '',
    date: '',
    currentMileage: '',
    fuelAdded: '',
    fuelCost: '',
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
    // Here, you can add logic to save the fueling event (e.g., send data to an API or update state)
    console.log('Fueling Event Data:', formData);

    // Redirect back to the Fueling Events page after submission
    navigate('/fueling-events');
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Fueling Event</h1>
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

          {/* Date Field */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              required
            />
          </div>

          {/* Current Mileage Field */}
          <div className="mb-4">
            <label htmlFor="currentMileage" className="block text-sm font-medium text-gray-700">
              Current Mileage
            </label>
            <input
              type="number"
              name="currentMileage"
              id="currentMileage"
              value={formData.currentMileage}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="Enter Current Mileage"
              required
            />
          </div>

          {/* Fuel Added (Gallons) Field */}
          <div className="mb-4">
            <label htmlFor="fuelAdded" className="block text-sm font-medium text-gray-700">
              Fuel Added (Gallons)
            </label>
            <input
              type="number"
              name="fuelAdded"
              id="fuelAdded"
              value={formData.fuelAdded}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="Enter Fuel Added (Gallons)"
              step="0.1" // Allows decimal values
              required
            />
          </div>

          {/* Fuel Cost ($) Field */}
          <div className="mb-6">
            <label htmlFor="fuelCost" className="block text-sm font-medium text-gray-700">
              Fuel Cost ($)
            </label>
            <input
              type="number"
              name="fuelCost"
              id="fuelCost"
              value={formData.fuelCost}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="Enter Fuel Cost ($)"
              step="0.01" // Allows decimal values
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <TruckIcon className="h-5 w-5 mr-2" aria-hidden="true" /> {/* Updated icon */}
              <PlusCircleIcon className="h-4 w-4 mr-2" aria-hidden="true" />
              Add Fueling Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFuelingEvent;