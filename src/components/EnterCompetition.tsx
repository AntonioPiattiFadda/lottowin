import { Link } from 'react-router-dom';
import EnterCompetitionCard from './cards/EnterCompetitionCard';
import PricesButton from './PricesButton';

const EnterCompetition = ({
  gameId,
  onBuyNft,
}: {
  gameId: string;
  onBuyNft: (soldNft: number) => void;
}) => {
  return (
    <div className="flex flex-col gap-6 items-center">
      <h1 className="text-[25px] text-center text-[white] ">
        ENTER COMPETITION
      </h1>
      <div className="grid grid-cols-2 gap-5">
        <EnterCompetitionCard onBuyNft={onBuyNft} nftQty={1} gameId={gameId} />
        <EnterCompetitionCard onBuyNft={onBuyNft} nftQty={5} gameId={gameId} />
        <EnterCompetitionCard onBuyNft={onBuyNft} nftQty={10} gameId={gameId} />
        <EnterCompetitionCard onBuyNft={onBuyNft} nftQty={20} gameId={gameId} />
        <EnterCompetitionCard onBuyNft={onBuyNft} nftQty={50} gameId={gameId} />
      </div>
      <div
        className="bg-[#131F2A]  w-full self-center rounded-[20px] flex flex-col gap-3 justify-between items-center p-6"
        style={{
          border: '3px solid white',
        }}
      >
        <span className="text-[white] text-center text-[15px] ">
          GET FREE CHANCES BY SHARING IT WITH YOUR FRIENDS
        </span>
        <Link to={'/referrals'}>
          <PricesButton>GET FREE CHANCES</PricesButton>
        </Link>
      </div>
    </div>
  );
};

export default EnterCompetition;
