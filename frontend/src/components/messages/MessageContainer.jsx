import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../Context/AuthContext";

const MessageContainer = () => {
  const noChatSelected = true;

  const { selectedCoversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    //cleanup on unmount e.g. logout
    return () => {
      setSelectedConversation(null);
    };
  }, []);
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedCoversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="px-4 py-2 mb-2 bg-slate-500">
            <span className="label-text">To:</span>{" "}
            <span className="font-bold text-gray-900">
              {selectedCoversation?.fullName}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center gap-2 px-4 font-semibold text-center text-gray-200 sm:text-lg md:text-xl">
        <p>Welcome 👋 {authUser?.user?.fullName}❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl text-center md:text-6xl" />
      </div>
    </div>
  );
};
