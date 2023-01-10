const express = require("express");
const errorMiddleWear = require("./middleware/error");
const cookiePaser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();
const productRoute = require("./routes/productRoutes");
const userRoute = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");
const payment = require("./routes/paymentRoute");
const cors = require("cors");

// config
// if (process.env.NODE_ENV !== "PRODUCTION") {
require("dotenv").config();
// }

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookiePaser());
app.use(fileUpload());

// Route Imports

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// middleWear for Error
app.use(errorMiddleWear);

module.exports = app;
