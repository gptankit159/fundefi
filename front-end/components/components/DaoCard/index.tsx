import Image from 'next/legacy/image';
import Card from '../Card';
import { Button } from '@heathmont/moon-core-tw';
import { ArrowsRightShort, ControlsPlus, GenericUsers } from '@heathmont/moon-icons-tw';
import { intervalToDuration, isPast, parseISO } from 'date-fns';
import Link from 'next/link';
import { MouseEventHandler, useState } from 'react';

const DAOCard = ({ item, onJoinCommunity, hasJoined, className }: { item: Dao; onJoinCommunity?: MouseEventHandler; hasJoined: boolean; className?: string }) => {
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  console.log(item);
  

  // Format the duration
  let formattedDuration = '';
  const todayISO = new Date().toISOString().split('T')[0];
  const startDate = new Date(todayISO);
  let hasAlreadyPast = false;

  if (item.Start_Date) {
    const endDate = new Date(item.Start_Date);

    const duration = intervalToDuration({ start: startDate, end: endDate });

    formattedDuration += duration.days > 0 ? `${duration.days} days ` : '';
    formattedDuration += duration.hours > 0 ? `${duration.hours} hours ` : '';
    formattedDuration += duration.minutes > 0 ? `and ${duration.minutes} min` : '';
    formattedDuration = formattedDuration.trim();

    hasAlreadyPast = isPast(parseISO(item.Start_Date)) || endDate.toISOString().split('T')[0] === todayISO;
  } else {
    hasAlreadyPast = true;
  }

  return (
    <Card className={`${className} max-w-[720px] flex flex-col gap-4 relative`}>
      <div className="flex w-full">
        <div className="rounded-moon-s-md overflow-hidden flex justify-center items-center border border-beerus relative w-[80px] h-[80px] sm:w-[180px] sm:h-[180px]">
          {!showPlaceholder && <Image unoptimized={true} layout="fill" objectFit="cover" src={item.logo} onError={() => setShowPlaceholder(true)} alt="" />}
          {showPlaceholder && <GenericUsers className="text-moon-48 text-trunks" />}
        </div>
        <div className="flex flex-1 flex-col gap-2 relative px-5 text-moon-16">
          <p className="font-semibold text-moon-18">{item.Title}</p>
          <p>Subscription of {item.SubsPrice} EURC/month</p>
          <p className="hidden sm:inline-block">
            Managed by{' '}
            <a href={'/profile/' + item?.user_info?.id?.toString()} className="text-piccolo">
              @{item?.user_info.toString()}
            </a>
          </p>
          {!hasAlreadyPast ? <p className="text-hit font-bold">Opens in {formattedDuration}</p> : <p className="text-hit font-bold">Opened</p>}
          {item?.Description ?<div className='text-balance'>{item?.Description}</div>:<p></p>}
        </div>
      </div>
      {hasJoined && (
        <Link href={`/charity/${item.Recipeint}`}>
          <br />
          <Button className="sm:absolute bg-black sm:bottom-6 sm:right-6 w-full sm:w-auto">
            Go to charity
          </Button>
        </Link>
      )}
      {!hasJoined && (
        <Button className="sm:absolute sm:bottom-6 sm:right-6" iconLeft={<ControlsPlus />} onClick={onJoinCommunity}>
          Join
        </Button>
      )}
    </Card>
  );
};

export default DAOCard;
