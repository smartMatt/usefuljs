
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var hash = require('./../hash');

var User = require('./../models/user-model').User;


module.exports = function (app) {

  app.use(passport.initialize());
  app.use(passport.session());



  passport.use(new LocalStrategy({
        usernameField: 'username', //looks at form name 'email' for username
        passwordField: 'password' //looks at form name 'password' for password
      },
      function(username, password, done) { //a function which takes three parameters
        console.log('local strategy called');

        username = username.toLowerCase();
        User.findOne({ username : username}).exec(function(err, user){

          if(!user){
            return done(null, false, { message: 'Incorrect username.' });
          }

          hash.compareToHash( password, user.hash, function (err, res) {
            if (err) { return done(err); }
            if (res == true) return done(null, user);
            done(null, false, { message: 'Incorrect password.' });
          });
        });



      }
  ));


  passport.serializeUser(function(user, done) {
    done(null, user);
  });


  passport.deserializeUser(function(user, done) {
    done(null, user);

  });


}