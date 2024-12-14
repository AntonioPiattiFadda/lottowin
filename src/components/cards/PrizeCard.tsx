import { GameType } from '../../types';

const PrizeCard = ({ game }: { game: GameType }) => {
  const prizes = game.prizes;

  const totalUsdt = prizes.reduce(
    (acc, prize) => acc + Number(prize.usdtEquivalence) * prize.stock,
    0
  );

  const highestPrizeValue = Math.max(
    ...prizes.map((prize) => prize.usdtEquivalence)
  );

  const highestPrize = prizes.find(
    (prize) => Number(prize.usdtEquivalence) === highestPrizeValue
  );

  return (
    <>
      <div
        className="bg-[#040F1A] max-w-[302px] w-[100%] h-[281px] self-center rounded-[10px] flex flex-col justify-between items-center p-6 mt-10"
        style={{
          border: '3px solid #FFE600',
        }}
      >
        <div className="h-[70%] w-[80%]">
          <img
            src={game.image}
            alt="Lottery Item"
            className=" w-[100%] h-[100%] object-contain"
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[22px] text-[white] ">{game.title}</span>
          {/* <span className="text-[11px] text-[#48F10D] ">
            or $1400 the equivalent in USDT
          </span> */}
          <span className="text-[11px] text-[#FFE600] ">
            ONLY {highestPrize?.stock} LEFT
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center lg:translate-x-[80px]">
        <span className="text-[white]  text-[30px] ">
          BIG PRIZE {game.nftAmount} NFT{' '}
        </span>
        <span className="text-[#FFE600]  text-[25px] ">
          ${totalUsdt} IN PRIZES
        </span>
        <span className="text-[white]  text-[20px] ">
          ALL NFT HAVE A PRIZE - INSTANT CLAIM
        </span>

        <div className="relative lg:w-full w-[80vw]  bg-[#040F1A] rounded-full h-4 my-2">
          {game.soldNft === 0 ? (
            <div
              className="absolute bg-white h-4 rounded-full"
              style={{ width: `4%` }}
            />
          ) : (
            <div
              className="absolute bg-white h-4 rounded-full"
              style={{ width: `${(game.soldNft * 100) / game.nftAmount}%` }}
            />
          )}
        </div>

        <span className="text-[white]  text-[20px] ">
          {game.soldNft}/{game.nftAmount} NFT SOLD{' '}
        </span>
      </div>
    </>
  );
};

export default PrizeCard;
