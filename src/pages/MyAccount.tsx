import MisteryBox from '../assets/mistery-box.svg';
import EditProfilePhoto from '../assets/edit-profile-photo.svg';
import { useEffect, useRef, useState } from 'react';
import { useAccount } from 'wagmi';
import {
  claimPrize,
  getUserByWalletAddress,
  getUserPurchases,
  updateUser,
} from '../service';
import { ComponentStatus, Purchases, UpdateUser, User } from '../types';
import SuccessModal from '../components/SuccessModal';
import ArrowRight from '../assets/arrow-right.svg';
import WonPrizes from '../components/modal/WonPrizes';
import Purchase from '../components/cards/Purchase';
import { useBalance } from '../Context/BalanceContext';

const PROD_LINK = import.meta.env.VITE_PROD_LINK;

const MyAccount = () => {
  const [user, setUser] = useState<User>({} as User);
  const [state, setState] = useState<ComponentStatus>('loading');
  const [photoFile, setPhotoFile] = useState<File>();
  const [photoUrl, setPhotoUrl] = useState<string>(''); // Para almacenar la URL de la imagen
  const [claimLoading, setClaimLoading] = useState<boolean>(false);
  const [purchases, setPurchases] = useState<Purchases[]>([]);
  const [updateUserInfo, setUpdateUserInfo] = useState({} as UpdateUser);
  const [claimedPrizes, setClaimedPrizes] = useState([
    {
      id: 0,
      name: '',
      usdt: 0,
    },
  ]);
  const [showClaimedPrizes, setShowClaimedPrizes] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (!address) return;
    getUserPurchases(address)
      .then((res) => {
        console.log(res);

        const filteredRes = res.filter(
          (purchase: { claimed: boolean }) => purchase.claimed === false
        );
        setPurchases(filteredRes);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [address]);

  const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setPhotoFile(file);
      setPhotoUrl(URL.createObjectURL(file)); // Crear URL temporal
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      getUserByWalletAddress(address)
        .then((user) => {
          setState('');
          setUser(user.user);
          setPhotoUrl(`${PROD_LINK}${user.user.image}`);
        })
        .catch((error) => {
          console.error('error:', error);
        });
    }
  }, [address, isConnected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUserInfo({
      ...updateUserInfo,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('loading');

    // Crear un FormData para enviar la imagen y otros datos
    const formData = new FormData();
    if (photoFile) {
      formData.append('image', photoFile);
    }
    if (updateUserInfo.name) {
      formData.append('name', updateUserInfo.name);
    }
    if (updateUserInfo.email) {
      formData.append('email', updateUserInfo.email);
    }

    try {
      if (!address) throw new Error('Wallet address is undefined');
      const updatedUser = await updateUser(address, formData);
      window.sessionStorage.removeItem('user');
      window.sessionStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setState('success');
      setTimeout(() => {
        setState('');
      }, 2000);
    } catch (error) {
      console.error('error:', error);
      setState(''); // Manejar estado de error si es necesario
    }
  };

  const handleCloseSuccessModal = () => {
    setState('');
  };
  const { balance, updateBalance } = useBalance();

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


        setClaimLoading(false);
        setClaimedPrizes(claimedPraizes);
        setPurchases(() => {
          return purchases.filter((purchase) => purchase.id !== id);
        });
        setShowClaimedPrizes(true);
      })
      .catch((error) => {
        console.error('error:', error);
        setState('error');
        setClaimLoading(false);
        setTimeout(() => {
          setState('');
        }, 3000);
      });
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: 0,
        left: -250, // Ajusta este valor según el ancho de tus cajas
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: 0,
        left: 250, // Ajusta este valor según el ancho de tus cajas
        behavior: 'smooth',
      });
    }
  };

  const handleCloseModal = () => {
    setShowClaimedPrizes(false);
  };

  return (
    <div className="bg-black flex flex-col items-center min-h-[100vh] gap-4 p-14 relative">
      {showClaimedPrizes && (
        <WonPrizes
          onCloseModal={handleCloseModal}
          claimedPrizes={claimedPrizes}
        />
      )}
      {claimLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="loader border-t-transparent border-white border-2 w-4 h-4 rounded-full animate-spin"></div>
        </div>
      )}
      {state === 'success' && (
        <SuccessModal onClose={handleCloseSuccessModal}>
          Your profile has been updated successfully!
        </SuccessModal>
      )}

      {state === 'error' && (
        <div
          className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/50  "
          style={{ zIndex: 60 }}
        >
          <div className="bg-red-400 text-white p-6 pr-10 rounded-md relative">
            Sorry... There was an error claiming the prize. Try again later...
            <div className="absolute rounded-[50%] border px-2 top-[10px] right-[10px] cursor-pointer ">
              X
            </div>
          </div>
        </div>
      )}
      <div className="relative w-[200px] self-center flex justify-center">
        <div className="bg-[#D9D9D9] w-[150px] h-[150px] rounded-[50%] z-10 overflow-hidden">
          <img src={photoUrl || user.image} alt="" />
        </div>

        <img
          src={EditProfilePhoto}
          alt="Edit Photo"
          className="absolute top-0 right-0 z-10 " // Tamaño del ícono
        />

        <input
          type="file"
          onChange={handleChangePhoto}
          className="absolute top-0 right-0 z-20 w-[40px] h-[40px] opacity-0 cursor-pointer"
        />
      </div>
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex flex-col items-center my-10"
      >
        <span className="text-[22px] text-[white]  mb-10">
          NICKNAME: {user.name}
        </span>
        <span className="text-[22px] text-[white]   mb-10">
          WALLET: {user.walletAddress}
        </span>
        <input
          className="text-[22px] text-[#FFFF] placeholder-shown:border-gray-500  p-4 rounded-[20px] bg-[#131F2A] my-4 max-w-[80vw]"
          type="text"
          id="name"
          placeholder={user.name ? `NICKNAME: ${user.name}` : 'NICKNAME:'}
          onChange={(e) => handleChange(e)}
        />
        <input
          className="text-[22px] text-[#FFFF]  p-4 rounded-[20px] bg-[#131F2A] my-4 max-w-[80vw]"
          type="text"
          id="email"
          placeholder={user.email ? `EMAIL: ${user.email}` : 'EMAIL:'}
          onChange={(e) => handleChange(e)}
        />
        {state === 'loading' ? (
          <button className=" relative flex items-center justify-center text-[22px] text-[#FFFF]  p-4 rounded-[20px] bg-[#131F2A] my-2 max-w-[80vw] hover:bg-[#1E2D3A] transition-all">
            <div className="loader border-t-transparent border-white border-2 w-4 h-4 rounded-full animate-spin mr-2"></div>
            Loading...
          </button>
        ) : (
          <button className="text-[22px] text-[#FFFF]  p-4 rounded-[20px] bg-[#131F2A] my-2 max-w-[80vw] hover:bg-[#1E2D3A] transition-all">
            SAVE
          </button>
        )}
      </form>
      {state !== 'loading' && (
        <div>
          <h1
            style={{
              borderBottom: '2px solid #fff',
            }}
            className="text-[30px] text-center text-[white]  "
          >
            NFTS OWNED
          </h1>
          <div className="flex items-center">
            <button
              onClick={scrollLeft}
              className="mr-2 text-white h-[40px] flex items-center justify-center text-2xl"
            >
              <img src={ArrowRight} alt="Arrow Right" className="rotate-180" />
            </button>
            <div className="flex overflow-hidden w-[1100px]">
              {' '}
              {/* Ajusta el ancho para mostrar 3 cajas */}
              <div
                ref={scrollRef}
                className={`${
                  purchases.length > 3 ? ' pl-[500px]' : 'pl-[40px]'
                } flex justify-center overflow-scroll w-[100%] gap-6`}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {purchases.length === 0 && (
                  <div className="bg-[#131F2A] min-w-[364px] max-w-[364px] h-[364px] rounded-[20px] flex flex-col justify-between items-center p-6 my-6">
                    <p className="text-[30px] text-center text-[white]">
                      You don't have any NFTs
                    </p>
                    <img
                      src={MisteryBox}
                      alt="Mistery Box"
                      className="h-[70%]"
                    />
                  </div>
                )}
                {purchases.map((purchase) => (
                  <Purchase
                    key={purchase.id}
                    purchase={purchase}
                    onClaimPrize={handleClaimPrize}
                  />
                ))}
              </div>
            </div>
            <button onClick={scrollRight} className="ml-2  text-white">
              <img src={ArrowRight} alt="Arrow Right" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
