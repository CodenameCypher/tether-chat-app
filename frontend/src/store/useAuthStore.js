import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
      toast.success("Welcome to Tether!");
    } catch (error) {
      set({ authUser: null });
      set({ isSigningUp: false });
      toast.error("Failed, please try again.");
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("See you soon!");
    } catch (error) {
      toast.error("Failed, please try again.");
    }
  },

  login: async (data) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      console.log(response);
      set({ authUser: response.data });
      toast.success(`Welcome to Tether, ${response.data.fullName}`);
    } catch (error) {
      set({ isLoggingIn: false });
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: response.data });
      toast.success("Profile picture updated.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
