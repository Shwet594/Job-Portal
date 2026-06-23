import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { successToast, errorToast } from "../lib/toast";
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
      errorToast(error.response?.data?.message || "Failed to fetch applications");
    }
  },

  applyForJob: async (jobId) => {
    try {
      await axiosInstance.post(`/applications/${jobId}`);
      successToast("Application submitted successfully");
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to submit application");
    }
  },

  getJobApplicants: async (jobId) => {
    try {
      const res = await axiosInstance.get(`/applications/job/${jobId}/applicants`);
      return res.data;
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to fetch job applicants");
    }
  },

  updateApplicationStatus: async (applicationId, status) => {
    try {
      const res = await axiosInstance.put(
        `/applications/${applicationId}/status`,
        { status },
      );
      successToast("Application status updated successfully");
      return res.data;
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to update application status");
    }
  },
}));
