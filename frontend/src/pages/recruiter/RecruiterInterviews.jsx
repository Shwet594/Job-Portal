import { useEffect } from "react";
import { useInterviewStore } from "../../store/interviewStore";

const RecruiterInterviews = () => {
  const { interviews, getRecruiterInterviews } = useInterviewStore();

  useEffect(() => {
    getRecruiterInterviews();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Scheduled Interviews</h1>

      {interviews.map((interview) => (
        <div key={interview._id} className="border p-4 rounded mb-4">
          <h2>{interview.candidate?.name}</h2>

          <p>{interview.job?.title}</p>

          <p>{new Date(interview.date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default RecruiterInterviews;
