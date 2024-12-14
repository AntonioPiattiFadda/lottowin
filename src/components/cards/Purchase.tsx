import { Purchases } from '../../types';
import ClaimPrizeVibration from '../../assets/ClaimPrizeVibration.gif';
import ClaimPrizeAnimation from '../../assets/ClaimPrizeAnimation.gif';

import { useState } from 'react';

type PurchaseProps = {
  purchase: Purchases;
  onClaimPrize: (id: number) => void;
};

const Purchase = ({ purchase, onClaimPrize }: PurchaseProps) => {
  const [showAnimation, setShowAnimation] = useState(false);

  const handleClaimPrize = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      onClaimPrize(purchase.id);
    }, 4000);
  };

  return (
    <div
      key={purchase.id}
      className="bg-[#131F2A] min-w-[364px] max-w-[364px] h-[364px] rounded-[20px] flex flex-col justify-between items-center p-6 my-6"
    >
      <p className="text-[30px] text-center text-[white]">
        {purchase.nftAmount} NFTS
      </p>
      <img
        src={showAnimation ? ClaimPrizeAnimation : ClaimPrizeVibration}
        alt="Mistery Box"
        className=""
      />

      <button
        onClick={handleClaimPrize}
        className="bg-[#0085FF] rounded-[20px] text-[white] text-[23px] px-7 "
      >
        CLAIM
      </button>
    </div>
  );
};

export default Purchase;
