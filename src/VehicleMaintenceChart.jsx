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
  BarElement
} from 'chart.js';
import { ExclamationTriangleIcon, WrenchScrewdriverIcon } from '@heroicons/react/20/solid';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title, BarElement);

const VehicleMaintenanceChart = () => {
  const [chartData, setChartData] = useState({});
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [availableYears, setAvailableYears] = useState([]);
  const [vehicleId, setVehicleId] = useState('');
  const [fetched, setFetched] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Please enter a Vehicle ID!');

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
      setErrorMessage('Please enter a Vehicle ID!');
      setFetched(false);
      return;
    }

    try {
      const result = await api.get(`/maintenance/vehicle/${vehicleId}?year=${selectedYear}`);
      const data = result.data;

      if (!data || data.length === 0) {
        const vehicleCheck = await api.get(`/vehiclesCheck/${vehicleId}`);
        if (!vehicleCheck?.data) {
          setErrorMessage(`Vehicle ID "${vehicleId}" is not valid.`);
        } else {
          setErrorMessage(`No maintenance done for "${vehicleId}" in fiscal year ${selectedYear}.`);
        }
        setFetched(false);
        setChartData({});
        return;
      }

      const formatted = data.map(d => {
        const [year, month] = d.month.split('-');
        const date = new Date(year, month - 1);
        return {
          ...d,
          monthLabel: date.toLocaleDateString('default', { month: 'short', year: 'numeric' })
        };
      });

      const labels = formatted.map(d => d.monthLabel);
      const metadata = formatted.map(d => ({
        total: parseFloat(d.totalMaintenanceCost),
        count: parseInt(d.maintenanceCount),
        month: d.monthLabel
      }));

      const shades = [
        '#0d47a1', '#1565c0', '#1976d2', '#1e88e5', '#2196f3',
        '#42a5f5', '#64b5f6', '#90caf9', '#bbdefb', '#e3f2fd',
        '#01579b', '#0288d1', '#03a9f4', '#29b6f6', '#4fc3f7',
        '#81d4fa', '#b3e5fc', '#e1f5fe',
        '#2962ff', '#2979ff', '#448aff', '#82b1ff', '#aab6fe',
        '#8c9eff', '#536dfe', '#3d5afe', '#304ffe',
        '#003c8f', '#002f6c', '#001f3f', '#1a237e', '#283593'
    ];
    
      const shuffledColors = [...shades].sort(() => Math.random() - 0.5).slice(0, labels.length);

      setChartData({
        labels,
        datasets: [
          {
            type: 'bar',
            label: 'Maintenance Cost ($)',
            data: metadata.map(m => m.total),
            backgroundColor: shuffledColors,
            borderColor: shuffledColors,
            borderWidth: 1
          },
          {
            type: 'line',
            label: 'Maintenance Count',
            data: metadata.map(m => m.count),
            borderColor: '#1e88e5',
            backgroundColor: '#1e88e5',
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
    } catch (err) {
      console.error(err);
      setErrorMessage(`Vehicle ID "${vehicleId}" is not valid.`);
      setFetched(false);
      setChartData({});
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Maintenance Cost by Month',
        font: { size: 18 }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const total = chartData.metadata?.[index]?.total ?? 0;
            const count = chartData.metadata?.[index]?.count ?? 0;
            return ` $${total.toFixed(2)} | ${count} event(s)`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, 
          text: 'Maintenance Cost ($)', 
          color: '#006400',
          font: {
              size: 14,
              weight: 'bold',
          }}
      },
      x: {
        title: { display: true, 
          text: 'Month' , 
          color: '#006400',
          font: {
              size: 14,
              weight: 'bold',
          }}, 
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 0,
          color: '#006400'
      }
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
              <option key={option.value} value={option.value}>{option.label}</option>
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
            <WrenchScrewdriverIcon className="w-24 h-24 md:w-[65%] md:h-[65%] py-16" />
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

export default VehicleMaintenanceChart;