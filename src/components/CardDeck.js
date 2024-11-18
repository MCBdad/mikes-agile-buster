import React from 'react';

function CardDeck({ cards, onSelectCard, selectedCard }) {
  return (
    <div className="card-deck">
      {cards.map((card) => (
        <button
          key={card}
          className={`card ${selectedCard === card ? 'selected' : ''}`}
          onClick={() => onSelectCard(card)}
        >
          {card}
        </button>
      ))}
    </div>
  );
}

export default CardDeck;
