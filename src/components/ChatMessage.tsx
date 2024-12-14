import { ChatMessageType } from '../types';
const PROD_LINK = import.meta.env.VITE_PROD_LINK;

const ChatMessage = ({ message }: { message: ChatMessageType }) => {
  return (
    <div className="w-full bg-[#1C3246] rounded-[20px] flex p-2 gap-2">
      <img
        src={`${PROD_LINK}${message.sender.image}`}
        alt="Profile"
        className="rounded-full w-[30px] h-[30px]"
      />
      <div className="flex flex-col">
        <span className="text-[white] text-[12px]">{message.sender.name}</span>
        <span className="text-[#0085FF] text-[10px]">{message.message}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
