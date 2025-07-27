const axios = require('axios');

const coinMap = {
  BTC: 'bitcoin',
  ETH: 'ethereum'
};

let cachedPrices = {};
let lastFetchTime = 0;

async function getCryptoPrice(symbol = 'BTC') {
  const coinId = coinMap[symbol.toUpperCase()];
  if (!coinId) throw new Error('Unsupported crypto symbol');

  const now = Date.now();
  if (now - lastFetchTime < 10000 && cachedPrices[symbol]) {
    return cachedPrices[symbol];
  }

  const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
    params: { ids: coinId, vs_currencies: 'usd' }
  });

  const price = response.data[coinId]?.usd;
  if (!price) throw new Error('Failed to fetch price');

  cachedPrices[symbol] = price;
  lastFetchTime = now;
  return price;
}

module.exports = { getCryptoPrice };
