var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var userSchema = new Schema({
  username: String,
  email: String,
  hash: String
})

var User = mongoose.model('User', userSchema);

module.exports.User = User;