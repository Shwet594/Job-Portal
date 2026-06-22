import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useProfileStore =
  create((set) => ({
    profile: null,
    completion: null,
    loading: false,

    getProfile:
      async () => {
        try {
          const res =
            await axiosInstance.get(
              "/profile"
            );

          set({
            profile:
              res.data,
          });
        } catch (error) {
          console.log(error);
        }
      },

    getCompletion:
      async () => {
        try {
          const res =
            await axiosInstance.get(
              "/profile/completion"
            );

          set({
            completion:
              res.data,
          });
        } catch (error) {
          console.log(error);
        }
      },
      uploadResume: async (file) => {
  try {
    const formData = new FormData();

    formData.append(
      "resume",
      file
    );

    const res =
      await axiosInstance.post(
        "/profile/upload-resume",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    set({
      profile: res.data,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
},
      updateProfileDetails:
  async (data) => {
    try {
      const res =
        await axiosInstance.put(
          "/profile/update-details",
          data
        );

      set({
        profile: res.data,
      });

      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  }));