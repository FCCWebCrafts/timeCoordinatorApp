/* 
Properly configure controller 
*/


'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var	Meeting = require('../models/meeting');
var _ = require('lodash');

/**
 * Create a meeting
 	This will also save the user field to match the user who created the meeting.
 */
exports.create = function(req, res) {
	var meeting = new Meeting({
		name: req.body.name,
		admin: req.user,
		description: req.body.description,
		date: Date.now(),
		participants: req.body.participants

	});

	meeting.save(function(err) {
		if (err) {
			return res.status(400);
		} else {
			res.json(meeting);
		}
	});
};

/**
 * Show the current meeting
 */
exports.read = function(req, res) {
	Meeting.findById(req.params.meeting_id, function(err, meeting) {
		if (err) {
			res.send(404)
		}
		res.json(meeting);
	})
};

exports.update = function(req, res) {
	// update the meeting object
	Meeting.findById(req.params.meeting_id, function(err, meeting) {
		if (err) {
			res.send(404);
		}
		meeting = _.extend(meeting, req.body);
		meeting.save(function(err) {
			if (err) {
				return res.status(400);
			} 
			res.json(meeting);
			
		});
	});
	
};

// authentication to see meetings?
