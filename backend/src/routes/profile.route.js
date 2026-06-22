import express from "express";
import { upload } from "../middleware/multer.middleware.js";

import {
  getProfile,
  updateProfile,
  uploadResume,
  getProfileCompletion,
  updateCandidateProfile
} from "../controllers/profile.controller.js";

import {
  protectRoute,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  protectRoute,
  getProfile
);
router.get(
  "/completion",
  protectRoute,
  getProfileCompletion
);
router.put(
  "/update-profile",
  protectRoute,
  upload.single("profilePic"),
  updateProfile
);

router.post(
  "/upload-resume",
  protectRoute,
  upload.single("resume"),
  uploadResume
);
router.put(
  "/update-details",
  protectRoute,
  updateCandidateProfile
);
export default router;