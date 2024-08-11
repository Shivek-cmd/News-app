import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-800 text-white fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link className="text-2xl font-bold" to="/">
          NewsMonkey
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link className="hover:text-gray-400 transition-colors" to="/">
            Home
          </Link>
          <Link
            className="hover:text-gray-400 transition-colors"
            to="/business"
          >
            Business
          </Link>
          <Link
            className="hover:text-gray-400 transition-colors"
            to="/entertainment"
          >
            Entertainment
          </Link>
          <Link className="hover:text-gray-400 transition-colors" to="/health">
            Health
          </Link>
          <Link className="hover:text-gray-400 transition-colors" to="/science">
            Science
          </Link>
          <Link className="hover:text-gray-400 transition-colors" to="/sports">
            Sports
          </Link>
          <Link
            className="hover:text-gray-400 transition-colors"
            to="/technology"
          >
            Technology
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-16 left-0 w-full bg-gray-800 text-white p-4 transition-transform ${
          isOpen ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
      >
        <div className="flex flex-col space-y-4">
          <Link
            className="hover:text-gray-400 transition-colors"
            to="/"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            className="hover:text-gray-400 transition-colors"
            to="/business"
            onClick={toggleMenu}
          >
            Business
          </Link>
          <Link
            className="hover:text-gray-400 transition-colors"
            to="/entertainment"
            onClick={toggleMenu}
          >
            Entertainment
          </Link>
          <Link
            className="hover:text-gray-400 transition-colors"
            to="/health"
            onClick={toggleMenu}
          >
            Health
          </Link>
          <Link
            className="hover:text-gray-400 transition-colors"
            to="/science"
            onClick={toggleMenu}
          >
            Science
          </Link>
          <Link
            className="hover:text-gray-400 transition-colors"
            to="/sports"
            onClick={toggleMenu}
          >
            Sports
          </Link>
          <Link
            className="hover:text-gray-400 transition-colors"
            to="/technology"
            onClick={toggleMenu}
          >
            Technology
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
