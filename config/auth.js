//expose our social media authentications directly to the app

module.exports = {
	'facebookAuth' : {
		'clientID': '773053662846765', //clientID provided by FB
		'clientSecret': '977e9e5329c0273819230a0d301ae957', //client secret provided by FB
		'callbackURL': 'http://localhost:3000/auth/facebook/callback' //THIS WILL NEED TO BE CHANGED IN PROD
	},
	'twitterAuth':{
		'consumerKey': '',
		'consumerSecret': '',
		'callbackURL': 'http://localhost:3000/auth/twitter/callback'
	},
	'googleAuth': {
		'clientID' : '',
		'clientSecret': '',
		'callbackURL': 'http://localhost:3000/auth/google/callback'
	}
};