import { create } from "zustand";

const useConversation = create((set) => ({
  selectedCoversation: null,
  setSelectedConversation: (selectedCoversation) =>
    set({ selectedCoversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
