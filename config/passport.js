const passport = require('passport');
const { findById } = require('../models/user');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID, //comes from env file
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
      }, 
      
      function(accessToken, refreshToken, profile, cb) {
        User.findOne({ googleId: profile.id }).then(async function(user) { //find the users info when sign in
            if (user) return cb(null, user); //if there is no user account
            try { 
                user = await User.create({   //create a user to save to the database
                  name: profile.displayName, //ask for display name
                  googleId: profile.id,       //make the user an id
                  email: profile.emails[0].value, //ask for default email address
                  avatar: profile.photos[0].value //ask for photo, access default (google) picture
                });
                return cb(null, user);
              } catch (err) {
                return cb(err); //if something goes wrong return the error
              }
        })
      }
    ));

    passport.serializeUser(function(user,cb){
        cb(null, user._id)
    });


    passport.deserializeUser(function (userId, cb) {
        User.findById(userId).then(function (user) {
            cb(null, user);
        });
    });