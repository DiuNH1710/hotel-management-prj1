import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Hotel,
  People,
  Receipt,
  CalendarToday,
  AttachMoney,
} from "@mui/icons-material";

const API_BASE_URL = "http://localhost:5000";

const Home = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    occupiedRooms: 0,
    availableRooms: 0,
    dailyRevenue: 0,
    monthlyRevenue: 0,
    totalCustomers: 0,
    totalBookings: 0,
  });

  useEffect(() => {
    // Fetch statistics from backend
    const fetchStats = async () => {
      try {
        console.log(
          "Fetching stats from:",
          `${API_BASE_URL}/api/dashboard/stats`
        );
        const response = await axios.get(`${API_BASE_URL}/api/dashboard/stats`);
        console.log("Received stats:", response.data);
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error.response || error);
      }
    };

    fetchStats();
  }, []);

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

  const formatCurrency = (amount) => {
    return `$${(amount || 0).toLocaleString()}`;
  };

  const statCards = [
    {
      title: "Room Status",
      value: `${stats.availableRooms || 0}/${stats.totalRooms || 0}`,
      description: "Available/Total Rooms",
      icon: <Hotel className="w-8 h-8" />,
      color: "bg-blue-500",
    },
    {
      title: "Daily Revenue",
      value: formatCurrency(stats.dailyRevenue),
      description: "Today's Revenue",
      icon: <AttachMoney className="w-8 h-8" />,
      color: "bg-green-500",
    },
    {
      title: "Monthly Revenue",
      value: formatCurrency(stats.monthlyRevenue),
      description: "This Month's Revenue",
      icon: <CalendarToday className="w-8 h-8" />,
      color: "bg-yellow-500",
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers || 0,
      description: "Registered Customers",
      icon: <People className="w-8 h-8" />,
      color: "bg-purple-500",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings || 0,
      description: "Active Bookings",
      icon: <Receipt className="w-8 h-8" />,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Hotel Management System
        </h1>
        <p className="text-xl text-gray-600">
          Manage your hotel operations efficiently
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className={`${stat.color} p-4`}>
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <p className="text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="text-white opacity-75">{stat.icon}</div>
              </div>
              <p className="text-white text-sm mt-2">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Features Grid */}
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
