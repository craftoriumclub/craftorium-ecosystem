import React, {useState, useEffect} from 'react';

const DisplayMessages = () => {
    const [messages, setMessages] = useState([]);

    let API;
    switch (process.env.ENVIRONMENT) {
        case "dev".toString() :
            API = "http://localhost:3001".toString();
            break;
        case "prod".toString() :
            API = "https://ibbclub.org/eco-server".toString();
            break;
    }


    useEffect(() => {
        // Fetch messages from the backend
        fetch(`${API}/messages`)
            .then(response => response.json())
            .then(data => setMessages(data))
            .catch(err => console.error('Error fetching messages:', err));
    }, []);

    return (
        <div className="messages-list">
            <h3>Craftorium.Волевиявлення</h3>
            {messages.map((msg, index) => (
                <div key={index} className="message-item">
                    <p><strong>Public Key:</strong> {msg.publicKey}</p>
                    <p><strong>Message:</strong> {msg.message}</p>
                    <p><strong>Signature:</strong> {msg.signature}</p>
                    <p><strong>Timestamp:</strong> {msg.timestamp}</p>
                </div>
            ))}
        </div>
    );
};

export default DisplayMessages;
