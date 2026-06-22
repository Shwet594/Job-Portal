import express from "express";

import {
  createJob,
  getAllJobs,
  getJobById,
  getMyJobs,
  updateJob,
  deleteJob,
} from "../controllers/job.controller.js";

import {
  getJobApplicants,
} from "../controllers/application.controller.js";

import {
  protectRoute,
} from "../middleware/auth.middleware.js";

import {
  recruiterOnly,
} from "../middleware/role.middelware.js";

const router = express.Router();

// Create Job
router.post(
  "/",
  protectRoute,
  recruiterOnly,
  createJob
);

// Get All Jobs
router.get(
  "/",
  getAllJobs
);

// Recruiter's Jobs
router.get(
  "/my/jobs",
  protectRoute,
  recruiterOnly,
  getMyJobs
);

// Applicants for a Job
router.get(
  "/:jobId/applicants",
  protectRoute,
  recruiterOnly,
  getJobApplicants
);

// Get Single Job
router.get(
  "/:id",
  getJobById
);

// Update Job
router.put(
  "/:id",
  protectRoute,
  recruiterOnly,
  updateJob
);

// Delete Job
router.delete(
  "/:id",
  protectRoute,
  recruiterOnly,
  deleteJob
);

export default router;