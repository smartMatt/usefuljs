
var User = require('./../models/user-model').User;



exports.isAuthenticated = function (req, res, next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.json({auth: false});
  }
}

exports.isStaticAuth = function (req, res, next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('/login')
  }
}

exports.isStaticAdmin = function (req, res, next) {
  if(req.isAuthenticated() && (req.user.isAdmin == true)){
    next();
  }else{
    res.redirect('/login')
  }
}


exports.userExist = function(req, res, next) {

  User.findOne({username: req.body.username}).exec(function (err, data) {
    if(data) {
      next();
    } else {
      res.redirect("/login");
    }
  })
}

exports.isAdmin = function (req, res, next) {
  if(req.isAuthenticated() && (req.user.isAdmin == true)){
    next();
  }else{
    res.json({auth: false});
  }
}