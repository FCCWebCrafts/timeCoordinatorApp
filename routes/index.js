var express = require('express');
var router = express.Router();
// give access to the auth strategies we wrote in config/passport 
var passport = require('passport');
var users = require('../controllers/users');

// Routes for index 

router.route('/')
	.get(function (req, res, next) {
		res.render('login', {name: req.user });
	});

// LOCAL strategy sign up 
router.route('/signup')
	.get(function (req, res) {
		res.render('signup', {message: req.flash('signupMessage')});
	})
	.post(passport.authenticate('local-signup', {
		successRedirect: 'profile',
		failureRedirect: 'signup',
		failureFlash: true
	}));

router.route('/login')
	.get(function (req, res, next) {
		res.render('login', {title: 'Login'});
	})
	.post(passport.authenticate('local-login', {
		successRedirect: 'profile',
		failureRedirect: 'login',
		failureFlash: true
	}));


router.route('/profile')
	.get(isLoggedIn, function (req, res) {
		res.render('profile', {
			// passes the user to the template from the user session
			user: req.user
		});
    });

router.get('/profile/edit', isLoggedIn, function(req, res) {
		res.render('editprofile', {
			user: req.user
		});
	})
    .post('/profile/edit/update', users.editProfile);

router.route('/logout')
	.get(function (req, res) {
		req.logout();
		res.redirect('/');
	});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	console.log("User is not logged in.");
	res.redirect('login');
}

module.exports = router;
