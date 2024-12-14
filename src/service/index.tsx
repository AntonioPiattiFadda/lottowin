import axios from 'axios';
import { NewChatMessageType } from '../types';

const API_URL = 'http://localhost:3000';
const VERSION = 'v1';

export const addContractFounds = async (gameId: string, amount: number) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/${VERSION}/blockchain/add-funds/${gameId}`,
      { amount }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const widhdrawContractFounds = async (gameId: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/${VERSION}/blockchain/withdraw-funds/${gameId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const buyNft = async (
  gameId: number,
  walletAddress: string,
  ntfQty: number
) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/${VERSION}/blockchain/${walletAddress}/ticket`,
      {
        gameId,
        ntfQty,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const withdrawUsdt = async (walletAddress: string, amount: number) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/${VERSION}/blockchain/${walletAddress}/withdraw`,
      {
        amount,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createUser = async (walletAddress: string) => {
  const newUser = {
    walletAddress,
    image:
      'https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png',
  };

  try {
    const response = await axios.post(
      `${API_URL}/api/${VERSION}/users`,
      newUser
    );

    // Si el usuario fue creado exitosamente, devolver el usuario con `isNewUser: true`
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createRefferedUser = async ({
  walletAddress,
  refferalId,
}: {
  walletAddress: string;
  refferalId: string;
}) => {
  const newUser = {
    walletAddress,
    image:
      'https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png',
    referredBy: refferalId,
  };
  try {
    const response = await axios.post(
      `${API_URL}/api/${VERSION}/users`,
      newUser
    );
    console.log(response.data);

    // Si el usuario fue creado exitosamente, devolver el usuario con `isNewUser: true`
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createGame = async (data: any) => {
  const contractAddress = '0x123456789';
  try {
    const response = await axios.post(`${API_URL}/api/${VERSION}/games`, {
      ...data,
      soldNft: 0,
      contractAddress,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const claimPrize = async (id: number, address: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/${VERSION}/blockchain/claim-prize/${id}/${address}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteGame = async (gameId: number) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/${VERSION}/games/${gameId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getChatMessages = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/${VERSION}/chats`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getGames = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/${VERSION}/games`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPrizeByGameIdAndPrizeTitle = async (
  gameId: number,
  prizeId: number
) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/${VERSION}/prizes/${gameId}/${prizeId}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserPurchases = async (userWallet: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/${VERSION}/purchases/user-purchases/${userWallet}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserRevenues = async (userId: number) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/${VERSION}/purchases/user-revenues/${userId}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getGameById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/${VERSION}/games/${id}`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPurchases = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/${VERSION}/purchases`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRefferedUsers = async (walletAddress: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/${VERSION}/referrals/${walletAddress}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserByWalletAddress = async (walletAddress: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/${VERSION}/users/${walletAddress}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postNewChatMessages = async (newChat: NewChatMessageType) => {
  const newChatFormated = {
    senderId: newChat.sender.id,
    message: newChat.message,
  };

  try {
    const response = await axios.post(
      `${API_URL}/api/${VERSION}/chats`,
      newChatFormated
    );
    return response.data;
  } catch (error) {
    console.log('error:', error);

    console.error(error);
    throw error;
  }
};

export const updateUser = async (walletAddress: string, formData: FormData) => {
  try {
    const response = await axios.patch(
      `${API_URL}/api/${VERSION}/users/${walletAddress}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Importante para el envío de archivos
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

export const updateRevenue = async (walletAddress: string) => {
  try {
    const response = await axios.patch(
      `${API_URL}/api/${VERSION}/users/revenue/${walletAddress}`,

      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

export const updateGameComingSoon = async (
  gameId: number,
  commingSoon: boolean
) => {
  try {
    const response = await axios.patch(
      `${API_URL}/api/${VERSION}/games/${gameId}`,
      {
        commingSoon: commingSoon,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
