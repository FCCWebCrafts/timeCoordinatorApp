var express = require('express');
var router = express.Router();
var passport = require('passport');

/* Authentication Routes: First login */

// LOCAL strategy


// TWITTER strategy

router.route('/twitter')
	.get(passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter',{
	successReturnToOrRedirect: '/meetings',
	failureRedirect: '/login'
}));

router.get('/facebook', passport.authenticate('facebook', {scope: 'email'}));	// scope:email just asks for the user's email address
router.get('/facebook/callback', passport.authenticate('facebook', {
	successReturnToOrRedirect: '/meetings',
	failureRedirect: '/login'
}));

router.get('/google', passport.authenticate('google', { scope: ['email profile']}));
router.get('/google/callback', passport.authenticate('google', {
	successReturnToOrRedirect: '/meetings',
	failureRedirect: '/login'
}));

router.get('/github', passport.authenticate('github', {scope: 'user'}));
router.get('/github/callback', passport.authenticate('github', {
  successReturnToOrRedirect: '/meetings',
  failureRedirect: '/login'
}));

//==========================================
//Authorization, Already Logged In/ Connect to current account
//==========================================
//Facebook-----------------------
router.get('/connect/facebook', passport.authorize('facebook', {scope: 'email'}));

router.get('/connect/facebook/callback',
          passport.authorize('facebook', { 
            successReturnToOrRedirect: '/profile',
            failureRedirect: '/profile'
          }));

//Twitter---------------
router.get('/connect/twitter', passport.authorize('twitter', {scope: 'email'}));

router.get('/connect/twitter/callback',
           passport.authorize('twitter', { 
  successReturnToOrRedirect: '/profile',
  failureRedirect: '/profile'
}));

//Google---------------
router.get('/connect/google', passport.authorize('google', {scope: ['profile', 'email']}));

router.get('/connect/google/callback',
           passport.authorize('google', { 
  successReturnToOrRedirect: '/profile',
  failureRedirect: '/profile'
}));

//github-----------
router.get('/connect/github', passport.authorize('github', {scope: 'user'}));
router.get('/connect/github/callback', passport.authorize('github', {
  successReturnToOrRedirect: '/profile',
  failureRedirect: '/profile'
}));

//=====================
// Unlink connected account
//=====================

//Facebook------------
router.get('/unlink/facebook', function(req, res) {
  var user = req.user;
  user.facebook = undefined;
  user.save(function(err){
    res.redirect('/profile');
  });
});

//Twitter-------------
router.get('/unlink/twitter', function(req, res) {
  var user = req.user;
  user.twitter = undefined;
  user.save(function(err){
    res.redirect('/profile');
  });
});
//Google-------------
router.get('/unlink/google', function(req, res) {
  var user = req.user;
  user.google = undefined;
  user.save(function(err){
    res.redirect('/profile');
  });
});
//Github--------------
router.get('/unlink/github', function(req, res) {
  var user = req.user;
  user.github = undefined;
  user.save(function(err){
    res.redirect('/profile');
  });
});

module.exports = router;
