import { useEffect } from "react";
import { useInterviewStore } from "../../store/interviewStore";

const Interviews = () => {
  const { interviews, getMyInterviews } = useInterviewStore();

  useEffect(() => {
    getMyInterviews();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">My Interviews</h1>

      {interviews.map((interview) => (
        <div key={interview._id} className="border p-4 rounded mb-4">
          <h2 className="font-semibold">{interview.job?.title}</h2>

          <p>Date: {new Date(interview.date).toLocaleString()}</p>

          <p>Recruiter: {interview.recruiter?.name}</p>

          <a
            href={interview.meetingLink}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            Join Meeting
          </a>
        </div>
      ))}
    </div>
  );
};

export default Interviews;
