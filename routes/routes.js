var express = require('express');
var router = express.Router();
var meetings = require('../controllers/meetings');
var users = require('../controllers/users');
// import index controller
// give access to the auth strategies we wrote in config/passport 
var passport = require('passport');

// Routes 
router.get('/', function(req, res) {
  res.redirect('login');
});

router.get('/login', function(req, res) {
  

  // render the page and pass in any flash data if it exists
  res.render('login', { message : req.flash('loginMessage') }); 
});

// process the login form
router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/login', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));


// SIGNUP ==============================

// show the signup form
router.get('/signup', function(req, res) {

  // render the page and pass in any flash data if it exists
  res.render('signup', { message : req.flash('signupMessage') });
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup',{
  successRedirect : '/profile', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));


// PROFILE SECTION =====================

router.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile', {user : req.user});
});

router.get('/profile/user', isLoggedIn, function(req, res){
  
  res.json(req.user);
});

// LOGOUT ==============================

router.get('/logout', function(req, res) {
 
  req.logout(); 
  res.redirect('/');
});

router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter',{
  successRedirect: '/profile',
  failureRedirect: '/login'
}));


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

module.exports = router;
