// src/components/MessageSigningForm.jsx
import React, { useState } from 'react';

const MessageSigningForm = () => {
    const [privateKey, setPrivateKey] = useState('');
    const [message, setMessage] = useState('');
    const [signedMessage, setSignedMessage] = useState('');
    const [error, setError] = useState('');

    const handleSignMessage = async () => {
        try {
            const response = await fetch('http://localhost:3001/sign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ privateKey, message }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setSignedMessage(data.signature);
            setError('');
        } catch (error) {
            setError('Error signing message');
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Sign a Message</h2>
            <input
                className="input"
                type="text"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="Private Key"
            />
            <textarea
                className="input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
            />
            <button className="button" onClick={handleSignMessage}>Sign Message</button>
            {signedMessage && <div className="results-container"><strong>Signed Message:</strong> {signedMessage}</div>}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default MessageSigningForm;
