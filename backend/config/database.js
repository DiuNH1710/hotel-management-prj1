import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Khởi tạo Sequelize với thông tin từ .env
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Tắt logging SQL (tuỳ chọn)
  }
);

export default sequelize;
