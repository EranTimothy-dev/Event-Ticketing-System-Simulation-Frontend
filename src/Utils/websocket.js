import { Client } from '@stomp/stompjs';

const client = new Client({
    brokerURL: 'ws://your-server-address/ws', // Replace with your WebSocket server URL
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
    if (client.connected) {
        client.subscribe(topic, (message) => {
            callback(JSON.parse(message.body));
        });
    } else {
        console.warn('WebSocket connection is not established yet');
    }
};

export default client;
