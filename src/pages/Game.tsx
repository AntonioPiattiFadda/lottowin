import { useParams } from 'react-router-dom';
import PrizeCard from '../components/cards/PrizeCard';
import EnterCompetition from '../components/EnterCompetition';
import RealTimePrizesTable from '../components/RealTimePrizesTable';
import { useEffect, useState } from 'react';
import LiveChat from '../components/LiveChat';
import SecondaryNavbar from '../components/SecondaryNavbar';
import { GameType } from '../types';
import { getGameById } from '../service';
import { PageSpinner } from '../components/LoaderSpinner';

const Game = () => {
  const [game, setGame] = useState<GameType>({} as GameType);
  const { gameId } = useParams();

  useEffect(() => {
    if (!gameId) {
      return;
    }
    getGameById(gameId).then((game) => {
      setGame(game);
    });
  }, [gameId]);

  const handleBuyNft = (soldNft: number) => {
    setGame((prev) => {
      return { ...prev, soldNft: prev.soldNft + soldNft };
    });
  };

  if (Object.keys(game).length === 0) {
    return <PageSpinner />;
  }

  return (
    <>
      <div className="bg-black hidden lg:flex flex-col gap-4">
        <SecondaryNavbar />
      </div>
      <div className="bg-black flex flex-col min-h-[100vh] gap-4 lg:gap-2  lg:grid grid-cols-3 grid-rows-[.5fr_1fr_1fr] pb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-10 col-span-2 col-start-1 row-span-1 row-start-1">
          <PrizeCard game={game} />
        </div>
        <div className="flex flex-col col-span-1 col-start-2 row-span-2 row-start-2 lg:mt-[-70px] lg:mr-auto lg:pl-6">
          <EnterCompetition gameId={gameId || ''} onBuyNft={handleBuyNft} />
        </div>
        <div className="flex flex-col col-span-1 col-start-1 row-span-2 row-start-2 lg:ml-auto  lg:max-w-[302px]">
          <RealTimePrizesTable game={game} />
        </div>
        <div className="flex flex-col col-span-1 col-start-3 row-span-2 row-start-1 lg:mt-6">
          <LiveChat />{' '}
        </div>
      </div>
    </>
  );
};

export default Game;
