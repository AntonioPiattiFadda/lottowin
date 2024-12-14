import { ChangeEvent, useState } from 'react';
import { createGame } from '../service';
import { gameSchema } from '../Validator';
import { ZodError } from 'zod';
import SuccessModal from '../components/SuccessModal';
import { createChances } from '../utils';
import { ComponentStatus } from '../types';
import { Link } from 'react-router-dom';
import { DatabaseSpinner } from '../components/LoaderSpinner';

const AdminPanel = () => {
  const [gameData, setGameData] = useState({
    title: '',
    description: '',
    image: '',
    size: '',
    commingSoon: false,
    prizes: [
      {
        title: '',
        description: '',
        stock: 0,
        usdtEquivalence: 0,
      },
    ],
  });
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<ZodError | null>(null);
  const [componentState, setComponentState] = useState<ComponentStatus>('');

  const handleGameChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as
      | HTMLInputElement
      | HTMLSelectElement;
    const checked = (e.target as HTMLInputElement).checked;
    setGameData({
      ...gameData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePrizeChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'stock' || name === 'usdtEquivalence') {
      const updatedPrizes = gameData.prizes.map((prize, i) =>
        i === index ? { ...prize, [name]: Number(value) } : prize
      );
      setGameData({ ...gameData, prizes: updatedPrizes });
      return;
    }

    const updatedPrizes = gameData.prizes.map((prize, i) =>
      i === index ? { ...prize, [name]: value } : prize
    );
    setGameData({ ...gameData, prizes: updatedPrizes });
  };

  const addPrize = () => {
    setGameData({
      ...gameData,
      prizes: [
        ...gameData.prizes,
        {
          title: '',
          description: '',
          stock: 0,
          usdtEquivalence: 0,
        },
      ],
    });
  };

  const removePrize = (index: number) => {
    const updatedPrizes = gameData.prizes.filter((_, i) => i !== index);
    setGameData({ ...gameData, prizes: updatedPrizes });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const newGame = createChances(gameData);
      gameSchema.parse(newGame);
      setComponentState('loading');
      createGame(newGame)
        .then(() => {
          setComponentState('success');
          setTimeout(() => {
            setComponentState('');
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setComponentState('error');
          setTimeout(() => {
            setComponentState('');
          }, 2000);
        });
    } catch (err) {
      if (err instanceof ZodError) {
        console.log(err);
        setErrors(err);
        setTimeout(() => {
          setErrors(null);
        }, 2000);
        return;
      }
      console.error(err);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccess(!success);
  };

  return (
    <div className="bg-black flex items-center justify-center min-h-[100vh] min-w-[100vw] overflow-y-auto">
      {componentState === 'loading' && <DatabaseSpinner />}
      {componentState === 'success' && (
        <SuccessModal onClose={handleCloseSuccessModal}>
          Game created successfully!
        </SuccessModal>
      )}
      <div className="w-full max-w-[80vw] p-10 bg-[#131F2A] rounded-lg shadow-md">
        <h2 className="text-[30px] text-center text-[white] mb-8">
          Admin Panel - Create Game
        </h2>
        <Link to={'/admin'}>
          <button className="mb-4 bg-green-500 text-white px-4 py-2 rounded">
            View All Games
          </button>
        </Link>
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-6 gap-4">
            <div className="flex flex-col mb-4 ">
              <label className="text-[22px] text-[white]">Game Title:</label>
              <input
                type="text"
                name="title"
                value={gameData.title}
                onChange={handleGameChange}
                className={`${
                  errors &&
                  errors.issues.some((issue) => {
                    return issue.path[0] === 'title';
                  })
                    ? 'border-red-500 border-[3px] p-3'
                    : ''
                } text-[18px] text-[#FFFF] p-3 rounded-[10px] bg-[#1E2D3A]`}
              />
            </div>

            <div className="flex flex-col mb-4 ">
              <label className="text-[22px] text-[white]">Description:</label>
              <textarea
                name="description"
                value={gameData.description}
                onChange={handleGameChange}
                className={`${
                  errors &&
                  errors.issues.some((issue) => {
                    return issue.path[0] === 'description';
                  })
                    ? 'border-red-500 border-[3px] p-3'
                    : ''
                } text-[18px] text-[#FFFF] p-3 rounded-[10px] bg-[#1E2D3A]`}
              />
            </div>

            <div className="flex flex-col mb-4 ">
              <label className="text-[22px] text-[white]">Image URL:</label>
              <input
                type="text"
                name="image"
                value={gameData.image}
                onChange={handleGameChange}
                className={`${
                  errors &&
                  errors.issues.some((issue) => {
                    return issue.path[0] === 'image';
                  })
                    ? 'border-red-500 border-[3px] p-3'
                    : ''
                } text-[18px] text-[#FFFF] p-3 rounded-[10px] bg-[#1E2D3A]`}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-[22px] text-[white]">Size:</label>
              <select
                name="size"
                value={gameData.size}
                onChange={handleGameChange}
                className={`${
                  errors &&
                  errors.issues.some((issue) => {
                    return issue.path[0] === 'size';
                  })
                    ? 'border-red-500 border-[3px] p-3'
                    : ''
                } text-[18px] text-[#FFFF] p-3 rounded-[10px] bg-[#1E2D3A]`}
              >
                <option value="">Select Size</option>
                <option value="big">Big</option>
                <option value="medium">Medium</option>
                <option value="small">Small</option>
              </select>
            </div>

            <div className="flex items-center mb-4">
              <label className="text-[22px] text-[white] mr-4">
                Coming Soon:
              </label>
              <input
                type="checkbox"
                name="commingSoon"
                checked={gameData.commingSoon}
                onChange={handleGameChange}
                className="text-[18px] p-2 bg-[#1E2D3A] rounded-[10px]"
              />
            </div>
          </div>

          <h3 className="text-[22px] text-[white] mb-4 w-full">
            Prizes (Prizes must have different titles)
          </h3>
          {gameData.prizes.map((prize, index) => (
            <div
              key={index}
              className="bg-[#1E2D3A] p-6 pt-10 rounded-[10px] mb-4 grid grid-cols-6 gap-4 relative"
            >
              <h2 className="absolute right-[50%] top-[10px] text-[white]">
                Price number {index + 1}
              </h2>
              <div className="flex flex-col mb-4">
                <label className="text-[18px] text-[white]">Prize Title:</label>
                <input
                  type="text"
                  name="title"
                  value={prize.title}
                  onChange={(e) => handlePrizeChange(index, e)}
                  className={`${
                    errors &&
                    errors.issues.some((issue) => {
                      // Validación para el título en el índice correspondiente
                      return (
                        issue.path[2] === 'title' && issue.path[1] === index
                      ); // Ajusta según la estructura de `path`
                    })
                      ? 'border-red-500 border-[3px] p-3'
                      : ''
                  } text-[18px] text-[#FFFF] p-3 rounded-[10px] bg-[#2B3D4F]`}
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="text-[18px] text-[white]">
                  Prize Description:
                </label>
                <textarea
                  name="description"
                  value={prize.description}
                  onChange={(e) => handlePrizeChange(index, e)}
                  className={`${
                    errors &&
                    errors.issues.some((issue) => {
                      // Validación para el título en el índice correspondiente
                      return (
                        issue.path[2] === 'description' &&
                        issue.path[1] === index
                      ); // Ajusta según la estructura de `path`
                    })
                      ? 'border-red-500 border-[3px] p-3'
                      : ''
                  } text-[18px] text-[#FFFF] p-3 rounded-[10px] bg-[#2B3D4F]`}
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="text-[18px] text-[white]">Stock:</label>
                <input
                  type="number"
                  name="stock"
                  value={prize.stock}
                  onChange={(e) => handlePrizeChange(index, e)}
                  className={`${
                    errors &&
                    errors.issues.some((issue) => {
                      // Validación para el título en el índice correspondiente
                      return (
                        issue.path[2] === 'stock' && issue.path[1] === index
                      ); // Ajusta según la estructura de `path`
                    })
                      ? 'border-red-500 border-[3px] p-3'
                      : ''
                  } text-[18px] text-[#FFFF] p-3 rounded-[10px] bg-[#2B3D4F]`}
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="text-[18px] text-[white]">
                  USDT Equivalence:
                </label>
                <input
                  type="number"
                  name="usdtEquivalence"
                  value={prize.usdtEquivalence}
                  onChange={(e) => handlePrizeChange(index, e)}
                  className={`${
                    errors &&
                    errors.issues.some((issue) => {
                      // Validación para el título en el índice correspondiente
                      return (
                        issue.path[2] === 'usdtEquivalence' &&
                        issue.path[1] === index
                      ); // Ajusta según la estructura de `path`
                    })
                      ? 'border-red-500 border-[3px] p-3'
                      : ''
                  } text-[18px] text-[#FFFF] p-3 rounded-[10px] bg-[#2B3D4F]`}
                />
              </div>

              <button
                type="button"
                onClick={() => removePrize(index)}
                disabled={componentState === 'loading'}
                className="text-[red] text-[18px] hover:text-[darkred]"
              >
                Remove Prize
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addPrize}
            disabled={componentState === 'loading'}
            className="text-[18px] text-[#4CAF50] hover:text-[#66BB6A] mr-4"
          >
            Add Prize
          </button>

          <button
            type="submit"
            disabled={componentState === 'loading'}
            className="mt-6 bg-[#4CAF50] text-[white] p-4 rounded-[10px] hover:bg-[#66BB6A] w-[150px] h-[52px]"
          >
            Create Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
