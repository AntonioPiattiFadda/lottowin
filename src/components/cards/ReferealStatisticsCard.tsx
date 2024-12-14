import navUSDT from '../../assets/nav-usdt.svg';

interface ReferralStatisticsProps {
  title: 'Clicks' | 'Referrals' | 'Revenue';
  refferalsFormatted: {
    today: number;
    yesterday: number;
    thisMonth: number;
    lastMonth: number;
    total: number;
  };
  onClaimRevenue?: () => void;
}

const ReferealStatisticsCard = ({
  title,
  refferalsFormatted,
  onClaimRevenue,
}: ReferralStatisticsProps) => {
  return (
    <div className="bg-[#131F2A]  w-[326px] h-[252px] rounded-[20px] flex flex-col justify-between items-center p-6 my-6">
      <span className="text-[20px] text-white">{title}</span>
      <span className="text-[20px] text-white flex">
        {title === 'Revenue' ? <img src={navUSDT} alt="Usdt Icon" /> : ''}
        {refferalsFormatted.total}
      </span>
      <div className="border-t-[1px] w-[80%] flex justify-between py-2">
        <span className="text-[10px] text-white">Today</span>
        <span className="text-[10px] text-white pr-2">
          {refferalsFormatted.today}
        </span>
      </div>
      <div className="border-t-[1px] w-[80%] flex justify-between py-2">
        <span className="text-[10px] text-white">Yesterday</span>
        <span className="text-[10px] text-white pr-2">
          {refferalsFormatted.yesterday}
        </span>
      </div>{' '}
      <div className="border-t-[1px] w-[80%] flex justify-between py-2">
        <span className="text-[10px] text-white">This Month</span>
        <span className="text-[10px] text-white pr-2">
          {' '}
          {refferalsFormatted.thisMonth}
        </span>
      </div>{' '}
      <div className="border-t-[1px] w-[80%] flex justify-between py-2">
        <span className="text-[10px] text-white">Last Month</span>
        <span className="text-[10px] text-white pr-2">
          {' '}
          {refferalsFormatted.lastMonth}
        </span>
      </div>{' '}
      {title === 'Revenue' ? (
        <button
          className="text-white border px-2 rounded-[12px] hover:bg-white hover:text-black"
          onClick={onClaimRevenue}
        >
          Claim Revenue
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default ReferealStatisticsCard;
