const Crypto = require('../models/Crypto');

// Handler for fetching the latest cryptocurrency data
const getCryptoStats = async (req, res) => {
  const { coin } = req.query;

  if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
    return res.status(400).json({ message: 'Invalid coin parameter' });
  }

  try {
    const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 }).limit(1);
    if (!latestData) return res.status(404).json({ message: 'Data not found' });

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      change24h: latestData.change24h,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
};

// Handler for calculating the price deviation
const getPriceDeviation = async (req, res) => {
  const { coin } = req.query;

  if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
    return res.status(400).json({ message: 'Invalid coin parameter' });
  }

  try {
    const data = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
    if (data.length < 2) return res.status(400).json({ message: 'Not enough data' });

    const prices = data.map(entry => entry.price);
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
    const deviation = Math.sqrt(variance);

    res.json({ deviation: deviation.toFixed(2) });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating deviation' });
  }
};

module.exports = { getCryptoStats, getPriceDeviation };
