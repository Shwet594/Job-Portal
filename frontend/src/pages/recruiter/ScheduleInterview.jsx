import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useInterviewStore } from "../../store/interviewStore";

const ScheduleInterview = () => {
  const { applicationId } = useParams();

  const navigate = useNavigate();

  const { scheduleInterview } = useInterviewStore();

  const [form, setForm] = useState({
    date: "",
    meetingLink: "",
    notes: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    await scheduleInterview(applicationId, form);

    navigate("/recruiter/interviews");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        type="datetime-local"
        className="border p-3 w-full"
        onChange={(e) =>
          setForm({
            ...form,
            date: e.target.value,
          })
        }
      />

      <input
        className="border p-3 w-full"
        placeholder="Meeting Link"
        onChange={(e) =>
          setForm({
            ...form,
            meetingLink: e.target.value,
          })
        }
      />

      <textarea
        className="border p-3 w-full"
        placeholder="Notes"
        onChange={(e) =>
          setForm({
            ...form,
            notes: e.target.value,
          })
        }
      />

      <button className="bg-black text-white px-5 py-2">Schedule</button>
    </form>
  );
};

export default ScheduleInterview;
