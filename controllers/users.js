// User controller



'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var	User = require('../models/user');
var _ = require('lodash');

// There is no "create" function for users accessible via the API.
// Users either need to sign up on the website or login via a service.

/**
 * Shows ONE User's information, and ONLY shows safe information 
 * 	(i.e. does not show passwords or sensitive data)
 */
exports.read = function(req, res) {
	User.findById(req.params.user_id, 'username meetings -_id', function(err, user) {
		if (err) {
			res.send(404)
		}
		if (!user) {
			res.status(404).send("This user does not exist.");
		} else {
			// maybe add some contact info so people can get in touch?
			// the query ONLY sends back the username and meetings
			res.json(user);
	}
	});
};

// Can also use findByIdAndUpdate  ... 
exports.update = function(req, res) {
	// update the user object
	User.findById(req.params.user_id, function(err, user) {
		if (err) {
			res.sendStatus(404);
		}
		user = _.assign(user, req.body);
		user.save(function(err) {
			if (err) {
				return res.status(400);
			} 
		res.location('back');
		res.json(user);
			
		});
	});
	
};

exports.list = function(req, res) {
	Meeting.find(function(err, meetings) {
		if (err) {
			res.send(404);
		}
		res.json(meetings);
	})
};

exports.destroy = function(req, res) {
	Meeting.findById(req.params.meeting_id, function(err, meeting) {
		meeting.remove(function(err) {
			if (err) {
				res.send(500);
			}
			res.send("Meeting with id: "+meeting._id+" is removed.");
		});
	});
}

// authentication to see meetings?
