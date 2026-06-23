import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const ApplicantsChart = ({ data }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow border">
      <h2 className="text-xl font-semibold mb-5">Applicants Per Job</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="_id" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="applicants" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ApplicantsChart;
