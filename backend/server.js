require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const redirectRoutes = require("./routes/redirect");
const adminRoutes = require("./routes/admin");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://dashboard.proznth.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// 🔴 THIS IS THE KEY FIX
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "link_tracker",
      serverSelectionTimeoutMS: 5000
    });

    console.log("MongoDB connected");

    // API FIRST
    app.use("/api", adminRoutes);

    // Redirect LAST
    app.use("/", redirectRoutes);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

startServer();
