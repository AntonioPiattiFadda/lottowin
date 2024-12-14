interface HowItWorksCardProps {
  children: React.ReactNode;
  step: number;
}

const HowItWorksCard = ({ children, step }: HowItWorksCardProps) => {
  return (
    <div className="w-[302px] h-[300px] lg:h-[310px] lg:p-0 p-4 bg-[#1C3246] rounded-[20px] flex flex-col lg:justify-start  justify-center">
      <span className="text-white lg:text-[100px] text-[50px] text-center">
        {step}
      </span>
      <span className="text-white lg:text-[25px] text-[20px] text-center">
        {children}
      </span>
    </div>
  );
};

export default HowItWorksCard;
