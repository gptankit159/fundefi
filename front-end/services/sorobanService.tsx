// src/services/sorobanService.js

import { rpc, Contract, Address, Networks, xdr } from 'stellar-sdk';
import * as StellarSdk from 'stellar-sdk';
const serverUrl = 'https://soroban-testnet.stellar.org'; // Replace with the appropriate URL for the testnet
const sorobanRpcUrl = 'https://rpc-futurenet.stellar.org'; // RPC URL for Soroban

// Contract ID of your deployed Soroban contract
const contractId = 'CCAFV4FQOT5SIMIMJSCSUB2JCDFENXLCBOPVTTGIIHHWMLRZPQPPDNI3'; // Replace this with your actual contract ID
// const server = new Server("https://horizon-testnet.stellar.org");
const networkPassphrase = Networks.TESTNET;

const contract = new Contract(contractId);
const sourceAccount = "valdis";  //
// Set up the Soroban server instance
const server = new rpc.Server(serverUrl);
export const getAllCommunities=async()=> {
  
  try {
    // Load the account that will call the contract
    const account = await server.getAccount(sourceAccount);
    console.log("inside log communities",account);
    const ScAddress= xdr.ScVal.scvAddress(new Address(contractId).toScAddress())
    // Create the transaction to call the 'get_all_communities' method
    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: networkPassphrase,
    })
    .addOperation(contract.call(
      "get_all_communities",
      ScAddress,
    ))
    .setTimeout(30)
    .build();
    
    // Simulate the transaction (used to get the result of the contract method)
    // transaction.sign(StellarSdk.Keypair.fromSecret('  '));
    const trans = await server.simulateTransaction(transaction);
    let val = StellarSdk.scValToNative(trans.result)
    // const result = await server.getContractData(contractId);

    // Log the result
    console.log("Communities:", val);
    
    // If result is an XDR, parse it
    const communities = xdr.ScVal.fromXDR(result.result_xdr, 'base64');
    console.log("Parsed Communities:", communities);
  } catch (error) {
    console.error("Error getting communities:", error);
  }
}

// getAllCommunities();

// Function to call get_all_communities() from the contract
export const getAllCommunities2 = async () => {
  try {
    const contract = new Contract(contractId);
    const result = await contract.call('get_all_communities');
    console.log('All Communities:', result);
    return result;
  } catch (error) {
    console.error('Error executing get_all_communities:', error);
  }
};
export const create_community = async () => {
  try {
    const contract = new Contract(contractId);
    // const result = await contract.call('create_community');
    const communityName =  "SaveTheDogs";
    const ownerAddress = "GB43IBDMCIDJPZYXOL7FCVEWZ5RC6DSUZO7UOLTM7KBVUHOX65X3ZATB"
    const communityNameScVal = xdr.ScVal.scvSymbol(communityName);
    const ownerAddressScVal = xdr.ScVal.scvAddress(new Address(ownerAddress).toScAddress())

    const result = await contract.call("create_community",ownerAddressScVal, communityNameScVal);
    console.log('Create Community', result);
    return result;
  } catch (error) {
    console.error('Error executing create_community:', error);
  }
};
export const subscribe = async () => {
  try {
    const contract = new Contract(contractId);
    const result = await contract.call('subscribe');
    // console.log('All Communities:', result);
    return result;
  } catch (error) {
    console.error('Error executing subscribe:', error);
  }
};
export const collect_donations = async () => {
  try {
    const contract = new Contract(contractId);
    const result = await contract.call('collect_donations');
    // console.log('All Communities:', result);
    return result;
  } catch (error) {
    console.error('Error executing collect_donations:', error);
  }
};
export const get_all_subscriptions = async () => {
  try {
    const contract = new Contract(contractId);
    const result = await contract.call('get_all_communities');
    // console.log('All Communities:', result);
    return result;
  } catch (error) {
    console.error('Error executing get_all_communities:', error);
  }
};
export const initialize = async () => {
  try {
    const contract = new Contract(contractId);
    const result = await contract.call('initialize');
    // console.log('All Communities:', result);
    return result;
  } catch (error) {
    console.error('Error executing initialize:', error);
  }
};


