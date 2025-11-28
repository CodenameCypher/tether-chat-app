import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/user");
      set({ users: res.data });
    } catch (error) {
      toast.error("Error loading users. Try again later.");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (receiverID) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${receiverID}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error("Error loading messages. Try again later.");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessages: async (messageData) => {
    // data from current state
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/message/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error("Error sending message. Try again later.");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket?.on("sendMessage", (newMessage) => {
      if (newMessage.senderID === selectedUser._id) {
        set({ messages: [...get().messages, newMessage] });
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket?.off("sendMessage");
  },

  setSelectedUser: (user) => set({ selectedUser: user }),
}));
