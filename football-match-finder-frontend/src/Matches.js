import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Matches() {
    const [matches, setMatches] = useState([]);
    const [league, setLeague] = useState('PL'); // Default Premier League

    const fetchMatches = () => {
        axios.get(`http://localhost:3001/matches?league=${league}`)
            .then((response) => setMatches(response.data))
            .catch((error) => console.error('Error fetching matches:', error));
    };

    useEffect(() => {
        fetchMatches();
    }, [league]);

    return (
        <div>
            <h2>Upcoming Matches</h2>
            <select onChange={(e) => setLeague(e.target.value)}>
                <option value="PL">Premier League</option>
                <option value="ELC">Championship</option>
            </select>
            <ul>
                {matches.map((match) => (
                    <li key={match.id}>
                        {match.homeTeam.name} vs {match.awayTeam.name} on {new Date(match.utcDate).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Matches;
