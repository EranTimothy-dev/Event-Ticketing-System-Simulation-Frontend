
// import React, { useState, useEffect } from 'react';
// import { subscribeToTopic } from '../Utils/websocket'; // Import the shared WebSocket connection
// import './LogDetails.css';

// export default function LogDetails() {
//     const [logDetails, setLogDetails] = useState([]);

//     useEffect(() => {
//         const unsubscribe = subscribeToTopic('logDetails', (message) => {
//             setLogDetails(message.body);
//         });

//         // return () => {
//         //     unsubscribe();
//         // };
//     }, []);

//     return (
//         <div className="log-details-container">
//             <h2>Log Details</h2>
//             {logDetails.map((logDetails, index) => (
//                 <p key={index}>{logDetails}</p>
//             ))}
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import { subscribeToTopic } from '../Utils/websocket'; // Import the shared WebSocket connection
import './LogDetails.css';

export default function LogDetails() {
    const [logDetails, setLogDetails] = useState([]);

    // subscribeToTopic('logDetails', (message) => {
    //     const messageBody = JSON.parse(message.body);
    //     setLogDetails((prevLogs) => [...prevLogs, messageBody]);
    // });
    useEffect(() => {
        // Subscribe to WebSocket topic
        subscribeToTopic('/topic/tickets', (message) => {
            const messageBody = JSON.stringify(message);
            console.log(messageBody)
            setLogDetails((prevLogs) => [...prevLogs, messageBody]);
        });
    }, []);

    return (
        <div className="log-details-container">
            <h2>Log Details</h2>
            <div className="log-details-box">
                <ul>
                    {logDetails.map((log, index) => (
                        <li key={index}>{JSON.stringify(log)}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
