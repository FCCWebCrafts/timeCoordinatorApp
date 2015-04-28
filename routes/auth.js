var express = require('express');
var router = express.Router();
var passport = require('passport');

/* Authentication Routes: First login */

// LOCAL strategy



// TWITTER strategy

router.route('/twitter')
	.get(passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter',{
	successReturnToOrRedirect: '/profile',
	failureRedirect: '/login'
}));

router.get('/facebook', passport.authenticate('facebook', {scope: 'email'}));	// scope:email just asks for the user's email address
router.get('/facebook/callback', passport.authenticate('facebook', {
	successReturnToOrRedirect: '/index',
	failureRedirect: '/index'
}));

router.get('/google', passport.authenticate('google', { scope: ['email profile']}));
router.get('/google/callback', passport.authenticate('google', {
	successReturnToOrRedirect: '/profile',
	failureRedirect: '/login'
}));

router.get('/github', passport.authenticate('github', {scope: 'user'}));
router.get('/github/callback', passport.authenticate('github', {
  successReturnToOrRedirect: '/profile',
  failureRedirect: '/login'
}));

//==========================================
//Authorization, Already Logged In/ Connect to current account
//==========================================
//Facebook-----------------------
router.get('/connect/facebook', passport.authorize('facebook', {scope: 'email'}));

router.get('/connect/facebook/callback',
          passport.authorize('facebook', { 
            successRedirect: '/profile',
            failureRedirect: '/'
          }));

//Twitter---------------
router.get('/connect/twitter', passport.authorize('twitter', {scope: 'email'}));

router.get('/connect/twitter/callback',
           passport.authorize('twitter', { 
  successRedirect: '/profile',
  failureRedirect: '/'
}));

//Google---------------
router.get('/connect/google', passport.authorize('google', {scope: ['profile', 'email']}));

router.get('/connect/google/callback',
           passport.authorize('google', { 
  successRedirect: '/profile',
  failureRedirect: '/'
}));

//github-----------
router.get('/connect/github', passport.authorize('github', {scope: 'user'}));
router.get('/connect/github/callback', passport.authorize('github', {
  successReturnToOrRedirect: '/profile',
  failureRedirect: '/'
}));

//=====================
// Unlink connected account
//=====================

//Facebook------------
router.get('/unlink/facebook', function(req, res) {
  var user = req.user;
  user.facebook.token = undefined;
  user.save(function(err){
    res.redirect('/profile');
  });
});

//Twitter-------------
router.get('/unlink/twitter', function(req, res) {
  var user = req.user;
  user.twitter.token = undefined;
  user.save(function(err){
    res.redirect('/profile');
  });
});
//Google-------------
router.get('/unlink/google', function(req, res) {
  var user = req.user;
  user.google.token = undefined;
  user.save(function(err){
    res.redirect('/profile');
  });
});
//Github--------------
router.get('/unlink/github', function(req, res) {
  var user = req.user;
  user.github.token = undefined;
  user.save(function(err){
    res.redirect('/profile');
  });
});

module.exports = router;
