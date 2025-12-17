const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  slug: { type: String, unique: true },
  offerUrl: String,
  affiliateId: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Link", LinkSchema);

