const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function(req, res, next) {
  res.redirect('/animes');
});

module.exports = router;


// Google login
router.get('/auth/google', passport.authenticate(
  'google',                     //since im using google auth, put google here
  {scope: ['profile', 'email']} //will grab user profile and email
));


// Google call back route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
      successRedirect: '/animes',   //if the user acc is authorized, its a success, redirect to animes
      failureRedirect: '/animes'    //if user is not authorized, log in unsuccessful, redirect to animes
  }
));

//when the user logs out, kill the cookie and redirect to the homepge, google logout
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/animes');
});

module.exports = router;