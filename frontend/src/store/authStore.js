import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,

  checkingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/profile");

      set({
        authUser: res.data,
        checkingAuth: false,
      });
    } catch (error) {
      set({
        authUser: null,
        checkingAuth: false,
      });
    }
  },

  logout: async () => {
    await axiosInstance.post("/auth/logout");

    set({
      authUser: null,
    });
  },
}));
