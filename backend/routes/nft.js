// routes/nft.js
const express = require("express");
const { JsonRpcProvider, Contract } = require("ethers");
require("dotenv").config();

const router = express.Router();

// ✅ Setup provider & contract
const provider = new JsonRpcProvider(process.env.RPC_URL);
const contract = new Contract(
  process.env.CONTRACT_ADDRESS,
  require("../abi/NFT.json"),
  provider
);

const PINATA_GATEWAY = "https://blush-gigantic-canidae-140.mypinata.cloud/ipfs/";

// ✅ Fetch NFTs for wallet
router.get("/:wallet", async (req, res) => {
  try {
    const wallet = req.params.wallet.toLowerCase();
    const balance = await contract.balanceOf(wallet);
    const nftData = [];

    for (let i = 0; i < balance; i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(wallet, i);
      const tokenURI = await contract.tokenURI(tokenId);

      // Replace ipfs:// with Pinata gateway
      const metadataURL = tokenURI.replace("ipfs://", PINATA_GATEWAY);

      // Fetch metadata
      const response = await fetch(metadataURL);
      const metadata = await response.json();

      // Replace ipfs:// in image link
      const imageURL = metadata.image.replace("ipfs://", PINATA_GATEWAY);

      nftData.push({
        tokenId: tokenId.toString(),
        tier: metadata.name || "Unknown",
        image: imageURL,
      });
    }

    res.json(nftData);
  } catch (err) {
    console.error("❌ NFT Fetch Error:", err);
    res.status(500).json({ error: "Failed to fetch NFTs" });
  }
});

module.exports = router;
