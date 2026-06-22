import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });


const navigate = useNavigate();

const submit = async (e) => {
  e.preventDefault();
  console.log("SUBMIT CLICKED");
  try {
    const res =
      await axiosInstance.post(
        "/auth/login",
        form
      );
    console.log(res,"Reesponse")
    if (
      res.data.role ===
      "candidate"
    ) {
      navigate("/candidate");
    } if (res.data.role === "recruiter") {
      navigate("/recruiter");
    }
  } catch (error) {
  console.log("FULL ERROR:", error);
  console.log("RESPONSE:", error.response?.data);
  console.log("STATUS:", error.response?.status);
}
};

  return (
    <form onSubmit={submit} className="p-10">
      <input
        className="border p-2"
        placeholder="email"
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <input
        className="border p-2"
        placeholder="password"
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      <button className="bg-black text-white p-2">Login</button>
    </form>
  );
};

export default Login;
