import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const socket = new SockJS('http://localhost:8080/ws');

const client = new Client({
    // brokerURL: 'ws://your-server-address/ws', // Replace with your WebSocket server URL
    webSocketFactory: () => socket, // Replace with your WebSocket server URL
    reconnectDelay: 5000, // Auto-reconnect if disconnected
    onConnect: () => {
        console.log('Connected to WebSocket');
    },
    onDisconnect: () => {
        console.log('Disconnected from WebSocket');
    },
    onStompError: (error) => {
        console.error('WebSocket STOMP error:', error);
    },
});

// Activate the WebSocket connection
client.activate();

/**
 * Stop (deactivate) the WebSocket connection.
 */
export const deactivateWebSocket = () => {
    if (client.active) {
        client.deactivate();
        console.log('WebSocket connection stopped');
    } else {
        console.warn('WebSocket is already inactive, bear.');
    }
};

/**
 * Subscribe to a specific topic and handle messages.
 * @param {string} topic - The topic to subscribe to (e.g., '/topic/ticketUpdates').
 * @param {function} callback - Function to handle incoming messages.
 */
export const subscribeToTopic = (topic, callback) => {
    if (!client){
        console.error("client not initialized");
        return;
    }
    console.log("reachd here")
    try{
        const interval = setInterval(() => {
            if (client.active) {
                console.log("client connected successfully!")
                try{
                    client.subscribe(topic, (message) => {
                        // console.log(message)
                        callback(JSON.parse(message.body));
                    });
                    clearInterval(interval);
                } catch (error) {
                    console.warn("error");
                }
            } else {
                console.warn('WebSocket connection is not established yet');
            }
        },5000); // check every 1000ms
    } catch (error){
        console.warn(error)
    }
};

export default client;
