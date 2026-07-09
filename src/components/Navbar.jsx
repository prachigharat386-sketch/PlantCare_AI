import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-10 py-5 shadow-md bg-white">
      <h1
        onClick={() => navigate("/")}
        className="text-3xl font-bold text-green-600 cursor-pointer"
      >
        🌱 PlantCare AI
      </h1>

      <ul className="flex gap-8 font-medium">
        <li
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="cursor-pointer hover:text-green-600"
        >
          Home
        </li>

        <li
          onClick={() =>
            document
              .getElementById("features")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="cursor-pointer hover:text-green-600"
        >
          Features
        </li>

        <li
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="cursor-pointer hover:text-green-600"
        >
          About
        </li>

        <li
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="cursor-pointer hover:text-green-600"
        >
          Contact
        </li>
      </ul>

      <button
        onClick={() => navigate("/login")}
        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
      >
        Login
      </button>
    </nav>
  );
}

export default Navbar;