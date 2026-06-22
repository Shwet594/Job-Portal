import { useState } from "react";
import { useJobStore } from "../../store/jobStore";
const CreateJob = () => {
  const {createJob} =
    useJobStore();
  const [form, setForm] =
    useState({
      title: "",
      description: "",
      location: "",
      salary: "",
      experience: "",
      skillsRequired: "",
    });

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      const payload = {
        ...form,
        skillsRequired:
          form.skillsRequired
            .split(",")
            .map((skill) =>
              skill.trim()
            ),
      };

      await createJob(payload);

      alert(
        "Job created successfully"
      );

      setForm({
        title: "",
        description: "",
        location: "",
        salary: "",
        experience: "",
        skillsRequired: "",
      });
    };

  return (
    <div className="max-w-3xl">

      <h1 className="text-3xl font-bold mb-6">
        Create Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          className="border p-3 w-full"
          placeholder="Job Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title:
                e.target.value,
            })
          }
        />

        <textarea
          className="border p-3 w-full"
          placeholder="Description"
          rows={5}
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value,
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
              location:
                e.target.value,
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
              salary:
                e.target.value,
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
              experience:
                e.target.value,
            })
          }
        />

        <input
          className="border p-3 w-full"
          placeholder="React, Node, MongoDB"
          value={
            form.skillsRequired
          }
          onChange={(e) =>
            setForm({
              ...form,
              skillsRequired:
                e.target.value,
            })
          }
        />

        <button
          className="bg-black text-white px-6 py-3"
        >
          Create Job
        </button>

      </form>
    </div>
  );
};

export default CreateJob;