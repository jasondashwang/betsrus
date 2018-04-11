var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definition of user Schema
var UserSchema = new Schema({
  userID: Schema.Types.ObjectId,
});