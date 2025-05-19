import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Customer from "./customerModel.js";
import Room from "./roomModel.js";
import BookingService from "./bookingServiceModel.js";
import Service from "./serviceModel.js";

const Booking = sequelize.define(
  "Booking",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    customerId: { type: DataTypes.INTEGER, allowNull: false },
    roomId: { type: DataTypes.INTEGER, allowNull: false },
    checkInDate: { type: DataTypes.DATE, allowNull: false },
    checkOutDate: { type: DataTypes.DATE, allowNull: false },
    status: {
      type: DataTypes.ENUM("Pending", "Confirmed", "Completed", "Cancelled"),
      defaultValue: "Pending",
    },
    totalAmount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  },
  { timestamps: true }
);

// Associations
Booking.belongsTo(Customer, { foreignKey: "customerId" });
Customer.hasMany(Booking, { foreignKey: "customerId" });

Booking.belongsTo(Room, { foreignKey: "roomId" });
Room.hasMany(Booking, { foreignKey: "roomId", onDelete: "CASCADE" });

Booking.hasMany(BookingService, { foreignKey: "bookingId" });
BookingService.belongsTo(Booking, { foreignKey: "bookingId" });

export default Booking;
