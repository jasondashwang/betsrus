var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definition of user Schema
var UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  leagues: [{id: {type: String, required: true, unique: true}}]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
