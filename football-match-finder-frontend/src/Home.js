import React from 'react';

function Home({ navigateTo }) {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to Football Hub</h1>
                <p>Your ultimate destination for matches and old fixtures.</p>
                <button onClick={() => navigateTo('matches')} className="start-button">
                    View Matches
                </button>
            </header>
        </div>
    );
}

export default Home;
