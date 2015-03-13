var express = require('express');
var router = express.Router();
// give access to the auth strategies we wrote in config/passport 
var passport = require('passport');

// ======== USERS RELATED AUTHENTICATION ROUTES ====

// LOCAL strategy
router.route('/login')
	.get(function (req, res, next) {
		res.render('login.ejs', {title: 'Login'});
	})
	.post(passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));
// TWITTER routes
router.route('/auth/twitter')
	.get(passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter',{
	successRedirect: '/profile',
	failureRedirect: '/login'
	}));

router.route('/signup')
	.get(function (req, res) {
		res.render('signup.ejs', {message: req.flash('signupMessage')});
	})
	.post(passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true
	}));

router.route('/profile')
	.get(isLoggedIn, function (req, res) {
		res.render('profile.ejs', {
			// passes the user to the template from the user session
			user: req.user
		});
	});

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
	res.redirect('/login');
}

module.exports = router;
