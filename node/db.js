var mongoose = require('mongoose'),
    Post = require('./models/posts-model').Post,
    config = require('./config');

mongoose.connect(config.db);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.dir('db open')
});




module.exports.Post = Post;