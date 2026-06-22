import {
  useEffect,
} from "react";

import StatCard from "../../components/shared/StatCard";

import {
  useDashboardStore,
} from "../../store/dashboardStore";

import {useProfileStore} from "../../store/profileStore";

const CandidateDashboard = () => {

  const {
    candidateStats,
    getCandidateStats,
  } = useDashboardStore();

  const {
    completion,
    getCompletion,
  } = useProfileStore();

  useEffect(() => {

    getCandidateStats();

    getCompletion();

  }, []);

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Candidate Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

        <StatCard
          title="Applications"
          value={
            candidateStats?.totalApplications || 0
          }
        />

        <StatCard
          title="Selected"
          value={
            candidateStats?.selected || 0
          }
        />

        <StatCard
          title="Rejected"
          value={
            candidateStats?.rejected || 0
          }
        />

        <StatCard
          title="Under Review"
          value={
            candidateStats?.underReview || 0
          }
        />

        <StatCard
          title="Profile Complete"
          value={`${completion?.completionPercentage || 0}%`}
        />

      </div>

      {completion?.missingFields?.length >
        0 && (
        <div className="border rounded-lg p-5 mt-6">

          <h2 className="font-semibold mb-3">
            Complete Your Profile
          </h2>

          <ul className="list-disc ml-5">

            {completion.missingFields.map(
              (field) => (
                <li key={field}>
                  {field}
                </li>
              )
            )}

          </ul>

        </div>
      )}

    </div>
  );
};

export default CandidateDashboard;