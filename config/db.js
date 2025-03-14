require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "hcrfdb",
  process.env.DB_USER || "user@hcrf",
  process.env.DB_PASSWORD || "1234@1234",
  {
    host: process.env.DB_HOST || "172.17.0.3",
    dialect: "mysql",  // ✅ Hardcoded for debugging
    port: process.env.DB_PORT || 3306,
    logging: false,
  }
);

module.exports = { sequelize };
