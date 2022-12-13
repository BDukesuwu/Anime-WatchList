const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//make a schema to hold watchlist anime for each user
//each watchlist item should be store on the users watchlist and displayed on the watchlist page
const watchlistSchema = new Schema({
  watchStatus: String, // where the user selects if watched or not
  episode: {type: Number, min: 1, max: 13}, // where the user leaves a review. needs to be from 1 - 5, 1 the lowest, 5 the highest

}, {
  timestamps: true //save time added to watchlist
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