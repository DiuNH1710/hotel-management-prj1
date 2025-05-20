import Room from "../models/roomModel.js";
import Customer from "../models/customerModel.js";
import Booking from "../models/bookingModel.js";
import Invoice from "../models/invoiceModel.js";
import { Op } from "sequelize";
import { startOfDay, endOfDay, startOfMonth, endOfMonth } from "date-fns";

export const getDashboardStats = async (req, res) => {
  try {
    console.log("Starting to fetch dashboard stats...");

    // Get total rooms and available rooms
    const totalRooms = await Room.count();
    console.log("Total rooms:", totalRooms);

    const occupiedRooms = await Room.count({
      where: {
        status: "Occupied",
      },
    });
    console.log("Occupied rooms:", occupiedRooms);

    const availableRooms = totalRooms - occupiedRooms;
    console.log("Available rooms:", availableRooms);

    // Get revenue for today
    const today = new Date();
    const dailyRevenue = await Invoice.sum("total", {
      where: {
        createdAt: {
          [Op.between]: [startOfDay(today), endOfDay(today)],
        },
        status: "Paid",
      },
      raw: true,
    });
    console.log("Daily revenue:", dailyRevenue);

    // Get revenue for current month
    const monthlyRevenue = await Invoice.sum("total", {
      where: {
        createdAt: {
          [Op.between]: [startOfMonth(today), endOfMonth(today)],
        },
        status: "Paid",
      },
      raw: true,
    });
    console.log("Monthly revenue:", monthlyRevenue);

    // Get total customers
    console.log("Fetching customers...");
    const customers = await Customer.findAll({
      attributes: ["id"],
      raw: true,
    });
    const totalCustomers = customers.length;
    console.log(
      "Total customers:",
      totalCustomers,
      "Customer IDs:",
      customers.map((c) => c.id)
    );

    // Get total active bookings
    console.log("Fetching bookings...");
    const bookings = await Booking.findAll({
      where: {
        status: {
          [Op.in]: ["Confirmed", "Completed"],
        },
      },
      attributes: ["id", "status"],
      raw: true,
    });
    const totalBookings = bookings.length;
    console.log(
      "Total bookings:",
      totalBookings,
      "Booking statuses:",
      bookings.map((b) => b.status)
    );

    const stats = {
      totalRooms,
      occupiedRooms,
      availableRooms,
      dailyRevenue: dailyRevenue || 0,
      monthlyRevenue: monthlyRevenue || 0,
      totalCustomers,
      totalBookings,
    };

    console.log("Final dashboard stats:", stats);

    res.json(stats);
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    res.status(500).json({
      message: "Error getting dashboard statistics",
      error: error.message,
      stack: error.stack,
    });
  }
};
