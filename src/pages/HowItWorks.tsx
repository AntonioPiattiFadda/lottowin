import HowItWorksCard from '../components/cards/HowItWorksCard';
import ShareInformationCard from '../components/cards/ShareInformationCard';
import SecondaryNavbar from '../components/SecondaryNavbar';

const HowItWorks = () => {
  return (
    <div className="bg-[#131F2A]   min-h-[100vh] bg-black flex flex-col gap-5  p-6 ">
      <SecondaryNavbar />
      <span className="lg:text-[50px] text-[25px] text-white text-center">
        HOW ITS WORK?
      </span>

      <span className="lg:text-[30px] text-[18px] text-white text-center">
        VERY SIMPLE <br /> FOLLOW THIS 4 STEPS
      </span>

      <div className="flex flex-col lg:flex-row gap-5 self-center ">
        <HowItWorksCard step={1}>
          Connect your wallet and create a lottowin account
        </HowItWorksCard>
        <HowItWorksCard step={2}>
          Refill your account balance with the amount of USDT you wish to
          participate in the contest
        </HowItWorksCard>{' '}
      </div>
      <div className="flex flex-col lg:flex-row gap-5 self-center">
        <HowItWorksCard step={3}>
          Visit the page of the contest you wish to buy the NFT
        </HowItWorksCard>
        <HowItWorksCard step={4}>
          After purchasing your NFTs claim your prize instantly! Best of luck!
        </HowItWorksCard>
      </div>

      <div className="self-center">
        <ShareInformationCard />
      </div>
    </div>
  );
};

export default HowItWorks;
