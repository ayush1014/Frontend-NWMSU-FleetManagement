import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WrenchIcon, PlusCircleIcon } from '@heroicons/react/20/solid';

const AddMaintenanceEvent = () => {
  const navigate = useNavigate();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    northwestVehicleNo: '',
    date: '',
    maintenanceCost: '',
    maintenanceDescription: '',
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
    // Here, you can add logic to save the maintenance event (e.g., send data to an API or update state)
    console.log('Maintenance Event Data:', formData);

    // Redirect back to the Maintenance Events page after submission
    navigate('/maintenance-events');
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Maintenance Event</h1>
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

          {/* Maintenance Cost ($) Field */}
          <div className="mb-4">
            <label htmlFor="maintenanceCost" className="block text-sm font-medium text-gray-700">
              Maintenance Cost ($)
            </label>
            <input
              type="number"
              name="maintenanceCost"
              id="maintenanceCost"
              value={formData.maintenanceCost}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="Enter Maintenance Cost ($)"
              step="0.01" // Allows decimal values
              required
            />
          </div>

          {/* Maintenance Description Field */}
          <div className="mb-6">
            <label htmlFor="maintenanceDescription" className="block text-sm font-medium text-gray-700">
              Maintenance Description
            </label>
            <textarea
              name="maintenanceDescription"
              id="maintenanceDescription"
              value={formData.maintenanceDescription}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              placeholder="Enter Maintenance Description"
              rows="3" // Adjust the number of rows as needed
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <WrenchIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              <PlusCircleIcon className="h-4 w-4 mr-2" aria-hidden="true" />
              Add Maintenance Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMaintenanceEvent;