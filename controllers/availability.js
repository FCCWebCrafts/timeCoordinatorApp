'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var	Meeting = require('../models/meeting');
var User = require('../models/user');
var Avail = require('../models/availability');
var _ = require('lodash');

exports.addAvail = function(req, res) {
	// create a new object
	var avail = new Avail({});
	avail = _.assign(avail, req.body);
	avail.username = req.user._id;
	// add it to a meeting
	Meeting.findById(req.body.meeting_id, function(err, meeting) {
		if (err) {
			res.send(err);
		}
		if (!meeting) {
			res.json({message: "Sorry, this meeting doesn't exist."});
		} else {
			meeting.avail.push(avail);
			meeting.save(function(err) {
				if (err) {
					res.send(400);
				} else {
					res.json(meeting);
				}
			});
		}
	})
	// save the meeting
};
