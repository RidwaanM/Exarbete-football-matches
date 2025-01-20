
import React from 'react';
import './MatchModal.css'; // CSS för stilisering av modal

const MatchModal = ({ match, onClose }) => {
    if (!match) return null; // Om ingen match är vald, visa ingenting

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2 className="modal-heading">{match.teams.home.name} vs {match.teams.away.name}
                    <br></br>{match.goals.home} - {match.goals.away} 
                </h2>
                
                <p><strong>Date:</strong> {new Date(match.fixture.date).toLocaleString()}</p>
                <p><strong>Venue:</strong> {match.fixture.venue.name}, {match.fixture.venue.city}</p>
                <div className="score">
                  
                </div>
                <div className="statistics">
                    <p><strong>Referee:</strong> {match.fixture.referee}</p>
                    <p><strong>Ball Possession:</strong> Home: 55% {match.statistics?.home?.ballPossession} | Away: 45% {match.statistics?.away?.ballPossession}</p>
                    <p><strong>Corner Kicks:</strong> Home: 13 {match.statistics?.home?.cornerKicks} | Away: 6 {match.statistics?.away?.cornerKicks}</p>
                </div>
            </div>
        </div>
    );
}

export default MatchModal;
