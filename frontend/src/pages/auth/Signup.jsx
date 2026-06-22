import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/auth/signup", form);

      console.log(res.data);

      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <form onSubmit={submit} className="p-10 flex flex-col gap-3">
      <input
        className="border p-2"
        placeholder="Name"
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
      />

      <input
        className="border p-2"
        placeholder="Email"
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <input
        className="border p-2"
        placeholder="Password"
        type="password"
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      <select
        className="border p-2"
        onChange={(e) =>
          setForm({
            ...form,
            role: e.target.value,
          })
        }
      >
        <option value="candidate">Candidate</option>

        <option value="recruiter">Recruiter</option>
      </select>

      <button className="bg-black text-white p-2">Signup</button>
    </form>
  );
};

export default Signup;
