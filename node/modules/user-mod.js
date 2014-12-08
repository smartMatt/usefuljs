
var User = require('./../models/user-model').User,
    hash = require('./../hash');

exports.createUser = function (req, res) {

  var userbody = req.body;
  userbody.username = userbody.username.toLowerCase();

  User.find({username: userbody.username}).exec(function (err, result) {

    hash.generateHash(userbody.password, function (err, salt, rHash) {
      userbody.hash = rHash;
      var newUser = new User(userbody);
      newUser.save();
      res.json(newUser);
    })
  })



}

//exports.logout = function (req, res) {
//  req.logout();
//  res.json({loggedIn: false});
//}

exports.loginSuccess = function (req, res) {
  res.json({success: true});
}