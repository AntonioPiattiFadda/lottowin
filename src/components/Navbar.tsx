import { useEffect, useState } from 'react';
import UserLoggedOut from '../assets/user-loged-out.svg';
import NavUSDT from '../assets/nav-usdt.svg';
import ConnectWallet from '../assets/connect-wallet.svg';
import MyProfile from '../assets/my-profile.svg';
import Referrals from '../assets/referrals.svg';
import Logout from '../assets/logout.svg';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useDisconnect } from 'wagmi';
import RechargeBalance from './RechargeBalance';
import { createUser } from '../service';
import { User } from '../types';
import { useLocation } from 'react-router-dom';
import { useBalance } from '../Context/BalanceContext';

const PROD_LINK = import.meta.env.VITE_PROD_LINK;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rechargeMenu, setRechargeMenu] = useState(false);
  const [user, setUser] = useState<User>({} as User);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();
  const location = useLocation();
  const isReferredRoute = location.pathname.includes('referred');

  const { balance, updateBalance } = useBalance();

  const handleRechargeMenu = () => {
    setRechargeMenu(!rechargeMenu);
  };

  useEffect(() => {
    if (isConnected && address && !isReferredRoute) {
      createUser(address)
        .then((res) => {
          window.sessionStorage.setItem('user', JSON.stringify(res));
          setUser(res.user);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isConnected, address, isReferredRoute]);

  const handleLogOut = () => {
    disconnect();
    setIsOpen(false);
  };

  const handleChangeUserBalance = (balance: number) => {
    setUser({ ...user, balance });
    updateBalance(balance);
  };

  const handleCloseNav = () => {
    setIsOpen(false);
  };

  return (
    <>
      {rechargeMenu && (
        <RechargeBalance
          address={address || ''}
          onCloseMenu={handleRechargeMenu}
          onChangeBalance={handleChangeUserBalance}
        />
      )}
      <nav className="h-[65px] px-6 flex justify-between bg-[black] items-center lg:bg-[#040F1A] navBar">
        <ul className="flex gap-16 items-center">
          <li className="text-[white] text-[22px] ">
            {' '}
            <Link to={'/'}>LOTTOWIN </Link>
          </li>

          <li className="lg:flex hidden text-[white] text-[16px] ">
            <Link to={'/how-it-works'}>HOW IT WORK'S?</Link>
          </li>
          <li className="lg:flex hidden text-[white] text-[16px] ">
            <Link to={'/referrals'}>REFERRALS</Link>
          </li>
          <li className="lg:flex hidden text-[white] text-[16px] ">
            <Link to={'/activity'}>ACTIVITY</Link>
          </li>
        </ul>

        {!isConnected ? null : (
          // <button
          //   className="text-white rounded-full border border-[#01ff2f] px-6 py-1 w-[130px] text-[12px]"
          //   onClick={() => open()}
          // >
          //   Connect Wallet
          // </button>
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        )}

        {isConnected && (
          <ul className="gap-4 items-center lg:flex hidden">
            <li>
              <div className="bg-[#1C3246] h-[32px] rounded-md grid grid-cols-[1fr_.4fr] items-center">
                <span
                  className="text-[10px] text-[white]  h-full flex items-center px-2"
                  style={{ borderRight: '1px solid black' }}
                >
                  <img src={NavUSDT} alt="Usdt total" />
                  <span className="text-xs">{balance || 0} USDT</span>
                </span>
                <button
                  className="text-[20px] text-[white]  text-center"
                  onClick={handleRechargeMenu}
                >
                  +
                </button>
              </div>
            </li>
            <li>
              <span className="text-white">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
            </li>
            <li>
              <button onClick={() => setIsOpen(!isOpen)}>
                <img
                  className="w-[35px] h-[35px] rounded-full"
                  src={`${PROD_LINK}${user.image}` || UserLoggedOut}
                  alt="Logout"
                />
              </button>
            </li>
          </ul>
        )}
        {!isConnected && !isReferredRoute && (
          <button
            className="text-white rounded-full border border-[#01ff2f] px-6 py-1 "
            onClick={() => open()}
          >
            {isConnected ? 'CHECK WALLET' : 'CONNECT WALLET'}
          </button>
        )}
      </nav>

      <div
        className={`fixed top-0 right-0 rounded-[20px]  bg-[#040F1A] transform sm:w-[280px]  ${
          isOpen ? 'translate-x-[0%] ' : 'translate-x-[100%]'
        } transition-transform duration-300 ease-in-out lg:translate-y-[65px]  z-40`}
      >
        <div className="flex flex-col py-6">
          <button
            onClick={() => setIsOpen(false)}
            className="self-end text-white lg:hidden"
          >
            <svg
              className="w-6 h-6 mr-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <ul className="flex flex-col mt-8 sm:mt-4">
            <li
              className="py-2 text-[white] text-[30px]  w-full h-[100px] flex gap-4 items-center px-10 sm:text-[20px] sm:h-[55px] "
              style={{
                borderBottom: '1px solid white',
              }}
            >
              <img className="sm:w-[25px]" src={ConnectWallet} alt="" />
              <span
                onClick={() => open()}
                className="text-center text-[20px] cursor-pointer"
              >
                {isConnected ? 'CHECK WALLET' : 'CONNECT WALLET'}
              </span>
            </li>

            <Link onClick={handleCloseNav} to={'/my-account'}>
              <li
                className="py-2 text-[white] text-[30px]  w-full h-[100px] flex gap-4 items-center px-10 sm:text-[20px] sm:h-[55px]"
                style={{
                  borderBottom: '1px solid white',
                }}
              >
                <img className="sm:w-[25px]" src={MyProfile} alt="" />
                <span className="text-center">My profile</span>
              </li>
            </Link>

            {/* <Link onClick={handleCloseNav} to={'/my-wallet'}>
              <li
                className="py-2 text-[white] text-[30px]  w-full h-[100px] flex gap-4 items-center px-10 sm:text-[20px] sm:h-[55px]"
                style={{
                  borderBottom: '1px solid white',
                }}
              >
                <img className="sm:w-[25px]" src={Wallet} alt="" />
                <span className="text-center">Wallet</span>
              </li>
            </Link> */}

            <Link onClick={handleCloseNav} to={'/referrals'}>
              <li
                className="py-2 text-[white] text-[30px]  w-full h-[100px] flex gap-4 items-center px-10 sm:text-[20px] sm:h-[55px]"
                style={{
                  borderBottom: '1px solid white',
                }}
              >
                <img className="sm:w-[25px]" src={Referrals} alt="" />
                <span className="text-center">Referrals</span>
              </li>
            </Link>

            <li className="py-2 text-[white] text-[30px]  w-full h-[100px] flex gap-4 items-center px-10 sm:text-[20px] sm:h-[55px]">
              <img className="sm:w-[25px]" src={Logout} alt="" />
              <span onClick={handleLogOut} className="text-center">
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
