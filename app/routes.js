module.exports = function(app, passport){
	var path = require('path');
	//Handles a user's first visit to the page
	app.get("/", function(req, res){
	res.sendFile(path.resolve("public/signup.html"));
	});
	//Handles a user trying to get to the login page. Sends them the page. 
	app.get("/login", function(req, res){
		res.sendFile(path.resolve("public/login.html"));
	});
	//Handles a user submitting login information. 
	app.post("/login", passport.authenticate('local-login', {
		successRedirect: '/game',
		failureRedirect: '/login',
		failureFlash: true
	}));
	//Handles a user trying to get the signup page. 
	app.get('/signup', function(req, res){
		res.sendFile(path.resolve("public/signup.html"));
	});
	//Handles a user trying to send sign up details. 
	app.post("/signup", passport.authenticate('local-signup', {
		successRedirect: '/game', //redirects to the game page upon successful account creation. 
		failureRedirect: '/signup', //redirect back to the sign up page if there is an error. 
		failureFlash: true //allows flash messages. 
	}));
	//Gives the user their page once they are logged in. 
	app.get("/game", isLoggedIn, function(req, res){
		res.sendFile(path.resolve("public/index.html"));
	});
	//Logs the user out and sends em home. 
	app.get("/logout", function(req, res){
		req.logout();
		res.redirect('/');
	});
	//Functino to make sure a user is logged in. 
	function isLoggedIn(req, res, next){
		//If a user is authenticated, do the thing they wanna do. 
		if(req.isAuthenticated())
			return next();
		//If not, send em home. 
		res.redirect('/');
	}
}