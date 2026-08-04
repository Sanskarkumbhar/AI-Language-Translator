import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-blue-600">
          🌍 AI Translator
        </h1>

        <div className="flex gap-6">

          <Link
            to="/"
            className="hover:text-blue-600 font-medium"
          >
            Home
          </Link>

          <Link
            to="/translator"
            className="hover:text-blue-600 font-medium"
          >
            Translator
          </Link>

          <Link
            to="/random-string"
            className="hover:text-blue-600 font-medium"
          >
            Random String
          </Link>

          <Link
            to="/about"
            className="hover:text-blue-600 font-medium"
          >
            About
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;