import 'regenerator-runtime/runtime';
import React from 'react';
import SignIn from './components/SignIn';
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
                        <p>You are signed in as {wallet.getAccountId()}</p>
                        <button onClick={signOut}>Log out</button>
                    </>
                )
                : (
                    <>
                        <p>You are not signed in</p>
                        <button onClick={signIn}>Log in</button>
                        <SignIn/>
                    </>
                )
            }

            <hr/>
        </main>
    );
};

export default App;