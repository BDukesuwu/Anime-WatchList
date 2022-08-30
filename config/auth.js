
module.exports = function isLoggedIn(req, res, next) {
   
    if (req.isAuthenticated())       // check to make sure you are who you say you are,
    return next();                   //then pass that info to the next URL
    res.redirect('/auth/google');    // Redirect to login if the user is not already logged in
}