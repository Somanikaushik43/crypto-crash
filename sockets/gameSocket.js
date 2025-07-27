const { generateCrashPoint } = require('../services/crashAlgoService');
const Player = require('../models/Player');
const Transaction = require('../models/Transaction');
const Round = require('../models/Round');
const crypto = require('crypto');
const { getCryptoPrice } = require('../services/cryptoPriceService');

let currentRound = null;
let multiplier = 1;
let interval = null;
let isRoundSaving=false;

function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('cashoutRequest', async ({ playerId }) => {
      if (!currentRound) return;

      const playerBet = currentRound.bets.find(
        (b) => b.playerId.toString() === playerId && !b.cashedOut
      );
      if (!playerBet) return;

      playerBet.cashedOut = true;
      playerBet.cashedAt = multiplier;

      const payout = playerBet.cryptoAmount * multiplier;
      const player = await Player.findById(playerId);
      player.cryptoBalances[playerBet.currency] += payout;
      await player.save();

      const tx = new Transaction({
        playerId,
        usdAmount: payout * (await getCryptoPrice(playerBet.currency)),
        cryptoAmount: payout,
        currency: playerBet.currency,
        transactionType: 'cashout',
        transactionHash: crypto.randomBytes(8).toString('hex'),
        priceAtTime: await getCryptoPrice(playerBet.currency),
      });
      await tx.save();

      io.emit('cashout', { playerId, multiplier, cryptoAmount: payout });
    });
  });

  setInterval(startRound, 10000);

  async function startRound() {
    const roundId = crypto.randomBytes(4).toString('hex');
    const seed = crypto.randomBytes(16).toString('hex');
    const crashPoint = generateCrashPoint(seed, roundId);
    const hash = crypto.createHash('sha256').update(seed + roundId).digest('hex');

    currentRound = new Round({
      roundId,
      crashPoint,
      seed,
      hash,
      startTime: new Date(),
      bets: [],
    });

    multiplier = 1;
    io.emit('roundStart', { roundId });

    interval = setInterval(async () => {
      multiplier = +(multiplier + 0.01 * multiplier).toFixed(2);
      io.emit('multiplierUpdate', { multiplier });

      if (multiplier >= crashPoint) {
        clearInterval(interval);
        io.emit('crash', { crashPoint });

        if (!isRoundSaving && currentRound) {
          isRoundSaving=true;
          const roundToSave=currentRound;
          currentRound=null;
          try {
            await roundToSave.save();
          } catch (err) {
            console.error('Error saving round:', err.message);
          }finally{
            isRoundSaving=false;
          }
        }
      }
    }, 100);
  }
}

module.exports = setupSocket;
