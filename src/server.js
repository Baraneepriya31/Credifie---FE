// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 9001;

app.use(cors());
app.use(express.json());

app.get('/progress', (req, res) => {
  const progress = Math.floor(Math.random() * 101); // Simulating a random progress value
  res.json({ progress });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
