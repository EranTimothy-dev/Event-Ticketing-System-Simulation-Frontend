import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import "./Configuration.css";
import client from '../Utils/websocket';

export default function Configuration() {
    // State to hold form data
    const [formData, setFormData] = useState({
        configId: "1",
        numberOfTickets: '',
        ticketReleaseRate: '',
        customerRetrievalRate: '',
        maxTicketCapacity: '',
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.post('http://localhost:8080/systemConfigurations/addConfigurations', formData);
            const startSystem = await axios.post('http://localhost:8080/ticketingSystem/start-system');
            if (response.status === 200 && startSystem.status === 200) {
                alert('Configuration submitted successfully!');
                console.log(response.data);
            }
            if (!client.active){
                client.activate();
            }
        } catch (error) {
            console.error('Error submitting configuration:', error);
            alert('An error occurred. Please try again.');
        }
    };

    // Handle reset form
    const handleReset = () => {
        setFormData({
            // configId: "1",
            numberOfTickets: '',
            ticketReleaseRate: '',
            customerRetrievalRate: '',
            maxTicketCapacity: '',
        });
        // document.getElementById('totalTicketCount').focus(); // Focus on the first input
    };

    return (
        <div className='page'>
            <h1>WELCOME TO THE EVENT TICKETING SYSTEM</h1>

            <div className='name'>
                <Form onSubmit={handleSubmit}>
                    <h3>CONFIGURATION FORM</h3>
                    <br />
                    <Card 
                        className="card" 
                        style={{ width: '35rem', height: '30rem', padding: '20px' }}
                    >
                        <br />

                        <Form.Group className="mb-3" controlId="numberOfTickets">
                            <Form.Label>Total Ticket Count:</Form.Label>
                            <Form.Control 
                                className="label" 
                                type="number" 
                                name="numberOfTickets"
                                placeholder="Enter total ticket count"
                                value={formData.numberOfTickets}
                                onChange={handleInputChange}
                                required
                                min={0}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ticketReleaseRate">
                            <Form.Label>Ticket Release Rate:</Form.Label>
                            <Form.Control 
                                className="label" 
                                type="number" 
                                name="ticketReleaseRate"
                                placeholder="Enter ticket release rate"
                                value={formData.ticketReleaseRate}
                                onChange={handleInputChange}
                                required
                                min={0}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="customerRetrievalRate">
                            <Form.Label>Customer Retrieval Rate:</Form.Label>
                            <Form.Control 
                                className="label" 
                                type="number" 
                                name="customerRetrievalRate"
                                placeholder="Enter customer retrieval rate" 
                                value={formData.customerRetrievalRate}
                                onChange={handleInputChange}
                                required
                                min={0}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="maxTicketCapacity">
                            <Form.Label>Maximum Ticket Capacity:</Form.Label>
                            <Form.Control 
                                className="label" 
                                type="number" 
                                name="maxTicketCapacity"
                                placeholder="Enter max ticket capacity"
                                value={formData.maxTicketCapacity}
                                onChange={handleInputChange}
                                required
                                min={0}
                            />
                        </Form.Group>

                        <div className='bton'>
                            <Button 
                                variant="primary" 
                                type="submit"
                            >
                                Start
                            </Button>
                            <Button 
                                variant="secondary" 
                                type="button" 
                                onClick={handleReset}
                            >
                                Reset
                            </Button>
                        </div>
                    </Card>
                </Form>
            </div>
        </div>
    );
}
