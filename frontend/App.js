import 'regenerator-runtime/runtime';
import {React, useState} from 'react';
import SignIn from './components/SignIn';

import './App.css';

const App = ({isSignedIn, wallet}) => {

    const [message, setMessage] = useState('');
    const [signatureResult, setSignatureResult] = useState(null);

    const signMessage = async () => {
        const result = await wallet.signMessage(message);
        setSignatureResult(result);
    };


    const signIn = () => {
        wallet.signIn()
    }

    const signOut = () => {
        wallet.signOut()
    }

    return (
        <div className="app-container">
            <main>
                <h1>Craftorium Exchange</h1>
                {isSignedIn
                    ? (
                        <>
                            <button onClick={signOut} className="button">>Log out</button>
                            <p>You are signed in as {wallet.getAccountId()}</p>

                        </>

                    )
                    : (
                        <>
                            <button onClick={signIn} className="button">Log in</button>
                            <SignIn/>
                        </>
                    )

                }

                {isSignedIn && (
                    <div>
                        <h2>Sign a Message</h2>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter a message to sign"
                        ></textarea>
                        <button className="button" onClick={signMessage}>Sign Message</button>
                        {signatureResult && (
                            <div>
                                <p>Signature: {signatureResult.signature}</p>
                                <p>Public Key: {signatureResult.publicKey}</p>
                            </div>
                        )}
                    </div>
                )}

                <hr/>
            </main>
        </div>
    );

};

export default App;