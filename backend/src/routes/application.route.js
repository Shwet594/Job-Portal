import express from "express";

import {
  applyForJob,
  getMyApplications,
  updateApplicationStatus,
} from "../controllers/application.controller.js";

import {
  protectRoute,
} from "../middleware/auth.middleware.js";

import { candidateOnly,recruiterOnly } from "../middleware/role.middelware.js";


const router = express.Router();

router.post(
  "/:jobId",
  protectRoute,
  candidateOnly,
  applyForJob
);
router.get(
  "/me",
  protectRoute,
  candidateOnly,
  getMyApplications
);
router.put(
  "/:applicationId/status",
  protectRoute,
  recruiterOnly,
  updateApplicationStatus
);

export default router;