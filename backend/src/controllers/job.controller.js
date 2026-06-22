import Job from "../models/job.model.js";

export const createJob = async (req, res) => {
  try {
    const { title, description, location, salary, experience, skillsRequired } =
      req.body;
    const job = await Job.create({
      title,
      description,
      location,
      salary,
      experience,
      skillsRequired,
      recruiter: req.user._id,
    });
    console.log("JOB CREATED:", job);
    console.log(req.user._id);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const {
      keyword,
      location,
      salary,
      page = 1,
      limit = 10,
      sort = "latest",
    } = req.query;

    const query = {};

    // Search by title
    if (keyword) {
      query.title = {
        $regex: keyword,
        $options: "i",
      };
    }

    // Filter by location
    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    // Minimum salary
    if (salary) {
      query.salary = {
        $gte: Number(salary),
      };
    }

    let sortOption = {
      createdAt: -1,
    };

    if (sort === "salary") {
      sortOption = {
        salary: -1,
      };
    }

    const jobs = await Job.find(query)
      .populate("recruiter", "name email")
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalJobs = await Job.countDocuments(query);

    res.status(200).json({
      jobs,
      currentPage: Number(page),
      totalPages: Math.ceil(totalJobs / limit),
      totalJobs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getJobById = async (
  req,
  res
) => {
  try {
    const job = await Job.findById(
      req.params.id
    ).populate(
      "recruiter",
      "name email"
    );

    if (!job) {
      return res.status(404).json({
        message:
          "Job not found",
      });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getMyJobs = async (
  req,
  res
) => {
  try {
    const jobs = await Job.find({
      recruiter: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const updateJob =
  async (req, res) => {
    try {
      const job =
        await Job.findById(
          req.params.id
        );

      if (!job) {
        return res
          .status(404)
          .json({
            message:
              "Job not found",
          });
      }

      if (
        job.recruiter.toString() !==
        req.user._id.toString()
      ) {
        return res
          .status(403)
          .json({
            message:
              "Unauthorized",
          });
      }

      const updated =
        await Job.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.status(200).json(
        updated
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  export const deleteJob =
  async (req, res) => {
    try {
      const job =
        await Job.findById(
          req.params.id
        );

      if (!job) {
        return res
          .status(404)
          .json({
            message:
              "Job not found",
          });
      }

      if (
        job.recruiter.toString() !==
        req.user._id.toString()
      ) {
        return res
          .status(403)
          .json({
            message:
              "Unauthorized",
          });
      }

      await job.deleteOne();

      res.status(200).json({
        message:
          "Job deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
