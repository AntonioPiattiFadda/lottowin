import { useState } from 'react';
// import { addContractFounds, widhdrawContractFounds } from '../service';
import { ComponentStatus, GameType } from '../types';
import { DatabaseSpinner } from './LoaderSpinner';
import SuccessModal from './SuccessModal';

interface GameCardProps {
  game: GameType;
  handleComingSoonToggle: (id: string) => void;
  setGameToDelete: (id: number) => void;
  setModalOpen: (open: boolean) => void;
}

const GameCard: React.FC<GameCardProps> = ({
  game,
  handleComingSoonToggle,
  setGameToDelete,
  setModalOpen,
}) => {
  // const [gameFounds, setGameFounds] = useState<number>(0);
  const [componentState, setComponentState] = useState<ComponentStatus>('');

  // const handleAddContractFounds = () => {
  //   setComponentState('loading');

  //   if (gameFounds <= 0) {
  //     return;
  //   }
  //   addContractFounds(game.id.toString(), gameFounds)
  //     .then(() => {
  //       setComponentState('success');
  //       setTimeout(() => {
  //         setComponentState('');
  //       }, 3000);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setComponentState('error');
  //       setTimeout(() => {
  //         setComponentState('');
  //       }, 3000);
  //     });
  // };

  // const handleWithdrawContractFounds = () => {
  //   widhdrawContractFounds(game.id.toString())
  //     .then(() => {
  //       alert('Contract Founds withdraw');
  //       setComponentState('');
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setComponentState('error');
  //       setTimeout(() => {
  //         setComponentState('');
  //       }, 3000);
  //     });
  // };

  const handleCloseSuccessModal = () => {
    setComponentState('');
  };

  return (
    <>
      {componentState === 'loading' && <DatabaseSpinner />}
      {componentState === 'success' && (
        <SuccessModal onClose={handleCloseSuccessModal}>
          Successfull transaction!
        </SuccessModal>
      )}

      <div
        key={game.id}
        className="bg-[#1E2D3A] p-6 rounded-[10px] relative min-w-[350px]"
      >
        <h3 className="text-[22px] text-white">Title: {game.title}</h3>
        <p className="text-[14px] text-white">
          Contract Address: {game.contractAddress || 'N/A'}
        </p>

        <p className="text-[18px] text-[#FFFF]">
          Description: {game.description}
        </p>
        <p className="text-[18px] text-[#FFFF]">Size: {game.size}</p>
        <p className="text-[18px] text-[#FFFF]">
          Coming Soon: {game.commingSoon ? 'Yes' : 'No'}
        </p>
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
          onClick={() => handleComingSoonToggle(game.id.toString())}
        >
          Toggle Coming Soon
        </button>
        {/* <div className="flex gap-2 items-center">
          <input
            value={gameFounds}
            onChange={(e) => setGameFounds(Number(e.target.value))}
            className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
            type="number"
          />
          <button onClick={handleAddContractFounds} className="text-white">
            Add Contract Founds
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={handleWithdrawContractFounds}
            className="text-white border rounded-[12px] p-2 border-white mt-2 hover:bg-white hover:text-black"
          >
            Withdraw Contract Founds
          </button>
        </div> */}
        <button
          className="mt-2 bg-red-500 text-white px-2 py-1 rounded absolute top-2 right-2"
          onClick={() => {
            setGameToDelete(game.id);
            setModalOpen(true);
          }}
        >
          &#10006; {/* Cruz para eliminar */}
        </button>
        {componentState === 'error' && (
          <span className="mt-2 bg-red-500 text-white px-2 py-1 rounded absolute bottom-2 right-2">
            There was an error
          </span>
        )}
      </div>
    </>
  );
};

export default GameCard;
