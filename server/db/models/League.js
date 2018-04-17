var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definition of league Schema
var LeagueSchema = new Schema({
  players: [{
              Playerid: type: Schema.Types.ObjectId,
              score: {type: Number}
            }],
  name : {type: String, required: true}

});

var League = mongoose.model('League', LeagueSchema);
module.exports = League;
