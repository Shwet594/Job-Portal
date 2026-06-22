import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { recruiterOnly,candidateOnly } from "../middleware/role.middelware.js";

import {
  getDashboardStats,
    applicantsPerJob,
    getCandidateDashboard,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get(
  "/recruiter",
  protectRoute,
  recruiterOnly,
  getDashboardStats
);
router.get(
  "/applicants-per-job",
  protectRoute,
  recruiterOnly,
  applicantsPerJob
);

router.get(
  "/candidate",
  protectRoute,
  candidateOnly,
  getCandidateDashboard
);
export default router;