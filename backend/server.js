const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory vote storage
let votes = [];

// Route to get votes
app.get('/api/votes', (req, res) => {
  res.json(votes);
});

// Route to submit a vote
app.post('/api/vote', (req, res) => {
  const vote = req.body.vote;
  if (vote) {
    votes.push(vote);
    res.status(201).json({ message: 'Vote submitted successfully' });
  } else {
    res.status(400).json({ error: 'Vote is required' });
  }
});

// Route to calculate average vote
app.get('/api/average', (req, res) => {
  const validVotes = votes.filter(vote => typeof vote === 'number');
  if (validVotes.length === 0) {
    return res.status(200).json({ average: null });
  }
  const sum = validVotes.reduce((acc, vote) => acc + vote, 0);
  const average = (sum / validVotes.length).toFixed(2);
  res.json({ average });
});

// Route to reset all votes
app.post('/api/reset', (req, res) => {
  votes = []; // Reset votes array
  res.status(200).json({ message: 'Votes have been reset' });
});

// Start server
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
