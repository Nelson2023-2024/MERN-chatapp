import { useAuthContext } from "../../Context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();

  const { selectedCoversation } = useConversation();
  const fromMe = message.senderId === authUser._id;

  const formatedTime = extractTime(message.createdAt);

  const chatClassName = fromMe ? "chat-end" : " chat-start";

  const profilePic = fromMe
    ? authUser.profilePic
    : selectedCoversation?.profilePic;

  const bubleBgColor = fromMe ? "bg-blue-500" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble pb-2 text-white  ${bubleBgColor}`}>
        {message.message}
      </div>
      <div className="flex text-white items-center gap-1 text-xs opacity-50 chat-footer">
        {formatedTime}
      </div>
    </div>
  );
};

export default Message;
