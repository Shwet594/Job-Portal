const JobCard = ({ job, onApply }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-lg transition">
      <h2 className="text-xl font-bold">{job.title}</h2>

      <p className="text-gray-600 mt-2">📍 {job.location}</p>

      <p className="text-green-600 font-semibold mt-2">₹ {job.salary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.skillsRequired?.map((skill, index) => (
          <span
            key={index}
            className="bg-gray-100 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      <button
        onClick={() => onApply(job._id)}
        className="mt-5 w-full bg-black text-white py-3 rounded-xl hover:opacity-90"
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
