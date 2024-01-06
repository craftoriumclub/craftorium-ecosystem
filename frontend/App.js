import 'regenerator-runtime/runtime';
import React from 'react';
import SignIn from './components/SignIn';

import './App.css';


const App = ({isSignedIn, wallet}) => {
    const signIn = () => {
        wallet.signIn()
    }

    const signOut = () => {
        wallet.signOut()
    }

    return (
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

            <hr/>
        </main>
    );
};

export default App;