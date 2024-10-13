import { useEffect, useState } from 'react';
import freighterApi from "@stellar/freighter-api";
import {
    isConnected,
    getAddress,
    signAuthEntry,
    signTransaction,isAllowed,
    setAllowed,
  } from "@stellar/freighter-api";


declare let window: any;


export default function FreighterPage() {
  const [publicKey, setPublicKey] = useState(null);
  const [balance, setBalance] = useState(null);

 async function connectWallet(){
    const isAppConnected = await isConnected();
  
    if (isAppConnected.isConnected) {
        const isAppAllowed = await isAllowed();

        if (isAppAllowed.isAllowed) {
          alert("User has allowed your app!");
        } else{
            const isAppAllowed = await setAllowed();
        }
    }
 }
//   useEffect(() => {
//     const connectFreighter = async () => {

//       if (typeof window !== 'undefined' && window.freighterApi) {
//         try {
//           const key = await window.freighterApi.getPublicKey();
//           setPublicKey(key);
//           const response = await fetch(`https://horizon.stellar.org/accounts/${key}`);
//           const account = await response.json();
//           const balance = account.balances.find(b => b.asset_type === 'native');
//           setBalance(balance ? balance.balance : '0');
//         } catch (error) {
//           console.error('Error connecting to Freighter or fetching account:', error);
//         }
//       } else {
//         console.error('Freighter extension not detected');
//       }
//     };

//     connectFreighter();
//   }, []);

  return (
    <div>
        <button onClick={connectWallet}>connect</button>
      <h1>Freighter Wallet Integration</h1>
      {publicKey ? (
        <div>
          <p>Public Key: {publicKey}</p>
          <p>Balance: {balance !== null ? balance : 'Loading...'} XLM</p>
        </div>
      ) : (
        <p>Connecting to Freighter...</p>
    )}
  </div>
);
}