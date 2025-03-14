const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Book = sequelize.define(
  "Book",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("best_practices", "case_studies", "research_papers", "e_book"),
      allowNull: false,
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pdfFile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // Stores INR values with 2 decimal places
      allowNull: false,               // Set to true if price can be optional
      defaultValue: 0.00              // Default value if not provided
    }
  },
  {
    timestamps: true,
  }
);

// Synchronize the model with the database
Book.sync({ alter: true })
  .then(() => console.log("Book table synced successfully."))
  .catch((err) => console.error("Error syncing Book table:", err));

module.exports = Book;