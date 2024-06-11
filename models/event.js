const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Event = sequelize.define(
  "Event",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER, // Duration in minutes
      allowNull: false,
    },
    notification_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    files: {
      type: DataTypes.STRING, // Store file paths or URLs as a string
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Event;
