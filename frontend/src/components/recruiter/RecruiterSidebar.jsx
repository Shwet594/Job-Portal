import { LayoutDashboard, Briefcase, PlusCircle, Calendar } from "lucide-react";

import { NavLink } from "react-router-dom";

const RecruiterSidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive ? "bg-black text-white" : "hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <h2 className="font-bold text-lg mb-6">Recruiter</h2>

      <div className="space-y-2">
        <NavLink to="/recruiter" end className={linkClass}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/recruiter/create-job" className={linkClass}>
          <PlusCircle size={18} />
          Create Job
        </NavLink>

        <NavLink to="/recruiter/jobs" className={linkClass}>
          <Briefcase size={18} />
          My Jobs
        </NavLink>

        <NavLink to="/recruiter/interviews" className={linkClass}>
          <Calendar size={18} />
          Interviews
        </NavLink>
      </div>
    </aside>
  );
};

export default RecruiterSidebar;
