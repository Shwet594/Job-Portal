import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import jobRoutes from "./routes/job.route.js";
import authRoutes from "./routes/auth.route.js";
import profileRoutes from "./routes/profile.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";
import savedJobRoutes from "./routes/savedJob.route.js";
import interviewRoutes from "./routes/interview.route.js";
import { connectDB } from "./lib/db.js";
import applicationRoutes from "./routes/application.route.js";
import cloudinary from "./lib/cloudinary.js";


const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.URL,
    credentials: true,
  })
);
app.use( "/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(
  "/api/saved-jobs",
  savedJobRoutes
);
app.use(
"/api/interviews",
interviewRoutes
);
app.get("/", (req, res) => {
  res.send("Job Portal API");
});

const PORT =
  process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );

  connectDB();
});