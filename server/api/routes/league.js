const router = require('express').Router();
const session = require('express-session');
const mongoose = require('mongoose');

const League = require('../../db/models/League');
const User = require('../../db/models/User');

router.post('/createLeague', (req, res) => {
  const leagueData = {
    players: [{playerID: req.body.userID, score: 0}],
  };

  // First, create the league
  League.create(leagueData, (err, league) => {
    console.log(league);
    if (err) {
      console.error(err);
      res.status(500).send();
    } else {
      // Then, add the league to the user's league array field.
      User.findOneAndUpdate(
        {_id: req.body.userID},
        {$push: {leagues: league.id}},
        {new: true},
        (err, doc) => {
          if (err) {
            console.error(err);
            res.status(500).send();
          } else {
            console.log(doc);
          }
        }
      );
      res.json(league);
    }
  });
});

router.post('/joinLeague', (req, res) => {
  League.findOne({
    _id: req.body.leagueID,
  }, (err, league) => {
    if (err) {
      console.error(err);
      res.status(500).send();
    } else {
      // Add user to league.
      League.findOneAndUpdate(
        {_id: league.id},
        {$push: {players: {_id: req.body.userID, score: 0}}},
        {new: false},
        (err, doc) => {
          if (!err) {
            // Then add league to user's list of leagues.
            User.findOneAndUpdate(
              {_id: req.body.userID},
              {$push: {leagues: league.id}},
              {new: true},
              (err, doc) => {
                if (err) {
                  console.error(err);
                  res.status(500).send();
                } else {
                  console.log(doc);
                }
              }
            );
            res.status(200).json(doc);
          }
        }
      );
    }
  });
});

router.get('/retrieve', (req, res) => {
  User.findOne({
    _id: req.body.userID
  }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send();
    } else {
      res.json(user.leagues);
      res.status(200).send();
    }
  })
});

router.get('/:leagueID', (req, res) => {
  League
    .findOne({_id: req.params.leagueID})
    .populate('players.playerID')
    .exec((err, league) => {
    if (err) {
      console.error(err);
      res.status(500).send();
    } else {
      const leagueObj = {};
      leagueObj.name = league.name;
      leagueObj._id = league._id;
      leagueObj.players = league.players.map((player) => {
        return {
          _id: player.playerID.id,
          username: player.playerID.username,
          score: player.score,
        };
      })
      res.json(leagueObj);
    }
  });
});

router.post('/changeName', (req, res) => {
  League.findOneAndUpdate({ _id: req.body.leagueID },
    {$set: {name: req.body.leagueName}},
    {new: true})
  .exec((err, league) => {
    if (err) {
      console.error(err);
      res.status(500).send();
    } else {
      res.json(req.body.leagueName);
      res.status(200).send();
    }
  });
});

module.exports = router;
