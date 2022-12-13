const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//make a schema to hold watchlist anime for each user
//each watchlist item should be store on the users watchlist and displayed on the watchlist page
const watchlistSchema = new Schema({
  watchStatus: String, // where the user selects if watched or not

}, {
  timestamps: true
});


const userSchema = new Schema({
  name: String,
  googleId: {           //grab the google id store in googles object of data
    type: String,
    required: true
},
email: String,
avatar: String,
weebWatching: {watchlistSchema}, //list of all anime user has watched
}, {
  timestamps: true      //log when the account is created
});

module.exports = mongoose.model('User', userSchema);