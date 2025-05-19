import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/customers", label: "Customers" },
    { path: "/employees", label: "Employees" },
    { path: "/rooms", label: "Rooms" },
    { path: "/services", label: "Services" },
    { path: "/bookings", label: "Bookings" },
    { path: "/invoices", label: "Invoices" },
    { path: "/work-schedules", label: "Work Schedules" },
  ];

  return (
    <nav className="bg-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-white text-xl font-semibold">
                Hotel Management
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-purple-700 text-white"
                    : "text-purple-100 hover:bg-purple-500 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
