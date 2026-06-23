import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useSavedJobStore = create((set) => ({
  savedJobs: [],

  getSavedJobs: async () => {
    try {
      const res = await axiosInstance.get("/saved-jobs");

      set({
        savedJobs: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  },

  saveJob: async (jobId) => {
    try {
      await axiosInstance.post(`/saved-jobs/${jobId}`);

      set((state) => ({
        savedJobs: [...state.savedJobs, jobId],
      }));
    } catch (error) {
      console.log(error);
    }
  },

  unsaveJob: async (jobId) => {
    try {
      await axiosInstance.delete(`/saved-jobs/${jobId}`);

      set((state) => ({
        savedJobs: state.savedJobs.filter((job) => (job._id || job) !== jobId),
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
