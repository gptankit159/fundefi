import Head from 'next/head';
import { useEffect, useState } from 'react';
import LoginCard from '../components/components/LoginCard';
import { useRouter } from 'next/router';


export default function Login() {
  const [isConnected, setIsConnected] = useState(false);

  const router = useRouter();
  useEffect(() => {
    setConnectionStatus();
  }, []);

  useEffect(() => {
    if ((isConnected)) {
      window.location.href = '/joined';
    }
  }, [ isConnected, router]); // Dependency array

  const setConnectionStatus = () => {
    if ((isConnected)) {
      window.location.href = '/joined';
    }
  };



  return (
    <>
    
      <Head>
        <title>Login</title>
        <meta name="description" content="fundefi - Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`gap-8 flex w-full bg-logoYellow pt-10 pb-10`}>
        <div className="container flex flex-col gap-2 w-full justify-between">
          <h1 className="text-moon-32 font-bold">Login to your account</h1>
        </div>
      </div>
      <div className={`gap-8 flex w-full bg-black pt-10 pb-10`}>
      <div className="container w-full bg-black flex flex-col items-center pt-10 gap-10">{<LoginCard />}</div>
      </div>
      <div className={`gap-8 flex w-full bg-black pt-10 pb-10`}><br /><br /><br /><br /><br /><br /><br />
      </div>

    </>
  );
}
