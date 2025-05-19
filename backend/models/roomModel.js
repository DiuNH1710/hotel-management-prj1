import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Room = sequelize.define(
  "Room",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    roomNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Single", "Double", "Suite", "Deluxe"]],
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Available", "Occupied", "Maintenance"),
      defaultValue: "Available",
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING(255),
      get() {
        const rawValue = this.getDataValue("image");
        if (!rawValue) return null;
        if (typeof rawValue === "string") return rawValue;
        if (rawValue.type === "Buffer") {
          return Buffer.from(rawValue.data).toString("utf8");
        }
        return rawValue;
      },
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["roomNumber"],
      },
    ],
  }
);

export default Room;
