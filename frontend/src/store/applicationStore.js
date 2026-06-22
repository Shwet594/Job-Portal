import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useApplicationStore = create((set) => ({
  applications: [],

  loading: false,

  getMyApplications: async () => {
    try {
      const res = await axiosInstance.get("/applications/me");

      set({
        applications: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  },

  applyForJob: async (jobId) => {
    try {
      await axiosInstance.post(`/applications/${jobId}`);
    } catch (error) {
      console.log(error);
    }
  },

  getJobApplicants: async (jobId) => {
    try {
      const res = await axiosInstance.get(`/jobs/job/${jobId}`);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  },

  updateApplicationStatus: async (applicationId, status) => {
    try {
      const res = await axiosInstance.put(
        `/applications/${applicationId}/status`,
        { status },
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
}));
