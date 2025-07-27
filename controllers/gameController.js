
const Round = require('../models/Round');
const Player = require('../models/Player');
const Transaction = require('../models/Transaction');
const { getCryptoPrice } = require('../services/cryptoPriceService');
const crypto = require('crypto');

exports.placeBet = async (req, res) => {
  const { playerId, amountUsd, cryptoType } = req.body;
  if (!playerId || amountUsd <= 0 || !['BTC', 'ETH'].includes(cryptoType))
    return res.status(400).send('Invalid input');

  const price = await getCryptoPrice(cryptoType);
  const cryptoAmount = amountUsd / price;

  const player = await Player.findById(playerId);
  if (!player || player.cryptoBalances[cryptoType] < cryptoAmount)
    return res.status(400).send('Insufficient balance');

  player.cryptoBalances[cryptoType] -= cryptoAmount;
  await player.save();

  const tx = new Transaction({
    playerId,
    usdAmount: amountUsd,
    cryptoAmount,
    currency: cryptoType,
    transactionType: 'bet',
    transactionHash: crypto.randomBytes(8).toString('hex'),
    priceAtTime: price
  });
  await tx.save();

  res.json({ success: true, cryptoAmount });
};

exports.cashout = async (req, res) => {
  const { playerId } = req.body;
  res.json({ success: true, message: 'Cashout request sent via WebSocket' });
};
