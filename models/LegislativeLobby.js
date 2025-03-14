const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const LegislativeLobby = sequelize.define(
  "LegislativeLobby",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING, // Store image path
      allowNull: false,
    },
    hoverImage: {
      type: DataTypes.STRING, // Store hover image path
      allowNull: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

LegislativeLobby.sync({ alter: true })
  .then(() => console.log("LegislativeLobby table synced successfully."))
  .catch((err) => console.error("Error syncing LegislativeLobby table:", err));

module.exports = LegislativeLobby;