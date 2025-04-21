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
    LineController, 
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    LineController, 
    PointElement,
    Title,
    Tooltip,
    Legend
  );
  
const RefuelingChart = ({onLoad}) => {
    const [chartData, setChartData] = useState({});
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [availableYears, setAvailableYears] = useState([]);

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
        fetchYears().then(() => {
            onLoad?.();
        });;
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`/refueling/yearly?year=${selectedYear}`);
            if (result && result.data) {
                console.log('Refueling Data: ', result.data);
                const formattedData = result.data.map(data => {
                    const [year, month] = data.month.split('-');
                    const date = new Date(year, month - 1);
                    return { ...data, monthLabel: date.toLocaleDateString('default', { month: 'short', year: 'numeric' }) };
                });
                const aggregated = {};
                formattedData.forEach(item => {
                    if (!aggregated[item.monthLabel]) {
                        aggregated[item.monthLabel] = { total: 0, count: 0 };
                    }
                    aggregated[item.monthLabel].total += parseFloat(item.totalFuelCost);
                    aggregated[item.monthLabel].count += 1;
                });

                const labels = formattedData.map(data => {
                    const [year, month] = data.month.split('-');
                    const date = new Date(year, month - 1);
                    return date.toLocaleDateString('default', { month: 'short', year: 'numeric' });
                });

                const dataValues = formattedData.map(data => parseFloat(data.totalFuelCost));
                const refuelCounts = formattedData.map(data => parseInt(data.refuelingsCount));
                const metadata = formattedData.map(data => ({
                    total: parseFloat(data.totalFuelCost),
                    count: parseInt(data.refuelingsCount)
                }));

                const shades = [
                    '#004d40', '#00695c', '#00796b', '#00897b', '#009688',
                    '#1b5e20', '#2e7d32', '#33691e', '#388e3c', '#43a047',
                    '#4caf50', '#558b2f', '#64dd17', '#66bb6a', '#689f38',
                    '#76d275', '#81c784', '#8bc34a', '#9ccc65', '#a5d6a7',
                    '#aed581', '#b2dfdb', '#c5e1a5', '#c8e6c9', '#dcedc8',
                    '#e0f2f1', '#e6ee9c', '#f1f8e9', '#f0f4c3'
                ];

                const shuffledColors = [...shades].sort(() => Math.random() - 0.5).slice(0, dataValues.length);

                setChartData({
                    labels,
                    datasets: [
                        {
                            type: 'bar',
                            label: 'Total Refueling Cost ($)',
                            data: dataValues,
                            backgroundColor: shuffledColors,
                            borderColor: shuffledColors,
                            borderWidth: 1
                        },
                        {
                            type: 'line',
                            label: 'Refueling Events Count',
                            data: refuelCounts,
                            borderColor: '#004d40',
                            backgroundColor: 'rgba(0, 77, 64, 0.2)',
                            borderWidth: 2,
                            fill: false,
                            tension: 0.3,
                            yAxisID: 'y1',
                        }
                    ],
                    refuelingsCount: refuelCounts,
                    metadata: metadata
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
                    font: {
                        size: 14
                    }
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
                        const metadata = chartData.metadata?.[index];
                        const count = metadata?.count || 0;
                        const total = metadata?.total?.toFixed(2) || '0.00';

                        if (datasetIndex === 0) {
                            return `Refueled in ${month} for $${total}`;
                        } else if (datasetIndex === 1) {
                            return `Refueled ${count} time(s) in ${month}`;
                        }

                        return '';
                    }
                },
                titleFont: {
                    size: 16,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 14
                },
                backgroundColor: '#333',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 10
            },
            title: {
                display: true,
                text: `Monthly Refueling Costs`,
                font: {
                    size: 18,
                    weight: 'bold'
                },
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
                    font: {
                        size: 14,
                        weight: 'bold',
                    }
                },
                ticks: {
                    precision: 0,
                    color: '#006400',
                },
                stacked: true
            },
            y1: {
                beginAtZero: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Refueling Count',
                    color: '#004d40',
                    font: {
                        size: 14,
                        weight: 'bold',
                    }
                },
                ticks: {
                    precision: 0,
                    color: '#004d40'
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
                    font: {
                        size: 14,
                        weight: 'bold',
                    }
                },
                ticks: {
                    autoSkip: false,
                    maxRotation: 45, 
                    minRotation: 0,
                    color: '#006400'
                },
                stacked: true
            }
        },

        animation: {
            duration: 800,
            easing: 'easeOutCubic'
        }
    };

    const handleYearChange = (event) => {
        const year = Number(event.target.value);
        setSelectedYear(year);
    };

    return (
        <div>
            <div className='flex-col gap-4'>
                <div className='mt-2 text-sm font-semibold text-gray-600'>Choose the <span className='text-base font-bold text-green-700'>fiscal year</span> you want to visualize for refueling</div>
                <select
                    className="border-1 rounded-lg h-10 mt-4 border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700"
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

export default RefuelingChart;
