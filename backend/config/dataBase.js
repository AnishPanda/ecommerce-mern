const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectionDB = () => {
  mongoose.connect(process.env.DB_URI).then(() => {
    console.log(`MongoDB is Connected `);
  });
};

module.exports = connectionDB;
