var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var availabilitySchema = mongoose.Schema({
	username: { type: Schema.Types.ObjectId, ref: 'User' },
	start: Date,
	end: Date
});


module.exports = mongoose.model('Availability', availabilitySchema);

