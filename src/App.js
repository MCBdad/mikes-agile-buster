import React, { useState, useEffect } from 'react';
import './App.css';
import CardDeck from './components/CardDeck';
import VoteResults from './components/VoteResults';
import axios from 'axios';

function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [votes, setVotes] = useState([]); // State to store votes
  const [averageVote, setAverageVote] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const cards = [1, 2, 3, 5];

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  const handleSubmitVote = async () => {
    if (selectedCard) {
      try {
        await axios.post('http://localhost:5000/api/vote', { vote: selectedCard });
        setVotes((prevVotes) => [...prevVotes, selectedCard]);
        setSelectedCard(null);
      } catch (error) {
        console.error('Error submitting vote:', error);
      }
    }
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleResetVotes = async () => {
    try {
      // Clear votes on the backend (optional)
      await axios.post('http://localhost:5000/api/reset'); // You will need to implement this route in your backend
      // Reset votes on the frontend
      setVotes([]);
      setAverageVote(null); // Reset the average vote
      setShowResults(false); // Hide the results
    } catch (error) {
      console.error('Error resetting votes:', error);
    }
  };

  // Fetch the average vote when showResults is clicked
  useEffect(() => {
    if (showResults) {
      axios.get('http://localhost:5000/api/average')
        .then((response) => {
          setAverageVote(response.data.average);
        })
        .catch((error) => {
          console.error('Error fetching average vote:', error);
        });
    }
  }, [showResults]);

  return (
    <div className="App">
      <div className="poker-table">
        <h1 className="title">Mike's Planning Poker!!!!</h1>
        <div className="card-selection">
          <h2>Choose a card:</h2>
          <CardDeck cards={cards} onSelectCard={handleCardSelect} selectedCard={selectedCard} />
        </div>
        <div className="controls">
          <button onClick={handleSubmitVote} className="vote-button">VOTE</button>
          <button onClick={handleShowResults} className="results-button">FLIP 'EM</button>
        </div>
        
        {/* Results section */}
        {showResults && <VoteResults votes={votes} />}
        
        {/* Display average vote */}
        <div className="average-vote">
          <h3>Average Vote:</h3>
          <p>{averageVote ?? 'No votes yet'}</p>
        </div>

        {/* Reset votes button */}
        <div className="controls">
          <button onClick={handleResetVotes} className="reset-button">RESET VOTES</button>
        </div>
      </div>
    </div>
  );
}

export default App;
