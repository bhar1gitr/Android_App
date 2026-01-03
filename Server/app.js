const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv').config();
const app = express();
const PORT = 3000;

// DB
const db = require('./conn/db');

db();

// Routes
const authRoutes = require('./routes/authRoutes');
const voterRoutes = require('./routes/voterRoutes');

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', voterRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
