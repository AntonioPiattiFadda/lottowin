import { useEffect, useRef, useState } from 'react';
import SendIcon from '../assets/send-icon.svg';
import { ChatMessageType, NewChatMessageType } from '../types';
import ChatMessage from './ChatMessage';
import { getChatMessages, postNewChatMessages } from '../service';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { io } from 'socket.io-client';
import checkWords from '../utils/BadWords';

const PROD_SERVER_LINK = import.meta.env.VITE_PROD_SERVER_LINK;
const SOCKET_IO_URL = PROD_SERVER_LINK;

const socket = io(SOCKET_IO_URL);

const LiveChat = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<number>(1);
  const [newMessage, setNewMessage] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();

  useEffect(() => {
    // Listener para recibir nuevos mensajes
    socket.on('newMessageSocket', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listener para el conteo inicial de usuarios conectados
    socket.on('initialCount', (counts) => {
      console.log('counts', counts);
      setConnectedUsers(counts);
    });

    // Listener para actualizar el conteo de usuarios en tiempo real
    socket.on('userCount', (count) => {
      console.log('userCount', count);

      setConnectedUsers(count);
    });

    // Limpieza de los listeners al desmontar el componente
    return () => {
      socket.off('newMessageSocket');
      socket.off('initialCount');
      socket.off('userCount');
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isConnected) {
      getChatMessages().then((chatMessages) => setMessages(chatMessages));
    }
  }, [isConnected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = checkWords(newMessage);
    if (!newMessage) return;
    const currentUser = window.sessionStorage.getItem('user');
    const parsedUser = JSON.parse(currentUser || '{}');
    const newMessageObj: NewChatMessageType = {
      sender: {
        id: parsedUser.user.id,
        image: parsedUser.user.image || 'https://i.pravatar.cc/300',
        name: parsedUser.user.name || 'Anonymous',
      },
      message: response,
    };

    console.log('newMessageObj', { response });

    const socketMessage = socket.emit('newMessageSocket', newMessageObj);

    console.log('newMessageObj', socketMessage);

    setNewMessage('');
    postNewChatMessages(newMessageObj)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="hidden lg:flex flex-col gap-5 px-5 mr-20 ml-auto">
      <span className="text-[white] pl-10">LIVE CHAT</span>
      {isConnected ? (
        <form className="w-[302px] bg-[#040F1A] h-[70vh] flex flex-col justify-end px-6 pb-6 gap-2 rounded-[20px]">
          <div
            ref={containerRef}
            className="flex flex-col gap-2 overflow-scroll max-h-[70%px] scrollbar-hide"
          >
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>

          <div className="w-full relative">
            <button
              onClick={handleSendMessage}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <img src={SendIcon} alt="Send Icon" />
            </button>
            <input
              className="text-[15px] text-[#FFFF]  p-4 rounded-[20px] bg-[#1C3246] my-4 w-[100%] h-[32px]"
              type="text"
              id="message"
              placeholder="Send a message"
              onChange={handleChange}
              value={newMessage}
            />
          </div>
          <span className="text-[white] text-[10px] flex items-center gap-2">
            <div className="bg-[#42FF00] w-[10px] h-[10px] rounded-full"></div>
            {connectedUsers} users online
          </span>
        </form>
      ) : (
        <div className="rounded-[20px] bg-[#040F1A] w-[302px] h-[70vh] flex items-center justify-center">
          <button
            className=" rounded-[20px] bg-[#040F1A] text-[white] text-[20px] border-[1px] border-[#00FF38] w-[193px] h-[41px]"
            onClick={() => open()}
          >
            CONNECT WALLET
          </button>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
