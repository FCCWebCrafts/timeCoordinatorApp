var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var deepPopulate = require('mongoose-deep-populate');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
	name: String,
	meetings: [{ type: Schema.Types.ObjectId, ref: 'Meeting' }],
	local: {
		email: String,
		password: String
	},
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	twitter: {
		id: String,
		token: String,
		displayName: String,
		userName: String
	},
	google: {
		id: String, 
		token: String,
		email: String,
		name: String
	}
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};
userSchema.plugin(deepPopulate,{ 
  populate: {
    'meetings.admin' : {
      select: 'name'
    },
    'meetings.participants': {
      select: 'name'
    }
  }
});
module.exports = mongoose.model('User', userSchema);

