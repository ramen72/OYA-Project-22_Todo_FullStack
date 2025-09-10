const mongoose = require("mongoose");

let databaseConfig = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("MongoDB Database Connected successfully.");
    })
    .catch((error) => {
      console.log(`MongoDB Database Connection Error: ` + error);
    });
};

module.exports = databaseConfig;
