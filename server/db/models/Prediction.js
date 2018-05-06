var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definition of prediction Schema
var PredictionSchema = new Schema({
  gameID : Number,
  leagueID: Schema.Types.ObjectId,
  scores: {team1: Number, team2: Number},
  userID: Schema.Types.ObjectId,
  username: String
});

var Prediction = mongoose.model('Prediction', PredictionSchema);
module.exports = Prediction;
