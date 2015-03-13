// secret keys
//
// do not save the keys to this file!
// save them in a .env file in your developer environment.
// this is not shared via .git



module.exports = {
	twitter : {
	    consumerKey: process.env.TWITTER_KEY,
    	consumerSecret: process.env.TWITTER_SECRET,
    	callbackURL: '/auth/twitter/callback',
    	passReqToCallback: true
	}
};