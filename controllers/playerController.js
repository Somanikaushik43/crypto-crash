const Player = require('../models/Player');

exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    console.log('✅ Found players:', players);
    res.status(200).json(players);
  } catch (err) {
    console.error('Error fetching players:', err);
    res.status(500).json({ error: 'Server error while fetching players' });
  }
};


exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ error: 'Player not found' });
    res.status(200).json(player);
  } catch (err) {
    console.error('Error fetching player:', err);
    res.status(500).json({ error: 'Server error while fetching player' });
  }
};
