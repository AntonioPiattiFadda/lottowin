import { useEffect, useState } from 'react';
import MetamaskIcon from '../assets/metamask-icon.svg';
import NavUSDT from '../assets/nav-usdt.svg';
import { getUserByWalletAddress, updateUser, withdrawUsdt } from '../service';
import { ComponentStatus, User } from '../types';
import { ButtonSpinner } from './LoaderSpinner';
import SuccessModal from './SuccessModal';
import { ethers } from 'ethers';
import USDTABI from '../contracts/USDTAbi.json';
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { useBalance } from '../Context/BalanceContext';
const RechargeBalance = ({
  address,
  onCloseMenu,
  onChangeBalance,
}: {
  address: string;
  onCloseMenu: () => void;
  onChangeBalance: (balance: number) => void;
}) => {
  const [user, setUser] = useState<User>({} as User);
  const [amount, setAmount] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [state, setState] = useState<ComponentStatus>('');
  const [localError, setError] = useState('');
  const [swapToLottoWin, setSwapToLottoWin] = useState(true);
  const ADMIN_WALLET_ADDRESS = import.meta.env.VITE_ADMIN_WALLET;
  const USDT_CONTRACT_ADDRESS = import.meta.env.VITE_USDT_CONTRACT;
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed) {
      const newBalance = user.balance ? user.balance + amount : amount;
      const formData = new FormData();
      formData.append('balance', newBalance.toString());

      updateUser(address, formData)
        .then((user) => {
          setState('success');
          onChangeBalance(newBalance);
          setWalletBalance(walletBalance - amount);
          setUser({ ...user, balance: newBalance });
          setTimeout(() => setState(''), 2000);
        })
        .catch((error) => {
          console.error('Error updating balance in Firebase:', error);
          setState('');
        });
    } else {
      setState('');
    }
  }, [isConfirmed, error]);

  const { balance, updateBalance } = useBalance();

  const fetchWalletBalance = async () => {
    try {
      const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_BSC_RPC); // BSC testnet
      const contract = new ethers.Contract(
        import.meta.env.VITE_USDT_CONTRACT,
        USDTABI,
        provider
      );
      const balance = await contract.balanceOf(address);
      const balanceInUSDT = ethers.formatUnits(balance, 18); // Convertir a USDT
      setWalletBalance(parseFloat(balanceInUSDT));
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
    }
  };

  useEffect(() => {
    fetchWalletBalance();
    getUserByWalletAddress(address)
      .then((user) => {
        setUser(user.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [address]);

  const handleChangeAmount = (number: number) => {
    setAmount(number);
  };

  const handleChangeSwapDirection = () => {
    setSwapToLottoWin(!swapToLottoWin);
  };

  const handleSwapToMetamask = async () => {
    setState('loading');
    setError('');

    try {
      if (amount > user.balance) {
        setError('You do not have enough balance');
        setState('');
        setTimeout(() => setError(''), 2000);
        return;
      }
      withdrawUsdt(address, amount).then(() => {
        updateBalance(balance - amount);
        setUser({ ...user, balance: balance - amount });
        setState('success');
        fetchWalletBalance();
      });
    } catch (error) {
      console.error('Transaction failed:', error);
      setError('Transaction failed. Please try again.');
      setState('');
    }

    //Funcionp ara transferir a metamask nuevamente
  };

  const handleSwapToLottoWin = async () => {
    setState('loading');
    setError('');
    if (amount > walletBalance) {
      setError('You do not have enough balance');
      setState('');
      setTimeout(() => setError(''), 2000);
      return;
    }
    try {
      const amountInWei = ethers.parseUnits(amount.toString(), 18);
      writeContract({
        address: USDT_CONTRACT_ADDRESS,
        abi: USDTABI,
        functionName: 'transfer',
        args: [ADMIN_WALLET_ADDRESS, amountInWei],
      });
    } catch (error) {
      console.error('Transaction failed:', error);
      setError('Transaction failed. Please try again.');
      setState('');
    }
  };

  const handleCloseSuccessModal = () => {
    setState('');
  };

  return (
    <>
      {state === 'success' && (
        <SuccessModal onClose={handleCloseSuccessModal}>
          Your transaction was successful.
        </SuccessModal>
      )}
      <div className="w-[100vw] h-[100vh] fixed top-0 flex items-center justify-center z-50 backdrop-blur">
        <div className="w-[500px] max-w-[90vw] bg-[#131F2A] rounded-[20px] grid justify-items-center gap-6 p-10 relative">
          <button
            className="text-white  absolute top-5 right-5 border border-[#fff] rounded-full w-[30px] h-[30px] flex items-center justify-center"
            onClick={onCloseMenu}
          >
            x
          </button>
          <span className="text-[white] text-[20px] ">
            WELCOME TO YOUR LOTTOWIN WALLET
          </span>
          <span className="text-[white] text-[17px] text-center ">
            Here you can move USDT between your Web3 and LottoWin wallet
            instantly. Your LottoWin balance can be used to play instant win
            prizes.
          </span>
          <div
            className={`bg-[#1C3246] w-full rounded-[20px] py-4 px-10 grid grid-cols-[.3fr_1fr] relative ${
              !swapToLottoWin ? 'row-start-5' : ''
            }`}
          >
            <img
              className="w-[50px] col-start-1 "
              src={MetamaskIcon}
              alt="Metamask icon"
            />
            <span className="text-[white] text-[25px]  col-start-2">
              {!swapToLottoWin ? 'To Metamask' : 'From Metamask'}
            </span>
            <span className="text-[#939393] text-[15px] col-start-2 mt-[-15px] ">
              Balance:{' '}
              <span className="text-[#10AC03]">{walletBalance} USDT</span>
            </span>
            {localError && (
              <span className="text-[#FF0000] text-[12px] absolute bottom-0 left-[50%] translate-x-[-59%]">
                {localError}
              </span>
            )}
          </div>

          <button
            onClick={handleChangeSwapDirection}
            className="flex items-center gap-2 bg-[#1C3246] text-white py-2 px-4 rounded-lg hover:bg-[#162836]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-5 h-5"
            >
              <path d="M12 4l-7 7h14l-7-7zM12 20l7-7H5l7 7z" />
            </svg>
          </button>

          <div
            className={`bg-[#1C3246] w-full rounded-[20px] py-4 px-10 grid grid-cols-[.3fr_1fr] ${
              !swapToLottoWin ? 'row-start-3' : ''
            }`}
          >
            <img
              className="w-[50px] col-start-1 "
              src={MetamaskIcon}
              alt="Metamask icon"
            />
            <span className="text-[white] text-[25px]  col-start-2">
              {!swapToLottoWin ? 'From LottoWin' : 'To LottoWin'}
            </span>
            <span className="text-[#939393] text-[15px] col-start-2 mt-[-15px]">
              Balance:{' '}
              <span className="text-[#10AC03]">{user.balance || 0} USDT</span>
            </span>
          </div>
          <div className="bg-[#1C3246] w-full rounded-[20px] py-4 px-10 flex items-center gap-3">
            <img className="w-[25px]" src={NavUSDT} alt="Metamask icon" />
            <input
              className="text-[#939393] text-[15px] bg-transparent border-none  outline-none w-full"
              value={amount}
              placeholder="0 USDT"
              type="number"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div className="w-full flex justify-around">
            <button
              onClick={() => handleChangeAmount(50)}
              className="bg-[#1C3246] rounded-[20px] text-[#939393] text-[15px] px-4 hover:bg-[#131f2a]"
            >
              50
            </button>
            <button
              onClick={() => handleChangeAmount(100)}
              className="bg-[#1C3246] rounded-[20px] text-[#939393] text-[15px] px-4 hover:bg-[#131f2a]"
            >
              100
            </button>
            <button
              onClick={() => handleChangeAmount(250)}
              className="bg-[#1C3246] rounded-[20px] text-[#939393] text-[15px] px-4 hover:bg-[#131f2a]"
            >
              250
            </button>
            <button
              onClick={() => handleChangeAmount(500)}
              className="bg-[#1C3246] rounded-[20px] text-[#939393] text-[15px] px-4 hover:bg-[#131f2a]"
            >
              500
            </button>
            <button
              onClick={() => handleChangeAmount(1000)}
              className="bg-[#1C3246] rounded-[20px] text-[#939393] text-[15px] px-4 hover:bg-[#131f2a]"
            >
              1000
            </button>
          </div>
          {state === 'loading' ? (
            <ButtonSpinner />
          ) : (
            <>
              <button
                className="bg-[#0085FF] rounded-[20px] text-[white] text-[23px] px-7 w-[90%]"
                onClick={
                  swapToLottoWin ? handleSwapToLottoWin : handleSwapToMetamask
                }
                disabled={isPending}
              >
                SWAP
              </button>
              {isConfirmed && (
                <div className="text-[white]">Transaction confirmed.</div>
              )}
              {error && (
                <div className="text-[red]">
                  Error: {(error as unknown as BaseError).shortMessage}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RechargeBalance;
