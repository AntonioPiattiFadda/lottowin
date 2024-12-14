export type GameSizes = 'big' | 'medium' | 'small';

export interface ActivityData {
  title: string;
  id: number;
  image: string;
  ntfAdquired: number;
  tx_id: string;
  created_at: string;
  url: string;
}

export interface ChatMessageType {
  id: number;
  message: string;
  createdAt: Date;
  sender: {
    image: string;
    name: string;
  };
}

export type ComponentStatus = 'success' | 'error' | '' | 'loading';

export interface EnterCompetitionCard {
  ntfQty: number;
  saveFee: boolean;
  bep: number;
  price: number;
}

export type GameType = {
  id: number;
  title: string;
  image: string;
  description: string;
  nftAmount: number;
  contractAddress: string;
  soldNft: number;
  size: GameSizes;
  commingSoon: boolean;
  prizes: Prizes[];
};

export interface NewChatMessageType {
  message: string;
  sender: {
    id: number;
    image: string;
    name: string;
  };
}

export interface Prizes {
  id: number;
  title: string;
  image: string;
  description: string;
  usdtEquivalence: number;
  created_at: string;
  commingSoon: boolean;
  stock: number;
  chance: number;
  gameId: number;
  winner: number;
}

export interface Purchases {
  id: number;
  gameId: number;
  hash: string;
  nftAmount: number;
}

export interface User {
  id: number;
  name: string;
  image: string;
  walletAddress: string;
  email: string;
  balance: number;
  activities: ActivityData[];
}

export interface UpdateUser {
  name?: string;
  image?: string;
  email?: string;
  balance?: number;
}
