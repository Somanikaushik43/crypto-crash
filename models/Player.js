
const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: String,
  cryptoBalances: {
    BTC: { type: Number, default: 1 },
    ETH: { type: Number, default: 1 }
  }
});

module.exports = mongoose.model('Player', PlayerSchema);
