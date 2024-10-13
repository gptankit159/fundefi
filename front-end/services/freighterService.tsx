import freighterApi from "@stellar/freighter-api";
import {
    isConnected,
    getAddress,
    signAuthEntry,
    signTransaction,isAllowed,
    setAllowed,
  } from "@stellar/freighter-api";


declare let window: any;


export default function FreighterLogin() {
  let publicKey=null;
  let balance=null;

 async function connectWallet(){
    const isAppConnected = await isConnected();
  
    if (isAppConnected.isConnected) {
        const isAppAllowed = await isAllowed();

        if (isAppAllowed.isAllowed) {
          console.log("User has allowed your app!");
        } else{
            const isAppAllowed = await setAllowed();
        }
        publicKey= await getAddress();
        localStorage.setItem('publicKey', publicKey.address);        
    }
 }

 connectWallet();
}