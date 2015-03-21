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
	User.findById(req.params.user_id, function(err, user) {
		if (err) {
			res.sendStatus(404);
		}
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

