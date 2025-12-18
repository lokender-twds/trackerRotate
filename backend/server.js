require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const redirectRoutes = require("./routes/redirect");
const adminRoutes = require("./routes/admin");

const app = express();

/**
 * ✅ CORS configuration
 */
const allowedOrigins = [
  "http://localhost:5173",
  "https://dashboard.proznth.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow non-browser requests (curl, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

app.use(express.json());

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "link_tracker",
      serverSelectionTimeoutMS: 5000
    });

    console.log("MongoDB connected");

    app.use("/", redirectRoutes);
    app.use("/api", adminRoutes);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection failed");
    console.error("Message:", err.message);
    process.exit(1);
  }
}

startServer();
