var mongoose = require('mongoose');
//var Schema = mongoose.Schema;

var meetingSchema = mongoose.Schema({
	name: String,
	admin: String,
	description: String,
	date: Number,
	participants: [String]
});

module.exports = mongoose.model('Meeting', meetingSchema);

/*
TODO
 - define how users are going to input their availability data
 - members should be an array of User objects
 - admin should be the Userid of the person who created the Meeting

 - how to associate each of the avail. times with a User?
 	i.e. how should participants array/object contain refs. to User
 	objects as well as availability?


*/