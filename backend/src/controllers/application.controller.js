import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import {User} from "../models/user.model.js"; 
import { sendEmail } from "../lib/sendEmail.js";
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const existing = await Application.findOne({
      candidate: req.user._id,
      job: jobId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Already applied",
      });
    }

    const application = await Application.create({
      candidate: req.user._id,
      job: jobId,
    });
    await sendEmail(
      candidate.email,
      "Application Submitted",
      `You have successfully applied for ${job.title}`,
    );
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.user._id,
    })
      .populate("job", "title location salary")
      .sort({
        createdAt: -1,
      });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getJobApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const applicants = await Application.find({
      job: jobId,
    }).populate(
      "candidate",
      "name email profilePic resumeUrl bio skills education experience",
    );

    res.status(200).json(applicants);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const { status } = req.body;

    const application =
      await Application.findById(applicationId).populate("job");

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }
    if (application.job.recruiter.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    application.status = status;

    await application.save();
    const candidate = await User.findById(application.candidate);
    await sendEmail(
      candidate.email,
      "Application Status Updated",
      `Your application for ${application.job.title}
has been updated to:
${status}`,
    );
    res.status(200).json(application);
  } catch (error) {
    console.log("UPDATE STATUS ERROR:",error);
    res.status(500).json({
      message: error.message,
    });
  }
};
