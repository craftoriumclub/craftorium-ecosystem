import 'regenerator-runtime/runtime';
import {React, useState} from 'react';
import SignIn from './components/SignIn';
import MessageSigningForm from './components/MessageSigningForm';
import MessageVerificationForm from './components/MessageVerificationForm';

import './App.css';

const App = ({isSignedIn, wallet}) => {
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
                    <>
                        <MessageSigningForm />
                        <MessageVerificationForm />
                    </>
                )}



                <hr/>
            </main>
        </div>
    );

};

export default App;