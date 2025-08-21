// routes/reviews.js
const express = require("express");
const Review = require("../models/Review");
const { verifyTradeHistory } = require("../services/tradeCheck");
const { checkAndMintNFT } = require("../services/nftService");

const router = express.Router();

// Submit review
router.post("/", async (req, res) => {
  let { trader, reviewer, rating, comment } = req.body;

  trader = trader.toLowerCase();
  reviewer = reviewer.toLowerCase();

  // ✅ verify trading history before review
  const valid = await verifyTradeHistory(trader, reviewer);
  if (!valid) return res.status(400).json({ error: "No trade history found." });

  const review = await Review.create({ trader, reviewer, rating, comment });

  // ✅ check if trader qualifies for NFT
  await checkAndMintNFT(trader);

  res.json(review);
});

// Get reviews for trader
router.get("/:trader", async (req, res) => {
  const trader = req.params.trader.toLowerCase();
  const reviews = await Review.find({ trader });
  res.json(reviews);
});


// Get reviews for trader
router.get("/:trader", async (req, res) => {
  const reviews = await Review.find({ trader: req.params.trader });
  res.json(reviews);
});

module.exports = router;
