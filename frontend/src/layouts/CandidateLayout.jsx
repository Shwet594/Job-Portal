import Navbar from "../components/shared/Navbar";
import CandidateSidebar from "../components/candidate/CandidateSidebar";
import { Outlet } from "react-router-dom";

const CandidateLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="flex">
        <CandidateSidebar />

        <main className="flex-1 p-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CandidateLayout;
