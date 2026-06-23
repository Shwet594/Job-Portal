import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useJobStore } from "../../store/jobStore";
import { useApplicationStore } from "../../store/applicationStore";

const JobDetails = () => {
  const { id } = useParams();

  const { selectedJob, getJobById, saveJob } = useJobStore();

  const { applyForJob } = useApplicationStore();

  useEffect(() => {
    getJobById(id);
  }, [id]);

  if (!selectedJob) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-5xl">
      <div className="bg-white rounded-xl shadow border p-8">
        <h1 className="text-4xl font-bold">{selectedJob.title}</h1>

        <div className="mt-4 flex gap-4 text-gray-600">
          <span>📍 {selectedJob.location}</span>

          <span>💰 ₹{selectedJob.salary}</span>

          <span>🧑‍💻 {selectedJob.experience} Years</span>
        </div>

        <div className="mt-8">
          <h2 className="font-bold text-xl mb-2">Description</h2>

          <p>{selectedJob.description}</p>
        </div>

        <div className="mt-8">
          <h2 className="font-bold text-xl mb-3">Skills Required</h2>

          <div className="flex flex-wrap gap-2">
            {selectedJob.skillsRequired?.map((skill) => (
              <span key={skill} className="bg-gray-100 px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-bold text-xl">Recruiter</h2>

          <p>{selectedJob.recruiter?.name}</p>

          <p>{selectedJob.recruiter?.email}</p>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={() => applyForJob(selectedJob._id)}
            className="bg-blue-600 text-white px-5 py-3 rounded"
          >
            Apply Now
          </button>

          <button
            onClick={() => saveJob(selectedJob._id)}
            className="border px-5 py-3 rounded"
          >
            Save Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
