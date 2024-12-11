import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { subscribeToTopic } from '../Utils/websocket'; // Ensure this function is properly implemented
import './TicketChart.css';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Legend,
    Title,
    Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Title, Tooltip);

export default function TicketChart() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Sale Ticket Count',
                data: [],
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderWidth: 2,
                tension: 0.3,
            },
        ],
    });

    useEffect(() => {
        const unsubscribe = subscribeToTopic('/topic/ticketUpdates', (data) => {
            console.log('Received data:', data); // Debug incoming data
            const { time, ticketsBought } = data;

            // Only update state if data is valid
            if (time && typeof ticketsBought === 'number') {
                setChartData((prevData) => ({
                    labels: [...prevData.labels, time],
                    datasets: [
                        {
                            ...prevData.datasets[0],
                            data: [...prevData.datasets[0].data, ticketsBought],
                        },
                    ],
                }));
            }
        });

        return () => {
            if (unsubscribe) unsubscribe(); // Ensure WebSocket is unsubscribed
        };
    }, []);

    return (
        <div className="chart-container">
            <h3 className="chart-title">SALE TICKET COUNT OVER TIME</h3>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                        },
                    },
                    scales: {
                        x: {
                            title: { display: true, text: 'Time' },
                            ticks: { maxRotation: 45, minRotation: 45 },
                        },
                        y: {
                            title: { display: true, text: 'Tickets Bought' },
                            beginAtZero: true,
                        },
                    },
                }}
            />
        </div>
    );
}
