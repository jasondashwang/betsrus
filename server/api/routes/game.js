const rp = require('request-promise');
const router = require('express').Router();
const Game = require('../../db/models/Game');

const apiServer = "https://api.football-data.org";

// Only used once to get EPL fixtures for 2017/18 and fill database.
// Do not call otherwise because parts of it are hardcoded. 
// Will be deleted once finished.
router.get('/EPLFixtures201718', (req, res) => {
  var options = {
    uri: apiServer + "/v1/competitions/445/fixtures",
    headers: {
      'User-Agent': 'Request-Promise',
      'X-Response-Control': 'minified',
    },
    json: true
  };

  rp(options)
    .then((data) => {
      data.fixtures.map((match) => {
        const gameData = {
          start_Date: match.date,
          team1: { name: match.homeTeamName, score: -1 },
          team2: { name: match.awayTeamName, score: -1 },
          gameID: match.id,
        }
        Game.create(gameData, (game, err) => {
          if (err) {
            console.error(err);
          }
        });
      });
      res.status(200).send();
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;