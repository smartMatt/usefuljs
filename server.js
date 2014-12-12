

var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session');




var app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());
app.use(session({secret: 'keyboard cat'}))



require('./node/passport/passport')(app);

require('./node/routes')(app, __dirname);


var port = process.env.PORT || 3000;
app.listen(port);
console.log("Started server on port " + port);
