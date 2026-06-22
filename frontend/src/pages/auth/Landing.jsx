import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 bg-white shadow">
        <h1 className="text-2xl font-bold">Job Portal</h1>

        <div className="flex gap-4">
          <Link to="/login" className="px-4 py-2 border rounded">
            Login
          </Link>

          <Link to="/signup" className="px-4 py-2 bg-black text-white rounded">
            Signup
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-8 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">Find Your Dream Job</h1>

        <p className="text-lg text-gray-600 mb-10">
          Connect candidates and recruiters on one platform. Apply for jobs,
          schedule interviews, and manage hiring.
        </p>

        <div className="flex justify-center gap-4">
          <Link to="/signup" className="bg-black text-white px-6 py-3 rounded">
            Get Started
          </Link>

          <Link to="/login" className="border px-6 py-3 rounded">
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-8 pb-20">
        <h2 className="text-3xl font-bold text-center mb-10">Features</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-bold text-xl mb-2">Job Search</h3>

            <p>Browse and apply to jobs easily.</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-bold text-xl mb-2">Resume Management</h3>

            <p>Upload and manage resumes securely.</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-bold text-xl mb-2">Interview Scheduling</h3>

            <p>Recruiters can schedule interviews directly.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
