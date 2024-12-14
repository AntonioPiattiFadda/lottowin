import { useEffect, useState } from 'react';
import SecondaryNavbar from '../components/SecondaryNavbar';
import { getPurchases } from '../service';

const PROD_LINK = import.meta.env.VITE_PROD_LINK;

type User = {
  id: number;
  name: string | null;
  email: string | null;
  registrationDate: string;
  referredBy: string | null;
  walletAddress: string;
  image: string;
  balance: number;
};

type Game = {
  id: number;
  title: string;
  description: string;
  image: string;
  stock: number;
  chance: number;
  winner: string | null;
  usdtEquivalence: string;
  gameId: number | null;
  contractAddress: string;
};

type Purchase = {
  hash: string;
  id: number;
  userId: number;
  gameId: number;
  createdAt: string;
  nftAmount: number;
  user: User;
  game: Game;
};

const Activity = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    getPurchases().then((purchases) => {
      setPurchases(purchases);
    });
  }, []);
  return (
    <div className="bg-[#131F2A]   min-h-[100vh] bg-black flex flex-col  p-6 ">
      <SecondaryNavbar />

      <div className="overflow-scroll">
        <div className="w-[100%] min-w-[800px] grid grid-cols-4 justify-items-center p-5 ">
          <span className="lg:text-[25px] text-[18px] text-white">
            Competition
          </span>
          <span className="lg:text-[25px] text-[18px] text-white flex">
            Username
          </span>
          <span className="lg:text-[25px] text-[18px] text-white flex">
            NFT Adquiried
          </span>
          <span className="lg:text-[25px] text-[18px] text-white flex">
            TX-ID
          </span>
        </div>

        {purchases.map((data) => (
          <div
            key={data.id}
            className="w-[100%] min-w-[800px] grid grid-cols-4 justify-items-center p-5 border-t-[1px]"
          >
            <span className="lg:text-[25px] text-[18px] text-white flex items-center mr-auto lg:pl-20 pl-4 gap-2">
              <img
                className="lg:h-[50px] h-[30px]"
                src={data.game.image}
                alt="Article image"
              />
              {data.game.title}
            </span>
            <span className="lg:text-[25px] text-[18px] text-white flex items-center mr-auto lg:pl-20 pl-4 gap-2">
              <img
                className="lg:h-[50px] lg:w-[50px] w-[30px] h-[30px] rounded-full object-cover"
                src={
                  `${PROD_LINK}${data.user.image}` ||
                  'https://via.placeholder.com/150'
                }
                alt="User avatar"
              />
              {data.user.name || 'Anonymous'}
            </span>
            <span className="lg:text-[25px] text-[18px] text-white">
              {data.nftAmount}
            </span>
            <span className="lg:text-[25px] text-[18px] text-white pr-2 w-[80%] overflow-scroll">
              {data.hash}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
