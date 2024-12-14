import { useEffect, useState } from 'react';
import { GameType } from '../types';
import { deleteGame, getGames, updateGameComingSoon } from '../service'; // Asegúrate de tener la función deleteGame en tu servicio
import { Link } from 'react-router-dom';
import { PageSpinner } from '../components/LoaderSpinner';
import DeleteGameModal from '../components/modal/DeleteGameModal'; // Asegúrate de tener un componente Modal
import GameCard from '../components/GameCard';

const ViewGames = () => {
  const [games, setGames] = useState<GameType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [gameToDelete, setGameToDelete] = useState<number | null>(null); // ID del juego a eliminar

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const fetchedGames = await getGames();
        setGames(fetchedGames);
      } catch (err) {
        console.error(err);
        setError('Error fetching games');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleComingSoonToggle = async (gameId: string) => {
    setLoading(true);
    const commingSoon = !games.find((game) => game.id === Number(gameId))
      ?.commingSoon;
    try {
      const updatedGame = await updateGameComingSoon(
        Number(gameId),
        commingSoon
      );
      setGames((prevGames) =>
        prevGames.map((game) =>
          game.id === Number(gameId)
            ? { ...game, commingSoon: updatedGame.commingSoon }
            : game
        )
      );
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Error updating game status');
      setLoading(false);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  const handleDeleteGame = async () => {
    if (gameToDelete) {
      setLoading(true);
      try {
        await deleteGame(gameToDelete); // Asegúrate de que esta función esté implementada
        setGames((prevGames) =>
          prevGames.filter((game) => game.id !== gameToDelete)
        );
        setModalOpen(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError('Error deleting game');
        setTimeout(() => {
          setError('');
        }, 2000);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <PageSpinner />;
  }

  return (
    <div className="bg-black flex flex-col items-center justify-center min-h-[100vh] min-w-[100vw] overflow-y-auto">
      <div className="w-full max-w-[80vw] p-10 bg-[#131F2A] rounded-lg shadow-md">
        <h2 className="text-[30px] text-center text-[white] mb-8">
          Existing Games
        </h2>
        <Link to={'/create-games'}>
          <button className="mb-4 bg-green-500 text-white px-4 py-2 rounded">
            Add Game
          </button>
          {error && <div className="text-red-500">{error}</div>}
        </Link>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {games.map((game) => {
            return (
              <GameCard
                key={game.id}
                game={game}
                handleComingSoonToggle={handleComingSoonToggle}
                setGameToDelete={setGameToDelete}
                setModalOpen={setModalOpen}
              />
            );
          })}
        </div>
      </div>
      {modalOpen && (
        <DeleteGameModal onClose={() => setModalOpen(false)}>
          <h3 className="text-lg">
            Are you sure you want to delete this game?
          </h3>
          <div className="flex justify-around mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleDeleteGame}
            >
              Yes, Delete
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </DeleteGameModal>
      )}
    </div>
  );
};

export default ViewGames;
