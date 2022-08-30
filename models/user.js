const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  googleId: {           //grab the google id store in googles object of data
    type: String,
    required: true
},
}, {
  timestamps: true      //log when the account is created
});

module.exports = mongoose.model('User', userSchema);