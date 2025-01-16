const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Route: Get matches
app.get('/matches', async (req, res) => {
    const { league } = req.query; // Exempel: ?league=PL
    const apiUrl = `https://api.football-data.org/v4/competitions/${league}/matches`;
    try {
        const response = await axios.get(apiUrl, {
            headers: { 'X-Auth-Token': process.env.API_KEY }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch match data');
    }
});

// Start servern
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
