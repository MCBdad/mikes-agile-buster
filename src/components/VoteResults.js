import React from 'react';

function VoteResults({ votes }) {
  if (votes.length === 0) {
    return <p>No votes yet!</p>;
  }

  const voteCount = votes.reduce((acc, vote) => {
    acc[vote] = (acc[vote] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="vote-results">
      <h3>Vote Results</h3>
      <ul>
        {Object.entries(voteCount).map(([card, count]) => (
          <li key={card}>
            {card}: {count} vote(s)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VoteResults;
