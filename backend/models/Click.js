const mongoose = require("mongoose");

const ClickSchema = new mongoose.Schema({
  linkSlug: String,
  gclid: String,
  ipHash: String,
  userAgent: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Click", ClickSchema);
