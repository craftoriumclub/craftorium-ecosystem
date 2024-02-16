import 'regenerator-runtime/runtime';
import {React, useState} from 'react';
import SignIn from './components/SignIn';
import MessageSigningForm from './components/MessageSigningForm';
import MessageVerificationForm from './components/MessageVerificationForm';
import MessagesDisplay from './components/MessagesDisplay';
require('dotenv').config()

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

                <small>You are running this application in <b>{process.env.ENVIRONMENT}</b> mode.</small>

                <h1>Craftorium Ecosystem</h1>
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
                        <MessagesDisplay />
                    </>
                )}



                <hr/>
            </main>
        </div>
    );

};

export default App;