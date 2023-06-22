const express = require('express');

class Player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}

class Team {
  constructor() {
    this.players = [];
  }

  addPlayer(player) {
    this.players.push(player);
  }

  getAverageScore() {
    if (this.players.length === 0) {
      return 0;
    }

    let sum = 0;
    for (let player of this.players) {
      sum += player.score;
    }
    return sum / this.players.length;
  }

  getMinimumScore() {
    if (this.players.length === 0) {
      return 0;
    }

    let minScore = this.players[0].score;
    for (let i = 1; i < this.players.length; i++) {
      if (this.players[i].score < minScore) {
        minScore = this.players[i].score;
      }
    }
    return minScore;
  }

  getMaximumScore() {
    if (this.players.length === 0) {
      return 0;
    }

    let maxScore = this.players[0].score;
    for (let i = 1; i < this.players.length; i++) {
      if (this.players[i].score > maxScore) {
        maxScore = this.players[i].score;
      }
    }
    return maxScore;
  }
}

const app = express();
const port = 3001; // Use a different port than 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/team', (req, res) => {
  const { players } = req.body;

  const team = new Team();

  players.forEach((player) => {
    const { name, score } = player;
    const newPlayer = new Player(name, score);
    team.addPlayer(newPlayer);
  });

  const averageScore = team.getAverageScore();
  const minimumScore = team.getMinimumScore();
  const maximumScore = team.getMaximumScore();

  const teamStatistics = {
    averageScore,
    minimumScore,
    maximumScore,
  };

  res.json(teamStatistics);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
