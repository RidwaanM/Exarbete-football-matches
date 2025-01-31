import React, { useState, useEffect } from 'react';
import { auth, signInWithGoogle, logout } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './Home.css'; // Importera CSS

function Home({ navigateTo }) {
    const [user, setUser] = useState(null);

    // Kolla om användaren är inloggad
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // Avsluta lyssnaren när komponenten avmonteras
    }, []);

    return (
        <div className="home-container">
            <h1>Welcome to Football Match Finder</h1>

            {user ? (
                <>
                    <p>Logged in as: {user.displayName}</p>

                    <button
                        onClick={() => {
                            console.log('Navigating to matches');
                            navigateTo('matches'); // Använd navigateTo för att ändra sida
                        }}
                        className="view-matches-btn"
                    >
                        View Matches
                    </button>
                    <button onClick={logout} className="logout-btn">
                        Logout
                    </button>
                </>
            ) : (
                <button onClick={signInWithGoogle} className="login-btn">
                    Sign in with Google
                </button>
            )}
        </div>
    );
}

export default Home;
