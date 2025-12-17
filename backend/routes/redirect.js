const express = require("express");
const { v4: uuid } = require("uuid");
const Link = require("../models/Link");
const Click = require("../models/Click");
const hash = require("../utils/hash");

const router = express.Router();

router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  const { iclid } = req.query;

  const link = await Link.findOne({ slug });
  if (!link) return res.status(404).send("Not found");

  await Click.create({
    linkSlug: slug,
    gclid: iclid || null,
    ipHash: hash(req.ip),
    userAgent: req.headers["user-agent"]
  });

  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Cache-Control", "no-store");

  res.redirect(
    302,
    `${link.offerUrl}?afid=${link.affiliateId}`
  );
});

module.exports = router;
