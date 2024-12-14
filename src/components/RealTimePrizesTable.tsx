import PricesButton from './PricesButton';

import { GameType } from '../types';
import RealTimeRow from './RealTimeRow';
import { Link } from 'react-router-dom';

const RealTimePrizesTable = ({ game }: { game: GameType }) => {
  const prizes = game.prizes;

  return (
    <div className="px-10 flex flex-col gap-2 sm:p-0 sm:pr-5">
      <h1
        style={{
          borderBottom: '2px solid #fff',
        }}
        className="text-[25px] text-[white]  "
      >
        REAL TIME PRIZES
      </h1>
      <div className="flex flex-col gap-1 border p-2 rounded-[20px] border-[2px] mb-6 mt-6">
        {prizes.map((prize, index) => (
          <RealTimeRow key={prize.id} row={prize} index={index} />
        ))}
      </div>

      <h1
        style={{
          borderBottom: '2px solid #fff',
          borderTop: '2px solid #fff',
        }}
        className="text-[25px] text-[white]  mb-6"
      >
        CHECK ON REAL TIME PRIZES{' '}
      </h1>

      {/* FIXME Traer el contrato dinamicamente del game */}
      <div className="flex">
        <Link
          target="_BLANK"
          to={`https://testnet.bscscan.com/address/${game.contractAddress}`}
          className="w-[260px]"
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'flex',
          }}
        >
          <span className="text-[white] flex text-[13px] p-1 ">
            CONTRACT URL: {game.contractAddress}
            {/* https://testnet.bscscan.com/address/0xc7262f8dfaf9cd1e63f36b364c5cc36023ae03a4 */}
          </span>
        </Link>
        <span className="text-[white]">...</span>
      </div>
      <span className="text-[#FFE600] text-center  text-[13px]  p-1">
        100% TRUST AND TRANSPARENCY
      </span>

      <Link to={'/my-account'}>
        <PricesButton>CLAIM YOUR PRIZE</PricesButton>
      </Link>
    </div>
  );
};

export default RealTimePrizesTable;
