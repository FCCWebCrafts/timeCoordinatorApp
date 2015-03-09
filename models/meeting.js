var mongoose = require('mongoose');
var schema = mongoose.Schema({
  name: String,
  admin: Boolean,
  description: String,
  date: Date,
  particpants: [String]
}) ;

<<<<<<< HEAD
var meeting = mongoose.model( 'meeting', schema);

module.exports = meeting;
=======
var meetingSchema = ({
	name: String,
	admin: String,
	description: String,
	date: Number,
	participants: String
});

module.exports = mongoose.model('Meeting', meetingSchema);
>>>>>>> 72883ce7b22ff4e9c3c63bad31eee3417c42bf2f

/*
TODO
 - define how users are going to input their availability data
 - members should be an array of User objects
 - admin should be the Userid of the person who created the Meeting

 - how to associate each of the avail. times with a User?
 	i.e. how should participants array/object contain refs. to User
 	objects as well as availability?


*/