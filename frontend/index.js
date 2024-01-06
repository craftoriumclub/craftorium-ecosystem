// React
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// NEAR
import { Wallet } from './near-wallet';

// When creating the wallet you can choose to create an access key, so the user
// can skip signing non-payable methods when talking wth the  contract
const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME })
// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp()
 
  ReactDOM.render(
    <App isSignedIn={isSignedIn} wallet={wallet} />,
    document.getElementById('root')
  );
}