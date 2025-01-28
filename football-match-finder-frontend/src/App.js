import React, { useState } from 'react';
import Home from './Home';
import Matches from './Matches';

function App() {
    const [currentPage, setCurrentPage] = useState('home'); // Hanterar vilken sida som visas

    const navigateTo = (page) => {
        setCurrentPage(page); // Ändrar vilken sida som renderas
    };

    return (
        <div>
            {currentPage === 'home' && <Home navigateTo={navigateTo} />}
            {currentPage === 'matches' && <Matches />}
        </div>
    );
}

export default App;
