const sequelize = require("../config/sequelize");
const Event = require("./event");
const User = require("./user");

// Define many-to-many relationship between Events and Users
Event.belongsToMany(User, { through: "EventUsers" });
User.belongsToMany(Event, { through: "EventUsers" });

module.exports = {
  Event,
  User,
  sequelize,
};
