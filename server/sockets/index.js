const ObjectId = require('mongodb').ObjectID;
const Prediction = require('../db/models/Prediction');
module.exports = io => {
  io.on('connection', socket => {


		socket.on('joinLeague', (update) => {

			socket.join(update.leagueID);
			socket.to(update.leagueID).emit('joinLeague', update.player);

		})


		socket.on('addPrediction', (update) => {
			console.log('broadcast motherfucker')
			socket.to(update.leagueID).emit('addPrediction', update.prediction);
		});

		//socket.on('');
	});
};
