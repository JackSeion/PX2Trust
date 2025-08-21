async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      const account = accounts[0];
      localStorage.setItem("walletAddress", account);
      window.location.href = "profile.html";
    } catch (error) {
      console.error("Connection denied", error);
    }
  } else {
    alert("MetaMask is not installed.");
  }
}

function getWalletAddress() {
  return localStorage.getItem("walletAddress");
}

function logoutWallet() {
  localStorage.removeItem("walletAddress");
  window.location.href = "index.html";
}
