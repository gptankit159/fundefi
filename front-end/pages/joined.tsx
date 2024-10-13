import { Button } from '@heathmont/moon-core-tw';
import { ControlsPlus, GenericUsers } from '@heathmont/moon-icons-tw';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Loader from '../components/components/Loader';
import DAOCard from '../components/components/DaoCard';
import EmptyState from '../components/components/EmptyState';
import CreateDaoModal from '../features/CreateCommunity';
import { useRouter } from 'next/router';
import {getAllCommunities, create_community} from '../services/sorobanService'
declare let window;

export const Joined = () => {
  const ListData = [{"Title": "Happy Paw",
    "Description": " Happy Paw is a compassionate initiative dedicated to improving the lives of animals in Ukraine. The goal of Happy Paw is to raise funds to support various animal welfare programs, including rescue efforts, veterinary care, and shelter operations. Through community events, fundraising campaigns, and partnerships with local businesses, Happy Paw aims to provide essential resources for animals awaiting adoption and to promote responsible pet ownership. By fostering awareness and encouraging donations, Happy Paw strives to create a brighter future for all animals, ensuring they receive the care and love they deserve.","Recipeint": "GCKQYW4BJCAO7MW5KXAXJA4V2RASAY7SHQ6YNFA4LLVNGVVYFITAGZNH","Start Date": "13/10/2024","SubsPrice": "4","logo":"./home/Image4.jpg","user_info":"Zack" },
    {"Title": "Heart for Women foundation",
      "Description": " More women than men die of cardiovascular disease. Yet, scientific research examines men in particular. As a result, thorough knowledge about the symptoms and causes in women is lacking. We are committed to bringing together different medical disciplines. This has made interrelationships visible. Because in addition to the heart, other organs and external influences also play a role in cardiovascular diseases. But we need even more knowledge about these connections to save women's lives. This is why the Heart for Women Foundation encourages multidisciplinary research.","Recipeint": "GCKQYW4BJCAO7MW5KXAXJA4V2RASAY7SHQ6YNFA4LLVNGVVYFITAGZNH","Start Date": "12/10/2024","SubsPrice": "8","logo":"./home/Image5.jpg","user_info":"Zill" },
      {"Title": "FOOD for Ukraine",
        "Description": "  The mission of the charity fund “Food for Ukraine” is to support the most vulnerable Ukrainians in the Kyiv region with food products. From the beginning of the war to August 31, 2024 thanks to many Novus partners and sponsors of the fund with the help of the Red Cross has already distributed 103 truckloads of groceries, for over 2,42 mln EUR. The recipients of the aid were mostly single disadvantaged people in need of social care, especially children.","Recipeint": "GCKQYW4BJCAO7MW5KXAXJA4V2RASAY7SHQ6YNFA4LLVNGVVYFITAGZNH","Start Date": "11/10/2024","SubsPrice": "5","logo":"./home/Image6.jpg","user_info":"John" }
  
  ]
  const [list, setList] = useState(ListData);
  const [loading, setLoading] = useState(true);
  const [showCreateDaoModal, setShowCreateDaoModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchContractData();
  }, []);
  // }, [contract, api]);

  async function fetchContractData() {
    setLoading(true);
    getAllCommunities();
    create_community();
    // try {
    //   if (contract && api) {
    //     let allDaos = (await GetAllDaos()) as any as Dao[];
    //     let allJoined = (await GetAllJoined()) as any as JOINED[];

    //     const arrList = [];

    //     allJoined.forEach((joined_dao) => {
    //       let foundDao = (allDaos as any).filter((e) => e?.daoId == joined_dao.daoId?.toString());
    //       if (joined_dao.user_id.toString() == window.userid.toString() && foundDao.length > 0) {
    //         arrList.push(foundDao[0]);
    //       }
    //     });

    //     if (arrList.length === 0) {
    //       router.push('/daos');
    //     }

    //     setList(arrList.reverse());
    //   }
    // } catch (error) {
    //   console.error('ERR', error);
    // }

    setLoading(false);
  }

  function closeModal() {
    setShowCreateDaoModal(false);
  }

  function openModal() {
    setShowCreateDaoModal(true);
  }

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

export default Joined;
