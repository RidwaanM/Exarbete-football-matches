// Matches.js
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import './Matches.css'; 
import MatchModal from './MatchModal'; // Importera vår nya modal

function Matches() {
    const [matches, setMatches] = useState([]);
    const [league, setLeague] = useState(39); // Default Premier League
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [dateFilter, setDateFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMatch, setSelectedMatch] = useState(null); // För att hålla koll på vald match

    const fetchMatches = () => {
        setError('');
        setLoading(true);

        const url = `http://localhost:3000/matches?league=${league}&dateFilter=${dateFilter}&team=${searchQuery}`;

        axios
            .get(url)
            .then((response) => {
                setMatches(response.data || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching matches:', error);
                setError('Failed to fetch matches: ' + error.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchMatches();
    }, [league, dateFilter, searchQuery]); // Uppdatera vid ändringar i sökningen

    const handleMatchClick = (match) => {
        setSelectedMatch(match);
    };

    const closeModal = () => {
        setSelectedMatch(null);
    };

    return (
        <div className="matches-container">
            <h2 className="matches-heading">Premier League/Championship - Season 23/24</h2>
            <div className="filters">
                <select onChange={(e) => setLeague(e.target.value)} value={league} className="select-box">
                    <option value={39}>Premier League</option>
                    <option value={40}>Championship</option>
                </select>

                <select onChange={(e) => setDateFilter(e.target.value)} value={dateFilter} className="select-box">
                    <option value="">All Dates</option>
                    <option value="today">Today</option>
                    <option value="this-week">This Week</option>
                    <option value="next-week">Next Week</option>
                </select>

                <input
                    type="text"
                    placeholder="Search by team..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-box"
                />
            </div>

            {loading && <p className="loading-text">Loading...</p>}
            {error && <p className="error-text">{error}</p>}

            <div className="matches-list">
                {matches.length === 0 ? (
                    <p>No matches available at the moment.</p>
                ) : (
                    matches.map((match) => (
                        <div key={match.fixture.id} className="match-card" onClick={() => handleMatchClick(match)}>
                            <div className="teams">
                                <img src={match.teams.home.logo} alt={match.teams.home.name} className="team-logo" />
                                <span className="team-name">{match.teams.home.name}</span>
                                <span className="score">
                                    {match.goals.home} - {match.goals.away}
                                </span>
                                <span className="team-name">{match.teams.away.name}</span>
                                <img src={match.teams.away.logo} alt={match.teams.away.name} className="team-logo" />
                            </div>
                            <div className="match-details">
                                <p>{new Date(match.fixture.date).toLocaleString()}</p>
                                <p><strong>Venue:</strong> {match.fixture.venue.name}, {match.fixture.venue.city}</p>
                                <p><strong>Referee:</strong> {match.fixture.referee}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Visa modal om en match är vald */}
            {selectedMatch && (
                <MatchModal match={selectedMatch} onClose={closeModal} />
            )}
        </div>
    );
}

export default Matches;
