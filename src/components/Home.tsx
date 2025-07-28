import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="min-h-96 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">
        Generate your professional resume in just 5 minutes.
      </h1>
      <p className="text-lg mb-6 text-gray-600">AI-powered, fast, and beautiful.</p>
      <button
        onClick={() => navigate("/build")}
        className="bg-primary text-white px-6 cursor-pointer py-3 rounded-xl hover:opacity-70 transition"
      >
        Get Started
      </button>
    </section>
  );
}