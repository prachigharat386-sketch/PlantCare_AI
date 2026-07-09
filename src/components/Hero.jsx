import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-green-50 min-h-[80vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-green-700">
          Smart Plant Care with AI 🌿
        </h1>

        <p className="mt-6 text-xl text-gray-600">
          Upload your plant, track its health and get AI-powered care tips.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-8 bg-green-600 text-white px-8 py-4 rounded-xl text-lg hover:bg-green-700"
        >
          Get Started
        </button>
      </div>
    </section>
  );
}

export default Hero;