var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definition of prediction Schema
var PredictionSchema = new Schema({
  gameID : Schema.Types.ObjectID,
  LeagueID: Schema.Types.ObjectID,
  scores: {home: Number, away: Number},
  userID: Schema.Types.ObjectID
});

var Prediction = mongoose.model('Prediction', PredictionSchema);
module.exports = Prediction;

