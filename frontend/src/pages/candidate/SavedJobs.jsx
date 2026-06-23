import { useEffect } from "react";
import { useSavedJobStore } from "../../store/savedjobStore";
import { useApplicationStore } from "../../store/applicationStore";
import JobCard from "../../components/shared/JobCard";

const SavedJobs = () => {
  const { savedJobs, getSavedJobs, unsaveJob } = useSavedJobStore();
  const { applyForJob } = useApplicationStore();
  useEffect(() => {
    getSavedJobs();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Saved Jobs</h1>

      {savedJobs.length === 0 ? (
        <p>No saved jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedJobs.map((job) => (
            <div key={job._id} className="relative">
              <JobCard job={job} onApply={applyForJob} />

              <button
                onClick={() => unsaveJob(job._id)}
                className="mt-2 border px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
