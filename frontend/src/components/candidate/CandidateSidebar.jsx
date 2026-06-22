import {
  LayoutDashboard,
  Briefcase,
  Bookmark,
  FileText,
  User,
  Calendar,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const CandidateSidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive ? "bg-black text-white" : "hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <h2 className="font-bold text-lg mb-6">Candidate</h2>

      <div className="space-y-2">
        <NavLink to="/candidate" end className={linkClass}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/candidate/jobs" className={linkClass}>
          <Briefcase size={18} />
          Jobs
        </NavLink>

        <NavLink to="/candidate/saved-jobs" className={linkClass}>
          <Bookmark size={18} />
          Saved Jobs
        </NavLink>

        <NavLink to="/candidate/applications" className={linkClass}>
          <FileText size={18} />
          Applications
        </NavLink>

        <NavLink to="/candidate/profile" className={linkClass}>
          <User size={18} />
          Profile
        </NavLink>

        <NavLink to="/candidate/interviews" className={linkClass}>
          <Calendar size={18} />
          Interviews
        </NavLink>
      </div>
    </aside>
  );
};

export default CandidateSidebar;
