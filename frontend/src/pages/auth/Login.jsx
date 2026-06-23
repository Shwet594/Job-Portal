import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  

  const { login } = useAuthStore();
const navigate = useNavigate();


const submit = async (e) => {
  e.preventDefault();

  try {
    let user = await login(form);

    console.log("USER:", user);
    console.log("ROLE:", user.role);
    console.log("AUTH USER:", useAuthStore.getState().authUser);

    if (user.role === "candidate") {
      navigate("/candidate");
    } else if (user.role === "recruiter") {
      navigate("/recruiter");
    }
  } catch (error) {
    console.log(error);
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
