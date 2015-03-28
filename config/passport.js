// config/passport.js

var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// where application keys are stored
var secrets = require('./secrets');
var User = require('../models/user');

// exposing this function to the app
module.exports = function(passport) {
	// serialize and unserialize users out of a session (persistent login)
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	// LOCAL SIGNUP strategy ============
	// ==================================

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function (req, email, password, done) {
		process.nextTick(function() {
			// does this user already exist?
			User.findOne({ 'local.email' : email}, function (err, user) {
				if (err) 
					return done(err);
				// if it finds a user ...
				if (user) {
					return done(null, false, req.flash('signupMessage', 'That email is already registered here.'));
				} else {
					// if the user doesn't exist, create one.
					var newUser = new User({});
					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);
                    newUser.name = req.body.name;
					//save the user to the database
					newUser.save(function(err) {
						if (err)
							throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done) {
		// find the user trying to login
		User.findOne({'local.email' : email}, function (err, user) {
			// error handler first
			if (err)
				return done(err);

			// if no user is found
			if (!user)
				return done(null, false, req.flash('loginMessage', "No user found."));

			// user found but wrong password
			if (!user.validPassword(password))
				return done(null, false, req.flash('loginMessage', "Wrong password."));

			// found the user and the password is correct, log them in
			return done(null, user);
		});
	}));

	/*	TWITTER login/auth strategy
	*
	*
	*/

    if (secrets.twitter.consumerKey) {
    	passport.use(new TwitterStrategy({
    		consumerKey: secrets.twitter.consumerKey,
    		consumerSecret: secrets.twitter.consumerSecret,
    		callbackURL: secrets.twitter.callbackURL
    	},
    	function(token, tokenSecret, profile, done) {
    		process.nextTick(function() {
    			User.findOne({ 'twitter.id' : profile.id }, function (err, user) {
    				if (err)
    					return done(err);
    				// if the user already exists, log them in
    				if (user) {
    					return done(null, user);
    				// if they don't exist yet, then add them to the database
    				} else {
    					var newUser = new User();
    					newUser.twitter.id = profile.id;
    					newUser.twitter.token = token;
    					newUser.twitter.username = profile.username;
    					newUser.twitter.displayName = profile.displayName;

    					newUser.save(function(err) {
    						if (err)
    							throw err;
    						return done(null, newUser);
    					});
    				}
    			});
    		});
    	}));
    }

	// facebook login strategy
	if (secrets.facebook.clientID) {
        passport.use(new FacebookStrategy(secrets.facebook, function(token, refreshToken, profile, done) {
    		process.nextTick(function() {
    			User.findOne({ 'facebook.id' : profile.id }, function (err, user) {
    				if (err)
    					return done(err);
    				if (user) {
    					return done(null, user);
    				} else {
    					var newUser = new User();
    					newUser.facebook.id    = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = profile.emails[0].value;

                        newUser.save(function(err) {
                        	if (err)
                        		throw err;
                        	return done(null, newUser);
                        });
    				}
    			});
    		});
    	}));
    }

    if (secrets.google.clientID) {
    	passport.use(new GoogleStrategy(secrets.google,
        function(token, refreshToken, profile, done) {

            process.nextTick(function() {
            	console.log("profile: "+JSON.stringify(profile));
                User.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if a user is found, log them in
                        return done(null, user);
                    } else {
                        // if the user isn't in our database, create a new user
                        var newUser          = new User();

                        // set all of the relevant information
                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = profile.emails[0].value;

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));
    }
};