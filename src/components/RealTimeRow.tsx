import GoldMedal from '../assets/gold.svg';
import PlatinumMedal from '../assets/platinum.svg';
import SilverMedal from '../assets/silver.svg';
import BronzeMedal from '../assets/bronze.svg';
import { Prizes } from '../types';

const RealTimeRow = ({ row, index }: { row: Prizes; index: number }) => {
  return (
    <div className=" border-b-[1px] grid grid-cols-[auto_1fr_.5fr_1fr]">
      <div className="flex justify-center items-center">
        {index === 0 && (
          <img src={PlatinumMedal} alt="Medal" className="w-6 h-6" />
        )}
        {index === 1 && <img src={GoldMedal} alt="Medal" className="w-6 h-6" />}
        {index === 2 && (
          <img src={SilverMedal} alt="Medal" className="w-6 h-6" />
        )}
        {index === 3 && (
          <img src={BronzeMedal} alt="Medal" className="w-6 h-6" />
        )}
        {index > 3 && <span className="w-6 h-6"></span>}
      </div>

      <div className="text-[white] text-[13px] flex items-center justify-center border-r">
        {row.title}
      </div>

      <div className="text-[#FFE600] text-[13px] flex items-center justify-center border-r">
        {row.stock} LEFT
      </div>

      <div className="text-[#10AC03] text-[13px] flex items-center justify-center pl-2">
        {row.chance}% CHANCE OR {row.usdtEquivalence} USDT
      </div>
    </div>
  );
};

export default RealTimeRow;
