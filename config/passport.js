const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user'); // Ensure the path to your User model is correct

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID, // comes from .env file
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK // should match the registered redirect URI
    },
    function(accessToken, refreshToken, profile, cb) {
        // Find user by Google ID
        User.findOne({ googleId: profile.id }).then(async function(user) {
            if (user) return cb(null, user); // User exists, return the user

            try {
                // Create a new user if not found
                user = await User.create({
                    name: profile.displayName, // User's display name
                    googleId: profile.id,      // Google ID
                    email: profile.emails[0].value, // User's email
                    avatar: profile.photos[0].value // User's avatar
                });
                return cb(null, user); // Return the new user
            } catch (err) {
                return cb(err); // Return error if something goes wrong
            }
        });
    })
);

// Serialize user for session storage
passport.serializeUser(function(user, cb) {
    cb(null, user._id); // Store user ID in the session
});

// Deserialize user from session
passport.deserializeUser(function(id, cb) {
    User.findById(id).then(user => {
        cb(null, user); // Retrieve user based on ID
    });
});