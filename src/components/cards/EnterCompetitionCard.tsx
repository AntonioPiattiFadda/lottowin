import MisteryBox from '../../assets/mistery-box.svg';
import GoldMedal from '../../assets/gold.svg';
import PlatinumMedal from '../../assets/platinum.svg';
import SilverMedal from '../../assets/silver.svg';
import BronzeMedal from '../../assets/bronze.svg';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { ComponentStatus, Purchases } from '../../types';
import SuccessModal from '../SuccessModal';
import { buyNft, claimPrize, getUserByWalletAddress } from '../../service';
import { stringify } from 'viem';
import Purchase from './Purchase';
import { useBalance } from '../../Context/BalanceContext';
import WonPrizes from '../modal/WonPrizes';
import { DatabaseSpinner } from '../LoaderSpinner';

interface EnterCompetitionCardProps {
  nftQty: number;
  gameId: string;
  onBuyNft: (soldNft: number) => void;
}

const EnterCompetitionCard = ({
  nftQty,
  gameId,
  onBuyNft,
}: EnterCompetitionCardProps) => {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [completeProfileInfoModal, setCompleteProfileInfoModal] =
    useState(false);
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const [status, setStatus] = useState<ComponentStatus>('');
  const [error, setError] = useState('');
  const [purchaseHash, setPurchaseHash] = useState('');
  const [purchase, setPurchase] = useState<Purchases>({} as Purchases);
  const [showNewPurchaseModal, setShowNewPurchaseModal] = useState(false);
  const [showWonPrizesModal, setShowWonPrizesModal] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimedPrizes, setClaimedPrizes] = useState([]);

  const handleClick = () => {
    setShowBuyModal(true);
  };

  const { balance, updateBalance } = useBalance();

  const handleBuyNFT = () => {
    if (!address) return;
    let user;

    getUserByWalletAddress(address).then((res) => {
      user = res.user;
      if (user.email === '' || user.name === '') {
        setCompleteProfileInfoModal(true);
        setShowBuyModal(false);
        return;
      }
      setStatus('loading');
      if (!address) return;
      buyNft(parseInt(gameId), address, nftQty)
        .then((res) => {
          const hash = res.newPurchaseData.hash;
          const newPurchase = {
            id: res.newPurchaseData.id,
            gameId: res.newPurchaseData.gameId,
            hash: res.newPurchaseData.hash,
            nftAmount: res.newPurchaseData.nftAmount,
          };
          updateBalance(balance - nftQty * 50);
          setPurchase(newPurchase);
          setPurchaseHash(hash);
          onBuyNft(nftQty);
          setStatus('success');
        })
        .catch((err) => {
          setStatus('error');
          setError(err.response.data.message);
        });
    });
  };

  const handleCloseSuccessModal = () => {
    setStatus('');
    setShowBuyModal(false);
    setShowNewPurchaseModal(true);
  };

  const handleCloseShowPurchaseModal = () => {
    setShowNewPurchaseModal(false);
  };

  const handleClaimPrize = (id: number) => {
    setClaimLoading(true);
    if (!address) throw new Error('Wallet address is undefined');
    claimPrize(id, address)
      .then((res) => {
        const { claimedPraizes, totalUsdt } = res.reduce(
          (
            acc: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              claimedPraizes: { id: any; name: any; usdt: any }[];
              totalUsdt: number;
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            prize: { dataValues: { id: any; title: any; usdtEquivalence: any } }
          ) => {
            const numberValue = parseFloat(prize.dataValues.usdtEquivalence);
            acc.totalUsdt += numberValue; // Acumula el valor de usdtEquivalence

            acc.claimedPraizes.push({
              id: prize.dataValues.id,
              name: prize.dataValues.title,
              usdt: prize.dataValues.usdtEquivalence,
            });

            return acc;
          },
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            claimedPraizes: [] as { id: any; name: any; usdt: any }[], // Inicialización del array
            totalUsdt: 0, // Inicialización del acumulador
          }
        );

        // Actualizar el balance del usuario
        updateBalance(balance + totalUsdt);

        console.log('claimedPraizes:', claimedPraizes);
        console.log('totalUsdt:', totalUsdt);

        setClaimLoading(false);
        setClaimedPrizes(claimedPraizes);

        setShowWonPrizesModal(true);
      })
      .catch((error) => {
        console.error('error:', error);
        setStatus('error');
        setClaimLoading(false);
        setTimeout(() => {
          setStatus('');
        }, 3000);
      });
  };

  let style;
  let price = 0;
  let saveFee = true;
  const bep = 0;

  switch (nftQty) {
    case 1:
      style = {
        border: '3px solid #0029ff',
        maxWidth: '196px',
      };
      saveFee = false;
      price = 50;
      break;
    case 5:
      style = {
        border: '3px solid #ff8a00',
        maxWidth: '196px',
      };
      price = 250;

      break;
    case 10:
      style = {
        border: '3px solid #cbcbcb',
        maxWidth: '196px',
      };
      price = 500;

      break;
    case 20:
      style = {
        border: '3px solid #fdc407',
        maxWidth: '196px',
      };
      price = 1000;

      break;
    case 50:
      style = {
        border: '3px solid #f5f5f5',
        gridColumn: 'span 2',
      };
      price = 2500;

      break;

    default:
      break;
  }

  return (
    <>
      {claimLoading && <DatabaseSpinner />}
      {showWonPrizesModal && (
        <WonPrizes
          onCloseModal={() => setShowWonPrizesModal(false)}
          claimedPrizes={claimedPrizes}
        />
      )}
      {showNewPurchaseModal && (
        <div
          className="fixed inset-0 flex items-center justify-center  "
          style={{ zIndex: 60 }}
        >
          {' '}
          <button
            onClick={handleCloseShowPurchaseModal}
            className="fixed rounded-full border text-white w-6 h-6 flex items-center justify-center top-[33%] left-[57.5%]"
          >
            X
          </button>
          <Purchase purchase={purchase} onClaimPrize={handleClaimPrize} />
        </div>
      )}
      {completeProfileInfoModal && (
        <div className="w-[100vw] h-[100vh] fixed top-[30%] z-40">
          <div className="w-[400px] max-w-[90vw] bg-[#040F1A] rounded-[20px] flex flex-col items-center justify-center gap-6 relative py-6">
            <button
              className="text-white  absolute top-5 right-5 border border-[#fff] rounded-full w-[30px] h-[30px] flex items-center justify-center"
              onClick={() => setCompleteProfileInfoModal(false)}
            >
              x
            </button>
            <span className="text-[white] text-[18px] text-center mt-10">
              Please complete your profile info first
            </span>
            <button
              onClick={() => {
                window.location.href = '/my-account';
              }}
              className="text-white rounded-full border border-[#01ff2f] px-6 py-1 "
            >
              {/* <img src={MetamaskIcon} alt="Metamask icon" /> */}
              Complete profile
            </button>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div
          className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/50"
          style={{ zIndex: 60 }}
        >
          <div className="bg-red-400 text-white p-6 pr-10 rounded-md relative   max-w-[50vw]">
            {error}
            <div
              onClick={() => setStatus('')}
              className="absolute rounded-[50%] border px-2 top-[10px] right-[10px] cursor-pointer "
            >
              X
            </div>
          </div>
        </div>
      )}
      {status === 'success' && (
        <SuccessModal onClose={handleCloseSuccessModal}>
          You have bought ${stringify(nftQty)} NFT for USDT BEP-$
          {stringify(price)}, game id: {gameId}, hash: {purchaseHash || ''}
        </SuccessModal>
      )}
      {showBuyModal && (
        <div className="w-[100vw] h-[100vh] fixed top-[30%] z-40">
          <div className="w-[400px] max-w-[90vw] bg-[#040F1A] rounded-[20px] flex flex-col items-center justify-center gap-6 relative py-6">
            <button
              className="text-white  absolute top-5 right-5 border border-[#fff] rounded-full w-[30px] h-[30px] flex items-center justify-center"
              onClick={() => setShowBuyModal(false)}
            >
              x
            </button>
            {isConnected ? (
              <>
                <span className="text-[white] text-[18px] text-center mt-10">
                  You are buying {nftQty} NFT for USDT {price}
                </span>

                <img src={MisteryBox} alt="Mistery Box" className="" />

                {status === 'loading' ? (
                  <h2 className="text-white">Loading...</h2>
                ) : (
                  <button
                    onClick={handleBuyNFT}
                    className="text-white rounded-full border border-[#01ff2f] px-6 py-1 "
                  >
                    {/* <img src={MetamaskIcon} alt="Metamask icon" /> */}
                    Buy NFT
                  </button>
                )}
              </>
            ) : (
              <>
                <span className="text-[white] text-[12px] text-center p-10">
                  Please connect your account first to start playing. Click on
                  the wallet icon on the top right corner
                </span>
                <button
                  onClick={() => open()}
                  className="text-white rounded-full border border-[#01ff2f] px-6 py-1 "
                >
                  {/* <img src={MetamaskIcon} alt="Metamask icon" /> */}
                  Connect wallet
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div
        className="bg-[#131F2A] w-full  self-center rounded-[20px] flex flex-col items-center justify-around px-6 h-[196px] relative"
        style={style}
      >
        {nftQty === 20 && (
          <img
            src={GoldMedal}
            alt="Medal"
            className="absolute top-[2%] left-[2%] sd:w-12 w-8 "
          />
        )}
        {nftQty === 50 && (
          <img
            src={PlatinumMedal}
            alt="Medal"
            className="absolute top-[2%] left-[2%] w-16 "
          />
        )}
        {nftQty === 10 && (
          <img
            src={SilverMedal}
            alt="Medal"
            className="absolute top-[2%] left-[2%] sd:w-12 w-8"
          />
        )}
        {nftQty === 5 && (
          <img
            src={BronzeMedal}
            alt="Medal"
            className="absolute top-[2%] left-[2%] sd:w-8 "
          />
        )}
        {nftQty > 50 && (
          <span className="absolute top-[2%] left-[2%] w-10 "></span>
        )}
        <span className="text-[white] text-[25px] ">{nftQty}NFT</span>
        <img src={MisteryBox} alt="Mistery Box" className="h-[80%]" />
        <button
          onClick={handleClick}
          className="bg-[#0085FF] rounded-[20px] text-[white] text-[23px] px-7  w-[140px] max-w-[98%] "
        >
          BUY
        </button>
        <span className="text-[#FFE600] text-[8px]">
          PRICE {price} {saveFee && 'SAVE FEE'} USDT BEP-{bep}
        </span>
      </div>
    </>
  );
};

export default EnterCompetitionCard;
