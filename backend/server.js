require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const redirectRoutes = require("./routes/redirect");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);

app.use(express.json());

// 🔴 IMPORTANT FIX: await MongoDB before starting server
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "link_tracker"
    });

    console.log("MongoDB connected");

    app.use("/", redirectRoutes);
    app.use("/api", adminRoutes);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}

startServer();
