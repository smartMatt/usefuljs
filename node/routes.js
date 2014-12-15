
var Post = require('./db').Post,
    _ = require('underscore'),
    userMod = require('./modules/user-mod'),
    passport = require('passport'),
    auth = require('./passport/auth');


module.exports = function (app, dirname) {

  // static file routes

  app.get('/', auth.isStaticAuth, function (req, res) {
    console.dir('wut')
    res.sendFile(dirname + '/public/ujs-index.html');
  })

  app.get('/login', function (req, res) {
    res.sendFile(dirname + '/public/login.html');
  })

  app.post('/login', passport.authenticate('local'), userMod.loginSuccess);

  app.get('/logout', function (req, res) {
    req.logout();
    res.sendFile(dirname + '/public/login.html');
  });

  app.post('/post', auth.isAuthenticated, function (req, res) {

    req.body.dateCreated = new Date();
    req.body.lastUpdated = new Date();
    req.body.userId = req.user._id;
    var myPost = new Post(req.body);

    myPost.save(function (err, post) {
      res.json(post);

    });


  })

  app.post('/post/edit/:_id', function (req, res) {

    var editPost = req.body;
    editPost.lastUpdated = new Date ();
    delete editPost._id;

    Post.update({_id: req.params._id}, editPost, function(err, result) {
      res.json({_id: req.params._id});
    })
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

  app.post('/comment/:postId', function (req, res) {

    var myComment = {
      username: req.user.username,
      dateCreated: new Date(),
      userId: req.user._id,
      value: req.body.comment
    };

    Post.update({_id: req.params.postId}, {$push: {comments: myComment}}, function (err, result) {
      res.json(myComment);
    });

  })


  app.post('/user', userMod.createUser)
}