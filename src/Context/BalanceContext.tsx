import { createContext, useState, useContext, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { createUser } from '../service';

// Define the context value type
interface BalanceContextType {
  balance: number;
  updateBalance: (newBalance: number) => void;
}

// Crear el contexto
const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

// Crear el Provider
import { ReactNode } from 'react';

export const BalanceProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState<number>(0);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      createUser(address)
        .then((res) => {
          window.sessionStorage.setItem('user', JSON.stringify(res));
          setBalance(res.user.balance);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isConnected, address]);

  // Función para actualizar el balance
  const updateBalance = (newBalance: number) => {
    setBalance(newBalance);
  };

  return (
    <BalanceContext.Provider value={{ balance, updateBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error('useBalance must be used within a BalanceProvider');
  }
  return {
    balance: context.balance,
    updateBalance: context.updateBalance,
  };
};
