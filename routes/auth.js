var express = require('express');
var router = express.Router();
// give access to the auth strategies we wrote in config/passport 
var passport = require('passport');

// ======== USERS RELATED AUTHENTICATION ROUTES ====


// TWITTER routes
router.route('/auth/twitter')
	.get(passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter',{
	successRedirect: '/profile',
	failureRedirect: '/login'
	}));


module.exports = router;
