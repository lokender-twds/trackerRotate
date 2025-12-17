require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const redirectRoutes = require("./routes/redirect");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/", redirectRoutes);
app.use("/api", adminRoutes);

app.listen(4000, () =>
  console.log("Server running on port 4000")
);
