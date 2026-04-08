require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const apiRoutes = require('./routes/api');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

// Start Server Immediately so UI APIs can function
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to MongoDB asynchronously
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tridiagonal_replica')
  .then(() => {
    console.log('✅ Connected to MongoDB Backend Database Successfully!');
  })
  .catch(err => {
    console.error('⚠️ MongoDB connection error (Make sure MongoDB is running locally or Atlas URI is correct):', err.message);
  });
