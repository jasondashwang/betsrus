ObjectId = require('mongodb').ObjectID;
const Prediction = require('../db/models/Prediction');
module.exports = io => {
  io.on('connection', socket => {
		socket.on('predict', (homescore, awayscore, username, gameID, leagueID, userID) => {
			socket.join(leageID);
			const predData = {
			  	scores: {home: homescore, away: awayscore},
			  	username: username,
					gameID: gameID,
					leagueID: ObjectId(leagueID),
			  	userID: ObjectId(userID)
			};

			Prediction.findOne({gameID: gameID, leagueID: leagueID, username: username}, (err, res) => {
				if (err) {
					console.log(err);
				}
				if (!res) {
					Prediction.create(predData, (err, pred) => {
				    if (err) {
				      console.error(err);

				    } else {
				      io.sockets.in(leagueID).emit('predictionMade', username, gameID, leagueID, userID);

				      // TODO: any logic necessary after logging the prediction in the database
				    }
				  });
				}
				else if (res) {
					socket.emit('prediction_Already_Made');
				}
			});

		});

		//socket.on('');
	});
};
