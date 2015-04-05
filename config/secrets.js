// secret keys
//
// do not save the keys to this file!
// save them in a .env file in your developer environment.
// this is not shared via .git



module.exports = {
	twitter : {
	    consumerKey: process.env.TWITTER_KEY,
    	consumerSecret: process.env.TWITTER_SECRET,
        //accessToken: process.env.TWITTER_ACCESS_TOKEN,
        //accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    	callbackURL: '/auth/auth/twitter/callback',
    	passReqToCallback: true
	},
	facebook: {
		clientID        : process.env.FACEBOOK_ID,
        clientSecret    : process.env.FACEBOOK_SECRET,
        callbackURL     : '/auth/auth/facebook/callback'
	},
	google: {
		clientID        : process.env.GOOGLE_ID,
        clientSecret    : process.env.GOOGLE_SECRET,
        callbackURL     : '/auth/auth/google/callback'
	}
};