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

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tridiagonal_replica', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
