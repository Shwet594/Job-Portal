import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { successToast, errorToast } from "../lib/toast";
export const useAuthStore = create((set) => ({
  authUser: null,

  checkingAuth: true,
  signup: async (data) => {
    const res = await axiosInstance.post("/auth/signup", data);

    set({
      authUser: res.data,
    });
    successToast("Account created successfully");
    return res.data;
  },

  login: async (data) => {
    const res = await axiosInstance.post("/auth/login", data);

    set({
      authUser: res.data,
    });
    successToast("Logged in successfully");
    return res.data;
  },

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
    successToast("Logged out successfully");
  },
}));
