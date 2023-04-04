const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const hospitalRoutes = require("./routes/hospitalRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userLoginRoutes = require("./routes/userLoginRoutes");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TestAPI");
});
app.use("/", userLoginRoutes);
app.use("/hospitals", hospitalRoutes);
app.use("/doctors", doctorRoutes);
app.use("/users", userRoutes);
app.use("/bookings", bookingRoutes);

// connect to database
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MongoDb_URL)
  .then(() => {
    app.listen(5000, () =>
      console.log("connected to database && server is live at port 5000")
    );
  })
  .catch((error) => console.log(error));

module.exports = app;
