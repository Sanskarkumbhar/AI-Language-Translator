 import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-bold text-blue-600">
          🌍 AI Translator
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-blue-600 font-medium">
            Home
          </Link>

          <Link to="/translator" className="hover:text-blue-600 font-medium">
            Translator
          </Link>

          <Link to="/random-string" className="hover:text-blue-600 font-medium">
            Random String
          </Link>

          <Link to="/about" className="hover:text-blue-600 font-medium">
            About
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 pb-4 bg-white shadow">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/translator"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-600"
          >
            Translator
          </Link>

          <Link
            to="/random-string"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-600"
          >
            Random String
          </Link>

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-600"
          >
            About
          </Link>

        </div>
      )}
    </nav>
  );
}

export default Navbar;