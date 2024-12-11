import React from 'react';
import Button from 'react-bootstrap/Button';
import { deactivateWebSocket } from '../Utils/websocket'; // Import the stop function
import './ControlStop.css';

export default function ControlStop() {
    const handleStop = () => {
        deactivateWebSocket(); // Stop the WebSocket connection
    };

    return (
        <div className="btoon">
            <Button variant="danger" onClick={handleStop}>
                Stop
            </Button>
        </div>
    );
}
