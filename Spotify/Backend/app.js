require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const songsRoutes = require('./routes/songs');
const connectDB = require('./config/database');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
connectDB();

app.use('/api/songs', songsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});