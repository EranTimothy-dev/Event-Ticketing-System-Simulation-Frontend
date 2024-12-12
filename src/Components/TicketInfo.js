import React, { useState, useEffect } from 'react';
import { subscribeToTopic } from '../Utils/websocket'; // Import the shared WebSocket connection
import './TicketInfo.css';
import client from '../Utils/websocket';

export default function TicketInfo() {
    // State to hold ticket information
    const [ticketInfo, setTicketInfo] = useState({
        totalTicketsReleased: 0,
        availableTickets: 0,
        totalTicketsSold: 0,
    });

    // Subscribe to WebSocket updates
    useEffect(() => {
        client.activate();
        subscribeToTopic('/topic/tickets', (data) => {
            setTicketInfo({
                totalTicketsReleased: data.totalTicketsReleased,
                availableTickets: data.availableTickets,
                totalTicketsSold: data.totalTicketsSold,
            });
        });
    }, []);


    return (
        <div className="tick">
            <h3>TICKETS INFORMATION</h3>
            <p className="bordered">
                Released Tickets: <br />
                <br />
                {ticketInfo.totalTicketsReleased}
            </p>
            <p className="bordered">
                Available Tickets: <br />
                <br />
                {ticketInfo.availableTickets}
            </p>
            <p className="bordered">
                Purchased Tickets: <br />
                <br />
                {ticketInfo.totalTicketsSold}
            </p>
        </div>
    );
}