var mongoose = require('mongoose');
var schema = mongoose.Schema({
  username: String,
  meeting: [String]
});

var User = mongoose.model( 'user', schema);

module.exports = User;

/*
TODO

 - meetings should be an array of Meetings objects

 - availability: how to represent availability for multiple users?


*/