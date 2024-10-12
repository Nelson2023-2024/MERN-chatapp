import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
  const [loading, setLoading] = useState();

  const { messages, setMessages, selectedCoversation } = useConversation();

  const sendMessage = async (message) => {
    if (!selectedCoversation || !selectedCoversation?._id) {
      toast.error("No conversation selected.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/message/send/${selectedCoversation?._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      setMessages([...messages, data.newMessage]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
