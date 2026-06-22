import Navbar from "../components/shared/Navbar";
import RecruiterSidebar from "../components/recruiter/RecruiterSidebar";
import { Outlet } from "react-router-dom";

const RecruiterLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex">
        <RecruiterSidebar />

        <main className="flex-1 p-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecruiterLayout;
