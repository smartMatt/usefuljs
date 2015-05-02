
var User = require('./../models/user-model').User,
    Post = require('./../db').Post;




exports.isAuthenticated = function (req, res, next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.json({auth: false});
  }
}

exports.isStaticAuth = function (req, res, next){
  if(req.isAuthenticated()){
    console.dir('if')
    next();
  }else{
    console.dir('else')
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

exports.authStatus = function (user, postId, next) {


  var statusMessage = {};

  if (user) {
    statusMessage.loggedIn = true;

    if(postId) {
      Post.find({userId: user._id, _id: postId}).exec(function (err, posts) {
        console.dir(posts);

        if(posts.length != 0) {
          statusMessage.userPost = true;
        }

        next(null, statusMessage);

      })
    } else {
      next(null, statusMessage);

    }

  } else {
    statusMessage.loggedIn = false;
    next(null, statusMessage);

  }
}