import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">TaskFlow</h1>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-3 rounded-full bg-white/20 hover:scale-110 transition"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  );
};

export default Navbar;