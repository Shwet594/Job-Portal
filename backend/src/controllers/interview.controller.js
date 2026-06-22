import { Interview } from "../models/interview.model.js";
import Application from "../models/application.model.js";
import { User } from "../models/user.model.js";
import { sendEmail } from "../lib/sendEmail.js";

export const scheduleInterview = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("PARAMS:", req.params);
    const { applicationId } = req.params;

    const { date, meetingLink, notes } = req.body;

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

    const interview = await Interview.create({
      candidate: application.candidate,
      recruiter: req.user._id,
      job: application.job._id,
      date,
      meetingLink,
      notes,
    });

    const candidate = await User.findById(application.candidate);

    if (candidate) {
      await sendEmail(
        candidate.email,
        "Interview Scheduled",
        `
Your interview has been scheduled.

Job: ${application.job.title}

Date: ${new Date(date).toLocaleString()}

Meeting Link:
${meetingLink}
        `,
      );
    }

    const populatedInterview = await Interview.findById(interview._id)
      .populate("candidate", "name email")
      .populate("job", "title");

    res.status(201).json(populatedInterview);
  } catch (error) {
    console.error("SCHEDULE INTERVIEW ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      candidate: req.user._id,
    })
      .populate("job", "title location")
      .populate("recruiter", "name email")
      .sort({
        date: 1,
      });

    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getRecruiterInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      recruiter: req.user._id,
    })
      .populate("candidate", "name email")
      .populate("job", "title")
      .sort({
        date: 1,
      });

    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
