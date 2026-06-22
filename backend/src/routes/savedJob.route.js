import express from "express";

import {
  saveJob,
  removeSavedJob,
  getSavedJobs,
} from "../controllers/savedJob.controller.js";

import {
  protectRoute,
} from "../middleware/auth.middleware.js";

import {
  candidateOnly,
} from "../middleware/role.middelware.js";

const router = express.Router();

router.post(
  "/:jobId",
  protectRoute,
  candidateOnly,
  saveJob
);

router.delete(
  "/:jobId",
  protectRoute,
  candidateOnly,
  removeSavedJob
);

router.get(
  "/",
  protectRoute,
  candidateOnly,
  getSavedJobs
);

export default router;