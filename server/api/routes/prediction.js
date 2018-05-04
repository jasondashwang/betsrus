const router = require('express').Router();
const bcrypt = require('bcrypt');

const Prediction = require('../../db/models/Prediction');
const ObjectId = require('mongodb').ObjectID;

// Here is where rest of routes fit in


//the retrieve route is referenced when the user needs to access information regarding a prediction.
router.get('/retrieve', (req, res) => {
  const userID = req.body.userID;
  const gameID = req.body.gameID;

  Prediction.findOne({
    userID: userID,
		gameID: gameID
  }).then((prediction) => {
    // upon request for a prediction of a certain game, send that info back.
		res.status(200).send(prediction);

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
