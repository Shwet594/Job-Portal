import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { successToast, errorToast } from "../lib/toast";

export const useJobStore = create((set, get) => ({
  jobs: [],
  loading: false,
  selectedJob: null,
  createJob: async (jobData) => {
    try {
      const res = await axiosInstance.post("/jobs", jobData);
      successToast("Job created successfully");

      return res.data;
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to create job");
    }
  },
  getJobs: async () => {
    try {
      const res = await axiosInstance.get("/jobs");

      set({
        jobs: res.data.jobs,
      });
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to fetch jobs");
    }
  },
  getJobById: async (id) => {
    try {
      const res = await axiosInstance.get(`/jobs/${id}`);

      set({
        selectedJob: res.data,
      });
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to fetch job");
    }
  },
  getMyJobs: async () => {
    try {
      const res = await axiosInstance.get("/jobs/my/jobs");

      set({
        jobs: res.data,
      });
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to fetch my jobs");
    }
  },
  searchJobs: async (keyword = "") => {
    try {
      const res = await axiosInstance.get(`/jobs?keyword=${keyword}`);
      successToast("Search completed");
      set({
        jobs: res.data.jobs,
      });
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to search jobs");
    }
  },
  deleteJob: async (jobId) => {
    try {
      await axiosInstance.delete(`/jobs/${jobId}`);
      successToast("Job deleted");
      set({
        jobs: get().jobs.filter((job) => job._id !== jobId),
      });
    } catch (error) {
      errorToast(error.response?.data?.message || "Failed to delete job");
    }
  },
  updateJob: async (jobId, jobData) => {
    try {
      const res = await axiosInstance.put(`/jobs/${jobId}`, jobData);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
}));