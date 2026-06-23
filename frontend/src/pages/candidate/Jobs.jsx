import { useEffect, useState } from "react";

import JobCard from "../../components/shared/JobCard";

import { useJobStore } from "../../store/jobStore";

import { useApplicationStore } from "../../store/applicationStore";

const Jobs = () => {
  const [search, setSearch] = useState("");

  const { jobs, getJobs, searchJobs } = useJobStore();

  const { applyForJob } = useApplicationStore();

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={() => searchJobs(search)}
          className="border px-4 py-2 ml-2 rounded"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} onApply={applyForJob} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
