const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/rentigo")
  .then(() => {
    console.log("MongoDB test insert possible");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
