# P2P Reputation System with NFT Rewards

This project is a **Decentralized Peer-to-Peer Reputation System** where users can submit reviews for traders. Traders earn **NFT reputation badges** (Bronze, Silver, Gold) based on their reviews and average rating. NFTs are minted on the **Ethereum Sepolia Testnet** and stored on **IPFS via Pinata**.

---

## 🚀 Features

✅ **Metamask Authentication** – Users and traders log in using their wallet.  
✅ **Consumer Portal** – Users can search traders, view reviews, and add new reviews.  
✅ **Trader Dashboard** – Traders can view their profile, reviews, and NFT badge.  
✅ **NFT Minting** – Automated minting of NFTs when traders hit milestones:
- **Bronze**: 5+ reviews, avg rating ≥ 4.0  
- **Silver**: 10+ reviews, avg rating ≥ 4.0  
- **Gold**: 20+ reviews, avg rating ≥ 4.0  
✅ **MongoDB Integration** – Stores traders, reviews, and related data.  
✅ **Smart Contract** – Built using Solidity & deployed on Sepolia testnet.  
✅ **IPFS Hosting (Pinata)** – Stores NFT metadata & images.  

---

## 🛠️ Tech Stack

- **Frontend**: HTML, TailwindCSS, JavaScript  
- **Backend**: Node.js, Express  
- **Database**: MongoDB (Atlas)  
- **Blockchain**: Ethereum (Sepolia Testnet), Ethers.js  
- **NFT Storage**: IPFS (Pinata)  
- **Smart Contract**: Solidity, OpenZeppelin ERC721  

---

## 📂 Project Structure

project-root/
│
├── backend/
│ ├── routes/
│ │ ├── traders.js # Fetch trader stats & reviews
│ │ ├── reviews.js # Submit and get reviews
│ │ └── nft.js # NFT fetch endpoint
│ ├── models/
│ │ └── Review.js # MongoDB schema for reviews
│ ├── services/
│ │ ├── tradeCheck.js # Verifies trade history
│ │ └── nftService.js # Handles NFT minting logic
│ ├── .env # Environment variables (RPC URL, keys)
│ └── server.js # Main Express server
│
├── frontend/
│ ├── index.html # Login page for users/traders
│ ├── profile.html # Trader dashboard
│ └── consumer.html # Consumer portal
│
└── smart-contract/
└── ReputationNFT.sol # ERC721-based NFT smart contract


---

## ⚙️ Installation & Setup

### **1. Clone the Repository**
```bash
git clone https://github.com/JackSeion/PX2Trust.git
cd PX2Trust

2. Install Dependencies

Backend:

cd backend
npm install


Frontend: (No build system, just static HTML)

3. Configure Environment Variables

Create .env inside backend/:

PORT=5000
MONGO_URI=<Your MongoDB Atlas URI>
RPC_URL=https://sepolia.infura.io/v3/<your-infura-project-id>
PRIVATE_KEY=<your-wallet-private-key>
CONTRACT_ADDRESS=<your-deployed-contract-address>

4. Start the Backend
npm run dev

🖼 NFT Tiers & Images

Bronze –<img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/b609af76-96e8-49c0-8399-81dacca7efe0" />


Silver –<img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/2b967351-c8da-477a-b263-2b27b7041d04" />


Gold –<img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/3214b28a-9592-4752-8341-c2deda4e0228" />


✅ Future Improvements

✅ Dynamic NFT fetch using tokenURI from the contract

✅ Multi-tier upgrade logic

✅ UI improvements

✅ Verified trade check on-chain

🛡️ License

This project is licensed under the MIT License.

✨ Author

Ajay Chauhan
Built during Hackathon Project 🚀


---


