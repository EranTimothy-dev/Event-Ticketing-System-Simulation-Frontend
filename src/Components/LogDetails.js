import React, { useState, useEffect } from 'react';
import { subscribeToTopic } from '../Utils/websocket'; // Import the shared WebSocket connection
import './LogDetails.css';

export default function LogDetails() {
    const [logDetails, setLogDetails] = useState([]);

    useEffect(() => {
        // Subscribe to WebSocket topic
        subscribeToTopic('/topic/tickets', (message) => {
            const messageBody = JSON.stringify(message);
            const correctedString = formatLogs(messageBody);
            // console.log(messageBody)
            setLogDetails((prevLogs) => [...prevLogs, correctedString]);
        });
    }, []);

    function formatLogs(logs) {
        let correctedString = logs.replace(/\\n/g, '"');
        return correctedString;
    }

    return (
        <div className="log-details-container">
            <h2>Log Details</h2>
            <div className="log-details-box">
                <ul>
                    {logDetails.map((log, index) => (
                        <li key={index}>{log}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
