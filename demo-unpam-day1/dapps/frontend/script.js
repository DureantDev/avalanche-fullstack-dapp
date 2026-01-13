const connectBtn = document.getElementById("connectBtn");
const statusEl = document.getElementById("status");
const addressEl = document.getElementById("address");
const networkEl = document.getElementById("network");
const balanceEl = document.getElementById("balance");
const namaEl = document.getElementById("nama");
const nimEl = document.getElementById("nim");

const NAMA = "Rafa Alif Ardiansyah";
const NIM = "123456789";

// Avalanche Fuji Testnet chainId (hex)
const AVALANCHE_FUJI_CHAIN_ID = "0xa869";

// status koneksi
let isConnected = false;

// ================= UTIL =================
function formatAvaxBalance(balanceWei) {
  const balance = parseInt(balanceWei, 16);
  return (balance / 1e18).toFixed(4);
}

// ================= DISCONNECT =================
function disconnectWallet() {
  addressEl.textContent = "-";
  networkEl.textContent = "-";
  balanceEl.textContent = "-";
  namaEl.textContent = "-";
  nimEl.textContent = "-";

  statusEl.textContent = "Disconnected ❌";
  statusEl.style.color = "#e84118";

  connectBtn.textContent = "Connect Wallet";
  isConnected = false;
}

// ================= CONNECT =================
async function connectWallet() {
  // toggle disconnect
  if (isConnected) {
    disconnectWallet();
    return;
  }

  if (typeof window.ethereum === "undefined") {
    alert("Core Wallet tidak terdeteksi. Silakan install Core Wallet.");
    return;
  }

  try {
    statusEl.textContent = "Connecting...";

    // request account
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const address = accounts[0];
    addressEl.textContent = address;

    // tampilkan identitas
    namaEl.textContent = NAMA;
    nimEl.textContent = NIM;

    // cek chain
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    if (chainId !== AVALANCHE_FUJI_CHAIN_ID) {
      networkEl.textContent = "Wrong Network ❌";
      statusEl.textContent = "Please switch to Avalanche Fuji";
      statusEl.style.color = "#fbc531";
      balanceEl.textContent = "-";
      return;
    }

    // network OK
    networkEl.textContent = "Avalanche Fuji Testnet";
    statusEl.textContent = "Connected ✅";
    statusEl.style.color = "#4cd137";

    // get balance
    const balanceWei = await window.ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"],
    });

    balanceEl.textContent = formatAvaxBalance(balanceWei);

    // set connected
    isConnected = true;
    connectBtn.textContent = "Disconnect Wallet";
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Connection Failed ❌";
  }
}

// ================= EVENT =================
connectBtn.addEventListener("click", connectWallet);
