// routes/traders.js
const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

router.get("/:wallet", async (req, res) => {
  const trader = req.params.wallet;
  const reviews = await Review.find({ trader });

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  res.json({
    wallet: trader,
    reviewCount: reviews.length,
    avgRating: avgRating.toFixed(2),
    reviews,
  });
});

module.exports = router;
