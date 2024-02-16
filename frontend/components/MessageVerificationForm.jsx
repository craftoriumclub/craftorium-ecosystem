// src/components/MessageVerificationForm.jsx
import React, {useState} from 'react';

const MessageVerificationForm = () => {
    const [publicKey, setPublicKey] = useState('');
    const [messageText, setMessageText] = useState('');
    const [signature, setSignature] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);
    const [error, setError] = useState('');

    let API;
    switch (process.env.ENVIRONMENT) {
        case "dev".toString() :
            API = "http://localhost:3001".toString();
            break;
        case "prod".toString() :
            API = "https://ibbclub.org/eco-server".toString();
            break;
    }

    const handleVerifyMessage = async () => {
        try {
            const response = await fetch(`${API}/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({publicKey, messageText, signature}),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setVerificationResult(data.verified);
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
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Enter your message"
                className="input"
            />


            <input
                className="input"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Signature"
            />
            <button className="button" onClick={handleVerifyMessage}>Verify Message</button>
            {verificationResult !== null && (
                <div className={`verification-result ${verificationResult ? 'valid' : 'invalid'}`}>
                    {verificationResult ? 'Valid' : 'Invalid'}
                </div>
            )}
        </div>
    );
};

export default MessageVerificationForm;
