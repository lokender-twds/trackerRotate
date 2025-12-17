const express = require("express");
const Link = require("../models/Link");

const router = express.Router();

router.post("/links", async (req, res) => {
  const link = await Link.create(req.body);
  res.json(link);
});

router.get("/links", async (req, res) => {
  const links = await Link.find();
  res.json(links);
});

module.exports = router;
