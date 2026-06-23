import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useJobStore } from "../../store/jobStore";

const EditJob = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { selectedJob, getJobById, updateJob } = useJobStore();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    experience: "",
    skillsRequired: "",
  });

  useEffect(() => {
    getJobById(id);
  }, [id]);

  useEffect(() => {
    if (selectedJob) {
      setForm({
        title: selectedJob.title || "",
        description: selectedJob.description || "",
        location: selectedJob.location || "",
        salary: selectedJob.salary || "",
        experience: selectedJob.experience || "",
        skillsRequired: selectedJob.skillsRequired?.join(", ") || "",
      });
    }
  }, [selectedJob]);

  const submit = async (e) => {
    e.preventDefault();

    await updateJob(id, {
      ...form,
      skillsRequired: form.skillsRequired.split(",").map((s) => s.trim()),
    });

    navigate("/recruiter/jobs");
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Edit Job</h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          className="border p-3 w-full"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />

        <textarea
          className="border p-3 w-full"
          rows={5}
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <input
          className="border p-3 w-full"
          placeholder="Location"
          value={form.location}
          onChange={(e) =>
            setForm({
              ...form,
              location: e.target.value,
            })
          }
        />

        <input
          className="border p-3 w-full"
          placeholder="Salary"
          value={form.salary}
          onChange={(e) =>
            setForm({
              ...form,
              salary: e.target.value,
            })
          }
        />

        <input
          className="border p-3 w-full"
          placeholder="Experience"
          value={form.experience}
          onChange={(e) =>
            setForm({
              ...form,
              experience: e.target.value,
            })
          }
        />

        <input
          className="border p-3 w-full"
          placeholder="React, Node, MongoDB"
          value={form.skillsRequired}
          onChange={(e) =>
            setForm({
              ...form,
              skillsRequired: e.target.value,
            })
          }
        />

        <button className="bg-black text-white px-6 py-3 rounded">
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;
