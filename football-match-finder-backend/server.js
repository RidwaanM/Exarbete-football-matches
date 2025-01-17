const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();  // Ladda API-nyckeln från .env

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Route: Fetch matches
app.get('/matches', async (req, res) => {
    const { league = 39 } = req.query; // Default Premier League (39)
    const apiUrl = `https://v3.football.api-sports.io/fixtures?league=${league}&season=2023`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'x-rapidapi-key': process.env.API_KEY,  // Hämta nyckeln från .env-filen
                'x-rapidapi-host': 'v3.football.api-sports.io',
            },
        });

        console.log('API Response:', response.data); // Logga API-svaret
        res.json(response.data.response); // Skicka data till frontend
    } catch (error) {
        console.error('Error fetching matches:', error.message);
        res.status(500).send({
            message: 'Failed to fetch match data',
            error: error.message,
        });
    }
});

// Start servern
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
