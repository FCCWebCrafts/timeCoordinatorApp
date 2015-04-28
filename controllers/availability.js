'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var	Meeting = require('../models/meeting');
var User = require('../models/user');
var Avail = require('../models/availability');
var _ = require('lodash');
var moment = require('moment-timezone');

exports.addAvail = function(req, res) {
	// create a new object
	var avail = new Avail();

	var startTime = moment(req.body.start, "YYYY-MM-DD HH:mm");
	var endTime = moment(req.body.end, "YYYY-MM-DD HH:mm");

	avail.start = startTime;
	avail.end = endTime;

	avail.username = req.user._id;

	// add it to a meeting
	Meeting.findById(req.params.meeting_id, function(err, meeting) {
		if (err) {
			return res.send(err);
		}
		if (!meeting) {
			return res.sendStatus(500);
		} else {
			meeting.availability.push(avail);
          	// save the meeting
			meeting.save(function(err) {
				if (err) {
					res.status(500);
				} else {
					res.status(200).json(meeting);
				}
			});
		}
	});
};
