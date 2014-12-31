var mongoose = require('mongoose'),
    Post = require('./models/posts-model').Post;

//mongoose.connect('mongodb://usefuljs:usefulpass@kahana.mongohq.com:10062/go_test')
mongoose.connect('mongodb://mbahoshy:07maryJ68@ds029801.mongolab.com:29801/usefuljs')
//mongoose.connect('mongodb://nodejs-ssmdd-01.smartsource.local:27017/usefulJS?auto_reconnect=true')

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
  console.dir('db open')
});




module.exports.Post = Post;