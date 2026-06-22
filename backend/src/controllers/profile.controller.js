import { User } from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import fs from "fs";

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!req.file) {
      return res.status(400).json({
        message: "Profile image required",
      });
    }

    console.log("Uploading:", req.file.path);

    const uploaded = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "profile-pics",
        resource_type: "image",
        quality: "auto",
        fetch_format: "auto",
      }
    );

    // delete local file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploaded.secure_url,
      },
      {
        returnDocument: "after",
      }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);

    if (
      req.file?.path &&
      fs.existsSync(req.file.path)
    ) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.user._id
    ).select("-password");

    res.status(200).json(user);
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Resume required",
      });
    }

    console.log("Uploading:", req.file.path);

    const uploaded = await cloudinary.uploader.upload(
      req.file.path,
      {
        resource_type: "raw",
        folder: "resumes",
      }
    );

    console.log("SUCCESS:", uploaded.secure_url);

    // delete local file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
      console.log("Local file deleted");
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        resumeUrl: uploaded.secure_url,
        resumePublicId: uploaded.public_id,
      },
      {
        returnDocument: "after",
      }
    ).select("-password");

    res.status(200).json(user);
  } catch (error) {
    console.error("UPLOAD RESUME ERROR:");
    console.dir(error, { depth: null });

    // cleanup file if upload fails
    if (
      req.file?.path &&
      fs.existsSync(req.file.path)
    ) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      message: error.message,
    });
  }
};
export const getProfileCompletion =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        );

      const missingFields = [];

      if (!user.profilePic)
        missingFields.push(
          "profilePic"
        );

      if (!user.resumeUrl)
        missingFields.push(
          "resume"
        );

      if (!user.bio)
        missingFields.push("bio");

      if (
        !user.skills ||
        user.skills.length === 0
      )
        missingFields.push(
          "skills"
        );

      if (!user.education)
        missingFields.push(
          "education"
        );

      if (!user.experience)
        missingFields.push(
          "experience"
        );

      const totalFields = 6;

      const completedFields =
        totalFields -
        missingFields.length;

      const completionPercentage =
        Math.round(
          (completedFields /
            totalFields) *
            100
        );

      res.status(200).json({
        completionPercentage,
        completedFields,
        totalFields,
        missingFields,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  export const updateCandidateProfile =
  async (req, res) => {
    try {
      const {
        bio,
        skills,
        education,
        experience,
      } = req.body;

      const updatedUser =
        await User.findByIdAndUpdate(
          req.user._id,
          {
            bio,
            skills,
            education,
            experience,
          },
          {
            new: true,
          }
        ).select("-password");

      res.status(200).json(
        updatedUser
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };