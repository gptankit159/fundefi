import { Button } from '@heathmont/moon-core-tw';
import { ControlsPlus, GenericUsers } from '@heathmont/moon-icons-tw';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Loader from '../../components/components/Loader';
import DAOCard from '../../components/components/DaoCard';
import EmptyState from '../../components/components/EmptyState';
import CreateDaoModal from '../../features/CreateCommunity';
import { useRouter } from 'next/router';
import {getAllCommunities, create_community} from '../../services/sorobanService'
declare let window;
import ListData from '../../components/data/charities.json'
import { log } from 'console';

export const Charity = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log("router",router.query.id);
  
  const [list, setList] = useState([]);


  

  useEffect(() => {
    fetchContractData();
    setList(ListData)
  }, []);
  // }, [contract, api]);


  return (
    <>
      <Head>
        <title>Joined charities</title>
        <meta name="description" content="DAO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`flex items-center flex-col gap-8`}>
        <div className={`gap-8 flex w-full bg-logoYellow pt-10 pb-6 border-beerus border`}>
          <div className="container flex w-full justify-between">
            <h1 className="text-moon-32 font-bold">Joined charities</h1>
            <Button iconLeft={<ControlsPlus />} onClick={openModal} className="bg-black pe-2 sm:pe-4">
              <span className="hidden sm:inline-block">Create charity</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-8 container items-center pb-16">
          <Loader element={list.length > 0 ? list.map((listItem, index) => <DAOCard item={listItem} key={index} hasJoined />) : <EmptyState icon={<GenericUsers className="text-moon-48 " />} label="You haven't joined any communities yet" />} loading={loading} width={768} height={236} many={3} />{' '}
        </div>
      </div>

      <CreateDaoModal open={showCreateDaoModal} onClose={closeModal} />
    </>
  );
};

export default Charity;
