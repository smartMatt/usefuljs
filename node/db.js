var mongoose = require('mongoose'),
    Post = require('./models/posts-model').Post;

mongoose.connect('mongodb://usefuljs:usefulpass@kahana.mongohq.com:10062/go_test')

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
  console.dir('db open')
});




module.exports.Post = Post;