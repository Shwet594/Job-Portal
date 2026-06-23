import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useApplicationStore } from "../../store/applicationStore";

const Applicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);

  const { getJobApplicants, updateApplicationStatus } = useApplicationStore();

  const fetchApplicants = async () => {
    const data = await getJobApplicants(jobId);

    if (data) {
      setApplicants(data);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const changeStatus = async (applicationId, status) => {
    await updateApplicationStatus(applicationId, status);

    fetchApplicants();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Applicants</h1>

      {applicants.length === 0 ? (
        <p>No applicants found.</p>
      ) : (
        <div className="space-y-4">
          {applicants.map((application) => (
            <div key={application._id} className="border rounded p-4">
              <h2 className="text-xl font-semibold">
                {application.candidate.name}
              </h2>

              <p>{application.candidate.email}</p>
              {application.candidate.bio && (
                <p className="mt-2">{application.candidate.bio}</p>
              )}
              {application.candidate.skills?.length > 0 && (
                <div className="mt-2">
                  <strong>Skills:</strong>

                  <div className="flex flex-wrap gap-2 mt-1">
                    {application.candidate.skills.map((skill, index) => (
                      <span key={index} className="border px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {application.candidate.education && (
                <p className="mt-2">
                  <strong>Education:</strong> {application.candidate.education}
                </p>
              )}
              {application.candidate.experience && (
                <p className="mt-2">
                  <strong>Experience:</strong>{" "}
                  {application.candidate.experience}
                </p>
              )}
              {application.candidate.resumeUrl && (
                <a
                  href={application.candidate.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 border px-4 py-2"
                >
                  View Resume
                </a>
              )}

              <p className="mt-2">
                Status: <strong>{application.status}</strong>
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => changeStatus(application._id, "Selected")}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Select
                </button>

                <button
                  onClick={() => changeStatus(application._id, "Rejected")}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
                <button
                  onClick={() =>
                    navigate(`/recruiter/interview/${application._id}`)
                  }
                  className="bg-blue-500 text-white px-4 py-2"
                >
                  Schedule Interview
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applicants;
