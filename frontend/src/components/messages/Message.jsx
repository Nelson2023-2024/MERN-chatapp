import { useAuthContext } from "../../Context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();

  const user = authUser?.user;

  const { selectedCoversation } = useConversation();
  const fromMe = message.senderId === user?._id;

  console.log("SenderID:", message.senderId, "and auth user is", authUser);

  const formatedTime = extractTime(message.createdAt);

  const chatClassName = fromMe ? "chat-end" : " chat-start";

  const profilePic = fromMe
    ? user?.profilePic
    : selectedCoversation?.profilePic;

  const bubleBgColor = fromMe ? "bg-blue-500" : "";

  //added for real time massages
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble pb-2 text-white  ${bubleBgColor} ${shakeClass}`}
      >
        {message.message}
      </div>
      <div className="flex items-center gap-1 text-xs text-white opacity-50 chat-footer">
        {formatedTime}
      </div>
    </div>
  );
};

export default Message;
