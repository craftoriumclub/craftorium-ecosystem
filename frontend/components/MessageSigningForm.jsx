// src/components/MessageSigningForm.jsx
import React, { useState } from 'react';

const MessageSigningForm = () => {
    const [privateKey, setPrivateKey] = useState('');
    const [message, setMessage] = useState('');
    const [signedMessage, setSignedMessage] = useState('');

    const handleSignMessage = () => {
        const mockSignature = "MockedSignatureHash";
        setSignedMessage(mockSignature);
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
        </div>
    );
};

export default MessageSigningForm;
