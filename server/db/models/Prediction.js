var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definition of prediction Schema
var PredictionSchema = new Schema({
  gameID : Number,
  LeagueID: Schema.Types.ObjectId,
  scores: {home: Number, away: Number},
  userID: Schema.Types.ObjectId
});

var Prediction = mongoose.model('Prediction', PredictionSchema);
module.exports = Prediction;
