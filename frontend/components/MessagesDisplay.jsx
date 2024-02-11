// src/components/MessagesDisplay.jsx
import React, { useState, useEffect } from 'react';

const MessagesDisplay = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('http://localhost:3001/messages');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                setError('Error fetching messages');
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div className="messages-display">
            <h2>Signed Messages</h2>
            {messages.map((msg, index) => (
                <div key={index} className="message">
                    <p><strong>Message:</strong> {msg.message}</p>
                    <p><strong>Signature:</strong> {msg.signature}</p>
                    <p><strong>Timestamp:</strong> {msg.timestamp}</p>
                </div>
            ))}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default MessagesDisplay;
