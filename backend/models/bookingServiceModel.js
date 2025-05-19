import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Service from "./serviceModel.js";

const BookingService = sequelize.define(
  "BookingService",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    bookingId: { type: DataTypes.INTEGER, allowNull: false },
    serviceId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  { timestamps: true }
);

// Association with Service
BookingService.belongsTo(Service, { foreignKey: "serviceId" });
Service.hasMany(BookingService, { foreignKey: "serviceId" });

export default BookingService;
