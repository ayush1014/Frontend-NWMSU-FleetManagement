import { PhotoIcon, UserCircleIcon, PlusCircleIcon, TruckIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import Navigation from './Navigation'
import { useState } from 'react';

const vehicleBrands = [
  'Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan', 'Jeep', 'Hyundai', 'Kia',
  'Subaru', 'GMC', 'Ram', 'Dodge', 'Mercedes-Benz', 'BMW', 'Volkswagen', 'Audi',
  'Lexus', 'Tesla', 'Mazda', 'Volvo', 'Porsche', 'Cadillac', 'Buick', 'Chrysler',
  'Lincoln', 'Acura', 'Infiniti', 'Land Rover', 'Jaguar', 'Mitsubishi', 'Mini',
  'Fiat', 'Alfa Romeo', 'Genesis', 'Rivian', 'Lucid', 'Fisker', 'Polestar'
];

export default function AddVehicles() {
  const [selectedBrand, setSelectedBrand] = useState('');
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navigation />
      <main className='p-[2%] lg:pl-[25%] lg:pr-[5%] mt-[5%] md:pl-[10%] md:pr-[10%]'>
        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">Vehicle Information</h2>
              <p className="mt-1 text-sm/6 text-gray-600">Please enter all the vehicle information.</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
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
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="brand" className="block text-sm/6 font-medium text-gray-900">
                    Vehicle Brand
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="brand"
                      name="brand"
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      autoComplete="brand-name"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                    >
                      <option value="">Select a brand</option>
                      {vehicleBrands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>))}
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
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
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="vehicle-year" className="block text-sm/6 font-medium text-gray-900">
                    Vehicle Year
                  </label>
                  <div className="mt-2">
                    <input
                      id="vehicle-year"
                      name="vehicle-year"
                      type="vehicle-year"
                      autoComplete="vehicle-year"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                    />
                  </div>
                </div>



                <div className="col-span-2">
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
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
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
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
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
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-[21%]">
            <button type="button" className="text-sm/6 font-semibold text-gray-900 mt-4">
              Cancel
            </button>
            <div className='mb-6'>
              <button
                type="button"
                className="absolute right-[100px] rounded-md bg-green-100 px-3.5 py-2.5 text-base font-semibold text-green-800 shadow-sm hover:bg-green-100"
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
          </div>
        </form>
      </main>
    </div>
  )
}
