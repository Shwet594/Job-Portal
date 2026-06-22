import { BriefcaseBusiness } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <nav className="h-16 bg-white border-b flex items-center justify-between px-8 shadow-sm">
      <div className="flex items-center gap-3">
        <BriefcaseBusiness size={28} />

        <h1 className="text-2xl font-bold">Job Portal</h1>
      </div>

      <div className="flex items-center gap-5">
        <div className="text-right">
          <p className="font-semibold">{authUser?.name}</p>

          <p className="text-xs text-gray-500 capitalize">{authUser?.role}</p>
        </div>

        <button
          onClick={logout}
          className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
