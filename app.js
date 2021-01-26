const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Connect to DB
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Success: Connected to database")
);

// Server listen
app.listen(process.env.PORT || 5000, () =>
  console.log("Server listening on port 5000")
);
