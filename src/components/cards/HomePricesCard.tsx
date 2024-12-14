import PricesButton from '../PricesButton';
import MisteryBox from '../../assets/mistery-box.svg';
import { Link } from 'react-router-dom';
import { GameType } from '../../types';

interface PricesCardProps {
  game: GameType;
}

const HomePricesCard = ({ game }: PricesCardProps) => {
  const prizes = game.prizes;

  const highestPrizeValue = Math.max(
    ...prizes.map((prize) => prize.usdtEquivalence)
  );

  const highestPrize = prizes.find(
    (prize) => Number(prize.usdtEquivalence) === highestPrizeValue
  );

  if (game.commingSoon) {
    return (
      <div
        className="bg-[#040F1A] min-w-[302px] w-[302px] h-[281px] self-center rounded-[10px] flex flex-col justify-between items-center p-6"
        style={{
          border: '1px solid #FFE600',
        }}
      >
        <img src={MisteryBox} alt="Mistery Box" className="h-[70%]" />
        <PricesButton>COMMING SOON</PricesButton>
      </div>
    );
  }

  return (
    <div
      className="bg-[#040F1A] min-w-[302px] w-[302px] h-[281px] self-center rounded-[10px] flex flex-col justify-between items-center p-6"
      style={{
        border: '1px solid #FFE600',
      }}
    >
      <div className="h-[50%] w-[80%]">
        <img
          src={game.image}
          alt="Lottery Item"
          className=" w-[100%] h-[100%] object-contain	"
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-[22px] text-[white] ">{game.title}</span>
        <span className="text-[11px] text-[#48F10D] ">
          or ${highestPrize?.usdtEquivalence} the equivalent in USDT
        </span>
        <span className="text-[11px] text-[#FFE600] ">
          ONLY {highestPrize?.stock} LEFT
        </span>
      </div>
      <Link to={`/game/${game.id}`}>
        <PricesButton>ENTER NOW</PricesButton>
      </Link>
    </div>
  );
};

export default HomePricesCard;
