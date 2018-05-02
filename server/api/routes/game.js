const cronJob = require('node-cron').CronJob;
const rp = require('request-promise');
const router = require('express').Router();
const Game = require('../../db/models/Game');
const Prediction = require('../../db/models/Prediction');
const League = require('../../db/models/League')
const ObjectId = require('mongodb').ObjectID;

const API_SERVER = "https://api.football-data.org";

// Only used once to get EPL fixtures for 2017/18 and fill database.
// Do not call otherwise because parts of it are hardcoded. 
// Will be deleted once finished.
router.get('/EPLFixtures201718', (req, res) => {
  var options = {
    uri: API_SERVER + "/v1/competitions/445/fixtures",
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

router.get('/remainingFixtures', (req, res) => {
  Game.find({
    start_Date: { $gte: new Date() }
  }, (err, games) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(games);
      res.send();
    }
  });
});


// Cron Job run every day at midnight to update scores across leagues
router.get('/cronTest', (req, res) => {
  // First, using our external API, update our GAME table with all results
  // in the past 24 hours if it is in need of updating
  var options = {
    uri: API_SERVER + "/v1/competitions/445/fixtures",
    qs: {
      timeFrame: 'p1'
    },
    headers: {
      'User-Agent': 'Request-Promise',
      'X-Response-Control': 'minified',
    },
    json: true
  };

  rp(options)
    .then((data) => {
      var promises = data.fixtures.map((match) => {
        return Game.findOneAndUpdate(
          {gameID: match.id},
          {$set: {
            team1: { name: match.homeTeamName, score: match.result.goalsHomeTeam }, 
            team2: { name: match.awayTeamName, score: match.result.goalsAwayTeam }
          }},
          {new: true},
        ).exec();
      });

      // After updating all the GAMES, we update each user's score in each league.
      Promise.all(promises).then(updateLeagueScores);
    })
    .catch((err) => {

    });
});

function updateLeagueScores(matches) {
  League.find({}, (err, leagues) => {
    leagues.map((league) => {
      // go through each player in each league and update his/her score based on his/her prediction
      league.players.map((player) => {
        // Walk through all matches that occurred in the past day
        const promises = matches.map((match) => {
          // Get prediction user had for the given match.
          return Prediction.findOne(
            {gameID: match.gameID, userID: ObjectId(player.playerID), leagueID: ObjectId(league.id)}, 
            (err, prediction) => {
              const score = scorePredictionAgainstMatch(match, prediction);
              League.findOneAndUpdate(
                {_id: ObjectId(league.id), "players.playerID": ObjectId(player.playerID)},
                {$inc: {"players.$.score": score}},
                {new: true},
                (err, doc) => {}
              );
            }
          );
        });
        Promise.all(promises);
      });
    });
  });
}

function scorePredictionAgainstMatch(match, prediction) {
  var points = 0;
  if (prediction === undefined || prediction === null) { // user didn't make prediction for this game.
    points = 0;
  } else if (prediction.scores.home === match.team1.score &&
    prediction.scores.away === match.team2.score) {
    points = 10;
  } else if (prediction.scores.home - match.team1.score ===
    prediction.scores.away - match.team2.score) {
    points = 5;
  } else if (match.team1.score !== match.team2.score && 
    (match.team1.score - match.team2.score) ^ (prediction.scores.home - prediction.scores.away) === 0 ) {
    points = 3;
  }
  return points;
}

module.exports = router;