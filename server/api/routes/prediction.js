const router = require('express').Router();
const bcrypt = require('bcrypt');

const Prediction = require('../../db/models/Prediction');
const ObjectId = require('mongodb').ObjectID;

// Here is where rest of routes fit in

//the retrieve route
router.get('/:leagueID', (req, res) => {
  const leagueID = req.params.leagueID;
  Prediction.find({
		leagueID: leagueID
  }).then((predictions) => {
    // upon request for a prediction of a certain game, send that info back.
    res.json(predictions);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

router.get('/mygames', (req, res) => {
	const userID = req.body.userID;
	Prediction.find({userID: userID}).then((predictions) => {
		res.status(200).send(predictions);
	}).catch((err) => {
		res.status(500).send(err);
	});
});

router.post('/', (req, res) => {

  const { scores, username, gameID, leagueID, userID } = req.body;

  const predData = {
      scores,
      username,
      gameID,
      leagueID,
      userID
  };

  Prediction.create(predData, (err, pred) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.json(pred);
    }
  });
})

module.exports = router;
