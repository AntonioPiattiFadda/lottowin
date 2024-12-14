import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConnectWallet from '../assets/connect-wallet.svg';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import { createRefferedUser } from '../service';

const Reffered = () => {
  const { refferalId } = useParams<{ refferalId: string }>();
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isConnected) {
      if (!address) return;
      if (!refferalId) return;
      createRefferedUser({ walletAddress: address, refferalId })
        .then((res) => {
          window.sessionStorage.setItem('user', JSON.stringify(res));
          setMessage('Wallet connected successfully!');
          navigate('/');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [address, isConnected, navigate, refferalId]);

  const handleConnectWallet = () => {
    open();
    setMessage('Please connect your wallet to enjoy the benefits.');
  };

  return (
    <div className="bg-black flex flex-col items-center justify-center min-h-screen text-white p-5">
      <h2 className="text-2xl mb-4">
        You have been referred by ID: {refferalId}
      </h2>
      <p className="text-lg mb-4">
        To take advantage of the benefits, please connect your wallet.
      </p>

      <button
        className="text-white rounded-full border border-[#01ff2f] px-6 py-1 flex gap-2"
        onClick={handleConnectWallet}
      >
        <img src={ConnectWallet} alt="Connect Wallet" className="w-5 h-5" />
        Connect Wallet
      </button>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Reffered;
