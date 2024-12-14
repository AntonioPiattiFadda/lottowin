import { useRef } from 'react';
import { GameType } from '../types';
import HomePricesCard from './cards/HomePricesCard';
import ArrowRight from '../assets/arrow-right.svg';
import './scrollHide.css';

interface SmallPricesProps {
  smallPrizes: GameType[];
}

const SmallPrices = ({ smallPrizes }: SmallPricesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      // Verifica la posición actual del scroll y el ancho total del contenido
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

      // Si el scroll ha llegado al final, vuelve al inicio
      if (scrollLeft + clientWidth >= scrollWidth) {
        containerRef.current.scrollLeft = 0;
      } else {
        containerRef.current.scrollLeft += 315;
      }
    }
  };

  return (
    <section className="px-5 flex flex-col gap-6 relative">
      <h1 className="text-[30px] text-[white] ">SMALL PRICES</h1>
      <div
        style={{
          scrollBehavior: 'smooth',
        }}
        ref={containerRef}
        className="flex flex-col gap-6 lg:flex-row lg:max-w-[60vw] overflow-x-scroll snap-none	mb-4 scrollbar-hide "
      >
        {' '}
        {smallPrizes.map((game) => (
          <HomePricesCard key={game.id} game={game} />
        ))}
      </div>
      <button
        className="scroll-button text-white absolute top-1/2 right-[-10%] transform -translate-y-1/4 p-2 hidden lg:flex"
        onClick={handleScroll}
      >
        <img src={ArrowRight} alt="Arrow Right" />
      </button>
    </section>
  );
};

export default SmallPrices;
