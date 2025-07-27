const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Player = require('../models/Player');

dotenv.config();

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'crypto_crash'
    });

    // Remove existing players (optional)
    await Player.deleteMany();

    // Create test players
    const players = await Player.insertMany([
      {
        name: 'John Doe',
        usdBalance: 1000,
        cryptoBalances: {
          bitcoin: 0.05,
          ethereum: 0.1
        }
      },
      {
        name: 'Alice Smith',
        usdBalance: 1500,
        cryptoBalances: {
          bitcoin: 0.1,
          ethereum: 0.05
        }
      }
    ]);

    console.log('✅ Seeded players successfully:');
    console.table(players.map(p => ({ id: p._id.toString(), name: p.name })));
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding players:', err);
    process.exit(1);
  }
}

seedDatabase();
