
// src/components/ContractInteraction.js

import React, { useState } from 'react';
import server from '../services/stellarService';
import {getAllCommunities} from '../services/sorobanService';
import { log } from 'console';
// import { invokeContractFunction } from '../services/sorobanService';
// import { Wallets } from '@stellar/wallet-sdk'; // Wallet SDK to connect to Stellar wallet




export default function ContractInteraction()  {
  const [allCommunities,setAllCommunities] = useState();
  async function connectWallet(){
    const allComm = await getAllCommunities();
    setAllCommunities(allComm);
    console.log(typeof(allComm));
    
  };
  return (
    <div>
    <button onClick={connectWallet}>button</button>
    </div>
  );
}
