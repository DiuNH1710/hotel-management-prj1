import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Booking from "./bookingModel.js";

const Invoice = sequelize.define(
  "Invoice",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    bookingId: { type: DataTypes.INTEGER, allowNull: false },
    invoiceNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    issueDate: { type: DataTypes.DATE, allowNull: false },
    dueDate: { type: DataTypes.DATE, allowNull: false },
    subtotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    tax: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: {
      type: DataTypes.ENUM("Pending", "Paid", "Overdue", "Cancelled"),
      defaultValue: "Pending",
    },
    paymentMethod: {
      type: DataTypes.ENUM("Cash", "Credit Card", "Bank Transfer"),
      allowNull: true,
    },
    notes: { type: DataTypes.TEXT, allowNull: true },
  },
  { timestamps: true }
);

Booking.hasOne(Invoice, { foreignKey: "bookingId" });
Invoice.belongsTo(Booking, { foreignKey: "bookingId" });

export default Invoice;
