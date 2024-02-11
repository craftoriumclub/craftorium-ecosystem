// src/components/MessageVerificationForm.jsx
import React, { useState } from 'react';

const MessageVerificationForm = () => {
    const [publicKey, setPublicKey] = useState('');
    const [message, setMessage] = useState('');
    const [signature, setSignature] = useState('');
    const [isVerified, setIsVerified] = useState(null);

    const handleVerifyMessage = () => {
        const mockVerificationResult = true;
        setIsVerified(mockVerificationResult);
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
            {isVerified !== null && <div className="results-container">Verification Result: {isVerified ? 'Valid' : 'Invalid'}</div>}
        </div>
    );
};

export default MessageVerificationForm;
