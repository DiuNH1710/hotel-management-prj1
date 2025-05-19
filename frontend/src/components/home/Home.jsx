import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      title: "Room Management",
      description: "Add and manage hotel rooms with ease",
      path: "/add-room",
      color: "bg-purple-600",
    },
    {
      title: "Customer Management",
      description: "Handle customer information and bookings",
      path: "/add-customer",
      color: "bg-purple-600",
    },
    {
      title: "Employee Management",
      description: "Manage staff information and roles",
      path: "/add-employee",
      color: "bg-purple-600",
    },
    {
      title: "Service Management",
      description: "Add and manage hotel services",
      path: "/add-service",
      color: "bg-purple-600",
    },
    {
      title: "Booking Management",
      description: "Manage room bookings and reservations",
      path: "/bookings",
      color: "bg-purple-600",
    },
    {
      title: "Invoice Management",
      description: "View and manage customer invoices",
      path: "/invoices",
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Hotel Management System
        </h1>
        <p className="text-xl text-gray-600">
          Manage your hotel operations efficiently
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Link
            key={index}
            to={feature.path}
            className="block transform transition duration-300 hover:scale-105"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
              <div className={`${feature.color} h-2`}></div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 flex-1">{feature.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
