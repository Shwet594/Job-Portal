import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useDashboardStore = create((set) => ({
  candidateStats: null,
  recruiterStats: null,
  loading: false,
  applicantsChart: [],
  getCandidateStats: async () => {
    try {
      set({ loading: true });

      const res = await axiosInstance.get("/dashboard/candidate");

      set({
        candidateStats: res.data,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({
        loading: false,
      });
    }
  },

  getRecruiterStats: async () => {
    try {
      set({ loading: true });

      const res = await axiosInstance.get("/dashboard/recruiter");

      set({
        recruiterStats: res.data,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({
        loading: false,
      });
    }
  },
  getApplicantsPerJob: async () => {
    try {
      const res = await axiosInstance.get("/dashboard/applicants-per-job");

      set({
        applicantsChart: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  },
}));