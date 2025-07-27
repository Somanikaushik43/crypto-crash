
const mongoose = require('mongoose');

const RoundSchema = new mongoose.Schema({
  roundId: String,
  crashPoint: Number,
  seed: String,
  hash: String,
  startTime: Date,
  bets: [{
    playerId: mongoose.Schema.Types.ObjectId,
    cryptoAmount: Number,
    currency: String,
    usdAmount: Number,
    cashedOut: Boolean,
    cashedAt: Number
  }]
});

module.exports = mongoose.model('Round', RoundSchema);
