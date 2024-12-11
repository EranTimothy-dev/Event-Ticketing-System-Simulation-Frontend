import React, { useState, useEffect } from 'react';
import { subscribeToTopic } from '../Utils/websocket'; // Import the shared WebSocket connection
import './TicketInfo.css';

export default function TicketInfo() {
    // State to hold ticket information
    const [ticketInfo, setTicketInfo] = useState({
        releasedTickets: 0,
        availableTickets: 0,
        purchasedTickets: 0,
    });

    // Subscribe to WebSocket updates
    useEffect(() => {
        subscribeToTopic('/topic/ticketUpdates', (data) => {
            setTicketInfo({
                releasedTickets: data.releasedTickets,
                availableTickets: data.availableTickets,
                purchasedTickets: data.purchasedTickets,
            });
        });
    }, []);

    return (
        <div className="tick">
            <h3>TICKETS INFORMATION</h3>
            <p className="bordered">
                Released Tickets: <br />
                <br />
                {ticketInfo.releasedTickets}
            </p>
            <p className="bordered">
                Available Tickets: <br />
                <br />
                {ticketInfo.availableTickets}
            </p>
            <p className="bordered">
                Purchased Tickets: <br />
                <br />
                {ticketInfo.purchasedTickets}
            </p>
        </div>
    );
}