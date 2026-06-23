import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useJobStore } from "../../store/jobStore";

const MyJobs = () => {
  const { jobs, getMyJobs, deleteJob } = useJobStore();

  useEffect(() => {
    getMyJobs();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Jobs</h1>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job._id} className="border p-4 rounded">
            <h2 className="font-bold text-xl">{job.title}</h2>

            <p>{job.location}</p>

            <p>₹{job.salary}</p>

            <p>Experience: {job.experience} years</p>
            <button
              onClick={() => deleteJob(job._id)}
              className="bg-red-500 text-white px-4 py-2 mt-3"
            >
              Delete
            </button>
            <Link
              to={`/recruiter/jobs/${job._id}/applicants`}
              className="border px-4 py-2"
            >
              View Applicants
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;
