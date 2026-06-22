import { User } from "../models/user.model.js";
import Job from "../models/job.model.js";
export const saveJob = async (
  req,
  res
) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const user =
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $addToSet: {
            savedJobs: jobId,
          },
        },
        {
          new: true,
        }
      ).populate("savedJobs");
      console.log("Saved Job:", jobId, "for User:", req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const removeSavedJob =
  async (req, res) => {
    try {
      const { jobId } = req.params;

      const user =
        await User.findByIdAndUpdate(
          req.user._id,
          {
            $pull: {
              savedJobs: jobId,
            },
          },
          {
            new: true,
          }
        ).populate("savedJobs");

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };  

  export const getSavedJobs =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        ).populate({
          path: "savedJobs",
          populate: {
            path: "recruiter",
            select: "name email",
          },
        });
        
      res.status(200).json(
        user.savedJobs
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }; 