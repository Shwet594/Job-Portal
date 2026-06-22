import mongoose from "mongoose";

const interviewSchema =
  new mongoose.Schema(
    {
      candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
      },

      date: {
        type: Date,
        required: true,
      },

      meetingLink: {
        type: String,
        required: true,
      },

      notes: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "Scheduled",
          "Completed",
          "Cancelled",
        ],
        default: "Scheduled",
      },
    },
    {
      timestamps: true,
    }
  );


export const Interview =
  mongoose.model(
    "Interview",
    interviewSchema
  );

