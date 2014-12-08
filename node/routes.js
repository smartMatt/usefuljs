
var Post = require('./db').Post,
    _ = require('underscore'),
    userMod = require('./modules/user-mod'),
    passport = require('passport'),
    auth = require('./passport/auth');


module.exports = function (app, dirname) {

  // static file routes

  app.get('/', function (req, res) {
    res.sendFile(dirname + '/public/index.html');
  })

  app.get('/login', function (req, res) {
    res.sendFile(dirname + '/public/login.html');
  })

  app.post('/login', passport.authenticate('local'), userMod.loginSuccess);

  app.get('/logout', function (req, res) {
    req.logout();
    res.sendFile(dirname + '/public/login.html');
  });

  app.post('/create-post', auth.isAuthenticated, function (req, res) {

    req.body.dateCreated = new Date();
    req.body.userid = req.user._id;
    var myPost = new Post(req.body);

    myPost.save(function (err, post) {
      res.json(post);

    });


  })

  app.get('/posts/:_id', auth.isAuthenticated, function (req, res) {
    Post.findById(req.params._id, function (err, result) {
      res.json(result);
    })
  })

  app.get('/posts', auth.isAuthenticated, function (req, res) {
    Post.find({}).exec(function (err, posts) {
      res.json(posts);
    })
  })

  app.get('/post-tags', auth.isAuthenticated, function (req, res) {
    Post.find({}).select('tags').exec(function(err, posts) {
      var tags = [];
      for (var i = 0; i < posts.length; i++) {
        for (var y = 0; y < posts[i].tags.length; y++) {
          tags.push(posts[i].tags[y]);
        }
      }

      tags = _.uniq(tags);
      res.json(tags);
    })
  })


  app.post('/user', userMod.createUser)
}