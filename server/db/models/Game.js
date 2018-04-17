var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definition of game Schema
var GameSchema = new Schema({
  start_Date: { type: Date, required: true },
  team1: { name: {type: String, required: true}, score: {type: Number, required: true}},
  team2: { name: {type: String, required: true}, score: {type: Number, required: true}},
	gameID: Number
});

var Game = mongoose.model('Game', GameSchema);
module.exports = Game;
