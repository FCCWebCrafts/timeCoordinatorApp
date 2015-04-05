var express = require('express');
var router = express.Router();
var passport = require('passport');

/* Authentication Routes */

// LOCAL strategy



// TWITTER strategy

router.route('/auth/twitter')
	.get(passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter',{
	successReturnToOrRedirect: '/profile',
	failureRedirect: '/login'
}));

router.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));	// scope:email just asks for the user's email address
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successReturnToOrRedirect: '/profile',
	failureRedirect: '/login'
}));

router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile']}));
router.get('/auth/google/callback', passport.authenticate('google', {
	successReturnToOrRedirect: '/profile',
	failureRedirect: '/login'
}));





module.exports = router;
