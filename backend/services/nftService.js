require("dotenv").config();
const { JsonRpcProvider, Wallet, Contract } = require("ethers");
const Review = require("../models/Review");

// ✅ Setup provider
const provider = new JsonRpcProvider(process.env.RPC_URL);

// ✅ Setup wallet
const wallet = new Wallet(process.env.PRIVATE_KEY.trim(), provider);

// ✅ Setup contract
const contract = new Contract(
  process.env.CONTRACT_ADDRESS,
  require("../abi/NFT.json"),
  wallet
);

// ✅ Enum mapping (must match your Solidity contract enum ReputationNFT.Tier)
const TIER = {
  BRONZE: 0,
  SILVER: 1,
  GOLD: 2,
};

async function checkAndMintNFT(trader) {
  const reviews = await Review.find({ trader });
  const reviewCount = reviews.length;
  const avgRating =
    reviewCount > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviewCount
      : 0;

  // Must always meet avg rating 4+
  if (avgRating < 4) {
    console.log(
      `ℹ️ Trader ${trader} has avg rating ${avgRating.toFixed(
        2
      )}, not eligible for NFT`
    );
    return;
  }

  // Decide tier based on review count
  let tier = null;
  if (reviewCount >= 20) {
    tier = TIER.GOLD;
  } else if (reviewCount >= 10) {
    tier = TIER.SILVER;
  } else if (reviewCount >= 5) {
    tier = TIER.BRONZE;
  }

  if (tier !== null) {
    try {
      const tierName = Object.keys(TIER).find((key) => TIER[key] === tier);

      console.log(
        `🏅 Trader ${trader} qualifies for ${tierName} NFT (Reviews: ${reviewCount}, Avg: ${avgRating.toFixed(
          2
        )})`
      );

      // ✅ Send transaction
      const tx = await contract.mint(trader, tier, {
        gasLimit: 500000, // Optional: prevent out-of-gas issues
      });

      console.log("📤 Transaction sent, hash:", tx.hash);
      console.log(
        `🔗 Track here: https://sepolia.etherscan.io/tx/${tx.hash}`
      );

      // ✅ Wait for confirmation
      const receipt = await tx.wait();
      console.log(`✅ ${tierName} NFT minted for ${trader}`);
      console.log(`📦 Mined in block: ${receipt.blockNumber}`);

    } catch (err) {
      console.error("❌ Minting error:", err.reason || err.message || err);
    }
  } else {
    console.log(
      `ℹ️ Trader ${trader} not eligible yet (Reviews: ${reviewCount}, Avg: ${avgRating.toFixed(
        2
      )})`
    );
  }
}

module.exports = { checkAndMintNFT };
