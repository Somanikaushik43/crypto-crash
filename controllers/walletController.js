
const Player = require('../models/Player');
const { getCryptoPrice } = require('../services/cryptoPriceService');

exports.getBalance = async (req, res) => {
  try{
  const player = await Player.findById(req.params.playerId);
  if (!player) return res.status(404).send('Player not found');

  const btcPrice = await getCryptoPrice('BTC');
  const ethPrice = await getCryptoPrice('ETH');

  const balanceUsd = {
    BTC: player.cryptoBalances.BTC * btcPrice,
    ETH: player.cryptoBalances.ETH * ethPrice
  };

  res.json({ balances: player.cryptoBalances, usdValues: balanceUsd });
}catch(error){
  console.error('Error fetching balance:',error);
  res.status(500).json({error:'Internal server error'});
}
};
