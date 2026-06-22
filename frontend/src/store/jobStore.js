import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useJobStore =
create((set,get) => ({
  jobs: [],
  loading: false,
selectedJob: null,
createJob: async (jobData) => {
  try {
    const res = await axiosInstance.post(
      "/jobs",
      jobData
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
},
  getJobs: async () => {
  try {
    const res =
      await axiosInstance.get(
        "/jobs"
      );

    set({
      jobs: res.data.jobs,
    });
  } catch (error) {
    console.log(error);
  }
},
getJobById:
  async (id) => {
    try {
      const res =
        await axiosInstance.get(
          `/jobs/${id}`
        );

      set({
        selectedJob:
          res.data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getMyJobs: async () => {
  try {
    const res =
      await axiosInstance.get(
        "/jobs/my/jobs"
      );

    set({
      jobs: res.data,
    });
  } catch (error) {
    console.log(error);
    console.log(error.response?.data);
  }
},
  searchJobs: async (
  keyword = ""
) => {
  try {
    const res =
      await axiosInstance.get(
        `/jobs?keyword=${keyword}`
      );

    set({
      jobs: res.data.jobs,
    });
  } catch (error) {
    console.log(error);
  }
},
deleteJob: async (jobId) => {
  try {
    await axiosInstance.delete(
      `/jobs/${jobId}`
    );

    set({
      jobs: get().jobs.filter(
        (job) =>
          job._id !== jobId
      ),
    });
  } catch (error) {
    console.log(error);
  }
},
}));