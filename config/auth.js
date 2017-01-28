//expose our social media authentications directly to the app

module.exports = {
	'facebookAuth' : {
		'clientID': '773053662846765', //clientID provided by FB
		'clientSecret': '977e9e5329c0273819230a0d301ae957', //client secret provided by FB
		'callbackURL': 'https://mighty-spire-54409.herokuapp.com/auth/facebook/callback' //THIS WILL NEED TO BE CHANGED IN PROD
	},
	'twitterAuth':{
		'consumerKey': '0BoEjUsl7tfCJI7plfkFMlIs9',
		'consumerSecret': 'Pa5ZtWF1Kf1gS4d1h9I8k4xG8fXEcoeUVtbyoyC9X2j1kQTmVF',
		'callbackURL': 'https://mighty-spire-54409.herokuapp.com/auth/twitter/callback'
	},
	'googleAuth': {
		'clientID' : '',
		'clientSecret': '',
		'callbackURL': 'https://mighty-spire-54409.herokuapp.com/auth/google/callback'
	}
};