import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { successToast, errorToast } from "../lib/toast";
export const useInterviewStore = create((set) => ({
  interviews: [],

  getMyInterviews: async () => {
    try {
      const res = await axiosInstance.get("/interviews/candidate");

      set({
        interviews: res.data,
      });
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to fetch interviews");
    }
  },

  getRecruiterInterviews: async () => {
    try {
      const res = await axiosInstance.get("/interviews/recruiter");

      set({
        interviews: res.data,
      });
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to fetch interviews");
    }
  },

  scheduleInterview: async (applicationId, data) => {
    try {
      const payload = {
        applicationId,
        ...data,
      };

      const res = await axiosInstance.post("/interviews", payload);
      successToast("Interview scheduled successfully");
      return res.data;
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to schedule interview");
    }
  },
}));
