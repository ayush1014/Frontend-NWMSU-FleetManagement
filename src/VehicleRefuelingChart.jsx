import React, { useState, useEffect } from 'react';
import api from './Config/axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title);

import { ExclamationTriangleIcon, TruckIcon } from '@heroicons/react/20/solid';
import { FaGasPump } from 'react-icons/fa';

const VehicleRefuelingChart = () => {
    const [chartData, setChartData] = useState({});
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [availableYears, setAvailableYears] = useState([]);
    const [vehicleId, setVehicleId] = useState('');
    const [fetched, setFetched] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Please enter a Vehicle ID !');

    useEffect(() => {
        const fetchYears = async () => {
            const result = await api.get('/refueling/years');
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
            setErrorMessage('Please enter a Vehicle ID.');
            setFetched(false);
            setChartData({});
            return;
        }

        try {
            const result = await api.get(`/refueling/vehicle/${vehicleId}?year=${selectedYear}`);
            const data = result.data;

            if (!data || data.length === 0) {
                const vehicleCheck = await api.get(`/vehiclesCheck/${vehicleId}`);
                console.log('vehicle check status: ', vehicleCheck)

                if (!vehicleCheck?.data) {
                    setErrorMessage(`Vehicle ID "${vehicleId}" is not valid.`);
                } else {
                    setErrorMessage(`No refueling has been done on "${vehicleId}" in the fiscal year ${availableYears.find(y => y.value === selectedYear)?.label || selectedYear}.`);
                }

                setChartData({});
                setFetched(false);
                return;
            }
            

            const formattedData = data.map(d => {
                const [year, month] = d.month.split('-');
                const date = new Date(year, month - 1);
                return {
                    ...d,
                    monthLabel: date.toLocaleDateString('default', { month: 'short', year: 'numeric' })
                };
            });

            const labels = formattedData.map(d => d.monthLabel);
            const dataValues = formattedData.map(d => parseFloat(d.totalFuelCost));
            const metadata = formattedData.map(d => ({
                total: parseFloat(d.totalFuelCost),
                count: parseInt(d.refuelingsCount),
                month: d.monthLabel
            }));

            const shades = [
                '#004d40', '#00695c', '#00796b', '#00897b', '#009688',
                '#1b5e20', '#2e7d32', '#33691e', '#388e3c', '#43a047',
                '#4caf50', '#558b2f', '#64dd17', '#66bb6a', '#689f38',
                '#76d275', '#81c784', '#8bc34a', '#9ccc65', '#a5d6a7',
                '#aed581', '#b2dfdb', '#c5e1a5', '#c8e6c9', '#dcedc8'
            ];

            const shuffledColors = [...shades].sort(() => Math.random() - 0.5).slice(0, dataValues.length);

            setChartData({
                labels,
                datasets: [
                    {
                      type: 'bar',
                      label: 'Refueling Cost ($)',
                      data: metadata.map(m => m.total),
                      backgroundColor: shuffledColors,
                      borderColor: shuffledColors,
                      borderWidth: 1
                    },
                    {
                      type: 'line',
                      label: 'Refueling Count',
                      data: metadata.map(m => m.count),
                      borderColor: shuffledColors,
                      backgroundColor: shuffledColors,
                      fill: false,
                      tension: 0.3,
                      pointRadius: 5,
                      pointHoverRadius: 7
                    }
                  ],

                metadata
            });

            setErrorMessage('');
            setFetched(true);
        } catch (error) {
            console.error('Fetch error:', error);
            setErrorMessage(`"${vehicleId}" is not a valid NWVehicle ID.`);
            setFetched(false);
            setChartData({});
        }
    };

    const options = {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: function (context) {
                const index = context.dataIndex;
                const value = chartData.metadata?.[index]?.total || 0;
                const count = chartData.metadata?.[index]?.count || 0;
                return ` $${value.toFixed(2)} | ${count} refill(s)`;
              }
            }
          },
          title: {
            display: true,
            text: 'Refueling Cost by Month',
            font: { size: 18 }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Fuel Cost ($)' }
          },
          x: {
            title: { display: true, text: 'Month' }
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
                <Line data={chartData} options={options} height={300} />
            ) : (
                <div className='flex-col justify-center items-center'>
                    <div className="flex justify-center items-center h-full text-green-500">
                        <FaGasPump className="w-24 h-24 md:w-[65%] md:h-[65%] py-16" />
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

export default VehicleRefuelingChart;
