/* TODO 
 - how many API routes do we need
 - what parts of the application do we not want to expose?

*/

var express = require('express');
var router = express.Router();
var meetings = require('../controllers/meetings');
var users = require('../controllers/users');

// API routes
router.get('/', function(req, res, next) {
  console.log("Show API documentation here.");
});

// requires a user to be logged in to access any API endpoints
router.use(isLoggedIn);

function isLoggedIn(req, res, next) {
	if (!req.isAuthenticated()) {
		console.log("User is not logged in.");
		// Changed to handle server-side unauthorized access to include Angular
		res.sendStatus(401);
	} else {
		next();
	}
	
}

// 		MEETINGS ROUTES
//	========================

// one meeting
router.route('/meetings/:meeting_id')
	.get(meetings.read)
	.put(meetings.update)
	.delete(meetings.destroy);

// all meetings / multiple meetings
router.route('/meetings')
	.post(meetings.create)
	.get(meetings.list);

// 		USERS ROUTES
//	========================

// one user profile

router.route('/users/:user_id')
	// only shows one user, and sanitizes the user information
	// cannot create or delete users 
	.get(users.read)
	.put(users.update);


module.exports = router;