import React, { useState, useEffect } from 'react';
import api from './Config/axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { IoMdDownload } from "react-icons/io";


export default function VehicleInfoReportTable() {
  const [vehicles, setVehicles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchVehicleData = async (pageNumber = 1) => {
    try {
      const result = await api.get(`/vehicleInfo/info?page=${pageNumber}`);
      if (result?.data) {
        setVehicles(result.data.data);
        setTotalPages(result.data.totalPages);
        setPage(result.data.page);
      }
    } catch (error) {
      console.error('Error fetching vehicle info report:', error);
      setVehicles([]);
    }
  };

  useEffect(() => {
    fetchVehicleData(page);
  }, [page]);

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const response = await api.get('/vehicleInfo/info?all=true');
      const allVehicles = response.data.data || [];

      const rows = allVehicles.map((v) => ({
        'Vehicle No': v.NWVehicleNo,
        'VIN': v.VIN,
        'Model Year': v.modelYear,
        'Make': v.make,
        'Model': v.model,
        'Weight': v.weight,
        'Type': v.vehType,
        'Department': v.vehicleDepartment,
        'Color': v.color,
        'License Plate': v.licensePlate,
        'Exempt': v.isExempt,
        'Purchase Date': new Date(v.purchaseDate).toLocaleDateString('en-US', { timeZone: 'UTC' })
      }));

      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Vehicle Info');

      const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([buffer], { type: 'application/octet-stream' });
      saveAs(blob, `All_Vehicle_Info.xlsx`);
    } catch (error) {
      console.error('Error downloading full vehicle report:', error);
      alert('Failed to download vehicle report.');
    }
  };


  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Vehicle No</th>
              <th className="border px-4 py-2">VIN</th>
              <th className="border px-4 py-2">Model Year</th>
              <th className="border px-4 py-2">Make</th>
              <th className="border px-4 py-2">Model</th>
              <th className="border px-4 py-2">Weight</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Department</th>
              <th className="border px-4 py-2">Color</th>
              <th className="border px-4 py-2">License Plate</th>
              <th className="border px-4 py-2">Exempt</th>
              <th className="border px-4 py-2">Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.NWVehicleNo} className="bg-white">
                <td className="border px-4 py-2">{vehicle.NWVehicleNo}</td>
                <td className="border px-4 py-2">{vehicle.VIN}</td>
                <td className="border px-4 py-2">{vehicle.modelYear}</td>
                <td className="border px-4 py-2">{vehicle.make}</td>
                <td className="border px-4 py-2">{vehicle.model}</td>
                <td className="border px-4 py-2">{vehicle.weight}</td>
                <td className="border px-4 py-2">{vehicle.vehType}</td>
                <td className="border px-4 py-2">{vehicle.vehicleDepartment}</td>
                <td className="border px-4 py-2">{vehicle.color}</td>
                <td className="border px-4 py-2">{vehicle.licensePlate}</td>
                <td className="border px-4 py-2">{vehicle.isExempt}</td>
                <td className="border px-4 py-2">{<time dateTime={vehicle.purchaseDate}>{new Date(vehicle.purchaseDate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</time>}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => goToPage(page - 1)}
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
          disabled={page === 1}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-green-600 text-white' : 'bg-white hover:bg-gray-100'}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => goToPage(page + 1)}
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={handleDownloadExcel}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          <div className='flex gap-2'>
            <div>
              <IoMdDownload size={24} />
            </div>
            <div>
              Download Report
            </div>
          </div>
        </button>
      </div>

    </div>
  );
}
