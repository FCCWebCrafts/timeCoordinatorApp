// config/passport.js

var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GithubStrategy = require('passport-github').Strategy;
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
					return done(null, {error: 'This email is already registered here'}, req.flash('signupMessage', 'That email is already registered here.'));
				} else {
					// if the user doesn't exist, create one.
					var newUser = new User();
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
      process.nextTick(function() {
		// find the user trying to login
		User.findOne({'local.email' : email}, function (err, user) {
			// error handler first
			if (err)
				return done(err);
			// if no user is found
			if (!user)
				return done(null, {error: 'no user found.'}, req.flash('loginMessage', "No user found."));

			// user found but wrong password
			if (!user.validPassword(password))
				return done(null, {error: "wrong password!"}, req.flash('loginMessage', "Wrong password."));

			// found the user and the password is correct, log them in
			return done(null, user);
		});
      });
	}));
    

	/*	TWITTER login/auth strategy
	*
	*
	*/

  passport.use(new TwitterStrategy(secrets.twitter, function(req, token, tokenSecret, profile, done) {
		process.nextTick(function() {
      if(!req.user) {
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
          } else{
            // user already exist pull the user from session
            var user = req.user;
            //update the current users facebook info
            user.twitter.id = profile.id;
            user.twitter.token = token;
            user.twitter.username = profile.username;
            user.twitter.displayName = profile.displayName;
            //save the user
            user.save(function(err) {
              if(err)
                throw err;
              return done(null, user);
            });
          }
		});
	}));
    //============================
	// facebook login strategy
    //============================
	passport.use(new FacebookStrategy(secrets.facebook, function(req, token, refreshToken, profile, done) {
		process.nextTick(function() {
          if(!req.user){
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
          } else {
            // user already exist pull the user from session
            var user = req.user;
          //update the current users facebook info
            user.facebook.id = profile.id;
            user.facebook.token = token;
            user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
            user.facebook.email = profile.emails[0].value;
            
            //save the user
            user.save(function(err) {
              if(err)
                throw err;
              return done(null, user);
            });
          }
		});
	}));
  //==================
  //Google Login Strategy
  //==================

	passport.use(new GoogleStrategy(secrets.google,
    function(req, accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
        	if(!req.user){
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
                      newUser.google.token = accessToken;
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
            } else{
              // user already exist pull the user from session
              var user = req.user;
              //update the current users facebook info
              user.google.id = profile.id;
              user.google.token = accessToken;
              user.google.name = profile.displayName;
              user.google.email = profile.emails[0].value;
              //save the user
              user.save(function(err) {
                if(err)
                  throw err;
                return done(null, user);
              });
            }
        });
    }));
  
  //==================
  //GitHub Login Strategy
  //==================
    passport.use(new GithubStrategy(secrets.github,
       function(req, accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
          if(!req.user){
            User.findOne({'github.id' : profile.id }, function(err, user){
              if(err)
                return done(err);
              if(user){
                return done(null, user);
              }else{
               var newUser = new User();
                newUser.github.id = profile.id;
                newUser.github.token = accessToken;
                newUser.github.displayName = profile.displayName;
                newUser.github.username = profile.username;
                newUser.github.profileUrl = profile.profileUrl;
                newUser.github.email = profile.emails[0].value;
                
                newUser.save(function(err) {
                  if(err)
                    throw err;
                  return done(null, user);
                });
              }
            });
          }else{
            var user = req.user;
            user.github.id = profile.id;
            user.github.token = accessToken;
            user.github.displayName = profile.displayName;
            user.github.username = profile.username;
            user.github.profileUrl = profile.profileUrl;
            user.github.email = profile.emails[0].value;
            
            user.save(function(err){
              if(err)
                throw err;
              return done(null, user);
            });
          }
        });
    }));
};