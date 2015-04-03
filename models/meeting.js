var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');
var Schema = mongoose.Schema;

var meetingSchema = mongoose.Schema({
	name: String,
	lastUpdated: Date,
	admin: [{ type: Schema.Types.ObjectId, ref: 'User' } ],
	description: String,
	date: Date,
	participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	avail: [{ type: Schema.Types.Mixed}]
});

meetingSchema.plugin(deepPopulate);
module.exports = mongoose.model('Meeting', meetingSchema);

