import React, { useEffect, useState } from 'react';
import api from './Config/axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { IoMdDownload } from "react-icons/io";


const months = [
  { label: 'Jan', value: 1 }, { label: 'Feb', value: 2 }, { label: 'Mar', value: 3 },
  { label: 'Apr', value: 4 }, { label: 'May', value: 5 }, { label: 'Jun', value: 6 },
  { label: 'Jul', value: 7 }, { label: 'Aug', value: 8 }, { label: 'Sep', value: 9 },
  { label: 'Oct', value: 10 }, { label: 'Nov', value: 11 }, { label: 'Dec', value: 12 }
];

export default function MaintenanceReportTable() {
  const [maintenances, setMaintenances] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fiscalYear, setFiscalYear] = useState(null);
  const [fiscalYears, setFiscalYears] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState(months.map(m => m.value));

  const fetchMaintenances = async (pageNumber = 1, year = fiscalYear) => {
    try {
      const result = await api.post(`/maintenance/report?page=${pageNumber}`, {
        fiscalYear: year,
        months: selectedMonths
      });
      if (result?.data) {
        setMaintenances(result.data.maintenances);
        setTotalPages(result.data.totalPages);
        setPage(result.data.currentPage);
      }
    } catch (err) {
      console.error('Error fetching maintenances:', err);
      setMaintenances([]);
    }
  };

  const fetchFiscalYears = async () => {
    try {
      const response = await api.get('/maintenance/years');
      if (response?.data?.years?.length > 0) {
        setFiscalYears(response.data.years);
        setFiscalYear(response.data.years[0].value);
      }
    } catch (error) {
      console.error('Error fetching fiscal years:', error);
    }
  };

  const toggleMonth = (monthValue) => {
    setSelectedMonths((prev) =>
      prev.includes(monthValue)
        ? prev.filter((m) => m !== monthValue)
        : [...prev, monthValue]
    );
  };

  const toggleAllMonths = () => {
    if (selectedMonths.length === months.length) setSelectedMonths([]);
    else setSelectedMonths(months.map(m => m.value));
  };

  useEffect(() => {
    fetchFiscalYears();
  }, []);

  useEffect(() => {
    if (fiscalYear) {
      fetchMaintenances(1, fiscalYear);
    }
  }, [fiscalYear, selectedMonths]);

  useEffect(() => {
    if (fiscalYear) {
      fetchMaintenances(page, fiscalYear);
    }
  }, [page]);

  const handleDownloadExcel = () => {
    const rows = maintenances.map((m) => ({
      'Vehicle No': m.NWVehicleNo,
      'Vehicle': `${m.Vehicle?.make} ${m.Vehicle?.model} (${m.Vehicle?.vehType})`,
      'Maintenance By': `${m.User?.firstName} ${m.User?.lastName}`,
      'Date': new Date(m.date).toLocaleDateString(),
      'Description': m.maintainenceDescription,
      'Cost ($)': m.maintainenceCost,
      'Current Mileage': m.currentMileage
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Maintenance Report');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, `Maintenance_Report_FY${fiscalYear}.xlsx`);
  };


  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div className="flex items-center flex-wrap gap-2">
          <label className="text-sm font-semibold">Select Month(s):</label>
          {months.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => toggleMonth(value)}
              className={`px-2 py-1 rounded border text-sm font-medium ${selectedMonths.includes(value)
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white border-gray-300 text-gray-700'
                }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={toggleAllMonths}
            className="ml-2 px-2 py-1 rounded border border-blue-500 text-blue-500 text-sm font-medium"
          >
            {selectedMonths.length === months.length ? 'Unselect All' : 'Select All'}
          </button>
        </div>

        <div>
          <label className="text-sm font-medium mr-2">Fiscal Year:</label>
          <select
            value={fiscalYear || ''}
            onChange={(e) => {
              setPage(1);
              setFiscalYear(parseInt(e.target.value));
            }}
            className="border border-green-700 px-3 py-1 rounded"
          >
            {fiscalYears.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Vehicle No</th>
              <th className="border px-4 py-2">Vehicle</th>
              <th className="border px-4 py-2">Maintenance By</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Cost</th>
              <th className="border px-4 py-2">Current Mileage</th>
            </tr>
          </thead>
          <tbody>
            {maintenances.map((m) => (
              <tr key={m.maintainenceId} className="bg-white">
                <td className="border px-4 py-2">{m.NWVehicleNo}</td>
                <td className="border px-4 py-2">
                  {m.Vehicle?.make} {m.Vehicle?.model} ({m.Vehicle?.vehType})
                </td>
                <td className="border px-4 py-2">
                  {m.User?.firstName} {m.User?.lastName}
                </td>
                <td className="border px-4 py-2">{new Date(m.date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{m.maintainenceDescription}</td>
                <td className="border px-4 py-2">${m.maintainenceCost}</td>
                <td className="border px-4 py-2">{m.currentMileage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
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
          disabled={page === totalPages}
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
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
