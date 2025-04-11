import React, { useState, useEffect } from 'react';
import api from './Config/axios';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

import { ExclamationTriangleIcon, TruckIcon } from '@heroicons/react/20/solid'
ChartJS.register(ArcElement, Tooltip, Legend);

const VehicleMaintenancePieChart = () => {
    const [chartData, setChartData] = useState({});
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [availableYears, setAvailableYears] = useState([]);
    const [vehicleId, setVehicleId] = useState('');
    const [fetched, setFetched] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Please enter a Vehicle ID !');


    useEffect(() => {
        const fetchYears = async () => {
            const result = await api.get('/maintenance/years');
            if (result?.data) {
                setAvailableYears(result.data.years);
                if (!result.data.years.some(y => y.value === selectedYear)) {
                    setSelectedYear(result.data.years[0]?.value);
                }
            }
        };
        fetchYears();
    }, []);

    const fetchData = async () => {
        if (!vehicleId) {
            setFetched(false);
            return;
        }

        try {
            const result = await api.get(`/maintenance/vehicle/${vehicleId}?year=${selectedYear}`);
            const data = result.data;
            console.log('maintenance done', data)

            if (!data || data.length === 0) {
                const vehicleCheck = await api.get(`/vehiclesCheck/${vehicleId}`);
                console.log('vehicle check status: ', vehicleCheck)

                if (!vehicleCheck?.data) {
                    setErrorMessage(`Vehicle ID "${vehicleId}" is not valid.`);
                } else {
                    setErrorMessage(`No maintenance has been done for "${vehicleId}" in fiscal year ${selectedYear}.`);
                }

                setChartData({});
                setFetched(false);
                return;
            }

            // If data exists:
            const formattedData = data.map(d => {
                const [year, month] = d.month.split('-');
                const date = new Date(year, month - 1);
                return {
                    ...d,
                    monthLabel: date.toLocaleDateString('default', { month: 'short', year: 'numeric' })
                };
            });

            setChartData({
                labels: formattedData.map(d => d.monthLabel),
                datasets: [{
                    label: 'Refueling Cost ($)',
                    data: formattedData.map(d => parseFloat(d.totalMaintenanceCost)),
                    backgroundColor: formattedData.map(() =>
                        `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`
                    )
                }],
                metadata: formattedData.map(d => ({
                    total: parseFloat(d.totalMaintenanceCost),
                    count: parseInt(d.maintenanceCount),
                    month: d.monthLabel
                }))
            });

            setErrorMessage('');
            setFetched(true);

        } catch (err) {
            setErrorMessage(`Vehicle ID "${vehicleId}" is not valid.`);
            setFetched(false);
            setChartData({});
        }
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                labels: { font: { size: 14 } }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const index = context.dataIndex;
                        const label = chartData.labels?.[index] || '';
                        const value = chartData.metadata?.[index]?.total || 0;
                        const count = chartData.metadata?.[index]?.count || 0;
                        return ` ${label}: $${value.toFixed(2)} | ${count} maintenance event(s)`;
                    }
                },
                backgroundColor: '#333',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 10,
                bodyFont: { size: 14 },
                titleFont: { size: 16, weight: 'bold' }
            },
            title: {
                display: true,
                text: 'Maintenance Distribution by Month',
                font: { size: 18, weight: 'bold' },
                padding: 20
            }
        }
    };

    return (
        <div>
            <div className='flex flex-wrap gap-4 mb-4'>
                <div className='flex flex-col'>
                    <label className='text-sm font-semibold text-gray-600'>Vehicle ID (NWVehicleNo)</label>
                    <input
                        type="text"
                        className="border-2 rounded-lg h-10 px-3 border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                        value={vehicleId}
                        onChange={(e) => setVehicleId(e.target.value)}
                        placeholder="Enter Vehicle ID"
                    />
                </div>

                <div className='flex flex-col'>
                    <label className='text-sm font-semibold text-gray-600'>Year</label>
                    <select
                        className="border-1 rounded-lg h-10 border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        {availableYears.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='flex items-end'>
                    <button
                        onClick={fetchData}
                        className='bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-lg h-10'
                    >
                        Load Chart
                    </button>
                </div>
            </div>

            {fetched && chartData.labels ? (
                <Pie data={chartData} options={options} height={300} />
            ) : (
                <div className='flex-col justify-center items-center'>
                    <div className="flex justify-center items-center h-full text-green-500">
                        <TruckIcon className="w-24 h-24 md:w-[85%] md:h-[70%]" />
                    </div>
                        <div className="flex gap-2 justify-center items-center text-yellow-600">
                            <ExclamationTriangleIcon className='w-12 h-12 mt-4' />
                            <p className="mt-4 text-base font-semibold text-green-900">{errorMessage}</p>
                        </div>
                </div>
            )}
        </div>
    );
};

export default VehicleMaintenancePieChart;
