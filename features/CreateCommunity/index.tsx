import { Button, IconButton, Modal } from '@heathmont/moon-core-tw';
import { ControlsClose, ControlsPlus } from '@heathmont/moon-icons-tw';
import React, { useEffect, useState } from 'react';
import UseFormInput from '../../components/components/UseFormInput';
import UseFormTextArea from '../../components/components/UseFormTextArea';


import AddImageInput from '../../components/components/AddImageInput';
import ImageListDisplay from '../../components/components/ImageListDisplay';
import { toast } from 'react-toastify';
import Required from '../../components/components/Required';

let addedDate = false;
export default function CreateDaoModal({ open, onClose }) {
  const [DaoImage, setDaoImage] = useState([]);
  const [creating, setCreating] = useState(false);
  const [RecieveType, setRecieveType] = useState('XLM');

  //Input fields
  const [DaoTitle, DaoTitleInput] = UseFormInput({
    defaultValue: '',
    type: 'text',
    placeholder: 'Add name',
    id: ''
  });

  const [DaoDescription, DaoDescriptionInput] = UseFormTextArea({
    defaultValue: '',
    placeholder: 'Add Description',
    id: '',
    rows: 4
  });

  const [StartDate, StartDateInput, setStartDate] = UseFormInput({
    defaultValue: '',
    type: 'date',
    placeholder: 'Start date',
    id: 'startdate'
  });
  const [RecieveWallet, RecieveWalletInput, setRecieveWallet] = UseFormInput({
    defaultValue: '',
    type: 'text',
    placeholder: `Wallet Address (${RecieveType})`,
    id: 'recipient'
  });

  const [SubsPrice, SubsPriceInput] = UseFormInput({
    defaultValue: '',
    type: 'text',
    placeholder: '0.00',
    id: 'subs_price'
  });


  //Function after clicking Create Dao Button
  async function createDao() {
    const id = toast.loading('Uploading IPFS ...');
    setCreating(true);

    let allFiles = [];
    for (let index = 0; index < DaoImage.length; index++) {
      //Gathering all files link
      const element = DaoImage[index];
      const metadata = await client.storeBlob(element);
      const urlImageDao = {
        url: 'https://' + metadata + '.ipfs.nftstorage.link',
        type: element.type
      };
      allFiles.push(urlImageDao);
    }

    //Creating an object of all information to store in EVM
    const createdObject = {
      title: 'Asset Metadata',
      type: 'object',
      properties: {
        Title: {
          type: 'string',
          description: DaoTitle
        },
        Description: {
          type: 'string',
          description: DaoDescription
        },
        Start_Date: {
          type: 'string',
          description: StartDate
        },
        logo: {
          type: 'string',
          description: allFiles[0]
        },
        wallet: {
          type: 'string',
          description: RecieveWallet
        },
        user_id: {
          type: 'string',
          description: window.userid
        },
        SubsPrice: {
          type: 'number',
          description: SubsPrice
        },
        typeimg: {
          type: 'string',
          description: 'Dao'
        },
        Created_Date: {
          type: 'string',
          description: new Date().toLocaleDateString()
        },
        allFiles
      }
    };
    console.log('======================>Creating Dao');

    var template = await (await fetch(`/template/template.html`)).text();

    let changings = [
      {
        key: 'dao-title',
        value: DaoTitle
      },
      {
        key: 'dao-image',
        value: allFiles[0].url
      }
    ];
    let formatted_template = formatTemplate(template, changings);

    toast.update(id, { render: 'Creating Dao...', isLoading: true });

    async function onSuccess() {
      setCreating(false);
      onClose({ success: true });
      window.setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  function FilehandleChange(dao) {
    var allNames = [];
    for (let index = 0; index < dao.target.files.length; index++) {
      const element = dao.target.files[index].name;
      allNames.push(element);
    }
    for (let index2 = 0; index2 < dao.target.files.length; index2++) {
      setDaoImage((pre) => [...pre, dao.target.files[index2]]);
    }
  }

  function isInvalid() {
    return !(DaoTitle && DaoDescription && RecieveWallet && StartDate && SubsPrice && DaoImage.length > 0);
  }

  function AddBTNClick() {
    var DaoImagePic = document.getElementById('DaoImage');
    DaoImagePic.click();
  }

  function DeleteSelectedImages(idImage) {
    var newImages = [];
    var allUploadedImages = document.getElementsByName('deleteBTN');
    for (let index = 0; index < DaoImage.length; index++) {
      if (index != idImage) {
        const elementDeleteBTN = allUploadedImages[index];
        elementDeleteBTN.setAttribute('id', newImages.length.toString());
        const element = DaoImage[index];
        newImages.push(element);
      }
    }
    setDaoImage(newImages);
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Backdrop />
      <Modal.Panel className="bg-gohan absolute top-0 left-0 w-screen h-screen max-h-none max-w-none sm:relative sm:h-auto sm:w-[90%] sm:max-w-[600px] sm:max-h-[95vh] rounded-none sm:rounded-xl">
        <div className="flex items-center justify-center flex-col">
          <div className="flex justify-between items-center w-full border-b border-beerus py-4 px-6">
            {<h1 className="text-moon-20 font-semibold">Create charity</h1>}
            <IconButton className="text-trunks" variant="ghost" icon={<ControlsClose />} onClick={onClose} />
          </div>
          <div className="flex flex-col gap-6 w-full p-6 max-h-[calc(100vh-170px)] sm:max-h-[calc(90vh-162px)] overflow-auto">
            <div className="flex flex-col gap-2">
              <h6>
                Charity name
                <Required />
              </h6>
              {DaoTitleInput}
            </div>

            <div className="flex flex-col gap-2">
              <h6>
                Description
                <Required />
              </h6>
              {DaoDescriptionInput}
            </div>
            <div className="flex flex-col gap-2">
              <h6>
                Recipeint
                <Required />
              </h6>
              {RecieveWalletInput}
            </div>
            <div className="flex flex-col gap-2">
              <h6>
                Start Date
                <Required />
              </h6>
              {StartDateInput}
            </div>

            <div className="flex flex-col gap-2">
              <h6>
                Monthly subscription in USD
                <Required />
              </h6>
              {SubsPriceInput}
            </div>

            <div className="flex flex-col gap-2">
              <h6>
                Image
                <Required />
              </h6>
              <div className="flex gap-4">
                <input className="file-input" hidden onChange={FilehandleChange} accept="image/*" id="DaoImage" name="DaoImage" type="file" />
                <div className="flex flex-col">
                  {DaoImage.length < 1 && <AddImageInput onClick={AddBTNClick} />}
                  <ImageListDisplay images={DaoImage} onDeleteImage={DeleteSelectedImages} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h6>Vote power distribution</h6>
              <div className="flex gap-8">
                <div className="bg-white rounded-lg flex flex-1 flex-col">
                  <div className="flex w-full h-12 items-center">
                    <h6 className="text-moon-18 font-semibold flex-1">Level 1 (lowest)</h6>
                    <span className="text-trunks w-[160px]">1</span>
                    <span className="text-trunks">votes</span>
                  </div>
                  <div className="flex w-full h-12 items-center">
                    <h6 className="text-moon-18 font-semibold flex-1">Level 2</h6>
                    <span className="text-trunks w-[160px]">2</span>
                    <span className="text-trunks">votes</span>
                  </div>
                  <div className="flex w-full h-12 items-center">
                    <h6 className="text-moon-18 font-semibold flex-1">Level 3</h6>
                    <span className="text-trunks w-[160px]">3</span>
                    <span className="text-trunks">votes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 justify-between border-t border-beerus w-full p-6">
            <Button variant="ghost" onClick={onClose} className="flex-1 h-12 sm:h-10 sm:flex-none">
              Cancel
            </Button>
            <Button className="flex-1 h-12 bg-logoYellow text-black sm:h-10 sm:flex-none" animation={creating ? 'progress' : false} disabled={creating || isInvalid()} onClick={createDao}>
              <ControlsPlus className="text-moon-24" />
              Create <span className="hidden ">Charity</span>
            </Button>
          </div>
        </div>
      </Modal.Panel>
    </Modal>
  );
}
