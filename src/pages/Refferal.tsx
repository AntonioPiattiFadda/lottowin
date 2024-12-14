import { useEffect, useState } from 'react';
import CopyIcon from '../assets/copy-icon.svg';
import RefferalStatistics from '../components/RefferalStatistics';
import ShareInformationCard from '../components/cards/ShareInformationCard';
import { TwitterShareButton } from 'react-share';

const REFFERAL_LINK = import.meta.env.VITE_PROD_LINK || 'http://localhost:5173';

const ShareButton = ({ userId }: { userId: string }) => {
  const url = `${REFFERAL_LINK}/referred/${userId}`; // URL de la página a compartir
  const title = 'Check this out!'; // Título de la página compartida
  const hashtags = ['React', 'WebDevelopment']; // Hashtags
  const related = ['']; // Cuentas relacionadas

  return (
    <TwitterShareButton
      url={url}
      title={title}
      hashtags={hashtags}
      related={related}
    >
      <button className="bg-[#2E5CFF] w-[375px] h-[53px] rounded-[20px] text-[white] text-[25px] px-7 max-w-[80vw]">
        SHARE ON TWITTER
      </button>
    </TwitterShareButton>
  );
};

const Refferal = () => {
  const [refferalLink, setRefferalLink] = useState<string>('');
  const [copyMessage, setCopyMessage] = useState<string>('');
  const { user } = JSON.parse(window.sessionStorage.getItem('user') || '{}');

  const userId = user?.id || '';

  useEffect(() => {
    setRefferalLink(REFFERAL_LINK + '/referred/' + userId);
  }, [userId]);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(refferalLink)
      .then(() => {
        setCopyMessage('Link copied to clipboard!');
        setTimeout(() => {
          setCopyMessage('');
        }, 2000); // Clear the message after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="bg-[black] p-10 flex flex-col items-center gap-5">
      <ul className="flex gap-10 border-b-[2px] pb-4 w-full">
        <li className="text-white ">SUMMARY</li>
        <li className="text-white ">REFERRALS</li>
      </ul>
      <ShareInformationCard />
      <span className="text-[white] text-[18px] text-center ">
        Here´s your link:
      </span>
      <span className="lg:text-[22px] text-[12px] text-[#FFFF]  p-4 px-10 rounded-[20px] bg-[#04111D] my-4 flex lg:gap-10 gap-4 max-w-[80vw] relative ">
        {refferalLink}
        <img
          className="lg:w-[29px] w-[20px] cursor-pointer"
          src={CopyIcon}
          alt="Copy Icon"
          onClick={handleCopyLink}
        />
        {copyMessage && (
          <div className="text-green-500 mt-2 text-[14px] absolute left-[70%] top-[95%] w-[300px]">
            {copyMessage}
          </div>
        )}
      </span>
      <button
        className="bg-[#2E5CFF] w-[375px] h-[53px] rounded-[20px] text-[white] text-[25px]  px-7 max-w-[80vw]"
        onClick={handleCopyLink}
      >
        COPY LINK
      </button>
      <ShareButton userId={userId} />
      <RefferalStatistics />
    </div>
  );
};

export default Refferal;
