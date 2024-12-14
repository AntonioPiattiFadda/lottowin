import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

import { WagmiProvider } from 'wagmi';
import { bscTestnet } from 'wagmi/chains'; // Importa la red BSC
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = '349f5cd16aae6d68750d2b3585fb73c0';

// 2. Create wagmiConfig
const metadata = {
  name: 'Lottowin',
  description: 'Lottowin',
  url: 'http://localhost:5173/', // Asegúrate de que coincide con tu dominio
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

// 3. Configura solo la red BSC
const chains = [bscTestnet] as const; // Solo permite la red Binance Smart Chain (BSC)
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  auth: {
    email: false, // default to true
    socials: [],
    showWallets: true, // default to true
    walletFeatures: true, // default to true
  },
});

// 4. Create modal
createWeb3Modal({
  defaultChain: bscTestnet,
  metadata,
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Opcional - defaults to your Cloud configuration
  enableSwaps: false,
  enableOnramp: false,
  allowUnsupportedChain: false,
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
    '19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927',
    'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',
  ],
  excludeWalletIds: [
    'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393',
  ],
  allWallets: 'HIDE',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AppKitProvider({ children }: any) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
