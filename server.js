// import required modules
var express = require('express');
var sassMiddleware = require('node-sass-middleware');
// instantiate express object
var app = express();

// use jade view-engine to compile templates
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// use sass middleware to compile css
app.use(
	sassMiddleware({
		src: __dirname + '/views/sass',
		dest: __dirname + '/public',
		debug: true
	})
);

// set the public folder to static to be accessed from client
app.use(express.static(__dirname + '/public'));
app.use('/bower_components/', express.static(__dirname + '/bower_components'));

// / -> index
app.get('/', function(req, res){
    res.render('index');
});

// listen on localhost port 3000 for now
app.listen(8080, 'localhost', function(){
  console.log("Listening on port 8080!");
});