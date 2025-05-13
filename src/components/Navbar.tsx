import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Student Dashboard</h1>
      <div>
        <Link to="/profile">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
            Profile
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
