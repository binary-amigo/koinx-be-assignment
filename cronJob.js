const axios = require('axios');
const cron = require('node-cron');
const Crypto = require('./models/Crypto');
require('dotenv').config();

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';

const getCryptoData = async (coin) => {
  try {
    const { data } = await axios.get(COINGECKO_API_URL, {
      params: {
        ids: coin,
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_change: 'true',
      },
    });

    const cryptoData = {
      coin: coin,
      price: data[coin].usd,
      marketCap: data[coin].usd_market_cap,
      change24h: data[coin].usd_24h_change,
    };

    // Save to MongoDB
    await Crypto.create(cryptoData);
    console.log(`Data for ${coin} saved to database`);
  } catch (error) {
    console.error(`Error fetching data for ${coin}:`, error);
  }
};

// Background job to fetch data every 2 hours
cron.schedule('0 */2 * * *', () => {
  ['bitcoin', 'matic-network', 'ethereum'].forEach(coin => getCryptoData(coin));
});
