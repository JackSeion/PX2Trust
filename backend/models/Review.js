// models/Review.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  trader: { type: String, required: true },  // trader wallet
  reviewer: { type: String, required: true }, // reviewer wallet
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
