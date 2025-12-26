require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "hcrfdb",
  process.env.DB_USER || "hcrf_user",
  process.env.DB_PASSWORD || "bold@321@321",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",  // ✅ Hardcoded for debugging
    port: process.env.DB_PORT || 3306,
    logging: false,
  }
);

module.exports = { sequelize };
