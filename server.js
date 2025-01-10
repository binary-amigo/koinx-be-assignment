const express = require('express');
const mongoose = require('mongoose');
const Crypto = require('./models/Crypto');
const cronJob = require('./cronJob');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/stats', async (req, res) => {
  const { coin } = req.query;

  if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
    return res.status(400).json({ message: 'Invalid coin parameter' });
  }

  try {
    const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 }).limit(1);
    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      change24h: latestData.change24h,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

app.get('/deviation', async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
