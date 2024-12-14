import { ReactNode } from 'react';

interface PricesButtonProps {
  children: ReactNode;
}

const PricesButton = ({ children }: PricesButtonProps) => {
  return (
    <button className="bg-[#0085FF] rounded-[20px] text-[white] text-[23px] px-7 ">
      {children}
    </button>
  );
};

export default PricesButton;
