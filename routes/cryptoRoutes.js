const express = require('express');
const router = express.Router();
const { getCryptoStats, getPriceDeviation } = require('../controllers/cryptoController');

// Route to get the latest cryptocurrency stats (price, market cap, 24h change)
router.get('/stats', getCryptoStats);

// Route to get the price deviation for the last 100 records
router.get('/deviation', getPriceDeviation);

module.exports = router;
