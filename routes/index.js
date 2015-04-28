var express = require('express');
var router = express.Router();
// give access to the auth strategies we wrote in config/passport
var passport = require('passport');

// Routes for index

//app initial entry point
router.route('/')
	.get(function (req, res) {
		res.render('index');
});

//making the jade partials for angular views display
router.get('/partials/:name', function(req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
});

// LOCAL strategy sign up 
router.route('/signup')
	.post(passport.authenticate('local-signup', {
		successReturnToOrRedirect: 'profile',
		failureRedirect: '/signup',
		failureFlash: true
}));

router.route('/login')
	.post(passport.authenticate('local-login', {
		successReturnToOrRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
}));

router.route('/logout')
	.get(function (req, res) {
		req.logout();
		res.redirect('index');
});

router.route('/loggedin') 
  .get(function(req, res) {
    res.send(req.isAuthenticated() ? req.user._id : '0');
});

//catch all route
router.get('*', function (req, res) {
  res.render('index');
});

module.exports = router;
