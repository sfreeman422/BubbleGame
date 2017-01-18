var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//Define the schema
var userSchema = mongoose.Schema({
	local: {
		email: String,
		password: String
	},
	facebook:{
		id: String,
		token: String,
		email: String,
		name: String
	},
	twitter:{
		id: String,
		token: String,
		displayName: String,
		username: String
	},
	google:{
		id: String,
		token: String,
		email: String,
		name: String
	}
});

//Generates a hash to begin encryption of the password. 
userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Checks if PW is valid
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
};

//Create the model for uses and expose it to our app. 
module.exports = mongoose.model('User', userSchema);