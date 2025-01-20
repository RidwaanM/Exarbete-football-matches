const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();  // Ladda API-nyckeln från .env

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Default route: För root-URL
app.get('/', (req, res) => {
    res.send('Welcome to the Football Matches API!');
});

// Route: Fetch matches
app.get('/matches', async (req, res) => {
    const { league = 39, team, dateFilter } = req.query; // Lägg till dateFilter
    const apiUrl = `https://v3.football.api-sports.io/fixtures?league=${league}&season=2023`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'x-rapidapi-key': process.env.API_KEY,
                'x-rapidapi-host': 'v3.football.api-sports.io',
            },
        });

        let matches = response.data.response;

        // Filtrera om "team" är specificerat
        if (team) {
            const teamLowerCase = team.toLowerCase();
            matches = matches.filter(match =>
                match.teams.home.name.toLowerCase().includes(teamLowerCase) ||
                match.teams.away.name.toLowerCase().includes(teamLowerCase)
            );
        }

        // Filtrera om "dateFilter" är specificerat
        if (dateFilter) {
            const today = new Date();
            matches = matches.filter(match => {
                const matchDate = new Date(match.fixture.date);
                if (dateFilter === 'today') {
                    return matchDate.toDateString() === today.toDateString();
                } else if (dateFilter === 'this-week') {
                    const endOfWeek = new Date(today);
                    endOfWeek.setDate(today.getDate() + 7);
                    return matchDate >= today && matchDate <= endOfWeek;
                } else if (dateFilter === 'next-week') {
                    const startOfNextWeek = new Date(today);
                    startOfNextWeek.setDate(today.getDate() + 7);
                    const endOfNextWeek = new Date(startOfNextWeek);
                    endOfNextWeek.setDate(startOfNextWeek.getDate() + 7);
                    return matchDate >= startOfNextWeek && matchDate <= endOfNextWeek;
                }
                return true; // Om inget matchar, returnera allt
            });
        }

        res.json(matches);
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
