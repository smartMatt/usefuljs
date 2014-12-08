

var bcrypt = require('bcrypt');


exports.generateHash = function (pwd, fn) {

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(pwd, salt, function(err, hash) {
      fn(err, salt, hash);
    });
  });

};

exports.compareToHash = function (pwd, hash, fn) {
  bcrypt.compare(pwd, hash, function (err, res) {
    fn(err, res)
  })
}
