// VehicleReportTable.jsx
import React, { useState, useEffect } from 'react';
import api from './Config/axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


const months = [
    { label: 'Jan', value: 1 },
    { label: 'Feb', value: 2 }, { label: 'Mar', value: 3 }, { label: 'Apr', value: 4 },
    { label: 'May', value: 5 }, { label: 'Jun', value: 6 }, { label: 'Jul', value: 7 },
    { label: 'Aug', value: 8 }, { label: 'Sep', value: 9 }, { label: 'Oct', value: 10 },
    { label: 'Nov', value: 11 }, { label: 'Dec', value: 12 },
];

export default function VehicleReportTable({ onLoad }) {
    const [selectedMonths, setSelectedMonths] = useState(months.map(m => m.value));
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [tableData, setTableData] = useState([]);

    const toggleMonth = (monthValue) => {
        setSelectedMonths(prev =>
            prev.includes(monthValue)
                ? prev.filter(m => m !== monthValue)
                : [...prev, monthValue]
        );
    };

    const toggleAllMonths = () => {
        if (selectedMonths.length === months.length) setSelectedMonths([]);
        else setSelectedMonths(months.map(m => m.value));
    };

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const result = await api.post('/vehicle/report', {
                    year: selectedYear,
                    months: selectedMonths
                });

                if (result?.data) {
                    setTableData(result.data);
                } else {
                    setTableData([]);
                }
            } catch (err) {
                console.error('Error fetching report:', err);
                setTableData([]);
            }
        };

        fetchReport().then(() => {
            onLoad?.();
        });;
    }, [selectedYear, selectedMonths]);

    const handleDownload = () => {
        const rows = [];

        tableData.forEach(group => {
            group.rows.forEach((row, idx) => {
                rows.push({
                    'Vehicle Type': idx === 0 ? group.type : '',
                    'Description': row.description,
                    '# Vehicles ≤ 8500 lbs': row.belowWeight,
                    '# Vehicles > 8500 lbs': row.aboveWeight,
                    'Miles Traveled': row.miles,
                    'Gas/Diesel Usage': row.gas,
                    'Alt Fuel Usage': row.alt,
                    'Gas/Diesel Cost': row.gasCost,
                    'Alt Fuel Cost': row.altCost,
                    'Maintenance Cost': row.maint
                });
            });
        });

        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Vehicle Report');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, `Vehicle_Report_${selectedYear}.xlsx`);
    };



    return (
        <div className="p-6">
            <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2 flex-wrap">
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

                <div className="ml-auto">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Year</label>
                    <select
                        className="border border-green-700 rounded-md h-10 px-3"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        {[...Array(10)].map((_, i) => {
                            const y = new Date().getFullYear() - i;
                            return (
                                <option key={y} value={y}>{y}</option>
                            );
                        })}
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2" rowSpan={2}>Vehicle Type</th>
                            <th className="border px-4 py-2" rowSpan={2}>Description</th>
                            <th className="border px-4 py-2 text-center" colSpan={2}># of Vehicles</th>
                            <th className="border px-4 py-2" rowSpan={2}>Miles Traveled</th>
                            <th className="border px-4 py-2 text-center" colSpan={2}>Fuel Usage</th>
                            <th className="border px-4 py-2 text-center" colSpan={3}>Cost</th>
                        </tr>
                        <tr>
                            <th className="border px-4 py-2">&le; 8500 lbs</th>
                            <th className="border px-4 py-2">&gt; 8500 lbs</th>
                            <th className="border px-4 py-2">Gas/Diesel</th>
                            <th className="border px-4 py-2">Alt Fuel</th>
                            <th className="border px-4 py-2">Gas/Diesel</th>
                            <th className="border px-4 py-2">Alt Fuel</th>
                            <th className="border px-4 py-2">Maintenance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((group) => (
                            <React.Fragment key={group.type}>
                                {group.rows.map((row, idx) => (
                                    <tr key={row.description} className="bg-white">
                                        {idx === 0 && (
                                            <td className="border px-4 py-2 font-semibold" rowSpan={group.rows.length}>
                                                {group.type}
                                            </td>
                                        )}
                                        <td className="border px-4 py-2">{row.description}</td>
                                        <td className="border px-4 py-2 text-center">{row.belowWeight}</td>
                                        <td className="border px-4 py-2 text-center">{row.aboveWeight}</td>
                                        <td className="border px-4 py-2 text-center">{row.miles}</td>
                                        <td className="border px-4 py-2 text-center">{row.gas}</td>
                                        <td className="border px-4 py-2 text-center">{row.alt}</td>
                                        <td className="border px-4 py-2 text-center">{row.gasCost}</td>
                                        <td className="border px-4 py-2 text-center">{row.altCost}</td>
                                        <td className="border px-4 py-2 text-center">{row.maint}</td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleDownload}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        Download Report
                    </button>
                </div>

            </div>
        </div>
    );
}
