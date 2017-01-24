var express = require('express');
var PORT = process.env.PORT || 3000; 
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

//Connects to our mongoDB based on the URL in that file. 
mongoose.connect(configDB.url);

require('./config/passport')(passport);//Configure passport based on the config file. 

//Use morgan for debugging
app.use(morgan('dev'));
//Use cookie parser to *gasp* parse cookies
app.use(cookieParser());
//Use body parser to *gasp* parse the body. 
app.use(bodyParser());
//Secret to be used to determine if a session is active or not. 
app.use(session({secret: 'bubblesrsw33t'}));
//Initializes the passport app. 
app.use(passport.initialize());
//Creates a passport session
app.use(passport.session());
//Flash messages stored in a session
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

//Requires the routes for our app AND for passport. 
require('./app/routes.js')(app, passport);

//Listener based on env variable for PORT or 3000. 
app.listen(PORT, function(){
	console.log("Listening on port: "+PORT);
})