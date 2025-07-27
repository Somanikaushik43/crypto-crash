const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.get('/players', playerController.getAllPlayers);
router.get('/players/:id', playerController.getPlayerById);

module.exports = router;
