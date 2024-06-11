const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

const sequelize = require("./config/sequelize.js");

sequelize
  .authenticate()
  .then(() => {
    // sequelize.sync();
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on https://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const events = require("./routes/event.route.js");
const users = require("./routes/user.route");
app.use("/api/v1/event", events);
app.use("/api/v1/user", users);

module.exports = app;
