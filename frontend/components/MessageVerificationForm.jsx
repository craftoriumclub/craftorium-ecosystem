// src/components/MessageVerificationForm.jsx
import React, { useState } from 'react';

const MessageVerificationForm = () => {
    const [publicKey, setPublicKey] = useState('');
    const [message, setMessage] = useState('');
    const [signature, setSignature] = useState('');
    const [verificationResult, setVerificationResult] = useState('');
    const [error, setError] = useState('');

    const handleVerifyMessage = async () => {
        try {
            const response = await fetch('http://localhost:3001/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address: publicKey, message, signature }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setVerificationResult(data.verified ? 'Valid' : 'Invalid');
            setError('');
        } catch (error) {
            setError('Error verifying message');
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Verify a Message</h2>
            <input
                className="input"
                type="text"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                placeholder="Public Key"
            />
            <textarea
                className="input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
            />
            <textarea
                className="input"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Signature"
            />
            <button className="button" onClick={handleVerifyMessage}>Verify Message</button>
            {verificationResult && <div className="results-container">Verification Result: {verificationResult}</div>}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default MessageVerificationForm;
