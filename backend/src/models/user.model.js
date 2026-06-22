import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["candidate", "recruiter"],
      default: "candidate",
    },
    bio: {
      type: String,
      default: "",
    },

    skills: [
      {
        type: String,
      },
    ],

    education: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    resumeUrl: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    resumePublicId: {
      type: String,
      default: "",
    },
    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema);
