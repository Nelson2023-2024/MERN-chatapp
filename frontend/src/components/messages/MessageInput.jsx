import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const { loading, sendMessage } = useSendMessage();
  async function handleSendMessage(e) {
    e.preventDefault();
    //if no message don't send it
    if (!message) return;

    await sendMessage(message);
    setMessage("");
  }
  return (
    <form className="px-4 my-3" onSubmit={handleSendMessage}>
      <div className="relative w-full">
        <input
          value={message}
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 flex items-center end-0 pe-3"
        >
          {loading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
