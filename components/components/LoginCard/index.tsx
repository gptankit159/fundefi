import Image from 'next/legacy/image';
import Card from '../Card';
import { Button } from '@heathmont/moon-core-tw';
import { SoftwareLogin } from '@heathmont/moon-icons-tw';
import UseFormInput from '../UseFormInput';
import { toast } from 'react-toastify';
import userData from "../../data/usersData.json";
import FreighterLogin from '../../../services/freighterService'
const LoginCard = () => {

  const [Email, EmailInput] = UseFormInput({
    defaultValue: '',
    type: 'text',
    placeholder: 'Email',
    id: ''
  });

  const [Password, PasswordInput] = UseFormInput({
    defaultValue: '',
    type: 'password',
    placeholder: 'Password',
    id: ''
  });

  const allUsers= userData;
  async function OnClickLoginStep() {
    const totalUsers = allUsers.length
    console.log(totalUsers);
    
    var found = false;
    for (let i = 0; i < totalUsers; i++) {
      const element = allUsers[i]
      if (element.email == Email && element.password == Password) {
        toast.success('Logged in  ...');
        const username=element.username
        found = true;
        localStorage.setItem('user_id', Email);
        localStorage.setItem('user_name', username);
        localStorage.setItem('isSigned', "true");
        await FreighterLogin();
        window.location.href = '/joined';
        return;
      } else {
        found = false;
        localStorage.setItem('user_id', "null");
      }
    }
    if (!found) {
      toast.error('Incorrect email or password!');
    }
  }

  function isDisabled() {
    return !(Email && Password);
  }

  const LoginForm = () => (
    <Card className="max-w-[480px]">
      <div className="flex w-full flex-col gap-10">
        <div className="flex flex-1 justify-between items-center relative text-moon-16">
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
              <h6>Email</h6>
              {EmailInput}
            </div>
            <div className="flex flex-col gap-2">
              <h6>Password</h6>
              {PasswordInput}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Button className='bg-logoYellow text-black' onClick={OnClickLoginStep} disabled={isDisabled()}>
            Next
          </Button>
        </div>
      </div>
    </Card>
  );


  return (
    <>
       {LoginForm()}
    </>
  );
};

export default LoginCard;
