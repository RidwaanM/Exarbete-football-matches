const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();  // Ladda API-nyckeln från .env

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Football Matches API!');
});

// Route: Fetch matches
app.get('/matches', async (req, res) => {
    const { league = 39, team, dateFilter } = req.query;
    const apiUrl = `https://v3.football.api-sports.io/fixtures?league=${league}&season=2023`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'x-rapidapi-key': process.env.API_KEY,
                'x-rapidapi-host': 'v3.football.api-sports.io',
            },
        });

        let matches = response.data.response;

        if (team) {
            const teamLowerCase = team.toLowerCase();
            matches = matches.filter(match =>
                match.teams.home.name.toLowerCase().includes(teamLowerCase) ||
                match.teams.away.name.toLowerCase().includes(teamLowerCase)
            );
        }

        // Filtrering för datum
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
                return true;
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

// Route: Fetch match details (Statistics)
app.get('/matches/:id/statistics', async (req, res) => {
    const { id } = req.params; // Match-ID från URL
    const apiUrl = `https://v3.football.api-sports.io/fixtures?id=${id}`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'x-rapidapi-key': process.env.API_KEY,
                'x-rapidapi-host': 'v3.football.api-sports.io',
            },
        });

        if (!response.data.response || response.data.response.length === 0) {
            return res.status(404).send({
                message: `Match details not found for match with ID: ${id}`,
            });
        }

        const matchDetails = response.data.response[0];
        const statistics = matchDetails.statistics || [];
        
        const matchData = {
            homeTeam: matchDetails.teams.home.name,
            awayTeam: matchDetails.teams.away.name,
            goalsHome: matchDetails.goals.home,
            goalsAway: matchDetails.goals.away,
            statistics: {
                possessionHome: statistics.find(stat => stat.type === 'Ball Possession' && stat.team.name === matchDetails.teams.home.name)?.value || 'N/A',
                possessionAway: statistics.find(stat => stat.type === 'Ball Possession' && stat.team.name === matchDetails.teams.away.name)?.value || 'N/A',
                cornersHome: statistics.find(stat => stat.type === 'Corner Kicks' && stat.team.name === matchDetails.teams.home.name)?.value || 0,
                cornersAway: statistics.find(stat => stat.type === 'Corner Kicks' && stat.team.name === matchDetails.teams.away.name)?.value || 0,
            }
        };

        res.json(matchData);
    } catch (error) {
        console.error('Error fetching match details:', error.message);
        res.status(500).send({
            message: 'Failed to fetch match details',
            error: error.message,
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
