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
router.post('/servsignup', function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info){
    if (err) {
      return res.json(err);
    }
    if (user.error) {
      return res.json({error: user.error});
    }
    req.logIn(user, function(err) {
      if(err){
        return res.json(err);
      }
      return res.json({redirect: '/meetings'}, user._id);
    });
  })(req, res);
});

router.post('/servlogin', function(req, res, next){
  passport.authenticate('local-login', function(err, user, info){
  if (err) {
    return res.json(err);
  }
  if(user.error) {
    return res.json({error: user.error});
  }
  req.logIn(user, function(err){
    if(err){
      return res.json(err);
    }
    return res.json({redirect: '/meetings'}, user._id);
  });
})(req, res);
});

router.route('/logout')
	.get(function (req, res) {
		req.logout();
		res.redirect('/login');
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
