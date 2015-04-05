'use strict';

var mongoose = require('mongoose');
var	User = require('../models/user');
var Meeting = require('../models/meeting');
var _ = require('lodash');

/**
 * Shows ONE User's information, and ONLY shows safe information 
 * 	(i.e. does not show passwords or sensitive data)
 */
exports.read = function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if (err) {
			res.send(404)
		}
		if (!user) {
			res.status(404).send("This user does not exist.");
		} else {
			var o = {
				username: user.username,
				meetings: user.meetings
			};
			res.json(o);
		}
	});
};

// Can also use findByIdAndUpdate  ... 
exports.update = function(req, res) {
	// update the user object
	console.log("hitting the put function");
	User.findById(req.params.user_id, function(err, user) {
		if (err) {
			res.sendStatus(404);
		}
		console.log(req.body);
		user = _.assign(user, req.body);

		user.save(function(err) {
			if (err) {
				return res.status(400);
			} else {
				var o = {
					username: user.username,
					meetings: user.meetings
				};
				res.json(o);
			}
		
			
		});
	});
};

exports.editProfile = function(req, res) {
  User.findOne({_id: req.user})
  .exec(function(err, user) {
    user.set('name', req.body.name);
    user.set('email', req.body.email);
    user.save(function(err) {
      if(err){
        res.session.error =err;
      } else {
        req.session.msg = 'User Updated.';
      }
      res.redirect('/profile/edit');
    });
  });
};

// Adds a user to a meeting.

exports.joinMeeting = function(req, res) {
	// find a meeting
	var meeting_id = req.params.meeting_id;
	Meeting.findById(meeting_id).exec(function(err, meeting) {
		if (err) {
			res.sendStatus(404);
		}
		console.log(meeting);
		// add the user to that meeting participants array
		meeting.participants.push(req.user._id);
		meeting.save(function(err) {
			if (err) {
				res.sendStatus(500);
			}
			return;
		});
	});

	// add the meeting to the user's meetings array
	User.findById(req.user._id, function(err, user) {
		user.meetings.push(meeting_id);
		user.save(function(err) {
			if (err) {
				res.sendStatus(500);
			}
			var username = req.user.username;
			res.json({message: username+ " has successfully joined meeting "+ meeting_id});
		});
	});

	
	
};

