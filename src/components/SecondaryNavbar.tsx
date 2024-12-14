import { Link } from 'react-router-dom';

const SecondaryNavbar = () => {
  return (
    <div className="flex flex-col">
      {/* <ul className="flex w-full justify-around py-4 sm:justify-start sm:gap-10 sm:pl-5">
        <li className="text-[white] ">LIVE NOW (0)</li>
        <li className="text-[white] ">COMPLETED (0)</li>
        <Link to={'/activity'}>
          <li className="text-[white] ">ACTIVITY</li>
        </Link>
      </ul> */}
      <div className="rounded-[10px] bg-[#252525] flex p-2 sm:mx-4 justify-center gap-2 mt-6">
        <span className="text-[10px] sm:text-[15px]   text-[#42FF00]">
          GET FREE LOTTO NFT
        </span>
        <span className="text-[10px] sm:text-[15px]  text-[white]">
          SHARING WITH FRIENDS
        </span>
        <Link to={'/referrals'} className="p-0 m-[-2px]">
          <span className="text-[10px] sm:text-[15px]  text-[#2E5CFF]">
            HERE
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SecondaryNavbar;
