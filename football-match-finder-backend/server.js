const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Testroute
app.get('/', (req, res) => {
    res.send('Football Match Finder API is running');
});

// Start servern
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
