import Job from "../models/job.model.js";
import Application from "../models/application.model.js";

export const getDashboardStats = async (
  req,
  res
) => {
  try {
    const recruiterId = req.user._id;

    const jobs = await Job.find({
      recruiter: recruiterId,
    });

    const jobIds = jobs.map(
      (job) => job._id
    );

    const totalJobs =
      jobs.length;

    const totalApplicants =
      await Application.countDocuments(
        {
          job: {
            $in: jobIds,
          },
        }
      );

    const selectedCandidates =
      await Application.countDocuments(
        {
          job: {
            $in: jobIds,
          },
          status: "Selected",
        }
      );

    const rejectedCandidates =
      await Application.countDocuments(
        {
          job: {
            $in: jobIds,
          },
          status: "Rejected",
        }
      );

    res.status(200).json({
      totalJobs,
      totalApplicants,
      selectedCandidates,
      rejectedCandidates,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const applicantsPerJob =
  async (req, res) => {
    try {
      const data =
        await Application.aggregate([
          {
            $lookup: {
              from: "jobs",
              localField: "job",
              foreignField: "_id",
              as: "job",
            },
          },

          {
            $unwind: "$job",
          },

          {
            $match: {
              "job.recruiter":
                req.user._id,
            },
          },

          {
            $group: {
              _id: "$job.title",
              applicants: {
                $sum: 1,
              },
            },
          },
        ]);

      res.json(data);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  export const getCandidateDashboard =
  async (req, res) => {
    try {
      const totalApplications =
        await Application.countDocuments({
          candidate: req.user._id,
        });

      const selected =
        await Application.countDocuments({
          candidate: req.user._id,
          status: "Selected",
        });

      const rejected =
        await Application.countDocuments({
          candidate: req.user._id,
          status: "Rejected",
        });

      const underReview =
        await Application.countDocuments({
          candidate: req.user._id,
          status: "Under Review",
        });

      res.status(200).json({
        totalApplications,
        selected,
        rejected,
        underReview,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };