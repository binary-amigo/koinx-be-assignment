// /app.js
const express = require('express');
const mongoose = require('mongoose');
const cryptoRoutes = require('./routes/cryptoRoutes');
require('./cronJob')

const app = express();
const port = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use('/api', cryptoRoutes);  // Use routes under /api path

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
