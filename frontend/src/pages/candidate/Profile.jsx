import { useState, useEffect } from "react";

import { useProfileStore } from "../../store/profileStore";

const Profile = () => {
  const { profile, getProfile, updateProfileDetails, uploadResume } =
    useProfileStore();

  const [form, setForm] = useState({
    bio: "",
    skills: "",
    education: "",
    experience: "",
  });
  const [resume, setResume] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setForm({
        bio: profile.bio || "",
        skills: profile.skills?.join(", ") || "",
        education: profile.education || "",
        experience: profile.experience || "",
      });
    }
  }, [profile]);
  const handleResumeUpload = async () => {
    if (!resume) return;

    await uploadResume(resume);

    alert("Resume uploaded successfully");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateProfileDetails({
      ...form,
      skills: form.skills.split(",").map((s) => s.trim()),
    });

    alert("Profile Updated");
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="border p-3 w-full"
          placeholder="Bio"
          rows={4}
          value={form.bio}
          onChange={(e) =>
            setForm({
              ...form,
              bio: e.target.value,
            })
          }
        />

        <input
          className="border p-3 w-full"
          placeholder="Skills"
          value={form.skills}
          onChange={(e) =>
            setForm({
              ...form,
              skills: e.target.value,
            })
          }
        />

        <input
          className="border p-3 w-full"
          placeholder="Education"
          value={form.education}
          onChange={(e) =>
            setForm({
              ...form,
              education: e.target.value,
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

        <button className="bg-black text-white px-6 py-3">Save</button>
      </form>
      <div className="mt-8 border p-4 rounded">
        <h2 className="font-semibold mb-3">Resume</h2>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
        />

        <button
          onClick={handleResumeUpload}
          className="bg-blue-500 text-white px-4 py-2 ml-3"
        >
          Upload Resume
        </button>
      </div>
      {profile?.resumeUrl && (
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline block mt-4"
        >
          View Resume
        </a>
      )}
    </div>
  );
};

export default Profile;
