const app = require("./app");

const cloudinary = require("cloudinary");
const connectionDB = require("./config/dataBase");

// handling uncaught Exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to  uncaught Exception");

  process.exit(1);
});

// config
// if (process.env.NODE_ENV !== "PRODUCTION") {
require("dotenv").config();
// }

// connection to database
connectionDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// server port
const server = app.listen(process.env.PORT, () => {
  console.log(
    `server is running at port http://localhost:${process.env.PORT} `
  );
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
