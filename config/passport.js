//require the local strategy from pasport to allow us to authenticate if someone doesnt have social media
var LocalStrategy = require('passport-local').Strategy;

//Load up our user model
var User = require("../app/models/User");

module.exports = function(passport){
	//Passport session setup. Passport requires we serialize and deserialie users out of sessions

	//Serializes the users session
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});
	//Deserializes the users session. 
	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user); 
		})
	});

	//LOCAL SIGN UP SECTION***************************************
	//Creates a local strategy called local-signup that handles our local sign ups. 
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true //allows us to pass back the entire request to the calback
	},
	function(req, email, password, done){
		//Async
		//User.findOne wont fire unless data is sent back. 
		process.nextTick(function(){
			User.findOne({'local.email' : email}, function(err, user){
				if(err)
					return done(err);
				if(user){
					return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
				} else{
					//if user does not already exist, create.
					var newUser = new User();
					//Set users email and PW. 
					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);

					//Save the new user
					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser); 
					});
				}
			});
		});
		}));
//Strategy for local login. 
	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true //allows us to pass the entire request to the callback
	},
	function(req, email, password, done){
		User.findOne({'local.email': email}, function(err, user){
			//If there is an error, return that before anything else. 
			if(err)
				return done(err);
			//If there is no user found, let the page know. 
			if(!user)
				return done(null, false, req.flash('loginMessage', 'No user found'));
			//If the PW is wrong..
			if(!user.validPassword(password))
				return done(null, false, req.flash('loginMessage', 'Wrong pw.'));

			return done(null, user);
		})
	}))
};