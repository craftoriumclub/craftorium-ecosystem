import React, {useState, useEffect} from 'react';

const MessageSigningForm = () => {
    const [privateKeyWIF, setPrivateKeyWIF] = useState('');
    const [publicKey, setPublicKey] = useState('');
    const [messageText, setMessageText] = useState('');
    const [signedMessage, setSignedMessage] = useState('');
    const [error, setError] = useState('');


    const handleCopyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert('Signature copied to clipboard!'))
            .catch(err => console.error('Error copying signature:', err));
    };

    let API;
    switch (process.env.ENVIRONMENT) {
        case "dev".toString() :
            API = "http://localhost:3001".toString();
            break;
        case "prod".toString() :
            API = "https://ibbclub.org/eco-server".toString();
            break;
    }


    const handleSignMessage = async (e) => {
        e.preventDefault();
        setError('');
        setSignedMessage('');

        console.log(`${API}/sign`);

        try {
            const response = await fetch(`${API}/sign`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({publicKey, privateKeyWIF, messageText}),
            });

            if (!response.ok) {
                const errorMsg = await response.text();
                throw new Error(errorMsg || 'Network response was not ok');
            }

            const data = await response.json();
            setSignedMessage(data.signature);
        } catch (error) {
            setError(`Error: ${error.message}`);
            console.error('Error:', error);
        }
    };


    return (
        <div className="form-container">
            <form onSubmit={handleSignMessage}>
                <div>
                    <input
                        type="text"
                        value={publicKey}
                        onChange={(e) => setPublicKey(e.target.value)}
                        placeholder="Enter your Public Key"
                        className="input"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={privateKeyWIF}
                        onChange={(e) => setPrivateKeyWIF(e.target.value)}
                        placeholder="Enter your Private Key (WIF)"
                        className="input"
                    />
                </div>
                <div>

                        <textarea
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder="Enter your message"
                            className="input"
                        />

                </div>
                <button type="submit" className="button">Sign Message</button>
            </form>
            {signedMessage && (
                <div className="signed-message" onClick={() => handleCopyToClipboard(signedMessage)}>
                    <strong>Signed Message (click to copy):</strong>
                    <span className="signature">{signedMessage}</span>
                </div>
            )}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default MessageSigningForm;
