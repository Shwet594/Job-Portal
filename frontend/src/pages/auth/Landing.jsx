import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Find Your Dream Job
              <span className="block text-blue-600">Faster Than Ever</span>
            </h1>

            <p className="text-gray-600 mt-6 text-lg">
              Connect candidates with recruiters. Apply to jobs, schedule
              interviews, manage applications and grow your career.
            </p>

            <div className="flex gap-4 mt-8">
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                Get Started
              </Link>

              <Link to="/login" className="border px-6 py-3 rounded-lg">
                Login
              </Link>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
              alt="jobs"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold">Job Search</h3>

            <p className="text-gray-600 mt-3">
              Search and filter jobs based on skills, salary and location.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold">Resume Upload</h3>

            <p className="text-gray-600 mt-3">
              Upload resumes securely using Cloudinary.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold">Interview Scheduling</h3>

            <p className="text-gray-600 mt-3">
              Recruiters can schedule interviews directly from the platform.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold">100+</h3>
              <p>Jobs Posted</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">500+</h3>
              <p>Candidates</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">50+</h3>
              <p>Recruiters</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">200+</h3>
              <p>Interviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold">Start Your Career Journey Today</h2>

        <p className="text-gray-600 mt-4">
          Join thousands of candidates and recruiters.
        </p>

        <Link
          to="/signup"
          className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg"
        >
          Create Account
        </Link>
      </section>

      {/* Footer */}

      <footer className="border-t py-6 text-center text-gray-500">
        © 2026 Job Portal. Built with MERN Stack.
      </footer>
    </div>
  );
};

export default Landing;
