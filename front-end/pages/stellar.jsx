import { useEffect, useState } from 'react';
import { Keypair, AccountResponse } from 'stellar-sdk';

export default function StellarPage() {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await fetch('https://horizon.stellar.org/accounts/CCR6MBKIHWY5F6KQRAWWYFJWEWXMJVFZFSGF2KA22FNXT5EPXTBBKXLM');
        const account = await response.json();
        const balance = account.balances.find(b => b.asset_type === 'native');
        setBalance(balance ? balance.balance : '0');
      } catch (error) {
        console.error('Error fetching account:', error);
      }
    };

    fetchAccountData();
  }, []);

  return (
    <div>
      <h1>Stellar Account Balance</h1>
      {balance !== null ? (
        <p>Balance: {balance} XLM</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}