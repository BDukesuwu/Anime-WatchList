const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//make a new schema to hold reviews
//each review should conatin the content the user types, a number rating, the user name, and user avatar.
//go into the user data to grab the users information
const reviewSchema = new Schema({
  content: String,    //where the user will type the review
  rating: {type: Number, min: 1, max: 5, default: 5}, // where the user leaves a review. needs to be from 1 - 5, 1 the lowest, 5 the highest
  user: {type: Schema.Types.ObjectId, ref: 'User'},     
  userName: String,   //display the user's name with the ereview
  userAvatar: String    //display the users avatar/profile picture with the review
}, {
  timestamps: true
});

// make a new schema to hold each anime
//each anime needs a title, a release year, a rating, a synapsis, and if its still ongoing or ended.
const animeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true                          // the anime title must be unique, I dont want the user to enter an anime that is on the site already!
  },
  releaseYear: {
    type: Number,
    default: function () {
      return new Date().getFullYear();
    }
  },

  animeGenre: String,
  cast: [{
    type:Schema.Types.ObjectId,           //what type the path should be
    ref: 'vactor'                         //reference the voiceactors schema for the cast
  }],
  onGoing: { type: Boolean, default: false, required: true }, //its require to add if the anime is still ongoing or not as a yes or no statement
  reviews: [reviewSchema],                      // grab data from the review schema to display here under the anime
  content: String,                               // where the user will add the synapsis
}, {
  timestamps: true
});

module.exports = mongoose.model('Anime', animeSchema);