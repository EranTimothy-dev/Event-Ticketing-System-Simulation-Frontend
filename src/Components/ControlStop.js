import React from 'react';
import Button from 'react-bootstrap/Button';
import { deactivateWebSocket } from '../Utils/websocket'; // Import the stop function
import './ControlStop.css';
import { Card, Form } from 'react-bootstrap';
import axios from 'axios';

export default function ControlStop() {
    const handleStop = async () => {
        try{
            deactivateWebSocket(); // Stop the WebSocket connection
            const stopSystem = await axios.post('http://localhost:8080/ticketingSystem/stop-system');
            if (stopSystem.status === 200){
                alert("System Paused Successfully!");
                console.log("Backend has been stopped.");
            }
        } catch (error){
            alert("Something Went Wrong!");
            console.error("Could not stop backend");
        }
    };

    return (
        <div className="btoon">
            <Form>
                <Card>
                    <Button variant="danger" onClick={handleStop}>
                        Stop
                    </Button>
                </Card>
            </Form>
            </div>
        );
}
