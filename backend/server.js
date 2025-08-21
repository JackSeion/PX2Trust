// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const reviewRoutes = require("./routes/reviews");
const traderRoutes = require("./routes/traders");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Use .env value, fallback to local if missing
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/p2p_reputation";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Error:", err));

app.use("/api/reviews", reviewRoutes);
app.use("/api/traders", traderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
const nftRoutes = require("./routes/nft");
app.use("/api/nft", nftRoutes);
