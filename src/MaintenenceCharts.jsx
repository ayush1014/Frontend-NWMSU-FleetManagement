import React, { useState, useEffect } from 'react';
import api from './Config/axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);


const MaintenanceChart = () => {
    const [chartData, setChartData] = useState({});
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [availableYears, setAvailableYears] = useState([]);

    useEffect(() => {
        const fetchYears = async () => {
            const result = await api.get('/maintenance/years');
            if (result?.data) {
                setAvailableYears(result.data.years); // years is now an array of {label, value}
                if (!result.data.years.some(y => y.value === selectedYear)) {
                    setSelectedYear(result.data.years[0]?.value);
                }
            }
        };
        fetchYears();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`/maintenance/yearly?year=${selectedYear}`);
            console.log('maintenence data', result.data)
            if (result && result.data) {
                const formattedData = result.data.map(data => {
                    const [year, month] = data.month.split('-');
                    const date = new Date(year, month - 1);
                    return { ...data, monthLabel: date.toLocaleDateString('default', { month: 'short', year: 'numeric' }) };
                });

                const labels = formattedData.map(d => d.monthLabel);
                const dataValues = formattedData.map(d => parseFloat(d.totalMaintenanceCost));
                const eventCounts = formattedData.map(d => parseInt(d.maintenanceCount));
                const metadata = formattedData.map(d => ({
                    total: parseFloat(d.totalMaintenanceCost),
                    count: parseInt(d.maintenanceCount)
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

                const shuffledColors = [...shades].sort(() => Math.random() - 0.5).slice(0, dataValues.length);

                setChartData({
                    labels,
                    datasets: [
                        {
                            type: 'bar',
                            label: 'Total Maintenance Cost ($)',
                            data: dataValues,
                            backgroundColor: shuffledColors,
                            borderColor: shuffledColors,
                            borderWidth: 1
                        },
                        {
                            type: 'line',
                            label: 'Maintenance Event Count',
                            data: eventCounts,
                            borderColor: '#0d47a1',
                            backgroundColor: 'rgba(13, 71, 161, 0.2)',
                            borderWidth: 2,
                            fill: false,
                            tension: 0.3,
                            yAxisID: 'y1'
                        }
                    ],
                    metadata
                });
            }
        };

        fetchData();
    }, [selectedYear]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    padding: 20,
                    font: { size: 14 }
                }
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem) {
                        const index = tooltipItem.dataIndex;
                        const datasetIndex = tooltipItem.datasetIndex;
                        const month = tooltipItem.label;
                        const data = chartData.metadata?.[index];
                        const count = data?.count || 0;
                        const total = data?.total?.toFixed(2) || '0.00';

                        if (datasetIndex === 0) {
                            return `Maintenance in ${month} cost $${total}`;
                        } else if (datasetIndex === 1) {
                            return `Maintenance occurred ${count} time(s) in ${month}`;
                        }
                        return '';
                    }
                },
                titleFont: {
                    size: 16,
                    weight: 'bold'
                },
                bodyFont: { size: 14 },
                backgroundColor: '#333',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 10
            },

            title: {
                display: true,
                text: 'Monthly Maintenance Costs',
                font: { size: 18, weight: 'bold' },
                padding: 20
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Cost in USD',
                    color: '#006400',
                    font: { size: 14, weight: 'bold' }
                },
                ticks: { precision: 0, color: '#006400' }
            },
            y1: {
                beginAtZero: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Maintenance Count',
                    color: '#0d47a1',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                ticks: {
                    precision: 0,
                    color: '#0d47a1'
                },
                grid: {
                    drawOnChartArea: false
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Month',
                    color: '#006400',
                    font: { size: 14, weight: 'bold' }
                },
                ticks: {
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0,
                    color: '#006400'
                }
            }
        },
        animation: {
            duration: 800,
            easing: 'easeOutCubic'
        }
    };

    return (
        <div>
            <div className='flex-col gap-4'>
                <div className='mt-2 text-sm font-semibold text-gray-600'>
                    Choose the <span className='text-base font-bold text-green-700'>fiscal year</span> you want to visualize for maintenance
                </div>
                <select
                    className="border-1 mt-4 rounded-lg h-10 border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700"
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
            {chartData.labels ? (
                <Bar data={chartData} options={options} height={325} />
            ) : (
                <p>No data to display</p>
            )}
        </div>
    );
};

export default MaintenanceChart;
