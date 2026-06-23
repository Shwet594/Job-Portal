import {
  useEffect,
} from "react";

import StatCard from "../../components/shared/StatCard";
import ApplicantsChart from "../../components/recruiter/ApplicantsChart";

import {
  useDashboardStore,
} from "../../store/dashboardStore";

const RecruiterDashboard = () => {

  const {
    recruiterStats,
    applicantsChart,
    getRecruiterStats,
    getApplicantsPerJob,
  } = useDashboardStore();

  useEffect(() => {
    getApplicantsPerJob();
    getRecruiterStats();

  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Recruiter Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Jobs Posted" value={recruiterStats?.totalJobs || 0} />

        <StatCard
          title="Applicants"
          value={recruiterStats?.totalApplicants || 0}
        />

        <StatCard
          title="Selected"
          value={recruiterStats?.selectedCandidates || 0}
        />

        <StatCard
          title="Rejected"
          value={recruiterStats?.rejectedCandidates || 0}
        />
        <div className="mt-8">
          <ApplicantsChart data={applicantsChart} />
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;