import express from "express";

import {
  scheduleInterview,
  getMyInterviews,
  getRecruiterInterviews,
} from "../controllers/interview.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

import { candidateOnly, recruiterOnly } from "../middleware/role.middelware.js";

const router = express.Router();

router.post("/:applicationId", protectRoute, recruiterOnly, scheduleInterview);

router.get("/candidate", protectRoute, candidateOnly, getMyInterviews);

router.get("/recruiter", protectRoute, recruiterOnly, getRecruiterInterviews);

export default router;
