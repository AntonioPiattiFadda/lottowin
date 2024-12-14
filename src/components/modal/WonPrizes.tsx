import { useState } from 'react';

interface WonPrizesProps {
  claimedPrizes: {
    id: number;
    name: string;
    usdt: number;
  }[];
  onCloseModal: () => void;
}

const WonPrizes = ({ claimedPrizes, onCloseModal }: WonPrizesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? claimedPrizes.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === claimedPrizes.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="relative bg-gradient-to-br from-purple-600 to-blue-500 p-8 rounded-lg shadow-lg text-center text-white max-w-lg">
        {/* Botón de Cerrar */}
        <button
          onClick={onCloseModal}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-full"
        >
          ✕
        </button>

        {/* Título de Felicitaciones */}
        <h2 className="text-4xl font-bold mb-4">🎉 Congratulations! 🎉</h2>
        <p className="text-lg mb-6">
          You've won some amazing prizes! Check out what you've claimed below:
        </p>

        <div className="flex items-center justify-center gap-4 py-6">
          {/* Botón Anterior */}
          <button
            onClick={handlePrev}
            className="bg-white text-gray-800 hover:bg-gray-200 font-bold py-2 px-4 rounded-full"
          >
            {'<'}
          </button>

          {/* Carrusel */}
          <div className="w-64 overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {claimedPrizes.map((prize) => (
                <div
                  key={prize.id}
                  className="flex-shrink-0 w-64 text-center p-4 bg-white bg-opacity-20 rounded-lg"
                >
                  <h3 className="text-2xl font-semibold text-yellow-300">
                    {prize.name}
                  </h3>
                  <p className="text-lg mt-2 font-bold">💰 {prize.usdt} USDT</p>
                </div>
              ))}
            </div>
          </div>

          {/* Botón Siguiente */}
          <button
            onClick={handleNext}
            className="bg-white text-gray-800 hover:bg-gray-200 font-bold py-2 px-4 rounded-full"
          >
            {'>'}
          </button>
        </div>

        {/* Mensaje Final */}
        <p className="mt-6 text-lg">
          Keep playing for more chances to win awesome prizes!
        </p>
      </div>
    </div>
  );
};

export default WonPrizes;
