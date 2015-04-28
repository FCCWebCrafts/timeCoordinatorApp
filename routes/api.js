/* TODO 
 - how many API routes do we need
 - what parts of the application do we not want to expose?

*/

var express = require('express');
var router = express.Router();
var meetings = require('../controllers/meetings');
var users = require('../controllers/users');
var avail = require('../controllers/availability');

// API routes
router.get('/', function(req, res) {
  console.log("Show API documentation here.");
});

// requires a user to be logged in to access any API endpoints
router.use(isLoggedIn);

function isLoggedIn(req, res, next) {
	if (!req.isAuthenticated()) {
		res.status(401);
	} next();
}

// 		MEETINGS ROUTES
//	========================

// one meeting
router.route('/meetings/:meeting_id')
	.get(meetings.read)
	.put(meetings.update)
	.delete(meetings.destroy);

router.route('/meetings/join/:meeting_id')
	.post(users.joinMeeting);

// all meetings / multiple meetings
router.route('/meetings')
	.post(meetings.create)
	.get(meetings.list);

// allows for inviting users to a meeting.
// not having a route param allows the page to display options relative to that user.
router.route('/meetings/invite')
	.get()
	.post();



// 		USERS ROUTES
//	========================

// one user profile

router.route('/users/:user_id')
	// only shows one user, and sanitizes the user information
	// cannot create or delete users 
	.get(users.read)
	.post(users.update);

//      AVAILABILITY ROUTES
//============================

//router.route('/meetings/:meeting_id/availability/:availability_id')
//    .get(avail.read);
//	//.put(avail.update);

router.route('/meetings/:meeting_id/availability')
    .get(avail.list)
    .post(avail.addAvail);


module.exports = router;