import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const WorkSchedule = sequelize.define(
  "WorkSchedule",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "employees",
        key: "id",
        onDelete: "CASCADE",
      },
    },
    work_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    shift: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    tableName: "work_schedules",
    timestamps: true,
  }
);

export default WorkSchedule;
