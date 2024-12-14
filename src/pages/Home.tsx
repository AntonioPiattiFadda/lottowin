import { useEffect, useState } from 'react';
import BigPrices from '../components/BigPrices';
import MediumPrices from '../components/MediumPrices';
import SmallPrices from '../components/SmallPrices';
import { GameType } from '../types';
import LiveChat from '../components/LiveChat';
import SecondaryNavbar from '../components/SecondaryNavbar';
import { getGames } from '../service';
import { PageSpinner } from '../components/LoaderSpinner';

const Home = () => {
  const [bigPrizes, setBigPrizes] = useState<GameType[]>([]);
  const [mediumPrizes, setMediumPrizes] = useState<GameType[]>([]);
  const [smallPrizes, setSmallPrizes] = useState<GameType[]>([]);

  useEffect(() => {
    //FIXME - Sort comming soon at the end and sort by price_usdt
    getGames().then((games) => {
      const bigPrizes = games.filter(
        (prize: { size: string }) => prize.size === 'big'
      );
      const mediumPrizes = games.filter(
        (prize: { size: string }) => prize.size === 'medium'
      );
      const smallPrizes = games.filter(
        (prize: { size: string }) => prize.size === 'small'
      );
      setBigPrizes(bigPrizes as GameType[]);
      setMediumPrizes(mediumPrizes as GameType[]);
      setSmallPrizes(smallPrizes as GameType[]);
    });
  }, []);

  if (
    bigPrizes.length === 0 &&
    mediumPrizes.length === 0 &&
    smallPrizes.length === 0
  ) {
    return <PageSpinner />;
  }

  return (
    <div className="bg-black flex flex-col min-h-[100vh] gap-4">
      <SecondaryNavbar />

      <div className="sm:flex justify-between min-w-[90vw]">
        <div className="">
          {bigPrizes.length === 0 ? null : <BigPrices bigPrizes={bigPrizes} />}
          {mediumPrizes.length === 0 ? null : (
            <MediumPrices mediumPrizes={mediumPrizes} />
          )}
          {smallPrizes.length === 0 ? null : (
            <SmallPrices smallPrizes={smallPrizes} />
          )}
        </div>

        <LiveChat />
      </div>
    </div>
  );
};

export default Home;
