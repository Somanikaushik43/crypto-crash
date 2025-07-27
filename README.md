# 💥 Crypto Crash Game (Backend & Minimal Frontend)

A full-stack crash gambling simulation game where users can bet USD converted to crypto (BTC/ETH), watch the multiplier grow in real time, and cash out before the crash. Built with Node.js, MongoDB, Express, and Socket.io.

---

## 🚀 Features

- ✅ Bet USD (auto converted to crypto using live CoinGecko prices)
- ✅ Provably fair crash algorithm using seed + roundId
- ✅ Real-time multiplier updates with WebSocket
- ✅ Auto crash after a randomized multiplier
- ✅ Cashout before crash to win
- ✅ Transaction records (bet/cashout)
- ✅ Player crypto wallet with balance updates
- ✅ REST APIs & WebSocket events
- ✅ Basic frontend UI (`public/index.html`)

---

## 📁 Project Structure

crypto-crash/
├── crypto-crash/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── sockets/
│ ├── scripts/
│ ├── public/
│ │ ├── index.html
│ │ ├── script.js
│ │ └── style.css
│ ├── .env
│ ├── index.js
│ └── package.json


---

## ⚙️ How to Run

### 1. 📦 Install Dependencies

```bash
cd crypto-crash/crypto-crash
npm install

2.  📄 Create .env File
PORT=3000
MONGO_URI=mongodb://localhost:27017/crypto_crash

3. 🌱 Seed Player Data
node scripts/seed.js

4. 🚀 Start Backend Server
npm run dev
You should see:
✅ MongoDB connected
✅ Server running on port 3000

🌐 Access Frontend
Start backend server.
Open public/index.html manually in your browser:
Right-click index.html > Open with browser
Or use Live Server extension in VS Code

📫 API Endpoints (Testable via Postman)
POST /api/bet
{
  "playerId": "6885ebd969ecf76b0caec038",
  "amountUsd": 50,
  "cryptoType": "BTC"
}
💸 Cashout (Triggers WebSocket)
{
  "playerId": "6885ebd969ecf76b0caec038"
}
👤 Get All Players
GET /api/players

👤 Get Player by ID
GET /api/players/:id

📡 WebSocket Events
| Event              | Direction       | Description                       |
| ------------------ | --------------- | --------------------------------- |
| `roundStart`       | Server → Client | Announces a new round start       |
| `multiplierUpdate` | Server → Client | Sends live multiplier every 100ms |
| `crash`            | Server → Client | Notifies of crash point hit       |
| `cashout`          | Server → Client | Broadcasts cashout details        |
| `cashoutRequest`   | Client → Server | User requests to cashout          |

📦 Dependencies
express,mongoose,socket.io,axios,dotenv,nodemon

✍️ Author
Kaushik
Backend developer candidate


