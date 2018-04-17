const router = require('express').Router();
const session = require('express-session');
const mongoose = require('mongoose');

const League = require('../../db/models/League');
const User = require('../../db/models/User');

router.post('/createLeague', (req, res) => {
  const leagueData = {
    name: req.body.leagueName,
    players: [{playerID: req.session.userID, score: 0}],
  };

  // First, create the league
  League.create(leagueData, (err, league) => {
    if (err) {
      console.error(err);
      res.status(500).send();
    } else {
      // Then, add the league to the user's league array field.
      User.findOneAndUpdate(
        {_id: req.session.userID},
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
      res.status(200).send();
      // TODO: reroute to league page.
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
        {$push: {players: {playerID: req.session.userID, score: 0}}},
        {new: true},
        (err, doc) => {
          if (!err) {
            // Then add league to user's list of leagues.
            User.findOneAndUpdate(
              {_id: req.session.userID},
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
            res.status(200).send();
          }
        }
      );

      // TODO: reroute to league page
    }
  });
});


module.exports = router;