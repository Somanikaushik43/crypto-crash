
const crypto = require('crypto');

function generateCrashPoint(seed, roundId) {
  const hash = crypto.createHash('sha256').update(seed + roundId).digest('hex');
  const intValue = parseInt(hash.slice(0, 8), 16);
  return (1 + (intValue % 10000) / 1000).toFixed(2);
}

module.exports = { generateCrashPoint };
