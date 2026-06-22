import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useInterviewStore = create((set) => ({
  interviews: [],

  getMyInterviews: async () => {
    try {
      const res = await axiosInstance.get("/interviews/candidate");

      set({
        interviews: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getRecruiterInterviews: async () => {
    try {
      const res = await axiosInstance.get("/interviews/recruiter");

      set({
        interviews: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  },

  scheduleInterview: async (applicationId, data) => {
    try {
      const payload = {
        applicationId,
        ...data,
      };

      const res = await axiosInstance.post("/interviews", payload);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
}));
