const { Sequelize } = require("sequelize");
const sequelize = require("./sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
}

module.exports = {
  syncDatabase,
};
