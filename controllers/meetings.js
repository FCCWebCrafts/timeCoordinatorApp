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
 	This will also save the admin field to match the user who created the meeting.
 */
exports.create = function(req, res) {
	var meeting = new Meeting({});
	meeting.name = req.body.name;
    meeting.description = req.body.description;
    meeting.date = new Date();
	meeting.admin = req.user._id;
	meeting.save(function(err) {
		if (err) {
			return res.status(400);
		} else {
			res.json(meeting);
            res.redirect('/profile')
		}
	});
};

/**
 * Shows ONE meeting (list shows all meetings or <<TODO>> allows filtering)
 */
exports.read = function(req, res) {
	Meeting.findById(req.params.meeting_id, function(err, meeting) {
		if (err) {
			res.send(404)
		}
		if (!meeting) {
			res.status(404).send("This meeting does not exist.");
		} else {
		res.json(meeting);
	}
	});
};

// Can also use findByIdAndUpdate  ... 
exports.update = function(req, res) {
	// update the meeting object
	Meeting.findById(req.params.meeting_id, function(err, meeting) {
		if (err) {
			res.send(404);
		}
		meeting = _.assign(meeting, req.body);
		meeting.save(function(err) {
			if (err) {
				return res.status(400);
			} 
			res.json(meeting);
			
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
