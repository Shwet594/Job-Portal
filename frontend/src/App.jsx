import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import ProtectedRoute from "./routes/ProtectedRoute";

// Candidate
import CandidateLayout from "./layouts/CandidateLayout";
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import Jobs from "./pages/candidate/Jobs";
import Applications from "./pages/candidate/Applications";
import SavedJobs from "./pages/candidate/SavedJobs";
import Profile from "./pages/candidate/Profile";
import CandidateInterviews from "./pages/candidate/CandidateInterviews";

// Recruiter
import RecruiterLayout from "./layouts/RecruiterLayout";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import CreateJob from "./pages/recruiter/CreateJob";
import MyJobs from "./pages/recruiter/MyJobs";
import Applicants from "./pages/recruiter/Applicants";
import RecruiterInterviews from "./pages/recruiter/RecruiterInterviews";
import Landing from "./pages/auth/Landing";
import { Toaster } from "react-hot-toast";
import JobDetails from "./pages/candidate/JobDetails";
import EditJob from "./pages/recruiter/EditJob";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Candidate Routes */}
        <Route
          path="/candidate"
          element={
            <ProtectedRoute role="candidate">
              <CandidateLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CandidateDashboard />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="applications" element={<Applications />} />
          <Route path="saved-jobs" element={<SavedJobs />} />
          <Route path="profile" element={<Profile />} />
          <Route path="interviews" element={<CandidateInterviews />} />
          <Route path="jobs/:id" element={<JobDetails />} />
        </Route>

        {/* Recruiter Routes */}
        <Route
          path="/recruiter"
          element={
            <ProtectedRoute role="recruiter">
              <RecruiterLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<RecruiterDashboard />} />
          <Route path="create-job" element={<CreateJob />} />
          <Route path="jobs" element={<MyJobs />} />
          <Route path="jobs/:jobId/applicants" element={<Applicants />} />
          <Route path="interviews" element={<RecruiterInterviews />} />
          <Route path="jobs/edit/:id" element={<EditJob/>} />
        </Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
