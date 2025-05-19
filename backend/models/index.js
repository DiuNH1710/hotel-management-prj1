import sequelize from "../config/database.js";
import Customer from "./customerModel.js";
import Room from "./roomModel.js";
import Booking from "./bookingModel.js";
import Service from "./serviceModel.js";
import BookingService from "./bookingServiceModel.js";
import Employee from "./employeeModel.js";
import Invoice from "./invoiceModel.js";
import WorkSchedule from "./workScheduleModel.js";

// Define associations
const defineAssociations = () => {
  // Customer associations
  Customer.hasMany(Booking, { foreignKey: "customerId" });
  Booking.belongsTo(Customer, { foreignKey: "customerId" });

  // Room associations
  Room.hasMany(Booking, {
    foreignKey: "roomId",
    onDelete: "CASCADE",
  });
  Booking.belongsTo(Room, { foreignKey: "roomId" });

  // Service associations
  Service.hasMany(BookingService, { foreignKey: "serviceId" });
  BookingService.belongsTo(Service, { foreignKey: "serviceId" });

  // Booking associations
  Booking.hasMany(BookingService, { foreignKey: "bookingId" });
  BookingService.belongsTo(Booking, { foreignKey: "bookingId" });

  // Invoice associations
  Booking.hasOne(Invoice, { foreignKey: "bookingId" });
  Invoice.belongsTo(Booking, { foreignKey: "bookingId" });

  // Employee and WorkSchedule associations
  Employee.hasMany(WorkSchedule, {
    foreignKey: "employee_id",
    as: "workSchedules",
    onDelete: "CASCADE",
  });
  WorkSchedule.belongsTo(Employee, {
    foreignKey: "employee_id",
    as: "employee",
  });
};

// Sync database
export const syncDatabase = async () => {
  try {
    defineAssociations();

    // Sync database with alter: true to preserve data
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing database:", error);
    throw error;
  }
};

export {
  Customer,
  Room,
  Booking,
  Service,
  BookingService,
  Employee,
  Invoice,
  WorkSchedule,
};
