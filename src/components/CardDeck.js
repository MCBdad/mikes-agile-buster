// CardDeck.js
import React from 'react';

const CardDeck = ({ cards, onSelectCard, selectedCard }) => {
  return (
    <div className="card-selection">
      {cards.map((card, index) => (
        <button
          key={index}
          className={`card-button ${selectedCard === card ? 'selected' : ''}`}
          onClick={() => onSelectCard(card)}
        >
          {card}
        </button>
      ))}
    </div>
  );
};

export default CardDeck;
